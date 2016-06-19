var Line = require("./sketch/line")

var ctx = undefined;
var env = undefined;
var line = undefined;

exports.setup = function(_ctx, _env){
  ctx = _ctx;
  env = _env;

  background("#fff");
  line = new Line({x:100, y:0},{x:300, y:ctx.canvas.height}, {numPoints:100});
  line.draw(ctx);
}

exports.draw = function() {

}

function background(color){
  ctx.fillStyle = color;
  ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
}