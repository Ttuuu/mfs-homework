//1
function func(flag){
    // 请在这里填写代码
    return true?1:0;
   }
   
//2
function func2(array){
    for (x in array){
        if(array[x]==5)break;
        else console.log(array[x]);
    }
}

//3
function func3(array){
    for (x in array){
        if(array[x]==5)continue;
        else console.log(array[x]);
    }
}

//4
var day=[0, 1, 2, 3, 4, 5, 6];
function func4(array){
    for(x in array){
        switch (array[x]) 
        { 
        case 0:
            console.log("星期日")
            break; 
        case 1:
            console.log("星期一")
            break; 
        case 2:
            console.log("星期二")
            break; 
        case 3:
            console.log("星期三")
            break; 
        case 4:
            console.log("星期四")
            break; 
        case 5:
            console.log("星期五")
            break; 
        case 6:
            console.log("星期六")
            break; 
        }
    }
}