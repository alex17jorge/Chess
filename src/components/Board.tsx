import { useState } from "react";
import "../styles/board.css";

import type { Color, PieceType, Piece, Square, Board, Position } from "../game/type"
import getLegalMoves from "../game/getLegalMoves";
import movePiece from "../game/movePiece";

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
    const [turn, setTurn] = useState<Color>('white')

    function handleSquareClick(row: number, column: number) {
        const clickedPiece = board[row][column]
        
   
        if(selected){
            const isLegalMove = legalMoves.some(
                (move) => move.row === row && move.column === column
            )

            if (isLegalMove){
                setBoard(movePiece(board, selected, {row, column}))
                setTurn((currentTurn) => currentTurn === 'white' ? 'black' : 'white')
                setSelected(null)
                setLegalMoves([])
                return
            }
        }

        if (clickedPiece !== null){
            if (clickedPiece.color !== turn){
                return
            }
            
            const moves = getLegalMoves(board, row, column)
            setSelected({row, column})
            setLegalMoves(moves)
            console.log(moves)
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