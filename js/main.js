/* Кампус Зил — данные и поведение страницы.
   Все цены, возраст и слоты расписания сняты с campuszil.com 21.09.2026. */

(function () {
  'use strict';

  /* ---------- Данные ---------- */

  // minAge / maxAge — включительно. days — короткие метки для карточки.
  const COURSES = [
    { id: 'robotics', cat: 'tech', title: 'Робототехника', minAge: 4, maxAge: 14, price: '9 600 ₽', per: 'в месяц', format: '8 занятий по 60 мин', days: ['Пн', 'Вт', 'Чт', 'Сб'], photo: 'assets/img/robotics-controller.jpg', desc: 'Авторская программа: сборка по чертежу, механизмы, управление, а с 12 лет программирование и электроника.' },
    { id: 'chess', cat: 'games', title: 'Шахматы', minAge: 4, maxAge: 14, price: '8 800 ₽', per: 'в месяц', format: '8 занятий по 60 мин', days: ['Пн', 'Пт'], photo: 'assets/img/chess-class.jpg', desc: 'От правил до турниров.' },
    { id: 'school', cat: 'study', title: 'Подготовка к школе', photo: 'assets/img/school.jpg', minAge: 5, maxAge: 7, price: '13 000 ₽', per: 'в месяц', format: '24 занятия, будни 13:30–15:30 и суббота', desc: 'Математика, русский язык, чтение. Вариант с сопровождением из сада или школы: 15 000 ₽ за 48 занятий.', days: ['Пн–Пт', 'Сб'] },
    { id: 'eng-native', cat: 'lang', title: 'Английский с носителем', minAge: 5, maxAge: 14, price: '12 600 ₽', per: 'в месяц', format: '8 занятий по 45 мин', photo: 'assets/img/english.jpg', desc: 'Занятия ведёт носитель британского английского. Разговорные группы по воскресеньям: 8+ в 12:00 (1 500 ₽ за занятие) и 12+ в 11:00 (2 000 ₽).', days: ['Вс'] },
    { id: 'eng-start', cat: 'lang', title: 'Английский для начинающих', photo: 'assets/img/eng-start.jpg', minAge: 3, maxAge: 6, price: '9 600 ₽', per: 'в месяц', format: '8 занятий по 30 мин', desc: 'Английский для самых маленьких, короткие занятия по 30 минут.' },
    { id: 'eng-draw', cat: 'lang', title: 'Рисуем и изучаем английский', minAge: 3, maxAge: 7, price: '9 600 ₽', per: 'в месяц', format: '8 занятий по 45 мин', desc: 'Рисование и английский на одном занятии.' },
    { id: 'math', cat: 'study', title: 'Математика', photo: 'assets/img/math.jpg', minAge: 5, maxAge: 10, price: '6 900 ₽', per: 'в месяц', format: '8 занятий по 30 мин', desc: 'Короткие занятия по 30 минут. Арифметика для младших школьников: 8 занятий по 45 минут за ту же цену.' },
    { id: 'olymp', cat: 'study', title: 'Олимпиадная математика', minAge: 7, maxAge: 14, price: '6 900 ₽', per: 'в месяц', format: '8 занятий по 45 мин', desc: 'Нестандартные задачи и подготовка к олимпиадам.' },
    { id: '3d', cat: 'tech', title: '3D‑печать и ИИ', photo: 'assets/img/3d.jpg', minAge: 9, maxAge: 14, price: '9 500 ₽', per: 'в месяц', format: '8 занятий по 60 мин', desc: 'Моделируем, печатаем, используем нейросети как инструмент. Печать оплачивается отдельно: 7 ₽ за грамм.' },
    { id: 'engineer', cat: 'tech', title: 'Юный инженер', photo: 'assets/img/engineer.jpg', minAge: 10, maxAge: 14, price: 'по запросу', per: '', format: 'вторник и четверг, 17:00', days: ['Вт', 'Чт'], desc: 'Свои модели от идеи до 3D‑печати: эскиз, CAD, прототип.' },
    { id: 'cad', cat: 'tech', title: 'Штангенциркуль и CAD', minAge: 8, maxAge: 14, price: '12 600 ₽', per: 'в месяц', format: '8 занятий по 60 мин', desc: 'Измеряем настоящие детали и переносим их в 3D‑модель. Нужно уверенно владеть компьютером. Филамент: 800 ₽ в месяц.' },
    { id: 'games-dev', cat: 'tech', title: 'Информатика: создание игр', photo: 'assets/img/games-dev.jpg', minAge: 10, maxAge: 14, price: '12 600 ₽', per: 'в месяц', format: '8 занятий по 60 мин', desc: 'Пишем свои игры на занятиях по информатике.' },
    { id: 'arduino', cat: 'tech', title: 'Arduino и интернет вещей', photo: 'assets/img/arduino.jpg', minAge: 12, maxAge: 14, price: '10 000 ₽', per: 'в месяц', format: '8 занятий по 60 мин', desc: 'Собираем устройства на Arduino и подключаем их к интернету.' },
    { id: 'otto', cat: 'tech', title: 'Мини‑робот Отто', minAge: 7, maxAge: 12, price: '9 500 ₽', per: 'за курс', format: '5 занятий по 60 мин, робот остаётся у ребёнка', photo: 'assets/img/otto.jpg', desc: 'Собираем и программируем шагающего робота. В цену входит сам робот.' },
    { id: 'tv', cat: 'games', title: 'Телестудия', photo: 'assets/img/tv.jpg', minAge: 9, maxAge: 14, price: 'по запросу', per: '', format: 'группы по договорённости', desc: 'Съёмка в студии с хромакеем, работа в кадре и за камерой.' },
    { id: 'reading', cat: 'study', title: 'Скорочтение', photo: 'assets/img/reading.jpg', minAge: 6, maxAge: 14, price: '6 900 ₽', per: 'в месяц', format: '8 занятий по 45 мин в группе', desc: 'Индивидуальный формат: 16 000 ₽ в месяц за 8 занятий.' },
    { id: 'callig', cat: 'games', title: 'Каллиграфия', minAge: 6, maxAge: 14, price: '6 900 ₽', per: 'в месяц', format: '8 занятий по 45 мин в группе', photo: 'assets/img/calligraphy.jpg', desc: 'Ставим почерк. Индивидуально: 16 000 ₽ в месяц за 8 занятий.' },
    { id: 'early', cat: 'study', title: 'Развивающие группы', photo: 'assets/img/early.jpg', minAge: 3, maxAge: 5, price: 'по запросу', per: '', format: 'мини‑группы для самых маленьких', desc: 'Речь, моторика, первые математические представления, творчество.' },
    { id: 'oge', cat: 'study', title: 'Подготовка к ОГЭ и ЕГЭ', minAge: 12, maxAge: 14, price: '12 600 ₽', per: 'в месяц', format: '8 занятий по 60 мин', desc: 'ОГЭ с 12 лет, ЕГЭ с 14 лет.' },
    { id: 'help', cat: 'study', title: 'Помощь в учёбе', minAge: 6, maxAge: 14, price: '3 000 ₽', per: 'за занятие', format: '60 мин индивидуально', desc: 'Индивидуально по школьной программе.' },
  ];

  const AGES = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  // Расписание постоянных групп. Время в минутах от 10:00.
  const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const DAY_FULL = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  const T0 = 10 * 60;
  const T1 = 20 * 60;
  const t = (h, m = 0) => h * 60 + m;

  const SLOTS = [];
  const add = (day, start, end, title, cat, note) => SLOTS.push({ day, start, end, title, cat, note });

  // Подготовка к школе
  [0, 1, 2, 3, 4].forEach(d => add(d, t(13, 30), t(15, 30), 'Подготовка к школе', 'study', '5+'));
  add(5, t(10), t(12), 'Подготовка к школе', 'study', '5+');
  // Шахматы
  [0, 4].forEach(d => { add(d, t(16), t(17), 'Шахматы', 'games', '4+'); add(d, t(17), t(18), 'Шахматы', 'games', '4+'); });
  // Робототехника
  [[0, 18], [0, 19], [1, 18], [1, 19], [3, 15], [3, 16], [3, 18], [3, 19], [5, 12], [5, 13], [5, 14]]
    .forEach(([d, h]) => add(d, t(h), t(h + 1), 'Робототехника', 'tech', '4+'));
  // Юный инженер
  [1, 3].forEach(d => add(d, t(17), t(18), 'Юный инженер', 'tech', '10+'));
  // Воскресенье
  add(6, t(10), t(11), 'Информатика', 'tech', '10+');
  add(6, t(11), t(12), 'Английский', 'lang', '12+, носитель');
  add(6, t(12), t(13), 'Английский', 'lang', '8+, носитель');

  /* ---------- Утилиты ---------- */

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const fmt = (min) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
  const plural = (n, one, few, many) => {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
    return many;
  };

  /* ---------- Состояние фильтров ---------- */

  const state = { age: null, cat: 'all' };
  const fitsAge = (c, age) => age === null || (c.minAge <= age && (c.maxAge == null || age <= c.maxAge));
  const fitsCat = (c, cat) => cat === 'all' || c.cat === cat;

  /* ---------- Доска стикеров в hero ---------- */

  const boardEl = $('[data-board]');
  const SHORT = {
    'eng-native': 'Английский с носителем', 'eng-start': 'Английский 3+', 'eng-draw': 'Рисуем по‑английски',
    olymp: 'Олимпиадная математика', '3d': '3D‑печать и ИИ', engineer: 'Юный инженер', cad: 'Штангенциркуль и CAD',
    'games-dev': 'Создание игр', arduino: 'Arduino', otto: 'Робот Отто', tv: 'Телестудия', reading: 'Скорочтение',
    callig: 'Каллиграфия', early: 'Развивающие группы', oge: 'ОГЭ и ЕГЭ', help: 'Помощь в учёбе',
  };
  const STYLES = ['', 'is-ink', '', 'is-blue', '', '', 'is-ink', '', 'is-blue', '', 'is-ink', '', '', 'is-blue', '', 'is-ink', '', 'is-blue', '', ''];
  COURSES.forEach((c, i) => {
    const s = document.createElement('span');
    s.className = `sticker ${STYLES[i % STYLES.length]}`;
    s.dataset.id = c.id;
    s.style.setProperty('--r', `${i % 2 ? 1.5 : -1.5}deg`);
    s.style.setProperty('--i', i);
    s.innerHTML = `<img class="sticker-icon" src="assets/icons/${c.id}.svg" alt="" width="20" height="20">${SHORT[c.id] || c.boardLabel || c.title}<small>${c.minAge}+</small>`;
    boardEl.appendChild(s);
  });

  /* ---------- Возрастные чипы (две группы, синхронные) ---------- */

  const chipGroups = $$('[data-age-chips]');
  chipGroups.forEach(group => {
    const all = document.createElement('button');
    all.type = 'button';
    all.textContent = 'Все';
    all.dataset.age = '';
    all.setAttribute('aria-pressed', 'true');
    group.appendChild(all);
    AGES.forEach(a => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = a === 14 ? '14+' : String(a);
      b.dataset.age = String(a);
      b.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-label', a === 14 ? '14 лет и старше' : `${a} ${plural(a, 'год', 'года', 'лет')}`);
      group.appendChild(b);
    });
    group.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      state.age = b.dataset.age === '' ? null : Number(b.dataset.age);
      render();
    });
  });

  /* ---------- Категории ---------- */

  const catTabs = $('[data-cat-tabs]');
  catTabs.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    state.cat = b.dataset.cat;
    render();
  });

  /* ---------- Сетка курсов ---------- */

  const gridEl = $('[data-course-grid]');
  const emptyEl = $('[data-course-empty]');

  COURSES.forEach(c => {
    const art = document.createElement('article');
    art.className = `course${c.photo ? ' has-photo' : ''}`;
    art.dataset.id = c.id;
    const ageText = `${c.minAge}+`;
    const days = c.days ? `<div class="course-days">${c.days.map(d => `<span>${d}</span>`).join('')}</div>` : '';
    const body = `
      <div class="course-top">
        <img class="course-icon" src="assets/icons/${c.id}.svg" alt="" width="44" height="44" loading="lazy">
        <h3>${c.title}</h3>
        <span class="age-tag" aria-label="Возраст ${ageText}">${ageText}</span>
      </div>
      <p class="course-desc">${c.desc}</p>
      ${days}
      <p class="course-price">${c.price}<small>${[c.per, c.format].filter(Boolean).join(', ')}</small></p>`;
    art.innerHTML = `${c.photo ? `<img class="course-photo" src="${c.photo}" alt="" loading="lazy">` : ''}<div class="course-body">${body}</div>`;
    gridEl.appendChild(art);
  });

  function render() {
    // чипы
    chipGroups.forEach(group => {
      $$('button', group).forEach(b => {
        const v = b.dataset.age === '' ? null : Number(b.dataset.age);
        b.setAttribute('aria-pressed', String(v === state.age));
      });
    });
    // категории
    $$('button', catTabs).forEach(b => b.setAttribute('aria-selected', String(b.dataset.cat === state.cat)));

    // курсы
    let shown = 0;
    $$('.course', gridEl).forEach(el => {
      const c = COURSES.find(x => x.id === el.dataset.id);
      const ok = fitsAge(c, state.age) && fitsCat(c, state.cat);
      el.classList.toggle('is-hidden', !ok);
      if (ok) shown++;
    });
    emptyEl.hidden = shown > 0;

  }

  render();

  /* ---------- Расписание ---------- */

  const legendEl = $('[data-legend]');
  [['tech', 'Техника'], ['study', 'Учёба'], ['lang', 'Языки'], ['games', 'Шахматы']].forEach(([k, label]) => {
    const s = document.createElement('span');
    s.innerHTML = `<i class="cat-${k}"></i>${label}`;
    legendEl.appendChild(s);
  });

  const ttEl = $('[data-timetable]');
  const rows = (T1 - T0) / 30;
  ttEl.style.setProperty('--rows', rows);

  const frag = document.createDocumentFragment();
  const corner = document.createElement('div');
  corner.className = 'tt-head';
  frag.appendChild(corner);
  DAYS.forEach((d, i) => {
    const h = document.createElement('div');
    h.className = 'tt-head';
    h.style.gridColumn = String(i + 2);
    h.textContent = d;
    h.setAttribute('aria-label', DAY_FULL[i]);
    frag.appendChild(h);
  });
  for (let r = 0; r < rows; r++) {
    const min = T0 + r * 30;
    const isHour = min % 60 === 0;
    const tm = document.createElement('div');
    tm.className = 'tt-time';
    tm.style.gridRow = String(r + 2);
    tm.textContent = isHour ? fmt(min) : '';
    tm.setAttribute('aria-hidden', 'true');
    frag.appendChild(tm);
    for (let d = 0; d < 7; d++) {
      const cell = document.createElement('div');
      cell.className = `tt-cell${isHour ? ' is-hour' : ''}`;
      cell.style.gridColumn = String(d + 2);
      cell.style.gridRow = String(r + 2);
      frag.appendChild(cell);
    }
  }
  // Дорожки для пересекающихся слотов в одном дне
  DAYS.forEach((_, d) => {
    const items = SLOTS.filter(s => s.day === d).sort((a, b) => a.start - b.start);
    items.forEach(s => { s.lane = 0; s.lanes = 1; });
    for (let i = 0; i < items.length; i++) {
      for (let k = 0; k < i; k++) {
        if (items[k].end > items[i].start && items[k].start < items[i].end) {
          items[i].lane = items[k].lane + 1;
          items[i].lanes = items[k].lanes = 2;
        }
      }
    }
  });
  SLOTS.forEach(s => {
    const ev = document.createElement('div');
    ev.className = `tt-event cat-${s.cat}`;
    if (s.lanes > 1) ev.classList.add(s.lane === 0 ? 'lane-l' : 'lane-r');
    ev.style.gridColumn = String(s.day + 2);
    ev.style.gridRow = `${(s.start - T0) / 30 + 2} / ${(s.end - T0) / 30 + 2}`;
    ev.innerHTML = `<span>${s.title}</span><small>${fmt(s.start)}–${fmt(s.end)}${s.note ? `, ${s.note}` : ''}</small>`;
    ev.setAttribute('aria-label', `${DAY_FULL[s.day]}, ${fmt(s.start)}–${fmt(s.end)}: ${s.title}${s.note ? `, ${s.note}` : ''}`);
    frag.appendChild(ev);
  });
  ttEl.appendChild(frag);

  // Мобильный вид: вкладки по дням
  const tabsEl = $('[data-day-tabs]');
  const listEl = $('[data-day-list]');
  const today = (new Date().getDay() + 6) % 7; // 0 = Пн
  let day = today;

  DAYS.forEach((d, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.dataset.day = String(i);
    b.textContent = d;
    b.setAttribute('aria-label', DAY_FULL[i]);
    tabsEl.appendChild(b);
  });
  tabsEl.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    day = Number(b.dataset.day);
    renderDay();
  });

  function renderDay() {
    $$('button', tabsEl).forEach(b => b.setAttribute('aria-selected', String(Number(b.dataset.day) === day)));
    const items = SLOTS.filter(s => s.day === day).sort((a, b) => a.start - b.start || a.title.localeCompare(b.title));
    listEl.innerHTML = items.length
      ? items.map(s => `
        <li>
          <time>${fmt(s.start)}–${fmt(s.end)}</time>
          <div>
            <span class="dl-title"><i class="cat-${s.cat}"></i>${s.title}</span>
            ${s.note ? `<div class="dl-note">${s.note}</div>` : ''}
          </div>
        </li>`).join('')
      : `<li class="is-empty">В ${DAY_FULL[day].toLowerCase().replace(/а$/, 'у')} постоянных групп нет. Индивидуальные занятия ставим по договорённости.</li>`;
  }
  renderDay();

  /* ---------- Карусель галереи (зацикленная) ---------- */

  const carousel = $('[data-carousel]');
  if (carousel) {
    const viewport = $('[data-viewport]', carousel);
    const track = $('[data-track]', carousel);
    const prevBtn = $('[data-prev]', carousel);
    const nextBtn = $('[data-next]', carousel);
    const dotsEl = $('[data-dots]', carousel);
    const originals = $$('.carousel-slide', track);
    const n = originals.length;

    // Клоны с обеих сторон, чтобы лента была бесконечной.
    originals.forEach(s => { const c = s.cloneNode(true); c.classList.add('is-clone'); c.setAttribute('aria-hidden', 'true'); track.appendChild(c); });
    originals.slice().reverse().forEach(s => { const c = s.cloneNode(true); c.classList.add('is-clone'); c.setAttribute('aria-hidden', 'true'); track.insertBefore(c, track.firstChild); });
    const slides = $$('.carousel-slide', track);
    let index = n; // индекс в расширенном списке; оригиналы занимают [n, 2n)
    let offset = 0;
    let animating = false;

    originals.forEach((_, i) => {
      const d = document.createElement('button');
      d.type = 'button';
      d.setAttribute('role', 'tab');
      d.setAttribute('aria-label', `Фото ${i + 1} из ${n}`);
      d.addEventListener('click', () => go(n + i));
      dotsEl.appendChild(d);
    });
    const dots = $$('button', dotsEl);

    const offsetFor = (i) => { const s = slides[i]; return viewport.clientWidth / 2 - (s.offsetLeft + s.offsetWidth / 2); };
    const apply = (x, animate = true) => {
      track.style.transition = animate ? '' : 'none';
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      if (!animate) void track.offsetWidth; // сброс transition
    };
    const mark = () => {
      const real = ((index - n) % n + n) % n;
      slides.forEach((s, k) => s.classList.toggle('is-active', ((k - n) % n + n) % n === real));
      dots.forEach((d, k) => d.setAttribute('aria-selected', String(k === real)));
    };

    function go(i, animate = true) {
      index = i;
      offset = offsetFor(index);
      apply(offset, animate);
      mark();
      animating = animate;
    }

    // После анимации у края незаметно прыгаем к тому же слайду среди оригиналов.
    track.addEventListener('transitionend', e => {
      if (e.target !== track) return;
      animating = false;
      if (index < n || index >= 2 * n) {
        index = n + ((index - n) % n + n) % n;
        offset = offsetFor(index);
        apply(offset, false);
      }
    });

    prevBtn.addEventListener('click', () => { if (!animating) go(index - 1); });
    nextBtn.addEventListener('click', () => { if (!animating) go(index + 1); });
    carousel.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
    });

    // Перетаскивание мышью и пальцем
    let startX = 0, dragX = 0, dragging = false;
    viewport.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      e.preventDefault(); // не выделять текст подписей
      if (animating) { animating = false; if (index < n || index >= 2 * n) { index = n + ((index - n) % n + n) % n; } offset = offsetFor(index); apply(offset, false); }
      dragging = true; startX = e.clientX; dragX = 0;
      viewport.classList.add('is-dragging');
      viewport.setPointerCapture(e.pointerId);
    });
    viewport.addEventListener('pointermove', e => {
      if (!dragging) return;
      dragX = e.clientX - startX;
      apply(offset + dragX, false);
    });
    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove('is-dragging');
      const step = slides[0].offsetWidth * 0.2;
      if (dragX < -step) go(index + 1);
      else if (dragX > step) go(index - 1);
      else go(index);
      dragX = 0;
    };
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);

    // Колесо мыши по горизонтали (трекпад)
    let wheelLock = 0;
    viewport.addEventListener('wheel', e => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const now = Date.now();
      if (now - wheelLock < 500) return;
      wheelLock = now;
      go(index + (e.deltaX > 0 ? 1 : -1));
    }, { passive: false });

    window.addEventListener('resize', () => go(index, false));
    carousel.setAttribute('tabindex', '0');
    go(n, false);
  }

  /* ---------- Меню ---------- */

  const burger = $('#burger');
  const nav = $('#nav');
  const closeNav = () => { nav.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Открыть меню'); document.body.style.overflow = ''; };
  burger.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.addEventListener('click', e => { if (e.target.closest('a')) closeNav(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  window.matchMedia('(min-width: 1101px)').addEventListener('change', e => { if (e.matches) closeNav(); });

  /* ---------- Год ---------- */
  $('[data-year]').textContent = String(new Date().getFullYear());
})();
