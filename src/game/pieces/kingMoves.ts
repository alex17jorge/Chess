import type {Board, Position, Color} from "../type"

function getKingMoves(board: Board, row: number, column:number, color: Color){
    const moves: Position[] = []

    const positionOffsets = [
        [-1, 0], //up
        [1, 0], //down
        [0, 1], //right
        [0, -1], //left
        [-1, -1], //up-left
        [-1, 1], //up-right
        [1, 1], //bottom-right
        [1, -1] //bottom-left
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

export default getKingMoves