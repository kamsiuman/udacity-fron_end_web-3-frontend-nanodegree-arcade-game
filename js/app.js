const rowTileCount = 6;
const columnTileCount = 5;
const tileLength = 101;
const enemyWidth = 83;
const numEnemies = 3;
const initialPlayerPositionInColumn = 2;

// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y;
  this.speed = getRandomSpeed(300, 400);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;

  if (this.x > rowTileCount * tileLength) {
    this.x = -tileLength;
    this.speed = getRandomSpeed(300, 400);
  }

  //check for collision condition
  if (
    Math.abs(this.x - player.x) < tileLength &&
    Math.abs(this.y - player.y) < enemyWidth
  ) {
    player.resetOriginalPosition(initialPlayerPositionInColumn);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = "images/char-boy.png";
  this.resetOriginalPosition(initialPlayerPositionInColumn);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Update the player's position, required method for game
// [comment] : check the boundary-condition for the user-movment. (zero-based indexed)
Player.prototype.update = function() {
  if (this.col < 0) {
    this.col = 0;
  }
  if (this.col > columnTileCount - 1) {
    this.col = columnTileCount - 1;
  }
  if (this.row > rowTileCount - 1) {
    this.row = rowTileCount - 1;
  }
  // [comment] : Once the player reaches the water (i.e., the top of the game board), the game is won
  if (this.row == 0) {
    this.resetOriginalPosition(this.col);
  }

  this.x = this.col * tileLength;
  this.y = this.row * enemyWidth;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle user input for controlling the player
Player.prototype.handleInput = function(key) {
  switch (key) {
    case "left":
      this.col--;
      break;
    case "right":
      this.col++;
      break;
    case "up":
      this.row--;
      break;
    case "down":
      this.row++;
      break;
  }
};

// Once a the player collides with an enemy, the game is reset and the player moves back to the starting square
Player.prototype.resetOriginalPosition = function(positionInColumn) {
  this.col = positionInColumn;
  this.row = rowTileCount - 1;
  this.x = this.col * tileLength;
  this.y = this.row * enemyWidth;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// [comment] : populate the 3 enemies (with their inital position) into the array

for (var i = 0; i < numEnemies; i++) {
  allEnemies.push(new Enemy(i * tileLength, (i + 1) * enemyWidth));
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

function getRandomSpeed(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
