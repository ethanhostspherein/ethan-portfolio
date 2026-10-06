const symbols = ["☕", "🧭", "⛰️", "📷", "🚂", "🌍"];
export function newDeck() {
  const cards = [...symbols, ...symbols].map((symbol, id) => ({ id, symbol }));
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
export function outcome(board) { for (const line of lines) if (board[line[0]] && line.every(i => board[i] === board[line[0]])) return { winner: board[line[0]], line }; return board.every(Boolean) ? { winner: "draw", line: [] } : null; }
function minimax(board, turn, depth = 0) {
  const result = outcome(board);
  if (result) return result.winner === "O" ? 10 - depth : result.winner === "X" ? depth - 10 : 0;
  const scores = board.flatMap((cell, i) => cell ? [] : [minimax(board.map((value, index) => index === i ? turn : value), turn === "O" ? "X" : "O", depth + 1)]);
  return turn === "O" ? Math.max(...scores) : Math.min(...scores);
}
export function computerMove(board) {
  let bestScore = -Infinity, move = -1;
  // Favor the center and corners when equivalent moves are available.
  for (const i of [4,0,2,6,8,1,3,5,7]) if (!board[i]) {
    const score = minimax(board.map((cell, index) => index === i ? "O" : cell), "X");
    if (score > bestScore) { bestScore = score; move = i; }
  }
  return move;
}
