//board setup
let board;
let boardWidth = 738; //just according to the width of the p tag
let boardHeight = 200;
let context;


// dino
let dinoWidth = 88 / 1.5;
let dinoHeight = 94 / 1.5;
let dinoY = boardHeight - dinoHeight;
let dinoX = 20;
let dinoImg;
let dinorun1Img;
let dinorun2Img;
let dinoDeadImg;
let dinoImages = [];
let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight
}

//dino duck
let dinoDuck1Img;
let dinoDuck2Img;
let dinoDuckWidth = 116 / 2.5;
let dinoDuckHeight = 10 / 3;
let dinoDuckImges = [];
let dinoDuck = {
    width: dinoDuckWidth,
    height: dinoDuckHeight
}

// cactus
let cactusHeight = 70 / 1.5;
let bigCactusHeight = 100 / 1.7;
let cactusX = boardWidth;
let cactusY = boardHeight - cactusHeight;
let bigCactusY = boardHeight - bigCactusHeight;
let cactus1Img;
let cactus2Img;
let cactus3Img;
let bigCactus1Img;
let bigCactus2Img;
let cactus1Width = 34 / 1.5;
let cactus2Width = 69 / 1.5;
let cactus3Width = 102 / 1.5;
let bigCactus1Width = 103 / 1.5;
let bigCactus2Width = 150 / 1.5;
let cactusOrBirds = [];

//bird
let bird1Img;
let bird2Img;
let birdWidth = 93 / 1.5;
let birdHeight = 62 / 1.5;
let birdImges = [];
let birdX = boardWidth;

// track
let trackImg;
let trackWidth = 2370;
let trackHeight = 28;
let trackX = 0;
let trackY = boardHeight - trackHeight;
let track = {
    x: trackX,
    y: trackY,
    width: trackWidth,
    height: trackHeight
}

// cloud
let cloudImg;
let cloudWidth = 70;
let cloudHeight = 101;
let cloudX = boardWidth;
let cloudY = boardHeight / 2;
let cloudArry = [];

//gameoverimg
let gameOverImg;
let gameOverImgWidth = 200;
let gameOverImgHeight = 30;

//playBtnImg
let playBtnImg;
let playBtnImgWidth = 40;
let playBtnImgHeight = 40;

//score
let score = 0;
let a = 100;
let multiple = 0;
let delay = 400;

//physics
let velocityX = -8;
let velocityY = 0;
let gravity = .7;

//booleans
let key = false;
let gameStarted = false;
let gameOver = false;
let duckling = false;

//gameSound
let gameoverSound = new Audio("images/deadSound.mp3");
let scoreSound = new Audio("images/scoreSound.mp3");
let jumpSound = new Audio("images/jumpSound.mp3");

//gamestart from here
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

    // dino img 
    dinoImg = new Image();
    dinoImg.src = "images/dino.png";
    dinoImg.onload = function () {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    //dino run1 and run2 img load and pushing to array
    dinorun1Img = new Image();
    dinorun1Img.src = "images/dino-run1.png";
    dinoImages.push(dinorun1Img);

    dinorun2Img = new Image();
    dinorun2Img.src = "images/dino-run2.png";
    dinoImages.push(dinorun2Img);

    //dino dukc imges load
    dinoDuck1Img = new Image();
    dinoDuck1Img.src = "images/dino-duck1.png";
    dinoDuckImges.push(dinoDuck1Img);

    dinoDuck2Img = new Image();
    dinoDuck2Img.src = "images/dino-duck2.png";
    dinoDuckImges.push(dinoDuck2Img);

    // track img dislay;
    trackImg = new Image();
    trackImg.src = "images/track.png";
    trackImg.onload = function () {
        context.drawImage(trackImg, dino.x, track.y, dino.width, track.height);
    }

    // cactus imgs load
    cactus1Img = new Image();
    cactus1Img.src = "images/cactus1.png";

    cactus2Img = new Image();
    cactus2Img.src = "images/cactus2.png";

    cactus3Img = new Image();
    cactus3Img.src = "images/cactus3.png";

    bigCactus1Img = new Image();
    bigCactus1Img.src = "images/big-cactus2.png";

    bigCactus2Img = new Image();
    bigCactus2Img.src = "images/big-cactus3.png";

    // cloud img load
    cloudImg = new Image();
    cloudImg.src = "images/cloud.png";

    //bird img
    bird1Img = new Image();
    bird1Img.src = "images/bird1.png";
    birdImges.push(bird1Img);

    bird2Img = new Image();
    bird2Img.src = "images/bird2.png";
    birdImges.push(bird2Img);

    //set up for loop and continuation
    document.addEventListener("keydown", dinoJump);
    document.addEventListener("keyup", releaseKey);
    document.addEventListener("keydown", startGame);
}

//when key is prssed game will start fn
function startGame(e) {
    if (!gameStarted && (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyX")) {
        gameStarted = true;
        requestAnimationFrame(update);
        setInterval(placeCloud, 1000);
        placeCactusOrBirds();
        setInterval(scoreIncrease, 100);
    }
}

//main update fn
function update(timestamp) {

    requestAnimationFrame(update);

    if (gameOver) {
        //dino dead img show up
        dinoDeadImg = new Image();
        dinoDeadImg.src = "images/dino-dead.png";
        dinoDeadImg.onload = function () {
            context.drawImage(dinoDeadImg, dino.x, dino.y, dino.width, dino.height);
        }

        //gameover and playbtn showup
        gameOverImg = new Image();
        gameOverImg.src = "images/game-over.png";
        gameOverImg.onload = function () {
            context.drawImage(gameOverImg, board.width / 2.5, board.height / 3.7, gameOverImgWidth, gameOverImgHeight);
        }

        playBtnImg = new Image();
        playBtnImg.src = "images/reset.png";
        playBtnImg.onload = function () {
            context.drawImage(playBtnImg, board.width / 2, board.height / 2.3, playBtnImgWidth, playBtnImgHeight);
        }

        return;
    }

    //clear frame
    context.clearRect(0, 0, board.width, board.height);

    // cactus and birds movement
    for (let i = 0; i < cactusOrBirds.length; i++) {
        let birdcactii = cactusOrBirds[i];
        birdcactii.x += velocityX;
        if (birdcactii.width === 93 / 1.5) {
            const frameIndex = Math.floor(timestamp / 100) % birdImges.length;
            context.drawImage(birdcactii.img[frameIndex], birdcactii.x, birdcactii.y, birdcactii.width, birdcactii.height);
        }
        else {
            context.drawImage(birdcactii.img, birdcactii.x, birdcactii.y, birdcactii.width, birdcactii.height);
        }

        if (detectCollision(dino, birdcactii)) {
            gameOver = true;
            gameoverSound.play();
        }
    }

    //for dino images
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY);
    if (key) {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }
    else if (duckling) {
        if (gameOver) {
            dinoDuck.width = 0;
        }
        const frameIndex = Math.floor(timestamp / 100) % dinoDuckImges.length;
        context.drawImage(dinoDuckImges[frameIndex], dino.x, dino.y, dinoDuck.width, dino.height);
    }
    else {
        const frameIndex = Math.floor(timestamp / 100) % dinoImages.length;
        context.drawImage(dinoImages[frameIndex], dino.x, dino.y, dino.width, dino.height);
    }

    // track movement
    track.x += velocityX;
    if (track.x < (-2 * boardWidth)) {
        track.x = 0;
    }
    context.drawImage(trackImg, track.x, track.y, track.width, track.height);


    // cloud movement
    for (let i = 0; i < cloudArry.length; i++) {
        let cloud = cloudArry[i];
        cloud.x += velocityX;
        context.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
    }

    //score 
    context.fillStyle = "black";
    context.font = "17px courier";
    context.fillText(`Score 000${score}`, boardWidth - 150, 30);

    if (score === a) {
        multiple++;
        a += 100 * multiple;
        scoreSound.play();
        velocityX += -0.6 * multiple;
        delay += -5;
    }
}


function scoreIncrease() {
    score++;
}

//cactusOrBirds fillup
function placeCactusOrBirds() {

    if (gameOver) {
        return;
    }

    const randomDelay = Math.random() * (delay) + 700;

    setTimeout(function () {

        let cactus = {
            img: null,
            x: cactusX,
            y: null,
            width: null,
            height: null
        };

        // Choose a random cactus image
        let randomCactus = Math.random();
        if (randomCactus > 0.80) {
            cactus.img = cactus3Img;
            cactus.y = cactusY;
            cactus.width = cactus3Width;
            cactus.height = cactusHeight;
        } else if (randomCactus > 0.60) {
            cactus.img = cactus2Img;
            cactus.width = cactus2Width;
            cactus.y = cactusY;
            cactus.height = cactusHeight;
        } else if (randomCactus > 0.40) {
            cactus.img = cactus1Img;
            cactus.width = cactus1Width;
            cactus.y = cactusY;
            cactus.height = cactusHeight;
        } else if (randomCactus > 0.20) {
            cactus.img = bigCactus1Img;
            cactus.width = bigCactus1Width;
            cactus.y = bigCactusY;
            cactus.height = bigCactusHeight;
        } else {
            cactus.img = bigCactus2Img;
            cactus.width = bigCactus2Width;
            cactus.y = bigCactusY;
            cactus.height = bigCactusHeight;
        }

        //chose random y position for bird
        let randomBirdY = Math.random() * boardHeight/1.5 + 10;

        let bird = {
            img: birdImges,
            x: birdX,
            y: randomBirdY,
            width: birdWidth,
            height: birdHeight
        }

        let birdOrCactus = Math.random();
 
        if (birdOrCactus > 0.60 && score > 350) {
            cactusOrBirds.push(bird);
        }
        else {
            cactusOrBirds.push(cactus);
        }

        if (cactusOrBirds.length > 12) {
            cactusOrBirds.shift(); //remove the first element from the array so that the array doesn't constantly grow
        }

        placeCactusOrBirds(); // Schedule the next cactus placement
    }, randomDelay);
}

//cloud fn
function placeCloud() {

    if (gameOver) {
        return;
    }

    let randomCloudY = Math.random() * boardHeight / 3.5 + 10;

    let cloud = {
        img: cloudImg,
        x: cloudX,
        y: randomCloudY,
        width: cloudWidth,
        height: cloudHeight
    }

    cloudArry.push(cloud);

    if (cloudArry.length > 10) {
        cloudArry.shift(); //remove the first element from the array so that the array doesn't constantly grow
    }
}


//dino jump fn
function dinoJump(e) {

    if ((e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") && dino.y == dinoY) {
        key = true;
        velocityY = -13;
        jumpSound.play();
    }

    if (e.code == "ArrowDown" && dino.y == dinoY) {
        duckling = true;
    }
}


//when key gets released
function releaseKey(e) {
    if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyX") {
        setTimeout(() => {
            key = false;
        }, 200);

        if (gameOver) {
            multiple = 0;
            a = 100;
            dino.y = dinoY;
            score = 0;
            gameOver = false;
            cactusOrBirds = [];
            placeCactusOrBirds();
            velocityX = -8
            delay = 400;
        }
    }

    if (e.code == "ArrowDown") {
        duckling = false;
        if (gameOver) {
            dinoDuck.width = dinoDuckWidth;
        }
    }

}

//for collision detection 
function detectCollision(a, b) {
    const overlapThreshold = -10;
    if (a.x + a.width + overlapThreshold > b.x && a.x < b.x + b.width + overlapThreshold && a.y + a.height + overlapThreshold > b.y && a.y < b.y + b.height + overlapThreshold) {
        return true;
    }
    return false;
    //this is my logic bt i dont know why it wasnt working i have to clarify this     
    // if((a.x+a.width === b.x) || (a.x === b.x+b.width) || (a.y + a.height === b.y)){
    //     return true;
    // }
}