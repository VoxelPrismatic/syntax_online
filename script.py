from browser import document as doc
from re import *
def fn():
    codeA = doc.getElementById("coder").innerHTML
    code = codeA
    code = sub(r"<(.|\n)*?>", "", code)
    code = sub(r"(\w+)\((.*)\)", r'<span class="function">\1</span>(\2)', code)
    for x in ['%', '**=', '+=', '*=', '%=', '-=', '/=', '**', 
              '^', '>=', '<=', '+', '//=', '\\', '*', '==',
              '=',]:
        code = code.replace(x, f'<span class="operand">{x}</span>')
    for x in ['for ', 'while ', 'import ', 'yield ', 'from ', 'del', 
              'pass', 'def', 'if ', 'elif ', 'else ', 'try:', 'raise ', 
              'with ', 'async ', 'finally:', 'except:', 'except ', 
              'await ', 'class ', ' as ', ' and ', ' or ', ' not ', 
              ' is ', ' in ', ' False ', ' True ', 'break', 'continue',
              'lambda ', 'global ', 'assert ', 'nonlocal']:
        code = code.replace(x, f'<span class="operand">{x}</span>')
    strings = {r"([fF])'(.*)'": r'<span class="fstring">\1\'\2\'</span>',
               r"([bB])'(.*)'": r'<span class="bytes">\1\'\2\'</span>',
               r"([uU])'(.*)'": r'<span class="string">\1\'\2\'</span>',
               r"([rR])'(.*)'": r'<span class="bytes">\1\'\2\'</span>',
               r"'(.*)'": r'<span class="string">\1\'\2\'</span>',
               r'([fF])"(.*)"': r'<span class="fstring">\1"\2"</span>',
               r'([bB])"(.*)"': r'<span class="bytes">\1"\2"</span>',
               r'([uU])"(.*)"': r'<span class="string">\1"\2"</span>',
               r'([rR])"(.*)"': r'<span class="bytes">\1"\2"</span>',
               r'"(.*)"': r'<span class="string">\1"\2"</span>'}
    for string in strings:
        code = sub(string, strings[string], code)
    if codeA != code:
        doc.getElementById("coder").innerHTML = code
