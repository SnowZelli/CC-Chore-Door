// global variables
let startButton = document.getElementById('start');
let door1 = document.getElementById('door1');
let door2 = document.getElementById('door2');
let door3 = document.getElementById('door3');
let botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg'
let beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
let closedDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let currentlyPlaying = true;
let score = 0;
let highScore = 0;
let currentStreak = document.getElementById('score-number');
let bestStreak = document.getElementById('high-score-number');
currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;

console.log(score.innerHTML, highScore.innerHTML);

// random chore generator function
const randomChoreDoorGenerator = () => {
    let choreDoor = Math.floor(Math.random() * numClosedDoors);
    //cheat to let me know what door the bot is behind.
    console.log(choreDoor);
    if (choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else if(choreDoor === 1) {
        openDoor1 = spaceDoorPath;
        openDoor2 = botDoorPath;
        openDoor3 = beachDoorPath;
    } else if(choreDoor === 2) {
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
        openDoor3 = botDoorPath;
    }
}

// function calls
randomChoreDoorGenerator();

// gameply functions
const isClicked = (door) => {
    if(door.src === closedDoorPath) {
        return false;
    } else {
        return true;
    }
}

const isBot = (door) => {
    if(door.src === botDoorPath) {
        return true;
    } else {
        return false;
    }
}

const getScore = () => {
    score++;
    currentStreak.innerHTML = score;
    if(score > highScore) {
        highScore = score;
        bestStreak.innerHTML = highScore;
    }
}

const gameOver = (status) => {
    if(status === 'win') {
        startButton.innerHTML = 'You win! Play again?';
        getScore();
    } else if (status === 'lose') {
        startButton.innerHTML = 'Game Over! Play again?';
        score = 0;
        currentStreak.innerHTML = score;
    }
    currentlyPlaying = false;
}

const playDoor = (door) => {
    numClosedDoors--;
    if(numClosedDoors === 0) {
        gameOver('win');
    } else if (isBot(door)) {
        gameOver('lose');
    }
}


// onclick functions for each door
door1.onclick = () => {
    if(currentlyPlaying && !isClicked(door1)) {
        door1.src = openDoor1;
        playDoor(door1);
    }
}

door2.onclick = () => {
    if(currentlyPlaying && !isClicked(door2)) {
        door2.src = openDoor2;
        playDoor(door2);
    }
}

door3.onclick = () => {
    if(currentlyPlaying && !isClicked(door3)) {
        door3.src = openDoor3;
        playDoor(door3);
    }
}

const startRound = () => {
    if (!currentlyPlaying) {
    numClosedDoors = 3;
    door1.src = closedDoorPath;
    door2.src = closedDoorPath;
    door3.src = closedDoorPath;
    startButton.innerHTML = 'Good luck!';
    currentlyPlaying = true;
    score.innerHTML = 0;
    highScore.innerHTML = 0;
    randomChoreDoorGenerator();
    }
}

startButton.onclick = () => {
    startRound();
}