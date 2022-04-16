/*=============================================
=                  VARIABLES                  =
=============================================*/
const playButton = document.getElementById("playButton")
let log = []
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
   // number of games
   const numGamesInput = document.getElementById("numGames")
   const numGames = validateNum(numGamesInput.value)
   // validate number of games
   if (!numGames) {
      console.error("Número de juegos no válido")
      return
   }

   // toggle visibility of rps buttons
   const rpsButtonsDiv = document.getElementById("rps-buttons")
   rpsButtonsDiv.classList.toggle("visible")

   // User selecion
   const rpsButtons = document.querySelectorAll("#rps-buttons>img")
   rpsButtons.forEach((button) => {
      button.addEventListener("click", (_) => {
         const userPlay = button.alt
         const compPlay = getComPlay()

         // decide winner
         decideWinner(userPlay, compPlay)
      })
   })
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
