//fetch data for hearthstone cards 
const api_url = 'https://us.api.blizzard.com/hearthstone/cards?locale=en_US&type=minion&access_token=USpy8HMUdraH3Xlwm609CSXp4RJOksMRd5'

const ex = [];
async function getCards() {
    const response = await fetch(api_url);
    const data = await response.json();
    cardData = data.cards
    ex.push(cardData)
    return ex
}
getCards()

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
function shuffleCards() {
    let deckLength = cards.length;
    let userCardCount = 0;
    let cpuCardCount = 0;
}

