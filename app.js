const gridContainer = document.querySelector(".grid-container")
const rangeInput = document.querySelector(".range-input")
const currentRangeContainer = document.querySelector(".current-range-container")
const colorPickerWrapper = document.querySelector(".color-picker-wrapper")
const colorPicker = document.querySelector(".color-picker")
const resetButton = document.querySelector(".reset-button")
const randomColorButton = document.querySelector(".random-color")
const rainbowButton = document.querySelector(".rainbow-mode")
const rainbowBackground = document.querySelector(".rainbow-background")
const penButton = document.querySelector(".pen-button")
const eraserButton = document.querySelector(".eraser-button")

const settings = {
    penColor: "#000000",
    canvasColor: "#FFFFFF",
    editingActive: false,
    currentTargetColor: undefined,
    boxSide: undefined,
    gridSize: 20,
    rainbowMode: false,
    currentTool: "pen"
}

function setEventListeners() {
    gridContainer.addEventListener("mousedown", e => {
        settings.editingActive = true
        settings.currentTargetColor = settings.penColor
        paintGridElements(e)
    })
    gridContainer.addEventListener("mouseup", disableEditing)
    gridContainer.addEventListener("mouseleave", disableEditing)
    rangeInput.addEventListener("change", changeGridSize)

    colorPickerWrapper.addEventListener("click", () => {
        colorPicker.click()
    })
    colorPicker.addEventListener("input", e => {
        settings.penColor = e.target.value
        colorPickerWrapper.style.cssText = `background-color: ${e.target.value}`
    })

    randomColorButton.addEventListener("click", randomizeColor)
    rainbowButton.addEventListener("change", e => {
        changeTool("pen")
        toggleRainbow(e.target.checked)
    })

    penButton.addEventListener("click", () => {
        changeTool("pen")
    })
    eraserButton.addEventListener("click", () => {
        changeTool("eraser")
    })
    resetButton.addEventListener("click", resetGrid)
}

function createGridElements(sideLength) {
    settings.boxSide = `${gridContainer.offsetWidth / sideLength}px`
    for (let i = 0; i < sideLength ** 2; i++) {
        const newElement = document.createElement("div")
        newElement.style.cssText = `
        width: ${settings.boxSide};
        height: ${settings.boxSide};
        background-color: ${settings.canvasColor}
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
    if (settings.rainbowMode && settings.currentTool === "pen") {
        randomizeColor()
    }
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

function resetGrid() {
    gridContainer.innerHTML = ""
    createGridElements(settings.gridSize)
}

function changeGridSize(e) {
    currentRangeContainer.innerText = `${e.target.value}x${e.target.value}`
    settings.gridSize = e.target.value
    resetGrid()
}

function randomizeColor() {
    const newColor = {
        red: (`0${Math.floor(Math.random() * 256).toString(16)}`).slice(-2),
        green: (`0${Math.floor(Math.random() * 256).toString(16)}`).slice(-2),
        blue: (`0${Math.floor(Math.random() * 256).toString(16)}`).slice(-2),
    }
    settings.penColor = `#${newColor.red}${newColor.green}${newColor.blue}`
    colorPicker.value = `#${newColor.red}${newColor.green}${newColor.blue}`
    colorPickerWrapper.style.cssText = `background-color: #${newColor.red}${newColor.green}${newColor.blue}`
}

function toggleRainbow(state) {
    settings.rainbowMode = state
    if (!state) {
        rainbowButton.checked = false
        rainbowBackground.classList.remove("opacity-1")
    } else {
        rainbowBackground.classList.add("opacity-1")
    }
}

function changeTool(tool) {
    settings.currentTool = tool
    switch (tool) {
        case "pen":
            settings.penColor = colorPicker.value
            break
        case "eraser":
            settings.penColor = settings.canvasColor
            toggleRainbow(false)
            break
    }
}

window.onload = () => {
    createGridElements(settings.gridSize)
    setEventListeners()
}