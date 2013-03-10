function getMyTimezone(){
  httpObj = new XMLHttpRequest();
  httpObj.open("get", "./js/seeds/timezone_list.json", true);
  httpObj.onload = function(){
    var myData = JSON.parse(this.responseText);
    var txt = "";
    for (var i=0; i<myData.timezone.length; i++){
      txt = txt + myData.timezone[i].name + " is " + myData.timezone[i].difference+" difference<br>";
    }
    document.write(txt);
  }
  httpObj.send(null);
}



