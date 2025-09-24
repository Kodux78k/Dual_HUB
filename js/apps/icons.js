
export function svgIcon(name){
  const common = 'xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5f7ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const m = {
    atlas: `<svg ${common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3v18"/><path d="M5 8c3 2 11 2 14 0M5 16c3-2 11-2 14 0"/></svg>`,
    nova:  `<svg ${common}><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/><path d="M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/><circle cx="12" cy="12" r="3"/></svg>`,
    local: `<svg ${common}><rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 9h16"/></svg>`
  };
  const raw = m[name] || m.atlas;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(raw);
}
export function appIconFor(app){
  if(!app.icon) return svgIcon('atlas');
  if(/^(atlas|nova|local)$/.test(app.icon)) return svgIcon(app.icon);
  return app.icon;
}