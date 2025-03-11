import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Hide AddToDo, ViewMine, and ViewAll when on login or signup pages
  const hideLinks = location.pathname === "/" || location.pathname === "/signup";

  return (
    <nav className="navbar">
      <div className="logo">ToDoApp</div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {!hideLinks && (
          <>
            <li><Link to="/addToDo">AddToDo</Link></li>
            <li><Link to="/viewMine">ViewMine</Link></li>
            <li><Link to="/viewAll">ViewAll</Link></li>
          </>
        )}
        <li><Link to="/">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
