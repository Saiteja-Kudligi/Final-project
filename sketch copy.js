let faceapi;
let Video = [];

let video;
let canvas1;
let canvas2;
let canvas3;
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
  
  // canvas1 = createCanvas(640, 480);
  // canvas1.id("canvas1"); 

  canvas2 = createCanvas(640, 480);
  canvas2.id("canvas2");
  

  video = createCapture(VIDEO);
  video.size(width,height);
  video.position(windowWidth/3.5,120)


  button = createButton('Click me to toggle video');
  button.position(680, 640);
  button.mousePressed(toggleVideoCanvas);

  const faceOptions = {
    expressions: true,
    minConfidence: 0.5
  };

  faceapi = ml5.faceApi(video, faceOptions, ready);
  faceapi.detect(myVideo);
  
}


function drawCam(Video){

  Expressions(Video);
  function Expressions(Video) {
    if (Video.length > 0) {
      let { neutral, happy, angry, sad, surprised } = Video[0].expressions;
  
      textFont('Roboto');
      textSize(18);
      fill("White");
      noStroke();
  
  
      text("neutral: " + round(neutral * 100) + "%", width / 2, height - 100);
      
      if(happy>=0.7){
       
        image(happyEmoji, 20,20,100,100);
      }
  
      if(angry>=0.3){
        
        image(angryEmoji, 20,20,100,100);
      }
  
      if(surprised>=0.4){
        
        image(surpriseEmoji, 20,20,100,100);
      }
  
      if(sad>=0.5){
      
        image(sadEmoji, 20,20,100,100);
      }  
  
    }
  }

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
  drawCam(Video);
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

