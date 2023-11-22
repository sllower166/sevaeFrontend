import React from "react";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { Logo } from "../ui/Logo";
import { BackImg } from "../ui/BackImg";
import { startCreateStudent } from "../../actions/studentsActions";

import "./newStudent.css";

export const NewStudentScreen = () => {
  const dispatch = useDispatch();

  const [formNewStudentValues, handleStudentInputChange] = useForm({
    nombre: "",
    apellidos: "",
    NUIP: "",
    grado: "",
    acudienteNombre: "",
    acudienteTelefono: "",
    acudienteCorreo: "",
    datosIE: [],
  });

  const {
    nombre,
    apellidos,
    NUIP,
    grado,
    acudienteNombre,
    acudienteTelefono,
    acudienteCorreo,
  } = formNewStudentValues;

  const handleNewStudent = (e) => {
    e.preventDefault();
    const datosIE = JSON.parse(localStorage.getItem("IE"));
    const newStudent = {
      nombre,
      apellidos,
      NUIP,
      grado,
      datosIE,
      acudientes: {
        nombre: acudienteNombre,
        telefono: acudienteTelefono,
        correo: acudienteCorreo,
      },
    };
    dispatch(startCreateStudent(newStudent));
  };

  return (
    <div className="student-container">
      <Logo />

      <div className="student-form">
        <h6>Registro de Estudiante</h6>
        <form onSubmit={handleNewStudent} className="form-container">
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del estudiante"
              name="nombre"
              value={nombre}
              onChange={handleStudentInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Apellidos</label>
            <input
              type="text"
              className="form-control"
              placeholder="Apellidos del estudiante"
              name="apellidos"
              value={apellidos}
              onChange={handleStudentInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>NUIP</label>
            <input
              type="number"
              className="form-control"
              placeholder="Número de Identificación Única"
              name="NUIP"
              value={NUIP}
              onChange={handleStudentInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Grado</label>
            <input
              type="number"
              className="form-control"
              placeholder="Grado del estudiante"
              name="grado"
              value={grado}
              onChange={handleStudentInputChange}
              required
            />
          </div>

          <h6>Acudiente</h6>

          <div className="form-group">
            <label>Nombre del Acudiente</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del acudiente"
              name="acudienteNombre"
              value={acudienteNombre}
              onChange={handleStudentInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Teléfono del Acudiente</label>
            <input
              type="text"
              className="form-control"
              placeholder="Teléfono del acudiente"
              name="acudienteTelefono"
              value={acudienteTelefono}
              onChange={handleStudentInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Correo del Acudiente</label>
            <input
              type="email"
              className="form-control"
              placeholder="Correo del acudiente"
              name="acudienteCorreo"
              value={acudienteCorreo}
              onChange={handleStudentInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btnSubmit" value="Registrar" />
          </div>
        </form>
      </div>

      <BackImg />
    </div>
  );
};
