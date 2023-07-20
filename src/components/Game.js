import React from 'react';
import GameWrapper from "./GameWrapper";
import HeaderPanel from "./HeaderPanel";
import Board from "./Board";
import ButtonPanel from "./ButtonPanel";
import RestartGame from "./RestartGame";
import useGame from "../hooks/useGame";
import useGameOver from "../hooks/useGameOver";
import { useReducer } from "react";
import { initialState, handleState } from "../business/jokerState";
import generateBoard from "../business/boardGenerator"; // Import the generateBoard function
import Score from './Score';


function Game({ onScoreUpdate, user }) {
  const [board, setBoard, score, setScore] = useGame();
  const [jokerState, dispatchJokerAction] = useReducer(handleState, JSON.parse(localStorage.getItem("jokerState")) || initialState);
  const [gameOver, setGameOver] = useGameOver(board, jokerState);

  const handleNewGame = () => {
    onScoreUpdate(score);
    resetBoard();
    resetScore();
    resetJokers();
    resetGameOver();
  };

  const resetBoard = () => {
    setBoard(generateBoard());
  };

  const resetScore = () => {
    setScore(0);
  };

  const resetJokers = () => {
    dispatchJokerAction({ type: "RESET" });
  };

  const resetGameOver = () => {
    setGameOver(false);
  };

  return (
    <GameWrapper gameState={gameOver}>
      <HeaderPanel>
        <Score score={score} />
        <ButtonPanel jokers={jokerState} dispatchJokerAction={dispatchJokerAction} />
      </HeaderPanel>
      <Board
        board={board}
        setBoard={setBoard}
        jokers={jokerState}
        dispatchJokerAction={dispatchJokerAction}
        gameOver={gameOver}
      />
      <RestartGame onNewGame={handleNewGame} score={score} user={user} />
    </GameWrapper>
  );
}

export default Game;
