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
