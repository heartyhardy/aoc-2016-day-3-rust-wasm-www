import { TriangleSolver } from "squares-with-sides";
import { memory } from "squares-with-sides/squares_with_sides_aocd3_bg";

const triangle_solver = TriangleSolver.new();
const count = triangle_solver.count_triangles_horizontally();

const sidesPtr = triangle_solver.get_solved();
const arrsize = triangle_solver.get_size();
const sides = new Int32Array(memory.buffer, sidesPtr, arrsize);

var canvas = document.querySelector("#aoc-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

let i = 2;
const renderLoop = () => {
  if (i >= sides.length) {
    i = 2;
  }

  drawTriangles(i);
  setTimeout(() => {
    setTimeout(() => {
      requestAnimationFrame(renderLoop);
      //ctx.clearRect(0, 0, canvas.width, canvas.height);
      i += 2;
    }, 100);
  }, 100);
};

const drawTriangles = i => {
  if ((i + 1) % 3 == 0) {
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.lineTo(sides[i] / 2, sides[i - 1] / 2);
    ctx.lineTo(sides[i - 1] / 2, sides[i - 2] / 2);
    ctx.closePath();
    
    ctx.shadowColor = "rgba(76,96,100,.5)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    
    
    // the fill color
    var gradient = ctx.createLinearGradient(
        150,
        150,
        sides[i - 1] / 2,
        sides[i - 2] / 2
        );
        gradient.addColorStop(0.0, "gold");
        gradient.addColorStop(0.5, "cyan");
        gradient.addColorStop(0.75, "DEEPPINK");
        gradient.addColorStop(1, "REBECCAPURPLE");
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.strokeStyle = "PALEGOLDENROD";
        ctx.stroke();
    }
};

renderLoop();
