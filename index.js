// Define an array of button colours
var buttonColours = ['red', 'blue', 'green', 'yellow'];

// Initialize arrays to store game patterns and user clicked patterns
var gamePattern = [];
var userClickedPattern = [];

// Initialize game variables
var started = false; // Keeps track of whether the game has started
var level = 0; // Current level of the game

// Event listener for when a key is pressed
$(document).keypress(function () {
  if (!started) {
    // If the game hasn't started yet
    $('#level-title').text('Level ' + level); // Update the level title
    nextSequence(); // Generate the next sequence
    started = true; // Set started to true to indicate the game has started
  }
});

// Event listener for when a button is clicked
$('.btn').click(function () {
  var userChosenColour = $(this).attr('id'); // Get the ID of the clicked button
  userClickedPattern.push(userChosenColour); // Add the chosen colour to userClickedPattern

  playSound(userChosenColour); // Play a sound associated with the chosen colour
  animatePress(userChosenColour); // Animate the button press

  checkAnswer(userClickedPattern.length - 1); // Check if the answer is correct
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If the user's choice matches the game's choice
    if (userClickedPattern.length === gamePattern.length) {
      // If the user has completed the pattern
      setTimeout(function () {
        nextSequence(); // Generate the next sequence
      }, 1000);
    }
  } else {
    playSound('wrong'); // Play a "wrong" sound
    $('body').addClass('game-over'); // Add a class for a game over effect
    $('#level-title').text('Game Over, Press Any Key to Restart'); // Update level title

    setTimeout(function () {
      $('body').removeClass('game-over'); // Remove game over effect
    }, 200);

    startOver(); // Reset the game
  }
}

// Function to generate the next sequence
function nextSequence() {
  userClickedPattern = []; // Reset userClickedPattern for the new level
  level++; // Increment the level
  $('#level-title').text('Level ' + level); // Update level title
  var randomNumber = Math.floor(Math.random() * 4); // Generate a random number between 0 and 3
  var randomChosenColour = buttonColours[randomNumber]; // Get a random colour from buttonColours
  gamePattern.push(randomChosenColour); // Add the chosen colour to the game pattern

  // Flash the chosen colour on the screen
  $('#' + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour); // Play a sound associated with the chosen colour
}

// Function to animate a button press
function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed'); // Add a class for a pressed effect
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed'); // Remove pressed effect after a short delay
  }, 100);
}

// Function to play a sound
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3'); // Create an Audio object with the specified sound
  audio.play(); // Play the audio
}

// Function to reset the game
function startOver() {
  level = 0; // Reset the level to 0
  gamePattern = []; // Clear the game pattern
  started = false; // Reset the started flag to false
}

// Pseudocode

/*
1.Initialize game variables:
    Create an array of button colours.
    Create empty arrays to store game patterns and user clicked patterns.
    Set the game as not started and the level to 0.

2.When a key is pressed:
    -If the game hasn't started:
        Update the level title.
        Generate the next sequence.
        Set the game as started.

3.When a button is clicked:
    Get the colour of the clicked button.
    Add the chosen colour to the user's clicked pattern.
    Play a sound associated with the chosen colour.
    Animate the button press.
    Check if the user's pattern matches the game's pattern.

4.Check the user's answer:
    -If the choices match:
        If the user has completed the pattern:
        Generate the next sequence after a delay.

    -If the choices don't match:
        Play a "wrong" sound.
        Add a game-over effect to the body.
        Update the level title.
        Remove the game-over effect after a short delay.
        Reset the game.

5.Generate the next sequence:
    Reset the user's clicked pattern for the new level.
    Increment the level and update the level title.
    Choose a random colour from the button colours.
    Add the chosen colour to the game's pattern.
    Flash the chosen colour on the screen.
    Play a sound associated with the chosen colour.

6.Animate a button press:
    Add a pressed effect to the clicked button.
    Remove the pressed effect after a short delay.

7.Play a sound:
    Create an audio object with the specified sound.
    Play the audio.

8.Reset the game:
    Set the level to 0.
    Clear the game pattern.
    Reset the game as not started.
*/
