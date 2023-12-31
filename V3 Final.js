let faceapi;
let Video = [];
let emotions = [];
let characters = [];

let video;
let canvas;
let button;
let videoActive = true;

let angryEmoji;
let sadEmoji;
let happyEmoji;
let surpriseEmoji;

let emoji_sad, emoji_happy, emoji_surprise, emoji_angry, emoji_neutral;
let rat_sad, rat_happy, rat_surprise, rat_angry, rat_neutral;
let cat_sad, cat_happy, cat_surprise, cat_angry, cat_neutral;
let dog_sad, dog_happy, dog_surprise, dog_angry, dog_neutral;

let emotionsLabels = ["sad", "happy", "surprise", "angry", "neutral"];
let selectedCharacter = "cat";

let characterDropdown;

function preload() {

  emoji_sad = loadImage("assets/sad.png");
  emoji_happy = loadImage("assets/happy.png");
  emoji_surprise = loadImage("assets/surprise.png");
  emoji_angry = loadImage("assets/angry.png");
  emoji_neutral = loadImage("assets/neutral.png");

  rat_sad = loadImage("assets/rat_sad.png");
  rat_happy = loadImage("assets/rat_happy.png");
  rat_surprise = loadImage("assets/rat_surprise.png");
  rat_angry = loadImage("assets/rat_angry.png");
  rat_neutral = loadImage("assets/rat_neutral.png");

  cat_sad = loadImage("assets/cat_sad.png");
  cat_happy = loadImage("assets/cat_happy.png");
  cat_surprise = loadImage("assets/cat_surprise.png");
  cat_angry = loadImage("assets/cat_angry.png");
  cat_neutral = loadImage("assets/cat_neutral.png");

  dog_sad = loadImage("assets/dog_sad.png");
  dog_happy = loadImage("assets/dog_happy.png");
  dog_surprise = loadImage("assets/dog_surprise.png");
  dog_angry = loadImage("assets/dog_angry.png");
  dog_neutral = loadImage("assets/dog_neutral.png");

  emotions = [
    [emoji_sad, emoji_happy, emoji_surprise, emoji_angry, emoji_neutral],
    [rat_sad, rat_happy, rat_surprise, rat_angry, rat_neutral],
    [cat_sad, cat_happy, cat_surprise, cat_angry, cat_neutral],
    [dog_sad, dog_happy, dog_surprise, dog_angry, dog_neutral],
  ];

  characters = ["emoji", "rat", "cat", "dog"];
}

function setup() {
  canvas = createCanvas(720, 480);
  canvas.id("canvas");

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.position(windowWidth / 3.5, 130);

  button = createButton("Click me to toggle video");
  button.position(width, height * 1.3);
  button.mousePressed(toggleVideoCanvas);
  
  //Dropdown
  characterDropdown = createSelect();
  
  characterDropdown.position(20, 150);
  characterDropdown.option("cat");
  characterDropdown.option("dog");
  characterDropdown.option("emoji");
  characterDropdown.option("rat");
  
  characterDropdown.changed(() => {
    selectedCharacter = characterDropdown.value();
  });

  const faceOptions = {
    expressions: true,
    minConfidence: 0.5,
  };

  faceapi = ml5.faceApi(video, faceOptions, ready);
  faceapi.detect(myVideo);
}

function draw(){
  color("white");
  textSize(14);
  text("Select a character:", 12, 12);
}

function ready() {
  faceapi.detect(myVideo);
  }

function myVideo(error, result) {
  if (error) {
    console.log(error);
    return;
  }

  Video = result;

  clearCanvas();
  // drawBoxes(Video);
  drawCam(Video);
  faceapi.detect(myVideo);
}

function drawCam(Video) {
  Expressions(Video);
  function Expressions(Video) {
    if (Video.length > 0) {
      let { neutral, happy, angry, sad, surprised } = Video[0].expressions;

      if (selectedCharacter == "cat") {
        if (neutral >= 0.9) {
          image(cat_neutral, 20, height/3, 100, 100);
        }
        if (happy >= 0.7) {
          image(cat_happy, 20, height/3, 100, 100);
        }
        if (sad >= 0.5) {
          image(cat_sad, 20, height/3, 100, 100);
        }
        if (surprised >= 0.7) {
          image(cat_surprise, 20, height/3, 100, 100);
        }
        if (angry >= 0.3) {
          image(cat_angry, 20, height/3, 100, 100);
        }
      }

      if (selectedCharacter == "rat") {
        if (neutral >= 0.9) {
          image(rat_neutral, 20, height/3, 100, 100);
        }
        if (happy >= 0.7) {
          image(rat_happy, 20, height/3, 100, 100);
        }
        if (sad >= 0.5) {
          image(rat_sad, 20, height/3, 100, 100);
        }
        if (surprised >= 0.7) {
          image(rat_surprise, 20, height/3, 100, 100);
        }
        if (angry >= 0.3) {
          image(rat_angry, 20, height/3, 100, 100);
        }
      }

      if (selectedCharacter == "dog") {
        if (neutral >= 0.9) {
          image(dog_neutral, 20, height/3, 100, 100);
        }
        if (happy >= 0.7) {
          image(dog_happy, 20, height/3, 100, 100);
        }
        if (sad >= 0.5) {
          image(dog_sad, 20, height/3, 100, 100);
        }
        if (surprised >= 0.7) {
          image(dog_surprise, 20, height/3, 100, 100);
        }
        if (angry >= 0.3) {
          image(dog_angry, 20, height/3, 100, 100);
        }
      }

      if (selectedCharacter == "emoji") {
        if (neutral >= 0.7) {
          image(emoji_neutral, 20, height/3, 100, 100);
        }
        if (happy >= 0.7) {
          image(emoji_happy, 20, height/3, 100, 100);
        }
        if (sad >= 0.5) {
          image(emoji_sad, 20, height/3, 100, 100);
        }
        if (surprised >= 0.7) {
          image(emoji_surprise, 20, height/3, 100, 100);
        }
        if (angry >= 0.3) {
          image(emoji_angry, 20, height/3, 100, 100);
        }
        
      }
    }
  }
}


function toggleVideoCanvas() {
  if (videoActive) {
    video.hide();
  } else {
    video.show();
  }
  videoActive = !videoActive;
}

function clearCanvas() {
  clear();
}



//Code snipped copied from Stack overflow. It's not part of a main code. 
//It's just a part of experiment to design responsive canvas

initialize();
function initialize() {
  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas();
}
function resizeCanvas() {
  htmlCanvas.width = window.innerWidth;
  htmlCanvas.height = window.innerHeight;
  redraw();
}