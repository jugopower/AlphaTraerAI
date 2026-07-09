let game=null, moveIndex=0, timer=null;
const board = new GoBoard(document.getElementById("board"));
const fileInput=document.getElementById("fileInput"), sampleBtn=document.getElementById("sampleBtn"), prevBtn=document.getElementById("prevBtn"), playBtn=document.getElementById("playBtn"), nextBtn=document.getElementById("nextBtn"), speedSel=document.getElementById("speedSel"), moveText=document.getElementById("moveText"), coordText=document.getElementById("coordText"), gameInfo=document.getElementById("gameInfo");
function loadGame(text){ stop(); game=parseSGF(text); moveIndex=0; board.reset(game.size); board.setSetupBlack(game.setupBlack); gameInfo.textContent=`黑：小林（6D）｜白：AI（9D）｜AI（9D）讓四子 vs 小林（6D）｜共 ${game.moves.length} 手`; update(); }
function update(){ if(!game){moveText.textContent="第 0 手"; coordText.textContent="請先載入 SGF"; return;} moveText.textContent=`第 ${moveIndex} 手 / ${game.moves.length} 手`; if(moveIndex===0) coordText.textContent="讓子局面"; else{ const m=game.moves[moveIndex-1]; coordText.textContent = m.pass ? `${m.color==="B"?"黑":"白"}棋 PASS` : `${m.color==="B"?"黑":"白"}棋：${pointLabel(m.x,m.y,game.size)}`; }}
function next(){ if(!game) return; if(moveIndex>=game.moves.length){stop(); return;} board.play(game.moves[moveIndex]); moveIndex++; update(); }
function prev(){ if(!game || moveIndex<=0) return; moveIndex--; board.rebuild(game.setupBlack, game.moves, moveIndex); update(); }
function play(){ if(!game) loadGame(window.SAMPLE_SGF || ""); if(timer){stop(); return;} playBtn.textContent="⏸ 暫停"; timer=setInterval(next, parseInt(speedSel.value,10)); }
function stop(){ if(timer) clearInterval(timer); timer=null; playBtn.textContent="▶ 播放"; }
fileInput.addEventListener("change", async e=>{ const file=e.target.files[0]; if(file) loadGame(await file.text()); });
sampleBtn.addEventListener("click",()=>loadGame(window.SAMPLE_SGF||"")); nextBtn.addEventListener("click",()=>{stop(); next();}); prevBtn.addEventListener("click",()=>{stop(); prev();}); playBtn.addEventListener("click",play); speedSel.addEventListener("change",()=>{if(timer){stop(); play();}});
if(window.SAMPLE_SGF) loadGame(window.SAMPLE_SGF);
