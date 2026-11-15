(() => {
  const setText = (selector, value) => { const el = document.querySelector(selector); if (el) el.textContent = value; };
  const setHTML = (selector, value) => { const el = document.querySelector(selector); if (el) el.innerHTML = value; };
  const image = (selector, src, alt = '') => { const el = document.querySelector(selector); if (el) { el.src = src; el.alt = alt; } };

  document.title = 'AI社員 | 採用するのは、人だけじゃない。';
  const logo = document.querySelector('.gnav__logo');
  if (logo) { logo.innerHTML = '<span class="ai-logo">AI社員</span><small>あなたの会社に、AIの仲間を。</small>'; logo.setAttribute('aria-label', 'AI社員 トップ'); }
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
