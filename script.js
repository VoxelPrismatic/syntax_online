function fn() {
  var itm = document.getElementById("coder").innerHTML;
  itm = itm.replace("/<(.|\n)*?>/","");
  document.getElementById("coder").innerHTML = itm;
}
