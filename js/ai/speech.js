
import { chatSend } from './chat.js';
function feedPush(type, text){
  const box = document.getElementById('iaFeed');
  if(box){
    const div = document.createElement('div');
    div.className = 'msg ' + (type||'status');
    div.textContent = text;
    box.appendChild(div);
    const msgs = box.querySelectorAll('.msg'); if(msgs.length>10) box.removeChild(msgs[0]);
    box.scrollTop = box.scrollHeight;
  }
  const feed = document.getElementById('chatFeed');
  if(feed){
    const d = document.createElement('div'); d.className='msg ' + (type||'status'); d.textContent = text; feed.appendChild(d);
    const msgs = feed.querySelectorAll('.msg'); if(msgs.length>50) feed.removeChild(msgs[0]);
    feed.scrollTop = feed.scrollHeight;
  }
}
function showArchMessage(text){ const el=document.getElementById('archMsg'); if(el){ el.textContent = text; el.classList.add('show'); clearTimeout(el._tm); el._tm=setTimeout(()=> el.classList.remove('show'), 5000);} }
function speakWithActiveArch(text){ try{ window.speakWithActiveArch && window.speakWithActiveArch(text); }catch(e){} }
export async function handleUserMessage(text, userName, sk, model){
  let reply='';
  try{ reply = await chatSend(text, sk, model); }
  catch(err){ console.error(err); reply = 'Desculpe, não consegui responder no momento.'; }
  if(reply){
    const sel = document.getElementById('arch-select'); let base = (sel?.value||'').replace(/\.html$/,''); const archName = base? (base[0].toUpperCase()+base.slice(1)) : 'Dual';
    feedPush('ai', archName + ': ' + reply);
    showArchMessage(reply);
    try{ speakWithActiveArch(reply); }catch(e){}
  }
}
export function startSpeechConversation(userName, sk, model){
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SpeechRecognition){ showArchMessage('Reconhecimento de fala não suportado neste navegador.'); return; }
  const recognition = new SpeechRecognition();
  recognition.lang='pt-BR'; recognition.interimResults=false; recognition.maxAlternatives=1;
  const micBtn = document.getElementById('homeVoiceBtn');
  recognition.onstart = ()=>{ showArchMessage('Estou ouvindo…'); feedPush('status','🎙️ Ouvindo…'); micBtn&&micBtn.classList.add('recording'); };
  recognition.onresult = (e)=>{
    const t = e.results[0][0].transcript.trim();
    if(t){
      try{ recognition.stop(); }catch{}
      feedPush('user','Você: ' + t);
      showArchMessage('Pulso enviado. Recebendo intenção…');
      try{ speakWithActiveArch('Pulso enviado, recebendo intenção.'); }catch(e){}
      feedPush('status','⚡ Pulso enviado · recebendo intenção…');
      handleUserMessage(t, userName, sk, model);
    }
  };
  recognition.onerror = ()=>{ showArchMessage('Erro no reconhecimento de fala.'); feedPush('status','❌ Erro no reconhecimento de fala.'); };
  recognition.onend = ()=>{ micBtn&&micBtn.classList.remove('recording'); };
  recognition.start();
}
window.startSpeechConversation = startSpeechConversation;
window.handleUserMessage = handleUserMessage;