import { Component } from "@angular/core";
import * as XLSX from "xlsx-js-style";  

@Component({
  selector: "app-multiheader-table",
  templateUrl: "./multiheader-table.component.html",
  styleUrls: ["./multiheader-table.component.css"],
})
export class MultiheaderTableComponent {
  readExcel() {
    const table = document.getElementById("tabledetails") as HTMLTableElement;
    const tableData = Array.from(table.rows).map((row) =>
      Array.from(row.cells).map((cell) => cell.innerText)
    );

    const finalData = [
      ["Employee Details", "", "", "Company Details", "", ""],
      [
        "Employee Name",
        "Employee Phn num",
        "Employee Address",
        "Company Name",
        "Company Phn num",
        "Company Address",
      ],
      ...tableData.slice(2),
    ];
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(finalData);

    ws["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }, 
      { s: { r: 0, c: 3 }, e: { r: 0, c: 5 } },  
    ];

    this.applyHeaderStyles(ws);

    ws["!cols"] = [
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "EmployeeList");

    XLSX.writeFile(wb, "EmployeeList.xlsx");
  }

  applyHeaderStyles(ws: XLSX.WorkSheet) {

    const boldStyle = {
      font: { bold: true }, 
      alignment: { horizontal: "center" },
      fill: { fgColor: { rgb: "D9EAD3" } }, 
      border: {
        top: { style: "thin", color: { rgb: "0000FF" } },
        bottom: { style: "thin", color: { rgb: "0000FF" } },
        left: { style: "thin", color: { rgb: "0000FF" } },
        right: { style: "thin", color: { rgb: "0000FF" } },
      }
    };

    const headerCells = [
      "A1", "B1", "C1", "D1", "E1", "F1", 
      "A2", "B2", "C2", "D2", "E2", "F2", 
    ];

    headerCells.forEach((cell) => {
      if (ws[cell]) {
        ws[cell].s = boldStyle;
      }
    });
  }
}
