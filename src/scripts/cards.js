const imagesPath = "./src/assets/icons/";
export const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${imagesPath}dragon.png`,
        bestAgainst: [1],
        worstAgainst: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${imagesPath}magician.png`,
        bestAgainst: [2],
        worstAgainst: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${imagesPath}exodia.png`,
        bestAgainst: [0],
        worstAgainst: [1],
    },
]