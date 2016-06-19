var Line = require("./sketch/line")
var noise = require("@giuliandrimba/noise");
var calc = require("2pi-calc");

var ctx = undefined;
var env = undefined;
var line = undefined;
var colorNoise = 0;
var lines = [];

exports.setup = function(_ctx, _env){
  ctx = _ctx;
  env = _env;

  background("#fff");

  var numLines = 100 * (ctx.canvas.width / 1024)
  var radius = 300 * (ctx.canvas.width / 1024)
  var angleStep = 360 / numLines
  var angle = 0;
  var center = {x:ctx.canvas.width / 2 - 10, y:ctx.canvas.height / 2 - 10};

  for(var j = 0; j < numLines; j++) {
    colorNoise += 0.0001;
    var color = noise(colorNoise);
    var p1 = {
      x:center.x + (Math.cos(angle) * radius),
      y:center.y + (Math.sin(angle) * radius)
    }

    var p2 = {
      x:center.x - (Math.cos(angle) * radius),
      y:center.y - (Math.sin(angle) * radius)
    }

    var l = new Line(p1,p2, {numPoints:10, color:color, step:angleStep, origin:center})
    l.draw(ctx);

    angle += angleStep;
  }
  env.done()
}

exports.draw = function() {

}

function background(color){
  ctx.fillStyle = color;
  ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
}