/*=============================================
=                  VARIABLES                  =
=============================================*/
const playButton = document.getElementById("playButton")
const resultTab = document.getElementById("result-tab")
const rpsButtonsDiv = document.getElementById("rps-buttons")
const rpsButtons = document.querySelectorAll("#rps-buttons>img")
let gameCounter = 1
let log = []

/*=============================================
=                    MODAL                    =
=============================================*/
var myModal = new bootstrap.Modal(document.getElementById("resultModal"), {
   keyboard: false,
})
const modal = document.getElementById("resultModal")

// Automatically hide modal after 1200ms
modal.addEventListener("shown.bs.modal", debounce(hideModal, 1200))

// Hide modal function
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
   // Disable playButton
   playButton.disabled = true
   // Counter
   let counter = 1
   // Number of games
   const numGamesInput = document.getElementById("numGames")
   let numGames = validateNum(numGamesInput.value)
   // Validate number of games
   if (!numGames) {
      console.error("Número de juegos no válido")
      playButton.disabled = false
      return
   }
   // Result Tab Header
   const resultTabHeader = document.createElement("h6")
   resultTabHeader.classList.add("fw-bold", "fst-italic", "border-bottom")
   resultTabHeader.innerHTML = `Juego N° ${gameCounter}`
   resultTab.appendChild(resultTabHeader)

   // Toggle visibility of rps buttons
   rpsButtonsDiv.classList.toggle("visible")

   // User selecion
   let buttonPlay = function () {
      // Count number of games played, remove EventListeners  & hide buttons if reached max
      if (counter == numGames) {
         // Remove EventListeners
         rpsButtons.forEach((button) => {
            button.removeEventListener("click", buttonPlay)
         })
         // Hide buttons
         rpsButtonsDiv.classList.toggle("visible")
         // Enable playButton
         playButton.disabled = false
      }

      // Get user and com selections
      const userPlay = this.alt
      const compPlay = getComPlay()

      // Decide winner
      decideWinner(userPlay, compPlay)

      // Insert result tab
      const resutlSpan = document.createElement("span")
      resutlSpan.classList.add("d-block")
      resutlSpan.innerHTML = log[log.length - 1]
      resultTab.appendChild(resutlSpan)

      counter++
   }

   // Add EventListener to buttons
   rpsButtons.forEach((button) => {
      button.addEventListener("click", buttonPlay)
   })

   // Game counter for result tab
   gameCounter++
}

// Check if input is a number
function validateNum(inputNum) {
   const regexOnlyPositiveNum = /^[1-9]\d*$/
   return regexOnlyPositiveNum.test(inputNum) ? inputNum : false
}

// Get com selection by Math.Random
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

// Check winner of match, insert resutl in Modal & log result
function decideWinner(user, com) {
   const h1Modal = document.getElementById("modal-result")
   // win
   if (
      (user == "piedra" && com == "tijeras") ||
      (user == "papel" && com == "piedra") ||
      (user == "tijeras" && com == "papel")
   ) {
      h1Modal.textContent = "Has ganado!"
      log.push("Victoria")
      return
   }

   // Lose
   if (
      (user == "piedra" && com == "papel") ||
      (user == "papel" && com == "tijeras") ||
      (user == "tijeras" && com == "piedra")
   ) {
      h1Modal.textContent = "Has perdido"
      log.push("Derrota")
      return
   }

   // Draw
   h1Modal.textContent = "Empate"
   log.push("Empate")
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
