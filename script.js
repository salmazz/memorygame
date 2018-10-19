function loadImages(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "data.json", true);
    xhr.overrideMimeType('data.json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            callback(xhr.responseText);
        }
    };
    xhr.send(null);
}

function init(x) {
    var att = x;
    loadImages(function (response) {
        var obj = JSON.parse(response);
        obj.sort(function (a, b) {
            return 0.5 - Math.random()
        });
        for (i = 0; i < obj.length; i++) {

            document.getElementById("row").innerHTML += "<div class='col-md-3 col-sm-3 col-3 item' id='" + obj[i].id + "'  onclick='checked(this)' att='" + att + "'><img src='" + obj[i].img + "' class='img-fluid border border-secondary'><div id ='" + att + obj[i].id + "' class='overlay rounded' ><div class='text'></div></div></div>";

        }
    });

}

function  shuffleCards(){
    setTimeout(function(){

        var card = Array.prototype.slice.call(document.getElementsByClassName("item"));
       document.getElementById("row").innerHTML ="";
       card.sort(function() { return 0.5 - Math.random() });
        for (i = 0; i < card.length; i++) { 
         // Do stuff here
          document.getElementById("row").innerHTML += card[i].outerHTML;
         }
         }, 100);
}

shuffleCards();
init('a');
init('b');
var answer_one = null;
var answer_two = null;
var count = 0,
    reminingClicks = 12,
    scoreCount = 0,
    maxScore = 6;
var move = document.getElementById('move');
var score = document.getElementById('score');
var modalMes = document.getElementById('model-message');

function checked(x) {

    if (reminingClicks == count) {

       alert('Game Over Your Clicks =' + reminingClicks );



    }

    var imageId = x.id;
    var blockId = x.getAttribute("att");
    var div = document.getElementById(blockId + imageId);
    div.classList.replace("overlay", "overlay_no");
    if (answer_one == null) {
        answer_one = x.id;
    } else {
        answer_two = x.id;
    }
    var answer_one_div = document.getElementById("a" + imageId);
    var answer_two_div = document.getElementById("b" + imageId);

    if (answer_one != null && answer_two != null) {
        if (answer_one == answer_two) {
            answer_one_div.classList.remove("overlay_no");
            answer_two_div.classList.remove("overlay_no");
            document.getElementById(imageId).setAttribute("onclick", "");
            answer_one = null;
            answer_two = null;
            count += 1;
            scoreCount += 1;
            move.innerHTML = count;
            score.innerHTML = "Score: " + scoreCount;

            if (maxScore == scoreCount) {

                alert("Congratulation  Passed Go To Level 2" + maxScore);
                stopTimer();
            }


        } else if (answer_one != answer_two) {
            setTimeout(function () {
                answer_one_div.classList.replace("overlay_no", "overlay");
                answer_two_div.classList.replace("overlay_no", "overlay");
                count += 1;
                move.innerHTML = "Moves : " + count;
                //document.getElementById("game").innerHTML.toString().replace("overlay_no", "overlay");
                remove_over();
                answer_one = null;
                answer_two = null;

            }, 100);
        }
    }
}

function remove_over() {
    var over = document.getElementsByClassName("rounded");
    for (i = 0; i < over.length; i++) {
        // Do stuff here
        over[i].classList.replace("overlay_no", "overlay");
    }
}

var second = 0,
    minute = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    time = setInterval(function () {
        timer.innerHTML = "Timer =  Min:  " + "  " + minute + " " + "Sec : " + " " + second;
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}
startTimer();


function stopTimer() {
    clearInterval(time);
}