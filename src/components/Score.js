import React, { useEffect, useState } from 'react';
import ScoreStyles from "./css_modules/ScoreStyles.module.css";

const Score = ({ score }) => {
  const [userName, setUserName] = useState('');
  const [userScores, setUserScores] = useState([]);

  useEffect(() => {
    fetch('/check_session')
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          // Handle the case when the user is not logged in
          console.log('Please Login');
        } else {
          // User is logged in, set the user's name and scores
          setUserName(data.username);
          setUserScores(data.scores || []); // Assuming scores are returned as an array
        }
      })
      .catch(error => {
        console.error('Error occurred while checking session:', error);
      });
  }, []);

  const handlePatchScore = () => {
    const patchData = {
      value: score, 
    };
    console.log(patchData)
    // /scores/<int:id>
    // fetch('http://localhost:7000/scores/', ${score} , {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(patchData),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Score updated successfully:', data);
    //     // Handle any further actions or state updates as needed
    //   })
    //   .catch(error => {
    //     console.error('Error occurred while updating score:', error);
    //   });
  };

  return (
    <div className={ScoreStyles.scoreContainer}>
      <div>{userName}'s Scores</div>
      {userScores.map((userScore, index) => (
        <div key={index} className={ScoreStyles.score}>
          {userScore}
        </div>
      ))}
      <div className={ScoreStyles.score}>{score}</div>
      <button onClick={handlePatchScore}>Update Score</button>
    </div>
  );
};

export default Score;



// import React, { useEffect, useState } from 'react';
// import ScoreStyles from "./css_modules/ScoreStyles.module.css";

// const Score = ({ score }) => {
//   const [userName, setUserName] = useState('');
//   const [userScores, setUserScores] = useState([]);

//   useEffect(() => {
//     fetch('/check_session')
//       .then(response => response.json())
//       .then(data => {
//         if (data.error) {
//           // Handle the case when the user is not logged in
//           console.log('Please Login');
//         } else {
//           // User is logged in, set the user's name and scores
//           setUserName(data.username);
//           setUserScores(data.scores || []); // Assuming scores are returned as an array
//         }
//       })
//       .catch(error => {
//         console.error('Error occurred while checking session:', error);
//       });
//   }, []);

//   const handlePatchScore = () => {
//     const patchData = {
//       value: score, // The updated score value
//     };

//     fetch(`/scores/${scoreId}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(patchData),
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Score updated successfully:', data);
//         // Handle any further actions or state updates as needed
//       })
//       .catch(error => {
//         console.error('Error occurred while updating score:', error);
//       });
//   };

//   return (
//     <div className={ScoreStyles.scoreContainer}>
//       <div>{userName}'s Scores</div>
//       {userScores.map((userScore, index) => (
//         <div key={index} className={ScoreStyles.score}>
//           {userScore}
//         </div>
//       ))}
//       <div className={ScoreStyles.score}>{score}</div>
//       <button onClick={handlePatchScore}>Update Score</button>
//     </div>
//   );
// };

// export default Score;
