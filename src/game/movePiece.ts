import type {Board, Position, PieceType} from "./type"
function movePiece(board: Board, currentPosition: Position, nextPosition: Position, promotionType? : PieceType): Board {
    
    const piece = board[currentPosition.row][currentPosition.column]

    if(!piece){
        return board
    }

    
    const nextBoard = board.map((row) => [...row])

    const isPromotion = piece.type === 'pawn' && (nextPosition.row === 0 || nextPosition.row === 7)

    const movedPiece = isPromotion ? {type: promotionType ?? 'queen', color: piece.color} : piece



    nextBoard[nextPosition.row][nextPosition.column] = movedPiece
    nextBoard[currentPosition.row][currentPosition.column] = null

    return nextBoard
}

export default movePiece