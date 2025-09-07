import { useState } from "react";
import "./App.css";
const dataArray = [
  {
    id: 1,
    steps: Infinity,
    name: "Queen",
    directions: {
      vertical: true,
      horizontal: true,
      diagonal: true,
    },
  },
  {
    id: 2,
    steps: Infinity,
    name: "Rook",
    directions: {
      vertical: true,
      horizontal: true,
      diagonal: false,
    },
  },
  {
    id: 3,
    steps: 1,
    name: "Knight",
    directions: {
      vertical: false,
      horizontal: false,
      diagonal: false,
    },
  },
  {
    id: 4,
    steps: Infinity,
    name: "Bishop",
    directions: {
      vertical: false,
      horizontal: false,
      diagonal: true,
    },
  },
  {
    id: 5,
    steps: 1,
    name: "King",
    directions: {
      vertical: true,
      horizontal: true,
      diagonal: true,
    },
  },
  {
    id: 6,
    steps: 1,
    name: "Pawn",
    directions: {
      vertical: true,
      horizontal: false,
      diagonal: false,
    },
  },
];

// [
//     [(0,0), (0,1), (0,2), (0,3), (0,4), (0,5), (0,6), (0,7)],
//     [(1,0), (1,1), (1,2), (1,3), (1,4), (1,5), (1,6), (1,7)],
//     [(2,0), (2,1), (2,2), (2,3), (2,4), (2,5), (2,6), (2,7)],
//     [(3,0), (3,1), (3,2), (3,3), (3,4), (3,5), (3,6), (3,7)],
//     [(4,0), (4,1), (4,2), (4,3), (4,4), (4,5), (4,6), (4,7)],
//     [(5,0), (5,1), (5,2), (5,3), (5,4), (5,5), (5,6), (5,7)],
//     [(6,0), (6,1), (6,2), (6,3), (6,4), (6,5), (6,6), (6,7)],
//     [(7,0), (7,1), (7,2), (7,3), (7,4), (7,5), (7,6), (7,7)],
// ]

const arr = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export default function App() {
  const [chessBoard, setChessBoard] = useState(arr);
  const [selectedOption, setSelectedOption] = useState(dataArray[0].id);

  const getBackgroundColor = (val, row_index, col_index) => {
    if (val === -1) return "darkgreen";
    if (val === 1) return "red";
    return (row_index + col_index) % 2 === 0 ? "white" : "black";
  };

  console.log({chessBoard})
  const changeChessAgent = (e) => {
    setSelectedOption(e.target.value);
    setChessBoard(arr);
  };

  const moveVertical = (row, col, steps, cloneChess) => {
        console.log({row, col, steps, cloneChess})

    for (let i = row + 1; i < 8 && i - row <= steps; i++) {
      console.log(i - row, "i :", i)
      cloneChess[i][col] = 1;
    }

    for (let i = row - 1; i >= 0 && row - i <= steps; i--) {
      cloneChess[i][col] = 1;
    }
  };

  const moveHorizontal = (row, col, steps, cloneChess) => {
    for (let i = col + 1; i < 8 && i - col <= steps; i++) {
      cloneChess[row][i] = 1;
    }

    for (let i = col - 1; i >= 0 && col - i <= steps; i--) {
      cloneChess[row][i] = 1;
    }
  };

  /* 
top-right -> row--, col++
top-left -> row--, col--
bottom-Left -> row++, col--
bottom-right -> row++, col++ */

  const moveDiagonal = (row, col, steps, cloneChess) => {
    // top-right -> row--, col++
    let rowD = row - 1,
      colD = col + 1,
      step = 0;
    while (rowD >= 0 && colD < 8 && step < steps) {
      cloneChess[rowD][colD] = 1;
      rowD--;
      colD++;
      step++;
    }

    // top-left -> row--, col--
    rowD = row - 1; 
    colD = col - 1; 
    step = 0;
    while (rowD >= 0 && colD >= 0 && step < steps) {
      cloneChess[rowD][colD] = 1;
      rowD--;
      colD--;
      step++;
    }

    // bottom-Left -> row++, col--
    rowD = row + 1;
    colD = col - 1; 
    step = 0;
    while (rowD < 8 && colD >= 0 && step < steps) {
      cloneChess[rowD][colD] = 1;
      rowD++;
      colD--;
      step++;
    }

    // bottom-right -> row++, col++
    rowD = row + 1; 
    colD = col + 1; 
    step = 0;
    while (rowD < 8 && colD < 8 && step < steps) {
      cloneChess[rowD][colD] = 1;
      rowD++;
      colD++;
      step++;
    }
  };

  const moveKnight = (row, col, steps, cloneChess) => {
    const knightMove = [
      [2, 1],
      [-2, 1],
      [-2, -1],
      [2, -1],
      [1, 2],
      [1, -2],
      [-1, -2],
      [-1, 2],
    ];

    knightMove.forEach((val) => {
      const newRow = row + val?.[0];
      const newCol = col + val?.[1];
      console.log([newCol, newRow]);

      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        cloneChess[newRow][newCol] = 1;
      }
    });
  };

  const markAgentMovesOnBoard = (e) => {
    const { target = {} } = e || {};
    const row = +target.getAttribute("data-row");
    const col = +target.getAttribute("data-col");

    const cloneChess = structuredClone(arr);
    cloneChess[row][col] = -1;
    const chessAgent = dataArray.find((data) => data.id == selectedOption);
    console.log({ chessAgent });

    if (chessAgent.directions.vertical) {
      moveVertical(row, col, chessAgent.steps, cloneChess);
    }

    if (chessAgent.directions.horizontal) {
      moveHorizontal(row, col, chessAgent.steps, cloneChess);
    }

    if (chessAgent.directions.diagonal) {
      moveDiagonal(row, col, chessAgent.steps, cloneChess);
    }

    if (chessAgent.name === "Knight") {
      moveKnight(row, col, chessAgent.steps, cloneChess);
    }

    setChessBoard(cloneChess);
  };

  return (
    <div>
      <div>
        <label htmlFor="dropdown">Choose an option: </label>
        <select
          id="dropdown"
          value={selectedOption}
          onChange={changeChessAgent}
        >
          {dataArray.map((player) => {
            return <option value={player.id}>{player.name}</option>;
          })}
        </select>
      </div>
      <div className="board" onClick={markAgentMovesOnBoard}>
        {chessBoard.map((row, row_index) => {
          return (
            <div className="row">
              {row.map((val, col_index) => {
                return (
                  <div
                    className="box"
                    style={{
                      backgroundColor: getBackgroundColor(
                        val,
                        row_index,
                        col_index
                      ),
                      color: "blue",
                    }}
                    data-row={row_index}
                    data-col={col_index}
                  >
                    {/* ({row_index}, {col_index}) */}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
