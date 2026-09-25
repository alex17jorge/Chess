import type { Color, Board, Position } from "../type"

function getRookMoves(board: Board, row: number, column: number, color: Color){
    const moves: Position[] = []

    const positionDirection = [
        [-1, 0], //up
        [1, 0], //down
        [0, -1], //left
        [0, 1], //right
    ]

    for (const [rowOffset, columnOffset] of positionDirection){
        for (let i: number = 1; i < board.length; i++){
            const nextRow = row + i*rowOffset
            const nextColumn = column + i*columnOffset

            if (nextRow < 0 || nextRow >= 8 || nextColumn < 0 || nextColumn >= 8){
                break
            }

            const target = board[nextRow][nextColumn]
            
            if (target === null){
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

export default getRookMoves