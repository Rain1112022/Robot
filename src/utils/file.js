import FileSaver from 'file-saver';
//或者import { saveAs } from 'file-saver'
//FileSaver saveAs(Blob/File/Url,fileType)
//参数1：支持的类型：blob（二进制）、File（文件）、Url（url链接）
//Excel文件:type: "application/vnd.ms-excel"
//Excel文件:type: "image/jpeg"
//参数2：文件类型

export function downloadFile (data, filename) {
	let file = new File([data], filename, { type: 'text/plain;charset=utf-8' });
  FileSaver.saveAs(file);
}

export function uploadFile (file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsText(file)
    try{
      reader.onload = () => {
        // console.log(reader);
        resolve(reader.result)
     }
    }catch (err) {
      reject(err)
    }
    
  })
  
}
