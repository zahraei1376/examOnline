import styled from 'styled-components';
// import { Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';

export const BodyContainer = styled.div`
    width:70%;
    height:80vh;
    box-shadow:0 1px 10px 2px rgba(0,0,0,.3);
    margin:30px auto;
    padding:3rem 3rem;
    position:relative;
    display:flex;
    flex-direction:column;
    // justify-content:center;
    align-items:center;

`;


export const BodyQuestionBox = styled.div`
    width:100%;
    display:flex;
    justify-content: space-between;
    // align-items: flex-start;
    // align-items:center;
    // flex-direction:column;

`;

export const BodyDiv = styled.div`
width:65%;
    display:flex;
    align-items:center;
`;

export const BodyQuestion = styled.pre`
    white-space: pre-wrap;      
    white-space: -moz-pre-wrap;  
    white-space: -pre-wrap;      
    white-space: -o-pre-wrap;   
    word-wrap: break-word;
    font-size:2rem;
    font-family:Bnazanin;
    text-align:right;
    line-height:4rem;
`;


export const ImageQuestionMainContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    // justify-content:flex-end;
    // align-items:center;
`;

export const ImageQuestionContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:flex-end;
    align-items:center;
`;

export const ImageQuestion = styled.img`
    width:80%;
    height:auto;
`;

export const ImageWithQuestionContainer = styled.div`
    width:30%;
    height:auto;
`;

export const ImageWithQuestion = styled.img`
    width:100%;
    height:auto;
`;

export const ScoreTag = styled.p`
    font-family:Bnazanin;
    font-size:1.8rem;
    margin-top:2rem;
`;

export const FooterQuestionContainer = styled.div`
    width:100%;
    position:absolute;
    bottom:0;
`;

// export const FooterBtnsContainer = styled.div`
//     width:100%;
//     display:flex;
//     justify-content: space-between;
//     align-items:center;
// `;

export const FooterBtnsContainer = styled.div`
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items:center;
    padding:3rem;
    border-top:1px solid rgb(118, 118, 118);
    box-sizing:border-box;
`;

export const FooterBtn = styled(IconButton)`
    font-size:4rem !important;
    text-align:center;
    // background-color:#fff !important;
    // box-shadow:none !important;
    // color:#009688 !important;
    // cursor:pointer;
    // color:rgba(0,0,0,.8);
    // background: linear-gradient(to left, #3f87a6, #ebf8e1);
    border:1px solid #3f87a6 !important;
    &:hover{
        // color:rgba(0,0,0,.8);
        // background: linear-gradient(to left, #3f87a6, #ebf8e1);
        // background-color:#3f87a6 !important;
    }
`;