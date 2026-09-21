#!/bin/zsh
cd /Users/nikitakuprianov/Desktop/Work/Projects/campus-zil
list="$1"
while IFS='|' read -r id subj; do
  [ -z "$id" ] && continue
  [ -f "gen/photos/$id.png" ] && continue
  higgsfield generate create gpt_image_2 \
    --prompt "Candid smartphone photo taken in the same classroom as the reference images: light grey walls, light beech desks with grey metal legs, grey linoleum floor, large interactive touch display on a black stand, soft daylight from big windows. $subj. Real children, natural colors, no filters, slight lens softness like an iPhone snapshot, photojournalistic, sharp focus on the hands and objects. Do not reuse any people from the reference images." \
    --image-references assets/img/robotics-girl.jpg --image-references assets/img/calligraphy.jpg \
    --aspect_ratio 4:3 --resolution 2k --quality high --wait --wait-timeout 15m --json > "gen/photos/$id.json" 2> "gen/photos/$id.err"
  url=$(python3 -c "import json; d=json.load(open('gen/photos/$id.json')); print(d[0].get('result_url',''))" 2>/dev/null)
  if [ -n "$url" ]; then curl -sL -o "gen/photos/$id.png" "$url"; echo "ok $id"; else echo "FAIL $id"; cat "gen/photos/$id.err" | head -3; fi
done < "$list"
echo DONE
