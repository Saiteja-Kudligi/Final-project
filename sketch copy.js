let faceapi;
let Video = [];

let video;
let canvas1;
let canvas2;
let button;
let videoActive = true;

let angryEmoji;
let sadEmoji;
let happyEmoji;
let surpriseEmoji;

function preload() {
  angryEmoji = loadImage('assets/angry.png');
  sadEmoji = loadImage('assets/sad.png');
  happyEmoji = loadImage('assets/happy.png');
  surpriseEmoji = loadImage('assets/surprise.png');
}

function setup() {
  
  canvas1 = createCanvas(640, 480);
  canvas1.id("canvas1");
  canvas1.hide();

  canvas2 = createCanvas(640, 480);
  canvas2.id("canvas2");
  canvas2.hide();
  canvas2.background(0); 

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();


  button = createButton('Click me to toggle video');
  button.position(320, 520);
  button.mousePressed(toggleVideoCanvas);

  const faceOptions = {
    expressions: true,
    minConfidence: 0.5
  };

  faceapi = ml5.faceApi(video, faceOptions, ready);
  faceapi.detect(myVideo);
  
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
  drawBoxes(Video);
  Expressions(Video);
  faceapi.detect(myVideo);

  }

function drawBoxes(Video) {
  if (Video.length > 0) {
    for (let f = 0; f < Video.length; f++) {
      let { _x, _y, _width, _height } = Video[f].alignedRect._box;
      stroke("White");
      strokeWeight(1);
      noFill();
      rect(_x, _y, _width, _height);
    }
  }
}

function Expressions(Video) {
  if (Video.length > 0) {
    let { neutral, happy, angry, sad, surprised } = Video[0].expressions;

    textFont('Roboto');
    textSize(18);
    fill("White");
    noStroke();


    text("neutral: " + round(neutral * 100) + "%", width / 2, height - 100);
    
    if(happy>=0.7){
      text("happiness: " + round(happy*100,2,2)+"%", width/2, height-100);
      image(happyEmoji, 0, 0,height/2, width/2);
    }

    if(angry>=0.3){
      text("anger: " + round(angry*100, 2, 2)+"%", width/2, height-100);
      image(angryEmoji, 0, 0);
    }

    if(surprised>=0.4){
      text("surprised: " + round(surprised*100, 2, 2)+"%", width/2, height-100);
      image(surpriseEmoji, 0, 0);
    }

    if(sad>=0.5){
      text("sad: "+ round(sad*100, 2, 2)+"%", width/2, height-100);
      image(sadEmoji, 0, 0);
    }  

  }
}

function toggleVideoCanvas() {
  if (videoActive) {
    video.hide();
    canvas1.hide();
    canvas2.show();
  } else {
    video.show();
    canvas1.show();
    canvas2.hide();
  }
  videoActive = !videoActive;
}

function clearCanvas() {
  if (!videoActive) {
    clear();
  }
}