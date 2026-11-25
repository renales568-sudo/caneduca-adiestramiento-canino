document.addEventListener('DOMContentLoaded',()=>{
  initMenu();
  initHeaderScroll();
  initForm();
});
function initMenu(){
  const t=document.getElementById('nav-toggle'),l=document.getElementById('nav-list');
  t.addEventListener('click',()=>{l.classList.toggle('active');t.setAttribute('aria-expanded',l.classList.contains('active'))});
  document.querySelectorAll('.nav-link').forEach(a=>a.addEventListener('click',()=>{l.classList.remove('active');t.setAttribute('aria-expanded','false')}));
}
function initHeaderScroll(){
  const h=document.getElementById('header');
  window.addEventListener('scroll',()=>{window.scrollY>50?h.classList.add('scrolled'):h.classList.remove('scrolled')});
}
function initForm(){
  const f=document.getElementById('form-contacto'),m=document.getElementById('msg-ok'),b=f.querySelector('button');
  f.addEventListener('submit',async e=>{
    e.preventDefault();
    b.textContent='Enviando...';
    b.disabled=true;
    const formData=new FormData(f);
    try{
      const res=await fetch(f.action,{method:'POST',body:formData,headers:{Accept:'application/json'}});
      if(res.ok){
        f.reset();
        b.textContent='Enviar Mensaje';
        b.disabled=false;
        m.style.display='block';
        m.textContent='✅ Mensaje enviado. Te contactaremos pronto.';
        m.style.background='#dcfce7';
        m.style.color='#166534';
        setTimeout(()=>m.style.display='none',5000);
      }else{
        throw new Error();
      }
    }catch(err){
      b.textContent='Enviar Mensaje';
      b.disabled=false;
      m.style.display='block';
      m.textContent='❌ Error al enviar. Intenta de nuevo.';
      m.style.background='#fee2e2';
      m.style.color='#991b1b';
      setTimeout(()=>{m.style.display='none';m.style.background='#dcfce7';m.style.color='#166534';m.textContent='✅ Mensaje enviado. Te contactaremos pronto.';},5000);
    }
  });
}