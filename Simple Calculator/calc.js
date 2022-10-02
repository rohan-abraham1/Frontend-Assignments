function Click(num) {
  document.getElementById("text-box").value += num;
}

function equals() {
  let expr = document.getElementById("text-box").value;
  let flag = validate(expr);
  if (flag == 1) {
    calc(expr);
  } else {
    return;
  }
}

function Clear() {
  document.getElementById("text-box").value = "";
}

function calc(expr) {
  let operands = expr.split(/[^0-9\.]+/);
  // console.log(operands);
  let operators = expr.split(/[0-9\.]+/).filter((x) => x);
  // console.log(operators);
  let sum = parseFloat(operands[0]);
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] == "-") {
      sum -= parseFloat(operands[i + 1]);
    } else if (operators[i] == "*") {
      sum *= parseFloat(operands[i + 1]);
    } else if (operators[i] == "/") {
      sum /= parseFloat(operands[i + 1]);
    } else {
      sum += parseFloat(operands[i + 1]);
    }
  }
  // console.log(sum);
  document.getElementById("text-box").value = sum;
}

function validate(value) {
  const regEx = /^[\d\.]+([+*/-][\d\.]+)*$/;
  if (!value.match(regEx)) {
    alert("Invalid Input");
    return 0;
  } else {
    return 1;
  }
}
