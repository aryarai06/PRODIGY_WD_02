let timer;
let isRunning = false;
let startTime;
let laps = [];

function startPause() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById("startPause").textContent = "Start";
        isRunning = false;
    } else {
        startTime = new Date() - (laps.length > 0 ? laps[laps.length - 1].time : 0);
        timer = setInterval(updateDisplay, 1000);
        document.getElementById("startPause").textContent = "Pause";
        isRunning = true;
    }
}

function reset() {
    clearInterval(timer);
    document.getElementById("startPause").textContent = "Start";
    document.getElementById("display").textContent = "00:00:00";
    isRunning = false;
    laps = [];
    document.getElementById("laps").innerHTML = "";
}

function lap() {
    if (isRunning) {
        const lapTime = new Date() - startTime;
        laps.push({ lap: laps.length + 1, time: lapTime });
        updateLaps();
    }
}

function updateDisplay() {
    const elapsedTime = new Date() - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("display").textContent = formattedTime;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = padTime(hours);
    const formattedMinutes = padTime(minutes);
    const formattedSeconds = padTime(seconds);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function padTime(time) {
    return time < 10 ? `0${time}` : time;
}

function updateLaps() {
    const lapsContainer = document.getElementById("laps");
    const lastLap = laps[laps.length - 1];
    const lapTime = formatTime(lastLap.time);
    lapsContainer.innerHTML += `<div>Lap ${lastLap.lap}: ${lapTime}</div>`;
}
