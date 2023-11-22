import React from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { Logo } from "../ui/Logo";
import { BackImg } from "../ui/BackImg";
import { startGenerateReport } from "../../actions/reportsActions";

import "./reportsScreen.css";
import BarsChart from "../reportsChart/ReportsChart";
import MultiLineChart from "../reportsChart/MultiLineChart";

export const ReportsScreen = () => {
  const dispatch = useDispatch();

  const [formReportsValues, handleInputChange] = useForm({
    fechaInicio: new Date(),
    fechaFin: new Date(),
    selectedType: "",
  });

  const { fechaInicio, fechaFin, selectedType } = formReportsValues;
  const { report } = useSelector((state) => state.reports);
  const reportsData = report.map((report) => report.registros).flat();
  const handleReports = (e) => {
    e.preventDefault();
    if (new Date(fechaInicio) < new Date(fechaFin)) {
      dispatch(startGenerateReport(formReportsValues));
    } else {
      Swal.fire({
        title: "Error en el filtro",
        text: "La fecha de inicio no puede ser mayor que la fecha de fin",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="params-container">
      <Logo />

      <div className="params-form">
        <h6>Filtros Reporte</h6>
        <form onSubmit={handleReports} className="form-container">
          <div className="form-row align-items-center">
            <div className="form-group col-md-3">
              <label>Fecha inicio</label>
              <input
                type="date"
                className="form-control"
                onChange={handleInputChange}
                value={fechaInicio}
                name="fechaInicio"
                required
              />
            </div>

            <div className="form-group col-md-3">
              <label>Fecha fin</label>
              <input
                type="date"
                className="form-control"
                placeholder="Hora de ingreso"
                name="fechaFin"
                value={fechaFin}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group col-md-3 ">
              <label>Tipo de registro:</label>
              <select
                className="form-control"
                value={selectedType}
                name="selectedType"
                onChange={handleInputChange}
                required
              >
                <option value="">Tipo de registro</option>
                <option value="Todos">Todos</option>
                <option value="Ingreso">Ingreso</option>
                <option value="Salida">Salida</option>
                <option value="Fuera de Horario">Fuera de Horario</option>
              </select>
            </div>

            <div className="form-group col-md-3 mt-2">
              <input type="submit" className="btnSubmit" value="Filtrar" />
            </div>
          </div>
        </form>
        {reportsData.length > 0 && (
          <div className="chart-container">
            <BarsChart reportsData={reportsData} />
            <MultiLineChart data={reportsData} />
          </div>
        )}
      </div>

      <BackImg />
    </div>
  );
};
