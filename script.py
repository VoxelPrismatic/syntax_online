from browser import document as doc
from re import *
def fn():
    code = doc.getElementById("coder").innerHTML
    code = sub(r"<(.|\n)*?>", "", code)
    code = sub(r"( \w+)\(.*\)", r'<span class="function">\1</span>', code)
    for x in ['%', '**=', '+=', '*=', '%=', '-=', '/=', '**', 
              '^', '>=', '<=', '+', '/', '\\', '*', '==', '='
              '>', '<', '&']:
        code = code.replace(x, f'<span class="operand">{x}</span>')
    code = sub(r"f'(.*)'", r'<span class="fstring">f\'\1\'</span>', code)
           
function fn() {
  var itm = document.getElementById("coder").innerHTML;
  itm = itm.replace("/<(.|\n)*?>/","");
  var fns = /([\w.]+\([\w\d ]*)\)/mg;
  var subfn = /([\w.]+)\(([\w\d ]*)\)/;
  var ops = ['%', '+', '*', '/', '-', '^'];
  var bin = ['__builtins__'];
  var kwd = ['import', 'from', 'for', 'while', 'def', 'async'];
  for (var val of ops) {
    itm = itm.replace(val, '<span class="operator">'+val+'</span>')
  }
  for (var fn of itm.match(fns)) {
    itm = itm.replace(fn, '<span class="function">'+fn.match(subfn)[1]+'(</span>'+
                      fn.match(subfn)[2]+'<span class="function">)</span>');
  }
  for (var fn of bin) {
    itm = itm.replace(val, '<span class="builtins">'+val+'</span>')
  document.getElementById("coder").innerHTML = itm;
}
