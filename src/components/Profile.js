// import React, { useEffect, useState } from 'react';

// function Profile() {
//   const [userName, setUserName] = useState('');
//   const [userId, setUserId] = useState('');

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
//           setUserId(data.id);
//         }
//       })
//       .catch(error => {
//         console.error('Error occurred while checking session:', error);
//       });
//   }, []);

//   const handleDeleteUser = () => {
//     fetch(`http://localhost:7000/user/${userId}`, {
//       method: 'DELETE',
//     })
//       .then(response => {
//         if (response.status === 204) {
//           console.log('User deleted successfully');
//           // Perform any further actions, such as redirecting or updating state
//         } else {
//           console.error('Failed to delete user:', response.statusText);
//         }
//       })
//       .catch(error => {
//         console.error('Error occurred while deleting user:', error);
//       });
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <div className="profile-image"></div>
//         <div className="profile-info">
//           <h1>{userName}</h1>
//         </div>
//       </div>
//       <div className="profile-content">
//         <div className="profile-section">
//           <h2>Recently Played Games</h2>
//           <p>
//             <li>Snake</li>
//             <li>Vanguard Rover</li>
//             <li>PianoHero</li>
//           </p>
//         </div>
//         <div className="profile-section">
//           {/* Experience and other sections */}
//         </div>
//         <div className="profile-section">
//           <h2></h2>
//           <div className="item"></div>
//         </div>
//         <div className="profile-section">
//           <h2> </h2>
//         </div>
//       </div>
//       <button onClick={handleDeleteUser}>Delete Account</button>
//     </div>
//   );
// }

// export default Profile;


import React, { useEffect, useState } from 'react';

function Profile({setUser}) {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetch('/check_session')
      .then(response => {
        if (response.ok){
          response.json()
          .then(userData => {
          setUser(userData)
          setUserName(userData.username);
          setUserId(userData.id);
          })
        }
      })
      // .then(data => {
      //   if (response.ok) {
      //     // Handle the case when the user is not logged in
      //     console.log('Please Login');
      //   } else {
      //     // User is logged in, set the user's name
      //     setUserName(data.username);
      //     setUserId(data.id);
      //   }
      // })
      // .catch(error => {
      //   console.error('Error occurred while checking session:', error);
      // });
  }, []);

  const handleDeleteUser = () => {
    fetch(`http://localhost:7000/user/${userId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status === 204) {
          console.log('User deleted successfully');
          // Perform any further actions, such as redirecting or updating state
        } else {
          console.error('Failed to delete user:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error occurred while deleting user:', error);
      });
  };

  const profileContainerStyle = {
    textAlign: 'center',
    padding: '20px',
  };

  const profileHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  };

  const profileImageStyle = {
    width: '120px',
    height: '120px',
    backgroundColor: '#ddd',
    borderRadius: '50%',
  };

  const profileInfoStyle = {
    textAlign: 'left',
  };

  const profileContentStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginTop: '20px',
  };

  const profileSectionStyle = {
    backgroundColor: '#f5f5f5',
    padding: '15px',
    borderRadius: '8px',
  };

  const profileSectionTitleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const recentlyPlayedGamesStyle = {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  };

  const deleteButtonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <div style={profileContainerStyle}>
      <div style={profileHeaderStyle}>
        <div style={profileImageStyle}></div>
        <div style={profileInfoStyle}>
          <h1>{userName}</h1>
        </div>
      </div>
      <div style={profileContentStyle}>
        <div style={profileSectionStyle}>
          <h2 style={profileSectionTitleStyle}>Recently Played Games</h2>
          <ul style={recentlyPlayedGamesStyle}>
            <li>Snake</li>
            <li>Vanguard Rover</li>
            <li>PianoHero</li>
          </ul>
        </div>
        <div style={profileSectionStyle}>
          {/* Experience and other sections */}
        </div>
        <div style={profileSectionStyle}>
          <h2 style={profileSectionTitleStyle}></h2>
          <div className="item"></div>
        </div>
        <div style={profileSectionStyle}>
          <h2 style={profileSectionTitleStyle}> </h2>
        </div>
      </div>
      <button style={deleteButtonStyle} onClick={handleDeleteUser}>Delete Account</button>
    </div>
  );
}

export default Profile;



