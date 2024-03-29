
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// list words for the game

const words = [
    "the",
    "be",
    "to",
    "of",
    "and",
    "a",
    "in",
    "that",
    "have",
    "I",
    "it",
    "for",
    "not",
    "on",
    "with",
    "he",
    "as",
    "you",
    "do",
    "at",
    "this",
    "but",
    "his",
    "by",
]



//init ramdomWord
let randomWord;

//init score
let score = 0;

//init time 
let time = 10;

// init difficulty and set to value in is or medium

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// set difficulty select value

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';


// // Focus on text on start
text.focus();


// Generate random word
const getRandomWord = ()=>{
    return words[Math.floor(Math.random()* words.length)];
}

  
// // add word to DOM 

const addWordToDOM = () =>{
    randomWord = getRandomWord();
    word.innerHTML = randomWord;

}


// update score

const updateScore = ()=>{
    score += 5;
    scoreEl.innerHTML = score;
}

// update Time

const updateTime = ()=>{
    time--
   timeEl.innerHTML = time + 's';

   if(time === 0){
    clearInterval(timeInterval);
    //end game
    gameOver()
   }

}

   //Start counting down
 const timeInterval = setInterval(updateTime, 1000);

addWordToDOM();



// // Game over, show end screen

const gameOver = ()=>{
    endgameEl.innerHTML = `
<h1> time ran out </h1>
<p> Your final score is ${score}</p>
<button onclick="location.reload()"> Again</button>`;

endgameEl.style.display = 'flex';
}


 // event controler

// typing
 text.addEventListener('input', e=>{
    const insertedText = e.target.value;

    if(insertedText === randomWord){
        addWordToDOM();
        updateScore()

        // clear
        e.target.value = '';

        if(difficulty === 'hard'){
            time +=2;
        } else if(difficulty === 'medium'){
            time +=3;
        } else{
            time +=5;
        }
        updateTime()
    }
    
 })

 // setting btn click
 settingsBtn.addEventListener('click', ()=> settings.classList.toggle('hide'));

 // Settings select

 settingForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
 } )




   
   



