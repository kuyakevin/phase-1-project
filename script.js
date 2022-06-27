async function getCards() {
    try {
        let response = await fetch('https://us.api.blizzard.com/hearthstone/cards?locale=en_US&set=standard&collectible=1&rarity=legendary&type=minion&access_token=US5aWdmYxnEiviBwd4mK6F67oqk6obJRoj');
        if (!response.ok){
            throw new Error(`Failed to fetcb posts: ${response.status}`)
        }
        let data = await response.json();
        let cardData = data.cards
        return cardData
    }catch(e){
        console.log("Error!")
        console.log(e)}
}``
//create buttons to compare different values of cards
//assume we are only looking at base values without applying card effects
let manaCostButton = document.getElementById("manaCostButton");
let attackButton = document.getElementById("attackButton");
let healthButton = document.getElementById("healthButton");
let resetButton = document.getElementById("resetButton");

//create containers for displaying messages, names, and scores
let messageDisplay = document.getElementById("messageDisplay");
let userScoreDisplay = document.getElementById("user-Score");
let cpuScoreDisplay = document.getElementById("cpu-Score");

//create photos of cards to be displayed
let userCardPic = document.getElementById("user-Card");
let cpuCardPic = document.getElementById("cpu-Card");

//cards to be stored in each deck   
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
        
        let userCard = userCards[user]
        let cpuCard = cpuCards[cpu]
        // console.log(userCard)
        // console.log(cpuCard)
        // console.log(cpuCards) => both con logs return array of cards

        // console.log("User Card Index: " + user) => Selects random card 
        // console.log("CPU Card Index: " + cpu) => Selects random card
        userCurrent.push(userCard);
        cpuCurrent.push(cpuCard);
        // console.log(userCurrent[0]);
        // console.log(cpuCurrent[0]); => results in one card being chosen from the array
        
        // console.log(userCurrent[0].cropImage) => grabs url of cropImage of card
    
        userCardPic.src = userCard.image
        cpuCardPic.src = cpuCard.image    
    })
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
        }else if (userStat = cpuStat) {
            roundResult("Draw")
        }
    }

}

function roundResult(result) {
    if(result == "user win") {
        messageDisplay.textContent = ("You win this round!");
        userScore +=1;
        userScoreDisplay.textContent = `Your score: ${userScore}`;
        // userCards.push(cpuCurrent.splice(0,1)[0]);
        // userCards.push(userCurrent.splice(0,1)[0]);
        setTimeout ( () => {
            messageDisplay.textContent = ""
        }, 1500);
        playGame();
    } else if (result == "cpu win") {
        messageDisplay.textContent = ("You lose this round");
        cpuScore +=1;
        cpuScoreDisplay.textContent = `CPU score: ${cpuScore}`;
        // cpuCards.push(userCurrent.splice(0,1)[0]);
        // cpuCards.push(cpuCurrent.splice(0,1)[0]);
        setTimeout ( () => {
            messageDisplay.textContent = ""
        }, 1500);
        playGame();
    } else { 
        messageDisplay.textContent = ("This round is a draw");
        setTimeout ( () => {
            messageDisplay.textContent = ""
        }, 1500);
        playGame();
    }
}

function playGame() {
    if(userScore < 5 && cpuScore < 5) {
        currentCard();
    } else if (userScore == 5) {
        messageDisplay.textContent = "You Win!";
        resetButton.style.display = "block";
        manaCostButton.style.display = "none";
        attackButton.style.display = "none";
        healthButton.style.display = "none";
    } else if (cpuScore == 5){
        messageDisplay.textContent = "CPU Wins!";
        resetButton.style.display = "block";
        manaCostButton.style.display = "none";
        attackButton.style.display = "none";
        healthButton.style.display = "none";
    }
}

resetButton.addEventListener("click", () => {
    location.reload()
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