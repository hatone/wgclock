function getTimezoneList(){
  httpObj = new XMLHttpRequest();
  httpObj.open("get", "./js/seeds/timezone_list.json", true);

  httpObj.onload = function(){

    console.log("===========debug===========");
    var myData = JSON.parse(this.responseText);

    var currentTimezoneOption = "";
    var mtTimezoneOptions = "";
    for (var i=0; i<myData.timezone.length; i++){

     if(localStorage.currentTimezone != null) {
      var currentTimezone = JSON.parse(localStorage.currentTimezone);

      if (parseInt(currentTimezone.id-1) == i) {
        console.log(currentTimezone.id);
        currentTimezoneOption = currentTimezoneOption + '<option value="'+ myData.timezone[i].id +'" selected="selected">' + myData.timezone[i].name + " (" + myData.timezone[i].difference + ")</option>";
      } 
      else {
        currentTimezoneOption = currentTimezoneOption + '<option value="'+ myData.timezone[i].id +'">' + myData.timezone[i].name + " (" + myData.timezone[i].difference + ")</option>";
      }

      if(localStorage.myTimezones != null) {
        var myTimezones = JSON.parse(localStorage.myTimezone);

        if (parseInt(myTimezones.id-1) == i) {
          console.log(myTimezones.id);
          mtTimezoneOptions = mtTimezoneOptions + '<option value="'+ myData.timezone[i].id +'" selected="selected">' + myData.timezone[i].name + " (" + myData.timezone[i].difference + ")</option>";
        } 
        else {
          mtTimezoneOptions = mtTimezoneOptions + '<option value="'+ myData.timezone[i].id +'">' + myData.timezone[i].name + " (" + myData.timezone[i].difference + ")</option>";
        }
      }

    } else {
      currentTimezoneOption = currentTimezoneOption + '<option value="'+ myData.timezone[i].id +'">' + myData.timezone[i].name + " (" + myData.timezone[i].difference + ")</option>";
      mtTimezoneOptions = mtTimezoneOptions + '<option value="'+ myData.timezone[i].id +'">' + myData.timezone[i].name + " (" + myData.timezone[i].difference + ")</option>";
    }
  }

  document.getElementById("current_timezone").innerHTML = currentTimezoneOption
  document.getElementById("my_timezones_menu").innerHTML = mtTimezoneOptions
  //$(".timezones").html(txt);
    //document.getElementById("current_timezone").innerHTML += '<option value="timezones">hello</option>'
    //document.getElementById("my_timezones_menu").innerHTML += '<option value="timezones">hellohellohello</option>'
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

