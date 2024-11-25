let boxes = document.querySelectorAll(".box");
let resetGameBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let soundX = document.getElementById("sound-x");
let soundO = document.getElementById("sound-o");
let soundDraw = document.getElementById("sound-draw");
let soundRestart = document.getElementById("sound-restart");
let soundWinner = document.getElementById("sound-winner");

let turnO = true;             //playerX, playerO
let count = 0;               //To Track Draw

const winPatterns = [         //1D array
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    soundRestart.currentTime = 0; // Reset sound to start
    soundRestart.play();          // Play the restart sound
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            //playerO
            box.innerText = "O";
            playSound("O");
            turnO = false;
        } else {
            //playerX
            box.innerText = "X";
            playSound("X");
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const playSound = (player) => {
    if (player === "X") {
        soundX.currentTime = 0; // Reset the audio playback
        soundX.play();
    } else if (player === "O") {
        soundO.currentTime = 0; // Reset the audio playback
        soundO.play();
    }
};

const gameDraw = () => {
    msg.innerText = `Draw match ...`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    soundDraw.currentTime = 0; // Reset sound to start
    soundDraw.play();         // Play the draw match sound

};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `The Winner is player ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    // Play the winner sound
    soundWinner.currentTime = 0; // Reset sound to start
    soundWinner.play();
    // Set a duration for the sound (e.g., 3 seconds)
    setTimeout(() => {
        soundWinner.pause(); // Pause the sound
        soundWinner.currentTime = 0; // Reset sound to the beginning
    }, 2000); // Duration in milliseconds (3000ms = 3 seconds)

};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        // checking each pos is not empty and if they are equal to each other then pos1 is winner
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
};


resetGameBtn.addEventListener("click", resetGame);
