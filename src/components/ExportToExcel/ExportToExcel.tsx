import React from 'react'
import * as XLSX from "xlsx";
import './ExportExcel.css';
import download from '../../images/download.png'
const FileSaver = require('file-saver');
export const ExportToExcel = ({ apiData, fileName }: any) => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (apiData: any, fileName: any) => {
        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
        <>
            <a onClick={(e) => exportToCSV(apiData, fileName)} className='exportExcel'><img src={download} className='imgDownLoad'></img></a>
        </>

    );
};