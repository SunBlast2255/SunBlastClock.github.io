let isRunningTimer = false;
let intervalTimer;
const remainingTime = { hour: 0, minute: 0, second: 0, ms: 0 };
const audio = new Audio("../sounds/timer-sound.ogg");

document.getElementById("start-timer").addEventListener("click", function () {
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
    let timeInput = document.getElementById("timer-set-input");

    if(!regex.test(timeInput.value)){
        timeInput.style.border = "1px solid red";
        return;
    }

    document.getElementById("timer-set-panel").classList.add("hidden");
    document.getElementById("timer-display-panel").classList.remove("hidden");
    timeInput.style.border = "1px solid black";

    isRunningTimer = true;
    startTimer();
});

document.getElementById("reset-timer").addEventListener("click", function () {
    resetTimer();
});

document.getElementById("start-stop-timer").addEventListener("click", function (e) {
    if (isRunningTimer) {
        e.target.innerHTML = "Start";
        isRunningTimer = false;
        clearInterval(intervalTimer); 
    } else {
        e.target.innerHTML = "Stop";
        isRunningTimer = true;
        startInterval(); 
    }
});

document.getElementById("close").addEventListener("click", function () {
    hideTimeIsUpPanel();
});

function startTimer() {
    let time = document.getElementById("timer-set-input").value.split(":");
    remainingTime.hour = parseInt(time[0]);
    remainingTime.minute = parseInt(time[1]);
    remainingTime.second = parseInt(time[2]);
    remainingTime.ms = 0;

    updateTimerDisplay();

    startInterval();
}

function startInterval() {
    intervalTimer = setInterval(function () {
            updateRemainingTime();
            updateTimerDisplay();
    }, 100); 
}

function updateRemainingTime() {
    remainingTime.ms -= 100; 

    if (remainingTime.ms < 0) {
        remainingTime.second--;
        remainingTime.ms = 900; 

        if (remainingTime.second < 0) {
            remainingTime.minute--;
            remainingTime.second = 59;

            if (remainingTime.minute < 0) {
                remainingTime.hour--;
                remainingTime.minute = 59;

                if (remainingTime.hour < 0) {
                    resetTimer();
                    showTimeIsUpPanel();
                }
            }
        }
    }
}

function updateTimerDisplay() {
    document.getElementById("timer-display").innerHTML = `${remainingTime.hour.toString().padStart(2, '0')}:${remainingTime.minute.toString().padStart(2, '0')}:${remainingTime.second.toString().padStart(2, '0')}`;
}

function resetTimer() {
    document.getElementById("timer-set-panel").classList.remove("hidden");
    document.getElementById("timer-display-panel").classList.add("hidden");
    document.getElementById("time-is-up-panel").classList.add("hidden");
    document.getElementById("start-stop-timer").innerHTML = "Stop";

    remainingTime.hour = 0;
    remainingTime.minute = 0;
    remainingTime.second = 0;
    remainingTime.ms = 0;
    isRunningTimer = false;

    clearInterval(intervalTimer);
}

function showTimeIsUpPanel() {
    document.getElementById("timer-display-panel").classList.add("hidden");
    document.getElementById("timer-set-panel").classList.add("hidden");
    document.getElementById("time-is-up-panel").classList.remove("hidden");

    audio.loop = true;
    audio.play();
}

function hideTimeIsUpPanel() {
    document.getElementById("timer-set-panel").classList.remove("hidden");
    document.getElementById("time-is-up-panel").classList.add("hidden");
    document.getElementById("timer-display-panel").classList.add("hidden");

    audio.pause();
    audio.currentTime = 0;
}
