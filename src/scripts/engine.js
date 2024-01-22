// import { cardData } from cards.js;
const imagesPath = "./src/assets/icons/";
const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Attribute: Paper",
        img: `${imagesPath}dragon.png`,
        bestAgainst: [1],
        worstAgainst: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Attribute: Rock",
        img: `${imagesPath}magician.png`,
        bestAgainst: [2],
        worstAgainst: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Attribute: Scissors",
        img: `${imagesPath}exodia.png`,
        bestAgainst: [0],
        worstAgainst: [1],
    },
]

const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points")
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card")
    },
    actions: {
        button: document.getElementById('next-duel'),
    },
    playerSides: {
        player1: "player-cards",
        player1Box: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBox: document.querySelector("#computer-cards")
    }
};

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(idCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");

    if (fieldSide === state.playerSides.player1) {
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });

        cardImage.addEventListener("mouseover", () => {
            drawSelectCards(idCard);
        });
    }

    return cardImage;
}

async function removeAllCardsImages() {
    //let { computerBox, player1Box } = state.playerSides;

    let imgElements = state.playerSides.computerBox.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = state.playerSides.player1Box.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}

async function drawButton(text) {
    state.actions.button.style.display = "block";
    state.actions.button.innerText = text.toUpperCase();
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = "empate";
    let playerCard = cardData[playerCardId];

    if (playerCard.bestAgainst.includes(computerCardId)) {
        duelResults = "ganhou";
        state.score.playerScore++;
    } 
    
    if (playerCard.worstAgainst.includes(computerCardId)) {
        duelResults = "perdeu";
        state.score.computerScore++;
    }
    
    await playAudio(duelResults);
    return duelResults;
}

async function hiddenCardDetails() {
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
    state.cardSprites.avatar.src = "";
}

async function showHiddenCardImages(value) {
    if (value === true) {
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    } else {
        state.fieldCards.player.style.display = "none";
        state.fieldCards.computer.style.display = "none";
    }
}

async function drawCardsInField(cardId, computerCardId) {
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}

async function setCardsField(cardId) { // uma função que chama várias funções
    await removeAllCardsImages(); // remove todas as cartas

    let computerCardId = await getRandomCardId();

    showHiddenCardImages(true);
    hiddenCardDetails();

    await drawCardsInField(cardId, computerCardId);

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await drawButton(duelResults);
    await updateScore(); 
}

async function resetDuel() {
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    audio.volume = 0.3;
    
    try {
        audio.play();
    } catch (error) {
        
    }
}

async function drawCards(cardNumber, fieldSide) {
    for (let i = 0; i < cardNumber; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function drawSelectCards(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = cardData[index].type;
}

function init() {
    const bgm = document.getElementById("bgm");
    bgm.volume = 0.1;
    bgm.play();
    
    showHiddenCardImages(false);

    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.computer);
}

init();