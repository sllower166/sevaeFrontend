import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Logo } from "../ui/Logo";
import { BackImg1 } from "../ui/BackImg1";

import "./studentList.css";
import {
  startCreateStudentCard,
  startDeleteStudent,
  startGetStudents,
} from "../../actions/studentsActions";
import Swal from "sweetalert2";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const StudentList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetStudents());
  }, [dispatch]);

  const { students } = useSelector((state) => state.student);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    `${student.NUIP} ${student.nombre} ${student.apellidos}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleDelete = (studentId) => {
    Swal.fire({
      title: "¿Quieres Eliminar al Estudiante?",
      text: "Esta acción es permanente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeleteStudent(studentId));
      }
    });
  };

  const handleCreateCarnet = (studentId) => {
    Swal.fire({
      title: "¿Quieres crear el carné?",
      text: "Ubique la tarjeta en el Lector",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, crear carné",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startCreateStudentCard(studentId));
      }
    });
  };

  return (
    <div className="params-container row-cols-2 mt-5 ">
      <Logo />

      <div className="table-responsive">
        <div className="m-3">
          <h2>Lista de Estudiantes</h2>
          <input
            className="form-control p-2"
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>NUIP</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 &&
              filteredStudents.slice(0, 10).map((student) => (
                <tr key={student._id}>
                  <td>{student.NUIP}</td>
                  <td>{student.nombre + " " + student.apellidos}</td>
                  <td>
                    <Link to={`/students/edit/${student._id}`}>
                      <button className="btn btn-primary mr-2">Editar</button>
                    </Link>
                    <button
                      className="btn btn-danger  mr-2"
                      onClick={() => handleDelete(student._id)}
                    >
                      Eliminar
                    </button>

                    <button
                      className="btn btn-info mr-2"
                      onClick={() => handleCreateCarnet(student._id)}
                    >
                      Crear Carné
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <BackImg1 />
    </div>
  );
};
