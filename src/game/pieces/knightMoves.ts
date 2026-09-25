import type { Color, Board, Position } from "../type"

function getKnightMoves(board: Board, row: number, column: number, color: Color){
    const moves: Position[] = []

    const positionOffsets = [
        [-2,-1],
        [-2, 1],
        [-1, -2],
        [-1, 2],
        [1, -2],
        [1, 2],
        [2, -1],
        [2, 1],
    ]

    for (const [rowOffset, columnOffset] of positionOffsets){
        const nextRow = row + rowOffset
        const nextColumn = column + columnOffset

        if (nextRow < 0 || nextRow >= 8 || nextColumn < 0 || nextColumn >= 8){
            continue
        }

        const target = board[nextRow][nextColumn]

        if(target === null || target.color !== color){
            moves.push({row: nextRow, column: nextColumn})
        }
    }

    return moves

}

export default getKnightMoves