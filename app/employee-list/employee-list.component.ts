import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  viewChild,
} from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import * as XLSX from 'xlsx';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators,AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatasService } from '../datas.service';
import { Datas } from '../Datas';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  @ViewChild('imageModal', { static: false }) imageModal!: ElementRef;
  @ViewChild('addModal', { static: false }) addModal!: ElementRef;
  @ViewChild('updateModal', { static: false }) updateModal!: ElementRef;

  employees: Employee[] = [];
  Datass: Datas[]=[];
  oldData: Employee = new Employee();
  updateemployee: Employee = new Employee();
  deleteemployee: Employee = new Employee();
  employee: Employee = new Employee();
  employeeForm!: FormGroup;
  updateEmployeeForm!: FormGroup;
  imageForm!: FormGroup;
  fileName = 'ExcelSheet.xlsx';
  exceldata: any;
  modalRef!: NgbModalRef;
  uploaded: boolean = true;
  excelData:any;

  constructor(
    private emp: EmployeeService,
    private data:DatasService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getemployees();
    this.getdatas();
    this.initializeForms();
  }

   numericValidator(control: AbstractControl) {
    const value = control.value;
    return /^[0-9]*$/.test(value) ? null : { numeric: true };
  }

  initializeForms() {
    this.employeeForm = this.fb.group({
      fName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(11),
          Validators.maxLength(30),
        ],
      ],
      mobileNo: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          this.numericValidator
        ],
      ],
      dob: [
        null,
        [
          Validators.required
        ],
      ],
      imageurl: '',
      gender:null
    });

    this.updateEmployeeForm = this.fb.group({
      fName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ],
    ],
    lName: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(11),
        Validators.maxLength(30),
      ],
    ],
    mobileNo: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        this.numericValidator
      ],
    ],
    dob: [
      null,
      [
        Validators.required
      ],
    ],
    imageurl: [
      null,
      [
        Validators.required
      ]         
    ],
    gender:null
  });

    this.imageForm = this.fb.group({
      imageurl: '',
    });
  }

  updateThrougExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      let excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]], { header: 1 });
  
      let headers: string[] = excelData[0] as string[];
      const headerMap: { [key: string]: string } = {
        "Employee ID": "id",
        "First Name": "fName",
        "Last Name": "lName",
        "Email": "email",
        "Mobile Number":"mobileNo",
        "Date of Birth":"dob",
        "Gender":"gender"
      };
  
      let mappedHeaders = headers.map((header: string) => headerMap[header] || header);
  
      excelData.shift();
      this.excelData = excelData.map((row: any) => {
        let mappedRow: any = {};
        mappedHeaders.forEach((newHeader, index) => {
          mappedRow[newHeader] = row[index];
        });
        return mappedRow;
      });
  
      this.excelData.forEach((employeeData: any) => {
        this.emp.updateEmployee(employeeData).subscribe(
          (data) => {
            console.log('Employee updated successfully:', data);
            this.getemployees(); 
          }
        );
      });
  
      console.log(this.excelData); 
    };
  }
  
  


  readExcel(event: any) {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.http
      .post('http://localhost:8080/api/v1/upload', formData)
      .subscribe((data) => {
        this.getemployees();
      });
    event.target.value = '';
  }

  exportdata() {
    const table = document.getElementById(
      'employeetablexl'
    ) as HTMLTableElement;

    const tableData = Array.from(table.rows).map((row) =>
      Array.from(row.cells)
        .map((cell) => cell.innerText)
        .filter((_, index, array) => index !== 1 && index !== array.length - 1)
    );

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(tableData);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'EmployeeList.xlsx');
  }

  UploadFIleFormat() {
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      ['EmployeeID', 'FirstName', 'LastName', 'Email','Mobile Number',"Date of Birth"],
    ]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const fileName = 'uploadFileFormat.xlsx';
    XLSX.writeFile(wb, fileName);
  }

  uploadImage(event: any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.http
        .post('http://localhost:8080/api/v1/uploadImage', formData, {
          responseType: 'text',
        })
        .subscribe((imageUrl: string) => {
          console.log('Image URL received:', imageUrl);
          this.employeeForm.value.imageurl = imageUrl;
        });
    } else {
      console.warn('No file selected');
    }
  }

  updateUploadImage(event: any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.http
        .post('http://localhost:8080/api/v1/uploadImage', formData, {
          responseType: 'text',
        })
        .subscribe((imageUrl: string) => {
          console.log('Image URL received:', imageUrl);
          this.updateEmployeeForm.value.imageurl = imageUrl;
        });
    } else {
      console.warn('No file selected');
    }
  }

  private getemployees() {
    this.emp.getEmployeeList().subscribe((data) => {
      this.employees = data;
    });
  }

  private saveemployee() {
    if (this.employeeForm.valid) {
      this.employee.fName = this.employeeForm.value.fName;
      this.employee.lName = this.employeeForm.value.lName;
      this.employee.email = this.employeeForm.value.email;
      this.employee.mobileNo=this.employeeForm.value.mobileNo;
      this.employee.dob=this.employeeForm.value.dob;
      this.employee.gender=this.employeeForm.value.gender;
      this.employee.imageurl = this.employeeForm.value.imageurl;
      this.emp.createEmployee(this.employee).subscribe((data) => {
        console.log(data);
        this.getemployees();
      });
    }
  }

  private updated() {
    if (this.updateEmployeeForm.valid) {
      this.updateemployee.fName = this.updateEmployeeForm.value.fName;
      this.updateemployee.lName = this.updateEmployeeForm.value.lName;
      this.updateemployee.email = this.updateEmployeeForm.value.email;
      this.updateemployee.mobileNo=this.updateEmployeeForm.value.mobileNo;
      this.updateemployee.dob=this.updateEmployeeForm.value.dob;
      this.updateemployee.gender=this.updateEmployeeForm.value.gender;
      this.updateemployee.imageurl = this.updateEmployeeForm.value.imageurl;
      this.emp.updateEmployee(this.updateemployee).subscribe((data) => {
        console.log(data);
        this.getemployees();
      });
    }
  }

  private Editupdate() {
    this.emp.updateEmployee(this.employee).subscribe((data) => {
      console.log(data);
      this.getemployees();
    });
  }

  public deleted() {
    this.emp.deteleEmployee(this.deleteemployee).subscribe((data) => {
      console.log(data);
      this.getemployees();
    });
  }

  onSubmit() {
    console.log(this.employee);
    this.saveemployee();
    this.resetform();
    this.modalRef.close();
  }

  onUpdateSubmit() {
    this.updated();
    this.modalRef.close();
  }

  onUpdateClose(emp: Employee) {
    this.updateemployee = this.oldData;
    this.modalRef.close();
  }

  onEdit(emp: Employee) {
    this.employees.forEach((element) => {
      element.isEdit = false;
    });
    this.oldData = emp;
    this.oldData = JSON.parse(JSON.stringify(emp));
    emp.isEdit = true;
    this.updateEmployeeForm.patchValue({
      fName: emp.fName,
      lName: emp.lName,
      email: emp.email,
      mobileNo: emp.mobileNo,
      dob:emp.dob,
      gender:emp.gender,
      imageurl: emp.imageurl,
    });
  }

  onDeleteSubmit() {
    this.deleted();
    this.modalRef.close();
  }

  onEditSave(employee: Employee) {
    this.emp.updateEmployee(employee).subscribe(
      (data) => {
        console.log('Employee updated successfully', data);
        this.getemployees();
      }
    );
  }

  onEditCancel(emp: Employee) {
    const index = this.employees.findIndex((e) => e.id === emp.id);
    if (index !== -1) {
      this.employees[index] = this.oldData;
    }
    emp.isEdit = false;
  }

  deleteEmployee(content: any, emp: Employee) {
    this.deleteemployee = emp;
    console.log(this.deleteemployee);
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  openAddModal(content: any) {
    this.resetform();
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  openUpdateModal(content: any, emp: Employee) {
    this.updateemployee = emp;
    this.updateEmployeeForm.patchValue({
      fName: emp.fName,
      lName: emp.lName,
      email: emp.email,
      mobileNo:emp.mobileNo,
      dob:emp.dob,
      gender:emp.gender
    });

    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  openImageModal(content: any) {
    this.resetform();
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'me',
    });
  }

  resetform() {
    this.employeeForm.reset();
    this.updateEmployeeForm.reset();
    this.employee = new Employee();
    this.updateemployee = new Employee();
  }





private getdatas() {
    this.data.getDataList().subscribe((data) => {
      this.Datass = data;
    });
  }

  ngOnDestroy(): void {
    this.resetform();
  }
}
