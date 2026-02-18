import { NavLink, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";

import logo from "../../assets/argentBankLogo.png";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userFirstName = useSelector((state) => state.user.infos?.firstName);

  async function handleLogoutClick() {
    await dispatch(logout()).unwrap();
    navigate("/");
  }

  let nav = "";

  if (isLoggedIn) {
    nav = (
      <div>
        <NavLink data-testid="logged-link" className="main-nav-item" to="/profile">
          <i className="fa fa-user-circle"></i> {userFirstName}
        </NavLink>
        <button className="main-nav-item" onClick={handleLogoutClick}>
          <i className="fa fa-sign-out"></i> Sign Out
        </button>
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
