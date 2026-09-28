import type { Color, Board, Position, LastMove } from "../type"

function getPawnMoves(
    board: Board,
    row: number,
    column: number,
    color: Color,
    lastMove: LastMove = null
){
    const moves: Position[] = []

    let direction: number;
    let startingRow: number;

    if (color === 'white') {
        direction = -1
        startingRow = 6
    } else {
        direction = 1
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

    // capture left
    const captureLeft = column - 1
    if (nextRow >= 0 && nextRow < 8 && captureLeft >= 0 && 
        board[nextRow][captureLeft] !== null && board[nextRow][captureLeft]!.color !== color){
            moves.push({row: nextRow, column: captureLeft})
    }

    // capture right
    const captureRight = column + 1
    if (nextRow >= 0 && nextRow < 8 && captureRight < 8 && 
        board[nextRow][captureRight] !== null && board[nextRow][captureRight]!.color !== color){
            moves.push({row: nextRow, column: captureRight})
    }

    //en pessant
    if (lastMove && lastMove.piece.type === 'pawn'){
        const movedTwoSquares = Math.abs(lastMove.to.row - lastMove.from.row) === 2

        const pawnIsAdjacent = lastMove.to.row === row && Math.abs(lastMove.to.column - column) === 1

        const adjacentPiece = board[row][lastMove.to.column]

        if (movedTwoSquares && pawnIsAdjacent && adjacentPiece?.type === 'pawn' && adjacentPiece.color !== color){
            moves.push({row: row+direction, column: lastMove.to.column})
        }

    }

    return moves


}


export default getPawnMoves
