import test from "node:test";
import assert from "node:assert/strict";
import { newDeck, outcome, computerMove } from "../src/game-engine.js";

test("Memory deals six distinct pairs with unique card identities", () => {
  const deck = newDeck();
  assert.equal(deck.length, 12);
  assert.equal(new Set(deck.map(card => card.id)).size, 12);
  const counts = new Map();
  for (const card of deck) counts.set(card.symbol, (counts.get(card.symbol) || 0) + 1);
  assert.equal(counts.size, 6);
  assert.ok([...counts.values()].every(count => count === 2));
});

test("Tic-tac-toe recognizes every winning line, a draw, and an ongoing game", () => {
  for (const line of [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]) {
    const board = Array(9).fill(null);
    for (const i of line) board[i] = "X";
    assert.equal(outcome(board)?.winner, "X");
  }
  assert.equal(outcome(["X","O","X","X","O","O","O","X","X"])?.winner, "draw");
  assert.equal(outcome(Array(9).fill(null)), null);
});

test("The desktop plays legal moves and never loses against any human move sequence", () => {
  let completed = 0;
  function explore(board) {
    const result = outcome(board);
    if (result) { assert.notEqual(result.winner, "X"); completed++; return; }
    for (let i = 0; i < 9; i++) if (!board[i]) {
      const next = board.map((cell, index) => index === i ? "X" : cell);
      const humanResult = outcome(next);
      if (humanResult) { assert.notEqual(humanResult.winner, "X"); completed++; continue; }
      const move = computerMove(next);
      assert.ok(move >= 0 && move < 9 && next[move] === null);
      next[move] = "O";
      explore(next);
    }
  }
  explore(Array(9).fill(null));
  assert.ok(completed > 100, "Checks more than 100 possible complete games");
});
