import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css'
})
export class DynamicTableComponent {
  config = {
    columns: [
      { name: 'employee_name', label: 'Employee Name' },
      { name: 'email', label: 'Email' },
      { name: 'mobile_number', label: 'Mobile Number' }
    ],
    buttonSetting: {
      buttons: [
        { caption: 'Add Row' },
        { caption: 'Clear Table' }
      ]
    }
  };

  tableData = [
    { employee_name: 'dinesh', email: 'dinesh@gmail.com', mobile_number: '9543543327' },
    { employee_name: 'nadin', email: 'nadin@gmail.com', mobile_number: '9655387434' }
  ];

  addRow() {
    const newRow = { employee_name: 'pechi', email: 'pechi#gmail.com', mobile_number: '0000000000' };
    this.tableData = [...this.tableData, newRow];
  }

  clearTable() {
    this.tableData = [];
  }

}
