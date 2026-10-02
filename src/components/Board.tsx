import { useMemo, useState, useEffect } from "react";
import "../styles/board.css";

import { type Color, type PieceType, type Board, type Position, type CastlingRights, LastMove } from "../game/type"
import getLegalMoves from "../game/getLegalMoves";
import movePiece from "../game/movePiece";
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
    
    const START_TIME = 5 * 60;

    const [timeLeft, setTimeLeft] = useState({
        white: START_TIME,
        black: START_TIME
    })
    const [timerStarted, setTimerStarted] = useState(false)

    useEffect(() => {
        if (!timerStarted || status === 'checkmate' || status === 'stalemate'){
            return;
        }

        const timer = window.setInterval(() => {
            setTimeLeft((times) => {
                const updated = {
                    ...times,
                    [turn]: Math.max(0, times[turn] - 1)
                };
                return updated
            })

        }, 1000)
        return () => window.clearInterval(timer)
    }, [timerStarted, turn, status])

    useEffect(() => {
        if (timerStarted && timeLeft[turn] === 0) {
            setTimerStarted(false)
        }
    }, [timerStarted, timeLeft, turn])

    function formatTime(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
     }

    function resetGame() {
        setBoard(initialBoard)
        setSelected(null)
        setLegalMoves([])
        setTurn('white')
        setCastlingRights({
            whiteKingside: true,
            whiteQueenside: true,
            blackKingside: true,
            blackQueenside: true,
        })
        setLastMove(null)
        setTimeLeft({ white: START_TIME, black: START_TIME })
        setTimerStarted(false)
    }

    function handleSquareClick(row: number, column: number) {
        const clickedPiece = board[row][column]
        
        if (!timerStarted || timeLeft[turn] === 0) {
            return;
        }
    
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
            <div className="timer-controls">
                <button
                    type="button"
                    onClick={() => setTimerStarted(true)}
                    disabled={timerStarted}
                >
                    {timerStarted ? 'Timer running' : 'Start timer'}
                </button>
                <button type="button" onClick={resetGame}>
                    Reset game
                </button>
            </div>
            <div className="clocks">
                <div className={turn === "black" ? "inactive-clock" : ""}>
                    White: {formatTime(timeLeft.white)}
                </div>

                <div className={turn === "white" ? "inactive-clock" : ""}>
                    Black: {formatTime(timeLeft.black)}
                </div>
            </div>
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
