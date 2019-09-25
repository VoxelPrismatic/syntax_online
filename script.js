function fn() {
  var itm = document.getElementById("coder").innerHTML;
  itm = itm.replace("/<(.|\n)*?>/","");
  var fns = /(([a-zA-Z][a-zA-Z0-9]*.)+\((.*\n*)*\))/g;
  var subfn = /(([a-zA-Z][a-zA-Z0-9]*.)+\()(.*\n*)*\)/g
  var ops = ['%', '+', '*', '/', '-', '^'];
  var bin = ['__builtins__'];
  var kwd = ['import', 'from', 'for', 'while', 'def', 'async'];
  for (var val of ops) {
    itm.replace(val, '<span class="operator">'+val+'</span>')
  }
  for (var fn of itm.match(fns).slice(1,)) {
    itm = itm.replace(fn, '<span class="function">'+fn.match(subfn)[1]+'</span>'+
                      fn.match(subfn)[2]+'<span class="function">)</span>");
  }
  document.getElementById("coder").innerHTML = itm;
}
