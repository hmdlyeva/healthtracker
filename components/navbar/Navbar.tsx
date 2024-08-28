import React from "react";
import "./navbar.scss";
type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="nav">
          <div className="logo">Health Tracker</div>
          <div className="links">
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Features</li>
              <li>Progress</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div className="auth_btns">
            <button>Log in</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
