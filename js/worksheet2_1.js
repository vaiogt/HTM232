// 回傳是否為正確的 e-mail 位址
function checkMail(email){
    var atIndex = email.indexOf("@");
    var pointIndex = email.indexOf(".", atIndex);
    
    if (atIndex > 0 && pointIndex > atIndex) {
        return true;
    } else {
        return false;
    }
  // email 中有 '@' 且 '@' 後面至少有一個 '.' 者，為正確的 e-mail。
}

console.log(checkMail('alice@example.com'));    // 應印出 true
console.log(checkMail('alice.wu@example.com')); // 應印出 true
console.log(checkMail('alice@example.com.tw')); // 應印出 true

console.log(checkMail('example.com')); // 應印出 false，沒有 @
console.log(checkMail('test@here'));   // 應印出 false，@ 後面至少要有一個 '.'