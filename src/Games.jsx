import React, { useEffect, useState } from "react";
import "./personal.css";
import { newDeck, outcome, computerMove } from "./game-engine";

function readBest() { try { const n = Number(localStorage.getItem("ethan-memory-best-v1")); return Number.isInteger(n) && n > 0 ? n : null; } catch { return null; } }
function Memory({ active }) {
  const [deck, setDeck] = useState(newDeck), [picks, setPicks] = useState([]), [matched, setMatched] = useState([]), [moves, setMoves] = useState(0), [best, setBest] = useState(readBest);
  const complete = matched.length === deck.length;
  useEffect(() => {
    if (picks.length !== 2 || !active) return;
    const timer = setTimeout(() => {
      if (deck[picks[0]].symbol === deck[picks[1]].symbol) setMatched(old => [...old, ...picks]);
      setPicks([]);
    }, 700);
    return () => clearTimeout(timer);
  }, [picks, deck, active]);
  useEffect(() => {
    if (complete && (!best || moves < best)) { setBest(moves); try { localStorage.setItem("ethan-memory-best-v1", String(moves)); } catch {} }
  }, [complete, moves, best]);
  function reset() { setDeck(newDeck()); setPicks([]); setMatched([]); setMoves(0); }
  function pick(index) { if (picks.length === 2 || picks.includes(index) || matched.includes(index)) return; if (picks.length === 1) setMoves(n => n + 1); setPicks(old => [...old, index]); }
  return <section className="arcade-game"><div className="arcade-game-heading"><div><h2>Memory lane</h2><p>Find six matching pairs. Take your time.</p></div><button className="arcade-reset" onClick={reset}>New game</button></div>
    <div className="game-stats"><span>Moves <strong>{moves}</strong></span><span>Pairs <strong>{matched.length / 2} / 6</strong></span><span>Best <strong>{best || "—"}</strong></span></div>
    <div className="memory-board" aria-label="Memory card board">{deck.map((card, index) => {
      const faceUp = picks.includes(index) || matched.includes(index), solved = matched.includes(index);
      return <button key={card.id} className={`memory-card ${faceUp ? "flipped" : ""} ${solved ? "matched" : ""}`} aria-label={solved ? `Matched ${card.symbol}, card ${index + 1}` : faceUp ? `${card.symbol}, card ${index + 1}` : `Reveal card ${index + 1}`} aria-pressed={faceUp} disabled={solved || picks.length === 2 || picks.includes(index)} onClick={() => pick(index)}><span aria-hidden="true">{faceUp ? card.symbol : "✳"}</span></button>;
    })}</div><p className="game-status" role="status">{complete ? `All pairs found in ${moves} moves. Nicely done!` : picks.length === 2 ? "Checking your pair…" : "Pick a card, then find its match."}</p>
  </section>;
}
function TicTacToe({ active }) {
  const [board, setBoard] = useState(Array(9).fill(null)), [mode, setMode] = useState("computer");
  const result = outcome(board), turn = board.filter(Boolean).length % 2 ? "O" : "X";
  const thinking = mode === "computer" && turn === "O" && !result;
  useEffect(() => {
    if (!thinking || !active) return;
    const timer = setTimeout(() => setBoard(old => { if (outcome(old)) return old; const move = computerMove(old); return old.map((cell, index) => index === move ? "O" : cell); }), 400);
    return () => clearTimeout(timer);
  }, [board, thinking, active]);
  function reset(next = mode) { setMode(next); setBoard(Array(9).fill(null)); }
  return <section className="arcade-game"><div className="arcade-game-heading"><div><h2>A classic little challenge</h2><p>{mode === "computer" ? "You’re X. The desktop is O. Can you force a draw?" : "Pass the screen. X goes first."}</p></div><button className="arcade-reset" onClick={() => reset()}>New game</button></div>
    <div className="game-mode" aria-label="Tic-tac-toe players"><button aria-pressed={mode === "computer"} onClick={() => reset("computer")}>Vs desktop</button><button aria-pressed={mode === "friend"} onClick={() => reset("friend")}>Two players</button></div>
    <div className="tic-board" aria-label="Tic-tac-toe board">{board.map((cell, index) => <button key={index} className={`${cell ? `mark-${cell.toLowerCase()}` : ""} ${result?.line.includes(index) ? "winning-cell" : ""}`} aria-label={`Row ${Math.floor(index / 3) + 1}, column ${index % 3 + 1}: ${cell || "empty"}`} disabled={Boolean(cell || result || thinking)} onClick={() => setBoard(old => old.map((value, i) => i === index ? turn : value))}>{cell}</button>)}</div>
    <p className="game-status" role="status">{result ? result.winner === "draw" ? "A perfect little stalemate. Play again?" : `${result.winner === "X" && mode === "computer" ? "You" : result.winner === "O" && mode === "computer" ? "The desktop" : result.winner} won. Another round?` : thinking ? "The desktop is thinking…" : `${turn}’s turn${mode === "computer" ? " — that’s you" : ""}.`}</p>
  </section>;
}
export default function Games({ active }) {
  const [game, setGame] = useState("memory");
  return <div className="arcade-app"><header className="arcade-intro"><span className="personal-eyebrow">A small break from the serious stuff</span><h1>The little arcade.</h1><p>No account. No leaderboard. Just a good few minutes.</p></header><div className="arcade-picker" aria-label="Choose a game"><button aria-pressed={game === "memory"} onClick={() => setGame("memory")}><span>✳</span><strong>Memory lane</strong><small>Flip. Remember. Match.</small></button><button aria-pressed={game === "tic"} onClick={() => setGame("tic")}><span>×○</span><strong>Tic-tac-toe</strong><small>You, a friend, or the desktop.</small></button></div><div hidden={game !== "memory"}><Memory active={active && game === "memory"} /></div><div hidden={game !== "tic"}><TicTacToe active={active && game === "tic"} /></div><footer className="arcade-footer">Made for this desktop. Best Memory score stays on your device.</footer></div>;
}
