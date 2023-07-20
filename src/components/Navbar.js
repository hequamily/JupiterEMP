
import { NavLink } from "react-router-dom";

function Navbar({user, handleLogOut }) {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    background: "#333",
    color: "#fff",
    padding: "10px",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    margin: "0 10px",
  };

  return (
    <nav style={navStyle}>
      <div>
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>
        {user ? <><NavLink to="/bejeweled" style={linkStyle}>
          Games
            </NavLink>
        <NavLink to="/highscores" style={linkStyle}>
          Highscores
        </NavLink> </> : null}
      </div>
      <div>
        {user ? <NavLink to="/profile" style={linkStyle}>
          Profile
        </NavLink> : null }
        {!user ? <NavLink to="/login" style={linkStyle}>
          Log In
        </NavLink> : <button onClick={handleLogOut}> Log Out </button> }

        {!user ? <NavLink to="/signup" style={linkStyle}>
          Sign up
        </NavLink> : null }
        {/* <NavLink to="/miditest" style={linkStyle}>
          Midi
        </NavLink> */}


      </div>
    </nav>
  );
}

export default Navbar;
