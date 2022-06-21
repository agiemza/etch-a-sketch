const gridContainer = document.querySelector(".grid-container")

function createGridElements(sideLength) {
    for (let i = 0; i < sideLength ** 2; i++) {
        const newElement = document.createElement("div")
        gridContainer.appendChild(newElement)
    }
}

createGridElements(16)