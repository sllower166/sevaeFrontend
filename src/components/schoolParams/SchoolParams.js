import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { Logo } from "../ui/Logo";
import { BackImg } from "../ui/BackImg";
import { startUpdateSchoolParams } from "../../actions/paramsActions";

import "./schoolParams.css";

export const SchoolParams = () => {
  const dispatch = useDispatch();

  const schoolParams = JSON.parse(localStorage.getItem("IE"));

  const [formSchoolParamsValues, handleParamsInputChange] = useForm({
    nombreIE: schoolParams.nombreIE || "",
    horaIngreso: schoolParams.horaIngreso || "",
    horaSalida: schoolParams.horaSalida || "",
  });

  const { nombreIE, horaIngreso, horaSalida } = formSchoolParamsValues;

  const handleSchoolParams = (e) => {
    e.preventDefault();
    dispatch(startUpdateSchoolParams(formSchoolParamsValues));
  };

  return (
    <div className="params-container">
      <Logo />

      <div className="params-form">
        <h6>Parametros de la Institución</h6>
        <form onSubmit={handleSchoolParams} className="form-container">
          <div className="form-group">
            <label>Nombre IE</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de la institución"
              name="nombreIE"
              value={nombreIE}
              onChange={handleParamsInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Hora Ingreso</label>
            <input
              type="time"
              className="form-control"
              placeholder="Hora de ingreso"
              name="horaIngreso"
              value={horaIngreso}
              onChange={handleParamsInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Hora Salida</label>
            <input
              type="time"
              className="form-control"
              placeholder="Hora de salida"
              name="horaSalida"
              value={horaSalida}
              onChange={handleParamsInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input type="submit" className="btnSubmit" value="Guardar" />
          </div>
        </form>
      </div>

      <BackImg />
    </div>
  );
};
