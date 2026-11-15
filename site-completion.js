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
  const note=document.querySelector('.ai-pricing__note');if(note)note.textContent='トライアル初月は30万円（税別）。継続を希望される場合のみ、2か月目から月額10万円（税別）の通常プランへ移行します。';
  const fine=document.querySelector('.ai-pricing__fine');if(fine)fine.textContent='※ 通常プランは初期導入費用50万円＋月額利用料金10万円（いずれも税別）。専用端末代・外部API利用料・特殊な連携費用は別途となる場合があります。';
  document.querySelector('.partners')?.setAttribute('aria-label','AI社員の特徴');
})();
