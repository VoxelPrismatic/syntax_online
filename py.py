from browser import window as win, document as doc, html
from re import sub, match
from fns import *
doc = document;
def sp(inp, typ):
    if typ == "function"
        return f"<f>{inp}<<>"
    elif typ == "string"
        return f"<s>{inp}<<>"
    elif typ == "builtin"
        return f"<t>{inp}<<>"
    elif typ == "operand"
        return f"<o>{inp}<<>"
    elif typ == "comment"
        return f"<c>{inp}<<>"
    elif typ == "bytes"
        return f"<x>{inp}<<>"
    elif typ == "fstring"
        return f"<d>{inp}<<>"
    return inp

def st(inp, typ):
    return f'<span class="{typ}">{inp}</span>'

def rm():
    st = doc.getElementById("coder").innerHTML
    st = sub(r'<span class="\w+">', "", sub(r"<\/span>", "", st+" "))
    st = sub("<.>", "", sub(r"<\/.>", ""))
    eEDIT("coder", st)

def fn():
    code = doc["coder"].text.replace("<div>", '\n').replace("</div>", '\t');
    console.log(code)
    code = sub(r"'(.*)'", r"<s>'\1'<<>")
    code = sub(r"'(.*)'", r"<s>'\1'<<>")
    
    code = regex(/"(.*)"/, code, sp('"${1}"', "string"));
    code = regex(/'(.*)'/, code, sp("'${1}'", "string"));
    code = regex(/([uUfF])<s>"(.*)"/, code, sp('${1}"${2}"', "fstring"));
    code = regex(/([uUfF])<s>'(.*)'/, code, sp("${1}'${2}'", "fstring"));
    code = regex(/([rRbB])<s>"(.*)"/, code, sp('${1}"${2}"', "bytes"));
    code = regex(/([rRbB])<s>'(.*)'/, code, sp("${1}'${2}'", "bytes"));
    code = regex(/(\w+)\(/, code, sp("${1}", "function")+"(");
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
    code = code.replace(/<f>/g, '<span class="function">').replace(/<s>/g, '<span class="string">');
    code = code.replace(/<t>/g, '<span class="builtin">').replace(/<o>/g, '<span class="operand">');
    code = code.replace(/<c>/g, '<span class="comment">').replace(/<x>/g, '<span class="bytes">');
    code = code.replace(/<d>/g, '<span class="fstring">').replace(/<<>/g, '</span>');
    /*code = regex(/<span class="(.*)">(.*)<span class=".*">(.*)<\/span>(.*)<\/span>/, code, sp("${2}${3}${4}", "${1}"));*/
    doc.getElementById("coder").innerHTML = code.replace("\n","<div>").replace("\t","</div>");
    console.log(doc.getElementById("coder").innerHTML);
}
doc.getElementById("coder").addEventListener("focusout", fn, true);
doc.getElementById("coder").addEventListener("focusin", rm, true);
