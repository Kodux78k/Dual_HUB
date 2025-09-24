
export const $  = (q, r=document)=> r.querySelector(q);
export const $$ = (q, r=document)=> Array.from(r.querySelectorAll(q));
export const LS = {
  get(k,d){ try{ const v=localStorage.getItem(k); return v? JSON.parse(v): d }catch(e){ return d } },
  set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)) }catch(e){} },
  raw(k){ return localStorage.getItem(k)||'' }
};
window.$ = $; window.$$ = $$; window.LS = LS;