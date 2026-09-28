import type {Board, Position, PieceType, LastMove} from "./type"

function movePiece(
    board: Board,
    currentPosition: Position,
    nextPosition: Position,
    lastMove: LastMove = null,
    promotionType?: PieceType,
): Board {
    
    const piece = board[currentPosition.row][currentPosition.column]

    if(!piece){
        return board
    }

    const nextBoard = board.map((row) => [...row])

    const isEnPassant = 
        piece.type === 'pawn' &&
        board[nextPosition.row][nextPosition.column] === null &&
        currentPosition.column !== nextPosition.column &&
        lastMove?.piece.type === 'pawn' &&
        lastMove.piece.color !== piece.color &&
        Math.abs(lastMove.to.row - lastMove.from.row) === 2 &&
        lastMove.to.row === currentPosition.row &&
        lastMove.to.column === nextPosition.column &&
        board[currentPosition.row][nextPosition.column]?.type === 'pawn'

    if (isEnPassant){
        nextBoard[currentPosition.row][nextPosition.column] = null
    }

    const isCastling =
        piece.type === 'king' &&
        currentPosition.row === nextPosition.row &&
        currentPosition.column === 4 &&
        (nextPosition.column === 2 || nextPosition.column === 6)

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
