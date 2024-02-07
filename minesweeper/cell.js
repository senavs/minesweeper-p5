class Cell {
  
    constructor(i, j, board) {
      this.i = i;
      this.j = j;
      this.board = board;
      
      this.hasMine = false;
      this.mineCount = 0;
      this.isRevealed = false;
      this.isFlaged = false;
  
      this.div = createDiv();
      this.div.class("cell");
      this.div.mousePressed(() => this.reveal());
    }
    
    reveal(noRecursion) {    
      if (mouseButton == LEFT) { 
        if (this.isFlaged && !GAME_OVER) {
          return;
        }
            
        if (this.hasMine) {
          this.revealMine();
        } else if (this.isRevealed && !noRecursion) {       
          this.revealKnownNeighbors();
        } else if (this.isRevealed) {
          return;
        } else {
          this.revealValue();
        }
      } else if (mouseButton == RIGHT && !this.isRevealed) {
        this.setFlag();
      }
      
  
    }
    
    setFlag() {
      if (!this.isFlaged) {
        this.div.html("🚩");
        this.isFlaged = true;
      } else {
        this.div.html("");
        this.isFlaged = false;
      }
    }
    
    revealMine() {
      this.div.addClass("revealed");
      this.isRevealed = true;
      
      if (!this.isFlaged) {
        this.div.html("💣")
      } else {
        this.div.html("✅");
        
      }
      GAME_OVER = true;
    }
    
    revealValue() {
      this.div.addClass("revealed");
      this.isRevealed = true;
      
      if (this.mineCount > 0) {
        this.div.addClass(`mineCount${this.mineCount}`);      
        this.div.html(this.mineCount);
      } else {
        const neighbors = this.board.getNeighbors(this);
        neighbors.forEach(neighbor => neighbor.reveal())
        return;
      }
    }
    
    revealKnownNeighbors() {
      const neighbors = this.board.getNeighbors(this);
      const flagedNeighbors = neighbors.filter(cell => cell.isFlaged);
  
      if (flagedNeighbors.length >= this.mineCount) {
        neighbors.forEach(cell => {
          cell.reveal(true)
        });
      }
    }
  }