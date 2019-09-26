from browser import document as doc
from re import *
def fn():
    codeA = doc.getElementById("coder").innerHTML
    code = codeA
    code = sub(r"<(.|\n)*?>", "", code)
    code = sub(r"( \w+)\(.*\)", r'<span class="function">\1</span>', code)
    for x in ['%', '**=', '+=', '*=', '%=', '-=', '/=', '**', 
              '^', '>=', '<=', '+', '/', '\\', '*', '==', '='
              '>', '<', '&', '|']:
        code = code.replace(x, f'<span class="operand">{x}</span>')
    code = sub(r"f'(.*)'", r'<span class="fstring">f\'\1\'</span>', code)
    code = sub(r"b'(.*)'", r'<span class="bytes">b\'\1\'</span>', code)
    code = sub(r"f'(.*)'", r'<span class="string">\'\1\'</span>', code)
    code = sub(r'f"(.*)"', r'<span class="fstring">f"\1"</span>', code)
    code = sub(r'b"(.*)"', r'<span class="bytes">b"\1"</span>', code)
    code = sub(r'"(.*)"', r'<span class="string">"\1"</span>', code)
    if codeA != code:
        doc.getElementById("coder").innerHTML = code
