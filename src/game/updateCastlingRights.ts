import type { Board, CastlingRights, Color, Position } from './type'

function disableRookRight(rights: CastlingRights, color: Color, position: Position): void {
  if (color === 'white' && position.row === 7) {
    if (position.column === 0) {
      rights.whiteQueenside = false
    }

    if (position.column === 7) {
      rights.whiteKingside = false
    }
  }

  if (color === 'black' && position.row === 0) {
    if (position.column === 0) {
      rights.blackQueenside = false
    }

    if (position.column === 7) {
      rights.blackKingside = false
    }
  }
}

function updateCastlingRights(rights: CastlingRights, board: Board, currentPosition: Position, nextPosition: Position): CastlingRights {
  const nextRights = { ...rights }
  const movingPiece = board[currentPosition.row][currentPosition.column]
  const capturedPiece = board[nextPosition.row][nextPosition.column]

  if (!movingPiece) {
    return nextRights
  }

  if (movingPiece.type === 'king') {
    if (movingPiece.color === 'white') {
      nextRights.whiteKingside = false
      nextRights.whiteQueenside = false
    } else {
      nextRights.blackKingside = false
      nextRights.blackQueenside = false
    }
  }

  if (movingPiece.type === 'rook') {
    disableRookRight(nextRights, movingPiece.color, currentPosition)
  }

  if (capturedPiece?.type === 'rook') {
    disableRookRight(nextRights, capturedPiece.color, nextPosition)
  }

  return nextRights
}

export default updateCastlingRights
