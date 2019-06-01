'use strict';
/*this file provides player and enemy classes + 
creats the required object-instances +
handles keyboard input.*/


// Enemies our player must avoid
class Enemy {
  constructor(yPos) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";
    this.x = Math.floor(Math.random() * 5);
    this.y = yPos;
    this.speed = Math.floor(Math.random() * 3) + 1;
  }

  //get the left position of this Enemy
  getXl() {
    return this.x * 100+20;
  }

  //get the right position of this Enemy
  getXr() {
    return this.x * 100 + 100-20;
  }


  // Update the enemy's position
  // Parameter: dt, a time delta between ticks
  updatePosition(dt) {
    // multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x * 100 > CANVAS_WIDTH) {
      this.x = 0;
    }
  }

  // Draw the enemy on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 100, this.y * 83 - 20);
  }
}

//The Player Class 
class Player {
  constructor() {
    this.sprite = "images/char-boy.png";
    this.x = 2;
    this.y = 5;
  }

  getXl() {
    return this.x * 100;
  }
  getXr() {
    return this.x * 100 + 100;
  }

  //return true if there is an collision with anEnemy given as parameter
  isCollisionWithEnemy(anEnemy) {
    if (
      ((this.getXr() > anEnemy.getXl() && this.getXr() < anEnemy.getXr()) ||
        (this.getXl() < anEnemy.getXr() && this.getXl() > anEnemy.getXl())) &&
      (this.y == anEnemy.y)
    ) {
      return true;
    }
    return false;
  }

  //paints player on canvas
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 100, this.y * 83 - 10);
  }

  //handle keyboard input and assigns player new position. possible values are left, up, down, right
  handleInput(dir) {
    switch (dir) {
      case "left":
        if (this.x > 0) {
          this.x--;
        }
        break;
      case "up":
        if (this.y > 0) {
          this.y--;
        }
        break;
      case "down":
        if (this.y < 5) {
          this.y++;
        }
        break;

      case "right":
        if (this.x < 4) {
          this.x++;
        }
    }
  }
}


const allEnemies = [];
allEnemies.push(new Enemy(1));
allEnemies.push(new Enemy(2));
allEnemies.push(new Enemy(3));
allEnemies.push(new Enemy(4));

const player = new Player();

// Listener for key presses and sends the keys to 
// Player.handleInput() method. 
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
