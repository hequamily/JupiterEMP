
// import React, { useEffect, useState } from 'react';

// const Home = () => {
//   const [userName, setUserName] = useState('');

//   useEffect(() => {
//     fetch('/check_session')
//       .then(response => response.json())
//       .then(data => {
//         if (data.error) {
//           // Handle the case when the user is not logged in
//           console.log('Please Login');
//         } else {
//           // User is logged in, set the user's name
//           setUserName(data.username);
//         }
//       })
//       .catch(error => {
//         console.error('Error occurred while checking session:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Welcome, {userName ? userName : 'Guest'}!</h1>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';

const Home = () => {
  const [userName, setUserName] = useState('');

  // useEffect(() => {
  //   fetch('/check_session')
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.error) {
  //         // Handle the case when the user is not logged in
  //         console.log('Please Login');
  //       } else {
  //         // User is logged in, set the user's name
  //         setUserName(data.username);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error occurred while checking session:', error);
  //     });
  // }, []);

  const welcomeStyle = {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '24px',
    color: '#333',
    fontWeight: 'bold',
  };

  return (
    <div>
      <h1 style={welcomeStyle}>Welcome, {userName ? userName : 'Guest'}!</h1>
    </div>
  );
};

export default Home;



