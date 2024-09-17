import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-table-template',
  templateUrl: './dynamic-table-template.component.html',
  styleUrl: './dynamic-table-template.component.css'
})
export class DynamicTableTemplateComponent implements OnInit {

  @Input() config: any;
  @Input() tableData: any[] = [];
  @Output() addRow = new EventEmitter<void>();
  @Output() clearTable = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onAddRow() {
    this.addRow.emit();
  }

  onClearTable() {
    this.clearTable.emit();
  }
}


