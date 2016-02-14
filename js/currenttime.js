function clocknow(){
    var weeks = new Array("Sun","Mon","Thu","Wed","Thr","Fri","Sat") ;
    var now = new Date() ;
    var y = now.getFullYear() ;
    var mo = now.getMonth() + 1 ;
    var d = now.getDate() ;
    var w = weeks[now.getDay()] ;
    var h = now.getHours();
    var mi = now.getMinutes();
    var s = now.getSeconds();
 
    if ( mo < 10 ) { mo = "0" + mo ; }
    if ( d < 10 ) { d = "0" + d ; }
    if ( h < 10 ) { h = "0" + h ; }
    if ( mi < 10 ) { mi = "0" + mi ; }
    if ( s < 10 ) { s = "0" + s ; }
    
    var chardon_clock = 'data-intro="Here is your clock!" data-position="left"'
    document.getElementById("current_time").innerHTML = "<span id="+ "date" +">" + y + "/" + mo + "/" + d + "/(" + w + ")</span></br><span id=" + "time" + " " + chardon_clock + " >" + h + ":" + mi + ":" + s;
}
 
