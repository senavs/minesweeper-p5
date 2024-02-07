const DIM = 20;
const N_MINES = 100;

let GAME_OVER = false;
let board;

function setup() {
  noCanvas();  
  
  board = new Board();
  
  for (let i = 0; i < DIM; i++) {
    const row = [];
    const options = [];
    for (let j = 0; j < DIM; j++) {
      row.push(new Cell(i, j, board))
      options.push([i, j]);
    }
    board.addRow(row);
    board.addOptions(options);
  }
  
  board.initialize();
  
}

function draw() {
  if (board.playerWin()) {
    console.log("win")
    board.revealMine();
    noLoop();
    return;
  };
  
  if (GAME_OVER) {
    board.revealAll();
    noLoop();
  }
  
}