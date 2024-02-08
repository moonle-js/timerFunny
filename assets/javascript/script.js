var boy = document.querySelector('#boy')
var girl = document.querySelector('#girl')
var article = document.querySelector("article")

var start = document.querySelector('#start')
var stop = document.querySelector('#stop')
var reset = document.querySelector('#reset')
var lap = document.querySelector('#lap')

var boySound = new Audio('./assets/sounds/boy.wav')
var girlSound = new Audio('./assets/sounds/girl.mp3')

var currentAngle = "leftUp";

function moveGirl(up, left){
    girl.style.top = `${up}%`
    girl.style.left = `${left}%`
}



function showTimer(){
    if(seconds >= 60){
        minutes++;
        seconds = 0;
        if(minutes >= 60){
            minutes = 0;
            clocks++;
        }
    }

    document.querySelector('#seconds').innerHTML = `${seconds > 9 ? seconds : `0${seconds}`}`;
    document.querySelector('#minutes').innerHTML = `${minutes > 9 ? minutes : `0${minutes}`}`;
    document.querySelector('#clocks').innerHTML = `${clocks > 9 ? clocks : `0${clocks}`}`;
}


// position of girl
var up = 0;
var left = 0;

// secundomer
var seconds = 0;
var minutes = 0;
var clocks = 0;

var interval;


function startEngine(){
    if(!interval){
        interval = setInterval(function(){
            if(currentAngle == "leftUp"){
                up = 14;
                left = 70;
                currentAngle = "rightUp"
                moveGirl(up,left)
            }else if(currentAngle == "rightUp"){
                up = 63;
                left = 70;
                currentAngle = "rightDown"
                moveGirl(up,left)
            }else if(currentAngle == "rightDown"){
                up = 63;
                left = 18
                currentAngle = "leftDown"
                moveGirl(up,left)
            }else if(currentAngle == "leftDown"){
                up = 14;
                left = 18
                currentAngle = "leftUp"
                moveGirl(up,left)
            }
            seconds++;
    
    
            // Adding seconds to the timer
            showTimer();
    
        },1000)
    }
}

start.addEventListener('click', function(){
    startEngine();
})

stop.addEventListener('click',function(){
    clearInterval(interval)
    interval = undefined;
})


reset.addEventListener('click', function(){
    seconds = 0;
    minutes = 0;
    clocks = 0;
    article.innerHTML = " "
    startEngine();

})


function showMessage(){
    var messages = [
        "Bu qeder dolanirameee",
        "Nolar he de",
        "Razilasdiq?",
        "Axi cox isteyireeem",
        "Yorulmam kii^))"
    ]

    var randomNumber = Math.floor(Math.random() * 5);
    console.log(messages[randomNumber])
    document.querySelector('#comment').style.display = "flex"
    document.querySelector('#comment').innerHTML = `${messages[randomNumber]}`
}

var localTimeout;


lap.addEventListener('click', function(){
    article.innerHTML += `
        <span>
            ${document.querySelector('#clocks').innerHTML} : ${document.querySelector('#minutes').innerHTML} : ${document.querySelector('#seconds').innerHTML}  
        </span>
    `

    girlSound.play();
    

    if(localTimeout == undefined){
        showMessage();
        localTimeout = 1;
        setTimeout(function(){
            document.querySelector('#comment').style.display = "none"
            document.querySelector('#comment').innerHTML = "";
            localTimeout = undefined;
            boySound.play();
        },2000)
    }
    
})