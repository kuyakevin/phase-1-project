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
let userScoreDisplay = document.getElementById("user-Score");
let cpuScoreDisplay = document.getElementById("cpu-Score");

//create photos of cards to be displayed
let userCardPic = document.getElementById("user-Card");
let cpuCardPic = document.getElementById("cpu-Card");

//cards to be stored in each "deck"
let userCards = []
let cpuCards = []

//User score and cpu score
let userScore = 0;
let cpuScore = 0;

//current cards to display
let userCurrent = []
let cpuCurrent = []

//functions to call
shuffleCards();
currentCard();
// Randomly select cards 
function shuffleCards() {
    //callback getCards function, keeping mind it is an async function
    getCards().then (data => {
        //console.log(data) => debug to confirm value of data is array from fetch
        let deckLength = data.length;
        //console.log(deckLength) => 40 
        //console.log(data[0]) => correctly displays array of first object in data
        let userCardCount = 0;
        let cpuCardCount = 0;

        while(--deckLength > 0) {
            let cardIndex = Math.floor(Math.random() * (deckLength +1))
            //console.log(cardIndex) => randomized index of cards to select.
            let randomizedCard = data.splice(cardIndex, 1);
            //console.log(randomizedCard) => correctly randomizes cards. 
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
    getCards().then(() => {
        //select random card from each deck
        let user = Math.floor((Math.random() * userCards.length));
        let cpu = Math.floor((Math.random() * cpuCards.length));

        // console.log(userCards)
        // console.log(cpuCards) => both con logs return array of cards

        // console.log("User Card Index: " + user) => Selects random card 
        // console.log("CPU Card Index: " + cpu) => Selects random card
        
        userCurrent.push(userCards.splice(user, 1)[0]);
        cpuCurrent.push(cpuCards.splice(cpu, 1)[0]);
        
        // console.log(userCurrent[0]);
        // console.log(cpuCurrent[0]); => results in one card being chosen from the array
        
        //console.log(userCurrent[0].cropImage) => grabs url of cropImage of card

        userCardPic.src = `${userCurrent[0].image}`
        cpuCardPic.src = `${cpuCurrent[0].image}`      
    })
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

// currentCard();