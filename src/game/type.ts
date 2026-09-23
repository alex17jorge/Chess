export type Color = 'white' | 'black';
export type PieceType = 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';
export type Piece = { type: PieceType; color: Color };
export type Square = Piece | null;
export type Board = Square[][];
export type Position = {
    row: number
    column: number
}