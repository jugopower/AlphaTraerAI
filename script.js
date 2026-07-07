function calc(){
  const capital = Number(document.getElementById('capital').value || 0);
  const ratio = Number(document.getElementById('ratio').value || 0);
  const amount = Math.round(capital * ratio / 100);
  document.getElementById('result').textContent = '投入金額：約 ' + amount.toLocaleString('zh-TW') + ' 元';
}
