(function(){
  if(window.__PowerAI_Gateway__) return;
  window.__PowerAI_Gateway__ = true;
  const fallback = async ()=>{ throw new Error('PowerAI.chat indisponível: carregamento incompleto.'); };
  const pick = (w)=> (w && w.PowerAI && typeof w.PowerAI.chat==='function') ? w.PowerAI.chat : null;
  const chat = pick(window) || fallback;
  window.PowerAI = window.PowerAI || {};
  window.PowerAI.chat = chat;
  window.sendAIMessage = async (content, sk, model)=> window.PowerAI.chat(content, sk, model);
})();