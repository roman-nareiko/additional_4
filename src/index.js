module.exports = function multiply(first, second) {
  function karatsuba(num1, num2){
    if(num1.length < 5 || num2.length < 5) {

      return (num1 * num2).toString();
    }else{
      let max = Math.max(num1.length, num2.length);
      let fitted_length = Math.pow(2, Math.ceil(Math.log2(max)));
      let middle = fitted_length / 2;

      num1 = "0".repeat(fitted_length - num1.length) + num1;
      num2 = "0".repeat(fitted_length - num2.length) + num2;

      let high1 = num1.slice(0, middle);
      let low1 = num1.slice(middle);
      let high2 = num2.slice(0, middle);
      let low2 = num2.slice(middle);
      let z0 = karatsuba(low1, low2);
      let z1 = karatsuba(add(high1, low1), add(high2, low2));
      let z2 = karatsuba(high1, high2);

      let k1 = z2 + "0".repeat(2*middle);
      let k2 = sub(z1, add(z2, z0)) + "0".repeat(middle);
      let sum1 = add(k1, k2);

      return add(sum1, z0);
    }      
  }

  function add(a, b) {
    a = a.split("");
    b = b.split("");
    let result = "";
    let carry = 0;

    while(b.length > 0  || carry > 0){
      let left = parseInt(a.pop() || '0', 10);
      let right = parseInt(b.pop() || '0', 10);
      let res = (left + right + carry) % 10;
      carry = Math.floor((left + right + carry) / 10);
      result = res.toString().concat(result);
    }

    return (+a.join("").concat(result)).toString();
  }

  function sub(a, b) {
    a = a.split("");
    b = b.split("");
    let result = "";

    while(b.length > 0){
      let left = parseInt(a.pop() || '0', 10);
      let right = parseInt(b.pop() || '0', 10);
      
      if(left < right){
        left += 10;
        _a = a.pop()
        a.push(_a - 1);
      }

      let res = (left - right) % 10;
      result = res.toString().concat(result);
    }

    return (+a.join("").concat(result)).toString();
  }
  
  return karatsuba(first, second);
}
