import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {UploadButton  ,UploaderButtonSend} from './uploaderQuestionsFile.styles';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
// import MySnackbar from '../../../messageBox/messageBox.component';
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    endpoint: "https://s3.ir-thr-at1.arvanstorage.com", // Put you region
    accessKeyId: "7f73f6de-ee9d-49ce-ac6e-83856eae07fd", // Put you accessKeyId
    secretAccessKey:
      "b03d9e63c9da6a2a3db2cc2811521d3f5df5bdad49c0203bed20e43d286431b3", // Put you accessKeyId
    //   Bucket: "raysa", // Put your bucket name
    //   signatureVersion: "v4",
    region: "us-east-1", // Put you region
  });

function UploaderQuestionsFile({handleGetFileName ,SetCanSend ,fileId}) {
    
  const [s3Acl, setS3Acl] = useState();
  const [s3Url, setS3Url] = useState();
  const [s3Key, setS3Key] = useState();
  const [s3Policy, setS3Policy] = useState();
  const [s3Signature, setS3Signature] = useState();
  const [s3Credential, setS3Credential] = useState();
  const [s3Algorithm, setS3Algorithm] = useState();
  const [s3Date, setS3Date] = useState();
  const [s3Expires, setS3Expires] = useState();
  const [s3Bucket, setS3Bucket] = useState();
  /////////////////////////////////////////////////
  useEffect(() => {
    console.log("s3Url:", s3Url);
    console.log("s3Key:", s3Key);
    console.log("s3Policy:", s3Policy);
    console.log("s3Signature:", s3Signature);
    console.log("s3Credential:", s3Credential);
    console.log("s3Date:", s3Date);
    console.log("s3Expires:", s3Expires);
    console.log("s3Bucket:", s3Bucket);
    console.log('fileId',fileId);
  }, [
    s3Url,
    s3Key,
    s3Policy,
    s3Signature,
    s3Credential,
    s3Algorithm,
    s3Date,
    s3Expires,
    s3Bucket,
  ]);
  ////////////////////////////////////////////////////////////////
 const CheckFile = (myFile) =>{
  var file = myFile;
  var fileName = file.name;
  var fileIdL = fileName.split('.');
  var format = fileIdL[fileIdL.length - 1].toLowerCase();
  if (file.size < 15728641) {
      if (format == 'pdf') {
          return true;
      } else {
        alert('فایل ارسالی باید با فرمت pdf باشد!!!');
        return false;
      }
  } else {
      alert('حجم فایل ارسالی باید کمتر از 15 مگابایت باشد!!!');
      return false;
  }
}
////////////////////////////////////

  return (
<div>
<form
        id={`myForm${fileId}`}
        action={s3Url}
        method="post"
        enctype="multipart/form-data"
        className="direct-upload"
      >
        <input type="hidden" name="ACL" value={s3Acl} />
        <input type="hidden" name="key" value={s3Key} />
        <input type="hidden" name="Policy" value={s3Policy} />
        <input type="hidden" name="X-Amz-Signature" value={s3Signature} />
        <input type="hidden" name="Expires" value={s3Expires} />
        <input type="hidden" name="X-Amz-Credential" value={s3Credential} />
        <input type="hidden" name="X-Amz-Algorithm" value={s3Algorithm} />
        <input type="hidden" name="X-Amz-Date" value={s3Date} />
        <UploaderButtonSend type="button" 
         id={`MySubmit${fileId}`} />
        <label htmlFor={`uploadPhotoAws${fileId}`}>
            <input
                style={{ display: 'none' }}
                id={`uploadPhotoAws${fileId}`}
                type="file"
                name="file"
                onChange={(event) => {
                  const { target } = event;
                  if(target.value.length > 0){
                    if(CheckFile(event.target.files[0])){
                      var FileNama = Date.now() + "-" + event.target.files[0].name;
                      axios({
                        url: "http://t1.ray-sa.ir:4000/sign_post",
                        method: "post",
                        data: {
                            fileName: FileNama,
                        },
                      })
                      .then(async (res) => {
                        console.log(res);
                        handleGetFileName(FileNama);
                        console.log('myFileNama1',FileNama)
                        var data = res.data;
                        setS3Acl(data.fields.ACL);
                        setS3Url(data.url);
                        setS3Key(data.fields.key);
                        setS3Expires(data.fields.Expires);
                        setS3Bucket(data.fields.bucket);
                        setS3Policy(data.fields.Policy);
                        setS3Signature(data.fields["X-Amz-Signature"]);
                        setS3Credential(data.fields["X-Amz-Credential"]);
                        setS3Algorithm(data.fields["X-Amz-Algorithm"]);
                        setS3Date(data.fields["X-Amz-Date"]);
                          ////////////////////////////////////////////////////////////////////////////////
                      })
                      .catch((error) => {
                          console.log(error);
                      });
                    }else{
                      SetCanSend(false);
                    }
                  } 
                }}
            />
             <UploadButton variant="contained" component="span">
                <InsertDriveFileIcon style={{fontSize:'4rem'}} />
            </UploadButton>
        </label>
        
        {/* {
          showMessage ? <MySnackbar message={message} status={status} showMessage={showMessage} setShowMessage={setShowMessage} /> : ''
        } */}
        {" "}
        <br />
      </form>
    </div>
          
  );
};

export default UploaderQuestionsFile;
