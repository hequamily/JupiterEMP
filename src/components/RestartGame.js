// import RestartGameStyles from "./css_modules/RestartGameStyles.module.css"
// import generateBoard from "../business/boardGenerator";


// function RestartGame({ score, resetBoard, resetScore, resetJokers, resetGameOver }) {


//     const newGame = () => {
//         if (score) {
//             console.log(score)
//         }        // debugger;
//         // }fetch pass score with username on new game
//         resetBoard(generateBoard())
//         resetScore(0)
//         resetJokers({ type: "RESET" })
//         resetGameOver(false)
//     }

//     return (
//         <div className={RestartGameStyles.restartGameWrapper}>
//             <button className={RestartGameStyles.restartGame} onClick={newGame}>
//                 NEW GAME
//             </button>
//         </div>
//     )

// }

// export default RestartGame

// import React from 'react';
// import RestartGameStyles from "./css_modules/RestartGameStyles.module.css";
// import generateBoard from "../business/boardGenerator";

// function RestartGame({ onNewGame }) {
//   const newGame = () => {
//     onNewGame();
//   };

//   return (
//     <div className={RestartGameStyles.restartGameWrapper}>
//       <button className={RestartGameStyles.restartGame} onClick={newGame}>
//         NEW GAME
//       </button>
//     </div>
//   );
// }

// export default RestartGame;

import React, { useState } from 'react';
import RestartGameStyles from "./css_modules/RestartGameStyles.module.css";
import generateBoard from "../business/boardGenerator";
import axios from 'axios';

function RestartGame({ onNewGame, score, user }) {
  const newGame = () => {
    // Patch the score to the API
    console.log(user)
    if (user) {
      const scoreData = {
        username: user.username,
        game_id: 1,
        score: score
      };
      console.log(scoreData)
      fetch('http://localhost:7000/scores', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(scoreData)
      })
        .then(response => response.json())
        .then(data => {
          // Handle successful signup
          console.log(data.message);
        })
        .catch(error => {
          // Handle error during signup
          console.error(error);
        });


    }

    // Start a new game
    onNewGame();
  };

  return (
    <div className={RestartGameStyles.restartGameWrapper}>
      <button className={RestartGameStyles.restartGame} onClick={newGame}>
        NEW GAME
      </button>
    </div>
  );
}

export default RestartGame;


