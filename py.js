
doc = document;
function sp(inp, typ) {
    return `<span class="${typ}">`+inp+'</span>';
}
function rm(st) {
    return regex(/<span class=".*">(.*)<\/span>/, st, "${abcdWXYZ[1]}");
}
function regex(reg, st, rep) {
    match = st.match(reg);
    if (match != null) {
        for (var x = 1; x < match.length; x++)
            rep = rep.replace("${abcdWXYZ["+x+"]}", match[x]);
        st = st.replace(reg, rep);
    }
    return st;
}
function fn(){
    codeA = doc.getElementById("coder").innerHTML;
    code = codeA+" ";
    code = rm(code);
    code = regex(/(\w+)\((.*)\)/m, code, sp("${abcdWXYZ[1]}", "function")+"(${abcdWXYZ[2]})");
    code = regex(/"(.*)"[^>]/, code, sp('"${abcdWXYZ[1]}"', "string"));
    code = regex(/'(.*)'[^>]/, code, sp("'${abcdWXYZ[1]}'", "string"));
    code = regex(/([fF])<span class="string">"(.*)"<\/span>/, code, 
                  sp('${abcdWXYZ[1]}"${abcdWXYZ[2]}"', "fstring"));
    code = regex(/([bBrR])<span class="string">"(.*)"<\/span>/, code, 
                  sp('${abcdWXYZ[1]}"${abcdWXYZ[2]}"', "bytes"));
    code = regex(/([uU])<span class="string">"(.*)"<\/span>/, code, 
                  sp('${abcdWXYZ[1]}"${abcdWXYZ[2]}"', "string"));
    code = regex(/([fF])<span class="string">'(.*)'<\/span>/, code, 
                  sp("${abcdWXYZ[1]}'${abcdWXYZ[2]}'", "fstring"));
    code = regex(/([bBrR])<span class="string">"(.*)"<\/span>/, code, 
                  sp("${abcdWXYZ[1]}'${abcdWXYZ[2]}'", "bytes"));
    code = regex(/([uU])<span class="string">"(.*)"<\/span>/, code, 
                  sp("${abcdWXYZ[1]}'${abcdWXYZ[2]}'", "string"));
    code = regex(/__(.*)__/, code, sp("<i>__${abcdWXYZ[1]}__</i>", "operand"));
    var kws= ['for', 'while', 'import', 'yield', 'from', 'del', 
              'pass', 'def', 'if', 'elif', 'else', 'try', 'raise', 
              'with', 'async', 'finally', 'except', 'except', 
              'await ', 'class', 'as', 'and', 'or', 'not', 
              'is', 'in', 'False', 'True', 'break', 'continue',
              'lambda ', 'global', 'assert', 'nonlocal'];
    for (var x of kws)
        code = code//.replace(x, sp(`<b>${x}</b>`, "builtin"));
    code = regex(/#(.*)/, code, sp("#${abcdWXYZ[1]}", "comment"));
    match = code.match(/(<.*>).*<.*>.*(.*).*<\/.*>.*(<\/.*>)/);
    code = regex(/<span class="(.*)">(.*)<span class=".*">(.*)<\/span>(.*)<\/span>/, code, 
                  sp("${abcdWXYZ[2]}${abcdWXYZ[3]}${abcdWXYZ[4]}", "${abcdWXYZ[1]}"));
    //code = regex1(/<span class="comment"><.*>(.*)<.*>
    doc.getElementById("coder").innerHTML = code;
}
doc.getElementById("coder").addEventListener("blur", fn, true)
