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
