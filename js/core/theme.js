
import { LS, $ } from './dom.js';
export function applyTheme() {
  const theme = LS.get('uno:theme', 'medium');
  if(theme === 'default') delete document.body.dataset.theme;
  else document.body.dataset.theme = theme;
  const bgContainer = document.getElementById('custom-bg');
  if(!bgContainer) return;
  if(theme !== 'custom'){ bgContainer.innerHTML=''; return; }
  const bgData = LS.get('uno:bg','');
  bgContainer.innerHTML='';
  if(!bgData) return;
  if(/^data:video\
    const vid = document.createElement('video');
    Object.assign(vid,{src:bgData, autoplay:true, loop:true, muted:true, playsInline:true});
    Object.assign(vid.style,{width:'100%',height:'100%',objectFit:'cover'});
    bgContainer.appendChild(vid);
  }else{
    const img = document.createElement('img');
    Object.assign(img,{src:bgData, alt:''});
    Object.assign(img.style,{width:'100%',height:'100%',objectFit:'cover'});
    bgContainer.appendChild(img);
  }
}
export function initThemeSettings(){
  if(!LS.get('uno:theme')) LS.set('uno:theme','medium');
  applyTheme();
  const sel = document.getElementById('themeSelect');
  if(sel){
    sel.value = LS.get('uno:theme','medium');
    sel.addEventListener('change', ()=>{ LS.set('uno:theme', sel.value); applyTheme(); });
  }
  const up = document.getElementById('bgUpload');
  if(up){
    up.addEventListener('change', ev=>{
      const f = ev.target.files && ev.target.files[0]; if(!f) return;
      const r = new FileReader(); r.onload=()=>{ try{ LS.set('uno:bg', r.result); LS.set('uno:theme','custom'); if(sel) sel.value='custom'; applyTheme(); }catch(e){} }; r.readAsDataURL(f);
    });
  }
}