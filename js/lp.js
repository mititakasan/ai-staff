// 隣の高専生 LP / 詳細ページ共通スクリプト
(() => {
  // スクロールでフェードイン（要素ごとに方向を変え、同じ親の兄弟は 80ms ずつずらす）
  const REVEAL = [
    ['.partners__label, .problem__title, .members__eyebrow, .members__title, .pitch__head, .page__intro', 'blur'],
    ['.partners__item, .problem__card, .flow__node, .flow__arrow, .member-card', 'up'],
    ['.solution__heading, .solution__lead, .pitch__viewer, .company__card', 'zoom'],
    ['.eyebrow-en, .services__heading, .services__banner, .company__row, .info-table__row', 'left'],
    ['.service-row', 'right'],
    ['.steps__card, .page > .panel, .page > .btn-brand, .footer__top > *, .footer__sns, .footer__bottom', 'up'],
  ];
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('js-fade');
    const groups = new Map();
    const els = [];
    REVEAL.forEach(([sel, dir]) => document.querySelectorAll(sel).forEach(el => {
      if (el.classList.contains('reveal')) return;
      el.classList.add('reveal');
      el.dataset.reveal = dir;
      const i = groups.get(el.parentElement) || 0;
      groups.set(el.parentElement, i + 1);
      el.style.setProperty('--reveal-delay', `${Math.min(i, 6) * 0.08}s`);
      els.push(el);
    }));
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.15 });
    els.forEach(el => io.observe(el));
    // 予備: IntersectionObserver が遅れる環境でも、画面内に入った要素は必ず表示する
    const check = () => {
      const limit = innerHeight * 0.95;
      els.forEach(el => {
        if (!el.classList.contains('is-visible') && el.getBoundingClientRect().top < limit) {
          el.classList.add('is-visible');
          io.unobserve(el);
        }
      });
    };
    addEventListener('scroll', check, { passive: true });
    addEventListener('resize', check);
    addEventListener('load', check);
    check();
  }

  // モバイル用グローバルナビ
  const nav = document.querySelector('.gnav');
  const toggle = nav?.querySelector('.gnav__toggle');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('.gnav__links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // メンバー / 横にドラッグしてスクロール
  const scroller = document.querySelector('.members__scroller');
  if (scroller) {
    let startX = 0;
    let startScroll = 0;
    let dragging = false;
    scroller.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse') return;
      dragging = true;
      startX = e.clientX;
      startScroll = scroller.scrollLeft;
      scroller.classList.add('is-dragging');
      scroller.setPointerCapture(e.pointerId);
    });
    scroller.addEventListener('pointermove', e => {
      if (!dragging) return;
      scroller.scrollLeft = startScroll - (e.clientX - startX);
    });
    const end = () => {
      dragging = false;
      scroller.classList.remove('is-dragging');
    };
    scroller.addEventListener('pointerup', end);
    scroller.addEventListener('pointercancel', end);
  }

  // 背景 / 青い四角形・下端固定・高さランダム（Figma 188:482 の配置を 1414px 基準の % で再現）
  const skyline = document.querySelector('.skyline');
  if (skyline) {
    const blocks = [
      // [left, width, height, color]
      [0, 76, 57, '#1c459b'], [76, 122, 86, '#006fb6'], [240, 72, 55, '#00a0db'],
      [312, 153, 105, '#1c459b'], [519, 93, 68, '#006fb6'], [660, 177, 120, '#00a0db'],
      [837, 117, 83, '#1c459b'], [1015, 146, 101, '#006fb6'], [1207, 104, 76, '#1c459b'],
      [1311, 66, 51, '#00a0db'], [198, 42, 36, '#1c459b'], [465, 54, 44, '#00a0db'],
      [612, 48, 40, '#1c459b'], [954, 61, 48, '#00a0db'], [1161, 46, 38, '#00a0db'],
      [1377, 37, 33, '#006fb6'],
      // Foreground / 重なり
      [55, 64, 31, '#00a0db'], [205, 55, 39, '#1c459b'], [359, 68, 46, '#006fb6'],
      [492, 56, 29, '#00a0db'], [692, 76, 43, '#1c459b'], [876, 60, 38, '#00a0db'],
      [1089, 69, 33, '#1c459b'], [1277, 58, 30, '#006fb6'],
    ];
    const W = 1414;
    blocks.forEach(([left, width, height, color], i) => {
      const el = document.createElement('span');
      el.style.left = `${(left / W) * 100}%`;
      el.style.width = `${(width / W) * 100}%`;
      el.style.height = `${height}px`;
      el.style.background = color;
      el.style.animationDelay = `${-(i * 0.7) % 6}s`;
      el.style.animationDuration = `${5 + (i % 4)}s`;
      skyline.appendChild(el);
    });
  }

  // ボタンの沈み込みを手のアニメーションと同じ時間軸にそろえる
  const syncTap = () => {
    const btn = document.querySelector('.hero__register');
    const hand = document.querySelector('.tap__hand');
    if (!btn || !hand) return;
    const h = hand.getAnimations().find(a => a.animationName === 'tap-hand');
    const b = btn.getAnimations().find(a => a.animationName === 'tap-press');
    if (h && b && h.startTime != null) b.startTime = h.startTime;
  };
  document.querySelectorAll('.hero__register, .hero__business').forEach(el => {
    el.addEventListener('animationend', e => { if (e.animationName === 'rise-in') { el.classList.add('is-entered'); requestAnimationFrame(syncTap); } });
    setTimeout(() => { el.classList.add('is-entered'); requestAnimationFrame(syncTap); }, 2000);
  });

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // --- hero: カーソル位置で光の色と位置・視差が変わる ---
  const panel = document.querySelector('.hero__panel');
  if (false && panel && !reduce) {
    panel.addEventListener('pointermove', e => {
      const r = panel.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      panel.style.setProperty('--mx', `${x * 100}%`);
      panel.style.setProperty('--my', `${y * 100}%`);
      panel.style.setProperty('--hue', String(Math.round(180 + x * 160 + y * 40)));
      panel.style.setProperty('--px', (x - 0.5).toFixed(3));
      panel.style.setProperty('--py', (y - 0.5).toFixed(3));
    });
    panel.addEventListener('pointerleave', () => {
      panel.style.setProperty('--px', '0');
      panel.style.setProperty('--py', '0');
    });
  }

  // --- スクロール進捗 / ヘッダーの出し入れ / 01–03 スティッキー ---
  const progress = document.querySelector('.progress');
  const steps = document.querySelector('[data-steps]');
  const stepEls = steps ? [...steps.querySelectorAll('.chip')] : [];
  const dots = steps ? [...steps.querySelectorAll('.chip__head')] : [];
  let lastY = scrollY;
  let ticking = false;
  const setStep = i => {
    if (!steps || steps.dataset.index === String(i)) return;
    steps.dataset.index = String(i);
    stepEls.forEach((el, k) => {
      el.classList.toggle('is-active', k === i);
      el.classList.toggle('is-past', k < i);
    });
    dots.forEach((d, k) => d.setAttribute('aria-expanded', String(k === i)));
  };
  const onScroll = () => {
    ticking = false;
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (nav) {
      nav.classList.toggle('is-scrolled', y > 10);
      nav.classList.toggle('is-hidden', y > lastY && y > 300);
    }
    lastY = y;
    if (steps) {
      const r = steps.getBoundingClientRect();
      const t = Math.min(Math.max(-r.top / (r.height - innerHeight), 0), 0.999);
      setStep(Math.floor(t * stepEls.length));
    }
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();
  dots.forEach((d, i) => d.addEventListener('click', () => {
    const top = steps.getBoundingClientRect().top + scrollY;
    const span = steps.offsetHeight - innerHeight;
    scrollTo({ top: top + span * ((i + 0.5) / stepEls.length), behavior: reduce ? 'auto' : 'smooth' });
  }));

  if (finePointer && !reduce) {
    // --- カスタムカーソル（少し遅れて追従） ---
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      let tx = -100, ty = -100, cx = -100, cy = -100;
      addEventListener('pointermove', e => {
        tx = e.clientX; ty = e.clientY;
        const t = e.target;
        cursor.classList.toggle('is-hover', !!t.closest?.('a, button, .tilt, [data-goto]'));
        cursor.classList.toggle('is-dark', !!t.closest?.('.solution, .members, .company, .footer') && !t.closest?.('.steps__card'));
      });
      const loop = () => {
        cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
        cursor.style.setProperty('--cx', `${cx}px`);
        cursor.style.setProperty('--cy', `${cy}px`);
        requestAnimationFrame(loop);
      };
      loop();
    }

    // --- マグネットボタン ---
    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--tx', `${(e.clientX - r.left - r.width / 2) * 0.06}px`);
        el.style.setProperty('--ty', `${(e.clientY - r.top - r.height / 2) * 0.1}px`);
      });
      el.addEventListener('pointerleave', () => { el.style.setProperty('--tx', '0px'); el.style.setProperty('--ty', '0px'); });
    });

    // --- 3D チルト ---
    document.querySelectorAll('.tilt').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.classList.add('is-tilting');
        el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 12}deg)`;
        el.style.setProperty('--gx', `${x * 100}%`);
        el.style.setProperty('--gy', `${y * 100}%`);
      });
      el.addEventListener('pointerleave', () => { el.classList.remove('is-tilting'); el.style.transform = ''; });
    });
  }

  // --- メンバー: ゆっくり自動スクロール（触れている間は停止、端で折り返し） ---
  const ms = document.querySelector('.members__scroller');
  if (ms && !reduce) {
    let paused = false, dir = 1, acc = 0;
    ['pointerenter', 'pointerdown', 'touchstart', 'focusin'].forEach(ev => ms.addEventListener(ev, () => { paused = true; }, { passive: true }));
    ['pointerleave', 'focusout'].forEach(ev => ms.addEventListener(ev, () => { paused = false; }));
    ms.addEventListener('touchend', () => setTimeout(() => { paused = false; }, 2500), { passive: true });
    const drift = () => {
      if (!paused && ms.scrollWidth > ms.clientWidth) {
        acc += 0.5 * dir;
        if (Math.abs(acc) >= 1) { ms.scrollLeft += Math.trunc(acc); acc -= Math.trunc(acc); }
        if (ms.scrollLeft + ms.clientWidth >= ms.scrollWidth - 1) dir = -1;
        else if (ms.scrollLeft <= 0) dir = 1;
      }
      requestAnimationFrame(drift);
    };
    drift();
  }

  // ===== 臨場感のあるスクロール演出 =====
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  // Project Portfolio: 縦スクロールを横送りに変換
  const works = document.querySelector('.works');
  const wList = works?.querySelector('.works__list');
  const wCards = wList ? [...wList.querySelectorAll('.work-card')] : [];
  const wCurrent = null;
  if (works && wCards.length && !reduce) {
    works.classList.add('works--scroll');
  }
  const updateWorks = () => {
    if (!works || !works.classList.contains('works--scroll')) return;
    const r = works.getBoundingClientRect();
    const span = works.offsetHeight - innerHeight;
    const p = clamp(-r.top / Math.max(span, 1), 0, 1);
    const f = p * (wCards.length - 1);
    const card = wCards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(wList).columnGap) || 48;
    const vw = works.querySelector('.works__viewport').clientWidth;
    const x = vw / 2 - card / 2 - f * (card + gap);
    wList.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
    wCards.forEach((c, i) => {
      const d = i - f;
      const a = Math.min(Math.abs(d), 1.4);
      const scale = 1.06 - 0.16 * Math.min(a, 1);
      const rot = clamp(-d * 28, -38, 38);
      c.style.transform = `rotateY(${rot.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      c.style.opacity = (1 - 0.5 * Math.min(a, 1)).toFixed(2);
      c.classList.toggle('is-active', Math.abs(d) < 0.5);
    });
    if (wCurrent) wCurrent.textContent = String(Math.round(f) + 1).padStart(2, '0');
  };

  // 事業内容: 画面中央に最も近い行にフォーカス
  const sList = document.querySelector('.services__list');
  const sItems = sList ? [...sList.children] : [];
  const updateServices = () => {
    if (!sList || reduce) return;
    const r = sList.getBoundingClientRect();
    const mid = innerHeight * 0.5;
    const inView = r.top < innerHeight * 0.75 && r.bottom > innerHeight * 0.25;
    sList.classList.toggle('is-focusing', inView);
    if (!inView) { sItems.forEach(el => { el.classList.remove('is-focus'); el.style.transform = ''; }); return; }
    let best = null, bestD = Infinity;
    sItems.forEach(el => { const b = el.getBoundingClientRect(); const d = Math.abs(b.top + b.height / 2 - mid); if (d < bestD) { bestD = d; best = el; } });
    sItems.forEach(el => el.classList.toggle('is-focus', el === best));
    // 画面中央からの距離に応じて連続的に拡大・縮小（段階的に切り替えず、なめらかに追従）
    const narrow = innerWidth <= 900;
    const maxS = narrow ? 1.05 : 1.08, minS = narrow ? 0.9 : 0.88;
    sItems.forEach(el => {
      const b = el.getBoundingClientRect();
      const d = Math.min(Math.abs(b.top + b.height / 2 - mid) / (innerHeight * (narrow ? 0.38 : 0.45)), 1);
      const e = 1 - d * d * (3 - 2 * d); // smoothstep
      el.style.transform = `scale(${(minS + (maxS - minS) * e).toFixed(4)})`;
    });
  };

  // 後半セクション: 入場時に引きから全体表示へズーム
  const zoomEls = reduce ? [] : ['.pitch__viewer', '.company__card'].map(q => document.querySelector(q)).filter(Boolean);
  zoomEls.forEach(el => el.setAttribute('data-zoom', ''));
  const updateZoom = () => zoomEls.forEach(el => {
    const r = el.getBoundingClientRect();
    const e = clamp((innerHeight - r.top) / (innerHeight * 0.7), 0, 1);
    const ease = 1 - Math.pow(1 - e, 3);
    el.style.transform = `scale(${(0.88 + 0.12 * ease).toFixed(4)})`;
    el.style.borderRadius = `${((1 - ease) * 36).toFixed(1)}px`;
  });

  let fxTick = false;
  const fx = () => { fxTick = false; updateWorks(); updateServices(); updateZoom(); };
  addEventListener('scroll', () => { if (!fxTick) { fxTick = true; requestAnimationFrame(fx); } }, { passive: true });
  addEventListener('resize', fx);
  fx();
  window.__fx = fx;
})();

;// ===== ai-content =====
(() => {
  const setText = (selector, value) => { const el = document.querySelector(selector); if (el) el.textContent = value; };
  const setHTML = (selector, value) => { const el = document.querySelector(selector); if (el) el.innerHTML = value; };
  const image = (selector, src, alt = '') => { const el = document.querySelector(selector); if (el) { el.src = src; el.alt = alt; } };

  document.title = 'AI社員 | 採用するのは、人だけじゃない。';
  const logo = document.querySelector('.gnav__logo');
  if (logo) { logo.innerHTML = '<span class="ai-logo">AI社員</span><small>24時間、会社で働くAI社員。</small>'; logo.setAttribute('aria-label', 'AI社員 トップ'); }
  document.querySelectorAll('.gnav__links a').forEach((a, i) => { if (i === 3) a.remove(); });
  document.querySelectorAll('.gnav__links a').forEach((a, i) => { a.textContent = ['トップ', 'AI社員とは', 'できること', 'よくある質問'][i]; a.href = ['#top', '#about', '#services', '#faq'][i]; });
  const headerCta = document.querySelector('.gnav__cta'); if (headerCta) { headerCta.textContent = '導入相談 ↗'; headerCta.href = '#ai-contact'; }

  setHTML('.hero__title', '<span><strong>事務作業</strong>を、</span><span><strong>AI社員</strong>に任せる。</span>');
  setText('.hero__lead', 'あなたの会社の仕事を覚えたAI社員が、\nチームの一員として業務を支えます。');
  setText('.hero__register', '導入を相談する');
  const register = document.querySelector('.hero__register'); if (register) { register.href = '#ai-contact'; register.innerHTML = '<span class="btn-ico" aria-hidden="true">＋</span>導入を相談する'; }
  setText('.hero__business', '資料請求する ↗');
  const business = document.querySelector('.hero__business'); if (business) business.href = '#ai-contact';
  image('.hero__photo--1', 'assets/reference/kinchan.png', 'AI社員きんちゃん');
  image('.hero__photo--2', 'assets/lp/hero-device.png', 'AI社員のデバイス');
  image('.hero__photo--3', 'assets/lp/hero-ai.png', 'AI社員');
  image('.hero__photo--4', 'assets/lp/hero-device.png', 'AI社員のデバイス');
  image('.hero__photo--5', 'assets/lp/hero-ai.png', 'AI社員');

  document.querySelector('.partners__label')?.remove();
  const partnerLabels = ['業務を覚える', 'チャットで頼める', '仕事を自動化', 'チームで働く', 'いつでも相談', '導入サポート'];
  document.querySelectorAll('.partners__item').forEach((item, i) => { const img = item.querySelector('img'); if (img) { img.src = ['assets/lp/ai-problem-1.png','assets/lp/ai-problem-2.png','assets/lp/ai-problem-3.png'][i % 3]; img.alt = partnerLabels[i]; } setText(`.partners__item:nth-child(${i + 1}) span`, partnerLabels[i]); });

  setText('.problem__title', 'こんな課題ありませんか？');
  const problemCards = [
    ['単純作業に追われ、本来の仕事に集中できない。', 'チャットから、簡単に業務を依頼できる', '繰り返し作業をAIに任せられる', '業務の時間を取り戻せる'],
    ['担当者しか分からない仕事がたくさんある。', 'マニュアルや過去の知識を覚えられる', 'いつでも同じ品質で回答できる', '属人化した業務を整理できる'],
    ['採用したいけど、新しい人を迎える余裕がない。', '必要な時に必要な分だけ頼れる', '24時間チームの一員として稼働', 'まずは小さく始められる']
  ];
  document.querySelectorAll('.problem__card').forEach((card, i) => { const [title, ...items] = problemCards[i]; card.querySelector('h3').textContent = title; const cardImage = card.querySelector('img'); if (cardImage) { cardImage.src = `assets/lp/problem-${i + 1}.png`; cardImage.alt = title; } card.querySelectorAll('li').forEach((li, j) => li.textContent = items[j]); });

  setHTML('.solution__heading', '<span class="ai-solution-mark">AI社員</span><span class="ai-solution-suffix">が解決します！</span>');
  setText('.solution__lead', '仕事を覚え、考え、動く。あなたの会社専用のAI社員です。');
  const flowNodes = document.querySelectorAll('.flow__node');
  [['人', '判断・コミュニケーション'], ['AI社員', '記憶・作業・自動化'], ['チーム', '成果・成長・時間']].forEach((item, i) => { if (!flowNodes[i]) return; flowNodes[i].querySelector('.flow__name').textContent = item[0]; flowNodes[i].querySelector('.flow__desc').textContent = item[1]; const nodeImage = flowNodes[i].querySelector('img'); if (nodeImage) { nodeImage.src = ['assets/lp/flow-student.png', 'assets/lp/flow-infinity.png', 'assets/lp/flow-company.png'][i]; nodeImage.alt = item[0]; } });
  document.querySelectorAll('.flow__arrow').forEach((arrow, i) => { const labels = arrow.querySelectorAll('.a3d__label'); if (labels[0]) labels[0].textContent = i ? '仕事を任せる' : '仕事を教える'; if (labels[1]) labels[1].textContent = i ? '成果を受け取る' : '知識を共有する'; arrow.setAttribute('aria-label', i ? 'AI社員からチームへ、成果を受け取る' : '人からAI社員へ、仕事を教える'); });
  setText('.steps__eyebrow', 'AI社員に任せられること');
  const chips = [
    ['仕事を覚える', '社内マニュアルや過去のやりとりから、あなたの会社の仕事を理解します。'],
    ['チャットで頼める', 'いつものように話しかけるだけ。依頼も確認もスムーズに進みます。'],
    ['チームで働く', '人とAIが得意なことを分担し、仕事のスピードと質を変えます。']
  ];
  document.querySelectorAll('.chip').forEach((chip, i) => { const head = chip.querySelector('.chip__head'); if (head) { const icon = head.querySelector('.chip__icon'); head.textContent = ''; if (icon) head.appendChild(icon); head.append(chips[i][0]); } const title = chip.querySelector('.chip__title'); if (title) title.textContent = chips[i][0]; const p = chip.querySelector('.chip__inner p'); if (p) p.textContent = chips[i][1]; const link = chip.querySelector('.chip__link'); if (link) { link.textContent = 'この機能について相談 '; link.insertAdjacentHTML('beforeend', '<span aria-hidden="true">›</span>'); link.href = '#ai-contact'; } });

  setText('.services__heading h2', 'AI社員の機能');
  document.querySelector('.services .eyebrow-en')?.remove();
  const serviceBanner = document.querySelector('.services__banner img'); if (serviceBanner) { serviceBanner.src = 'assets/lp/ai-device.png'; serviceBanner.alt = 'AI社員の業務画面'; }
  document.querySelector('.services__banner-sp img')?.remove(); setText('.services__banner-sp span', 'AI社員が業務を支えます'); const serviceBannerLink = document.querySelector('.services__banner'); if (serviceBannerLink) serviceBannerLink.href = '#ai-contact';
  const serviceRows = document.querySelectorAll('.service-row'); ['社内ナレッジを覚える', '定型業務を自動化する', 'レポート・資料を作成する'].forEach((label, i) => { if (serviceRows[i]) { serviceRows[i].textContent = label; serviceRows[i].insertAdjacentHTML('beforeend', '<span>↗</span>'); serviceRows[i].href = '#ai-contact'; } }); serviceRows[3]?.remove();

  document.querySelector('#works')?.remove();

  document.querySelector('.members__eyebrow')?.remove(); setText('.members__title', 'AI社員が支えるチーム');
  const memberNames = [['営業アシストAI','営業・提案を支える'],['ナレッジAI','社内情報を整理する'],['業務改善AI','繰り返し作業を減らす'],['カスタマーAI','問い合わせに答える'],['採用アシストAI','候補者対応を支える']];
  document.querySelectorAll('.member-card').forEach((card, i) => { if (!memberNames[i]) { card.remove(); return; } const school = card.querySelector('.member-card__school'); const name = card.querySelector('.member-card__name'); if (school) school.textContent = memberNames[i][1]; if (name) name.textContent = memberNames[i][0]; });
  document.querySelector('.pitch__eyebrow')?.remove(); setText('.pitch__title', 'AI社員の導入資料'); setText('.pitch__lead', 'AI社員の仕組みと導入ステップをご案内します。');
  setText('.company__card h2', 'AI社員サービスについて');
  const rows = document.querySelectorAll('.company__row'); [['サービス', 'あなたの会社の仕事を覚えたAI社員'], ['できること', 'ナレッジ検索、定型業務、自動化、資料作成'], ['導入方法', 'ヒアリング、設計、トライアル、運用開始'], ['料金', '業務内容と利用規模に合わせてご提案'], ['サポート', '導入後の改善・運用を継続支援'], ['お問い合わせ', 'nakamoto.ryosuke@tonari.ac']].forEach((row, i) => { if (rows[i]) { const dt = rows[i].querySelector('dt'); const dd = rows[i].querySelector('dd'); if (dt) dt.textContent = row[0]; if (dd) dd.textContent = row[1]; } }); rows[6]?.remove();

  const servicesMore = document.querySelector('.services__heading .view-more'); if (servicesMore) servicesMore.href = '#ai-contact';
  document.querySelector('#pitch-deck')?.remove();
  document.querySelector('#company-info')?.remove();
  const pricing = document.createElement('section'); pricing.id = 'pricing'; pricing.className = 'ai-pricing'; pricing.innerHTML = `
    <div class="ai-pricing__inner">
      <p class="ai-pricing__eyebrow">P R I C I N G</p>
      <h2>料金プラン</h2>
      <p class="ai-pricing__lead">企業専用のAI社員を、あなたのチームに。</p>
      <div class="ai-pricing__grid">
        <article class="ai-plan ai-plan--trial">
          <span class="ai-plan__badge">先行導入企業限定</span>
          <h3>1か月トライアル</h3>
          <p class="ai-plan__price">10万円</p><p class="ai-plan__tax">税別 / 1か月</p>
          <ul><li>業務ヒアリング・対象業務の選定</li><li>企業専用AI社員の初期構築</li><li>1か月の試用・改善サポート</li></ul>
          <a class="ai-plan__button ai-plan__button--primary" href="#ai-contact">先行導入について相談する</a>
        </article>
        <article class="ai-plan ai-plan--standard">
          <h3>通常導入プラン</h3>
          <div class="ai-plan__cost"><span>初期費用</span><strong>要相談</strong><span>月額利用料</span><strong>10万円</strong></div>
          <p class="ai-plan__tax">いずれも税別</p>
          <ul><li>チャット・社内システム連携</li><li>業務ナレッジの継続的な更新</li><li>稼働監視・保守・業務改善</li></ul>
          <a class="ai-plan__button ai-plan__button--outline" href="#ai-contact">お問い合わせ</a>
        </article>
      </div>
      <p class="ai-pricing__note">トライアルは1か月10万円（税別）です。通常プランの月額利用料は10万円（税別）、初期導入費用は要相談です。</p>
      <p class="ai-pricing__fine">＊初期導入費用については要相談です。専用端末代・外部API利用料・特殊なシステム連携費用は別途となる場合があります。</p>
    </div>
  `; document.querySelector('footer')?.before(pricing);

  const contact = document.createElement('section'); contact.id = 'ai-contact'; contact.className = 'ai-contact'; contact.innerHTML = `
    <div class="ai-contact__hero"><div class="ai-contact__hero-inner"><p>Contact</p><h2>お問い合わせ</h2></div></div>
    <div class="ai-contact__body">
      <div class="ai-contact__intro"><p>あなたの会社の「こんなことできない？」から、一緒に考えます。</p><p>AI社員の導入前でも、お気軽にご相談ください。</p><p class="ai-contact__email">お問い合わせ先：<a href="mailto:nakamoto.ryosuke@tonari.ac">nakamoto.ryosuke@tonari.ac</a></p></div>
      <form class="ai-contact__form" novalidate>
        <label><span>お名前 <b>必須</b></span><input name="name" type="text" placeholder="例：山田太郎" required></label>
        <label><span>会社名・団体名・学校名</span><input name="organization" type="text" placeholder="例：株式会社AI社員"></label>
        <label><span>所属・役職</span><input name="role" type="text" placeholder="例：マネージャー"></label>
        <label><span>メールアドレス <b>必須</b></span><input name="email" type="email" placeholder="例：sample@example.com" required></label>
        <label><span>電話番号</span><input name="phone" type="tel" placeholder="例：000-0000-0000"></label>
        <label><span>お問い合わせ内容 <b>必須</b></span><textarea name="message" placeholder="例：AI社員の導入について相談したい" required></textarea></label>
        <label class="ai-contact__privacy"><input name="privacy" type="checkbox" required><span><a href="#ai-contact">プライバシーポリシー</a> に同意する <b>必須</b></span></label>
        <button type="submit">入力内容を確認する <span aria-hidden="true">→</span></button>
        <p class="ai-contact__success" hidden>お問い合わせありがとうございます。内容を確認のうえご連絡します。</p>
      </form>
    </div>
  `; document.querySelector('footer')?.before(contact);
  contact.querySelector('form')?.addEventListener('submit', (event) => { event.preventDefault(); const form = event.currentTarget; if (!form.checkValidity()) { form.reportValidity(); return; } form.querySelector('.ai-contact__success').hidden = false; form.querySelector('button').disabled = true; form.querySelector('button').textContent = '送信を受け付けました'; });
  setText('.footer__tagline', '人とAIが、チームになる。'); const footerLogo = document.querySelector('.footer__logo'); if (footerLogo) footerLogo.outerHTML = '<span class="ai-footer-logo">AI社員</span>'; setText('.footer__address', 'あなたの会社の仕事を覚えたAI社員が、チームの一員として業務を支えます。'); setText('.footer__bottom small', '© 2026 AI社員'); document.querySelectorAll('.footer__nav a').forEach((a, i) => { if (i === 3) a.remove(); }); document.querySelectorAll('.footer__nav a').forEach((a, i) => { const labels = ['トップ','AI社員とは','できること','よくある質問','料金プラン','お問い合わせ','プライバシーポリシー']; const hrefs = ['#top','#about','#services','#faq','#pricing','#ai-contact','#ai-contact']; a.textContent = labels[i] || a.textContent; if (hrefs[i]) a.href = hrefs[i]; });
  document.querySelector('.flow')?.setAttribute('aria-label', 'AI社員が人とチームをつなぐ関係図');
  document.querySelector('.members__scroller')?.setAttribute('aria-label', 'AI社員一覧');
  document.querySelector('.pitch__viewer iframe')?.setAttribute('title', 'AI社員導入資料');
})();

;// ===== improvements =====
(() => {
  document.title = "AI社員 | 会社の仕事を覚え、チームを支えるAI";
  const lead = document.querySelector('.hero__lead');
  if (lead) lead.innerHTML = '企業ごとの仕事を覚え、チャットの依頼から実務を支援。<br>AI社員の導入・運用をサポートするサービスです。';
  const problem = document.querySelector('.problem');
  problem?.insertAdjacentHTML('beforebegin', `<section class="explain-section" aria-labelledby="explain-title"><div class="explain-inner"><div><p class="section-en">ABOUT AI EMPLOYEE</p><h2 id="explain-title">AI社員とは？</h2></div><div><p class="explain-main">あなたの会社の仕事を覚え、<br>一緒に働くAIです。</p><p class="explain-copy">AI社員は、会社ごとの業務やルールに合わせて設定し、資料作成やデータ整理、情報収集などを支援するサービスです。チャットで仕事を依頼し、必要に応じて人が内容を確認しながら進めます。</p><a href="#services" class="explain-link">できることを見る <span>→</span></a></div></div></section>`);
  document.querySelector('.services')?.insertAdjacentHTML('afterend', `<section class="detail-section" id="strengths"><div class="detail-inner"><p class="section-en">OUR FEATURES</p><h2>AI社員の３つの強み</h2><p class="section-lead">いつもの仕事に合わせて、導入から運用まで。</p><div class="feature-grid"><article><span>01</span><h3>会社ごとに育てる</h3><p>業務マニュアルや社内ルールを整理し、会社の仕事に合わせてカスタマイズします。</p></article><article><span>02</span><h3>チャットで依頼できる</h3><p>日々の業務を、普段使うチャットから依頼。情報整理や資料作成などを支援します。</p></article><article><span>03</span><h3>導入後も一緒に改善</h3><p>ヒアリングから初期設定、試用後の見直しまで。使いながら仕事に合わせて整えます。</p></article></div></div></section><section class="use-section"><div class="detail-inner"><p class="section-en">USE CASES</p><h2>こんな仕事を任せられます</h2><p class="section-lead">まずは、毎日繰り返す仕事から。以下は活用イメージです。</p><div class="use-grid"><article><b>01</b><h3>情報収集・企業調査</h3><p>必要な情報を集め、確認しやすい形に整理します。</p></article><article><b>02</b><h3>データ整理・集計</h3><p>表やファイルの内容を整理し、集計作業を支援します。</p></article><article><b>03</b><h3>資料・文書の作成</h3><p>集めた情報をもとに、資料や文書の下書きを作成します。</p></article></div><p class="use-note">※ 対応範囲は対象業務や連携環境を確認したうえでご案内します。</p></div></section>`);
  document.querySelector('#pricing')?.insertAdjacentHTML('beforebegin', `<section class="process-section"><div class="detail-inner"><p class="section-en">HOW IT WORKS</p><h2>導入までの流れ</h2><p class="section-lead">業務の相談から、小さく試して改善するところまで。</p><div class="process-grid"><article><b>01</b><h3>お問い合わせ</h3><p>お困りの業務や、ご希望をお聞かせください。</p></article><article><b>02</b><h3>ヒアリング・ご提案</h3><p>対象業務や利用環境を確認し、進め方をご案内します。</p></article><article><b>03</b><h3>初期構築・試用</h3><p>業務に合わせて設定し、実際の仕事でお試しいただきます。</p></article><article><b>04</b><h3>振り返り・改善</h3><p>試用結果を確認し、継続や改善についてご相談します。</p></article></div></div></section>`);
  document.querySelector('#ai-contact')?.insertAdjacentHTML('beforebegin', `<section class="faq-section" id="faq"><div class="detail-inner"><p class="section-en">FAQ</p><h2>よくある質問</h2><p class="section-lead">導入前によくある疑問にお答えします。</p><div class="faq-list"><details><summary>AI社員とはどんなサービスですか？</summary><p>会社ごとの業務やルールに合わせて設定したAIが、情報収集、データ整理、資料作成などを支援するサービスです。対象業務は導入前にご相談いただけます。</p></details><details><summary>どのような仕事を依頼できますか？</summary><p>企業調査、データの整理・集計、文書や資料の下書きなどが活用例です。実際の対応範囲は、業務内容や利用環境を確認したうえでご案内します。</p></details><details><summary>AIに詳しくなくても利用できますか？</summary><p>はい。対象業務のヒアリングから初期設定、試用中のサポートまでご相談いただけます。普段のチャットから依頼する使い方を想定しています。</p></details><details><summary>トライアルには何が含まれますか？</summary><p>トライアルは税別10万円で1か月。業務ヒアリング、企業専用AI社員の初期構築、試用・改善サポートを含みます。詳細な対象範囲は事前にご相談ください。</p></details><details><summary>トライアル後は自動的に契約になりますか？</summary><p>いいえ。継続時の通常プランは月額10万円（税別）です。初期導入費用は要相談です。継続しない場合、月額契約は発生しません。</p></details><details><summary>情報の取り扱いや連携方法は相談できますか？</summary><p>はい。対象データ、利用するAIや外部サービス、社内システムとの連携範囲を事前に確認し、業務環境に応じてご相談します。</p></details></div></div></section>`);
  const originalForm = document.querySelector('.ai-contact__form');
  if (originalForm) {
    const form = originalForm.cloneNode(true);
    originalForm.replaceWith(form);
    form.querySelector('.ai-contact__privacy')?.remove();
    form.querySelector('.ai-contact__success')?.remove();
    const note = document.createElement('p');
    note.className = 'form-notice';
    note.textContent = '入力内容の確認後、メールアプリが開きます。内容を確認してから送信してください。';
    form.insertBefore(note, form.querySelector('button'));
    const button = form.querySelector('button');
    button.innerHTML = 'メールの内容を確認する <span aria-hidden="true">→</span>';
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const lines = [['お名前','name'],['会社名・団体名・学校名','organization'],['所属・役職','role'],['メールアドレス','email'],['電話番号','phone'],['お問い合わせ内容','message']];
      const body = lines.map(([label,key]) => `${label}：${data.get(key) || '未入力'}`).join('\n');
      window.location.href = `mailto:nakamoto.ryosuke@tonari.ac?subject=${encodeURIComponent('AI社員へのお問い合わせ')}&body=${encodeURIComponent(body)}`;
    });
  }
  const screen = document.querySelector('.phone__screen');
  if (screen) screen.innerHTML = `<div class="demo-chat"><div class="demo-chat__status">9:41 <span>● ● ●</span></div><div class="demo-chat__header"><span class="demo-chat__avatar">AI</span><div><b>AI社員</b><small>あなたの仕事をサポート</small></div></div><div class="demo-chat__body"><p class="demo-chat__label">今日のやりとり</p><div class="demo-chat__bubble demo-chat__bubble--user">この資料をまとめて、<br>要点を教えてください。</div><div class="demo-chat__bubble demo-chat__bubble--ai">承知しました。<br>資料を確認して、要点を整理します。</div><div class="demo-chat__file"><span>▤</span><div><b>資料の要点</b><small>整理が完了しました</small></div><strong>✓</strong></div></div><div class="demo-chat__input">メッセージを入力 <span>➜</span></div></div>`;
  document.querySelectorAll('.feature-grid article').forEach((card,i) => {const img=document.createElement('img');img.className='feature-illustration';img.alt='';img.loading='lazy';img.src=['assets/lp/flow-student.png','assets/lp/flow-infinity.png','assets/lp/flow-company.png'][i];card.prepend(img);});
  document.querySelectorAll('.use-grid article').forEach((card,i) => {const img=document.createElement('img');img.className='use-illustration';img.alt='';img.loading='lazy';img.src=['assets/lp/problem-1.png','assets/lp/problem-2.png','assets/lp/problem-3.png'][i];card.prepend(img);});
  document.querySelectorAll('a[href="#ai-contact"]').forEach(a => { if(a.textContent.includes('プライバシーポリシー')) a.remove(); });
  const title=document.querySelector('.problem__card:nth-child(2) h3');
  document.querySelectorAll('.problem__card li').forEach(li=>{if(li.textContent.includes('いつでも同じ品質'))li.textContent='必要な情報を探しやすくなる';});
})();

;// ===== refinement =====
(() => {
  const iconPaths = [
    '<path d="M21 16h26a4 4 0 0 1 4 4v27H27a6 6 0 0 0-6 6z" fill="#fff" stroke="#2457a2" stroke-width="2.5"/><path d="M21 47a6 6 0 0 0 6 6h24M29 26h15M29 32h12M29 38h10" fill="none" stroke="#4488c9" stroke-width="2.5" stroke-linecap="round"/><circle cx="50" cy="18" r="8" fill="#55b4ec"/><path d="m47 18 2 2 4-5" fill="none" stroke="#fff" stroke-width="2"/>',
    '<path d="M15 17h38a6 6 0 0 1 6 6v19a6 6 0 0 1-6 6H32L21 56v-8h-6a6 6 0 0 1-6-6V23a6 6 0 0 1 6-6Z" fill="#fff" stroke="#2457a2" stroke-width="2.5"/><circle cx="23" cy="32" r="3" fill="#4184ca"/><circle cx="34" cy="32" r="3" fill="#4184ca"/><circle cx="45" cy="32" r="3" fill="#4184ca"/>',
    '<rect x="11" y="16" width="47" height="34" rx="5" fill="#fff" stroke="#2457a2" stroke-width="2.5"/><path d="M11 26h47M17 21h2m5 0h2M20 36h13M20 42h18" stroke="#66a7dc" stroke-width="2" stroke-linecap="round"/><circle cx="49" cy="45" r="10" fill="#4aa8e0"/><path d="m45 45 3 3 5-7" fill="none" stroke="white" stroke-width="2.3" stroke-linecap="round"/>',
    '<circle cx="34" cy="21" r="8" fill="#fff" stroke="#2457a2" stroke-width="2.5"/><path d="M20 51V46c0-8 6-13 14-13s14 5 14 13v5" fill="#fff" stroke="#2457a2" stroke-width="2.5"/><circle cx="13" cy="29" r="6" fill="#9dd5f3" stroke="#397dbd" stroke-width="2"/><circle cx="55" cy="29" r="6" fill="#9dd5f3" stroke="#397dbd" stroke-width="2"/><path d="M6 50v-3c0-6 3-9 9-9m47 12v-3c0-6-3-9-9-9" fill="none" stroke="#397dbd" stroke-width="2.5" stroke-linecap="round"/>',
    '<circle cx="34" cy="34" r="23" fill="#fff" stroke="#2457a2" stroke-width="2.5"/><path d="M34 18v17l11 7" fill="none" stroke="#438bc8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="52" cy="17" r="8" fill="#56b4e4"/><path d="M52 13v8m-4-4h8" stroke="white" stroke-width="2" stroke-linecap="round"/>',
    '<path d="M14 38v-5a20 20 0 0 1 40 0v5" fill="none" stroke="#2457a2" stroke-width="4" stroke-linecap="round"/><rect x="9" y="32" width="9" height="16" rx="4" fill="#61b5e5"/><rect x="50" y="32" width="9" height="16" rx="4" fill="#61b5e5"/><path d="M53 48c-2 6-8 9-17 9" fill="none" stroke="#2457a2" stroke-width="2.5" stroke-linecap="round"/><circle cx="33" cy="56" r="3" fill="#2457a2"/><path d="M24 31h20M24 38h13" stroke="#6eaad8" stroke-width="2.5" stroke-linecap="round"/>'
  ];
  document.querySelectorAll('.partners__item img').forEach((img,i)=>{
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68"><circle cx="34" cy="34" r="32" fill="#e9f3fc"/>${iconPaths[i]}</svg>`;
    img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg); img.alt='';
  });
  const phone=document.querySelector('.steps__phone'); const screen=document.querySelector('.phone__screen');
  if(phone&&screen){
    phone.removeAttribute('aria-hidden');
    screen.innerHTML=`<div class="demo-chat demo-chat--interactive"><div class="demo-chat__status">9:41 <span>● ● ●</span></div><div class="demo-chat__header"><span class="demo-chat__avatar">AI</span><div><b>AI社員</b><small>操作イメージ・サンプル</small></div></div><div class="demo-chat__body"><p class="demo-chat__label">依頼を選んでみましょう</p><div class="demo-choices"><button type="button" data-demo="report">資料をまとめる</button><button type="button" data-demo="research">企業を調べる</button><button type="button" data-demo="receipt">領収書を整理</button></div><div class="demo-thread" aria-live="polite"></div></div><p class="demo-disclaimer">※実際の動作をイメージしたサンプルです</p></div>`;
    const examples={report:['この資料の要点をまとめてください。','承知しました。資料の内容を整理し、要点の下書きを作成しました。','資料の要点・下書き'],research:['商談先について調べてください。','企業の基本情報や事業内容を整理しました。出典と合わせてご確認ください。','企業調査メモ・下書き'],receipt:['領収書を整理してください。','領収書の情報を整理し、確認用の一覧を作成しました。','経費一覧・確認用']};
    const thread=screen.querySelector('.demo-thread');
    function choose(key){const [q,a,file]=examples[key];screen.querySelectorAll('[data-demo]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.demo===key)));thread.innerHTML=`<div class="demo-chat__bubble demo-chat__bubble--user"></div><div class="demo-chat__bubble demo-chat__bubble--ai"></div><div class="demo-chat__file"><span>▤</span><div><b></b><small>内容は人が確認します</small></div><strong>✓</strong></div>`;thread.children[0].textContent=q;thread.children[1].textContent=a;thread.querySelector('b').textContent=file;}
    screen.querySelectorAll('[data-demo]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.demo))); choose('report');
  }
  const features=document.querySelectorAll('.feature-grid article p');
  if(features[0])features[0].textContent='業務の手順や書類の型、社内ルールを整理し、会社の仕事に合わせて設定します。';
  if(features[1])features[1].textContent='いつものチャットから、資料の要約や情報整理などを依頼できます。';
  if(features[2])features[2].textContent='業務のヒアリングから初期設定、試用後の見直しまで、一緒に進めます。';
  const descriptions=document.querySelectorAll('.use-grid article p');
  if(descriptions[0])descriptions[0].textContent='商談先の事業内容や基本情報を集め、出典とともに確認しやすく整理。';
  if(descriptions[1])descriptions[1].textContent='領収書や売上データなどを整理し、確認・集計のための一覧作成を支援。';
  if(descriptions[2])descriptions[2].textContent='会議のメモや資料をもとに、議事録や報告書の下書きを作成。';
  const banner=document.querySelector('.services__banner');if(banner){banner.setAttribute('aria-label','AI社員の業務支援について相談する');}
})();

;// ===== polish =====
(() => {
  const tagline=document.querySelector('.gnav__logo small');
  if(tagline)tagline.textContent='24時間、会社で働くAI社員。';
  const lead=document.querySelector('.hero__lead');
  if(lead)lead.innerHTML='24時間、あなたの会社で働くAI社員。<br>仕事を覚え、チャットの依頼から業務を進めます。';
  const intro=document.querySelector('.explain-main');
  if(intro)intro.innerHTML='会社の仕事を覚えて、<br>24時間働くAI社員。';
  const desc=document.querySelector('.explain-copy');
  if(desc)desc.textContent='AI社員は、会社ごとの業務やルールに合わせて設定し、情報収集やデータ整理、資料作成などの仕事を支援するサービスです。いつものチャットで依頼でき、必要に応じて人が内容を確認しながら進めます。';
  const banner=document.querySelector('.services__banner');
  if(banner){banner.href='#strengths';banner.classList.add('feature-banner');banner.removeAttribute('aria-label');banner.innerHTML=`<span class="feature-banner__mark" aria-hidden="true">AI</span><span class="feature-banner__body"><strong>あなたの会社の、AI社員。</strong><small>仕事を覚え、いつものチャットから業務を進めます。</small></span><span class="feature-banner__arrow" aria-hidden="true">↗</span>`;}
  const rows=document.querySelectorAll('.service-row');
  const labels=[['社内ナレッジを覚える','業務の手順やルールを蓄積'],['定型業務を進める','情報収集やデータ整理を支援'],['資料・レポートを作成する','伝えたい内容を整理して下書き']];
  rows.forEach((row,i)=>{if(!labels[i])return;row.href='#use-cases';row.innerHTML=`<span class="service-row__copy"><strong>${labels[i][0]}</strong><small>${labels[i][1]}</small></span><span class="service-row__arrow" aria-hidden="true">↗</span>`});
  const use=document.querySelector('.use-section');if(use)use.id='use-cases';
  const more=document.querySelector('.services__heading .view-more');if(more)more.href='#use-cases';
})();

;// ===== detail-fixes =====
(() => {
  const title=document.querySelector('.hero__title');
  if(title) title.innerHTML='<span><strong>採用</strong><em>するのは、</em></span><span><strong>人だけ</strong><em>じゃない。</em></span>';
  const body=document.querySelector('.hero__register .btn-ico');if(body)body.textContent='';
  document.querySelectorAll('.flow__arrow').forEach((arrow,i)=>{
    arrow.classList.remove('a3d-text3d','a3d-live');
    arrow.innerHTML=`<span class="flow-label">${i===0?'仕事を依頼':'業務を実行'}</span><span class="flow-line" aria-hidden="true"></span><span class="flow-sub">${i===0?'手順やルールを共有':'結果を確認・活用'}</span>`;
  });
  const first=document.querySelector('.feature-banner');
  if(first){first.innerHTML='<span class="service-row__copy"><strong>チャットで仕事を依頼</strong><small>普段の言葉で頼めるAI社員</small></span><span class="service-row__arrow" aria-hidden="true">↗</span>';first.classList.add('service-row');}
  const screen=document.querySelector('.phone__screen');
  if(screen){
    screen.innerHTML=`<div class="demo-chat demo-chat--interactive"><div class="demo-chat__status">9:41 <span>● ● ●</span></div><div class="demo-chat__header"><span class="demo-chat__avatar">AI</span><div><b>AI社員</b><small>オンライン · 操作サンプル</small></div><span class="demo-menu">•••</span></div><div class="demo-chat__body"><p class="demo-date">今日</p><div class="demo-thread" aria-live="polite"></div><p class="demo-prompt">別の仕事を依頼してみる</p><div class="demo-choices"><button type="button" data-demo="report">資料をまとめる</button><button type="button" data-demo="research">企業を調べる</button><button type="button" data-demo="receipt">領収書を整理</button></div></div><div class="demo-compose"><span aria-hidden="true">＋</span><span>メッセージを入力</span><span aria-hidden="true">➤</span></div><p class="demo-disclaimer">※操作イメージです。実際の画面とは異なります</p></div>`;
    const samples={report:['この資料の要点をまとめてください。','承知しました。資料を確認し、重要なポイントを整理します。','要点のまとめ','3つのポイントに整理しました。','資料要約.pdf'],research:['次の商談先について調べてください。','承知しました。事業内容や基本情報を調べ、出典と一緒に整理します。','企業調査メモ','事業内容・企業情報をまとめました。','企業調査メモ.pdf'],receipt:['今月の領収書を整理してください。','承知しました。日付・金額・内容を読み取り、確認用の一覧を作成します。','経費一覧','読み取った内容を一覧にしました。','経費一覧.xlsx']};
    const thread=screen.querySelector('.demo-thread');
    const choose=key=>{const [q,a,heading,detail,file]=samples[key];screen.querySelectorAll('[data-demo]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.demo===key)));thread.innerHTML=`<div class="demo-message demo-message--user"><div class="demo-chat__bubble demo-chat__bubble--user"></div><small>既読 9:41</small></div><div class="demo-message demo-message--assistant"><span class="demo-message__avatar">AI</span><div><b class="demo-sender">AI社員 <small>9:42</small></b><div class="demo-chat__bubble demo-chat__bubble--ai"></div><div class="demo-result"><strong></strong><span></span><div class="demo-result__file"><i aria-hidden="true">▤</i><span></span><b>✓</b></div></div></div></div>`;thread.querySelector('.demo-chat__bubble--user').textContent=q;thread.querySelector('.demo-chat__bubble--ai').textContent=a;thread.querySelector('.demo-result>strong').textContent=heading;thread.querySelector('.demo-result>span').textContent=detail;thread.querySelector('.demo-result__file span').textContent=file;};
    screen.querySelectorAll('[data-demo]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.demo)));choose('report');
  }
})();

;// ===== site-completion =====
(() => {
  // Reuse the original 48-frame 3D arrow asset; remove only the garbled labels.
  document.querySelectorAll('.flow__arrow--3d').forEach(arrow => {
    arrow.innerHTML='<div class="a3d" aria-hidden="true"><div class="a3d__rot"><span class="a3d__sprite"></span></div></div>';
  });
  const lead=document.querySelector('.hero__lead');
  if(lead)lead.innerHTML='24時間、あなたの会社で働くAI社員。<br>いつものチャットで頼むだけ。仕事を覚え、実務を進めます。';
  const intro=document.querySelector('.explain-copy');
  if(intro)intro.textContent='AI社員は、会社ごとの業務手順やルールを覚え、いつものチャットから頼まれた仕事を進めるサービスです。情報収集、データ整理、資料作成などの業務に合わせて設定し、導入後の運用もサポートします。';
  const cards=document.querySelectorAll('.problem__card');
  const problemItems=[['単純作業に追われ、本来の仕事に集中できない。','情報を集めて資料にまとめる作業が多い','同じデータを何度も入力している','営業やお客様対応に時間を使いたい'],['担当者しか分からない仕事がたくさんある。','手順や判断の基準が人によって違う','担当者が休むと仕事が止まってしまう','引き継ぎに時間がかかる'],['人手が足りない。でも、簡単には採用できない。','増えた業務を今の人数で抱えている','人を採る時間や費用を確保しづらい','まずは一部の仕事から改善したい']];
  cards.forEach((card,i)=>{if(!problemItems[i])return;card.querySelector('h3').textContent=problemItems[i][0];card.querySelectorAll('li').forEach((li,j)=>li.textContent=problemItems[i][j+1]);});
  const use=document.querySelector('.use-section');
  use?.insertAdjacentHTML('beforebegin', `<section class="work-example" aria-labelledby="work-example-title"><div class="work-example__inner"><div class="work-example__heading"><p class="section-en">HOW AI WORKS</p><h2 id="work-example-title">頼んだ仕事が、<br>確認できる形に。</h2><p>チャットでの依頼から、AI社員による作業、担当者の確認まで。<br>普段の業務に合わせた進め方を設計します。</p><span>※ 以下は活用イメージです。</span></div><div class="work-example__steps"><article><b>01</b><div><small>依頼する</small><h3>「商談先について調べて」</h3><p>いつものチャットから、会社名と調べたい内容を伝えます。</p></div></article><article><b>02</b><div><small>AI社員が進める</small><h3>必要な情報を調べて整理</h3><p>事業内容などの情報を集め、出典と合わせて読みやすくまとめます。</p></div></article><article><b>03</b><div><small>人が確認する</small><h3>調査メモを受け取る</h3><p>内容を確認し、商談準備や資料作成に活用できます。</p></div></article></div></div></section>`);
  const members=document.querySelector('.members');
  if(members) members.outerHTML=`<section class="business-work"><div class="business-work__inner"><p class="section-en">WORK SCENES</p><h2>部署をまたいで、<br>いつもの仕事を支える。</h2><p class="business-work__lead">会社ごとの業務に合わせ、まずは任せたい仕事から。<br>以下は対象業務の例です。</p><div class="business-work__grid"><article><span>01</span><h3>営業</h3><p>商談先の調査、企業情報の整理、提案資料の下書き。</p></article><article><span>02</span><h3>経理・総務</h3><p>領収書の整理、データの集計、書類作成の準備。</p></article><article><span>03</span><h3>会議・社内業務</h3><p>会議メモの整理、議事録の下書き、社内情報の検索。</p></article><article><span>04</span><h3>教育・研修</h3><p>研修資料のたたき台、アンケート結果の整理。</p></article></div><p class="business-work__note">※ 対応する業務・使用するツールは、導入前に確認のうえ個別にご案内します。</p></div></section>`;
  const trial=document.querySelector('.ai-plan--trial ul');if(trial)trial.innerHTML='<li>業務ヒアリング・対象業務の選定</li><li>企業専用AI社員の初期構築</li><li>業務ナレッジの登録・初期設定</li><li>1か月間の試用・改善サポート</li>';
  const note=document.querySelector('.ai-pricing__note');if(note)note.textContent='トライアルは1か月10万円（税別）です。通常プランの月額利用料は10万円（税別）、初期導入費用は要相談です。';
  const fine=document.querySelector('.ai-pricing__fine');if(fine)fine.textContent='＊初期導入費用については要相談です。通常プランの月額利用料は10万円（税別）です。専用端末代・外部API利用料・特殊な連携費用は別途となる場合があります。';
  document.querySelector('.partners')?.setAttribute('aria-label','AI社員の特徴');
})();

;// ===== expansion =====
(() => {
  const about=document.querySelector('.explain-section');
  about?.insertAdjacentHTML('afterend', `<section class="difference-section" aria-labelledby="difference-title"><div class="exp-inner"><div class="exp-heading"><div><p class="section-en">WHAT IS AI EMPLOYEE?</p><h2 id="difference-title">「答える」から、<br>「仕事を進める」へ。</h2></div><p>質問への回答だけでなく、会社の仕事に沿って、<br>情報を集め、整理し、成果物の下書きまで進めます。</p></div><div class="difference-grid"><article class="difference-grid__general"><p class="difference-label">普段のAIチャット</p><h3>質問して、回答を受け取る</h3><p>人が情報を集め、必要な内容を入力。<br>返ってきた回答をもとに作業を進めます。</p></article><div class="difference-separator" aria-hidden="true">→</div><article class="difference-grid__employee"><p class="difference-label">AI社員</p><h3>仕事を依頼して、結果を確認する</h3><p>会社の手順に合わせて、調査・整理・下書きなどを進めます。内容を確認し、次の仕事に活かせます。</p></article></div><p class="exp-note">※ 業務内容、利用環境、AIに任せる範囲は導入前に確認します。</p></div></section>`);
  const use=document.querySelector('.use-section');
  use?.insertAdjacentHTML('afterend', `<section class="work-menu" id="work-menu" aria-labelledby="work-menu-title"><div class="exp-inner"><div class="exp-heading"><div><p class="section-en">WORK MENU</p><h2 id="work-menu-title">こんな仕事から、<br>任せてみませんか。</h2></div><p>「何ができるか」よりも、<br>「今、困っている仕事」から考えます。</p></div><p class="work-menu__disclaimer">以下は活用イメージです。実際の対応範囲は、業務内容や環境を確認のうえご案内します。</p><div class="work-menu__tabs" role="tablist" aria-label="業務例の種類"><button role="tab" id="work-tab-sales" aria-controls="work-panel" aria-selected="true" data-work="sales">営業</button><button role="tab" id="work-tab-backoffice" aria-controls="work-panel" aria-selected="false" data-work="backoffice">経理・総務</button><button role="tab" id="work-tab-meeting" aria-controls="work-panel" aria-selected="false" data-work="meeting">会議・研修</button></div><div class="work-menu__panel" id="work-panel" role="tabpanel" aria-labelledby="work-tab-sales"><div class="work-menu__brief"><span class="work-menu__number">01 / SALES</span><h3></h3><p></p><a href="#ai-contact">この仕事について相談する <span>→</span></a></div><div class="work-menu__detail"><p class="work-menu__eyebrow">例えば、こんな流れ</p><ol><li></li><li></li><li></li></ol><div class="work-menu__deliverable"><span>確認するもの</span><strong></strong></div></div></div></div></section>`);
  const workItems={sales:{no:'01 / SALES',title:'商談前の企業調査を、\n確認しやすい資料に。',summary:'商談先の事業内容や公開情報を整理し、準備のための情報収集を支援します。',steps:['チャットで会社名と調べたい内容を伝える','公開情報を集め、事業内容などを整理する','出典を確認できるメモとして受け取る'],output:'企業調査メモ・出典一覧'},backoffice:{no:'02 / BACK OFFICE',title:'領収書の整理や集計を、\n確認しやすい一覧に。',summary:'日付・金額・内容などを整理し、経費確認のための下準備を支援します。',steps:['対象の領収書やデータを用意する','必要な項目を読み取り、一覧に整理する','不明な項目を含め、人が内容を確認する'],output:'経費一覧・確認が必要な項目'},meeting:{no:'03 / MEETING',title:'会議や研修の情報を、\n次の行動につなげる。',summary:'会議メモやアンケート結果から、要点や確認事項を整理します。',steps:['会議メモや回答データを用意する','要点・決定事項などを整理する','担当者が内容を確認し、共有する'],output:'議事録・アンケート集計の下書き'}};
  const tabs=[...document.querySelectorAll('[data-work]')];const panel=document.querySelector('#work-panel');
  function showWork(key){const item=workItems[key];if(!item||!panel)return;tabs.forEach(t=>{const selected=t.dataset.work===key;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1});panel.setAttribute('aria-labelledby',`work-tab-${key}`);panel.querySelector('.work-menu__number').textContent=item.no;panel.querySelector('h3').textContent=item.title;panel.querySelector('.work-menu__brief p').textContent=item.summary;panel.querySelectorAll('li').forEach((li,i)=>li.textContent=item.steps[i]);panel.querySelector('.work-menu__deliverable strong').textContent=item.output;}
  tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>showWork(tab.dataset.work));tab.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();const next=(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next].focus();showWork(tabs[next].dataset.work);});});showWork('sales');
  const process=document.querySelector('.process-section');
  process?.insertAdjacentHTML('beforebegin', `<section class="day-section" aria-labelledby="day-title"><div class="exp-inner"><div class="exp-heading"><div><p class="section-en">A DAY WITH AI</p><h2 id="day-title">AI社員がいる、<br>ある一日のイメージ。</h2></div><p>頼んだ仕事が進み、<br>人は確認や判断に集中できます。</p></div><div class="day-timeline"><article><time>09:00</time><div><span>依頼</span><h3>今日の仕事を伝える</h3><p>商談先の調査や、資料の下書きをチャットで依頼。</p></div></article><article><time>12:00</time><div><span>作業</span><h3>AI社員が情報を整理</h3><p>対象の情報を集め、決めた手順に沿って作業を進めます。</p></div></article><article><time>15:00</time><div><span>確認</span><h3>成果物を確認する</h3><p>担当者が出典や内容を確認し、必要な調整を行います。</p></div></article><article><time>18:00</time><div><span>次の準備</span><h3>次の仕事につなげる</h3><p>確認した内容を使って、次の商談や社内業務を進めます。</p></div></article></div><p class="exp-note">※ 時刻・業務内容はイメージです。実際の稼働方法は設定や利用環境により異なります。</p></div></section>`);
  const pricing=document.querySelector('#pricing');
  pricing?.insertAdjacentHTML('beforebegin', `<section class="support-section" aria-labelledby="support-title"><div class="exp-inner"><div class="support-section__intro"><p class="section-en">IMPLEMENTATION &amp; SUPPORT</p><h2 id="support-title">導入して終わりにしない。<br>会社の仕事に合わせて整える。</h2><p>今の業務を伺い、どの仕事から始めるかを一緒に考えます。試用後は使い方を振り返り、必要な調整や継続について相談できます。</p><a href="#ai-contact">導入について相談する <span>→</span></a></div><div class="support-section__list"><article><b>01</b><div><h3>仕事を聞く</h3><p>現状の手順、使っているツール、お困りごとを確認します。</p></div></article><article><b>02</b><div><h3>任せる範囲を決める</h3><p>対象業務と、人が確認する場面を整理します。</p></div></article><article><b>03</b><div><h3>試して改善する</h3><p>試用結果を振り返り、使い方や設定を見直します。</p></div></article></div></div></section>`);
  const faq=document.querySelector('.faq-list');
  faq?.insertAdjacentHTML('beforeend', `<details><summary>最初にどの仕事を任せればよいですか？</summary><p>繰り返し発生し、手順や成果物を確認しやすい仕事から始めることをおすすめします。現在の業務を伺いながら対象を一緒に検討します。</p></details><details><summary>AIが作った内容は確認できますか？</summary><p>はい。調査結果や下書きなどは担当者が内容を確認し、必要に応じて修正してご利用いただけます。確認が必要な場面は業務に合わせて整理します。</p></details><details><summary>専用端末やAIの利用料は料金に含まれますか？</summary><p>専用端末代、外部API利用料、特殊なシステム連携費用は別途となる場合があります。対象業務と利用環境を確認してご案内します。</p></details>`);
  const contact=document.querySelector('#ai-contact');
  contact?.insertAdjacentHTML('beforebegin', `<section class="last-cta"><div><p class="section-en">LET'S GET STARTED</p><h2>その仕事、AI社員に<br>任せてみませんか。</h2><p>具体的な業務が決まっていなくても大丈夫です。<br>まずは今の仕事のお悩みからお聞かせください。</p><a href="#ai-contact">導入を相談する <span>→</span></a></div></section>`);
})();

;// ===== user-refinements =====
(() => {
  // Restore the supplied reference's photo and add its identifying label.
  const portrait=document.querySelector('.hero__photo--1');
  if(portrait){portrait.src='assets/reference/kinchan.png';portrait.alt='AI社員きんちゃん';}
  const photos=document.querySelector('.hero__photos');
  if(photos&&!photos.querySelector('.kinchan-label'))photos.insertAdjacentHTML('beforeend','<span class="kinchan-label"><span class="kinchan-label__role"><span class="kinchan-label__ai">AI</span>社員</span><strong>きんちゃん</strong></span>');
  const intro=document.querySelector('.explain-inner > div:first-child');
  if(intro && !intro.querySelector('.intro-illustration')) intro.insertAdjacentHTML('beforeend', `<div class="intro-illustration" aria-hidden="true"><img src="assets/lp/flow-student.png" alt=""><span class="intro-illustration__line"></span><img src="assets/lp/flow-infinity.png" alt=""><span class="intro-illustration__line"></span><img src="assets/lp/flow-company.png" alt=""></div>`);
  const general=document.querySelector('.difference-grid__general');
  const employee=document.querySelector('.difference-grid__employee');
  if(general) general.insertAdjacentHTML('afterbegin', `<div class="difference-illustration" aria-hidden="true"><svg viewBox="0 0 72 54" fill="none"><rect x="4" y="5" width="51" height="36" rx="8" stroke="currentColor" stroke-width="2.5"/><path d="M16 18h27M16 26h18M18 41l-4 8 13-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="57" cy="38" r="12" fill="#e8f1fa" stroke="currentColor" stroke-width="2"/><path d="M53 38h8M57 34v8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></div>`);
  if(employee) employee.insertAdjacentHTML('afterbegin', `<div class="difference-illustration difference-illustration--light" aria-hidden="true"><svg viewBox="0 0 72 54" fill="none"><rect x="7" y="4" width="42" height="46" rx="5" stroke="currentColor" stroke-width="2.5"/><path d="M17 16h22M17 24h22M17 32h12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="54" cy="36" r="14" fill="#213a89" stroke="currentColor" stroke-width="2"/><path d="m48 36 4 4 8-9" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`);
  const heading=document.querySelector('.solution__heading');
  if(heading){
    heading.classList.remove('reveal','is-visible');
    heading.innerHTML='<span class="ai-solution-mark">AI社員</span><span class="ai-solution-suffix">が解決します！</span>';
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heading.classList.add('solution-entrance');
      const io = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('solution-entrance--shown');
        else if (entry.boundingClientRect.top > 0) entry.target.classList.remove('solution-entrance--shown');
      }), { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
      io.observe(heading);
    }
  }
  document.querySelectorAll('.work-example,.work-menu,.business-work,.process-section,.support-section').forEach(e=>e.remove());
  const strengths=document.querySelector('#strengths');
  if(strengths)strengths.outerHTML=`<section class="strength-reference" id="strengths"><div class="strength-reference__inner"><h2>AI社員の<span>３つの強み</span></h2><div class="strength-reference__grid"><article><header><b>01</b><h3><strong>24時間</strong><br>365日働く</h3></header><p>夜でも休日でも。依頼された仕事を、設定した手順に沿って進めます。</p><div class="strength-subtitle">AI社員の1日 <small>（イメージ）</small></div><ul class="time-list"><li><time>01:00</time> 資料のたたき台を作成</li><li><time>04:00</time> アンケート結果を整理</li><li><time>07:30</time> 営業先の情報をまとめる</li><li><time>09:00</time> 担当者が内容を確認</li></ul></article><article><header><b>02</b><h3>チャットで<br><strong>頼んで仕事を進める</strong></h3></header><p>いつものチャットで話しかけるだけ。業務に合わせて情報を整理し、成果物の下書きを作ります。</p><div class="strength-chat"><span>頼む</span><img src="assets/reference/laptop.png" alt=""><span>→</span><span>実行</span></div><div class="strength-subtitle">普段のツールから依頼</div><p class="strength-small">利用するチャットや連携範囲は、導入時にご相談いただけます。</p></article><article><header><b>03</b><h3>御社専用に<br><strong>育つ</strong></h3></header><p>会社の仕事・言葉・ルールを覚えて、使うほど会社に合ったAI社員へ。</p><div class="strength-subtitle">覚えること</div><ul class="check-list"><li>仕事の手順</li><li>書類の型・社内ルール</li><li>修正した内容</li><li>お客様ごとの情報</li><li>業務ごとのこだわり</li></ul></article></div><div class="strength-reference__note">※ 掲載内容は活用イメージです。対応範囲や稼働方法は利用環境により異なります。</div><h2 class="department-title">AI社員は、<span>さまざまな部署の仕事</span>を支えます。</h2><p class="department-lead">営業も経理も総務も。まずは御社で任せたい仕事から。</p><div class="department-grid"><article><h3>営業</h3><p>商談先の調査・日程調整<br>お礼メールの下書き</p></article><article><h3>広報・マーケ</h3><p>記事・SNS投稿の下書き<br>情報収集</p></article><article><h3>経理</h3><p>領収書の整理<br>請求書の下書き</p></article><article><h3>人事・労務</h3><p>求人情報の整理<br>勤怠データの集計補助</p></article><article><h3>総務</h3><p>議事録の作成<br>書類や予定の整理</p></article><article><h3>経営企画</h3><p>会議資料の準備<br>情報・データの集計</p></article><article><h3>お客様窓口</h3><p>問い合わせ内容の整理<br>返信文の下書き</p></article><article><h3>教育・研修</h3><p>研修資料の作成補助<br>アンケート集計</p></article></div><p class="strength-reference__note">※ 対応する業務やツールは、導入前に確認のうえご案内します。</p></div></section>`;
  const usage=document.querySelector('.use-section');
  usage?.insertAdjacentHTML('afterend', `<section class="growth-section"><div class="growth-inner"><h2>AI社員を迎える準備から、<br><span>使い続けるための改善まで。</span></h2><p class="growth-lead">御社の仕事に合わせて、導入から運用までサポートします。</p><div class="growth-steps"><article><div class="growth-visual"><b>01</b><img src="assets/reference/baby.png" alt=""></div><h3>誕生 <small>準備・初期設定</small></h3><p>お任せしたい仕事や環境を伺い、AI社員の初期設定を行います。</p></article><article><div class="growth-visual"><b>02</b><img src="assets/reference/toddler.png" alt=""></div><h3>入社 <small>仕事を覚える</small></h3><p>会社ごとの仕事の手順やルールを整理し、実際の業務で試します。</p></article><article><div class="growth-visual growth-visual--pair"><b>03</b><img src="assets/reference/junior.png" alt=""><img src="assets/reference/senior.png" alt=""></div><h3>改善 <small>継続サポート</small></h3><p>試用状況を振り返り、使い方や設定を見直しながら改善します。</p></article></div><div class="growth-reasons"><div><h3>会社にAI社員が<br>馴染む理由</h3><p>教えたことが、<br>会社の力に。</p></div><div><article><b>会社のルールを覚える</b><p>仕事の手順や書類の型を整理し、業務に合わせて設定します。</p></article><article><b>修正を次に活かす</b><p>確認した内容をもとに、仕事の進め方を見直します。</p></article><article><b>仕事のやり方を残す</b><p>業務の手順を整理し、担当者間で共有しやすくします。</p></article></div></div></div></section>`);
  const screen=document.querySelector('.phone__screen');const steps=document.querySelector('[data-steps]');
  const views=[`<div class="slack-top">● ● ●<b>Slack</b></div><div class="slack-channel"># 経理 <span>★</span></div><div class="slack-body"><div class="slack-message"><i class="slack-person">☺</i><div><b>あなた <small>10:02</small></b><p>A社さんの請求書、<br>つくっておいて 🙏</p></div></div><div class="slack-message"><img src="assets/reference/kinchan.png" alt=""><div><b>AI社員 <em>APP</em> <small>10:02</small></b><p>承知しました！<br>すぐ作ります 📝</p><div class="slack-progress">◌　請求書を作成中…</div></div></div><div class="slack-message"><img src="assets/reference/kinchan.png" alt=""><div><b>AI社員 <em>APP</em> <small>10:05</small></b><p>できました！ご確認ください ✅</p><div class="slack-file">📄　請求書_株式会社A.pdf</div><p>送付用のメールも下書きしました ✉</p></div></div></div><div class="slack-input"># 経理 へのメッセージ<br><b>Ｂ　Ⅰ　＠　⌕　➤</b></div>`,
  `<div class="sample-window"><div class="sample-appbar"><span class="sample-appmark">M</span><b>請求書</b><small>下書き</small></div><div class="invoice-page"><p class="invoice-name">請 求 書</p><h4>株式会社A 御中</h4><p class="invoice-line">ご請求金額</p><strong class="invoice-price">¥330,000 <small>（税込）</small></strong><table><tr><th>品目</th><th>金額</th></tr><tr><td>業務委託費</td><td>¥300,000</td></tr><tr><td>消費税</td><td>¥30,000</td></tr></table><p class="invoice-comment">内容を確認してから、<br>担当者が送付します。</p></div><div class="sample-foot">✓　請求書の下書きを作成しました</div></div>`,
  `<div class="sample-window mail-window"><div class="mail-top"><span>Ｍ</span><b>メール下書き</b><small>−　□　×</small></div><div class="mail-fields"><p><span>宛先</span> 株式会社A ご担当者様</p><p><span>件名</span> 請求書送付のご案内</p></div><div class="mail-body">いつもお世話になっております。<br><br>今月分の請求書をお送りいたします。<br>ご確認のほどお願いいたします。<div class="mail-file">📄　請求書_株式会社A.pdf</div></div><div class="mail-bottom"><span>送信</span>　Ａ　↗　☷　•••</div><p class="mail-note">※ 内容を確認後、担当者が送信します</p></div>`];
  if(screen&&steps){screen.innerHTML='<div class="phone-views">'+views.map((v,i)=>`<div class="phone-view" data-phone-view="${i}">${v}</div>`).join('')+'</div>';const sync=()=>{let i=Number(steps.dataset.index||0);screen.querySelectorAll('.phone-view').forEach((v,j)=>{v.classList.toggle('is-current',j===i);v.setAttribute('aria-hidden',String(j!==i));});};new MutationObserver(sync).observe(steps,{attributes:true,attributeFilter:['data-index']});sync();}
  const chips=[['チャットで依頼','いつものチャットで、仕事を頼む。','普段使っているチャットから、請求書の作成を依頼。AI社員が内容を確認して仕事を進めます。'],['請求書を作成','請求書の下書きができあがる。','依頼内容に沿って請求書を作成。金額や宛先は、担当者が確認できます。'],['メールを下書き','送付用のメールも、まとめて準備。','作成した請求書に合わせて送付文を下書き。内容を確認してから担当者が送信します。']];
  document.querySelectorAll('.chip').forEach((chip,i)=>{if(!chips[i])return;const head=chip.querySelector('.chip__head');if(head){let icon=head.querySelector('.chip__icon');head.replaceChildren(icon,document.createTextNode(chips[i][0]));}let title=chip.querySelector('.chip__title'),p=chip.querySelector('.chip__inner p');if(title)title.textContent=chips[i][1];if(p)p.textContent=chips[i][2];});
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches && 'IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('reference-reveal--shown'); reveal.unobserve(entry.target); } }), {threshold: 0.12});
    document.querySelectorAll('.growth-steps article,.strength-reference__grid article').forEach((element, index) => { element.classList.add('reference-reveal'); element.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`); reveal.observe(element); });
  }
  const eyebrow=document.querySelector('.steps__eyebrow');if(eyebrow)eyebrow.textContent='AI社員に仕事を頼むと';
})();

;// ===== clarity =====
(() => {
  const set=(selector,text)=>{const node=document.querySelector(selector);if(node)node.textContent=text;};
  const hero=document.querySelector('.hero__lead');
  if(hero)hero.innerHTML='人手不足や事務作業に悩む中小企業へ。<br>請求書・企業調査・議事録の作成を、<br>チャットで依頼できるAI社員です。';
  set('.problem__title','こんな仕事に、人手や時間を取られていませんか？');
  const titles=['請求書や資料づくりに、毎日時間がかかる。','担当者しか分からない仕事がある。','人を増やしたいけれど、採用が難しい。'];
  document.querySelectorAll('.problem__card h3').forEach((h,i)=>{if(titles[i])h.textContent=titles[i]});
  const solution=document.querySelector('.solution'), explain=document.querySelector('.explain-section'), difference=document.querySelector('.difference-section');
  if(solution&&explain&&difference)solution.after(explain,difference);
  set('.explain-main','人手が足りない会社の、繰り返す事務作業を手伝います。');
  set('.explain-copy','AI社員は、会社の仕事の手順や書類の形式に合わせて設定するサービスです。たとえば、チャットで請求書の作成を依頼すると、AIが下書きを準備。担当者が内容を確認してから送付できます。');
  set('#difference-title','AIに質問するだけでなく、\n仕事の下準備まで任せられます。');
  const explainHeading=document.querySelector('.difference-section .exp-heading>p');if(explainHeading)explainHeading.textContent='調べた内容や作成した下書きを受け取り、人が確認してから使えます。';
  const gen=document.querySelector('.difference-grid__general'); if(gen){gen.querySelector('h3').textContent='回答を見ながら、自分で作業';let p=gen.querySelector('p:last-child');if(p)p.textContent='AIに書き方を聞いた後、必要な情報を集め、書類を自分で作成します。';}
  const emp=document.querySelector('.difference-grid__employee');if(emp){emp.querySelector('h3').textContent='作成を依頼し、下書きを確認';let p=emp.querySelector('p:last-child');if(p)p.textContent='会社の手順に合わせて請求書などの下書きを準備。担当者が確認して仕上げます。';}
  const cases=document.querySelectorAll('.use-grid article');const examples=[['営業先の企業調査','会社名をチャットで伝えると、公開情報を整理。事業内容と出典を、商談前の確認メモにまとめます。'],['請求書・領収書の整理','取引情報や領収書の内容を整理し、請求書の下書きや確認用の一覧を作成します。'],['会議の議事録づくり','会議メモから、決定事項や担当者、次にやることを整理した議事録の下書きを作成します。']];
  cases.forEach((card,i)=>{if(!examples[i])return;const h=card.querySelector('h3'),p=card.querySelector('p');if(h)h.textContent=examples[i][0];if(p)p.textContent=examples[i][1];});
  set('.use-section .section-lead','次のような仕事から、会社の環境に合わせてお試しいただけます。');
  const growth=document.querySelector('.growth-lead'); if(growth)growth.textContent='相談から初期設定、1か月の試用、継続する場合の運用改善まで支援します。';
  const lead=document.querySelector('.department-lead');if(lead)lead.textContent='まずは1つの業務から。対象となる仕事と使用ツールをお伺いしてご提案します。';
  const ctasection=document.querySelector('.use-section .detail-inner');if(ctasection&&!ctasection.querySelector('.clarity-cta'))ctasection.insertAdjacentHTML('beforeend','<a class="clarity-cta" href="#ai-contact">この仕事を任せられるか相談する <span aria-hidden="true">→</span></a>');
  const faq=document.querySelector('.faq-list');if(faq)faq.insertAdjacentHTML('beforeend','<details><summary>導入までに何を準備すればよいですか？</summary><p>まずは、時間がかかっている仕事と、使っているチャットや業務ソフトをお聞かせください。対象業務や必要な情報はヒアリングで一緒に整理します。</p></details><details><summary>導入事例や実績は見られますか？</summary><p>公開できる事例や対応可能な業務については、お問い合わせ時にご案内します。このサイトの画面や業務内容は活用イメージです。</p></details>');
})();
;(() => {
  const target=document.querySelector('.use-section');
  if(!target || document.querySelector('#weave-examples'))return;
  target.insertAdjacentHTML('afterend', `<section class="weave-examples" id="weave-examples"><div class="weave-examples__inner"><p class="weave-examples__eyebrow">導入事例</p><h2>実際の会社では、<br>こんな仕事を任されています。</h2><p class="weave-examples__intro">企業ごとの仕事に合わせて育てたAI社員が、毎日の業務を支えています。</p><div class="weave-examples__grid"><article><span class="weave-examples__tag">EC支援・コンサルティング／広島</span><h3>社員が頼れる、<br>現場の何でも屋に。</h3><p>顧客への連絡漏れの確認、請求管理、動画編集、進捗報告などを担当。</p><div class="weave-examples__numbers"><div><strong>約250<small>回／月</small></strong><span>自動で仕事を実行</span></div><div><strong>389<small>回／週</small></strong><span>社員からの相談・依頼</span></div></div><p class="weave-examples__name">AI社員「エンパくん」</p></article><article><span class="weave-examples__tag">中古車販売・保険代理店／岡山</span><h3>毎朝・毎晩の報告で、<br>経営の確認を支援。</h3><p>確認・集計・分析を自動化し、オークション情報などを定期的に報告。</p><div class="weave-examples__numbers"><div><strong>1日2<small>回</small></strong><span>オークション確認・報告</span></div><div><strong>約20<small>回／日</small></strong><span>自動で仕事を実行</span></div></div><p class="weave-examples__name">AI社員「KARL（カール）」</p></article></div><div class="weave-examples__result"><div><span>私たちの会社での実測</span><strong>月147.7<small>時間削減</small></strong></div><p>WEAVEの秘書・経理・広報など36業務で、作業時間が月214.5時間から66.8時間に減少しました。効果は対象業務や運用方法によって異なります。</p></div><p class="weave-examples__source">実績の詳細：<a href="https://prtimes.jp/main/html/rd/p/000000018.000133455.html" target="_blank" rel="noopener noreferrer">WEAVEの発表（2026年7月31日）↗</a>。各数値は公表時点のものです。</p></div></section>`);
})();
;(() => {
  const set=(selector,value)=>{const el=document.querySelector(selector);if(el)el.textContent=value};
  const title=document.querySelector('.hero__title');if(title)title.innerHTML='<span><strong>事務作業</strong>を、</span><span><strong>AI社員</strong>に任せる。</span>';
  set('.solution__lead','請求書の下書きや企業調査をAI社員に依頼。内容は担当者が確認できます。');
  const desc=document.querySelectorAll('.flow__desc');['依頼・内容の確認','調査・下書き・整理','仕事に使う'].forEach((v,i)=>{if(desc[i])desc[i].textContent=v});
  const labels=['仕事を依頼','AI社員','確認して使う'];document.querySelectorAll('.flow__name').forEach((e,i)=>{if(labels[i])e.textContent=labels[i]});
  const dayIntro=document.querySelector('.day-section .exp-heading>p');if(dayIntro)dayIntro.textContent='企業調査を依頼してから、担当者が確認するまでの例です。';
  const days=document.querySelectorAll('.day-timeline article');const dayContent=[['商談先の調査を依頼','チャットで会社名と、調べたい内容を伝えます。'],['公開情報を集める','AI社員が企業の事業内容や関連情報を調べ、出典と一緒に整理します。'],['調査メモを確認','担当者が情報の出典や内容を確認し、必要に応じて修正します。'],['商談の準備に使う','確認した調査メモを、提案資料の作成や商談準備に活用します。']];days.forEach((a,i)=>{if(!dayContent[i])return;const h=a.querySelector('h3'),p=a.querySelector('p');if(h)h.textContent=dayContent[i][0];if(p)p.textContent=dayContent[i][1]});
  set('.ai-pricing__lead','請求書・企業調査など、御社の業務に合わせて設定します。');
  set('.footer__tagline','請求書や調査を、チャットで依頼。');
  set('.footer__address','AI社員は、中小企業の事務作業を支援するサービスです。請求書や議事録の下書き、企業調査などをお手伝いします。');
  const feature=document.querySelectorAll('.service-row__copy small,.feature-banner small');['チャットから請求書や調査を依頼','仕事の手順や書類の形式を登録','情報収集やデータ整理を支援','議事録・メールの下書きを作成'].forEach((v,i)=>{if(feature[i])feature[i].textContent=v});
})();
;(() => {
  const solution = document.querySelector('.solution');
  const about = document.querySelector('.explain-section');
  if (!solution || !about) return;
  solution.querySelector('.solution__lead')?.remove();
  solution.querySelector('.flow')?.remove();
  about.classList.add('explain-section--in-solution');
  solution.querySelector('.solution__heading').after(about);
  const main = about.querySelector('.explain-main');
  const copy = about.querySelector('.explain-copy');
  if (main) main.innerHTML = '会社の仕事を覚えて、<br>24時間働くAI社員。';
  if (copy) copy.textContent = 'AI社員は、会社ごとの業務手順やルールを覚え、いつものチャットから頼まれた仕事を進めます。情報収集や資料作成など、御社の仕事に合わせて設定し、導入後の運用までサポートします。';
})();
;(() => {
  const comparison = document.querySelector('.difference-section');
  const use = document.querySelector('.use-section');
  if (comparison && use) {
    use.classList.add('use-section--combined');
    comparison.appendChild(use);
  }
  document.querySelector('#weave-examples')?.remove();
  document.querySelector('.growth-section')?.remove();
})();

;(() => {
  // 機能紹介の次に、具体的に任せられる仕事を置く。
  const services = document.querySelector('.services');
  const use = document.querySelector('.use-section');
  if (services && use) {
    use.classList.remove('use-section--combined');
    services.insertAdjacentElement('afterend', use);
  }
})();

;document.querySelector('.difference-section')?.remove();
document.documentElement.classList.remove('is-hydrating');
