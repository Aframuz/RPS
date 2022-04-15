/*=============================================
=                  VARIABLES                  =
=============================================*/
const playButton = document.getElementById("playButton")
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
   const rpsButtons = document.getElementById("rps-buttons")
   rpsButtons.classList.toggle("visible")
}

function validateNum(inputNum) {
   const regexOnlyPositiveNum = /^[1-9]\d*$/
   return regexOnlyPositiveNum.test(inputNum) ? inputNum : false
}
