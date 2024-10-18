let isRunningStopwatch = false;
let intervalStopwatch;

let currentTime = {
    ms: 0,
    sec: 0,
    min: 0,
    hour: 0
};

let lastLapTime = {
    ms: 0,
    sec: 0,
    min: 0,
    hour: 0
};

let lapCount = 0;

function updateStopwatch() {
    currentTime.ms += 1;

    if (currentTime.ms > 99) {
        currentTime.ms = 0;
        currentTime.sec += 1;

        if (currentTime.sec > 59) {
            currentTime.sec = 0;
            currentTime.min += 1;

            if (currentTime.min > 59) {
                currentTime.min = 0;
                currentTime.hour += 1;
            }
        }
    }

    document.getElementById("stopwatch-display").innerHTML = `${currentTime.hour.toString().padStart(2, '0')}:${currentTime.min.toString().padStart(2, '0')}:${currentTime.sec.toString().padStart(2, '0')}.${currentTime.ms.toString().padStart(2, '0')}`;
}

function resetStopwatch(){
    currentTime = {
        ms: 0,
        sec: 0,
        min: 0,
        hour: 0
    };

    lastLapTime = {
        ms: 0,
        sec: 0,
        min: 0,
        hour: 0
    };

    lapCount = 0;
    isRunningStopwatch = false;
}

function addLap() {
    let lapTime = {
        hour: currentTime.hour - lastLapTime.hour,
        min: currentTime.min - lastLapTime.min,
        sec: currentTime.sec - lastLapTime.sec,
        ms: currentTime.ms - lastLapTime.ms
    };

    if (lapTime.ms < 0) {
        lapTime.ms += 100;
        lapTime.sec--;
    }

    if (lapTime.sec < 0) {
        lapTime.sec += 60;
        lapTime.min--;
    }

    if (lapTime.min < 0) {
        lapTime.min += 60;
        lapTime.hour--;
    }

    lastLapTime = { ...currentTime };

    const formattedLapTime = `${lapTime.hour.toString().padStart(2, '0')}:${lapTime.min.toString().padStart(2, '0')}:${lapTime.sec.toString().padStart(2, '0')}.${lapTime.ms.toString().padStart(2, '0')}`;
    const overallTime = `${currentTime.hour.toString().padStart(2, '0')}:${currentTime.min.toString().padStart(2, '0')}:${currentTime.sec.toString().padStart(2, '0')}.${currentTime.ms.toString().padStart(2, '0')}`;

    updateLapList(formattedLapTime, overallTime);
}

function updateLapList(formattedLapTime, overallTime) {
    const lapList = document.getElementById("lap-list");

    if (lapCount == 0) {
        lapList.innerHTML = "";
    }

    lapCount++;

    let listItem = document.createElement("div");
    listItem.classList.add("lap-list-item");

    let lapCountSpan = document.createElement("span");
    lapCountSpan.innerHTML = `${lapCount}`;
    listItem.appendChild(lapCountSpan);

    let lapTimeSpan = document.createElement("span");
    lapTimeSpan.innerHTML = formattedLapTime;
    listItem.appendChild(lapTimeSpan);

    let overallTimeSpan = document.createElement("span");
    overallTimeSpan.innerHTML = overallTime;
    listItem.appendChild(overallTimeSpan);

    lapList.appendChild(listItem);
}

function clearLapList() {
    const lapList = document.getElementById("lap-list");
    lapList.innerHTML = "";

    let span = document.createElement("span");
    span.innerHTML = "Laps will appear here";
    
    lapList.appendChild(span);
}

document.getElementById("start-stop-stopwatch").addEventListener("click", function (e) {
    const lapBtn = document.getElementById("lap-stopwatch");

    if (!isRunningStopwatch) {
        e.target.innerHTML = "Stop";
        isRunningStopwatch = true;

        lapBtn.classList.remove("disabled");
        lapBtn.disabled = false;

        intervalStopwatch = setInterval(function () {
            updateStopwatch();
        }, 10);

    } else {
        e.target.innerHTML = "Start";
        isRunningStopwatch = false;
        clearInterval(intervalStopwatch);

        lapBtn.classList.add("disabled");
        lapBtn.disabled = true;
    }
});

document.getElementById("reset-stopwatch").addEventListener("click", function () {
    const lapBtn = document.getElementById("lap-stopwatch");

    document.getElementById("stopwatch-display").innerHTML = "00:00:00.00";
    document.getElementById("start-stop-stopwatch").innerHTML = "Start";

    lapBtn.classList.add("disabled");
    lapBtn.disabled = true;

    clearInterval(intervalStopwatch);
    resetStopwatch();
    clearLapList();
});

document.getElementById("lap-stopwatch").addEventListener("click", function () {
    addLap();
});
