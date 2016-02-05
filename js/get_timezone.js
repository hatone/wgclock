function getMyTimezone(){
    httpObj = new XMLHttpRequest();
    httpObj.open("get", "./js/seeds/timezone_list.json", true);
    httpObj.onload = function(){

        if(localStorage.currentTimezone == null) {
            localStorage.setItem("currentTimezone",'{"name":"GMT","difference":0}');
        }
        if(localStorage.myTimezone == null) {
            localStorage.setItem("myTimezone",'[{"name":"PST","difference":-8},{"name":"EST","difference":-5},{"name":"JST","difference":9git }]');
        }
        var currentTimezone = JSON.parse(localStorage.currentTimezone);
        var myTimezones = JSON.parse(localStorage.myTimezone);

        showMyTimes(currentTimezone,myTimezones);
    }

    httpObj.send(null);
}

function showMyTimes(currentTimezone,myTimezones){
    plotTime(0,currentTimezone.name);

    myTimezones.forEach(function(tz){
        var diff = parseInt(tz.difference) - parseInt(currentTimezone.difference);
        plotTime(diff,tz.name);
    });
}

function plotTime(diff,name){
    var myTimezoneStr = '<div class="btn-group"><div class="btn btn-danger timezone">'+ name + '</div>';
    for (var i=0; i<=23; i++){
        var t = i + diff;
        if (t > 23) t = -24 + t;
        if (t <= -1) t = 24 + t;
        if ((t >= 8 && t <= 22)){
            myTimezoneStr += '<div class="btn btn-primary hour">' + t + "</div>";
        } else {
            myTimezoneStr += '<div class="btn hour">'+ t + "</div>";
        }
    }
    myTimezoneStr += "</div></br></br>";
    document.getElementById("my_timezones").innerHTML += myTimezoneStr;
}


