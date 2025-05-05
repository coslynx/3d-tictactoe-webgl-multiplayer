import { useState, useCallback } from 'react';
import { checkWin } from '@/utils/gameLogic';

type BoardState = (string | null)[][];
type Player = 'X' | 'O';
type Winner = 'X' | 'O' | null;

type UseGameHook = {
  board: BoardState;
  currentPlayer: Player;
  winner: Winner;
  makeMove: (row: number, col: number) => void;
  resetGame: () => void;
};

const useGame = (): UseGameHook => {
  const [board, setBoard] = useState<BoardState>(() => Array(3).fill(null).map(() => Array(3).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Winner>(null);

  const checkTie = useCallback((currentBoard: BoardState): boolean => {
    return currentBoard.every(row => row.every(cell => cell !== null));
  }, []);

  const makeMove = useCallback((row: number, col: number) => {
    if (winner) {
      return;
    }

    setBoard(prevBoard => {
      if (prevBoard[row][col] !== null) {
        return prevBoard;
      }

      const newBoard = prevBoard.map((rowArray, i) =>
        i === row ? rowArray.map((cell, j) => (j === col ? currentPlayer : cell)) : rowArray
      );

      const newWinner = checkWin(newBoard);

      if (newWinner) {
        setWinner(newWinner);
      } else if (checkTie(newBoard)) {
        setWinner('T'); // 'T' for Tie
      } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }

      return newBoard;
    });
  }, [currentPlayer, winner, checkWin, checkTie]);

  const resetGame = useCallback(() => {
    setBoard(() => Array(3).fill(null).map(() => Array(3).fill(null)));
    setCurrentPlayer('X');
    setWinner(null);
  }, []);

  return {
    board,
    currentPlayer,
    winner,
    makeMove,
    resetGame,
  };
};

export { useGame };