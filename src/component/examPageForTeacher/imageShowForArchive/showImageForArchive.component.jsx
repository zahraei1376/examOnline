import React,{useEffect} from 'react';
import {ShowImageContainer ,ShowImageContent,ShowImageImgText ,
  ShowImageImgQuestion,ShowImageCaption,BtnClose} from './showImageForArchive.styles';

const ShowImageForArchive =(props)=>{
  // useEffect(()=>{
  //   console.log('props',props);
  // },[]);
    return (
        <ShowImageContainer>
          <ShowImageContent>
            {
              props.type?  <ShowImageImgText
              src={props.imageSrc}
              onClick={props.close}
            /> :  
              <ShowImageImgQuestion
              src={props.imageSrc}
              onClick={props.close}
          />
            }
            <BtnClose onClick={props.close}>بستن</BtnClose>
            <ShowImageCaption>{props.caption}</ShowImageCaption>
          </ShowImageContent>
        </ShowImageContainer>
      );
};

export default ShowImageForArchive;