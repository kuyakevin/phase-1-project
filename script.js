let cards = function () {
    fetch('https://us.api.blizzard.com/hearthstone/cards?locale=en_US&type=minion&access_token=USRNZ0C4m2PW0dxqkBLiBpRMreEW49aYLc')
    .then(response => response.json())
    .then(data => console.log(data))
}

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

/*
    At this point, I need to add the API to generate the cards. To have the most up to date API, I needed to use the blizzard developer site.
    Now I have to look into how to setup OAuth to access the API.
    The oauth was set up through the blizzard developer website. There is a detailed instruction guide on how to set it up, as well as
    the use of a youtube tutorial that analyzed the setup for World of Warcraft API. 
*/