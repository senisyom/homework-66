import { NavLink } from "react-router-dom";
import "./Toolbar.css";

const ToolBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container">
        <NavLink to="/">
          <span className="navbar-brand mb-0 text-white fs-1">
            Calorie tracker
          </span>
        </NavLink>
        <div className="ms-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-new-meal">
                Add new meal
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default ToolBar;
