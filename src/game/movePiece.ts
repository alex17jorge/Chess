import type {Board, Position, PieceType} from "./type"
function movePiece(board: Board, currentPosition: Position, nextPosition: Position, promotionType? : PieceType): Board {
    
    const piece = board[currentPosition.row][currentPosition.column]

    if(!piece){
        return board
    }

    const nextBoard = board.map((row) => [...row])

    const isCastling = piece.type === 'king' && currentPosition.column === 4 && Math.abs(nextPosition.column - currentPosition.column) === 2

    if (isCastling) {
        const rookFromColumn = nextPosition.column > currentPosition.column ? 7 : 0
        const rookToColumn = nextPosition.column > currentPosition.column ? 5 : 3

        const rook = nextBoard[currentPosition.row][rookFromColumn] 

        if (rook){
            nextBoard[currentPosition.row][rookToColumn] = rook
            nextBoard[currentPosition.row][rookFromColumn] = null
        }
    }


    const isPromotion = piece.type === 'pawn' && (nextPosition.row === 0 || nextPosition.row === 7)

    const movedPiece = isPromotion ? {type: promotionType ?? 'queen', color: piece.color} : piece



    nextBoard[nextPosition.row][nextPosition.column] = movedPiece
    nextBoard[currentPosition.row][currentPosition.column] = null

    return nextBoard
}

export default movePiece