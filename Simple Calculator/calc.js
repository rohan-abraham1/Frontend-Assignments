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

function calc(expr) {
  let operands = expr.split(/[^0-9\.]+/);
  console.log(operands);
  let operators = expr.split(/[0-9\.]+/).filter((x) => x);
  console.log(operators);
  let value;
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

// $(document).ready(function () {
//   regEx = /^\d+$/;
//   $("#text-box").on("change", function () {
//     if (regEx.test($(this).val())) {
//       // Contain numbers only
//     } else {
//       alert("Invlaid Input");
//     }
//   });
// });
