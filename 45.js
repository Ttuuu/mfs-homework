function getInfo(html){
    var output1=html.match(/(?<=<h4 class="_3O-WB6Wi".+?>)[\u4e00-\u9fa5,\s,\w,\.]+?</g)
    var output=[]
    for(var i=0;i<output1.length;i++){
        if(output1[i].match(/.+h(?=<)/)!=null){
            output.push({during:output1[i].match(/.+h(?=<)/)[0]})
            output1.splice(i,1)
            }
    }
    var j=0
    for(var i=0;i<output1.length;i++){
        
        if(output1[i].match(/[A-Z,a-z]+(?=<)/)!=null){
            output[j].teacher=output1[i].match(/[A-Z,a-z]+(?=<)/)[0]
            output1.splice(i,1)
            j++
            }
        }
        j=0
    for(var i=0;i<output1.length;i++){
        if(output1[i].match(/.+(?=<)/)!=null){
            output[j].titile=output1[i].match(/.+(?=<)/)[0]
            j++
            }
    }
    console.log(output)
}