var currentTimezone;
var myTimezone;

function getMyTimezone(){
  httpObj = new XMLHttpRequest();
  httpObj.open("get", "./js/seeds/timezone_list.json", true);
  httpObj.onload = function(){

    var myData = JSON.parse(this.responseText);

    //var myTimezone = JSON.parse(localStorage.my_timezone);
    //console.log('show my_timezone' + myTimezone.name);
    //console.log('set my_timezone:' + myData.timezone[2].name);
    //localStorage.setItem("myTimezone", JSON.stringify(myData.timezone));
    //localStorage.setItem("currentTimezone", JSON.stringify(myData.timezone[2]));

    var txt = "";
    for (var i=0; i<myData.timezone.length; i++){
      txt = txt + myData.timezone[i].name + " is " + myData.timezone[i].difference+" difference<br>";
    }
    document.getElementById("result").innerHTML = txt;
  }
  httpObj.send(null);
}





