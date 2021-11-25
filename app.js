//some DOM elements
const playersTurn = document.querySelector("#players-turn");
const resetButton = document.querySelector('#reset');

const gameState = {
  players: ["player1", "player2"],
  turn: false,
  rowsQuantity: 6,
  columnsQuantity: 7,
  allDomCols: [],
  positionsToWinQuantity: 4,
  isGameFinished: false,
};

initiateGame();

function generateNewBoard() {
  let board = [];
  for (let i = 0; i < gameState.columnsQuantity; i++) {
    board.push([]);
  }
  return board;
}

function initiateGame() {
  //initiate start game state
  gameState.board = generateNewBoard();
  gameState.turn = false;
  gameState.isGameFinished = false;
  gameState.allDomCols = document.querySelectorAll(".column");

  //delete and set eventListener to the reset button
  resetButton.removeEventListener('click', resetButtonClick);
  resetButton.addEventListener('click', resetButtonClick);

  onBoardClick();
}

//set event listeners
function onBoardClick() {
  //set event listeners for all columns
  gameState.allDomCols.forEach((column) => {
    column.addEventListener("click", handleColumnClick);
  });
}

function handleColumnClick(event) {
  if (gameState.isGameFinished) {
    return;
  }
  //identify clicked column number;
  let clickedColumnNumber = event.target.closest(".column").id.split("-")[1];

  //check if column has space for step
  if (gameState.board[clickedColumnNumber - 1].length >= 6) {
    return;
  }

  //identify availiable row number and push player number to columns array
  let filledRowNumber =
    gameState.rowsQuantity -
    gameState.board[clickedColumnNumber - 1].push(gameState.turn) +
    1;

  //set style for DOM element
  let chosenElement = document.querySelector(
    `#column-${clickedColumnNumber} .row-${filledRowNumber}`
  );
  chosenElement.classList.add(gameState.players[+gameState.turn]);

  //checking for the win
  if (checkForWin()) {
    freezeTheGame();
    playersTurn.innerText = `Player ${+gameState.turn + 1} is a WINNER!!!`;
    gameState.turn ? playersTurn.classList.add('winner-yellow'): playersTurn.classList.add('winner-red');
    return;
  }

  //change a player
  gameState.turn = !gameState.turn;
  changePlayersTurn();
}

function checkForWin() {
  return checkAllColumns() || checkAllRows() || checkAllDiagonels();
}

function checkAllColumns() {
  let result = false;
  gameState.board.forEach((column) => {
    if (column.length >= gameState.positionsToWinQuantity) {
      for (
        let i = 0;
        i <=
        column.length -
          (gameState.rowsQuantity - gameState.positionsToWinQuantity);
        i++
      ) {
        if (
          checkFourForWin(
            column[i],
            column[i + 1],
            column[i + 2],
            column[i + 3]
          )
        ) {
          result = true;
        }
      }
    }
  });
  return result;
}

function checkAllRows() {
  let result = false;
  for (let i = 0; i < gameState.rowsQuantity; i++) {
    for (
      let j = 0;
      j <= gameState.columnsQuantity - gameState.positionsToWinQuantity;
      j++
    ) {
      let one = gameState.board[j][i];
      let two = gameState.board[j + 1][i];
      let tree = gameState.board[j + 2][i];
      let four = gameState.board[j + 3][i];

      if (checkFourForWin(one, two, tree, four)) {
        result = true;
      }
    }
  }
  return result;
}

function checkAllDiagonels() {
  let result = false;

  //minor  diagonals checking
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 2; j++) {
      let one = gameState.board[i][j];
      let two = gameState.board[i + 1][j + 1];
      let three = gameState.board[i + 2][j + 2];
      let four = gameState.board[i + 3][j + 3];
      if (checkFourForWin(one, two, three, four)) {
        result = true;
      }
    }
  }

  //major diagonals checking
  for (
    let i = gameState.columnsQuantity - 1;
    i >= gameState.columnsQuantity - 4;
    i--
  ) {
    for (let j = 0; j <= 2; j++) {
      let one = gameState.board[i][j];
      let two = gameState.board[i - 1][j + 1];
      let three = gameState.board[i - 2][j + 2];
      let four = gameState.board[i - 3][j + 3];
      if (checkFourForWin(one, two, three, four)) {
        result = true;
      }
    }
  }

  return result;
}

function checkFourForWin(one, two, three, four) {
  if (
    one === undefined ||
    two === undefined ||
    three === undefined ||
    four === undefined
  ) {
    return false;
  }
  return one === two && one === three && one === four;
}

function changePlayersTurn() {
  playersTurn.innerText = `Player's ${+gameState.turn + 1} turn`;
}

function freezeTheGame() {
  gameState.isGameFinished = true;
}

function resetButtonClick() {
  initiateGame();
  cleanDOM();
}

function cleanDOM() {
  playersTurn.classList.remove('winner-red');
  playersTurn.classList.remove('winner-yellow');
  playersTurn.innerText = `Player's ${+gameState.turn + 1} turn`;
  document.querySelectorAll('.row').forEach(cell => {
    cell.classList.remove(gameState.players[0]);
    cell.classList.remove(gameState.players[1]);
  })
}