import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/authActions";

export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startLogout());
  };
  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand"> {name}</span>
      <button className="btn btn-outline-danger " onClick={handleLogout}>
        <i className="fa fa-sign-out" aria-hidden="true"></i>
        <span> Salir</span>
      </button>
    </nav>
  );
};
