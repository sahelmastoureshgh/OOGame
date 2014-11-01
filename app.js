// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var loc;
    var x;
    var y;
    var speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.loc+=this.speed*dt;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//Player class

var Player = function() {
    
    // The image/sprite for our palyers, this uses
    this.sprite ='images/char-boy.png';
    this.x=this.startLocationX(4,1);
    this.y=this.startLocationY(5,4);
}

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
 
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// 
Player.prototype.handleInput = function() {
    
}
Player.prototype.startLocationX=function(max, min){
    var locX=101*(Math.floor(Math.random() * (max - min + 1))+ min);
    return locX;
}
Player.prototype.startLocationY=function(max, min){
    var locY=83*(Math.floor(Math.random() * (max - min + 1)) + min);
    return locY;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
var player = new Player();
var allEnemies=[];
allEnemies.push(enemy1);




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
