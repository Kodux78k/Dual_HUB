
export const RAW = { apps: [] };
export function loadEmbeddedApps(){
  try{
    const raw = JSON.parse(document.getElementById('APPS_JSON')?.textContent||'{}');
    RAW.apps = Array.isArray(raw.apps)? raw.apps : (Array.isArray(raw)? raw : []);
  }catch{ RAW.apps = [] }
  return RAW.apps;
}