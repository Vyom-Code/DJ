song="";
leftWristX =0;
rightWristY =0;
leftWristX =0;
rightWristY=0;
score1=0;
score2=0;
function preload(){
song=loadSound("music.mp3");

}
function setup(){
    canvas = createCanvas(850, 600);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('PoseNet is Initialized');
    
}
function draw(){
    image(video, 0, 0, 850,600);

    fill("#FF0000");
    stroke("#FF0000");

    if(score2 >0.2){
circle(rightWristX, rightWristY, 20);

if(rightWristY> 0 && rightWristY <= 100)
{
    document.getElementById("speed").innerHTML= "Speed = 0.5x";
    song.rate(0.5);
}

else if(rightWristY>100 && rightWristY <= 200){
    document.getElementById("speed").innerHTML ="Speed = 1x";
    song.rate(1);
}

else if(rightWristY>200 && rightWristY <=300){
    document.getElementById("speed").innerHTML ="Speed = 1.5x";
    song.rate(1.5);
}

else if(rightWristY>300 && rightWristY<=400){
    document.getElementById("Speed").innerHTML ="Speed = 2x";
    song.rate(2);
}
else if(rightWristY> 400 && rightWristY<=500){
    document.getElementById("Speed").innerHTML="Speed = 2.5x";
    song.rate(2.5);
}
 }

    if(score1 > 0.2)
    {
    circle(leftWristX, LeftWristY, 20);
    InNumberLeftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberLeftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume ="+volume;
    song.setVolume(volume);
    }
}
function play(){
song.play();
song.setVolume(1);
song.rate(1);
}

function gotPoses(results){
    if(results.length >0){
        console.log(results);
        score1 = results[0].pose.keypoints[9].score; 
        score2 = results[0].pose.keypoints[10].score
        console.log("scoreLeftWristX =" +score1);
        console.log("scoreRightWristX ="+score2);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX ="+ leftWristX+" leftWristY ="+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX ="+rightWristX+ "RightWristY =" +rightWristY);
    }
}
