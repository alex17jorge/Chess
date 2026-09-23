import { useState } from "react";
import "../styles/board.css";

type Color = 'white' | 'black';
type PieceType = 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';
type Piece = { type: PieceType; color: Color };
type Square = Piece | null;
type Board = Square[][];
type Position = {
    row: number
    column: number
}

const pieceSymbols: Record<PieceType, string> = {
  pawn: '♟',
  knight: '♞',
  bishop: '♝',
  rook: '♜',
  queen: '♛',
  king: '♚',
}

const initialBoard : Board = [
    [{type: 'rook', color: 'black'}, {type: 'knight', color: 'black'}, {type: 'bishop', color: 'black'}, {type: 'queen', color: 'black'}, {type: 'king', color: 'black'}, {type: 'bishop', color: 'black'}, {type: 'knight', color: 'black'}, {type: 'rook', color: 'black'}],
    [{type: 'pawn', color: 'black'}, {type: 'pawn', color: 'black'}, {type: 'pawn', color: 'black'}, {type: 'pawn', color: 'black'}, {type: 'pawn', color: 'black'}, {type: 'pawn', color: 'black'}, {type: 'pawn', color: 'black'}, {type: 'pawn', color: 'black'}],
    [null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null,],
    [{type: 'pawn', color: 'white'}, {type: 'pawn', color: 'white'}, {type: 'pawn', color: 'white'}, {type: 'pawn', color: 'white'}, {type: 'pawn', color: 'white'}, {type: 'pawn', color: 'white'}, {type: 'pawn', color: 'white'}, {type: 'pawn', color: 'white'}],
    [{type: 'rook', color: 'white'}, {type: 'knight', color: 'white'}, {type: 'bishop', color: 'white'}, {type: 'queen', color: 'white'}, {type: 'king', color: 'white'}, {type: 'bishop', color: 'white'}, {type: 'knight', color: 'white'}, {type: 'rook', color: 'white'}],
]

function Board(){
    const [board, setBoard] = useState(initialBoard)
    const [selected, setSelected] = useState<Position | null>(null)

    function handleSquareClick(row: number, column: number) {
        const clickedPiece = board[row][column]
        
        if (clickedPiece !== null){
            setSelected({row, column})
        }
    }

    

    return (
        <div className="board">
            {board.map((row, rowIndex) => 
                row.map((square, columnIndex) => {
                    const isDark = (rowIndex + columnIndex) % 2 === 1
                    const isSelected = selected?.row === rowIndex && selected?.column === columnIndex
                    return (
                        <button 
                            type='button'
                            className={`square ${isDark ? 'dark' : 'light'} ${isSelected ? 'selected' : ''}`} 
                            key={`${rowIndex}-${columnIndex}`}
                            onClick={()=> handleSquareClick(rowIndex, columnIndex)}
                        >   
                            {square && (
                                <span className={square.color}>{pieceSymbols[square.type]}</span>
                            )}
                        </button>
                    )
                }),
            )}
        </div>
    )
}


export default Board