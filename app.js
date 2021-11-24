//some DOM elements
const playersTurn = document.querySelector("#players-turn");

const gameState = {
  players: ["player1", "player2"],
  turn: false,
  rowsQuantity: 6,
  columnsQuantity: 7,
  allDomCols: [],
  positionsToWinQuantity: 4
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
  gameState.board = generateNewBoard();
  gameState.turn = false;
  gameState.allDomCols = document.querySelectorAll(".column");
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

  //identify clicked column number;
  let clickedColumnNumber = event.target.closest(".column").id.split("-")[1];

  //identify availiable row number and push player number to columns array
  if(gameState.board[clickedColumnNumber - 1].length >= 6) {
    return;
  }
  let filledRowNumber =
    gameState.rowsQuantity -
    gameState.board[clickedColumnNumber - 1].push(gameState.turn) +
    1;

  let chosenElement = document.querySelector(
    `#column-${clickedColumnNumber} .row-${filledRowNumber}`
  );
  chosenElement.classList.add(gameState.players[+gameState.turn]);

  //checking for the win
  if(checkForWin()) {
    freezeTheGame();
    playersTurn.innerText = `Player ${+gameState.turn + 1} is a WINNER`;
    return;
  }

  //change a player
  gameState.turn = !gameState.turn;
  changePlayersTurn();
}

function checkForWin() {
  return checkAllColumns() || checkAllRows();
}

function checkAllColumns() {
  let result = false;
  gameState.board.forEach(column => {
    if(column.length >= gameState.positionsToWinQuantity) {
      for(let i = 0; i <= column.length - (gameState.rowsQuantity - gameState.positionsToWinQuantity); i++) {
        if(checkFourForWin(column[i], column[i+1], column[i+2], column[i+3])) {
          result = true;
        }
      }
    }
  });
  return result;
}

function checkAllRows() {
  let result = false;
  for(let i = 0; i < gameState.rowsQuantity; i++) {
    for(let j = 0; j <= gameState.columnsQuantity - gameState.positionsToWinQuantity; j++) {
      
      let one = gameState.board[j][i];
      let two = gameState.board[j + 1][i];
      let tree = gameState.board[j + 2][i];
      let four = gameState.board[j + 3][i];

      if(checkFourForWin(one, two, tree, four)) {
        result = true;
      }
    }
  }

  return result;
}

function checkAllDiagonels() {}

function checkFourForWin(one, two, three, four) {
  if(one === undefined || two === undefined || three === undefined || four === undefined) {
    return false;
  }
  return (one === two) && (one === three) && (one === four);
}

function changePlayersTurn() {
  playersTurn.innerText = `Player's ${+gameState.turn + 1} turn`;
}

function freezeTheGame() {
  console.log('game is freezing');
}