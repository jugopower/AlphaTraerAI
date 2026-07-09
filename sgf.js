function parseSGF(text){
  const clean = text.replace(/\r?\n/g, "");
  const prop = key => { const re = new RegExp(key + "\\[([^\\]]*)\\]"); const m = clean.match(re); return m ? m[1] : ""; };
  const size = parseInt(prop("SZ") || "19", 10) || 19;
  const setupBlack = [];
  const abMatch = clean.match(/AB((?:\[[a-s]{2}\])+)/i);
  if(abMatch){ const coords = abMatch[1].match(/\[([a-s]{2})\]/ig) || []; coords.forEach(c => setupBlack.push(coordToPoint(c.slice(1,3)))); }
  const moves = []; const re = /;([BW])\[([a-s]{0,2})\]/ig; let m;
  while((m = re.exec(clean)) !== null){ if(m[2].length === 2) moves.push({color:m[1], ...coordToPoint(m[2])}); else moves.push({color:m[1], pass:true}); }
  return { size, info:{black: prop("PB") || "小林（6D）", white: prop("PW") || "AI（9D）", date: prop("DT") || "", result: prop("RE") || "", handicap: prop("HA") || "4"}, setupBlack, moves };
}
function coordToPoint(s){ return {x:s.charCodeAt(0)-97, y:s.charCodeAt(1)-97}; }
function pointLabel(x,y,size){ const letters = "ABCDEFGHJKLMNOPQRST"; return letters[x] + (size-y); }
