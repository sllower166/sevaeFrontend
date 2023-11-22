import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";
import Swal from "sweetalert2";

export const loadSchoolParams = () => {
  return async (dispatch) => {
    try {
      const response = await fetchConToken("schoolparams");
      const data = await response.json();
      if (data.ok) {
        const parametrosIE = data.parametrosIE[0];
        localStorage.setItem("IE", JSON.stringify(parametrosIE));
      }
    } catch (error) {
      console.error("Error al cargar los parámetros de la institución", error);
    }
  };
};

export const setSchoolParams = (params) => ({
  type: types.setSchoolParams,
  payload: params,
});

export const updateSchoolParams = (params) => ({
  type: types.updateSchoolParams,
  payload: params,
});

export const startUpdateSchoolParams = (params) => {
  return async (dispatch) => {
    try {
      const response = await fetchConToken("schoolparams", params, "PUT");

      if (response.ok) {
        dispatch(loadSchoolParams);
        dispatch(updateSchoolParams(response.body));
        localStorage.setItem("IE", JSON.stringify(params));
        Swal.fire("Guardado");
      } else {
        console.error("Error al actualizar los parámetros de la institución");
      }
    } catch (error) {
      console.error(
        "Error al actualizar los parámetros de la institución",
        error
      );
    }
  };
};

export const startSetSchoolParams = (params) => {
  return async (dispatch) => {
    try {
      const response = await fetchConToken("schoolparams", params, "POST");
      if (response.ok) {
        dispatch(setSchoolParams(params));
      } else {
        console.error("Error al establecer los parámetros de la institución");
      }
    } catch (error) {
      console.error(
        "Error al establecer los parámetros de la institución",
        error
      );
    }
  };
};
