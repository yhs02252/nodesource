import { odd, even } from "./var.mjs";

function checkOddOrEven(num) {
  if (num % 2) {
    return odd;
  }
  return even;
}

export default checkOddOrEven; // 한가지만 내보낼때는 default 를 붙인다
