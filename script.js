//fetch data for hearthstone cards 
const api_url = 'https://us.api.blizzard.com/hearthstone/cards?locale=en_US&type=minion&access_token=USpy8HMUdraH3Xlwm609CSXp4RJOksMRd5'

//async methods used here to get everything to load and work properly compared to a regular fetch. 
//Global array int and fetch data pushed into ex 

const cards = []
async function getCards() {
    const response = await fetch(api_url);
    const data = await response.json();
    const cardData = data.cards
    cardData.forEach(index => {
        cards.push(index)
    })
    return cardData
}
getCards();



//create buttons to compare different values of cards
//assume we are only looking at base values without applying card effects
const manaCost = document.getElementById("manaCost");
const attackPoints = document.getElementById("attackPoints");
const healthPoints = document.getElementById("healthPoints");

//create containers for displaying messages, names, and scores
let messageDisplay = document.getElementById("messageDisplay");
let userScoreDisplay = document.getElementById("userScore");
let cpuScoreDisplay = document.getElementById("cpuScore");

//create photos of cards to be displayed
let mainCardPic = document.getElementById("main_Card");
let versusCardPic = document.getElementById("versus_Card");

//cards to be displayed
let mainCard = []
let versusCard = []

//User score and cpu score
let userScore = 0;
let cpuScore = 0;

//Randomly select cards 
// function shuffleCards() {
//     let deckLength = cards.length;
//     let userCardCount = 0;
//     let cpuCardCount = 0;

//     while(--deckLength > 0) {
//         let cardIndex = Math.floor(Math.random() * deckLength(deckLength +1))
//         let randomizedCard = cards.splice(cardIndex, 1);
//         console.log(randomizedCard)
//     }
// }
// shuffleCards()
