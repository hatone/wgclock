function getTimezoneList(){
  httpObj = new XMLHttpRequest();
  httpObj.open("get", "./js/seeds/timezone_list.json", true);

  httpObj.onload = function(){

    var myData = JSON.parse(this.responseText);

    var currentTimezoneOption = "";


    var currentTimezone = "";
    if(localStorage.currentTimezone != null) {
      currentTimezone = JSON.parse(localStorage.currentTimezone);

      for (var i=0; i<myData.timezone.length; i++){
        if (parseInt(currentTimezone.id) == i) {
          currentTimezoneOption = currentTimezoneOption + '<option value="'+ myData.timezone[i].id +'" selected="selected">' + myData.timezone[i].name + " (" + myData.timezone[i].difference + ")</option>";
        } 
        else {
          currentTimezoneOption = currentTimezoneOption + '<option value="'+ myData.timezone[i].id +'">' + myData.timezone[i].name + " (" + myData.timezone[i].difference + ")</option>";
        }
      }
    } else {
      for (var i=0; i<myData.timezone.length; i++){
        currentTimezoneOption = currentTimezoneOption + '<option value="'+ myData.timezone[i].id +'">' + myData.timezone[i].name + " (" + myData.timezone[i].difference + ")</option>";
      }
    }



    var mtTimezoneOptions = "";
    if(localStorage.myTimezone != null) {
      myTimezones = JSON.parse(localStorage.myTimezone);
      for (var mt=0; mt<myTimezones.length; mt++){
        for (var i=0; i<myData.timezone.length; i++){
          if (parseInt(myTimezones[mt].id) == i) {
            mtTimezoneOptions = mtTimezoneOptions + '<option value="'+ myData.timezone[i].id +'" selected="selected">' + myData.timezone[i].name + " (" + myData.timezone[i].difference + ")</option>";
          } 
          else {
            mtTimezoneOptions = mtTimezoneOptions + '<option value="'+ myData.timezone[i].id +'">' + myData.timezone[i].name + " (" + myData.timezone[i].difference + ")</option>";
          }
        }
        $("#timezone_forms").append('<br>');
        $("#timezone_forms").append('<select class="timezones" id="my_timezones_menu2">'+mtTimezoneOptions+'</select>');
        mtTimezoneOptions = "";
      }

    } else {
      for (var i=0; i<myData.timezone.length; i++){
        mtTimezoneOptions = mtTimezoneOptions + '<option value="'+ myData.timezone[i].id +'">' + myData.timezone[i].name + " (" + myData.timezone[i].difference + ")</option>";
      }
    }

    document.getElementById("current_timezone").innerHTML = currentTimezoneOption
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

