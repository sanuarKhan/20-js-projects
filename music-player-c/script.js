const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');


//songs titles

const songs = ['DAAK-DIYA','DIL-KI', 'GAARIR-OYSHEE', 'She-Move-It-Like']

// keep track of song

let songIndex = 1;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song){
    console.log(song)
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `img/${song}.jpg`

}

//play song

function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

//pause song

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// previous song
function previousSong(){
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
// next song
function nextSong(){
    songIndex++
    if(songIndex > songs.length -1 ){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update progress bar

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressParcent = (currentTime/duration)* 100;
    progress.style.width = `${progressParcent}%`;
}

// set Progress bar

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    console.log(clickX);
    const duration = audio.duration;
    audio.currentTime = (clickX/width) * duration;
}


// Event listeners

playBtn.addEventListener('click', ()=>{
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong();
    } else{
        playSong();
    }
})

// change song

prevBtn.addEventListener('click', previousSong)
nextBtn.addEventListener('click', previousSong)

// time/song update
audio.addEventListener('timeupdate', updateProgress);

//click progress bar
progressContainer.addEventListener('click', setProgress);

// song ends
audio.addEventListener('ended', nextSong);



