import type { Color, Board, Position } from "../type"

function getBishopMoves(board: Board, row: number, column: number, color: Color){
    const moves: Position[] = []

    const positionDirection = [
        [-1, -1], //up-left
        [-1, 1], //up-right
        [1, 1], //down-right
        [1, -1] //down-left
    ]

    for (const [rowOffset, columnOffset] of positionDirection) {
        for (let i: number = 1; i < board.length; i++){
            const nextRow = row + i*rowOffset
            const nextColumn = column + i*columnOffset


            if (nextRow < 0 || nextRow >= 8 || nextColumn < 0 || nextColumn >= 8){
                break
            }

            const target = board[nextRow][nextColumn]

            if ( target === null){
            moves.push({row: nextRow, column: nextColumn})
            } else if (target.color !== color){
                moves.push({row: nextRow, column: nextColumn})
                break
            } else if (target.color === color){
                break
            }


        }
    }

    return moves

}

export default getBishopMoves