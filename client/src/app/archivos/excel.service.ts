import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  private arrayBuffer: any;
  private filelist: any = [];
  private arraylist: any = [];
  constructor() {}

  readfile(event: any) {
    import('xlsx').then((XLSX) => {
      let file: File;
      file = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join('');
        var workbook = XLSX.read(bstr, { type: 'binary' });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        // console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        this.arraylist.push(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      };
    });
  }

  getFile() {
    return this.arraylist;
  }

  limpiarCarga() {
    this.arraylist = [];
  }
}
