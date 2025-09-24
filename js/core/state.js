
import { LS } from './dom.js';
export const Keys = {
  name:  'infodose:userName',
  sk:    'dual.keys.openrouter',
  model: 'dual.openrouter.model',
  train: 'dual.openrouter.training'
};
export function migrateIdentity(){
  try{
    const name = localStorage.getItem('infodose:userName') || localStorage.getItem('dual.name');
    if(name) localStorage.setItem('infodose:userName', name);
    const sk = localStorage.getItem('dual.keys.openrouter') || localStorage.getItem('infodose:sk');
    if(sk) localStorage.setItem('dual.keys.openrouter', sk);
    const model = localStorage.getItem('dual.openrouter.model') || localStorage.getItem('infodose:model');
    if(model) localStorage.setItem('dual.openrouter.model', model);
    const training = localStorage.getItem('dual.openrouter.training') || localStorage.getItem('infodose:training');
    if(training) localStorage.setItem('dual.openrouter.training', training);
  }catch(e){}
}
export function getUserName(){
  try{
    const a = (localStorage.getItem('infodose:userName')||'').trim();
    if(a) return a;
    return (localStorage.getItem('dual.name')||'').trim();
  }catch(e){ return '' }
}
export function getApiKey(){
  try{ return (localStorage.getItem('dual.keys.openrouter') || localStorage.getItem('infodose:sk') || '').trim(); }
  catch(e){ return '' }
}
export function getModel(){
  try{ return (localStorage.getItem('dual.openrouter.model') || localStorage.getItem('infodose:model') || 'openrouter/auto'); }
  catch(e){ return 'openrouter/auto' }
}
window.getUserName = getUserName;