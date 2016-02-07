function getTimezoneList(){
    httpObj = new XMLHttpRequest();
    httpObj.open("get", "./js/seeds/timezone_list.json", true);
    httpObj.onload = function(){

        var timezoneList = JSON.parse(this.responseText);

        var currentTimezoneOption = "";
        var currentTimezone = "";

        if(localStorage.currentTimezone != null) {
            currentTimezone = JSON.parse(localStorage.currentTimezone);

            timezoneList.timezone.forEach(function(tz,index){
                if (currentTimezone.name == tz.name) {
                    currentTimezoneOption = currentTimezoneOption + '<option value="'+index +'" selected="selected">' + tz.name + " (" + tz.difference + ")</option>";
                }
                else {
                    currentTimezoneOption = currentTimezoneOption + '<option value="'+ index +'">' + tz.name + " (" + tz.difference + ")</option>";
                }
            });
        } else {
            timezoneList.timezone.forEach(function(tz,index){
                currentTimezoneOption = currentTimezoneOption + '<option value="'+ index +'">' + tz.name + " (" + tz.difference + ")</option>";
            });
        }

        var myTimezoneOptions = "";
        if(localStorage.myTimezone != null) {
            var myTimezones = JSON.parse(localStorage.myTimezone);
            myTimezones.forEach(function(ltz,ltzindex) {
                timezoneList.timezone.forEach(function(tz,index) {
                    if (ltz.name == tz.name) {
                        myTimezoneOptions = myTimezoneOptions + '<option value="'+ index +'" selected="selected">' + tz.name + " (" + tz.difference + ")</option>";
                    }
                    else {
                        myTimezoneOptions = myTimezoneOptions + '<option value="'+ index +'">' + tz.name + " (" + tz.difference + ")</option>";
                    }
                });
                $('#timezone_forms').append('<br>');
                $('#timezone_forms').append('<select class="timezones" id="tzbtn'+ltzindex+'">' + myTimezoneOptions + '</select>');
                $('#timezone_forms').append('<button onclick = "deleteTimezone(event,'+ltzindex+');" form = "timezone_forms" id=dbtn'+ltzindex+'>☒</button>');
                myTimezoneOptions = "";
            });
        } else {
            timezoneList.timezone.forEach(function(tz,index) {
                myTimezoneOptions = myTimezoneOptions + '<option value="'+ index +'">' + tz.name + " (" + tz.difference + ")</option>";
            });
        }

        document.getElementById("current_timezone").innerHTML = currentTimezoneOption
    }
    httpObj.send(null);
}

function deleteTimezone(event,index){
    $("#tzbtn"+index).prev().remove();
    $("#tzbtn"+index).remove();
    $("#dbtn"+index).remove();
    console.log(index);
    event.preventDefault();
}

function addTimezone(){
    httpObj = new XMLHttpRequest();
    httpObj.open("get", "./js/seeds/timezone_list.json", true);
    httpObj.onload = function(){

        var myData = JSON.parse(this.responseText);

        var txt = "";
        myData.timezone.forEach(function(tz,index) {
            txt = txt + '<option value="'+ index +'">' + tz.name + " (" + tz.difference + ")</option>";
        });

        $("#timezone_forms").append('<br>');
        $("#timezone_forms").append('<select class="timezones">' + txt +'</select>');
    }
    httpObj.send(null);
}

function submitTimezone(){
    httpObj = new XMLHttpRequest();
    httpObj.open("get", "./js/seeds/timezone_list.json", true);
    var timezoneList;
    httpObj.onload = function(){
        timezoneList = JSON.parse(this.responseText);

        var timezones = new Array();
        $('.timezones').each(function(index,e) {
            timezones.push(timezoneList.timezone[e.value]);
        });

        localStorage.setItem("currentTimezone",JSON.stringify(timezones[0]));
        timezones.shift();
        localStorage.setItem("myTimezone",JSON.stringify(timezones));
        document.getElementById("my_timezones").innerHTML = '';
        getMyTimezone();
    }
    httpObj.send(null);
}

