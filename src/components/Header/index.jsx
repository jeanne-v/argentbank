import { NavLink } from "react-router";
import { useSelector } from "react-redux";

import logo from "../../assets/argentBankLogo.png";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userFirstName = useSelector((state) => state.user.infos?.firstName);

  let nav = "";

  if (isLoggedIn) {
    nav = (
      <div>
        <NavLink className="main-nav-item" to="/profile">
          <i className="fa fa-user-circle"></i> {userFirstName}
        </NavLink>
        <NavLink className="main-nav-item" to="/">
          <i className="fa fa-sign-out"></i> Sign Out
        </NavLink>
      </div>
    );
  } else {
    nav = (
      <div>
        <NavLink className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i> Sign In
        </NavLink>
      </div>
    );
  }

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      {nav}
    </nav>
  );
}
