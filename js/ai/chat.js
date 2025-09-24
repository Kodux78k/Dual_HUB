
import { getApiKey, getModel, getUserName } from '../core/state.js';
async function loadDXTTraining(){
  try{
    const raw = localStorage.getItem('dual.openrouter.training');
    if(!raw) return '';
    const obj = JSON.parse(raw);
    if(!obj || !obj.data) return '';
    const base64 = String(obj.data).split(',')[1] || '';
    if(!base64) return '';
    const bin = atob(base64);
    try{
      const bytes = new Uint8Array([...bin].map(c=>c.charCodeAt(0)));
      return new TextDecoder('utf-8',{fatal:false}).decode(bytes).slice(0, 64*1024);
    }catch{ return bin.slice(0,64*1024); }
  }catch{ return '' }
}
function currentPrimary(){
  const sel = document.getElementById('arch-select');
  if(sel?.value) return sel.value.replace(/\.html$/,'').replace(/^./,c=>c.toUpperCase());
  return 'Dual';
}
export async function chatSend(userContent, skOpt, modelOpt){
  const archA = currentPrimary();
  const archB = (localStorage.getItem('dual.infodoseName')||'').trim() || 'Dual Infodose';
  const userName = getUserName();
  let sys = `Você é o Assistente Dual Infodose — codinome "${archB}".\nArquétipo primário: ${archA}.\nFale sempre em português do Brasil, direto e gentil.`;
  if(userName) sys += `\nVocê conversa com ${userName}.`;
  let training = await loadDXTTraining();
  if(training && training.trim().startsWith('{')){
    try{ const j = JSON.parse(training); training = (j.system||j.prompt||JSON.stringify(j)); }catch{}
  }
  if(training) sys += `\n\n# Treinamento DXT\n${training}`;
  const payload = {
    model: (modelOpt && String(modelOpt).trim()) || getModel(),
    messages: [
      { role:'system', content: sys },
      { role:'user',   content: String(userContent||'') }
    ],
    max_tokens: 350,
    temperature: 0.7
  };
  const key = (skOpt && String(skOpt).trim()) || getApiKey();
  if(!key) throw new Error('Chave OpenRouter ausente — salve no Brain.');
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method:'POST',
    headers:{ 'Content-Type':'application/json', 'Authorization':`Bearer ${key}` },
    body: JSON.stringify(payload)
  });
  if(!res.ok){ throw new Error('Erro na API: '+res.status); }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content || '';
}
window.PowerAI = window.PowerAI || {};
window.PowerAI.chat = chatSend;
window.sendAIMessage = async (content, sk, model)=> chatSend(content, sk, model);