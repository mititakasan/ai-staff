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
