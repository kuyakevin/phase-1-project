async function getCards() {
    try {
        const response = await fetch('https://us.api.blizzard.com/hearthstone/cards?locale=en_US&set=standard&collectible=1&rarity=legendary&type=minion&access_token=US7iDM0Dc1yDugE16xrGV9pMYQGKJ0rFvI');
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

//cards to be stored in each "deck"
let userCards = []
let cpuCards = []

//User score and cpu score
let userScore = 0;
let cpuScore = 0;

//current cards to display
let userCurrent = []
let cpuCurrent = []

// Randomly select cards 
function shuffleCards() {
    //callback getCards function, keeping mind it is an async function
    getCards().then (data => {
        let cardData = data.cards
        let deckLength = cardData.length;
        let userCardCount = 0;
        let cpuCardCount = 0;

        while(--deckLength > 0) {
            let cardIndex = Math.floor(Math.random() * (deckLength +1))
            let randomizedCard = cardData.splice(cardIndex, 1);
            if(userCardCount > cpuCardCount) {
                cpuCards.push(randomizedCard[0])
                cpuCardCount +=1;
            }else if (userCardCount == cpuCardCount) {
                userCards.push(randomizedCard[0]);
                userCardCount +=1;
            }
        }
    })
}

function currentCard() {
    //select random card from each deck
    let user = Math.floor((Math.random() * userCards.length));
    let cpu = Math.floor((Math.random() * userCards.length));

    userCurrent.push(userCards.splice(user, 1)[0]);
    cpuCurrent.push(cpuCards.splice(cpu, 1)[0]);

    // console.log(userCurrent[0]);
    // console.log(cpuCurrent[0]);

    userCardPic.src = `${userCurrent[0].cropImage}`
    cpuCardPic.src = `${cpuCurrent[0].cropImage}`
}

function compareStat(stat) {
    // console.log(`the user ${stat} is: ${userCurrent[0][stat]}`)
    // console.log(`the cpu ${stat} is: ${cpuCurrent[0][stat]}`)

    let userStat = userCurrent[0][stat];
    let cpuStat = cpuCurrent[0][stat];

    //logic for choosing winner
    if (stat == "manaCost" || stat == "attack" || stat == "health") {
        if (userStat > cpuStat) {
            roundResult("user win")
        } else if (userStat < cpuStat) {
            roundResult("cpu win");
        }else {
            roundResult("Draw")
        }
    }

}

function roundResult(result) {
    if(result == "user win") {
        userScore +=1;
        userScoreDisplay.textContent = `Your score: ${userScore}`;
        userCards.push(cpuCurrent.splice(0,1)[0]);
        userCards.push(userCurrent.splice(0,1)[0]);
        messageDisplay.textContent = "You win this round!";
        setTimeout ( () => {
            messageDisplay.style.display = "none"
        }, 2000);
    } else if (result == "cpu win") {
        cpuScore +=1;
        cpuScoreDisplay.textContent = `CPU score: ${cpuScore}`;
        cpuCards.push(userCurrent.splice(0,1)[0]);
        cpuCards.push(cpuCurrent.splice(0,1)[0]);
        messageDisplay.textContent = "You lose this round";
        setTimeout ( () => {
            messageDisplay.style.display = "none"
        }, 2000);
    } else {
        messageDisplay.textContent("This round is a draw");
        userCards.push(userCurrent.splice(0,1)[0]);
        cpuCards.push(cpuCurrent.splice(0,1)[0]);
        playGame();
    }
    
}
