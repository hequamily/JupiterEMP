import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Game from './components/Game';
import Highscores from './components/Highscores';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Home from './components/Home';
import MidiEventLogger from './components/MidiTest';

function App() {
  const [highscore, setHighscore] = useState(0);
  const [user, setUser] = useState({})
  const [logInFormData, setLogInFormData] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)



  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(logInFormData)

    fetch("/login", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(logInFormData)
      })
      .then(res => {
        if (res.ok){
          res.json().then(userData => setUser(userData))
        }
      })

    // function logIn(event){
    //   console.log(event)
    //   if (event.target[3].value === "Username" && event.target[4].value === "Password") {
    //       setLoggedIn(true)
    //   } }

      // console.log(loggedIn)
    


  };

  const handleInputChange = (event) => {
    setLogInFormData({...logInFormData, [event.target.name]: event.target.value })
    
  };


  const handleScoreUpdate = (score) => {
    setHighscore(score);
  };

  function handleLogOut(){
    fetch("/logout", {
      method: "DELETE"
    })
    .then(response => {
      if (response.ok){
        setUser(null)
      }
      else{
        alert("ERROR: unable to logout")
      }
    })
  }
  return (
//     <BrowserRouter>
//   <div className="app">
//     <Header />
//     {loggedIn && <NavBar />}
//     <Routes>
//       <Route path="/" element={<h1>Home</h1>} />
//       {loggedIn ? (
//         <>
//           <Route path="/bejeweled" element={<Game onScoreUpdate={handleScoreUpdate} />} />
//           <Route path="/highscores" element={<Highscores highscore={highscore} />} />
//           <Route path="/profile" element={<Profile />} />
//         </>
//       ) : (
//         <>
//           <Route path="/login" element={<LoginForm setLoggedIn={setLoggedIn} handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} />} />
//           <Route path="/signup" element={<Signup />} />
//         </>
//       )}
//     </Routes>
//   </div>
// </BrowserRouter>


    <BrowserRouter>
   
      <div className="app">
        <Header />
      <Navbar user={user} handleLogOut={handleLogOut} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bejeweled" element={<Game onScoreUpdate={handleScoreUpdate} user={user}/>}/>
          <Route path="/highscores" element={<Highscores highscore={highscore} />}/>
          <Route path="/login" element={<LoginForm setLoggedIn={setLoggedIn} handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange}/>} />
          <Route path="/profile" element={<Profile setUser={setUser}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/miditest" element={<MidiEventLogger />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
