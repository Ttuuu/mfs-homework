function getSuffix(file){
    return file.slice(file.lastIndexOf(".") + 1,file.length); 
 }
 function upper(str){
    return str.replace(/( |^)[a-z]/g,function(m){return m.toUpperCase();})
     }
 var str="ashfnk.aegfjwo.tdi";
 console.log(getSuffix(str));    
 str="i do shdsef sdggs";
 console.log(upper(str));
