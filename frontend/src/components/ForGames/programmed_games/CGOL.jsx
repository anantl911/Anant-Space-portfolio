import React, { Component } from "react";


class ConwaysGame extends Component{
    constructor(){
        super();
        this.state = {
            grid: null,
            running: false
        }

        this.cellSize = 10;
        this.lifeProbability = 0.06;

        this.cellCount = null;
        this.canvaRef = React.createRef();

        this.totalCols = null;
        this.totalRows = null;

        this.interval = null;
    }

    componentDidMount = async () => {
        await this.gameInit();
        console.log("Grid: ", this.state.grid);
    }

    componentDidUpdate(){
        this.drawGrid();
    }

    getTotalRowsCols = () => {
        const canvas = this.canvaRef.current;
        this.totalCols = Math.floor(canvas.width / this.cellSize);
        this.totalRows = Math.floor(canvas.height / this.cellSize);
    }

    createEmptyGrid = () => {
        return Array(this.totalRows).fill(null).map(() =>  Array(this.totalCols).fill(null).map(() => false));

    };

    randomizeGrid = () => {
        return Array(this.totalRows).fill(null).map(() => Array(this.totalCols).fill(null).map(() => Math.random() < this.lifeProbability));
    };


    countNeighbours = (row, col) => {

        let neighbourCount = 0;

        for(let rowIncrement = -1 ; rowIncrement <= 1 ; ++rowIncrement){
            for(let colIncrement = -1 ; colIncrement <=1 ; ++colIncrement){

                const neighbourRow = row + rowIncrement;
                const neighbourCol = col + colIncrement;

                const rowBoundaryCheck = ((neighbourRow >= 0) && (neighbourRow < this.totalRows));
                const colBoundaryCheck = ((neighbourCol >= 0) && (neighbourCol < this.totalCols));

                if(!(rowIncrement === 0 && colIncrement === 0) &&
                rowBoundaryCheck && colBoundaryCheck) neighbourCount += this.state.grid[neighbourRow][neighbourCol] ? 1 : 0; 
            }
        }

        return neighbourCount;
    }

    getGameStatus = () => {
        console.log("Cell size: ", this.cellSize, "\nCell count: ", this.cellCount);
        console.log("\n");
    }

    startGame = () => {
        this.setState({running: true});
    }

    executeCellsLogic = (grid) => {
        let currentCellNeighbourCount;
        
        const duplicateGrid = grid.map(row => row.slice());

        for(let row = 0 ; row < this.totalRows ; ++row){
            for(let col = 0 ; col < this.totalCols ; ++col){
                currentCellNeighbourCount = this.countNeighbours(row, col);

                if(currentCellNeighbourCount === 3 && !duplicateGrid[row][col] ) duplicateGrid[row][col] = true;
                else if(currentCellNeighbourCount < 2 && duplicateGrid[row][col] ) duplicateGrid[row][col] = false;
                else if(currentCellNeighbourCount > 3 && duplicateGrid[row][col] ) duplicateGrid[row][col] = false;
            }
        }

        return duplicateGrid;
    }

    onClickCells = (mouse) => {
        const canvas = this.canvaRef.current;
        const rect = canvas.getBoundingClientRect();

        const x = mouse.clientX - rect.left;
        const y = mouse.clientY - rect.top;

        let col = Math.floor(x / this.cellSize);
        let row = Math.floor(y / this.cellSize);

        const duplicateGrid = this.state.grid.map(row => row.slice());
        duplicateGrid[row][col] = !duplicateGrid[row][col];

        this.setState({grid: duplicateGrid});

        console.log("Clicked cell: grid[",row,"][",col,"]");
    }

    drawGrid = () => {
        const canvas = this.canvaRef.current;

        const ctx = canvas.getContext("2d");

        const gridBorder = 0.15;

        if(!ctx) return;
        // ctx.strokeStyle = "#182022";

        // ctx.strokeStyle = "red";
        ctx.fillStyle = "gray";
        ctx.lineWidth = gridBorder.toString();
        ctx.clearRect(0,0,canvas.width, canvas.height);
        for(let row = 0 ; row < this.totalRows ; ++row){
            for(let col = 0 ; col < this.totalCols ; ++col){

                let startingRowPoint = (row + 1)*this.cellSize - this.cellSize;
                let startingColPoint = (col + 1)*this.cellSize - this.cellSize;
                
                if(this.state.grid[row][col]) ctx.fillRect(startingColPoint, startingRowPoint, this.cellSize - gridBorder*5, this.cellSize - gridBorder*5);
                ctx.strokeRect(startingColPoint, startingRowPoint, this.cellSize, this.cellSize);
            }
        }
        
    }

    gameInit = async () => {

        const canvas = this.canvaRef.current;
        const rect = canvas.getBoundingClientRect(); // Get rendered CSS size
        canvas.width = rect.width;
        canvas.height = rect.height;

        this.getTotalRowsCols();
        this.setState({
            grid: this.randomizeGrid()
        });
        this.startGame();
    }

    startGame = () => {
        if (this.state.running) return;

        this.setState({running : true }, () => {
            this.interval = setInterval(() => {
                this.setState(prevState => ({
                    grid: this.executeCellsLogic(prevState.grid)
                }));
            }, 100);
        });
    };
    
    stopGame = () => {
        this.setState({ running: false });
        clearInterval(this.interval);
    }

    drawStuff = () => {

        console.log("Click registered!");
        const canvas = this.canvaRef.current;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width;
        canvas.height = rect.height;

        const ctx = canvas.getContext("2d");

        if(!ctx) return;
        ctx.fillStyle = "red";
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.clearRect(0,0,canvas.width, canvas.height);

        console.log(this.createEmptyGrid());
    }

    clearGrid = () => {
        const canvas = this.canvaRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0,0,canvas.width, canvas.height);
    }

    render(){
        return(
            <section id="cgol-game">
                <div id="game-container" className="w-full h-[45vw]">
                    <canvas ref={this.canvaRef} className="w-full h-full" onClick={(e) => {
                        this.onClickCells(e);
                    }}></canvas>
                </div>
            </section>
        )
    }
}

export default ConwaysGame;