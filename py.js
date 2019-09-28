
doc = document;
function sp(inp, typ) {
    if (typ == "function")
        return `[[[(/${inp}/)]]]`
    else if (typ == "string")
        return `[[[:/${inp}/:]]]`
    else if (typ == "builtin")
        return `[[[_/${inp}/_]]]`
    else if (typ == "operand")
        return `[[[^/${inp}/^]]]`
    else if (typ == "comment")
        return `[[[+/${inp}/+]]]`
    else if (typ == "bytes")
        return `[[[-/${inp}/-]]]`
    else if (typ == "fstring")
        return `[[[*/${inp}/*]]]`
    return inp
}
function st(inp, typ) {
    return `<span class="${typ}">${inp}</span>`
function rm(st) {
    return regex(/<.*>(.*)<\/.*>/, st, "${1}");
}
function regex(reg, st, rep) {
    match = st.match(reg);
    if (match != null) {
        for (var x = 1; x < match.length; x++)
            rep = rep.replace("${"+x+"}", match[x]);
        st = st.replace(reg, rep);
    }
    return st;
}
function fn(){
    codeA = doc.getElementById("coder").innerHTML;
    code = codeA+" ";
    code = rm(code);
    code = regex(/"(.*)"/, code, sp('${1}"${2}"', "string"));
    code = regex(/'(.*)'/, code, sp('${1}"${2}"', "string"));
    code = regex(/([uUfF])"(.*)"/, code, sp('${1}"${2}"', "fstring"));
    code = regex(/([uUfF])'(.*)'/, code, sp('${1}"${2}"', "fstring"));
    code = regex(/([rRbB])"(.*)"/, code, sp('${1}"${2}"', "bytes"));
    code = regex(/([rRbB])'(.*)'/, code, sp('${1}"${2}"', "bytes"));
    code = regex(/(\w+)\((.*)\)/m, code, sp("${1}", "function")+"(${2})");
    code = regex(/__(.*)__/, code, sp("<i>__${1}__</i>", "operand"));
    var kws= ['for', 'while', 'import', 'yield', 'from', 'del', 
              'pass', 'def', 'if', 'elif', 'else', 'try', 'raise',
              'with', 'async', 'finally', 'except', 'except',
              'await ', 'class', 'as', 'and', 'or', 'not',
              'is', 'in', 'False', 'True', 'break', 'continue',
              'lambda ', 'global', 'assert', 'nonlocal'];
    for (var x of kws)
        code = code.replace(x, sp(`<b>${x}</b>`, "builtin"));
    code = regex(/#(.*)/, code, sp("#${1}", "comment"))
    code = regex(/<span class="(.*)">(.*)<span class=".*">(.*)<\/span>(.*)<\/span>/, code, sp("${2}${3}${4}", "${1}"));
    code = regex(/\[\[\[\(\/(.*)\/\)\]\]\]/, code, st("${1}", "function"));
    code = regex(/\[\[\[\:\/(.*)\/\:\]\]\]/, code, st("${1}", "string"));
    code = regex(/\[\[\[\_\/(.*)\/\_\]\]\]/, code, st("${1}", "builtin"));
    code = regex(/\[\[\[\^\/(.*)\/\^\]\]\]/, code, st("${1}", "operand"));
    code = regex(/\[\[\[\+\/(.*)\/\+\]\]\]/, code, st("${1}", "comment"));
    code = regex(/\[\[\[\-\/(.*)\/\-\]\]\]/, code, st("${1}", "bytes"));
    code = regex(/\[\[\[\*\/(.*)\/\*\]\]\]/, code, st("${1}", "fstring"));
    doc.getElementById("coder").innerHTML = code;
}
doc.getElementById("coder").addEventListener("blur", fn, true)
