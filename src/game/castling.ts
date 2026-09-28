import isKingInCheck from "./isKingInCheck"
import movePiece from "./movePiece"
import type {Board, Position, Color, CastlingRights} from "./type"

function getCastlingMoves(board: Board, color: Color, rights: CastlingRights): Position[] {
    const moves: Position[] = []

    const row = color === 'white' ? 7 : 0
    const kingPosition = {row, column: 4}

    const king = board[row][4]

    if (!king || king.type !== 'king' || king.color !== color){
        return moves
    }

    if (isKingInCheck(board, color)){
        return moves
    }

    function canCastle(right: boolean, rookColumn: number, emptyColumns: number[], passingColumn: number, destinationColumn: number){
        if (!right){
            return
        }

        const rook = board[row][rookColumn]

        if (!rook || rook.type !== 'rook' || rook.color !== color){
            return
        }

        const pathIsClear = emptyColumns.every(
            (column) => board[row][column] === null
        )

        if (!pathIsClear){
            return
        }

        const passingBoard = movePiece(board, kingPosition, {row, column: passingColumn})

        const destinationBoard = movePiece(board, kingPosition, {row, column: destinationColumn} )

        if (isKingInCheck(passingBoard, color) || isKingInCheck(destinationBoard, color)){
            return
        }

        moves.push({row, column: destinationColumn})
    }

    if (color === 'white'){
        canCastle(rights.whiteKingside, 7, [5,6], 5, 6)
        canCastle(rights.whiteQueenside, 0, [1,2,3], 3, 2)
    } else {
        canCastle(rights.blackKingside, 7, [5,6], 5, 6)
        canCastle(rights.blackQueenside, 0, [1,2,3], 3, 2)
    }

    return moves

}

export default getCastlingMoves