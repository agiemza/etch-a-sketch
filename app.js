const gridContainer = document.querySelector(".grid-container")
const rangeInput = document.querySelector(".range-input")
const currentRangeContainer = document.querySelector(".current-range-container")

const settings = {
    penColor: "rgba(0,0,0,1)",
    canvasColor: "rgba(255,255,255,1)",
    editingActive: false,
    currentTargetColor: undefined,
    boxSide: undefined
}

rangeInput.addEventListener('change', handleChangeRange)

gridContainer.addEventListener("mousedown", e => {
    settings.editingActive = true
    settings.currentTargetColor = settings.penColor
    paintGridElements(e)
})
gridContainer.addEventListener("mouseup", disableEditing)
gridContainer.addEventListener("mouseleave", disableEditing)


function createGridElements(sideLength) {
    settings.boxSide = `${500 / sideLength}px`
    for (let i = 0; i < sideLength ** 2; i++) {
        const newElement = document.createElement("div")
        newElement.style.cssText = `
            width: ${settings.boxSide}; 
            height: ${settings.boxSide};
        `
        newElement.addEventListener("mouseover", handleMouseOver)
        newElement.addEventListener("mouseout", handleMouseLeave)
        gridContainer.appendChild(newElement)
    }
}

function handleMouseOver(e) {
    if (settings.editingActive) {
        paintGridElements(e)
    }
    else {
        settings.currentTargetColor = e.target.style.backgroundColor
        paintGridElements(e)
    }
}

function handleMouseLeave(e) {
    if (!settings.editingActive) {
        e.target.style.cssText = `
            width: ${settings.boxSide}; 
            height: ${settings.boxSide}; 
            background-color: ${settings.currentTargetColor};
        `
    }
}

function paintGridElements(e) {
    e.target.style.cssText = `
        width: ${settings.boxSide}; 
        height: ${settings.boxSide}; 
        background-color: ${settings.penColor};
    `
}

function disableEditing() {
    settings.editingActive = false
}

function handleChangeRange(e) {
    currentRangeContainer.innerText = `${e.target.value}x${e.target.value}`

    while (gridContainer.childNodes.length) {
        gridContainer.removeChild(gridContainer.childNodes[0])
    }
    createGridElements(e.target.value)
}

createGridElements(20)