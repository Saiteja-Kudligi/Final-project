let faceapi;
let Video = [];


let video;
let canvas;

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
  noStroke();
  canvas = createCanvas(720, 640);
  canvas.id("canvas");

  video = createCapture(VIDEO);
  video.id("video");
  video.size(width, height);

  
  const faceOptions = {    
    expressions: true,
    minConfidence: 0.5
  };
  
  faceapi = ml5.faceApi(video, faceOptions, ready);
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

  clear();
  drawBoxs(Video);
  Expressions(Video, 20, 20, 14);
  faceapi.detect(myVideo);
  noStroke();
}

function drawBoxs(Video){
  if (Video.length > 0) {
    for (f=0; f < Video.length; f++){
      let {_x, _y, _width, _height} = Video[f].alignedRect._box;
      stroke("White");
      strokeWeight(1);
      noFill();
      rect(_x, _y, _width, _height);
      
    }
  }
}

function Expressions(Video){
  if(Video.length > 0){
    let {neutral, happy, angry, sad, surprised} = Video[0].expressions;
    textFont('Roboto');
    textSize(18);
    fill("White");
    noStroke();
    
    if(neutral>=0.7){
      text("neutral: " + round(neutral*100)+"%", width/2, height-100);
    }
    

    if(happy>=0.7){
      text("happiness: " + round(happy*100,2,2)+"%", width/2, height-100);
      image(happyEmoji, 0, 0,100, 100);
    }

    if(angry>=0.3){
      text("anger: " + round(angry*100, 2, 2)+"%", width/2, height-100);
      image(angryEmoji, 0, 0,100, 100);
    }

    if(surprised>=0.4){
      text("surprised: " + round(surprised*100, 2, 2)+"%", width/2, height-100);
      image(surpriseEmoji, 0, 0,100, 100);
    }

    if(sad>=0.5){
      text("sad: "+ round(sad*100, 2, 2)+"%", width/2, height-100);
      image(sadEmoji, 0, 0,100, 100);
    }  
  }
}

