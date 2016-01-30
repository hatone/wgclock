function getMyTimezone(){
  httpObj = new XMLHttpRequest();
  httpObj.open("get", "./js/seeds/timezone_list.json", true);
  httpObj.onload = function(){

    var myData = JSON.parse(this.responseText);

    if(localStorage.myTimezone != null) {
      var myTimezones = JSON.parse(localStorage.myTimezone);
      var currentTimezone = JSON.parse(localStorage.currentTimezone);
      showMyTimes(currentTimezone,myTimezones);

      //if (currentTimezone == null){
      //  document.getElementById("my_timezones").innerHTML = '<a class="btn btn-primary btn-large btn-block" href="#" target="_blank"> Add Timezone!</a>';
      //}


    //var txt = "";
    //for (var i=0; i<myData.timezone.length; i++){
    //  txt = txt + myData.timezone[i].name + " is " + myData.timezone[i].difference+" difference<br>";
    //}
    //document.getElementById("result").innerHTML = txt;

    }
  }
  httpObj.send(null);
}

function showMyTimes(currentTimezone,myTimezones){
    console.log(myTimezones);
    //console.log(currentTimezone);

    var current_str = "";
    plotTime(0,currentTimezone.name);

    console.log(current_str);

    for (var i=0; i < myTimezones.length; i++){ 
      var diff = parseInt(myTimezones[i].difference) - parseInt(currentTimezone.difference);
      console.log(diff);
      plotTime(diff,myTimezones[i].name)
    }
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


