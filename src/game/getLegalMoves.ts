import type { Position, Board, CastlingRights } from "./type"
import getPawnMoves from "./pieces/pawnMoves"
import getKnightMoves from "./pieces/knightMoves"
import getBishopMoves from "./pieces/bishopMoves"
import getRookMoves from "./pieces/rookMoves"
import getQueenMoves from "./pieces/queenMoves"
import getKingMoves from "./pieces/kingMoves"
import movePiece from "./movePiece"
import isKingInCheck from "./isKingInCheck"
import getCastlingMoves from "./castling"

function getLegalMoves(board: Board, row: number, column: number, castlingRights: CastlingRights): Position[] {
    const piece = board[row][column]

    if (!piece){
        return []
    }

    let possibleMoves: Position[] = []

    switch (piece.type) {
        case 'pawn':
            possibleMoves = getPawnMoves(board, row, column, piece.color)
            break
        
        case 'knight':
            possibleMoves = getKnightMoves(board, row, column, piece.color)
            break

        case 'bishop':
            possibleMoves = getBishopMoves(board, row, column, piece.color)
            break

        case 'rook':
            possibleMoves = getRookMoves(board, row, column, piece.color)
            break
        
        case 'queen':
            possibleMoves = getQueenMoves(board, row, column, piece.color)
            break
        
        case 'king':
            possibleMoves = getKingMoves(board, row, column, piece.color)
            possibleMoves.push(...getCastlingMoves(board, piece.color, castlingRights))
            break

        default:
            return []
            
    }

    const currentPosition = {row, column}

    return possibleMoves.filter((move)=> {
        const simulateBoard = movePiece(board, currentPosition, move)
        return !isKingInCheck(simulateBoard, piece.color)
    })
}

export default getLegalMoves