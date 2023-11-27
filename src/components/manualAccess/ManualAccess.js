import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
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
  const optionsField = students.map((student) => ({
    value: student.NUIP,
    label: `${student.nombre} ${student.apellidos}`,
  }));

  const typeField = [
    { value: "Ingreso", label: "Ingreso" },
    { value: "Salida", label: "Salida" },
    { value: "Fuera de Horario", label: "Fuera de Horario" },
  ];
  useEffect(() => {
    dispatch(startGetStudents());
  }, [dispatch]);

  const [formValues, handleInputChange] = useForm({
    selectedStudent: "",
    selectedType: "",
    reason: "",
  });

  const { selectedStudent, selectedType, reason } = formValues;

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#c9e8f2",
      border: "none",
      outline: "none",
      borderRadius: "15px",
      fontSize: "1em",
      boxShadow: "-1px -1px 4px #8da2a9, 1px 1px 4px #ffff",
      color: "#101935",
    }),
  };

  const handleManualAccess = (e) => {
    const selectedStudentObj = students.find(
      (student) => student.NUIP === selectedStudent.value
    );
    e.preventDefault();
    const data = {
      estudianteId: selectedStudentObj._id,
      tipoAcceso: formValues.selectedType.value,
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
            <Select
              value={selectedStudent}
              isSearchable={true}
              maxMenuHeight={120}
              onChange={(newValue) =>
                handleInputChange({
                  target: { name: "selectedStudent", value: newValue },
                })
              }
              options={optionsField}
              placeholder="Seleccionar estudiante"
              styles={selectStyles}
              noOptionsMessage={() => "Estudiante no encontrado"}
              required
            />
          </div>
          <div className="form-group">
            <label>Tipo de registro:</label>
            <Select
              value={selectedType}
              onChange={(newValue) =>
                handleInputChange({
                  target: { name: "selectedType", value: newValue },
                })
              }
              options={typeField}
              placeholder="Tipo de registro"
              styles={selectStyles}
              noOptionsMessage={() => "Tipo no encontrado"}
              required
            />
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
