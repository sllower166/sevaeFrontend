import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startGetStudents,
  startManualAccessStudent,
} from "../../actions/studentsActions";
import { BackImg } from "../ui/BackImg";
import { Logo } from "../ui/Logo";

import "./manualAccess.css";
import { useForm } from "../../hooks/useForm";

export const ManualAccessScreen = () => {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.student.students);
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startGetStudents());
  }, [dispatch]);

  const [formValues, handleInputChange] = useForm({
    selectedStudent: "",
    selectedType: "",
    reason: "",
  });

  const { selectedStudent, selectedType, reason } = formValues;

  const handleManualAccess = (e) => {
    const selectedStudentObj = students.find(
      (student) => `${student.nombre} ${student.apellidos}` === selectedStudent
    );
    e.preventDefault();
    const data = {
      estudianteId: selectedStudentObj._id,
      tipoAcceso: formValues.selectedType,
      motivo: formValues.reason,
      usuarioID: uid,
    };
    dispatch(startManualAccessStudent(data));
  };

  return (
    <div className="params-container">
      <Logo />

      <div className="params-form">
        <h6>Ingreso manual de estudiantes</h6>
        <form onSubmit={handleManualAccess} className="form-container">
          <div className="form-group">
            <label>Seleccionar Estudiante:</label>
            <select
              className="form-control"
              value={selectedStudent}
              onChange={handleInputChange}
              name="selectedStudent"
              required
            >
              <option value="">Seleccionar estudiante</option>
              {students.map((student) => (
                <option key={student._id} value={student.id}>
                  {`${student.nombre} ${student.apellidos}`}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Tipo de registro:</label>
            <select
              className="form-control"
              value={selectedType}
              name="selectedType"
              onChange={handleInputChange}
              required
            >
              <option value="">Tipo de registro</option>
              <option value="Ingreso">Ingreso</option>
              <option value="Salida">Salida</option>
              <option value="Fuera de Horario">Fuera de Horario</option>
            </select>
          </div>

          <div className="form-group">
            <label>Motivo</label>
            <input
              type="textbox"
              className="form-control"
              placeholder="Motivo"
              name="reason"
              value={reason}
              onChange={handleInputChange}
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
