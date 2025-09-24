
export function speakWithActiveArch(text){
  try{
    if(typeof window.speakWithActiveArch === 'function'){
      return window.speakWithActiveArch(text);
    }
    if(window.speechSynthesis){
      const u = new SpeechSynthesisUtterance(String(text));
      const vs = speechSynthesis.getVoices();
      const v = vs.find(v=> v.lang && (v.lang.startsWith('pt')||v.lang.startsWith('es'))) || vs[0];
      if(v) u.voice = v;
      speechSynthesis.cancel(); speechSynthesis.speak(u);
    }
  }catch(e){}
}
window.speakWithActiveArch = speakWithActiveArch;