function clocknow(){
    weeks = new Array("Sun","Mon","Thu","Wed","Thr","Fri","Sat") ;
    now = new Date() ;
    y = now.getFullYear() ;
    mo = now.getMonth() + 1 ;
    d = now.getDate() ;
    w = weeks[now.getDay()] ;
    h = now.getHours();
    mi = now.getMinutes();
    s = now.getSeconds();
 
    if ( mo < 10 ) { mo = "0" + mo ; }
    if ( d < 10 ) { d = "0" + d ; }
    if ( h < 10 ) { h = "0" + h ; }
    if ( mi < 10 ) { mi = "0" + mi ; }
    if ( s < 10 ) { s = "0" + s ; }
 
    document.getElementById("current_time").innerHTML = "<span id="+ "date" +">" + y + "/" + mo + "/" + d + "/(" + w + ")</span></br><span id=" + "time" + ">" + h + ":" + mi + ":" + s;
}
 
