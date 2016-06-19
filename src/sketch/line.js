var calc = require("2pi-calc");
var Vector = require("2pi-vector");

function Line(pointA, pointB, style){
  this.pointA = pointA;
  this.pointB = pointB;
  this.style = style;
  this.points = [];
}

Line.prototype.draw = function(ctx){
  var dist = calc.dist(this.pointA.x, this.pointA.y, this.pointB.x, this.pointB.y);
  var direction = Vector.new();
  direction.x = this.pointB.x - this.pointA.x;
  direction.y = this.pointB.y - this.pointA.y;
  direction = Vector.normalize(direction)
  var steps = dist / this.style.numPoints;

  ctx.strokeStyle = "#000"
  ctx.beginPath()
  ctx.moveTo(this.pointA.x, this.pointA.y)

  for(var i = 0; i <  2 + this.style.numPoints; i++) {

    var d = Vector.copy(direction)
    d = Vector.mult(d, steps * i);
    var p = Vector.add(this.pointA, d);

    this.points.push(p);
    ctx.lineTo(p.x, p.y)
  }

  ctx.stroke();

  ctx.beginPath()
  ctx.fillStyle = "#000";
  this.points.map(function(point){
    ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
  })
  ctx.fill();

}

module.exports = Line;