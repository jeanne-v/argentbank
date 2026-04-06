import { login } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function LogIn() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  function submitLogInForm(formData) {
    const data = {
      email: formData.get("username"),
      password: formData.get("password"),
    };

    dispatch(login(data));
  }

  const logInError = useSelector((state) => state.auth.error);

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form action={submitLogInForm}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input required type="text" id="username" name="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input required type="password" id="password" name="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" name="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button data-testid="signin-btn" className="sign-in-button">
            Sign In
          </button>
          {logInError && <p className="sign-in-error">{logInError}</p>}
        </form>
      </section>
    </main>
  );
}
