//fetch data for hearthstone cards 
const api_url = 'https://us.api.blizzard.com/hearthstone/cards?locale=en_US&type=minion&access_token=USR15Cb6sFfS67sUXSSdZqZ0cgRXJnDoFM'

let arr = []

function getCards() {
    fetch(api_url)
    .then(resp => {
        //create response points if the api url is invalid
        if (!resp.ok) {
            throw Error("That fetch url is looking pretty scuffed. Check the url and try again")
        }
        return resp.json()
    })
    .then (data => {
        //gather data from fetch to create new array of collection
        const cardData = data.cards.map(cards => {
           let keys = Object.keys(cards)
           console.log("Keys: ", keys);
           let value = Object.values(cards)
           console.log("Value: ", value)
        })
        console.log(cardData)
    })
    .catch (err => console.error(err));
}
getCards()
console.log(arr)
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

