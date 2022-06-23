async function getCards() {
    try {
        const response = await fetch('https://us.api.blizzard.com/hearthstone/cards?locale=en_US&set=standard&collectible=1&rarity=legendary&type=minion&access_token=UST8Xp074NSS5LTxH3Omix3MlJIaKg2Y3c');
        if (!response.ok){
            throw new Error(`Failed to fetcb posts: ${response.status}`)
        }
        const data = await response.json();
        const cardData = data.cards
        return cardData
    }catch(e){
        console.log("Error!")
        console.log(e)}
}
//create buttons to compare different values of cards
//assume we are only looking at base values without applying card effects
const manaCostButton = document.getElementById("manaCostButton");
const attackButton = document.getElementById("attackButton");
const healthButton = document.getElementById("healthButton");
const cardName = document.getElementById("card-name");
const cardEffect = document.getElementById("card-effect");
const flavorText = document.getElementById("flavor-text");
const resetButton = document.getElementById("resetButton")

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
        let deckLength = data.length;
        let userCardCount = 0;
        let cpuCardCount = 0;

        while(--deckLength > 0) {
            let cardIndex = Math.floor(Math.random() * (deckLength +1))
            let randomizedCard = data.splice(cardIndex, 1);
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
        
    // userCurrent.push(userCards.splice(user, 1)[0]);
    // cpuCurrent.push(cpuCards.splice(cpu, 1)[0]);
        
    console.log(userCurrent);
    console.log(cpuCurrent);
        
    // userCardPic.src = `${userCurrent[0].cropImage}`
    // cpuCardPic.src = `${cpuCurrent[0].cropImage}`
    
}

function compareStat(stat) {
    console.log(`the user ${stat} is: ${userCurrent[0][stat]}`)
    console.log(`the cpu ${stat} is: ${cpuCurrent[0][stat]}`)

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

function playGame() {
    if(userCards.length < 10 && cpuCards.length < 10) {
        currentCard();
    } else if (userCards.length == 10) {
        messageDisplay.textContent = "CPU Wins";
        resetButton.style.display = "block";
        manaCostButton.style.display = "none";
        attackButton.style.display = "none";
        healthButton.style.display = "none";
    } else if (cpuCards.length == 10){
        messageDisplay.textContent = "You Win!";
        resetButton.style.display = "block";
        manaCostButton.style.display = "none";
        attackButton.style.display = "none";
        healthButton.style.display = "none";
    }
}

resetButton.addEventListener("click", () => {
    userScore = 0;
    cpuScore = 0;
    messageDisplay.style.display = "none";
    currentCard();
})

manaCostButton.addEventListener("click", () => {
    compareStat("manaCost")
})

attackButton.addEventListener("click", () => {
    compareStat("attack");
})

healthButton.addEventListener("click", () => {
    compareStat("health");
})

shuffleCards();
currentCard();