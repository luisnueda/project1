function Obstacle(game){
  this.game = game;

  this.img = new Image();
  this.img.src = "img/asteroide2.png";


  this.x = this.game.canvas.width;
  this.y = Math.random() * (this.game.canvas.height - 0) + 0;
  //this.y = 100;
  this.w = 50;
  this.h = 80;
}

Obstacle.prototype.draw = function() {

  this.game.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.w,
    this.h)
};

Obstacle.prototype.move = function() {
  this.x -= 5;
};