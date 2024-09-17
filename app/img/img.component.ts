// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { blob } from 'stream/consumers';

// @Component({
//   selector: 'app-img',
//   templateUrl: './img.component.html',
//   styleUrl: './img.component.css'
// })
// export class ImgComponent {


//   selectedFile!: File;
//   imageSrc!: string | ArrayBuffer;

//   constructor(private http: HttpClient) { 

//   }

//   onFileSelected(event: Event): void {
//     const fileInput = event.target as HTMLInputElement;
//     if (fileInput.files && fileInput.files.length > 0) {
//       this.selectedFile = fileInput.files[0];
//     }
//   }

//   onUpload(): void {
//     const formData = new FormData();
//     formData.append('image', this.selectedFile);

//     this.http.post('http://localhost:8080/api/v1/upload', formData)
//       .subscribe((response: any) => {
//         this.loadImage(response.id);
//       });
//       this.get();
//   }

//   loadImage(id: number): void {
//     this.http.get(`http://localhost:8080/api/v1/${id}`, { responseType: 'blob' })
//       .subscribe(blob => {
//         const reader = new FileReader();
//         reader.onload = (e: any) => this.imageSrc = e.target.result;
//         reader.readAsDataURL(blob);
//       });
//   }


//   allImage() {
//   return  this.http.get(`http://localhost:8080/api/v1/get-all`, {}).toPromise();
//   }

//   convertByteArrayToBase64(byteArray: Uint8Array): Promise<string> {
//     return new Promise((resolve, reject) => {
//         const blob = new Blob([byteArray], { type: 'image/jpeg' });
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             resolve(reader.result as string);
//         };
//         reader.onerror = reject;
//         reader.readAsDataURL(blob);
//     });
// }

// list : any[]=[];

// async loadImages(i: Uint8Array): Promise<void> {
//   const base64String = await this.convertByteArrayToBase64(i);
//   this.list.push(base64String);
// }


  
// images
// inglist : any=[];
//   get(){
//     this.allImage().then((data :any)=>{

//       this.inglist = data;
//       this.images = byteArrays.map(byteArray => this.convertByteArrayToBase64(byteArray));

//       console.log(this.inglist);
      
//     })
//   }

// }
