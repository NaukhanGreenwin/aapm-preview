(function(){
  // mobile drawer
  var b=document.querySelector('.burger'),d=document.getElementById('drawer');
  function open(o){if(!d)return;d.hidden=!o;b&&b.setAttribute('aria-expanded',o?'true':'false');document.documentElement.style.overflow=o?'hidden':'';if(o){var x=d.querySelector('.drawer__x');x&&x.focus()}}
  b&&b.addEventListener('click',function(){open(true)});
  d&&d.addEventListener('click',function(e){if(e.target===d||e.target.closest('.drawer__x'))open(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&d&&!d.hidden){open(false);b&&b.focus()}});
  // reveal on scroll (IO + hard timeout fallback, iOS-safe)
  var els=[].slice.call(document.querySelectorAll('.rv'));
  function show(el){el.classList.add('in')}
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){show(e.target);io.unobserve(e.target)}})},{rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(el){io.observe(el)});
  }else{els.forEach(show)}
  setTimeout(function(){els.forEach(show)},2500);
  // demo forms
  var t=document.getElementById('toast'),tt;
  function toast(m){if(!t)return;t.textContent=m;t.hidden=false;clearTimeout(tt);tt=setTimeout(function(){t.hidden=true},5000)}
  [].forEach.call(document.querySelectorAll('form[data-demo]'),function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();var bad=null;
      [].forEach.call(f.querySelectorAll('[required]'),function(i){
        var ok=i.type==='radio'?!!f.querySelector('input[name="'+i.name+'"]:checked'):i.type==='checkbox'?i.checked:i.value.trim()!==''&&(!i.validity||i.validity.valid);
        i.setAttribute('aria-invalid',ok?'false':'true');if(!ok&&!bad)bad=i});
      if(bad){bad.focus();toast('Please complete the highlighted fields.');return}
      toast('Thank you. This is a design preview, so nothing was sent. On the live site this goes straight to the AA team.');
    });
  });
})();
