import { useState } from "react";
import "../styles/board.css";

import type { Color, PieceType, Piece, Square, Board, Position } from "../game/type"
import getLegalMoves from "../game/getLegalMoves";

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
    const [legalMoves, setLegalMoves] = useState<Position[]>([])

    function handleSquareClick(row: number, column: number) {
        const clickedPiece = board[row][column]
        
        if (clickedPiece !== null){
            setSelected({row, column})
            setLegalMoves(getLegalMoves(board, row, column))
            return
            
        }
        setSelected(null)
        setLegalMoves([])

    }

    

    return (
        <div className="board">
            {board.map((row, rowIndex) => 
                row.map((square, columnIndex) => {
                    const isDark = (rowIndex + columnIndex) % 2 === 1
                    const isSelected = selected?.row === rowIndex && selected?.column === columnIndex
                    const isLegalMove = legalMoves.some((move) => move.row === rowIndex && move.column === columnIndex)
                    return (
                        <button 
                            type='button'
                            className={`square ${isDark ? 'dark' : 'light'} ${isSelected ? 'selected' : ''} ${isLegalMove ? 'legal-move' : ''}`} 
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