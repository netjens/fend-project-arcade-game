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

  getXl() {
    return this.x * 100+20;
  }
  getXr() {
    return this.x * 100 + 100-20;
  }


  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  updatePosition(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x * 100 > CANVAS_WIDTH) {
      this.x = 0;
    }
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 100, this.y * 83 - 20);
  }
}

// Now write your own player class
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

  update() {}

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 100, this.y * 83 - 10);
  }

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

// Now instantiate your objects.
const allEnemies = [];
allEnemies.push(new Enemy(1));
allEnemies.push(new Enemy(2));
allEnemies.push(new Enemy(3));
allEnemies.push(new Enemy(4));

const player = new Player();

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
