import type { Position, Board } from "./type"
import getPawnMoves from "./pieces/pawnMoves"
import getKnightMoves from "./pieces/knightMoves"
import getBishopMoves from "./pieces/bishopMoves"
import getRookMoves from "./pieces/rookMoves"
import getQueenMoves from "./pieces/queenMoves"
import getKingMoves from "./pieces/kingMoves"

function getLegalMoves(board: Board, row: number, column: number): Position[] {
    const piece = board[row][column]

    if (!piece){
        return []
    }

    switch (piece.type) {
        case 'pawn':
            return getPawnMoves(board, row, column, piece.color)
        
        case 'knight':
            return getKnightMoves(board, row, column, piece.color)

        case 'bishop':
            return getBishopMoves(board, row, column, piece.color)

        case 'rook':
            return getRookMoves(board, row, column, piece.color)
        
        case 'queen':
            return getQueenMoves(board, row, column, piece.color)
        
        case 'king':
            return getKingMoves(board, row, column, piece.color)

        default:
            return []
    }


}

export default getLegalMoves