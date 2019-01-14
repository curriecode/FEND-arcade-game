/*@description Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */

let Engine = (function(global) {
    let doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* @descrpition This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        let now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        update(dt);
        render();
        createNewBug();
        lastTime = now;
        win.requestAnimationFrame(main);
    }

    /* @description This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    /*@descrpition This is called by the update function and loops through all of the
     * objects within allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. 
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy, index) {
            enemy.update(dt, index);
        });
        player.update();
    }

    //@descrition checkCollisions() checks right and left side of x and y axis coordinates for player and enemy 
    //to determine the scope for collision
    //resets player to starting poistion if collision occurs and adds 1 to the fails counter
    function checkCollisions() {
        let fails = document.getElementsByClassName("fails")[0].firstElementChild;
        for(let enemies of allEnemies) {
            if ((player.x - 25) <= (enemies.x + 25) && ((player.x + 25) >= (enemies.x - 25))) {
                if (((player.y - 40) <= (enemies.y + 35)) && ((player.y + 20) >= (enemies.y - 35))) {
                    player.y = 400
                    player.x = 200
                    fails.innerHTML = Number(fails.innerHTML) + 1;
                }
            }
        };
    };

    function render() {
        /*@description This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        let rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        ctx.clearRect(0,0,canvas.width,canvas.height);

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
    }

    /* @description This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
    }

    /* @ description This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        //noop
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat.png',
        'images/char-horn.png',
        'images/char-pink.png',
        'images/char-princess.png'
    ]);
    Resources.onReady(init);
    global.ctx = ctx;
})(this);