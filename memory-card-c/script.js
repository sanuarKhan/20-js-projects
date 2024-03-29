const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn= document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl= document.getElementById('question');
const answerEl= document.getElementById('answer');
const addCardBtn= document.getElementById('add-card');
const clearBtn= document.getElementById('clear');
const addContainer= document.getElementById('add-container');

// track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

//Store card data

const cardsData = getCardsData();

// const cardsData = [
// {
// question: 'What is life?',
// answer: ' A process of searching the meaning of what you are.'
// },
// {
// question: 'What is success?',
// answer: 'Succes is a binary value which depends on the thing whether it goes with you or not'
// },
// {
// question: 'What is happiness?',
// answer: 'Happiness is a state of mind which molds through the owner\'s thoughts.'
// },
// ]

// create all cards

const  createCards = ()=> {
cardsData.forEach((data,index) => createCard(data,index));
}

// create a single card in DOM 

const createCard = (data, index) =>{
const card = document.createElement('div');
card.classList.add('card');

if( index === 0){
card.classList.add('active');
}
card.innerHTML = `
   <div class="inner-card">
     <div class="inner-card-front">
      <p>
		${data.question}
	  </p>
        </div>
        <div class="inner-card-back">
		<p>
		${data.answer}
		</p>
    </div>
	</div>`;

card.addEventListener('click', () => card.classList.toggle('show-answer'));


//Add to DOM cards
cardsEl.push(card)

cardsContainer.appendChild(card);
updateCurrentText()
}
// Show number of cards
const updateCurrentText = () =>{
    currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}


//get cards from local storage

function  getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
    }
// add to local storage

const  setCardsData = (cards) =>{
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
    }

createCards()



// Event listener

// Next button

nextBtn.addEventListener('click', () =>{

    cardsEl[currentActiveCard].className = 'card left';
    currentActiveCard = currentActiveCard + 1;
    if(currentActiveCard > cardsEl.length - 1){
    currentActiveCard = cardsEl.length -1;
    }
    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
    });

// Prev button

prevBtn.addEventListener('click', () =>{
    cardsEl[currentActiveCard].className = 'card right';
    currentActiveCard = currentActiveCard - 1;
        
    if(currentActiveCard < 0){
    currentActiveCard = 0;
     }
        
     cardsEl[currentActiveCard].className = 'card active';
        updateCurrentText();
    });

// Show add container

showBtn.addEventListener('click', ()=>{
    addContainer.classList.add('show');
    });

// hide add container

hideBtn.addEventListener('click', ()=>{
    addContainer.classList.remove('show');
    });

// Show add container

addCardBtn.addEventListener('click', ()=>{
    const question = questionEl.value;
    const answer = answerEl.value;
        
    if(question.trim() && answer.trim()){
    const newCard = {question , answer};
        
    createCard(newCard);
        
    questionEl.value = '';
    answerEl.value = '';
        
    addContainer.classList.remove('show');
        
    cardsData.push(newCard);
    setCardsData(cardsData)
    }
});

// Clear cards button
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
  });

