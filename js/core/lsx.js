
import { $, $$ } from './dom.js';
export const DualLS = {
  open(){ const p=$('#lsx-panel')||$('#ls-panel'); if(p){ p.style.display='block'; } },
  close(){ const p=$('#lsx-panel')||$('#ls-panel'); if(p){ p.style.display='none'; } },
  toggle(){ const p=$('#lsx-panel')||$('#ls-panel'); if(!p) return; p.style.display = (p.style.display==='block'?'none':'block'); }
};
window.DualLS = window.DualLS || DualLS;