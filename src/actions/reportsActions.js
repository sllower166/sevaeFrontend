import Swal from "sweetalert2";
import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";

export const generateReport = () => ({
  type: types.generateReport,
});

export const generateReportSuccess = (report) => ({
  type: types.generateReportSuccess,
  payload: report,
});

export const generateReportError = (error) => ({
  type: types.generateReportError,
  payload: error,
});

export const startGenerateReport = (reportParams) => {
  return async (dispatch) => {
    dispatch(generateReport());

    try {
      const resp = await fetchConToken(
        "reportes/generar",
        reportParams,
        "POST"
      );
      const body = await resp.json();

      if (body.ok) {
        dispatch(generateReportSuccess(body.reporte));
      } else {
        dispatch(generateReportError("Error al generar el reporte"));
        Swal.fire({
          title: "Error al generar el reporte",
          text: body.msg,
          icon: "error",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      dispatch(generateReportError("Error al generar el reporte"));
    }
  };
};
