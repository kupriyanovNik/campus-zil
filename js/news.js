/* Рендер новостей: лента на news.html и три последние записи на главной. */
(function () {
  'use strict';
  const NEWS = (window.NEWS || []).slice().sort((a, b) => b.date.localeCompare(a.date));
  const TAGS = window.NEWS_TAGS || {};
  const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const fmtDate = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${MONTHS[m - 1]} ${y}`; };
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const tagHtml = (t) => { const T = TAGS[t] || { label: t, icon: 'help' }; return `<span class="news-tag"><img src="assets/icons/${T.icon}.svg" alt="" width="18" height="18" loading="lazy">${T.label}</span>`; };
  const bodyHtml = (body) => body.map(b => typeof b === 'string' ? `<p>${esc(b)}</p>` : `<ul>${b.list.map(li => `<li>${esc(li)}</li>`).join('')}</ul>`).join('');
  const firstText = (body) => { const s = body.find(b => typeof b === 'string') || ''; return s.length > 180 ? s.slice(0, 177).replace(/\s+\S*$/, '') + '…' : s; };

  /* ---- Лента ---- */
  const feed = document.querySelector('[data-news-feed]');
  if (feed) {
    const filter = document.querySelector('[data-news-filter]');
    const empty = document.querySelector('[data-news-empty]');
    const mk = (key, label, on) => `<button type="button" role="tab" data-tag="${key}" aria-selected="${on}">${label}</button>`;
    filter.innerHTML = mk('all', 'Все', true) + Object.entries(TAGS).map(([k, v]) => mk(k, v.label, false)).join('');

    feed.innerHTML = NEWS.map(p => {
      const media = p.images
        ? `<div class="news-gallery">${p.images.map(i => `<img src="${i.src}" alt="${esc(i.alt)}" loading="lazy">`).join('')}</div>`
        : p.image ? `<img class="news-image" src="${p.image.src}" alt="${esc(p.image.alt)}" loading="lazy">` : '';
      const video = p.video ? `<div class="news-video"><video controls preload="none" src="${p.video.src}"${p.image ? ` poster="${p.image.src}"` : ''}></video><span>${esc(p.video.note)}</span></div>` : '';
      const link = p.link ? `<p class="news-link"><a href="${p.link.href}"${p.link.external ? ' target="_blank" rel="noopener"' : ''}>${esc(p.link.text)}</a></p>` : '';
      const author = p.author ? `<p class="news-author">${esc(p.author)}</p>` : '';
      return `<article class="news-post" id="p-${p.id}" data-tag="${p.tag}">
        <div class="news-meta"><time datetime="${p.date}">${fmtDate(p.date)}</time>${tagHtml(p.tag)}</div>
        <h2>${esc(p.title)}</h2>
        ${media}
        <div class="news-body">${bodyHtml(p.body)}${author}${link}</div>
        ${video}
      </article>`;
    }).join('');

    filter.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const tag = b.dataset.tag;
      filter.querySelectorAll('button').forEach(x => x.setAttribute('aria-selected', String(x === b)));
      let shown = 0;
      feed.querySelectorAll('.news-post').forEach(a => { const ok = tag === 'all' || a.dataset.tag === tag; a.hidden = !ok; if (ok) shown++; });
      empty.hidden = shown > 0;
    });

    if (location.hash) { const el = document.querySelector(location.hash); if (el) el.scrollIntoView(); }
  }

  /* ---- Главная: три последние ---- */
  const home = document.querySelector('[data-news-home]');
  if (home) {
    home.innerHTML = NEWS.slice(0, 3).map(p => {
      const img = (p.image && p.image.src) || (p.images && p.images[0].src);
      const T = TAGS[p.tag] || { icon: 'help' };
      const media = img ? `<img class="news-card-img" src="${img}" alt="" loading="lazy">` : `<div class="news-card-icon"><img src="assets/icons/${T.icon}.svg" alt="" width="48" height="48" loading="lazy"></div>`;
      return `<a class="news-card" href="news.html#p-${p.id}">
        ${media}
        <div class="news-card-body">
          <div class="news-meta"><time datetime="${p.date}">${fmtDate(p.date)}</time>${tagHtml(p.tag)}</div>
          <h3>${esc(p.title)}</h3>
          <p>${esc(firstText(p.body))}</p>
        </div>
      </a>`;
    }).join('');
  }
})();
