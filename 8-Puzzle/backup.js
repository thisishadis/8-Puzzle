const time_el = document.querySelector('.watch .timer')
let seconds = 0
let interval = null
//update the timer 
function timer(){
    seconds ++;
    //format the time 
    let hrs = Math.floor(seconds / 3600)
    let mins = Math.floor((seconds - (hrs * 3600)) / 60)
    let secs = seconds % 60

    if (secs < 10) secs = '0'+secs
    if (mins < 10) mins = '0'+mins
    if (hrs < 10) hrs = '0'+hrs

    time_el.innerText =`${hrs}:${mins}:${secs}`
}
// Function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Function to update the grid with numbers
  function updateGrid(numbers) {
    const buttons = document.querySelectorAll(".grid button");
    buttons.forEach((button, index) => {
      button.textContent = numbers[index] === 0 ? "" : numbers[index];
      button.disabled = numbers[index] === 0;
    });
  }
  
  // Function to check if the puzzle is solved
  function isPuzzleSolved(numbers) {
    for (let i = 0; i < numbers.length - 1; i++) {
      if (numbers[i] !== i + 1) {
        return false;
      }
    }
    return true;
  }
  
  // Function to start the game
  function startGame() {
    const numbers = Array.from({ length: 9 }, (_, index) => index);
    shuffleArray(numbers);
    updateGrid(numbers);
  
    let moveCount = 0;
    let isGameStarted = false;
  
    // Function to handle button clicks
    function handleButtonClick(event) {
      if (!isGameStarted) return;
  
      const buttons = document.querySelectorAll(".grid button");
      const emptyButton = document.querySelector(".grid button:disabled");
  
      const clickedButton = event.target;
      const clickedIndex = Array.from(buttons).indexOf(clickedButton);
      const emptyIndex = Array.from(buttons).indexOf(emptyButton);
  
      if (isAdjacent(clickedIndex, emptyIndex)) {
        [numbers[clickedIndex], numbers[emptyIndex]] = [numbers[emptyIndex], numbers[clickedIndex]];
  
        moveCount++;
        document.querySelector(".footer span").textContent = `Move: ${moveCount}`;
        updateGrid(numbers);
  
        if (isPuzzleSolved(numbers)) {
          isGameStarted = false;
          alert(`Congratulations! You solved the puzzle in ${moveCount} moves.`);
        }
      }
    }
  
    // Function to check if two buttons are adjacent
    function isAdjacent(index1, index2) {
      const row1 = Math.floor(index1 / 3);
      const col1 = index1 % 3;
      const row2 = Math.floor(index2 / 3);
      const col2 = index2 % 3;
  
      return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
    }
  
    // Add event listener to start the game
    document.querySelector(".footer button").addEventListener("click", () => {
      isGameStarted = true;
      moveCount = 0;
      if(interval){
        return
     }
     interval = setInterval(timer , 1000)
      document.querySelector(".footer span").textContent = `Move: ${moveCount}`;
      startGame();
    });
  
    // Add event listener to buttons
    const buttons = document.querySelectorAll(".grid button");
    buttons.forEach((button) => button.addEventListener("click", handleButtonClick));
  }
  
  // Call the startGame function when the page loads
  window.addEventListener("DOMContentLoaded", startGame);
  