from browser import window as win, document as doc, html
from re import sub as sb, match
from fns import *

def sub(a, b, c):
    c = sb(a, b, c)
    doc["coder"].innerHTML = c
    return c

def rm():
    st = gID("coder").innerHTML
    st = sub(r'<span class="\w+">', "", sub(r"<\/span>", "", st+" "))
    st = sub("<.>", "", sub(r"<\/.>", "", st))
    gID("coder").innerHTML = st

def fn(*args):
    rm()
    code = doc["coder"].innerHTML.replace("<div>", '\n').replace("</div>", '\t');
    code = sub(r'((\w+\.?)*)\(', r'<f>\1<<>(', code)
    code = sub(r'__(.*)__', r'<i>__\1__</i>', code)
    for kw in ['for', 'while', 'import', 'yield', 'from', 'del', 
               'pass', 'def', 'if', 'elif', 'else', 'try', 'raise',
               'with', 'async', 'finally', 'except', 'except',
               'await ', 'class', 'as', 'and', 'or', 'not',
               'is', 'in', 'False', 'True', 'break', 'continue',
               'lambda ', 'global', 'assert', 'nonlocal']:
        code = code.replace(kw, f"<b><o>{kw}<<><\b>")
    code = sub(r"([uUfF])'(.*)'", r"<d>\1'\2'<<>", code)
    code = sub(r"([rRuU])'(.*)'", r"<x>\1'\2'<<>", code)
    code = sub(r'([uUfF])"(.*)"', r'<d>\1"\2"<<>', code)
    code = sub(r'([rRuU])"(.*)"', r'<x>\1"\2"<<>', code)
    code = sub(r"'(.*)'", r"<s>'\1'<<>", code)
    code = sub(r'"(.*)"', r'<s>"\1"<<>', code)
    code = sub(r"\#(.*)", r"<c>\#\1<<>", code)
    code = code.replace("<f>", '<span class="function">').replace("<s>", '<span class="string">')
    code = code.replace("<t>", '<span class="builtin">').replace("<o>", '<span class="operand">')
    code = code.replace("<c>", '<span class="comment">').replace("<x>", '<span class="bytes">')
    code = code.replace("<d>", '<span class="fstring">').replace("<<>", '</span>');
    code = sub(r'<span class="(.*)">(.*)<span class=".*">(.*)<\/span>(.*)<\/span>', 
               r'<span class="\1">\2\3\4</span', code);
    doc["coder"].innerHTML = code.replace("\n","<div>").replace("\t","</div>");
doc["coder"].bind("focusout", fn);
