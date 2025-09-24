(function(){
  function onReady(fn){ if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded', fn);} else { fn(); } }
  onReady(function(){
    try{
      if(window.DualLS && typeof window.DualLS.initPanel==='function'){
        window.DualLS.initPanel({ mount:'#lsx-mount' });
      }
      var btn = document.getElementById('btnLS');
      if(btn && !btn.__wiredLS){
        btn.addEventListener('click', function(ev){
          ev.preventDefault(); ev.stopPropagation();
          try{ window.DualLS && window.DualLS.toggle && window.DualLS.toggle(); }catch(e){}
        }, {passive:true});
        btn.__wiredLS = true;
      }
    }catch(e){}
    try{
      function ensureVoices(){
        var mapping = {}; try{ mapping = JSON.parse(localStorage.getItem('infodose:voices')||'{}')||{} }catch(e){ mapping = {} }
        if(mapping && Object.keys(mapping).length>0) return;
        var vs = (window.speechSynthesis && window.speechSynthesis.getVoices && window.speechSynthesis.getVoices()) || [];
        var pt = vs.filter(function(v){ return (v.lang||'').toLowerCase().startsWith('pt'); });
        var pick = pt.length ? pt : vs;
        if(!pick.length) return;
        var names = ['Luxara','Rhea','Aion','Atlas','Nova','Genus','Lumine','Kaion','Kaos','Horus','Elysha','Serena'];
        var m = {}; for(var i=0;i<names.length;i++){ var v = pick[i % pick.length]; if(v){ m[names[i]] = v.name; } }
        try{ localStorage.setItem('infodose:voices', JSON.stringify(m)); }catch(e){}
      }
      ensureVoices();
      if(window.speechSynthesis){
        window.speechSynthesis.onvoiceschanged = (function(old){
          return function(){ try{ ensureVoices(); }catch(e){}; if(typeof old==='function') try{ old(); }catch(e){} };
        })(window.speechSynthesis.onvoiceschanged);
      }
    }catch(e){}
  });
})();