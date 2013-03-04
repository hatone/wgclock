function getMyTimezone(){
  document.write("this is debug.");
  httpObj = new XMLHttpRequest();
  httpObj.open("get", "./seeds/timezone_list.json", true);
  httpObj.onload = function(){
    var myData = JSON.parse(this.responseText);
    var txt = "";
    for (var i=0; i<myData.item.length; i++){
      txt = txt + myData.item[i].name + " is " + myData.item[i].difference+" difference<br>";
    }
    document.getElementById("result").innerHTML = txt;
  }
  httpObj.send(null);
}



