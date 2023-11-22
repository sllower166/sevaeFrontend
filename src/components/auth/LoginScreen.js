import { startLogin } from "../../actions/authActions";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { Logo } from "../ui/Logo";
import "./login.css";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    user_login: "",
    password_login: "",
  });

  const { user_login, password_login } = formLoginValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(user_login, password_login));
  };

  return (
    <div className="login-container">
      <Logo />

      <div className="login-form">
        <h3>Ingreso</h3>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>User</label>
            <input
              type="text"
              className="form-control"
              placeholder="School Username or ID"
              name="user_login"
              value={user_login}
              onChange={handleLoginInputChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Write your password"
              name="password_login"
              value={password_login}
              onChange={handleLoginInputChange}
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btnSubmit" value="Login" />
          </div>
        </form>
      </div>

      <div className="image-container-2">
        <img src="/assets/waves.png" alt="child sevae"></img>
      </div>

      <div className="h2-container ">
        <p className="h1-corner">
          SEVAE
          <span>SAFETY EDUCATION INNOVATION</span>
        </p>
      </div>
      <div className="image-container">
        <img
          src="/assets/child_not_bg.png"
          alt="child sevae"
          id="child_image"
        ></img>
        <img src="/assets/book_image.png" alt="book"></img>
      </div>
    </div>
  );
};
