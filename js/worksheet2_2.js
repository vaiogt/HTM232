// 檢查 person 是否可以領取退休年金。
function isEligible(person){
  // 此人的 age 大於 65 且此人的國籍等於 'Taiwan'

  return true;
}

var alice = {
  age: 67,
  nation: 'USA'
};
var bob = {
  age: 64, nation: 'Taiwan'
};
var carol = {
  age: 73, nation: 'Taiwan'
};

console.log(isEligible(alice)); // 應印出 false
console.log(isEligible(bob));   // 應印出 false
console.log(isEligible(carol)); // 應印出 true