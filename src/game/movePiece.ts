import type {Board, Position} from "./type"
function movePiece(board: Board, currentPosition: Position, nextPosition: Position): Board {
    
    const piece = board[currentPosition.row][currentPosition.column]

    if(!piece){
        return board
    }

    const nextBoard = board.map((row) => [...row])
    nextBoard[nextPosition.row][nextPosition.column] = piece
    nextBoard[currentPosition.row][currentPosition.column] = null

    return nextBoard
}

export default movePiece