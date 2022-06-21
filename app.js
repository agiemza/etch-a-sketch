const gridContainer = document.querySelector(".grid-container")
const highlightStyle = `
    background-color: red;
`
let editingActive = false

gridContainer.addEventListener("mousedown", e => {
    editingActive = true
})
gridContainer.addEventListener("mouseup", e => {
    editingActive = false
})

function createGridElements(sideLength) {
    for (let i = 0; i < sideLength ** 2; i++) {
        const newElement = document.createElement("div")
        newElement.addEventListener("mouseover", e => {
            if (editingActive) {
                newElement.style.cssText = highlightStyle
            }
        })
        gridContainer.appendChild(newElement)

    }
}

createGridElements(16)