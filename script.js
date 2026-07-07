const baseStocks=[
 {symbol:'0050',name:'元大台灣50',type:'ETF｜大型權值股',price:188.4,change:'+0.8%',rsi:58,score:61,signal:'買進觀察'},
 {symbol:'0056',name:'高股息',type:'ETF｜高股息',price:42.8,change:'+0.3%',rsi:54,score:57,signal:'穩健觀察'},
 {symbol:'006208',name:'富邦台50',type:'ETF｜大型權值股',price:112.7,change:'+0.7%',rsi:59,score:62,signal:'買進觀察'},
 {symbol:'2330',name:'台積電',type:'半導體｜權值股',price:1125,change:'+1.1%',rsi:64,score:66,signal:'偏多觀察'},
 {symbol:'2317',name:'鴻海',type:'電子代工｜AI伺服器',price:188,change:'-0.4%',rsi:48,score:52,signal:'等待轉強'}
];
let stocks=JSON.parse(localStorage.getItem('stocksV22')||'null')||baseStocks;
let current=localStorage.getItem('currentStockV22')||stocks[0].symbol;
const $=id=>document.getElementById(id);
function saveStocks(){localStorage.setItem('stocksV22',JSON.stringify(stocks));}
function renderWatchlist(){ $('watchlist').innerHTML=''; stocks.forEach(s=>{const b=document.createElement('button');b.className='stock '+(s.symbol===current?'active':'');b.innerHTML=`<b>${s.symbol}</b><span>${s.name}</span>`;b.onclick=()=>{current=s.symbol;localStorage.setItem('currentStockV22',current);renderAll();};$('watchlist').appendChild(b);});}
function getStock(){return stocks.find(s=>s.symbol===current)||stocks[0];}
function renderStock(){const s=getStock();$('stockTitle').textContent=`${s.symbol} ${s.name}`;$('stockType').textContent=s.type;$('price').textContent=s.price;$('change').textContent=s.change;$('rsi').textContent=s.rsi;$('score').textContent=s.score+'%';$('signal').textContent=s.signal;renderHolding();}
function renderAnalysis(){const s=getStock();const arr=[`確認 ${s.symbol} 的趨勢方向：先看 MA20 與 MA60。`,`RSI 目前約 ${s.rsi}，觀察是否過熱或轉弱。`,`漲跌幅 ${s.change}，搭配量能判斷是否追價。`,`勝率評估 ${s.score}%：僅作為教學參考，不保證獲利。`,`設定停損與分批買進，避免一次重壓。`];$('analysisList').innerHTML=arr.map(x=>`<li>${x}</li>`).join('');}
function renderHolding(){const s=getStock();const h=JSON.parse(localStorage.getItem('holding_'+s.symbol)||'null');if(!h){$('holdingResult').textContent='尚未輸入持股。';return;}const cost=h.buy*h.shares, now=s.price*h.shares, pnl=now-cost, pct=cost?((pnl/cost)*100).toFixed(2):0;$('holdingResult').textContent=`${s.symbol}：成本 ${cost.toFixed(0)}，現值 ${now.toFixed(0)}，損益 ${pnl.toFixed(0)}（${pct}%）`;}
function renderAll(){renderWatchlist();renderStock();renderAnalysis();$('journal').value=localStorage.getItem('journalV22')||'';}
$('themeBtn').onclick=()=>{document.body.classList.toggle('dark');localStorage.setItem('themeV22',document.body.classList.contains('dark')?'dark':'light');};
$('addStockBtn').onclick=()=>{const sym=$('symbolInput').value.trim(), name=$('nameInput').value.trim();if(!sym||!name)return alert('請輸入代號與名稱');stocks.push({symbol:sym,name,type:'自訂標的',price:100,change:'0%',rsi:50,score:50,signal:'觀察'});saveStocks();current=sym;$('symbolInput').value='';$('nameInput').value='';renderAll();};
$('reanalyzeBtn').onclick=()=>{const s=getStock();s.rsi=Math.max(35,Math.min(78,s.rsi+Math.floor(Math.random()*11)-5));s.score=Math.max(45,Math.min(75,s.score+Math.floor(Math.random()*9)-4));s.signal=s.score>=64?'偏多觀察':s.score>=56?'買進觀察':'等待轉強';saveStocks();renderAll();};
$('saveHoldingBtn').onclick=()=>{const s=getStock();const buy=parseFloat($('buyPrice').value), shares=parseInt($('shares').value);if(!buy||!shares)return alert('請輸入買進價格與股數');localStorage.setItem('holding_'+s.symbol,JSON.stringify({buy,shares}));renderHolding();};
$('saveJournalBtn').onclick=()=>{localStorage.setItem('journalV22',$('journal').value);alert('交易日誌已儲存');};
if(localStorage.getItem('themeV22')==='dark')document.body.classList.add('dark');
renderAll();
