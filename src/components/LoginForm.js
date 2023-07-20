import React, { useState } from 'react';

function LoginForm({handleFormSubmit, handleInputChange, setLoggedIn}) {

  // function logIn(event){
  //   console.log(event)
  //   if (event.target[3].value === "Username" && event.target[4].value === "Password") {
  //       setLoggedIn(true)
  //   } 

    // console.log(loggedIn)


  return (
    <div className="signin">
      <div className="content">
        <h2>Sign In</h2>
        <form className="form" onSubmit={handleFormSubmit}>
          <div className="inputBox">
            <input
              type="text"
              name="username"
              onChange={handleInputChange}
              required
            />
            <i>Username</i>
          </div>
          <div className="inputBox">
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              required
            />
            <i>Password</i>
          </div>
          <div className="links">
            {/* <a href="#">Forgot Password</a> */}
            <a href="#">Signup</a>
          </div>
          <div className="inputBox">
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
  }

export default LoginForm;


// import React from 'react';
// // import './style.css';


// function LoginForm() {
//   return (
//     <div className="signin">
//       <div className="content">
//         <h2>Sign In</h2>
//         <div className="form">
//           <div className="inputBox">
//             <input type="text" required />
//             <i>Username</i>
//           </div>
//           <div className="inputBox">
//             <input type="password" required />
//             <i>Password</i>
//           </div>
//           <div className="links">
//             <a href="#">Forgot Password</a>
//             <a href="#">Signup</a>
//           </div>
//           <div className="inputBox">
//             <input type="submit" value="Login" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;
