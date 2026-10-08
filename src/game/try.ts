import { perft } from "./perft"
import { initialBoard, initialCastlingRights } from "./initialBoard"

for (let depth = 1; depth <= 4; depth++) {
  const start = performance.now()
  const nodes = perft(initialBoard, 'white', initialCastlingRights, null, depth)
  const ms = performance.now() - start

  console.log("depth", depth, "nodes", nodes, "ms", Math.round(ms))
}