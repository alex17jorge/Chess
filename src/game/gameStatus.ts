import getLegalMoves from "./getLegalMoves"
import isKingInCheck from "./isKingInCheck"
import type { Color, Board, CastlingRights, LastMove } from "./type"

type GameStatus = | 'ongoing' | 'check' | 'checkmate' | 'stalemate'


function getGameStatus(
    board: Board,
    color: Color,
    castlingRights: CastlingRights,
    lastMove: LastMove = null
): GameStatus {
    const inCheck = isKingInCheck(board, color)
    let hasLegalMove = false

    for (let row = 0; row < board.length; row++){
        for (let column = 0; column < board[row].length; column++){
            const piece = board[row][column]

            if (!piece || piece.color !== color){
                continue
            }

            const legalMoves = getLegalMoves(board, row, column, castlingRights, lastMove)

            if (legalMoves.length > 0){
                hasLegalMove = true
                break
            }
        }

        if (hasLegalMove){
            break
        }
    }

    if (inCheck && !hasLegalMove){
        return 'checkmate'
    }

    if (!inCheck && !hasLegalMove){
        return 'stalemate'
    }

    if (inCheck){
        return 'check'
    }

    return 'ongoing'
}

export default getGameStatus
