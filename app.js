const rowLoc = 83;
const columLoc = 101;

/**
super class for Enemy and Player
@param {number} maxLocX maximum random integer to find out location of x
@param {number} minLocX minimum random integer to find out location of y
@param {number} maxLocY maximum random integer to find out location of x
@param {number} minLocY minimum random integer to find out location of y
@param {string} sprite path to image for entity
**/
var GameEntity = function(maxLocX, minLocX, maxLocY, minLocY, sprite) {
	this.x = columLoc * this.startLocation(maxLocX, minLocX);
	this.y = rowLoc * this.startLocation(maxLocY, minLocY);
	this.sprite = sprite;
}

/**
Find random number between max and min inclusive
@param {number} max maximum random integer 
@param {number} min minimum random integer 
@return {number} location of  for an entity
**/
GameEntity.prototype.startLocation = function(max, min) {
	var randNum = (Math.floor(Math.random() * (max - min + 1)) + min);
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
var Enemy = function(maxLocX, minLocX, maxLocY, minLocY, sprite) {
	GameEntity.call(this, maxLocX, minLocX, maxLocY, minLocY, sprite);
}
Enemy.prototype = Object.create(GameEntity.prototype);
Enemy.prototype.constructor = Enemy;

// Return intial speed for an enemy
Enemy.prototype.startSpeed = function() {
	var speed = (Math.floor(Math.random() * 5) + 1) * 100;
	return speed;
}

/**
Update the enemy's position, required method for game
@param {number} dt, a time delta between ticks
**/
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.startSpeed() * dt;
	//If enemy is not in range start again from begining locion ;
	if (this.x > 504) {
		this.x = 0;
	}
}

/**
Player is a sub class of GameEntity
@param {number} maxLocX maximum random integer to find out location of x
@param {number} minLocX minimum random integer to find out location of y
@param {number} maxLocY maximum random integer to find out location of x
@param {number} minLocY minimum random integer to find out location of y
@param {string} sprite path to image for entity
**/
var Player = function(maxLocX, minLocX, maxLocY, minLocY, sprite) {
	GameEntity.call(this, maxLocX, minLocX, maxLocY, minLocY, sprite);
	this.score=0;
}
Player.prototype = Object.create(GameEntity.prototype);
Player.prototype.constructor = Player;
/**
Reset Player location to start position
**/
Player.prototype.resetLocation = function() {
	this.x = columLoc * this.startLocation(4, 0); //reset to start random location
	this.y = rowLoc * this.startLocation(5, 4);
}

Player.prototype.update = function(dt) {
	//check for collision 
	for (a in allEnemies) {
		if ((this.x - allEnemies[a].x < columLoc / 2 && this.y - allEnemies[a].y < columLoc / 2) && (this.x - allEnemies[a].x > -rowLoc / 2 && this.y - allEnemies[a].y > -rowLoc / 2)) {
			this.resetLocation();
		}
	}
	//if player made to water add its score
	if (this.y == 0) {
		this.score++;
		this.resetLocation();
	}

}
/**
Move player by key board and in range of canvas
@param {string} keyInput keyboard direction
**/
Player.prototype.handleInput = function(keyInput) {
	if (keyInput == 'right' && this.x < 4 * columLoc) {
		this.x += columLoc;
	}

	if (keyInput == 'left' && this.x > 0) {
		this.x -= columLoc;
	}
	if (keyInput == 'down' && this.y < 5 * rowLoc) {
		this.y += rowLoc;
	}
	if (keyInput == 'up' && this.y > 0) {
		this.y -= rowLoc;
	}


}
Player.prototype.showScore = function() {
	ctx.fillStyle="yellow";
	ctx.font = "30px Verdana";
	ctx.fillText("Score: " + this.score,  0, 83);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Place enemy1 in row 3 and any column from 0 to 4
var enemy1 = new Enemy(4, 0, 3, 3, 'images/enemy-bug.png');
// Place enemy2 in row 2 and any column from 0 to 4
var enemy2 = new Enemy(4, 0, 2, 2, 'images/enemy-bug.png');
// Place enemy3 in row 1 and any column from 0 to 4
var enemy3 = new Enemy(4, 0, 1, 1, 'images/enemy-bug.png');
// Place player in row 5,4 and any column from 0 to 4
var player = new Player(4, 0, 5, 4, 'images/char-pink-girl.png');
var allEnemies = [];
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
