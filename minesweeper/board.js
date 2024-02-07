class Board {
  
    constructor() {
      this.cells = [];
      this.options = [];
      this.mines = []
    }
    
    addRow(cells) {
      const row = createDiv();
      row.class("row");
      
      cells.forEach(cell => cell.div.parent(row))
      
      this.cells.push(cells);
    }
    
    addOptions(options) {
      this.options = this.options.concat(options);
    }
    
    initialize() {
      // mines
      for (let n = 0; n < N_MINES; n++) {
        const index = floor(random(0, this.options.length));
        const pos = this.options[index];
        const i = pos[0];
        const j = pos[1];
        
        this.options.splice(index, 1);
        
        const cell = this.cells[i][j];
        cell.hasMine = true
        this.mines.push(cell);
      }
      
      // values
      for (let i = 0; i < this.cells.length; i++) {
        for (let j = 0; j < this.cells.length; j++) {
          const cell = this.cells[i][j];
          
          if (cell.hasMine) {
            continue;
          }
          
          cell.mineCount = this.countMineInNeighbors(cell);
        }
      }
    }
    
    getNeighbors(cell) {
      let neighbors = [];
      for (let iOff = -1; iOff <= 1; iOff++) {
        for (let jOff = -1; jOff <= 1; jOff++) {
          const i = cell.i + iOff;
          const j = cell.j + jOff;
          
          if (i < 0 || i >= DIM || j < 0 || j >= DIM) {
            continue;
          }
          
          neighbors.push(this.cells[i][j]);
        }
      }
      
      return neighbors;
    }
    
    countMineInNeighbors(cell) {
      let count = 0;
      for (let neighbor of this.getNeighbors(cell)) {
          if (neighbor.hasMine) {
            count++;
          }
      }
      return count;
    }
    
    revealAll() {
      for (let i = 0; i < this.cells.length; i++) {
        for (let j = 0; j < this.cells.length; j++) {
          this.cells[i][j].reveal();
        }
      }
    }
    
    playerWin() {
      return this.mines.filter(cell => cell.isFlaged).length === this.mines.length;
    }
    
    revealMine() {
      this.mines.forEach(cell => cell.revealMine());
    }
    
  }