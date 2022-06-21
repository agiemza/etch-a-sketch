const gridContainer = document.querySelector(".grid-container")

const settings = {
    penColor: "rgba(0,0,0,1)",
    canvasColor: "rgba(255,255,255,1)",
    editingActive: false,
    currentTargetColor: undefined
}

gridContainer.addEventListener("mousedown", e => {
    settings.editingActive = true
    paintGridElements(e)
})
gridContainer.addEventListener("mouseup", disableEditing)
gridContainer.addEventListener("mouseleave", disableEditing)

function createGridElements(sideLength) {
    for (let i = 0; i < sideLength ** 2; i++) {
        const newElement = document.createElement("div")
        newElement.style.cssText = `background-color: ${settings.canvasColor}`
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
        e.target.style.cssText = `background-color: ${settings.penColor}`
    }
}

function handleMouseLeave(e) {
    if (!settings.editingActive) {
        e.target.style.cssText = `background-color: ${settings.currentTargetColor}`
    }
}

function paintGridElements(e) {
    settings.currentTargetColor = settings.penColor
    e.target.style.cssText = `background-color: ${settings.penColor}`
}

function disableEditing() {
    settings.editingActive = false
}

createGridElements(16)