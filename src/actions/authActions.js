import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { loadSchoolParams } from "./paramsActions";

export const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogin = (usuario, contraseña) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "directivo/login",
      { usuario, contraseña },
      "POST"
    );
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login({ uid: body.uid, name: body.name }));
      dispatch(loadSchoolParams());
    } else {
      const errorName = Object.keys(body.errors)[0];
      Swal.fire("Error", body.errors[errorName].msg, "error");
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("directivo/renew");
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login({ uid: body.uid }));
    } else {
      dispatch(checkingFinish());
    }
  };
};

export const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(logout());
  };
};
const logout = () => ({ type: types.authLogout });
