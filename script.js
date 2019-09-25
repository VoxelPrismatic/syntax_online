function fn() {
  var itm = document.getElementById("coder").innerHTML;
  itm = itm.replace("/<(.|\n)*?>/","");
  var fns = /(([a-zA-Z0-9]*.)+\((.\n)*\))/;
  var ops = ['%', '+', '*', '/', '-', '^'];
  var bin = ['__builtins__'];
  var kwd = ['import', 'from', 'for', 'while', 'def', 'async'];
  for (var val of ops) {
    itm.replace(val, '<span class="operator">'+val+'</span>')
  }
  document.getElementById("coder").innerHTML = itm;
}
