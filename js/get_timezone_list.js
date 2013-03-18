function getTimezoneList(){
  httpObj = new XMLHttpRequest();
  httpObj.open("get", "./js/seeds/timezone_list.json", true);
  httpObj.onload = function(){

    var myData = JSON.parse(this.responseText);

    var txt = "";
    for (var i=0; i<myData.timezone.length; i++){
      txt = txt + '<option value="'+ myData.timezone[i].id +'">' + myData.timezone[i].name + " (" + myData.timezone[i].difference + ")</option>";
    }
    $(".timezones").html(txt);
  }
  httpObj.send(null);
}

function addTimezone(){
  httpObj = new XMLHttpRequest();
  httpObj.open("get", "./js/seeds/timezone_list.json", true);
  httpObj.onload = function(){

    var myData = JSON.parse(this.responseText);

    var txt = "";
    for (var i=0; i<myData.timezone.length; i++){
      txt = txt + '<option value="'+ myData.timezone[i].id +'">' + myData.timezone[i].name + " (" + myData.timezone[i].difference + ")</option>";
    }
    $("#timezone_forms").append('<br>');
    $("#timezone_forms").append('<select class="timezones">' + txt +'</select>');
  }
  httpObj.send(null);
}

function submitTimezone(){
  httpObj = new XMLHttpRequest();
  httpObj.open("get", "./js/seeds/timezone_list.json", true);
  var myData;
  httpObj.onload = function(){
    myData = JSON.parse(this.responseText);

    var timezones = new Array();
    $('.timezones').each(function(index,e) { 
        timezones.push(myData.timezone[e.value]);
    });

    localStorage.setItem("currentTimezone",JSON.stringify(timezones[0]));
    timezones.shift();
    localStorage.setItem("myTimezone",JSON.stringify(timezones));
    document.getElementById("my_timezones").innerHTML = '';
    getMyTimezone();
  }
  httpObj.send(null);
}

