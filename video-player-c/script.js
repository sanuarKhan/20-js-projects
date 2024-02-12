const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
console.log(stop)

//all functions

// play & pause video

const toggleVideoStatus = () =>{
    if(video.paused){
        video.play();
    } else{
        video.pause()
    }
}
// update play Icon

const updatePlayIcon = () =>{
    if(video.paused){
        play.innerHTML = '<i class="fa fa-play fa-2x">'
    } else{
        play.innerHTML = '<i class="fa fa-pause fa-2x">'
    }
}
// update progress and timestamp

const updateProgress = () =>{
    progress.value = (video.currentTime / video.duration)* 100;
//Get minutes
let mins = Math.floor(video.currentTime / 60);
if(mins < 10){
    mins = '0' + String(mins);
}

//Get seconds 
let secs = Math.floor(video.currentTime % 60);
if(secs < 10){
    secs = '0' + String(secs);
}

timestamp.innerHTML = `${mins} : ${secs}`;
}



// stop video

const stopVideo = () =>{
    video.currentTime = 0;
    video.pause();
}

// set video progress to time
const setVideoProgress = () =>{
    video.currentTime = (+progress.value * video.duration) /100;
}


// events listenners

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);