
import getLegalMoves from "./getLegalMoves";
import movePiece from "./movePiece";
import { Board, Color, CastlingRights, LastMove } from "./type";
import updateCastlingRights from "./updateCastlingRights";

export function perft(board: Board, turn: Color, rights: CastlingRights, lastMove: LastMove, depth: number): number {
    if (depth === 0){
        return 1
    }

    //total of positions found
    let nodes = 0

    //checks every square
    for (let row: number = 0; row < 8; row++){
        for (let column: number = 0; column < 8; column++){
            const piece = board[row][column]

            //skip empty square and opponents pieces
            if (!piece || piece.color !== turn) {
                continue
            }

            const from = {row: row, column: column}

            for (const to of getLegalMoves(board, row, column, rights, lastMove)){
                nodes += perft(
                    movePiece(board, from, to, lastMove),
                    turn === 'white' ? 'black' : 'white',
                    updateCastlingRights(rights, board, from , to),
                    {piece, from, to},
                    depth - 1
                )
            }
        }
    }

    return nodes

}

export default perft