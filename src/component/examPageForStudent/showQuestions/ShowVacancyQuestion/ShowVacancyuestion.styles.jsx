import styled from 'styled-components';
import {Button} from '@material-ui/core';
// import {IconButton} from '@material-ui/core'

export const VacancyItemConatiner = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content: space-evenly;
    
    @media only screen and (max-width: 769px) {
            flex-direction:column;
    }
`;

export const ShowVacancyButton = styled(Button)`
    // background-color:#fff !important;
    // box-shadow:none !important;
    // color:#000 !important;
    // cursor:pointer;
    // border-radius:50% !important;
    // &:hover{
    //     color:#009688 !important;
    //     border:1px solid #000;
    // }
    // background-color:#3f87a6 !important;
    // border:1px solid #3f87a6 !important;
    background-color:#3f87a6 !important;
    &:hover{
        background-color:#eee !important;
        border:1px solid #3f87a6 !important;
    }
    

    @media only screen and (max-width: 769px) {
        margin-bottom: 2rem !important;
        
    }


`;



export const TextArea = styled.textarea`
    width:80%;
    padding:2rem;
    direction:rtl;
    text-align:right;
    margin:2rem 0;
    box-sizing:border-box;
`;

// export const DescriptiveContainer = styled.div`
//     width:70%;
//     height:80vh;
//     box-shadow:0 1px 10px 2px rgba(0,0,0,.3);
//     margin:30px auto;
//     padding:3rem 3rem;
//     // display:flex;
//     // flex-direction:column;

// `;


// export const DescriptiveQuestionBox = styled.div`
//     width:100%;
//     display:flex;
//     justify-content: space-between;
//     // align-items: flex-start;
//     // align-items:center;
//     // flex-direction:column;

// `;

// export const DescriptiveDiv = styled.div`
// width:65%;
//     display:flex;
//     align-items:center;
// `;

// export const DescriptiveQuestion = styled.pre`
//     white-space: pre-wrap;      
//     white-space: -moz-pre-wrap;  
//     white-space: -pre-wrap;      
//     white-space: -o-pre-wrap;   
//     word-wrap: break-word;
//     font-size:2rem;
//     font-family:Bnazanin;
//     text-align:right;
//     line-height:4rem;
// `;


// export const ImageQuestionMainContainer = styled.div`
//     width:100%;
//     display:flex;
//     flex-direction:column;
//     // justify-content:flex-end;
//     // align-items:center;
// `;

// export const ImageQuestionContainer = styled.div`
//     width:100%;
//     display:flex;
//     justify-content:flex-end;
//     align-items:center;
// `;

// export const ImageQuestion = styled.img`
//     width:80%;
//     height:auto;
// `;

// export const ImageWithQuestionContainer = styled.div`
//     width:30%;
//     height:auto;
// `;

// export const ImageWithQuestion = styled.img`
//     width:100%;
//     height:auto;
// `;

// export const ScoreTag = styled.p`
//     font-family:Bnazanin;
//     font-size:1.8rem;
//     margin-top:2rem;
// `;