
import { $ } from '../core/dom.js';
import { appIconFor } from './icons.js';
import { RAW } from './registry.js';
export function renderApps(){
  const wrap = $('#appsWrap'); const count = $('#appsCount');
  if(!wrap) return;
  wrap.innerHTML = '';
  (RAW.apps||[]).forEach(a=>{
    const el = document.createElement('div'); el.className = 'app-card fx-trans fx-lift';
    const ic = document.createElement('div'); ic.className = 'app-icon';
    const img = document.createElement('img'); img.alt=''; img.width=24; img.height=24; img.src = appIconFor(a);
    ic.appendChild(img);
    const meta = document.createElement('div'); meta.style.flex='1';
    const t = document.createElement('div'); t.className='app-title'; t.textContent = a.title||a.key||'App';
    const d = document.createElement('div'); d.className='mut'; d.textContent = a.desc||a.url||'';
    const open = document.createElement('button'); open.className='btn fx-trans fx-press ring'; open.textContent='Abrir';
    open.onclick = ()=> openApp(a);
    meta.appendChild(t); meta.appendChild(d); meta.appendChild(open);
    el.appendChild(ic); el.appendChild(meta);
    wrap.appendChild(el);
  });
  if(count) count.textContent = (RAW.apps||[]).length + ' apps';
}
function openApp(a){
  const stack = document.getElementById('stackWrap') || document.body;
  const sid = 's_'+Math.random().toString(36).slice(2);
  const card = document.createElement('div'); card.className='session fx-trans fx-lift'; card.dataset.sid = sid;
  const url = a.url || 'about:blank';
  card.innerHTML = `<div class="hdr"><div class="title">${a.title||'App'}</div><div class="tools"><button class="btn" data-act="close">×</button></div></div><iframe src="${url}" allow="autoplay"></iframe>`;
  card.querySelector('[data-act="close"]').onclick = ()=> card.remove();
  stack.prepend(card);
}