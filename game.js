// Define an array of button colors and empty arrays for game pattern and user clicked patterns
let buttonsColors = ['green', 'red', 'yellow', 'blue'];
let gamePattern = [];
let userClickedPattern = [];

// Get all buttons and set up variables for game state and level
let buttons = document.querySelectorAll('.btn');
let started = false;
let level = 0;

// Add event listeners for buttons
buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    // Get the color of the clicked button
    let userChosenColour = this.id;
    // Add the chosen color to the user's clicked pattern
    userClickedPattern.push(userChosenColour);

    // Play a sound associated with the chosen color
    playSound(userChosenColour);
    // Animate the button press
    animatePress(userChosenColour);

    // Check if the user's pattern matches the game's pattern
    checkAnswer(userClickedPattern.length - 1);
  });
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('wrong');
    playSound('wrong');

    // Add game-over effect to the body
    document.body.classList.add('game-over');
    setTimeout(function () {
      document.body.classList.remove('game-over');
    });

    // Update the level title and initiate restart
    document.getElementById('level-title').textContent =
      'Game over, Press any key to restart';
    startOver();
  }
}

// Add event listener for key press to start the game
document.addEventListener('keypress', function (event) {
  if (!started) {
    document.getElementById('level-title').textContent = 'Level ' + level;
    nextSequence();
    started = true;
  }
});

// Function to generate the next sequence
function nextSequence() {
  // Reset the user's clicked pattern for the new level
  userClickedPattern = [];
  // Increment the level and update the level title
  level++;
  document.getElementById('level-title').textContent = 'Level ' + level;

  // Choose a random color from the button colors
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonsColors[randomNumber];
  gamePattern.push(randomChosenColour);

  // Flash the chosen color on the screen
  let selectedButton = document.getElementById(randomChosenColour);
  selectedButton.classList.add('flash');
  setTimeout(function () {
    selectedButton.classList.remove('flash');
  }, 200);

  // Play a sound associated with the chosen color
  playSound(randomChosenColour);
}

// Function to play a sound
function playSound(name) {
  let audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

// Function to animate a button press
function animatePress(currentColor) {
  let button = document.getElementById(currentColor);

  button.classList.add('pressed');
  setTimeout(function () {
    button.classList.remove('pressed');
  }, 100);
}

// Function to reset the game state
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
