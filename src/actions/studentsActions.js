import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

// Acción para obtener la lista de estudiantes
export const getStudents = () => ({
  type: types.getStudents,
});

export const getStudentsSuccess = (students) => ({
  type: types.getStudentsSuccess,
  payload: students,
});

export const getStudentsError = (error) => ({
  type: types.getStudentsError,
  payload: error,
});

export const startGetStudents = () => {
  return async (dispatch) => {
    dispatch(getStudents());

    try {
      const resp = await fetchConToken("estudiantes/consultar");
      const body = await resp.json();
      if (body.ok) {
        dispatch(getStudentsSuccess(body.estudiantes));
      } else {
        dispatch(getStudentsError("Error al obtener la lista de estudiantes"));
      }
    } catch (error) {
      dispatch(getStudentsError("Error al obtener la lista de estudiantes"));
    }
  };
};

// Acción para crear un estudiante
export const createStudent = () => ({
  type: types.createStudent,
});

export const createStudentSuccess = (student) => ({
  type: types.createStudentSuccess,
  payload: student,
});

export const createStudentError = (error) => ({
  type: types.createStudentError,
  payload: error,
});

export const startCreateStudent = (studentData) => {
  return async (dispatch) => {
    dispatch(createStudent());

    try {
      const resp = await fetchConToken(
        "estudiantes/crear",
        studentData,
        "POST"
      );
      const body = await resp.json();

      if (body.ok) {
        dispatch(createStudentSuccess(body.student));
        dispatch(startGetStudents());
        Swal.fire({
          title: "Estudiante Creado",
          text: "Creacion de estudiante existente",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result) {
            window.history.back();
          }
        });
      } else {
        Swal.fire("Error", body.msg, "error");
        dispatch(createStudentError("Error al crear un estudiante"));
      }
    } catch (error) {
      dispatch(createStudentError("Error al crear un estudiante"));
    }
  };
};

// Acción para actualizar un estudiante
export const updateStudent = () => ({
  type: types.updateStudent,
});

export const updateStudentSuccess = (student) => ({
  type: types.updateStudentSuccess,
  payload: student,
});

export const updateStudentError = (error) => ({
  type: types.updateStudentError,
  payload: error,
});

export const startUpdateStudent = (studentData) => {
  return async (dispatch) => {
    dispatch(updateStudent());
    try {
      const resp = await fetchConToken(
        `estudiantes/editar/${studentData.id}`,
        studentData,
        "PUT"
      );
      const body = await resp.json();
      Swal.fire({
        title: "Estudiante Actualizado",
        text: "Actualización de estudiante existente",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result) {
          window.history.back();
        }
      });
      if (body.ok) {
        dispatch(updateStudentSuccess(body.student));
      } else {
        dispatch(updateStudentError("Error al actualizar un estudiante"));
      }
    } catch (error) {
      dispatch(updateStudentError("Error al actualizar un estudiante"));
    }
  };
};

// Acción para eliminar un estudiante
export const deleteStudent = () => ({
  type: types.deleteStudent,
});

export const deleteStudentSuccess = (studentId) => ({
  type: types.deleteStudentSuccess,
  payload: studentId,
});

export const deleteStudentError = (error) => ({
  type: types.deleteStudentError,
  payload: error,
});

export const startDeleteStudent = (studentId) => {
  return async (dispatch) => {
    dispatch(deleteStudent());

    try {
      const resp = await fetchConToken(
        `estudiantes/eliminar/${studentId}`,
        {},
        "DELETE"
      );
      const body = await resp.json();

      if (body.ok) {
        dispatch(deleteStudentSuccess(studentId));
        dispatch(startGetStudents());
      } else {
        dispatch(deleteStudentError("Error al eliminar un estudiante"));
      }
    } catch (error) {
      dispatch(deleteStudentError("Error al eliminar un estudiante"));
    }
  };
};

export const startCreateStudentCard = (studentId) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(
        `estudiantes/crear-carnet`,
        { estudianteId: studentId },
        "POST"
      );
      const body = await resp.json();

      if (body.ok) {
        Swal.fire({
          title: body.msg,
          icon: "success",
        });
      } else {
      }
    } catch (error) {}
  };
};

export const startManualAccessStudent = (accessData) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(
        "estudiantes/ingreso-manual",
        accessData,
        "POST"
      );
      const body = await resp.json();

      if (body.ok) {
        Swal.fire({
          title: "Acceso manual exitoso",
          text: "El acceso manual se ha registrado correctamente",
          icon: "success",
        }).then((result) => {
          if (result) {
            window.history.back();
          }
        });
      } else {
      }
    } catch (error) {}
  };
};
