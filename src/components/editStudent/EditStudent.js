import React from "react";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { Logo } from "../ui/Logo";
import { BackImg } from "../ui/BackImg";
import { startUpdateStudent } from "../../actions/studentsActions";

import "./editStudent.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export const EditStudentScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { students } = useSelector((state) => state.student);
  let targetUpdate = students.filter((item) => item._id === id)[0];
  const [formNewStudentValues, handleStudentInputChange] = useForm({
    ...targetUpdate,
    acudienteNombre: targetUpdate.acudientes[0].nombre,
    acudienteTelefono: targetUpdate.acudientes[0].telefono,
    acudienteCorreo: targetUpdate.acudientes[0].correo,
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
    const newStudent = {
      id,
      nombre,
      apellidos,
      NUIP,
      grado,
      acudientes: {
        nombre: acudienteNombre,
        telefono: acudienteTelefono,
        correo: acudienteCorreo,
      },
    };
    dispatch(startUpdateStudent(newStudent));
  };

  return (
    <div className="student-container">
      <Logo />

      <div className="student-form">
        <h6>Editar de Estudiante</h6>
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
              disabled
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
            <input type="submit" className="btnSubmit" value="Guardar" />
          </div>
        </form>
      </div>

      <BackImg />
    </div>
  );
};
