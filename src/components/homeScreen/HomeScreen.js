import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Logo } from "../ui/Logo";

import "./homeScreen.css";
import { startLogout } from "../../actions/authActions";

export const HomeScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div className="home-container">
      <Logo />

      <div className="grid-container">
        <Link to="/new-student">
          <div className="grid-item">
            <div className="icon-container">
              <img src="/assets/student.png" alt="student" id="student"></img>
            </div>
            <h6>Register new student</h6>
          </div>
        </Link>

        <Link to="/manual-access">
          <div className="grid-item">
            <div className="icon-container">
              <img
                src="/assets/keyboard.png"
                alt="keyboard"
                id="keyboard"
              ></img>
            </div>
            <h6>Manual student access</h6>
          </div>
        </Link>
        <Link to="/schoolparams">
          <div className="grid-item">
            <div className="icon-container">
              <img src="/assets/gears.png" alt="gears" id="gears"></img>
            </div>
            <h6>School params</h6>
          </div>
        </Link>
        <Link to="/students">
          <div className="grid-item">
            <div className="icon-container">
              <img
                src="/assets/students.png"
                alt="students"
                id="students"
              ></img>
            </div>
            <h6>Students</h6>
          </div>
        </Link>
        <Link to="/reports">
          <div className="grid-item">
            <div className="icon-container">
              <img src="/assets/reports.png" alt="reports" id="reports"></img>
            </div>
            <h6>Reports</h6>
          </div>
        </Link>
        <div className="grid-item" onClick={handleLogout}>
          <div className="icon-container">
            <img src="/assets/arrow.png" alt="arrow" id="arrow"></img>
          </div>
          <h6>Logout</h6>
        </div>
      </div>

      <div className="waves-container">
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
          src="/assets/girl_image.png"
          alt="girl sevae"
          id="girl_image"
        ></img>
      </div>
    </div>
  );
};
