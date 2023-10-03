import { handleCircleCollision } from './physics';
import './style.css';

type Ball = {
  radius: number,
  x: number,
  y: number,
  vx: number,
  vy: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number,
};

const balls: Ball[] = [
  {
    radius: 50,
    x: 400,
    y: 300,
    vx: 0,
    vy: 20,
    fillColor: 'yellow',
    strokeColor: 'orange',
    strokeWidth: 7,
  }
];

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
const context = canvas.getContext('2d')!;
document.querySelector('#app')!.append(canvas);

let W: boolean = false;
let A: boolean = false;
let S: boolean = false;
let D: boolean = false;

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

function onKeyDown(e: any) {
    let ball = balls[0];
    if(e.key == "w" && ball.vy >= -0.5) {
        W = true;
        console.log("w")
    };

    if(e.key == "a") {
        A = true;
    };

    if(e.key == "s") {
        S = true;
    };

    if(e.key == "d") {
        D = true;
    };

    if(e.key == "r") {
        balls.length = 0;
        document.querySelector('#app')!.append('');
         // add the balls back into the array
        balls.push(
            {
            radius: 50,
            x: 400,
            y: 300,
            vx: 0,
            vy: 10,
            fillColor: 'yellow',
            strokeColor: 'orange',
            strokeWidth: 7,
            }
        )
    }
}

function onKeyUp(e: any) {
    if(e.key == "w") {
        W = false;
    };

    if(e.key == "a") {
        A = false;
    };

    if(e.key == "s") {
        S = false;
    };

    if(e.key == "d") {
        D = false;
    };
}

function update() {
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    
    ball.vy = ball.vy + 0.8;
    ball.x += ball.vx;
    ball.y += ball.vy;

    if(W) {
        context.fillRect(0, ball.y -= 10, 0, 0);
    };

    if(A) {
        context.fillRect(ball.x -= 6, 0, 0, 0);
    };

    if(S) {
        context.fillRect(0, ball.y += 6, 0, 0);
    };

    if(D) {
        context.fillRect(ball.x += 6, 0, 0, 0);
    };

    // Check right edge collision
    if (ball.x + ball.radius >= canvas.width) {
        ball.x = canvas.width - ball.radius;
      }
  
      // Check left edge collision
      if (ball.x - ball.radius <= 0) {
        ball.x = ball.radius
      }

    // Check top edge collision
    if (ball.y - ball.radius <= 0) {
      ball.vy = -ball.vy - 2;
      ball.y = ball.radius;
    }

    // Check bottom edge collision
    if (ball.y + ball.radius >= canvas.height) {
      ball.vy *= -0.8;
      ball.y = canvas.height - ball.radius;
    }

    for (let j = i + 1; j < balls.length; j++) {
      handleCircleCollision(ball, balls[j]);
    }
  }
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (const ball of balls) {
    drawCircle(
      ball.x,
      ball.y,
      ball.radius,
      ball.fillColor,
      ball.strokeColor,
      ball.strokeWidth
    );
  }
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  update();
  render();
}

gameLoop();

function drawCircle(
  x: number,
  y: number,
  radius: number,
  fillColor: string,
  strokeColor: string,
  strokeWidth: number
) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);

  context.fillStyle = fillColor;
  context.fill();

  context.lineWidth = strokeWidth;
  context.strokeStyle = strokeColor;
  context.stroke();
}