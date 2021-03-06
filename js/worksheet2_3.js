// 產生收據的 function
// 輸入一個已稅金額的陣列，
// 輸出收據資料：{price: 未稅銷售額, tex: 稅}
function makeReceipt(items){
    var total = items.reduce(function(pv, cv){ return pv + cv;}, 0);
    // console.log(total);
  // 未稅銷售額、稅請四捨五入到整數（Math.round）
  // 註：未稅銷售額 * 1.05 = 已稅價
    var price = Math.round(total / 1.05);
    var tex = total - price;
    return {price: price, tex: tex};
}

var receipt = makeReceipt([35, 40, 45]);
console.log("銷售額："+ receipt.price); // 銷售額：114
console.log("稅："+ receipt.tex); // 稅：6