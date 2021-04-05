import styled from 'styled-components';
// import {Button} from '@material-ui/core';
// import {IconButton} from '@material-ui/core'

export const SequentialConatiner = styled.div`
    // floadt:right;
    // width:100%;
    // min-height:20%;
    // overflow-X:scroll;
    padding:3rem;
    // display:grid;
    // column-count: 6;
    // grid-template-columns: auto auto auto auto auto auto;
    // column-gap: 3rem;
    // box-shadow:0 1rem 3rem 0rem rgba(0,0,0,.3);
    display:flex;
    flex-direction:column;
    direction:rtl;
    
`;

export const SequentialItemConatiner = styled.div`
    floadt:right;
    // width:100%;
    // min-height:20%;
    // overflow-X:scroll;
    display:grid;
    // column-count: 6;
    grid-template-columns: auto auto auto;
    column-gap: 3rem;
    row-gap: 3rem;
    padding:2rem;
    margin-left:2rem;
    box-shadow:0 1rem 3rem 0rem rgba(0,0,0,.3);
    // direction:rtl;
    
`;

export const SequentialResContainer = styled.div`
    // floadt:right;
    overflow-x: scroll;
    width:100%;
    // min-height:20%;
    overflow-X:scroll;
    display:grid;
    // column-count: 6;
    grid-template-columns: auto auto auto auto auto;
    column-gap: 3rem;
    row-gap: 3rem;
    margin-top:4rem;
    // margin:3rem;
    // box-shadow:0 1rem 3rem 0rem rgba(0,0,0,.3);
    // direction:rtl;
`;

export const SequentialResTitleContainer = styled.div`
    margin:7rem 0 3rem 0;
`;

export const SequentialResTitle = styled.h5`
    padding-bottom:3rem;
    font-size:2rem;
    font-family:Bnazanin;
    border-bottom:1px solid #3f87a6;
    display:inline-block;
`;


export const SequentialInputContainer = styled.div`
    // width:100%;
    // overflow:scroll;
    // display:grid;
    // grid-template-columns: auto auto auto auto auto auto;
    // margin:0 2rem;
    // overflow-X:scroll;
    border:1px solid #3f87a6;
    border-radius:1rem;
`;

export const SequentialResInputContainer = styled.div`
    // border-radius:1rem;
    // width:100%;
    // margin:0 2rem;
    // padding:2rem;
    // direction:rtl;
    // text-align:right;
    // margin:2rem 0;
    // box-sizing:border-box;
    // overflow-X:scroll;
`;

export const SequentialInput = styled.pre`
    width:80%;
    padding:2rem;
    // direction:rtl;
    text-align:right;
    // margin:2rem 0;
    // box-sizing:border-box;
    // overflow-X:scroll;
    //////
    font-size:2rem;
    font-family:Bnazanin;
    white-space: pre-wrap;      
    white-space: -moz-pre-wrap;  
    white-space: -pre-wrap;      
    white-space: -o-pre-wrap;   
    word-wrap: break-word;
`;

export const SequentialResInput = styled.input`
    width:6rem;
    // width:80%;
    padding:2rem;
    border-radius:1rem;
    border:1px solid #999;
    // direction:rtl;
    text-align:center;
    // margin:2rem 0;
    // box-sizing:border-box;
    // overflow-X:scroll;
    //////
    // font-size:2rem;
    // font-family:Bnazanin;
    // white-space: pre-wrap;      
    // white-space: -moz-pre-wrap;  
    // white-space: -pre-wrap;      
    // white-space: -o-pre-wrap;   
    // word-wrap: break-word;
`;

export const SequentialNum = styled.span`
    margin-left:1rem;
    font-size:2rem;
    font-family:Bnazanin;
`;