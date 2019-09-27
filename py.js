doc = document
function fn(){
    doc.write('ready')
    codeA = doc.getElementById("coder").innerHTML
    code = codeA
    code = code.replace(/<(.|\n)*?>/, "")
    
    code = code.replace(/(\w+)\((.*)\)/, r'<span class="function">\1</span>(\2)', code);
    var sym = ['%', '^', '+', '*', '=', '>', '<', '~', '|', '@', '[',
               ']', '{', '}', '(', ')', '&', ',', '.', ';', ':', '__',
               '!', '?'];
    for (var x of sym)
        code = code.replace(x, `<span class="operand">${x}</span>`);
    var kws= ['for', 'while', 'import', 'yield', 'from', 'del', 
              'pass', 'def', 'if', 'elif', 'else', 'try', 'raise', 
              'with', 'async', 'finally', 'except', 'except', 
              'await ', 'class', 'as', 'and', 'or', 'not', 
              'is', 'in', 'False', 'True', 'break', 'continue',
              'lambda ', 'global', 'assert', 'nonlocal']
    for (var x of kws){
        for (var y of sym) {
            code = code.replace(y+x+y, x);
            code = code.replace(x+y, x);
            code = code.replace(y+x, x);
            code = code.replace(x, f'<span class="builtin">{x}</span>');
        }
    }
    match = code.match(/([fF])'(.*)'/);
    code = code.replace(/([fF])'(.*)'/, `<span class="fstring">${match[1]}'${match[2]}'</span>`);
    match = code.match(/([bBrR])'(.*)'/);
    code = code.replace(/([bBrR])'(.*)'/, `<span class="bytes">${match[1]}'${match[2]}'</span>`);
    match = code.match(/([uU])'(.*)'/);
    code = code.replace(/([uU])'(.*)'/, `<span class="string">${match[1]}'${match[2]}'</span>`);
    match = code.match(/'(.*)'/);
    code = code.replace(/'(.*)'/, `<span class="string">$'${match[2]}'</span>`);
    match = code.match(/([fF])"(.*)"/);
    code = code.replace(/([fF])"(.*)"/, `<span class="fstring">${match[1]}"${match[2]}"</span>`);
    match = code.match(/([bBrR])"(.*)"/);
    code = code.match(/([bBrR])"(.*)"/, `<span class="bytes">${match[1]}"${match[2]}"</span>`);
    match = code.match(/([uU])"(.*)"/);
    code = code.replace(/([uU])"(.*)"/, `<span class="string">${match[1]}"${match[2]}"</span>`);
    match = code.match(/"(.*)"/);
    code = code.replace(/"(.*)"/, `<span class="string">$'${match[2]}'</span>`);
    if (codeA != code)
        doc.getElementById("coder").innerHTML = code;
}
doc.getElementById("coder").addEventListener("blur", fn, true)
