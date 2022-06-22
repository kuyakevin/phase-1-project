
//Global array int and fetch data pushed into cards 


async function getCards() {
    try {
        const response = await fetch('https://us.api.blizzard.com/hearthstone/cards?locale=en_US&set=standard&collectible=1&type=minion&access_token=US7iDM0Dc1yDugE16xrGV9pMYQGKJ0rFvI');
        if (!response.ok){
            throw new Error(`Failed to fetcb posts: ${response.status}`)
        }
        const data = await response.json();
        return data;
    }catch(e){
        console.log("Error!")
        console.log(e)}
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
let userCardPic = document.getElementById("user_Card");
let cpuCardPic = document.getElementById("cpu_Card");

//cards to be displayed
let mainCard = []
let cpuCard = []

//User score and cpu score
let userScore = 0;
let cpuScore = 0;

// Randomly select cards 
function shuffleCards() {
    getCards().then (data => {
        let cardData = data.cards
        let deckLength = cardData.length;
        let userCardCount = 0;
        let cpuCardCount = 0;

        while(--deckLength > 0) {
            let cardIndex = Math.floor(Math.random() * (deckLength +1))
            let randomizedCard = cardData.splice(cardIndex, 1);
            if(userCardCount > cpuCardCount) {
                cpuCard.push(randomizedCard[0])
            }
        }
    })
}
