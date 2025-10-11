const display = document.getElementById("display");
const container2 = document.getElementById("laps");
let timer = null;
let startTime=0;
let elapsedTime=0;
let isRunning=false;

let hours = "00",
    minutes = "00",
    seconds = "00",
    milliseconds = "00";

function start(){
    if(!isRunning){
        startTime = Date.now()-elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;

    }
}

function stop(){
    if(isRunning){
        clearInterval(timer);
        elapsedTime = Date.now()- startTime;
        isRunning=false;
    }
}

function reset(){
    clearInterval(timer);
    startTime=0;
    elapsedTime=0;
    isRunning=false;
    display.textContent = "00:00:00:00"
    container2.innerHTML= "";
}

function lap() {
    if (isRunning || elapsedTime > 0) {
        const lapTime = `${hours}:${minutes}:${seconds}:${milliseconds}`;
        const li = document.createElement("li");
        li.textContent = lapTime;
        container2.appendChild(li);
    }
}

function update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    
    hours = Math.floor(elapsedTime/(1000*60*60));
    minutes = Math.floor(elapsedTime/(1000*60)%60);
    seconds = Math.floor(elapsedTime/1000%60);
    milliseconds = Math.floor(elapsedTime%1000/10);

    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");
    milliseconds = milliseconds.toString().padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}