async function getCards() {
    try {   
        let response = await fetch('https://us.api.blizzard.com/hearthstone/cards?locale=en_US&set=standard&collectible=1&rarity=legendary&type=minion&pageSize=100&access_token=USBAa1KiPdne715SqV4mlR646VOB15T0YS');
        if (!response.ok){
            throw new Error(`Failed to fetch posts: ${response.status}`)
        }
        let data = await response.json();
        let cardData = data.cards
        return cardData
    }catch(e){
        console.log("Error!")
        console.log(e)}
}
//create buttons to compare different values of cards
//assume we are only looking at base values without applying card effects
let manaCostButton = document.getElementById("manaCostButton");
let attackButton = document.getElementById("attackButton");
let healthButton = document.getElementById("healthButton");
let resetButton = document.getElementById("resetButton");
let gamerMusic = document.getElementById("my_audio")


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
        // console.log(cpuCards) => both con logs return single card

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

let i = 0;

function compareStat(stat) {
    // console.log(`the user ${stat} is: ${userCurrent[0][stat]}`)
    // console.log(`the cpu ${stat} is: ${cpuCurrent[0][stat]}`)

    let userStat = userCurrent[i][stat];
    let cpuStat = cpuCurrent[i][stat];
    i++
    
    //logic for choosing winner
    if (stat == "manaCost" || stat == "attack" || stat == "health") {
        if (userStat > cpuStat) {
            roundResult("user win")
        }else if (userStat < cpuStat) {
            roundResult("cpu win");
        }else if (userStat == cpuStat) {
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

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      toggleFullScreen();
    }
  }, false);
function message () {
    alert("Pick the stat that you think your card will have a higher value in. \n\nIf you guess correctly, you will get a point. \nIf you guess incorrectly, the CPU will get a point. \nFirst to 5 points wins! \n\nPress enter to enable and disable fullscreen mode. \n\n Press the button at the top to enable and disable dark mode")
}
message()

window.addEventListener('load', () => {
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'light');
    }

    const themeSelector=document.querySelector('#themeSelector');
        if(localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark');
            themeSelector.textContent = '☀️';
        }else{
            themeSelector.textContent = '🌙';
        }

        themeSelector.addEventListener('click', () => {
            if (localStorage.getItem('theme') === 'light') {
                localStorage.setItem('theme', 'dark');
                themeSelector.textContent = '☀️';
            }else{
                localStorage.setItem('theme', 'light');
                themeSelector.textContent = '🌙';
            }

            document.body.classList.toggle('dark');
        });
    });