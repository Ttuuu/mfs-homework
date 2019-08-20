var num1= +"1.0";
var num2= +"2";
var num3= +"str";
console.log(num1);
console.log(num2);
console.log(num3);
console.log(Number(true));
console.log(Number([]));
console.log(Number([1,2,3]));
console.log(Number({}));
console.log(Number({a:1}));
console.log(Number(function(){}));


console.log(Boolean("1"));
console.log(Boolean("str"));
console.log(Boolean(1));
console.log(Boolean(0));
console.log(Boolean([]));
console.log(Boolean([1,2,3]));
console.log(Boolean({}));
console.log(Boolean({a:1}));
console.log(Boolean(function(){}));

var obj={a:1, b:"2", c:true };
console.log(obj.a);
console.log(obj.b);
console.log(obj.c);
