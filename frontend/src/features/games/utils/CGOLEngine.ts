/**
 * Conway's Game of Life Canvas Engine
 */

export type GameState = 'MENU' | 'PLAYING' | 'HELP';

interface ButtonHitbox {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  action: () => void;
}

export class CGOLEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationFrameId: number = 0;
  
  // Game State
  private state: GameState = 'MENU';
  private running: boolean = false;
  private drawMode: boolean = false;
  private vertexMode: boolean = false;
  private showStats: boolean = false;
  
  // Grid properties
  private grid: boolean[][] = [];
  private cellSize: number = 10;
  private cols: number = 0;
  private rows: number = 0;
  
  // Time and Stats
  private lastTick: number = 0;
  private tickRate: number = 100;
  private generation: number = 0;
  private populationHistory: number[] = [];
  
  // Input tracking
  private isMouseDown: boolean = false;
  private lastMouseCell: { col: number, row: number } | null = null;
  
  // UI
  private buttons: ButtonHitbox[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Failed to get 2D context");
    this.ctx = ctx;
    
    this.handleResize();
    this.initGrid(false);
    
    // Bind methods
    this.loop = this.loop.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  public start() {
    window.addEventListener('resize', this.handleResize);
    this.canvas.addEventListener('click', this.handleClick);
    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('keydown', this.handleKeyDown);
    
    this.lastTick = performance.now();
    this.animationFrameId = requestAnimationFrame(this.loop);
  }

  public stop() {
    window.removeEventListener('resize', this.handleResize);
    this.canvas.removeEventListener('click', this.handleClick);
    this.canvas.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handleMouseUp);
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('keydown', this.handleKeyDown);
    
    cancelAnimationFrame(this.animationFrameId);
  }

  private handleResize() {
    const rect = this.canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
      this.cols = Math.floor(this.canvas.width / this.cellSize);
      this.rows = Math.floor(this.canvas.height / this.cellSize);
      
      // Preserve existing grid if resizing, otherwise create new
      const newGrid: boolean[][] = [];
      for (let r = 0; r < this.rows; r++) {
        newGrid[r] = [];
        for (let c = 0; c < this.cols; c++) {
          newGrid[r][c] = this.grid[r]?.[c] || false;
        }
      }
      this.grid = newGrid;
    }
  }

  private initGrid(useNoise: boolean = false) {
    this.generation = 0;
    this.populationHistory = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (useNoise) {
          // Simple pseudo-perlin/value noise substitute using sin
          const noise = (Math.sin(r * 0.1) + Math.cos(c * 0.1) + Math.random()) / 3;
          this.grid[r][c] = noise > 0.5;
        } else {
          this.grid[r][c] = Math.random() < 0.06;
        }
      }
    }
  }

  private clearGrid() {
    this.generation = 0;
    this.populationHistory = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.grid[r][c] = false;
      }
    }
  }

  private loop(timestamp: number) {
    if (this.state === 'PLAYING' && this.running && timestamp - this.lastTick > this.tickRate) {
      this.updateGrid();
      this.lastTick = timestamp;
    }
    this.render();
    this.animationFrameId = requestAnimationFrame(this.loop);
  }

  private countNeighbours(r: number, c: number): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const nr = r + i;
        const nc = c + j;
        if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
          if (this.grid[nr][nc]) count++;
        }
      }
    }
    return count;
  }

  private updateGrid() {
    const newGrid = this.grid.map(row => [...row]);
    let currentPopulation = 0;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const n = this.countNeighbours(r, c);
        if (this.grid[r][c]) {
          newGrid[r][c] = n === 2 || n === 3;
          if (newGrid[r][c]) currentPopulation++;
        } else {
          newGrid[r][c] = n === 3;
          if (newGrid[r][c]) currentPopulation++;
        }
      }
    }
    this.grid = newGrid;
    this.generation++;
    
    this.populationHistory.push(currentPopulation);
    if (this.populationHistory.length > 100) {
      this.populationHistory.shift(); // keep last 100
    }
  }

  // --- Rendering ---

  private render() {
    this.ctx.fillStyle = '#0a0a0a'; // neutral-950 bg equivalent
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.state === 'MENU') {
      this.renderMenu();
    } else if (this.state === 'HELP') {
      this.renderHelp();
    } else if (this.state === 'PLAYING') {
      this.renderGame();
    }
  }

  private renderMenu() {
    const cx = this.canvas.width / 2;
    let cy = this.canvas.height / 3;

    // Title
    this.ctx.fillStyle = '#facd8a';
    this.ctx.font = 'bold 48px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText("Conway's Game of Life", cx, cy);
    
    // Subtitle
    cy += 40;
    this.ctx.fillStyle = '#a3a3a3';
    this.ctx.font = '16px sans-serif';
    this.ctx.fillText("Cellular Automaton Engine", cx, cy);

    // Buttons
    this.buttons = [];
    const btnWidth = 200;
    const btnHeight = 50;
    const startY = cy + 60;
    const spacing = 70;

    const createBtn = (label: string, index: number, action: () => void) => {
      const y = startY + index * spacing;
      this.ctx.fillStyle = '#171717';
      this.ctx.fillRect(cx - btnWidth/2, y, btnWidth, btnHeight);
      this.ctx.strokeStyle = '#262626';
      this.ctx.strokeRect(cx - btnWidth/2, y, btnWidth, btnHeight);
      
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = '20px sans-serif';
      this.ctx.fillText(label, cx, y + 32);

      this.buttons.push({
        x: cx - btnWidth/2,
        y,
        width: btnWidth,
        height: btnHeight,
        label,
        action
      });
    };

    createBtn('Play', 0, () => { this.state = 'PLAYING'; });
    createBtn('Help', 1, () => { this.state = 'HELP'; });
  }

  private renderHelp() {
    const cx = this.canvas.width / 2;
    let cy = 80;

    this.ctx.fillStyle = '#facd8a';
    this.ctx.font = 'bold 36px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText("About & Controls", cx, cy);

    this.ctx.fillStyle = '#d4d4d4';
    this.ctx.font = '16px sans-serif';
    this.ctx.textAlign = 'left';
    
    const lines = [
      "This is a Cellular Automaton. A zero player game, your only involvement is to populate",
      "the grid. The cell behavior is dictated by the 3 following rules:",
      "",
      "1. A cell will reproduce if it has 2 surrounding cells.",
      "2. Cells die of overpopulation if one has > 3 surrounding cells.",
      "3. Cells die of underpopulation if one has < 2 surrounding cells.",
      "",
      "CONTROLS:",
      "P : Starts/Stops the game",
      "E : Enables draw mode (Click & Drag to paint cells)",
      "I : Display cell statistics (Population graph)",
      "V : Vertex mode (Pixels displayed 1 to 1 ratio)",
      "K : Initialize grid with Pseudo-Perlin Noise",
      "C : Clear grid",
      "+ / - : Zoom In / Out",
      "Esc : Return to Menu"
    ];

    cy += 40;
    const startX = Math.max(20, cx - 350);
    lines.forEach(line => {
      this.ctx.fillText(line, startX, cy);
      cy += 30;
    });

    // Back Button
    this.buttons = [];
    const btnWidth = 150;
    const btnHeight = 40;
    const btnX = cx - btnWidth/2;
    const btnY = cy + 40;

    this.ctx.fillStyle = '#171717';
    this.ctx.fillRect(btnX, btnY, btnWidth, btnHeight);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.textAlign = 'center';
    this.ctx.fillText("Back", cx, btnY + 26);

    this.buttons.push({
      x: btnX,
      y: btnY,
      width: btnWidth,
      height: btnHeight,
      label: 'Back',
      action: () => { this.state = 'MENU'; }
    });
  }

  private renderGame() {
    this.ctx.fillStyle = 'gray';
    const gridBorder = this.vertexMode ? 0 : 0.15;
    
    this.ctx.beginPath();
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.grid[r][c]) {
          const x = c * this.cellSize;
          const y = r * this.cellSize;
          if (this.vertexMode) {
             this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
          } else {
             this.ctx.fillRect(x + gridBorder*5, y + gridBorder*5, this.cellSize - gridBorder*10, this.cellSize - gridBorder*10);
          }
        }
        if (!this.vertexMode) {
           this.ctx.strokeStyle = '#333';
           this.ctx.lineWidth = gridBorder;
           this.ctx.strokeRect(c * this.cellSize, r * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }

    // Overlays
    this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, 40);

    this.ctx.fillStyle = '#facd8a';
    this.ctx.font = '16px sans-serif';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`State: ${this.running ? 'PLAYING' : 'PAUSED'} | Gen: ${this.generation} | Draw Mode: ${this.drawMode ? 'ON' : 'OFF'} | Vertex Mode: ${this.vertexMode ? 'ON' : 'OFF'}`, 20, 26);
    this.ctx.textAlign = 'right';
    this.ctx.fillText("Press Esc for Menu | H for Help", this.canvas.width - 20, 26);

    if (this.showStats) {
      this.renderStats();
    }
  }

  private renderStats() {
    const w = 300;
    const h = 150;
    const x = this.canvas.width - w - 20;
    const y = 60;

    this.ctx.fillStyle = 'rgba(20, 20, 20, 0.8)';
    this.ctx.fillRect(x, y, w, h);
    this.ctx.strokeStyle = '#facd8a';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(x, y, w, h);

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '12px sans-serif';
    this.ctx.textAlign = 'left';
    this.ctx.fillText("Population Graph", x + 10, y + 20);

    if (this.populationHistory.length < 2) return;

    const maxPop = Math.max(...this.populationHistory, 1);
    
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#4ade80'; // Green line for population
    this.ctx.lineWidth = 2;
    
    for (let i = 0; i < this.populationHistory.length; i++) {
      const px = x + 10 + (i / 100) * (w - 20);
      const py = y + h - 10 - (this.populationHistory[i] / maxPop) * (h - 40);
      if (i === 0) this.ctx.moveTo(px, py);
      else this.ctx.lineTo(px, py);
    }
    this.ctx.stroke();
  }

  // --- Input Handling ---

  private getCellFromMouse(e: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const c = Math.floor(mx / this.cellSize);
    const r = Math.floor(my / this.cellSize);
    return { r, c };
  }

  private handleMouseDown(e: MouseEvent) {
    if (this.state === 'PLAYING' && this.drawMode) {
      this.isMouseDown = true;
      const { r, c } = this.getCellFromMouse(e);
      this.toggleCell(r, c);
      this.lastMouseCell = { row: r, col: c };
    }
  }

  private handleMouseUp(e: MouseEvent) {
    this.isMouseDown = false;
    this.lastMouseCell = null;
  }

  private handleMouseMove(e: MouseEvent) {
    if (this.state === 'PLAYING' && this.drawMode && this.isMouseDown) {
      const { r, c } = this.getCellFromMouse(e);
      if (this.lastMouseCell && (this.lastMouseCell.row !== r || this.lastMouseCell.col !== c)) {
        this.toggleCell(r, c);
        this.lastMouseCell = { row: r, col: c };
      }
    }
  }

  private handleClick(e: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (this.state === 'MENU' || this.state === 'HELP') {
      for (const btn of this.buttons) {
        if (mx >= btn.x && mx <= btn.x + btn.width && my >= btn.y && my <= btn.y + btn.height) {
          btn.action();
          return;
        }
      }
    } else if (this.state === 'PLAYING') {
      // If not in draw mode, click toggles cell
      if (!this.drawMode) {
        const c = Math.floor(mx / this.cellSize);
        const r = Math.floor(my / this.cellSize);
        this.toggleCell(r, c);
      }
    }
  }

  private toggleCell(r: number, c: number) {
    if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) {
      this.grid[r][c] = !this.grid[r][c];
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    const key = e.key.toLowerCase();

    if (key === 'escape') {
      this.state = 'MENU';
      this.running = false;
      return;
    }

    if (this.state !== 'PLAYING') return;

    switch (key) {
      case 'p':
        this.running = !this.running;
        break;
      case 'e':
        this.drawMode = !this.drawMode;
        break;
      case 'i':
        this.showStats = !this.showStats;
        break;
      case 'v':
        this.vertexMode = !this.vertexMode;
        break;
      case 'k':
        this.initGrid(true); // noise based
        break;
      case 'c':
        this.clearGrid();
        break;
      case '+':
      case '=':
        this.cellSize = Math.min(this.cellSize + 2, 40);
        this.handleResize();
        break;
      case '-':
      case '_':
        this.cellSize = Math.max(this.cellSize - 2, 2);
        this.handleResize();
        break;
    }
  }
}
