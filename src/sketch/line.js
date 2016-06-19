var calc = require("2pi-calc");
var Vector = require("2pi-vector");
var noise = require("@giuliandrimba/noise");

function Line(pointA, pointB, style){
  this.pointA = pointA;
  this.pointB = pointB;
  this.style = style;
  this.points = [];
  this.noise = Math.random();
}

Line.prototype.draw = function(ctx){

  var dist = calc.dist(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
  var direction = Vector.new();
  direction.x = this.pointB.x - this.pointA.x;
  direction.y = this.pointB.y - this.pointA.y;
  direction = Vector.normalize(direction)
  var steps = dist / this.style.numPoints;

  console.log(this.style.color)
  ctx.strokeStyle = "rgba(0,0,0, "+this.style.color + ")"
  ctx.lineWidth = ctx.canvas.width / 1024
  ctx.beginPath()

  ctx.moveTo(this.pointA.x, this.pointA.y)

  for(var i = 1; i < this.style.numPoints - 1; i++) {

    this.noise += 0.1;
    var d = Vector.copy(direction)
    var numNoise = noise(this.noise) * 300 * (ctx.canvas.width / 1024)
    this.noise += 0.1;
    var numNoise2 = -noise(this.noise) * 300 * (ctx.canvas.width / 1024)
    d = Vector.mult(d, steps * i);
    var p = Vector.add(this.pointA, d);

    if(p.x <= this.style.origin.x && p.y <= this.style.origin.y) {
      p.x -= numNoise + numNoise2
      p.y += numNoise + numNoise2
    }

    if(p.x > this.style.origin.x && p.y < this.style.origin.y) {
      p.x -= numNoise + numNoise2
      p.y -= numNoise + numNoise2
    }

    if(p.x >= this.style.origin.x && p.y >= this.style.origin.y) {
      p.x += numNoise + numNoise2
      p.y -= numNoise + numNoise2
    }

    if(p.x < this.style.origin.x && p.y > this.style.origin.y) {
      p.x += numNoise + numNoise2
      p.y += numNoise + numNoise2
    }

    this.points.push(p);
    ctx.lineTo(p.x, p.y)
  }
  ctx.lineTo(this.pointB.x, this.pointB.y)

  ctx.stroke();

}

module.exports = Line;