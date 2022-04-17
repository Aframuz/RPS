/*=============================================
=                  VARIABLES                  =
=============================================*/
const playButton = document.getElementById("playButton")
let gameCounter = 1
let log = []

/*=============================================
=                    MODAL                    =
=============================================*/
var myModal = new bootstrap.Modal(document.getElementById("resultModal"), {
   keyboard: false,
})
const modal = document.getElementById("resultModal")

modal.addEventListener("shown.bs.modal", debounce(hideModal, 1200))

function hideModal() {
   myModal.hide()
}

/*=============================================
=                    PLAY                     =
=============================================*/
playButton.addEventListener("click", (e) => {
   e.preventDefault()
   play()
})

/*=============================================
=                  FUNCTIONS                  =
=============================================*/
function play() {
   // Counter
   let counter = 1
   // Number of games
   const numGamesInput = document.getElementById("numGames")
   let numGames = validateNum(numGamesInput.value)
   // Validate number of games
   if (!numGames) {
      console.error("Número de juegos no válido")
      return
   }
   // Result Tab Header
   const resultTab = document.getElementById("result-tab")
   const resultTabHeader = document.createElement("h6")
   resultTabHeader.classList.add("fw-bold", "fst-italic", "border-bottom")
   resultTabHeader.innerHTML = `Juego N° ${gameCounter}`
   resultTab.appendChild(resultTabHeader)

   // Toggle visibility of rps buttons
   const rpsButtonsDiv = document.getElementById("rps-buttons")
   rpsButtonsDiv.classList.toggle("visible")

   // User selecion
   const rpsButtons = document.querySelectorAll("#rps-buttons>img")

   let buttonPlay = function () {
      if (counter == numGames) {
         rpsButtons.forEach((button) => {
            button.removeEventListener("click", buttonPlay)
         })
         rpsButtonsDiv.classList.toggle("visible")
      }
      counter++

      const userPlay = this.alt
      const compPlay = getComPlay()

      // Decide winner
      decideWinner(userPlay, compPlay)

      // Insert result tab
      const resutlSpan = document.createElement("span")
      resutlSpan.classList.add("d-block")
      resutlSpan.innerHTML = log[log.length - 1]
      resultTab.appendChild(resutlSpan)
   }

   rpsButtons.forEach((button) => {
      button.addEventListener("click", buttonPlay)
   })

   // Game counter for result tab
   gameCounter++
}

function validateNum(inputNum) {
   const regexOnlyPositiveNum = /^[1-9]\d*$/
   return regexOnlyPositiveNum.test(inputNum) ? inputNum : false
}

function getComPlay() {
   // Variables
   let compPlay
   const randomNumber = Math.random()

   // Assign comPlay
   if (randomNumber < 0.33) {
      compPlay = "piedra"
   } else if (randomNumber < 0.66) {
      compPlay = "papel"
   } else {
      compPlay = "tijeras"
   }

   // Return comPlay
   return compPlay
}

function decideWinner(user, com) {
   const h1Modal = document.getElementById("modal-result")
   // win
   if (
      (user == "piedra" && com == "tijeras") ||
      (user == "papel" && com == "piedra") ||
      (user == "tijeras" && com == "papel")
   ) {
      h1Modal.textContent = "Has ganado!"
      log.push("W")
      return
   }

   // Lose
   if (
      (user == "piedra" && com == "papel") ||
      (user == "papel" && com == "tijeras") ||
      (user == "tijeras" && com == "piedra")
   ) {
      h1Modal.textContent = "Has perdido"
      log.push("L")
      return
   }

   // Draw
   h1Modal.textContent = "Empate"
   log.push("-")
   return
}

// Delay function execution
function debounce(callback, delay) {
   let timeout
   return function () {
      clearTimeout(timeout)
      timeout = setTimeout(callback, delay)
   }
}
