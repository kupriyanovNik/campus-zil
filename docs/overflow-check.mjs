// Проверка вёрстки на разных ширинах: горизонтальная прокрутка и элементы,
// выходящие за край экрана или за границы своей секции.
// Запуск: node docs/overflow-check.mjs   (нужен playwright: npx playwright install chromium)
import { chromium } from 'playwright';

const URL = process.env.URL || 'http://localhost:8765/';
const WIDTHS = [320, 360, 390, 414, 600, 601, 768, 820, 900, 901, 1024, 1080, 1180, 1280, 1366, 1440, 1580, 1920];

const browser = await chromium.launch();
const page = await browser.newPage();
let problems = 0;
for (const w of WIDTHS) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  const res = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const out = [];
    const scrollW = document.documentElement.scrollWidth;
    if (scrollW > vw) out.push(`scrollWidth ${scrollW} > ${vw}`);
    for (const el of document.querySelectorAll('body *')) {
      if (el.closest('nav.nav') && getComputedStyle(document.querySelector('nav.nav')).position === 'fixed') continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      // элементы, чей правый край за экраном (кроме намеренно скроллящихся полос)
      const scroller = el.closest('.gallery-strip, .day-tabs, .seg');
      if (!scroller && (r.right > vw + 1 || r.left < -1)) {
        out.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} right=${Math.round(r.right)} left=${Math.round(r.left)}`);
      }
    }
    // стикеры hero: не должны выходить за контейнер hero
    const hero = document.querySelector('.hero .container');
    if (hero) {
      const hr = hero.getBoundingClientRect();
      for (const s of document.querySelectorAll('.sticker, .board-photo')) {
        const r = s.getBoundingClientRect();
        if (r.right > hr.right + 2 || r.left < hr.left - 2) out.push(`sticker "${s.textContent.trim()}" outside hero container (${Math.round(r.left)}–${Math.round(r.right)} vs ${Math.round(hr.left)}–${Math.round(hr.right)})`);
      }
    }
    // текст, вылезающий из карточек
    for (const el of document.querySelectorAll('.course, .tt-event, .price-list > div, .contacts-list > div')) {
      if (el.scrollWidth > el.clientWidth + 2) out.push(`${el.className.split(' ')[0]} content overflows: ${el.scrollWidth} > ${el.clientWidth} — "${el.textContent.trim().slice(0, 40)}"`);
    }
    return out;
  });
  const uniq = [...new Set(res)];
  if (uniq.length) { problems += uniq.length; console.log(`\n[${w}px]`); uniq.slice(0, 12).forEach(l => console.log('  ' + l)); }
  else console.log(`[${w}px] ok`);
}
await browser.close();
process.exit(problems ? 1 : 0);
