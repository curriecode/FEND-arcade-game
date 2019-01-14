let levelSpeedMod = 1;
let winsElement = document.getElementsByClassName("wins")[0].firstElementChild;

//@description starting coordinates for enemies and increase in speed as the game levels get higher
let Enemy = function() {
    this.x = -300
    this.y = Math.floor(Math.random() * 200) + 60 
    this.speed = (Math.floor(Math.random() * 300) + 50 ) * levelSpeedMod
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.setSpeed = function() {
    this.speed = this.speed * levelSpeedMod;
}

Enemy.prototype.update = function(dt, index) {
    if (this.x > 600) {
        allEnemies.splice(index, 1);
    }
    this.x += this.speed * dt;
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player {
    constructor () {
        this.sprite = 'images/char-cat.png'
        this.x = 200
        this.y = 400
        this.locked = false;
    }
    //@description briefly pauses player on water square when they win a level to make game play less visually hectic
    update() {
        let playerStart = this; 
        if (this.y < 10) {
            setTimeout(function() { 
                playerStart.y = 400
                playerStart.x = 200
                playerStart.locked = false
            }, 500);
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //@descriptiton sets how far the player can move on keypress
    handleInput(direction) {
        if (direction == 'down' && this.y < 400)  {
            this.y += 41.5
        } else if (direction == 'up' && this.y > 0) {
            this.y -= 41.5
        } else if (direction == 'right' && this.x < 370) {
            this.x += 101
        } else if (direction == 'left' && this.x > 50) {
            this.x -= 101
        }
        if (this.isWin() && !this.locked) {
            this.locked = true
            this.handleWin()
        } else {
            this.locked = false;
        }
    }
    isWin() {
        return this.y < 10;
    }  
    
    modal(){
        document.getElementsByClassName('modal')[0].style.visibility = 'visible'
    }

    //@description reveals gems as levels are completed
    handleWin() {
        let blueGem = document.getElementsByClassName("gems")[0].children[1];
        let greenGem = document.getElementsByClassName("gems")[0].children[3];
        let orangeGem = document.getElementsByClassName("gems")[0].children[5];
        let gemSpan1 = document.getElementsByClassName("gems")[0].children[2];
        let gemSpan2 = document.getElementsByClassName("gems")[0].children[4];
        let gemSpan3 = document.getElementsByClassName("gems")[0].children[6];
        let numWins = Number(winsElement.innerHTML) + 1;

        winsElement.innerHTML = numWins;
        this.increaseSpeed();

        if (numWins >= 3) {
            blueGem.style.visibility = 'visible'
            gemSpan1.style.visibility = 'hidden'
        }
        if (numWins >= 6) {
            greenGem.style.visibility = 'visible'
            gemSpan2.style.visibility = 'hidden'
        }
        if (numWins >= 10) {
            orangeGem.style.visibility = 'visible'
            gemSpan3.style.visibility = 'hidden'
            this.modal();
        }
    }
    
    // @description increases speed of enemies each time a level is completed
    increaseSpeed() {
        //increases speed as levels get higher
        levelSpeedMod += Number(winsElement.innerHTML) / 40
        allEnemies.forEach((enemy) => {
            enemy.setSpeed();
        });
    }

    selectPlayer(selection){
        this.sprite = `images/char-${selection}.png`;
    }
}

let enemy1 = new Enemy();
let allEnemies = [enemy1];
let player = new Player();

//@description creates new enemies and adds them to an array
function createNewBug() {
    if (allEnemies.length < 5) {
        let enemy = new Enemy()
        allEnemies.push(enemy);
    }
}

//@description This listens for key presses and sends the keys to player.handleInput()
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (!player.locked) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});

let characters = document.querySelectorAll('.boy, .horn, .pink, .princess, .cat');
//@description event handler to click and choose charcters
characters.forEach((character) => {
    character.addEventListener('click', function(e){
        player.selectPlayer(e.currentTarget.className);
    });
});

