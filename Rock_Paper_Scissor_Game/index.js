const choices = ["rock","paper","scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
const roundDisplay = document.getElementById("round");

let playerScore = 0;
let computerScore = 0;
let currentRound = 1;
const maxRounds = 5;

function playGame(playerChoice){
    if (currentRound > maxRounds) {
        return; // Stop the game after max rounds
      }
   const computerChoice = choices[Math.floor(Math.random()*3)];  //1
   let result = "";

   if (playerChoice === computerChoice){
    result = "Draw Match";
   } 
   else {
    switch(playerChoice){
        case "rock":
            result = (computerChoice === "scissors") ? "YOU WIN!" : "YOU LOSE!";
            break;
        case "paper":
            result = (computerChoice === "rock") ? "YOU WIN!" : "YOU LOSE!";
            break;
        case "scissors":
            result = (computerChoice === "paper") ? "YOU WIN!" : "YOU LOSE!";
            break;
    }
   }

   // 4)update the text on the screen
   playerDisplay.textContent = `PLAYER: ${playerChoice.toUpperCase()}`;
   computerDisplay.textContent = `COMPUTER: ${computerChoice.toUpperCase()}`;
   resultDisplay.textContent = result;
  
   // Update result color and score
   resultDisplay.classList.remove("greenText", "redText");

   //5)examine our result
   switch(result){
    case "YOU WIN!":
        resultDisplay.classList.add("greenText");
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
        break;
    case "YOU LOSE!":
        resultDisplay.classList.add("redText");
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
        break;
}
  // Increment the round and update the display
  currentRound++;
  if (currentRound <= maxRounds) {
    roundDisplay.textContent = `Round: ${currentRound} of ${maxRounds}`;
  } else {
    declareWinner();
  }
}

// final declaration of the winner among 5 rounds
function declareWinner() {
    let finalMessage = "";
    if (playerScore > computerScore) {
      finalMessage = "Congrats! You won the game!";
    } else if (computerScore > playerScore) {
      finalMessage = "Game Over! The computer wins.";
    } else {
      finalMessage = "It's a draw! Well played!";
    }
    resultDisplay.textContent = finalMessage;
    resultDisplay.classList.add("greenText");
  }



/************ Things to know **************
 1)Generating the random numbers between 0 and 2 and declaring within the function 
 so we can update it every time we play a new game.
 1.1)Array of choices - in index we generate that random numbers using Math method times three then 
 round it coz its not going to be a whole number- math.floor()
 2) let Result will be empty or nothing.
 3) if player choice is equal to computer choice then it will be tie otherwise 
  someone going to win (switch case)vice versa for all
  if player choice match the case rock use this two values 
  => if computer choice is equal to scissor then player is the winner otherwise he will lose
 4)update the text on the screen
 5) Result display access the class list use by add method then  add the class green text then break it.
 => Result display access the class list use by add method then add the class red text then break it.
 6) Take the result display access the class list use the remove method remove any class of green or red text.
 7) Score mechanism:
 =>let computer and play score initially zero
 => increment the player score in switch case of result you win and computer score of you lose
 => player score display - access the text content which is equal to player score
  => computer score display - access the text content which is equal to computer score

 * ****/