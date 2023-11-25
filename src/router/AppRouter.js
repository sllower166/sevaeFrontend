import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";
import { startChecking } from "../actions/authActions";
import { LoginScreen } from "../components/auth/LoginScreen";
import { HomeScreen } from "../components/homeScreen/HomeScreen";
import { NewStudentScreen } from "../components/newStudent/NewStudent";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { SchoolParams } from "../components/schoolParams/SchoolParams";
import { StudentList } from "../components/studentList/StudentList";
import { EditStudentScreen } from "../components/editStudent/EditStudent";
import { ManualAccessScreen } from "../components/manualAccess/ManualAccess";
import { ReportsScreen } from "../components/reportsScreen/ReportsScreen";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(startChecking());
  // }, [dispatch, checking, uid]);

  if (checking) {
    return <h1>Espere..</h1>;
  }

  return (
    <div>
      <Router>
        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={LoginScreen}
            isAuthenticated={!!uid}
          />

          <PrivateRoute
            exact
            path="/"
            component={HomeScreen}
            isAuthenticated={!!uid}
          />

          <PrivateRoute
            exact
            path="/new-student"
            component={NewStudentScreen}
            isAuthenticated={!!uid}
          />

          <PrivateRoute
            exact
            path="/schoolparams"
            component={SchoolParams}
            isAuthenticated={!!uid}
          />
          <PrivateRoute
            exact
            path="/students"
            component={StudentList}
            isAuthenticated={!!uid}
          />
          <PrivateRoute
            exact
            path="/students/edit/:id"
            component={EditStudentScreen}
            isAuthenticated={!!uid}
          />
          <PrivateRoute
            exact
            path="/manual-access"
            component={ManualAccessScreen}
            isAuthenticated={!!uid}
          />
          <PrivateRoute
            exact
            path="/reports"
            component={ReportsScreen}
            isAuthenticated={!!uid}
          />

          <Redirect to={"/"} />
        </Switch>
      </Router>
    </div>
  );
};
