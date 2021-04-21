import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {UploaderButton ,UploaderButtonSend} from './uploader.styles';
import BackupIcon from '@material-ui/icons/Backup';
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

function Uploader() {
    
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

  useEffect(() => {
    console.log("s3Url:", s3Url);
    console.log("s3Key:", s3Key);
    console.log("s3Policy:", s3Policy);
    console.log("s3Signature:", s3Signature);
    console.log("s3Credential:", s3Credential);
    console.log("s3Date:", s3Date);
    console.log("s3Expires:", s3Expires);
    console.log("s3Bucket:", s3Bucket);
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

  function myFunction() {
      console.log('clickeddddddddddddddddddd');
      document.getElementById("myForm").submit();
  }

  return (
<div>
<form
        id="myForm"
        action={s3Url}
        method="post"
        enctype="multipart/form-data"
        class="direct-upload"
      >
        <input type="hidden" name="ACL" value={s3Acl} />
        <input type="hidden" name="key" value={s3Key} />
        <input type="hidden" name="Policy" value={s3Policy} />
        <input type="hidden" name="X-Amz-Signature" value={s3Signature} />
        <input type="hidden" name="Expires" value={s3Expires} />
        <input type="hidden" name="X-Amz-Credential" value={s3Credential} />
        {/* <input type="input" name="x-amz-meta-tag" value="" /> */}
        <br />
        <input type="hidden" name="X-Amz-Algorithm" value={s3Algorithm} />
        <input type="hidden" name="X-Amz-Date" value={s3Date} />
        <UploaderButtonSend type="button" onClick={myFunction}
        //  name="submit"
         id="MySubmit" />
            {/* <BackupIcon /> */}
              
        {/* </UploaderButtonSend> */}
        {/* <input type="submit" name="submit" value="Upload" id="MySubmit"/> */}
        <label htmlFor="uploadPhotoAws">
            <input
                style={{ display: 'none' }}
                // defaultValue=""
                id="uploadPhotoAws"
                // name="upload-photo"
                type="file"
                // onChange={e => uploadFile(e)}
                // id="ccc"
                // type="file"
                name="file"
                onChange={(event) => {
                    axios({
                    url: "http://t1.ray-sa.ir:4000/sign_post",
                    method: "post",
                    data: {
                        fileName: Date.now() + "-" + event.target.files[0].name,
                    },
                    })
                    .then(async (res) => {
                        console.log(res);
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
                        // document.getElementById("myForm").submit();
                        document.getElementById("myForm").submit();
                        // document.getElementById("MySubmit").click();
                        // var MySubmit = document.getElementById("MySubmit");
                        // console.log('MySubmit',MySubmit);
                        // MySubmit.click();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }}
            />

            <UploaderButton variant="contained" component="span">
                <BackupIcon 
                // style={{color:'#009688'}}
                    />
            </UploaderButton>
        </label>
        {/* <input
          id="ccc"
          type="file"
          name="file"
          onChange={(event) => {
            axios({
              url: "http://t1.ray-sa.ir:4000/sign_post",
              method: "post",
              data: {
                fileName: Date.now() + "-" + event.target.files[0].name,
              },
            })
              .then(async (res) => {
                console.log(res);
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
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        /> */}
        {" "}
        <br />
      </form>
    </div>
          
  );
};

export default Uploader;
