import { NavLink } from "react-router";

import logo from "../../assets/argentBankLogo.png";

export default function Header() {
  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        <NavLink className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i> Sign In
        </NavLink>
      </div>
    </nav>
  );
}
