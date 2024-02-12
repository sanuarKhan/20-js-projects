const movie = document.getElementById('movie');
const container = document.querySelector('.container');
const seats = document.querySelectorAll(".row .seat:not(occupied)");
const count = document.getElementById('count');
const total = document.getElementById('total');
let ticketPrice = +movie.value;

populateUI();

// save selected movie Index and Price

const selectedMovieData = (movieIndex, moviePrice) =>{
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//seats and price updated function 

const updatedSelectedCount= () =>{
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // selected seat index localstiorage
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSteats' , JSON.stringify(seatsIndex))


    const selectedSeatCount = selectedSeats.length;

    count.innerText = selectedSeatCount;
    total.innerText = selectedSeatCount * ticketPrice;
}
//get Data form localStorage and populateUI

function populateUI(){
    const selectedSteats =JSON.parse(localStorage.getItem('selectedSteats'));
    if(selectedSteats !== null & selectedSteats.length >0){
        seats.forEach((seat,index) =>{
            if(selectedSteats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })

    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movie.selectedIndex = selectedMovieIndex;
    }
}

//movie select event

movie.addEventListener('change', (e) =>{
    ticketPrice = +e.target.value
    selectedMovieData(e.target.selectedIndex, e.target.value)
    updatedSelectedCount();

})
    
//seats click event 
container.addEventListener('click', e =>{
    if(
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ){
        e.target.classList.toggle('selected')
        updatedSelectedCount();
    }
    
})

// initial count and total set
updatedSelectedCount();