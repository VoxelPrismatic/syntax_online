
doc = document;
function sp(inp, typ) {
    return '\<span class="'+typ+'"\>'+inp+'\<\/span\>';
}
function regex2(reg, st, rep) {
    match =  st.match(reg);
    if (match != null) {
        rep = rep.replace("${match[1]}", match[1]);
        rep = rep.replace("${match[2]}", match[2]);
        st = st.replace(reg, rep);
    return st;
}
function regex1(reg, st, rep) {
    match =  st.match(reg);
    if (match != null) {
        rep = rep.replace("${match[1]}", match[1]);
        st = st.replace(reg, rep);
    return st;
}
function fn(){
    codeA = doc.getElementById("coder").innerHTML;
    code = codeA;
    code = code.replace(/<(.|\n)*?>/, "");
    
    code = regex2(/(\w+)\((.*)\)/, sp("${match[1]}", "function")+"(${match[2]})");
    var sym = ['%', '^', '+', '*', '=', '>', '<', '~', '|', '@', '[',
               ']', '{', '}', '(', ')', '&', ',', '.', ';', ':', '__',
               '!', '?', '`', '-', 'j', 'J', '&'];
    for (var x of sym)
        code = code.replace(x, sp(x, "operand"));
    var kws= ['for', 'while', 'import', 'yield', 'from', 'del', 
              'pass', 'def', 'if', 'elif', 'else', 'try', 'raise', 
              'with', 'async', 'finally', 'except', 'except', 
              'await ', 'class', 'as', 'and', 'or', 'not', 
              'is', 'in', 'False', 'True', 'break', 'continue',
              'lambda ', 'global', 'assert', 'nonlocal'];
    for (var x of kws)
        code = code.replace(x, sp(x, "builtin"));
    code = regex2(/([fF])'(.*)'/, sp("${match[1]}'${match[2]}'", "fstring"));
    code = regex2(/([bBrR])'(.*)'/, sp("${match[1]}'${match[2]}'", "bytes"));
    code = regex2(/([uU])'(.*)'/, sp("${match[1]}'${match[2]}'", "string"));
    code = regex1(/'(.*)'/, sp("'${match[1]}'", "string"));
    code = regex2(/([fF])"(.*)"/, sp('${match[1]}"${match[2]}"', "fstring"));
    code = regex2(/([bBrR])"(.*)"/, sp('${match[1]}"${match[2]}"', "bytes"));
    code = regex2(/([uU])"(.*)"/, sp('${match[1]}"${match[2]}"', "string"));
    code = regex1(/"(.*)"/, sp('"${match[1]}"', "string"));
    if (codeA != code)
        doc.getElementById("coder").innerHTML = code;
}
doc.getElementById("coder").addEventListener("blur", fn, true)
