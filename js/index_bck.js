/**
 * Created by bichtran on 5/3/17.
 */
/**
 * Created by bichtran on 5/1/17.
 */
var soundBlu;
var soundYel;
var soundGre;
var soundRed;
var colorSequence = [];
var numberRight = 0;
var numberProgress = 0;
var maxPlay = 5;   //You win after 5 correct answers
var checkInput;
var mode = "";  // identify the input mode User or not
var strict = false;
var maxPlay = 5;
function setInfo(text) {
    // document.getElementById("info").innerHTML = text;
    $("#info").html(text);
}

$(document).ready(function() {

    console.log("ready");
    setInfo("Press start to begin");
    loadSounds();
    setControlsActive();

});

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

    setInfo("Watch the flashing buttons.");
    mode="notUserInput";
    console.log("====Entree Correcte: " + numberRight+"============");
    setPadsInactive();
    setControlsInactive();
    numberProgress = 0;
    //console.log("Progress: "+ numberProgress)
    // play current numberRight + 1, the player needs to copy

    var i=0;
    // Fire the function simonMain until clearInterval is called
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
//Random colorSequence generated:
function generateSequence() {
    colorSequence = [];
    for (i = 0; i < maxPlay; i++) {
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

function resetButton() {
    console.log("reset clicked");
    //document.getElementById("start").onclick = function() {
    //    startButton();
    $("#start").click(function () {
        startButton();
    });

    //document.getElementById("start").innerHTML = "Start";
    $("#start").html("Start");

   // colorSequence = [];
    numberRight = 0;
    numberProgress = 0;
    document.getElementById("count").innerHTML = "--";
    setPadsInactive();
    setInfo("Press Start to begin.")
}

// function startButton() {
//     console.log("start clicked");
//
//     // document.getElementById("start").onclick = function() { resetButton(); };
//     // document.getElementById("start").innerHTML = "Reset";
//     $("#start").click(function () {
//         resetButton();
//     }).html("Reset");
//    // $("#start").html("Reset");
//     setControlsInactive();
//     document.getElementById("count").innerHTML = 0; // (Just Change)
//     //$("#count").html(0);
//     generateSequence();
//
//     // loop,
//     playSequence();
//
// }
function startButton() {
    //console.log("start clicked");

    document.getElementById("start").onclick = function() {
        resetButton();
    };
    document.getElementById("start").innerHTML = "Reset";

    setControlsInactive();
    document.getElementById("count").innerHTML = 0;

    generateSequence();

    // loop,
    playSequence();


}

function strictButton() {
    console.log("strict clicked");
    if(!strict) {
        strict=true;
        $("#strict").html("Play Mode").css("background-color", "yellow");

    } else {
        strict=false;
        $("#strict").html("Demo Mode").css("background-color", "blue");
    }

}

function simonMain(color) {
   // console.log(mode);
//    console.log("Color to compare: "+color);


    //Checking user input against the color in color sequence array
    if(mode==="userInput") {

        //console.log("checking User input");
        if(color === colorSequence[numberProgress]) {

            console.log("correct, got: " + numberProgress + " of " + numberRight);
            // setInfo("Correct! " + numberProgrss + " out of " + numberRight);
            numberProgress++;

            if(numberProgress===maxPlay)
            {
                setInfo("You win!");
                setPadsInactive();
                return;
            }

            if(numberProgress === (numberRight+1)) {
                numberRight++;
                document.getElementById("count").innerHTML = numberRight;
                //console.log("Got sequence correct");
                setPadsInactive();

                setTimeout(function() {
                    //soundBlu.play();
                    setInfo("Correct -  Added one more tile on the end");
                }, 1000);

                setTimeout(function() {
                    playSequence();
                }, 4000);

            }

        } else {
            //console.log("INCORRECT");
            setPadsInactive();

            setTimeout(function() {
                soundBlu.play();

                if(strict) {
                    //console.log("start again");
                    setInfo("WRONG. I'm being strict: start again from 0");
                    numberProgess = 0;
                    numberRight = 0;

                    setTimeout(function() { playSequence(); },1000);

                } else {
                    //console.log("have another go");
                    numberProgress = 0;
                    setInfo("WRONG. Have another go at this sequence");

                    setTimeout(function() { playSequence(); },1000);
                }
            }, 250);

        }

    }


    var origColor = document.getElementById(color).style.backgroundColor;

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

    setTimeout(function() {
        document.getElementById(color).style.backgroundColor = origColor;
    }, 500);
}

function setControlsActive() {

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

    document.getElementById("strict").onclick = function() {
        strictButton();
    };
    document.getElementById("strict").style.cursor = "pointer";
}

function setControlsInactive() {

    document.getElementById("start").onclick = "";
    document.getElementById("start").style.cursor = "not-allowed";
    document.getElementById("strict").onclick = "";
    document.getElementById("strict").style.cursor = "not-allowed";
}

function setPadsActive() {
    document.getElementById("blu").onclick = function() {
        simonMain("blu");
        console.log("User click blu");
    };
    document.getElementById("gre").onclick = function() {
        simonMain("gre");
        console.log("User click gre");
    };
    document.getElementById("yel").onclick = function() {
        simonMain("yel");
        console.log("User clck yel");
    };
    document.getElementById("red").onclick = function() {
        simonMain("red");
        console.log("User click red");
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
