$(function() {
    setInterval ( 'clocknow()',1000 );
    getMyTimezone();
    getTimezoneList();
    $('#add_timezone').click(function(){
        addTimezone();
    });
    $("form#setting_form").submit(function() {
        submitTimezone();
    });
    setTimeout(function(){
        if(localStorage.tutorial == null) {
            $('body').chardinJs('start')
            localStorage.setItem("tutorial",'1');
        }
    }, 1500);

});

function getMyTimezone(){
    httpObj = new XMLHttpRequest();
    httpObj.open("get", "./js/seeds/timezone_list.json", true);
    httpObj.onload = function(){

        if(localStorage.currentTimezone == null) {
            localStorage.setItem("currentTimezone",'{"name":"GMT","difference":0}');
        }
        if(localStorage.myTimezone == null) {
            localStorage.setItem("myTimezone",'[{"name":"PST","difference":-8},{"name":"EST","difference":-5},{"name":"JST","difference":9}]');
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
                $('#timezone_forms').append(' <button onclick = "deleteTimezone(event,'+ltzindex+');" form = "timezone_forms" id=dbtn'+ltzindex+'><span class="fui-cross-16"></span></button>');
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

        var lastobj = $("#timezone_forms").find("select").filter(":last").get(0);
        var index;
        if(lastobj == null) {
            index = 0;
        } else {
            index = parseInt(lastobj.id.replace("tzbtn",""))+1;
        }

        $('#timezone_forms').append('<br>');
        $('#timezone_forms').append('<select class="timezones" id="tzbtn'+index+'">' + txt + '</select>');
        $('#timezone_forms').append(' <button onclick = "deleteTimezone(event,'+index+');" form = "timezone_forms" id=dbtn'+index+'><span class="fui-cross-16"></span></button>');
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



