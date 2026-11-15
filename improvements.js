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
