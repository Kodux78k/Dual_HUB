
import { $, $$ } from './core/dom.js';
import { migrateIdentity } from './core/state.js';
import { applyTheme, initThemeSettings } from './core/theme.js';
import { loadEmbeddedApps } from './apps/registry.js';
import { renderApps } from './apps/ui.js';
import './ai/chat.js';
import './ai/speech.js';
import './ai/voices.js';
function nav(key){
  const tabs = ['home','apps','stack','brain','chat'];
  tabs.forEach(k=>{
    const v = document.getElementById('v-'+k);
    if(v) v.classList.toggle('active', k===key);
    const t = document.querySelector('.tab[data-nav="'+k+'"]');
    if(t) t.classList.toggle('active', k===key);
  });
}
window.nav = nav;
function wireNav(){
  $$('.tab,[data-nav]').forEach(b => b.addEventListener('click', ()=> nav(b.dataset.nav||'home')));
  const mp = document.getElementById('msgPreview'); if(mp) mp.addEventListener('click', ()=> nav('chat'));
  document.getElementById('btnBrain')?.addEventListener('click', ()=> nav('brain'));
}
function initArchSelect(){
  const list = [
    'luxara.html','rhea.html','aion.html','atlas.html','nova.html','genus.html','lumine.html','kaion.html','kaos.html','horus.html','elysha.html'
  ];
  const sel = document.getElementById('arch-select');
  const frame = document.getElementById('arch-frame');
  if(!sel || !frame) return;
  sel.innerHTML='';
  list.forEach(name=>{ const o=document.createElement('option'); o.value=name; o.textContent=name; sel.appendChild(o); });
  const set = (idx)=>{ const n=(idx+list.length)%list.length; sel.selectedIndex=n; frame.src = './archetypes/'+list[n]; };
  set(0);
  document.getElementById('arch-prev')?.addEventListener('click', ()=> set(sel.selectedIndex-1));
  document.getElementById('arch-next')?.addEventListener('click', ()=> set(sel.selectedIndex+1));
  sel.addEventListener('change', ()=> set(sel.selectedIndex));
}
function initHomeButtons(){
  const textBtn = $('#homeTextBtn');
  const hiOverlay = $('#homeInputOverlay');
  const hiForm = $('#homeInputForm');
  const hiInput = $('#homeInput');
  if(textBtn && hiOverlay && hiForm && hiInput){
    textBtn.addEventListener('click', ()=>{
      const show = hiOverlay.style.display!=='block';
      hiOverlay.style.display = show? 'block':'none';
      textBtn.classList.toggle('active', show);
      if(show) setTimeout(()=> hiInput.focus(), 60);
    });
    hiForm.addEventListener('submit', (ev)=>{
      ev.preventDefault();
      const msg = (hiInput.value||'').trim();
      if(!msg) return;
      try{ window.handleUserMessage(msg); }catch(e){}
      hiInput.value='';
    });
  }
}
function init(){
  migrateIdentity();
  applyTheme();
  initThemeSettings();
  loadEmbeddedApps();
  renderApps();
  initArchSelect();
  wireNav();
  initHomeButtons();
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();