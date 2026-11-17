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
