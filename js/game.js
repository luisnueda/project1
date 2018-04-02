function Game(canvasId){
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");

  this.fps = 60;
  this.framesCounter = 0;

  this.interval;
  this.background = new Background(this);
  this.player = new Player(this);
  this.obstacles = [new Obstacle(this)];
  
  this.explosion = new Explosion(this);

}

Game.prototype.start = function() {
  this.interval = setInterval(function(){

    this.framesCounter ++;
    if (this.framesCounter > 1000) this.framesCounter = 0;

    this.clear();
    this.move();
    this.draw();

    if (this.framesCounter % 100 === 0) {
      this.generateObstacle();
    }
    if (this.isCollision()) {
      
    }

  }.bind(this), 1000/this.fps)
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.clearObstacles = function() {
  this.obstacles = this.obstacles.filter(function(o) {
    return o.x > 0;
  })
};

Game.prototype.isCollision = function() {
  var collision = false;

  this.obstacles.forEach(function(o){
    if (((this.player.x + this.player.w - 20) >= o.x )&&
        (this.player.x < (o.x + o.w - 10)) &&
        ((this.player.y + this.player.h - 20) >= o.y)&&
        (this.player.y <= o.y + o.h -10)) {
        var actualX = o.x;
        if(actualX - 190){


          this.obstacles.splice(this.obstacles.indexOf(o),1);

        }

        this.explosion.draw(o.x, o.y);

      collision = true;
    }
  }.bind(this));
  return collision;
};

Game.prototype.generateObstacle = function() {
  this.obstacles.push(new Obstacle(this));
};

Game.prototype.draw = function(){
  this.background.draw();
  this.player.draw();
  
  this.obstacles.forEach(function(o) { o.draw(); })


}

Game.prototype.move = function(){
  this.background.move();

  this.obstacles.forEach(function(o) { o.move(); })

}