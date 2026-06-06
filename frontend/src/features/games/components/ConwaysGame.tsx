import { useRef, useEffect, useCallback, useState } from 'react';
import { logger } from '@/utils/logger';

/** Grid type: 2D boolean array where true = alive, false = dead. */
type Grid = boolean[][];

const ConwaysGame: React.FC = () => {
  const [grid, setGrid] = useState<Grid | null>(null);
  const [running, setRunning] = useState(false);

  const canvaRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalColsRef = useRef(0);
  const totalRowsRef = useRef(0);

  const cellSize = 10;
  const lifeProbability = 0.06;

  // ---------------------------------------------------------------------------
  // Grid helpers
  // ---------------------------------------------------------------------------

  const getTotalRowsCols = useCallback(() => {
    const canvas = canvaRef.current;
    if (!canvas) return;
    totalColsRef.current = Math.floor(canvas.width / cellSize);
    totalRowsRef.current = Math.floor(canvas.height / cellSize);
  }, []);

  const randomizeGrid = useCallback((): Grid => {
    return Array(totalRowsRef.current)
      .fill(null)
      .map(() =>
        Array(totalColsRef.current)
          .fill(null)
          .map(() => Math.random() < lifeProbability),
      );
  }, []);

  const countNeighbours = useCallback(
    (currentGrid: Grid, row: number, col: number): number => {
      let neighbourCount = 0;
      const totalRows = totalRowsRef.current;
      const totalCols = totalColsRef.current;

      for (let rowIncrement = -1; rowIncrement <= 1; ++rowIncrement) {
        for (let colIncrement = -1; colIncrement <= 1; ++colIncrement) {
          const neighbourRow = row + rowIncrement;
          const neighbourCol = col + colIncrement;

          const rowBoundaryCheck =
            neighbourRow >= 0 && neighbourRow < totalRows;
          const colBoundaryCheck =
            neighbourCol >= 0 && neighbourCol < totalCols;

          if (
            !(rowIncrement === 0 && colIncrement === 0) &&
            rowBoundaryCheck &&
            colBoundaryCheck
          ) {
            neighbourCount += currentGrid[neighbourRow][neighbourCol] ? 1 : 0;
          }
        }
      }

      return neighbourCount;
    },
    [],
  );

  const executeCellsLogic = useCallback(
    (currentGrid: Grid): Grid => {
      const totalRows = totalRowsRef.current;
      const totalCols = totalColsRef.current;
      const duplicateGrid = currentGrid.map((row) => row.slice());

      for (let row = 0; row < totalRows; ++row) {
        for (let col = 0; col < totalCols; ++col) {
          const currentCellNeighbourCount = countNeighbours(
            currentGrid,
            row,
            col,
          );

          if (currentCellNeighbourCount === 3 && !duplicateGrid[row][col]) {
            duplicateGrid[row][col] = true;
          } else if (
            currentCellNeighbourCount < 2 &&
            duplicateGrid[row][col]
          ) {
            duplicateGrid[row][col] = false;
          } else if (
            currentCellNeighbourCount > 3 &&
            duplicateGrid[row][col]
          ) {
            duplicateGrid[row][col] = false;
          }
        }
      }

      return duplicateGrid;
    },
    [countNeighbours],
  );

  // ---------------------------------------------------------------------------
  // Drawing
  // ---------------------------------------------------------------------------

  const drawGrid = useCallback(() => {
    const canvas = canvaRef.current;
    if (!canvas || !grid) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridBorder = 0.15;
    const totalRows = totalRowsRef.current;
    const totalCols = totalColsRef.current;

    ctx.fillStyle = 'gray';
    ctx.lineWidth = gridBorder;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < totalRows; ++row) {
      for (let col = 0; col < totalCols; ++col) {
        const startingRowPoint = (row + 1) * cellSize - cellSize;
        const startingColPoint = (col + 1) * cellSize - cellSize;

        if (grid[row][col]) {
          ctx.fillRect(
            startingColPoint,
            startingRowPoint,
            cellSize - gridBorder * 5,
            cellSize - gridBorder * 5,
          );
        }
        ctx.strokeRect(startingColPoint, startingRowPoint, cellSize, cellSize);
      }
    }
  }, [grid]);

  // ---------------------------------------------------------------------------
  // Game lifecycle
  // ---------------------------------------------------------------------------

  /**
   * Marks the game as running (used for initial state setup).
   * Kept as a separate reference for potential future use.
   */
  const _setRunningFlag = useCallback(() => {
    setRunning(true);
  }, []);

  // Keep the reference accessible
  void _setRunningFlag;

  const startGame = useCallback(() => {
    if (running) return;

    setRunning(true);
    intervalRef.current = setInterval(() => {
      setGrid((prevGrid) => {
        if (!prevGrid) return prevGrid;
        return executeCellsLogic(prevGrid);
      });
    }, 100);
  }, [running, executeCellsLogic]);

  const stopGame = useCallback(() => {
    setRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Keep stopGame accessible for future use (Play/Pause button)
  void stopGame;

  // ---------------------------------------------------------------------------
  // Cell click handler
  // ---------------------------------------------------------------------------

  const onClickCells = useCallback(
    (mouse: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvaRef.current;
      if (!canvas || !grid) return;

      const rect = canvas.getBoundingClientRect();
      const x = mouse.clientX - rect.left;
      const y = mouse.clientY - rect.top;

      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);

      const duplicateGrid = grid.map((r) => r.slice());
      duplicateGrid[row][col] = !duplicateGrid[row][col];

      setGrid(duplicateGrid);
      logger.debug('Clicked cell: grid[', row, '][', col, ']');
    },
    [grid],
  );

  // ---------------------------------------------------------------------------
  // Initialization (replaces componentDidMount)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const canvas = canvaRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    getTotalRowsCols();
    const initialGrid = randomizeGrid();
    setGrid(initialGrid);

    logger.debug('Grid initialized:', initialGrid);
  }, [getTotalRowsCols, randomizeGrid]);

  // Auto-start when grid is ready (replaces the chained startGame call in gameInit)
  useEffect(() => {
    if (grid && !running) {
      startGame();
    }
    // Only run once when grid first becomes non-null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid !== null]);

  // Draw grid whenever it changes (replaces componentDidUpdate)
  useEffect(() => {
    drawGrid();
  }, [drawGrid]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section id="cgol-game">
      <div id="game-container" className="w-full h-[45vw]">
        <canvas
          ref={canvaRef}
          className="w-full h-full"
          onClick={onClickCells}
        />
      </div>
    </section>
  );
};

export default ConwaysGame;
