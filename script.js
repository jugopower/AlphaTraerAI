const stocks=[
 {id:'0050',name:'0050 元大台灣50',meta:'ETF｜大型權值股',price:188.4,chg:'+0.8%',rsi:58,prob:61,signal:'買進觀察'},
 {id:'0056',name:'0056 高股息',meta:'ETF｜高股息',price:38.2,chg:'+0.2%',rsi:52,prob:55,signal:'觀望偏多'},
 {id:'006208',name:'006208 富邦台50',meta:'ETF｜台灣50',price:112.6,chg:'-0.1%',rsi:49,prob:53,signal:'觀望'},
 {id:'2330',name:'2330 台積電',meta:'半導體｜權值股',price:1025,chg:'+1.4%',rsi:66,prob:64,signal:'買進觀察'},
 {id:'2317',name:'2317 鴻海',meta:'電子代工｜大型股',price:204.5,chg:'-0.7%',rsi:42,prob:48,signal:'暫不進場'}
];
let current=stocks[0];
const $=id=>document.getElementById(id);
function renderList(){ $('stockList').innerHTML=stocks.map(s=>`<button class="stockBtn ${s.id===current.id?'active':''}" onclick="selectStock('${s.id}')"><b>${s.id}</b><br>${s.name.replace(s.id+' ','')}</button>`).join(''); }
function selectStock(id){ current=stocks.find(s=>s.id===id); render(); }
function render(){ renderList(); $('stockName').textContent=current.name; $('stockMeta').textContent=current.meta; $('price').textContent=current.price; $('change').textContent=current.chg; $('rsi').textContent=current.rsi; $('prob').textContent=current.prob+'%'; const sig=$('aiSignal'); sig.textContent=current.signal; sig.className='signal '+(current.prob>=60?'buy':current.prob<50?'sell':''); $('advice').textContent=adviceText(current); drawChart(); drawSteps(); }
function adviceText(s){ if(s.prob>=60)return `${s.name} 趨勢偏強，可列入買進觀察；建議分批，不一次滿倉，並設定停損。`; if(s.prob>=55)return `${s.name} 達到基本觀察門檻，可等待量能與均線確認後小量試單。`; if(s.prob>=50)return `${s.name} 目前盤勢中性，建議觀察不追價。`; return `${s.name} 訊號偏弱，暫不進場，等待重新站回均線。`; }
function drawChart(){ const base=current.prob; const bars=Array.from({length:22},(_,i)=>Math.max(18,base+(Math.sin(i*.8)*18)+(Math.random()*12-6))); $('chart').innerHTML=bars.map(v=>`<div class="bar" style="height:${v}%"></div>`).join(''); }
function drawSteps(){ const arr=[['1 選股','檢查趨勢、成交量、基本面'],['2 訊號','計算 RSI、均線、上漲機率'],['3 風控','設定停損、倉位與資金比例'],['4 紀錄','寫下進出場理由，方便檢討']]; $('steps').innerHTML=arr.map(x=>`<div class="step"><b>${x[0]}</b><span>${x[1]}</span></div>`).join(''); }
$('runBtn').onclick=render; $('themeBtn').onclick=()=>document.body.classList.toggle('dark');
$('tradeForm').onsubmit=e=>{e.preventDefault(); const t=$('tradeText').value.trim(); if(!t)return; const li=document.createElement('li'); li.textContent=new Date().toLocaleDateString('zh-TW')+'｜'+t; $('tradeLog').prepend(li); $('tradeText').value='';};
render();
