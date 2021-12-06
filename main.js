sound = "";
leftWristX = "";
leftWristY = "";

rightWristX = "";
rightWristY = "";

volume = "";
speed = "";

leftWristScore = "";
rightWristScore = "";

function preload(){
sound = loadSound("music.mp3");
}
function setup(){

canvas = createCanvas(1800,700);
canvas.position(50,200);

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on('pose', gotPoses);
}

function gotPoses(results){
if(results[0] == null){
    console.error("no data")
}else{
    // console.log(results);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log(leftHandX,leftHandY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log(rightHandX,rightHandY);

    leftWristScore = results[0].pose.keypoints[10].score;
    rightWristScore = results[0].poseNet.keypoints[9].score;
}
}

function modelLoaded(){
    console.log("Model loaded");

}


function draw(){
    
image(video,0,0, 1800,700);
fill(255,0,0);
stroke(0,255,0);
strokeWeight(5);

if(leftWristScore > 0.2){
    square(leftWristX,leftWristY,50);
    numberleftWristX = Number(leftWristX);
    volume = numberleftWristX/350;
    volumeFloored = Math.floor(volume);
    sound.setVolume(volumeFloored);
    console.log(volumeFloored);

}



size1 = Math.random() * 100;
size2 = Math.random() * 100;
frameRate(60);
for(i = 0; i < size1; i++){
    arc(200, 200, 200, 200, 0, volumeFloored, PIE);

}
for(i = 0; i < size1; i++){
    arc(1600, 200, 200, 200, 0, size2, CHORD);

}
}

function playSound(){
    sound.play();
    sound.rate(1);
    sound.setVolume(10000000000000);
    
}
function stopSound(){
    sound.stop();

}