const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaresBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-waelth');

let data = [];

getRandomUser();
getRandomUser();

//Fetch random user and add money

async function getRandomUser() {
    const res = await fetch('https:randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

// double money function

const doubleMoney = () =>{
     data = data.map((user) =>{
return {...user, money: user.money * 2}
    })

    updateDOM();
}

// sort money by richest

const sortByRichest = () =>{
     data.sort((a,b)=> b.money - a.money);
    updateDOM();
}
// filtrt only millionaires

const showMillinaires = () => {
    data = data.filter( user => user.money > 1000000);
    updateDOM();
}

// Calculate total money 

const calculateWealth = () =>{
   const wealth = data.reduce((accVal , user )=> (accVal += user.money),0);

   const wealthEl = document.createElement('div');
   wealthEl.innerHTML = `<h3> Total Wealth : <strong> ${formatMoney(wealth)}</strong></h3>`
   main.appendChild(wealthEl);
   console.log(wealthEl);
}
// add new obj to data arr

function addData(obj){
    data.push(obj);
    updateDOM();
}

// Update DOM

function updateDOM(providedData = data){
    // clear main div

    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item =>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    })
}

// format number as Money

function formatMoney(number){
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

}

// event listenner

addUserBtn.addEventListener('click' , getRandomUser)
doubleBtn.addEventListener('click' , doubleMoney)
sortBtn.addEventListener('click' , sortByRichest)
showMillionaresBtn.addEventListener('click' , showMillinaires)
calculateWealthBtn.addEventListener('click' , calculateWealth)
