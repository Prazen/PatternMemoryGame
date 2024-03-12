var buttonColors = ["red","blue","green","yellow"]; //list of color in array.
var gamePattern = []; //to record the pattern in empty array.
var userClickedPattern = []; //to record the pattern of clicking event from user in empty array.


var started = false ; //initially game is started or not. It's false;
var level = 0;        // level at 0
var score=0;          //score level at 0


//keypress event if any keypress is active then game will started for only once.
$(document).keypress(function(){
    if(!started){
        //$("#level-title").text("Level "+level); testing : to check the text content change into "level 0" after keypress event.
        nextSequence();
        started = true;
    }
});




//clicked event that includes playsound, animatePress and checkAnswer functions.
$(".btn").click(function(){ 
    var userChosenColor = $(this).attr("id"); //using 'THIS' keyword for refering the current object's value with attribute name "id".
    userClickedPattern.push(userChosenColor); //Pushing all the object from the userChosenColor into userClickedPattern.
    
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

//checking a answer 
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success"); 
        
        if( userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                score++;  //score add
                nextSequence(); //call to nextsequence
                
            },1000); //time set to 1s
        }
    }
    else{
        playSound("wrong"); // plays a wrong sound 

        $("body").addClass("game-over");  //add class list from style name .game-over (Red sign)
        setTimeout(function(){
            $("body").removeClass("game-over"); // remove a red sign within 200 milli-seconds.
        },200);
        
                 
        setTimeout(function(){
            $("#level-title").text("Game Over, Press Any Key to Restart"); //set a time for displaying a msg for 2sec.
        },2000);

        scoreBoard(); //Show the score of currently that made.
        startOver(); //Start over again by clicking an keypress event.
    }
}


function nextSequence (){
    userClickedPattern = []; //To make a list empty again for matching the GamePattern === UserClicked Pattern from the beginning.

    level++; //leveling up
    
     $("#level-title").text("level : "+level); //display the message of level.
    var randomNum = Math.floor(Math.random()*4);  //random num between 0 to 3.
    var randomChosenColor = buttonColors[randomNum];  //random color through buttonColors Array.
    gamePattern.push(randomChosenColor);  //Push all the element that are randomly chosen color into gamePattern array.
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);  //animation function fadeIn/Out(duration);
    
    playSound(randomChosenColor);
    // animatePress(randomChosenColor);
}


    
//function to playSound 
function playSound(name){
    var music = new Audio('sounds/'+name+".mp3"); 
    music.play();
}

//function to animate the press
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
        
}

//Starting again to play
function startOver(){
    level = 0;
    score = 0;
    started = false;
    gamePattern = [];
}

//To show a score
function scoreBoard(){
    $("#level-title").text("Score : "+score);
}