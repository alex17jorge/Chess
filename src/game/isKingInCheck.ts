import getBishopMoves from "./pieces/bishopMoves"
import getKingMoves from "./pieces/kingMoves"
import getKnightMoves from "./pieces/knightMoves"
import getQueenMoves from "./pieces/queenMoves"
import getRookMoves from "./pieces/rookMoves"
import type {Board, Position, Color} from "./type"

function isKingInCheck(board: Board, kingColor: Color): boolean {
    let kingPosition: Position | null = null

    for (let row: number = 0; row < board.length; row++){
        for (let column: number = 0; column < board[row].length; column++){
            const square = board[row][column]

            if (square?.type === 'king' && square.color === kingColor){
                kingPosition = {row, column}
                break
            }
        }

        if (kingPosition){
            break
        }
    }

    if (!kingPosition){
        return false
    }

    const attackPositions: Position[] = []

    for (let row: number = 0; row < board.length; row++){
        for (let column: number = 0; column < board[row].length; column++){
            const square = board[row][column]

            if (!square || square.color === kingColor){
                continue
            }
            
            switch(square.type){
                case 'pawn': {
                    const direction = square.color === 'white' ? -1 : 1

                    for (const columnOffset of [-1, 1]) {
                        const attackRow = row + direction
                        const attackColumn = column + columnOffset

                        if (
                            attackRow >= 0 &&
                            attackRow < board.length &&
                            attackColumn >= 0 &&
                            attackColumn < board[attackRow].length
                        ) {
                            attackPositions.push({
                                row: attackRow,
                                column: attackColumn,
                            })
                        }
                    }

                    break
                }
                case 'knight':
                    attackPositions.push(...getKnightMoves(board, row, column, square.color))
                    break
                case 'bishop':
                    attackPositions.push(...getBishopMoves(board, row, column, square.color))
                    break
                case 'rook':
                    attackPositions.push(...getRookMoves(board, row, column, square.color))
                    break
                case 'queen':
                    attackPositions.push(...getQueenMoves(board, row, column, square.color))
                    break
                
                case 'king':
                    attackPositions.push(...getKingMoves(board, row, column, square.color))
                    break
                default:
                    break
                }  
        }
    }

    if (kingPosition && attackPositions.some(
        (position) => position.row === kingPosition.row && position.column === kingPosition.column)){
            return true
        }

    return false
}

export default isKingInCheck