const game = document.getElementById("game");
const ctx = game.getContext("2d");

const gameDisplay = {
    width: 800,
    height: 600,
    color: "#000",
    redraw() {
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, this.width, this.height);
    },
}

class player {
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.width = 10;
        this.color = color;
        this.height = 75;
        this.speed = 5;
        this.point = 0;
        this.keys = {
            up: false,
            down: false,
        }
        this.update = function() {
            if(this.keys.up){
                this.y -= this.speed;
            }
            if(this.keys.down){
                this.y += this.speed;
            }
            if (this.y + this.height > gameDisplay.height) {
                this.y = gameDisplay.height - this.height;
            }
            if (this.y < 0) {
                this.y = 0;
            }
        }
        this.draw = function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

const ball = {
    width: 10,
    height: 10,
    x: 395,
    y: 295,
    color: "white",
    direction: [
        Math.floor(Math.random() * 2) == 1, // this is vertical movement, if true go up else down
        Math.floor(Math.random() * 2) == 1, // this is horizontal movement, if true go right else left
    ],
    XSpeed: undefined,
    YSpeed: undefined,
    update() {
        if(this.direction[0]){
            this.y-=this.YSpeed;
        }
        else{
            this.y+=this.YSpeed;
        }
        if(this.direction[1]){
            this.x+=this.XSpeed;
        }
        else{
            this.x-=this.XSpeed;
        }
        if (this.y + this.height > gameDisplay.height) {
            this.y -= this.YSpeed;
            this.direction[0] = true;
        } else if (this.y < 0) {
            this.y += this.YSpeed;
            this.direction[0] = false;
        }
        if (this.x > gameDisplay.width) {
            P1.point++;
            this.x = 395;
            this.y = 295;
            this.direction = [
                Math.floor(Math.random() * 2) == 1,
                Math.floor(Math.random() * 2) == 1,
            ];
            ball.XSpeed = Math.floor(Math.random() * 2) + 4;
            ball.YSpeed = Math.floor(Math.random() * 2) + 4;
        } else if (this.x + this.width < 0) {
            P2.point++;
            this.x = 395;
            this.y = 295;
            this.direction = [
                Math.floor(Math.random() * 2) == 1,
                Math.floor(Math.random() * 2) == 1,
            ];
            ball.XSpeed = Math.floor(Math.random() * 2) + 4;
            ball.YSpeed = Math.floor(Math.random() * 2) + 4;
        }
        if( // vertival check with P1
            (
                this.x <= P1.x + P1.width &&
                this.x >= P1.x
            )
            &&
            (
                this.y >= P1.y &&
                this.y <= P1.y + P1.height
            )
        ){
            this.x += this.XSpeed;
            this.direction[1] = true;
            this.XSpeed *= 1.1;
            this.YSpeed *= 1.1;
        }
        if ( // horizontal bottom check with P1
            (
                this.y <= P1.y + P1.height &&
                this.y >= P1.y
            )
            &&
            (
                this.x >= P1.x &&
                this.x <= P1.x + P1.width
            )
        ) {
            this.y += this.YSpeed;
            this.direction[0] = false;
            this.XSpeed *= 1.1;
            this.YSpeed *= 1.1;
        }
        if ( // horizontal top check with P1
            (
                this.y + this.height >= P1.y &&
                this.y + this.height <= P1.y + P1.height
            )
            &&
            (
                this.x >= P1.x &&
                this.x <= P1.x + P1.width
            )
        ) {
            this.y -= this.YSpeed;
            this.direction[0] = true;
            this.XSpeed *= 1.1;
            this.YSpeed *= 1.1;
        }
        if ( // vertival check with P2
            (
                this.x + this.width <= P2.x + P2.width &&
                this.x + this.width >= P2.x
            )
            &&
            (
                this.y >= P2.y &&
                this.y <= P2.y + P2.height
            )
        ) {
            console.log("hit")
            this.x -= this.XSpeed;
            this.direction[1] = false;
            this.XSpeed *= 1.1;
            this.YSpeed *= 1.1;
        }
        if ( // horizontal bottom check with P2
            (
                this.y <= P2.y + P2.height &&
                this.y >= P2.y
            )
            &&
            (
                this.x >= P2.x &&
                this.x <= P2.x + P2.width
            )
        ) {
            this.y += this.YSpeed;
            this.direction[0] = false;
            this.XSpeed *= 1.1;
            this.YSpeed *= 1.1;
        }
        if ( // horizontal top check with P2
            (
                this.y + this.height >= P2.y &&
                this.y + this.height <= P2.y + P2.height
            )
            &&
            (
                this.x >= P2.x &&
                this.x <= P2.x + P2.width
            )
        ) {
            this.y -= this.YSpeed;
            this.direction[0] = true;
            this.XSpeed *= 1.1;
            this.YSpeed *= 1.1;
        }
    },
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const P1 = new player(50, 262.5, "white");
const P2 = new player(740, 262.5, "white");

addEventListener("keydown", function (event) {
    switch (event.code) {
        case "KeyW":
            P1.keys.up = true;
            break;
        case "KeyS":
            P1.keys.down = true;
            break;
        case "ArrowUp":
            P2.keys.up = true;
            break;
        case "ArrowDown":
            P2.keys.down = true;
            break;
    }
})
addEventListener("keyup", function (event) {
    switch (event.code) {
        case "KeyW":
            P1.keys.up = false;
            break;
        case "KeyS":
            P1.keys.down = false;
            break;
        case "ArrowUp":
            P2.keys.up = false;
            break;
        case "ArrowDown":
            P2.keys.down = false;
            break;
    }
})

function drawPoints() {
    ctx.font = "50px Arial";
    ctx.fillStyle = "white";
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillText(P1.point, 150, 30);
    ctx.font = "50px Arial";
    ctx.fillStyle = "white";
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillText(P2.point, 640, 30);
}

function init() {
    gameDisplay.redraw();
    ball.XSpeed = Math.floor(Math.random() * 2) + 4;
    ball.YSpeed = Math.floor(Math.random() * 2) + 4;
    P1.draw();
    P2.draw();
    ball.draw();
    drawPoints();
    update();
}

function update() {
    gameDisplay.redraw();
    P1.update();
    P2.update();
    P1.draw();
    P2.draw();
    ball.draw();
    ball.update();
    drawPoints();
    requestAnimationFrame(update);
}

window.onload = init();