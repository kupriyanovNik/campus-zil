#!/bin/zsh
cd /Users/nikitakuprianov/Desktop/Work/Projects/campus-zil
while IFS='|' read -r id subj; do
  [ -z "$id" ] && continue
  [ -f "gen/icons/$id.svg" ] && continue
  higgsfield generate create recraft_v4_1 \
    --prompt "Flat vector sticker icon of $subj, single object centered, bold uniform navy outline, solid fills in yellow, blue and white, tiny navy shadow offset, playful geometric shapes, plain white background, generous margin around the object" \
    --model_type vector --colors '["#14213D","#FFC629","#2457F5","#FFFFFF"]' --background_color "#FFFFFF" \
    --aspect_ratio 1:1 --resolution 1k --wait --wait-timeout 10m --json > "gen/icons/$id.json" 2> "gen/icons/$id.err"
  url=$(python3 -c "import json,sys; d=json.load(open('gen/icons/$id.json')); print(d[0].get('result_url',''))" 2>/dev/null)
  if [ -n "$url" ]; then curl -sL -o "gen/icons/$id.svg" "$url"; echo "ok $id"; else echo "FAIL $id"; fi
done < gen/icons.txt
echo DONE
