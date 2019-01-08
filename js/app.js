// Enemies our player must avoid
// canvas = doc.createElement('canvas')

let Enemy = function() {
    this.x = -300
    this.y = Math.floor(Math.random() * 200) + 60 
    this.speed = (Math.floor(Math.random() * 500) + 50 )
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, index) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 600){
        allEnemies.splice(index, 1)
    }
    this.x += this.speed * dt
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// let canvasWidth = document.getElementsByTagName('canvas')[0].width
// let canvasHeight = document.getElementsByTagName('canvas')[0].height
class Player {
    constructor () {
        this.sprite = 'images/char-cat-girl.png'
        this.x = 200
        this.y = 400
    }
    update(){
        let playerStart = this; 
        if (this.y < 30){
            setTimeout(function(){ 
                playerStart.y = 400
            }, 500)
        }
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(direction){
        if (direction == 'down' && this.y < 400)  {
            this.y += 83
        } else if (direction == 'up' && this.y > 0) {
            this.y -= 83
        } else if (direction == 'right' && this.x < 370) {
            this.x += 101
        } else if (direction == 'left' && this.x > 50) {
            this.x -= 101
        } 
        this.wins()
    }
    wins() {
        let winsElement = document.getElementsByClassName("wins")[0].firstElementChild
        if (this.y < 30) {
            winsElement.innerHTML = Number(winsElement.innerHTML) + 1
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1 = new Enemy()
let allEnemies = [enemy1]

let player = new Player()

function createNewBug() {
    if (allEnemies.length < 5) {
        let enemy = new Enemy()
        allEnemies.push(enemy)    
    }
    // If you call this every loop of engine, you will have way too many bugs
    // create bug
    // add to allEnemies
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Bugs
// create bugs continuously (call function here from engine.js)
// have bugs start off screen (with a random y value between the stones (Math.random))
// have bugs movement speed be random (Math.random)

// Player
// needs to "win" when they hit the water, and be reset to the starting position
// setting sensible movement distance and boundaries

// Collision
// when a bug collides with player, reset the players position 

