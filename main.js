function gcd(m, n){
    if (m < n)  return gcd(n, m); 
    var r = m % n;
    if (r == 0) return n;
    return gcd(n, r);
}

function lcm(a, b) {
    return a * b / gcd(a, b);
}

function Get_func_parameter_check(c){
    return c.filter((v)=>{return Number.isNaN(v);}).length>0;
}

//return a,b=1固定
// a/b
function Get_func1(arg_c,p){
    let c=arg_c;

    c=c.reverse();
    let a_up=0;
    for(let i=0;i<c.length;i++){
        a_up+=Math.pow(p,i)*c[i];
    }
    let a_down=Math.pow(p,c.length)-1;
    let a_temp1=gcd(a_up,a_down);
    a_up/=a_temp1;
    a_down/=a_temp1;
    return [a_up,a_down];
}

//ヘッダー部
function Get_func_h(arg_ch,p){
    let ch=arg_ch;
    ch=ch.reverse();
    let a_up=0;
    for(let i=0;i<ch.length;i++){
        a_up+=ch[i]*Math.pow(p,i);
    }
    if(a_up==0){
        return [0,0];
    }
    let a_down=Math.pow(p,ch.length);
    let a_temp1=gcd(a_up,a_down);
    a_up/=a_temp1;
    a_down/=a_temp1;
    return [a_up,a_down];
}

function check_parameter(p,c,ch){
    if(!(2<=p&&p<=36)){
        alert("進数は2から36まで指定可能です。");
        return {"ok":false,"data":null};
    }
    let pattern=/[0-9a-zA-Z]/;
    if(c.split('').find((v)=>{return !pattern.test(v)})!=undefined){
        alert("頭の部分の少数では数値しか入力出来ません(\"-\"等の記号が含まれています)。");
        return {"ok":false,"data":null};
    }
    if(ch.split('').find((v)=>{return !pattern.test(v)})!=undefined){
        alert("循環させたい少数では数値しか入力出来ません(\"-\"等の記号が含まれています)。");
        return {"ok":false,"data":null};
    }
    let ac=c.split('').map( str => parseInt(str, p) );
    let ach=ch.split('').map( str => parseInt(str, p) );
    if(Get_func_parameter_check(ac)){
        alert("頭の部分の少数は指定した進数で数値を入力してください。");
        return {"ok":false,"data":null};
    }
    if(Get_func_parameter_check(ach)){
        alert("循環させたい少数は指定した進数で数値を入力してください。");
        return {"ok":false,"data":null};
    }
    return {
        "ok":true,
        "data":{
            "p":p,
            "c":ac,
            "ch":ach
        }
    };
}

function Get_func_Run(){
    let p=parseInt(document.getElementById("in_p").value, 10);
    let c=document.getElementById("in_c").value;
    let ch=document.getElementById("in_ch").value;
    
    let ret_param=check_parameter(p,c,ch);
    if(!ret_param["ok"]){
        return;
    }

    let A1=Get_func_h(ret_param["data"]["ch"],ret_param["data"]["p"]);//頭
    let A2=Get_func1(ret_param["data"]["c"],ret_param["data"]["p"]);//循環

    A2[1]*=Math.pow(p,ch.length);
    if(A1[0]!=0){
        //ADD
        let A1_2_temp=lcm(A1[1],A2[1]);
        A1[0]*=A1_2_temp/A1[1];
        A1[1]=A1_2_temp;
        A2[0]*=A1_2_temp/A2[1];
        A2[1]=A1_2_temp;
        var A=[(A1[0]+A2[0]),A1[1]];
    }else{
        var A=A2;
    }

    let A_temp1=gcd(A[0],A[1]);
    A[0]/=A_temp1;
    A[1]/=A_temp1;

    document.getElementById("sample").innerHTML
    =
    `\\[
        {0.${ch}${c}${c}...}_{(${p})}
    \\]
    `
    ;
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"sample"]);

    document.getElementById("answer").innerHTML
    =
    `\\[
        \\frac{${A[0].toString(p)}}{${A[1].toString(p)}}_{(${p})}
    \\]`
    ;
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"answer"]);
}
window.onload=function(){
    Get_func_Run();
}
