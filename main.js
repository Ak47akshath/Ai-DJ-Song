song1 = "";
song2 = "";
song1_status="";
song2_status="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload() {
    song1 = loadSound("peter_pan.mp3");
    song2= loadSound("frozen.mp3");
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Initialized')
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(" rightWristX= " + rightWristX + " |rightWristY= " + rightWristY)

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log(" leftWristX= " + leftWristX + " |leftWristY= " + leftWristY)

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist= " + scoreLeftWrist + ",scoreRightWrist=" + scoreRightWrist)
    }
}



function draw() {
    image(video, 0, 0, 500, 400);
    fill("blue");
    stroke("red");
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    if(scoreRightWrist>0.2){
        circle(rightWristX, rightWristY, 20)
        song2.stop()
        if(song1_status==false){
            song1.play()
            document.getElementById("song").innerHTML="Playing Peter Pan"
        }
    }
    if(scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY, 20)
        song1.stop()
        if(song2_status==false){
            song2.play()
            document.getElementById("song").innerHTML="Playing Frozen"
        }
    }

}



function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause() {
    song.pause();
}

function stop() {
    song.stop();
}