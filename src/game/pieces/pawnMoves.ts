import type { Color, Board, Position } from "../type"
function getPawnMoves(board: Board, row: number, column:number, color: Color){
    const moves: Position[] = []

    let direction: number;
    let startingRow: number;

    if (color === 'white') {
        direction = -1
        startingRow = 6
    } else {
        direction = +1
        startingRow = 1
    }

    const nextRow = row + direction

    // 1 square forward
    if (nextRow >= 0 && nextRow < 8 && board[nextRow][column] === null){
        moves.push({row: nextRow, column})
    }

    // 2 square forward 
    if (row === startingRow) {
        const twoRows = row + 2 * direction

        if (board[nextRow][column] === null && board[twoRows][column] === null){
            moves.push({row: twoRows, column})
        }
    }

    return moves


}


export default getPawnMoves