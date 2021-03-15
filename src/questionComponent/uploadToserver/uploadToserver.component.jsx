import SparkMD5 from 'spark-md5';
import axios from 'axios';

async function hashFile(file, chunkSize, blobSlice) {
    return await new Promise((resolve, reject) => {
      const chunks = Math.ceil(file.size / chunkSize);
      let currentChunk = 0;
      const spark = new SparkMD5.ArrayBuffer();
      const fileReader = new FileReader();
      function loadNext() {
        const start = currentChunk * chunkSize;
        const end =
          start + chunkSize >= file.size ? file.size : start + chunkSize;
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
      }
      fileReader.onload = e => {
        spark.append(e.target.result); // Append array buffer
        currentChunk += 1;
        if (currentChunk < chunks) {
          loadNext();
        } else {
          console.log('finished loading');
          const result = spark.end();
          // If result s are used as hash values only, if the contents of the file are the same and the names are different
          // You cannot keep two files if you want to.So add the file name.
          const sparkMd5 = new SparkMD5();
          sparkMd5.append(result);
          sparkMd5.append(file.name);
          const hexHash = sparkMd5.end();
          resolve(hexHash);
        }
      };
      fileReader.onerror = () => {
        console.warn('File reading failed!');
      };
      loadNext();
    }).catch(err => {
      console.log(err);
    });
  }
  ///////////////////////////////////////////

export const UploadfileToserver = async (file ,format , mimeTypeFile) => {
    const chunkSize = 8 * 1024 * 1024; // The size of each chunk, set to 1 Megabyte
    var blobSlice =
      File.prototype.slice ||
      File.prototype.mozSlice ||
      File.prototype.webkitSlice;
    ///////////////
    ////////////////////////////////////////////////

    if (!file) {
      alert('فایلی وجود ندارد!!!');
      return;
    }
    ///////////////////////////////
    var maxUploadTries = 5;
    var count = 0;
    const sendToServerFilePart = async (
      data,
      axiosOptions,
      maxUploadTries,
    ) => {
      var tryNum = 0;
      try {
        await axios.post(
          '/fileQuestion/uploadQuestion',
          data,
          axiosOptions,
        );
      } catch {
        if (tryNum < maxUploadTries) {
          tryNum++;
          sendToServerFilePart(data, axiosOptions, maxUploadTries);
        } else {
          alert('پس از مدتی مجددا امتحان نمایید!!!');
        }
      }
    };

    const blockCount = Math.ceil(file.size / chunkSize); // Total number of slices
    const hash = await hashFile(file, chunkSize, blobSlice); //File hash
    for (let i = 0; i < blockCount; i++) {
      count++;
      const start = i * chunkSize;
      const end = Math.min(file.size, start + chunkSize);
      var fileSlice = blobSlice.call(file, start, end);
      const axiosOptions = {
        timeout: 1800000,
        onUploadProgress: ProgressEvent => {
          // setCompleted(
          //   (ProgressEvent.loaded /
          //     ProgressEvent.total /
          //     blockCount) *
          //   100,
          // );
          console.log(blockCount, i, ProgressEvent, file);
        },
      };
      const form = new FormData();
      form.append('file', fileSlice);
      form.append('name', file.name);
      form.append('total', blockCount);
      form.append('index', i);
      form.append('size', file.size);
      form.append('hash', hash);
      await sendToServerFilePart(form, axiosOptions, maxUploadTries);
    }
    if (count == blockCount) {
      const data = {
        size: file.size,
        name: file.name,
        total: blockCount,
        hash,
      };
      return await axios
        .post('/fileQuestion/merge_chunks', data, { timeout: 180000 })
        .then(res => {
          console.log('Upload Successful');
          // alert(res.data);
          // alert(res.data.seccess);
          // alert(res.status);
          // alert(typeof res.status);
          // alert(res.statusCode);
          // alert(res.statusText);
          if (res.status == 200) {
            return true;
          } else {
            return false;
          }
          // alert(file.name);
          // SetselectedFileName(file.name);
          // return file.name;
        })
        .catch(err => {
          alert('مجددا تلاش کنید');
          // alert(err);
        });
    }
        ////////////////////////////////////////////
};

// const CheckFile = (myFile) =>{
//     var file = myFile;
//     var fileName = file.name;
//     var fileIdL = fileName.split('.');
//     format = fileIdL[fileIdL.length - 1].toLowerCase();
//     if (file.size < 10485760) {
//         if (format == 'png' || format == 'jpg' || format == 'jpeg') {
//         //   SetselectedFile(file);
//             var mimetype = '';
//                 ///////////////////////////////
//             switch (format) {
//             case 'jpeg':
//                 // JPEG Image
//                 mimetype = 'image/jpeg';
//                 break;
//             case 'jpg':
//                 // JPEG Image
//                 mimetype = 'image/jpg';
//                 break;
//             case 'jpgv':
//                 // JPGVideo
//                 mimetype = 'video/jpeg';
//                 break;
//             case 'png':
//                 // Portable Network Graphics (PNG)
//                 mimetype = 'image/png';
//                 break;
//             default:
//                 break;
//             }
//             SetMimeTypeFile(mimetype);
//             return true;
//         } else {
//           alert('فایل ارسالی باید با فرمت png , jpg  یا jpeg باشد!!!');
//           return false;
//         }
//     } else {
//         alert('حجم فایل ارسالی باید کمتر از 10 مگابایت باشد!!!');
//         return false;
//     }
// }