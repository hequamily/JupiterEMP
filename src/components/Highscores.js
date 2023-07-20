

import React from 'react';
import Score from './Score';

function Highscores({ highscore }) {
    
  return (
    <div className="highscore-tab">
      <h2>Highscores</h2>
      <Score score={highscore} />
    </div>
  );
}

export default Highscores;

