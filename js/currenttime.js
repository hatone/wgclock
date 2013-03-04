var Time= new Date();

var Hour = Time.getHours();
var Minute = Time.getMinutes();
var Second = Time.getSeconds();

document.write(Hour+":",+Minute+":"+Second+"");
setTimeout("location.reload()",1000); 
