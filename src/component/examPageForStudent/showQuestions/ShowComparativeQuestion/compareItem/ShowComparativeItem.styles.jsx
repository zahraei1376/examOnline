import styled from 'styled-components';
import {Button} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

export const InputDivContainer =styled.div`
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    // margin:30px 0;
    // 
    padding:3rem 0;
    direction:rtl;
    &:not(:last-child){
        border-bottom:1px dashed #3f87a6;
    }
   
`;

export const Input =styled.input`
    text-align:right;
    height:40px;
`;

export const InputPre =styled.pre`
    text-align:right;
    font-size:2rem;
    white-space: pre-wrap;      
    white-space: -moz-pre-wrap;  
    white-space: -pre-wrap;      
    white-space: -o-pre-wrap;   
    word-wrap: break-word;
    font-family:Bnazanin;
    width:40%;
    lign-height:2rem;
`;

export const SecondSideContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:50%;
`;

export const SecondSideNumberContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    margin-left:2rem;
`;

export const SecondSideNumber = styled.h6`
    font-size:2rem;
    font-family:Bnazanin;
    color:#3f87a6;
    border-bottom:1px solid #3f87a6;
`;

export const FirstSideContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:50%;
`;

export const FirstSideResContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    margin-right:2rem;
`;

export const FirstSideRes = styled.input`
   border-radius:50%;
   width:4rem;
   height:4rem;
   text-align:center;
//    padding:1rem;
   box-sizing:border-box;
   
   &:focus{
       outline:none;
   }
`;


export const InputContainerButton =styled(Button)`
    
`;

export const InputContainerIcon =styled(Icon)`
    color:#000;

    &:hover{
        color:red;
    }
`;