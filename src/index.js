module.exports = function multiply(first, second) {
  function stolbik(num1, num2) {
    num1 = num1.split("").reverse();
    num2 = num2.split("").reverse();
    let result = Array(num1.length + num2.length).fill(0);

    for(let i = 0; i < num2.length; i++) {
      for(let j = 0; j < num1.length; j++) {
        let res = num2[i] * num1[j];
        result[i + j] += res;
      }
    }

    for (let i = 0; i < result.length - 1; i++) {
      let carry = Math.floor(result[i] / 10);
      result[i] = result[i] % 10;
      result[i + 1] += carry;
    }

    result = result.reverse().join("").replace(/^0+/, "");

    return result;
  }
  
  return stolbik(first, second);
}
