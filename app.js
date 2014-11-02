/**
super class for Enemy and Player
@param {number} maxLocX maximum random integer to find out location of x
@param {number} minLocX minimum random integer to find out location of y
@param {number} maxLocY maximum random integer to find out location of x
@param {number} minLocY minimum random integer to find out location of y
@param {string} sprite path to image for entity
**/
var GameEntity=function(maxLocX,minLocX,maxLocY,minLocY,sprite){
    this.x=101*this.startLocation(maxLocX,minLocX);
    this.y=83*this.startLocation(maxLocY,minLocY);
    this.sprite=sprite;
}

/**
Find random number between max and min inclusive
@param {number} max maximum random integer 
@param {number} min minimum random integer 
@return {number} location of  for an entity
**/
GameEntity.prototype.startLocation=function(max, min){
    var randNum=(Math.floor(Math.random() * (max - min + 1))+ min);
    return randNum;
}

// Draw the Entity on the screen, required method for game
GameEntity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
/**
Enemy is a sub class of GameEntity
@param {number} maxLocX maximum random integer to find out location of x
@param {number} minLocX minimum random integer to find out location of y
@param {number} maxLocY maximum random integer to find out location of x
@param {number} minLocY minimum random integer to find out location of y
@param {string} sprite path to image for entity
**/
var Enemy=function(maxLocX,minLocX,maxLocY,minLocY,sprite){
    GameEntity.call(this,maxLocX,minLocX,maxLocY,minLocY,sprite);
    var speed=1;
}
Enemy.prototype=Object.create(GameEntity.prototype);
Enemy.prototype.constructor=Enemy;

/**
Update the enemy's position, required method for game
@param {number} dt, a time delta between ticks
**/
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //this.x = this.speed*dt;
}

/**
Player is a sub class of GameEntity
@param {number} maxLocX maximum random integer to find out location of x
@param {number} minLocX minimum random integer to find out location of y
@param {number} maxLocY maximum random integer to find out location of x
@param {number} minLocY minimum random integer to find out location of y
@param {string} sprite path to image for entity
**/
var Player=function(maxLocX,minLocX,maxLocY,minLocY,sprite){
    GameEntity.call(this,maxLocX,minLocX,maxLocY,minLocY,sprite);
}
Player.prototype=Object.create(GameEntity.prototype);
Player.prototype.constructor=Player;

Player.prototype.update = function(dt) {
 
}
//
Player.prototype.handleInput = function() {
    
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Place enemy1 in row 3 and any column from 0 to 4
var enemy1 = new Enemy(4,0,3,3,'images/enemy-bug.png');
// Place enemy2 in row 2 and any column from 0 to 4
var enemy2 = new Enemy(4,0,2,2,'images/enemy-bug.png');
// Place enemy1 in row 1 and any column from 0 to 4
var enemy3 = new Enemy(4,0,1,1,'images/enemy-bug.png');
// Place player in row 5,4 and any column from 0 to 4
var player = new Player(4,0,5,4,'images/char-boy.png');
var allEnemies=[];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
