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
