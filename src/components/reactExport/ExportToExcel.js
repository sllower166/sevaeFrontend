import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportToExcel = ({ data }) => {
  const cleanData = data.map((element) => {
    const { _id, notificacion, ...rest } = element;
    return { ...rest };
  });
  const exportToExcel = (cleanData) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const worksheet = XLSX.utils.json_to_sheet(cleanData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reportes");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataFile = new Blob([excelBuffer], { type: fileType });
    saveAs(dataFile, `reporte${fileExtension}`);
  };

  return (
    <button className="filterbtn" onClick={() => exportToExcel(cleanData)}>
      Descargar Excel
    </button>
  );
};

export default ExportToExcel;
