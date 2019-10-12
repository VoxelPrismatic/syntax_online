from browser import window as win, document as doc, html
from re import sub, match
from fns import *

def rm():
    st = gID("coder").innerHTML
    st = sub(r'<span class="\w+">', "", sub(r"<\/span>", "", st+" "))
    st = sub("<.>", "", sub(r"<\/.>", "", st))
    gID("coder").innerHTML = st

def fn(*args):
    rm()
    code = doc["coder"].innerHTML.replace("<div>", '\|').replace("</div>", '\~');
    code = sub(r'((\w+\.?)*)\(', r'<F>\1<<>(', code)
    code = sub(r'__(.*)__', r'<i>__\1__</i>', code)
    for kw in ['for', 'while', 'import', 'yield', 'from', 'del', 
               'pass', 'def', 'if', 'elif', 'else', 'try', 'raise',
               'with', 'async', 'finally', 'except', 'except',
               'await ', 'class', 'as', 'and', 'or', 'not',
               'is', 'in', 'False', 'True', 'break', 'continue',
               'lambda ', 'global', 'assert', 'nonlocal']:
        code = code.replace(kw, f"<b><O>{kw}<<><\b>")
    code = sub(r"([uUfF])'(.*)'", r"<D>\1'\2'<<>", code)
    code = sub(r"([rRbb])'(.*)'", r"<X>\1'\2'<<>", code)
    code = sub(r'([uUfF])"(.*)"', r'<D>\1"\2"<<>', code)
    code = sub(r'([rRbB])"(.*)"', r'<X>\1"\2"<<>', code)
    code = sub(r"[^rRuUfFbB]'(.*)'", r"<S>'\1'<<>", code)
    code = sub(r'[^rRuUfFbB]"(.*)"', r'<S>"\1"<<>', code)
    code = sub(r"\#(.*)", r"<C>\#\1<<>", code)
    code = sub(r"<([A-Z])>(.*)<[A-Z]>(.*)<<>(.*)<<>", r"<\1>\2\3\4<<>"
    code = code.replace("<F>", '<span class="function">').replace("<S>", '<span class="string">')
    code = code.replace("<T>", '<span class="builtin">').replace("<O>", '<span class="operand">')
    code = code.replace("<C>", '<span class="comment">').replace("<X>", '<span class="bytes">')
    code = code.replace("<D>", '<span class="fstring">').replace("<<>", '</span>');
    doc["coder"].innerHTML = code.replace("\|","<div>").replace("\~","</div>");
doc["coder"].bind("focusout", fn);
