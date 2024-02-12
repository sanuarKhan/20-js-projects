const currencyEL_one = document.getElementById('currency-one');
const amountEL_one = document.getElementById('amount-one');
const currencyEL_two = document.getElementById('currency-two');
const amountEL_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap= document.getElementById('swap');

// Fetch exchange rates and update the DOM

function calculate(){
    const currency_one = currencyEL_one.value;
    const currency_two = currencyEL_two.value;

    fetch(`https://open.exchangerate-api.com/v6/latest/${currency_one}`)
    .then( res => res.json())
    .then(data =>{
        console.log(data);
        
        const rate = data.rates[currency_two];
    }
    )
}

// Even listeners 

currencyEL_one.addEventListener('change', calculate);
amountEL_one.addEventListener('input', calculate);
currencyEL_two.addEventListener('change', calculate);
amountEL_two.addEventListener('input', calculate);
