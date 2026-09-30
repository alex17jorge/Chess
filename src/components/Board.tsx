import { useMemo, useState } from "react";
import "../styles/board.css";

import { type Color, type PieceType, type Board, type Position, type CastlingRights, LastMove } from "../game/type"
import getLegalMoves from "../game/getLegalMoves";
import movePiece from "../game/movePiece";
import isKingInCheck from "../game/isKingInCheck";
import updateCastlingRights from "../game/updateCastlingRights";
import getGameStatus from "../game/gameStatus";

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
    const [castlingRights, setCastlingRights] = useState<CastlingRights>({
        whiteKingside: true,
        whiteQueenside: true,
        blackKingside: true,
        blackQueenside: true
    })
    const [lastMove, setLastMove] = useState<LastMove>(null)


    const currentPlayer = turn === 'white' ? 'White' : 'Black'
    const status = useMemo(
        () => getGameStatus(board, turn, castlingRights, lastMove), [board, turn, castlingRights, lastMove])
    

    function handleSquareClick(row: number, column: number) {
        const clickedPiece = board[row][column]
        
   
        if(selected){
            const isLegalMove = legalMoves.some(
                (move) => move.row === row && move.column === column
            )

            if (isLegalMove){
                const destination = {row, column}
                const movingPiece = board[selected.row][selected.column]

                if (!movingPiece) {
                    return
                }

                setBoard(movePiece(board, selected, destination, lastMove))
                setLastMove({piece: movingPiece, from: selected, to: destination})
                setCastlingRights((currentRights) =>
                    updateCastlingRights(
                        currentRights,
                        board,
                        selected,
                        destination,
                    )
                )
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
            
            const moves = getLegalMoves(board, row, column, castlingRights, lastMove)
            setSelected({row, column})
            setLegalMoves(moves)
            return
        }
 
        setSelected(null)
        setLegalMoves([])
    }

    

    return (
        <>
            <h2>{currentPlayer}'s turn</h2>
            <h2>Game Status: {status}</h2>
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
        </>
        
    )
}


export default Board
