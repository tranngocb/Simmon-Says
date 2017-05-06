var soundBlu;
var soundYel;
var soundGre;
var soundRed;
var colorSequence = [];
var numberRight = 0;
var numberProgress = 0;
var checkInput;
var mode = "";
var strict = false;

function setInfo(text) {
  //document.getElementById("info").innerHTML = text;
  $("#info").html(text);
  console.log(text);
}

$(document).ready(function() {

  //console.log("ready");
  setInfo("Press start to begin");
   // $("#reset").addClass('hidden');
  loadSounds();
  setControlsActive();



function loadSounds() {
  soundBlu = document.createElement('audio');
  soundBlu.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  soundRed = document.createElement('audio');
  soundRed.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  soundGre = document.createElement('audio');
  soundGre.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
  soundYel = document.createElement('audio');
  soundYel.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
}

function playSequence() {
    alert("inplaySequence");
  setInfo("Watch the flashing buttons.");
  mode="notUserInput";
  //console.log("play sequence length: " + numberRight);
  setPadsInactive();
  setControlsInactive();
  numberProgress = 0;
  // play current numberRight + 1, the player needs to copy
  var i=0;
  var timer = setInterval( function() { 
  
    simonMain(colorSequence[i]);
    i++;
    //console.log(i + " of "+(numberRight+1));
    
    if(i===numberRight+1) {
      clearInterval(timer);
      setPadsActive();
      setControlsActive();
      //console.log("check input");
      setInfo("Repeat the pattern.");
      mode = "userInput";
    }
    
  }, 1000);

}

function generateSequence() {
  for (i = 0; i < 20; i++) {
    var no = Math.floor(Math.random() * 4);
    switch (no) {
      case 0:
        colorSequence.push("blu");
        break;
      case 1:
        colorSequence.push("red");
        break;
      case 2:
        colorSequence.push("gre");
        break;
      case 3:
        colorSequence.push("yel");
        break;
    }

  }
  console.log(colorSequence);
}
  $("#reset").click(function (){

      colorSequence = [];
      numberRight = 0;
      numberProgress = 0;
      $("#count").html("Recount");
      setPadsInactive();
      setInfo("Press Start to begin.")

  });
    // $("#start").click(function (){
    //     setControlsInactive();
    //     // $("#reset").addClass('hidden');
    //     $("#count").html(0);
    //     generateSequence();
    //     // loop,
    //     playSequence()
    // });

    //$(".menu_link").click(GetContentAndSlide);
    $("#start").click(startButton);

// function resetButton() {
//
//   document.getElementById("start").onclick = function() {
//     startButton();
//   };
//
//   $("#start").html("Start");
//     setControlsInactive();
//     // document.getElementById("count").innerHTML = 0;
//     $("#count").html(0);
//     generateSequence();
//
//     // loop,
//     playSequence();
// }



function startButton() {
    console.log("start clicked");
    setControlsInactive();
	$("#count").html(0);
    generateSequence();
    playSequence();
}

function strictButton() {
  //console.log("strict clicked");
  if(!strict) {
    strict=true;
    //document.getElementById("strict").innerHTML = "Strict is on";
	$("#strict").html("Game Mode");
  } else {
    strict=false;
    // document.getElementById("strict").innerHTML = "Strict is off";
	$("#strict").html("Demo Mode");
  }
    
}

function simonMain(color) {
    console.log(color + " pressed");
    console.log("Mode: " + mode);

    // if checking against
    if (mode === "userInput") {

        //console.log("checking User input");
        if (color === colorSequence[numberProgress]) {

            //console.log("correct, got: " + numberProgress + " of " + numberRight);
            // setInfo("Correct! " + numberProgrss + " out of " + numberRight);
            numberProgress++;

            if (numberProgress === 20) {
                setInfo("You win!");
                setPadsInactive();
                return;
            }

            if (numberProgress === (numberRight + 1)) {
                numberRight++;
                //document.getElementById("count").innerHTML = numberRight;
                $("#count").html(numberRight);
                //console.log("Got sequence correct");
                setPadsInactive();

                setTimeout(function () {
                    //soundBlu.play();
                    setInfo("Correct - wait for the sequence " + "<br>" + "to repeat but with one more on the end");
                }, 1000);

                setTimeout(function () {
                    playSequence();
                }, 4000);

            }

        } else {
            //console.log("INCORRECT");
            setPadsInactive();

            setTimeout(function () {
                soundBlu.play();

                if (strict) {
                    //console.log("start again");
                    setInfo("Play Mode. Restart from 0");
                    numberProgess = 0;
                    numberRight = 0;
                    $("#count").html(numberRight);

                    setTimeout(function () {
                        playSequence();
                    }, 1000);

                } else {
                    //console.log("have another go");
                    numberProgress = 0;
                    setInfo("Demo Mode: one more chance!");

                    setTimeout(function () {
                        playSequence();
                    }, 1000);
                }
            }, 250);

        }

    }


    var origColor = document.getElementById(color).style.backgroundColor;
    console.log("Couleur: " + color);
    // console.log("Couleur origine: "+ origColor);

    switch (color) {
        case 'blu':
            soundYel.play();
            document.getElementById(color).style.backgroundColor = "lightblue";
            break;
        case 'red':
            soundYel.play();
            document.getElementById(color).style.backgroundColor = "lightcoral";
            break;
        case 'yel':
            soundYel.play();
            document.getElementById(color).style.backgroundColor = "lightyellow";
            break;
        case 'gre':
            soundYel.play();
            document.getElementById(color).style.backgroundColor = "lightgreen";
            break;
    }
    setTimeout(function () {
        document.getElementById(color).style.backgroundColor = origColor;
    }, 500);
}
    function setControlsActive() {
        var isStart = $("#start").html();
        console.log(isStart);
        if (isStart === "Start") {
            setControlsInactive();

        } else {
            setPadsInactive();
            setInfo("Press Start to begin.")

        }
// to activate startButton function

        if(document.getElementById("start").innerHTML === "Start") {
          document.getElementById("start").onclick = function() {
            startButton();
          };
        } else {
          document.getElementById("start").onclick = function() {
            resetButton();
          };
        }

        document.getElementById("start").style.cursor = "pointer";

        document.getElementById("strict").onclick = function () {
            strictButton();
        };
        document.getElementById("strict").style.cursor = "pointer";
    }

    function setControlsInactive() {

        document.getElementById("start").onclick = "";
        document.getElementById("start").style.cursor = "not-allowed";
        // $("#start").click(false);
        // $("#start").css({cursor:"default"});
        document.getElementById("strict").onclick = "";
        document.getElementById("strict").style.cursor = "not-allowed";

    }

    function setPadsActive() {
        document.getElementById("blu").onclick = function () {
            simonMain("blu");
        };
        document.getElementById("gre").onclick = function () {
            simonMain("gre");
        };
        document.getElementById("yel").onclick = function () {
            simonMain("yel");
        };
        document.getElementById("red").onclick = function () {
            simonMain("red");
        };
        document.getElementById("blu").style.cursor = "pointer";
        document.getElementById("gre").style.cursor = "pointer";
        document.getElementById("yel").style.cursor = "pointer";
        document.getElementById("red").style.cursor = "pointer";
    }

    function setPadsInactive() {
        document.getElementById("blu").onclick = "";
        document.getElementById("gre").onclick = "";
        document.getElementById("yel").onclick = "";
        document.getElementById("red").onclick = "";

        document.getElementById("blu").style.cursor = "not-allowed";
        document.getElementById("gre").style.cursor = "not-allowed";
        document.getElementById("yel").style.cursor = "not-allowed";
        document.getElementById("red").style.cursor = "not-allowed";
    }

});
//	function setForUserPress() {}

//	function setForPlayBack() {}