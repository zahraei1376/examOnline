import styled from 'styled-components';
import {Button} from '@material-ui/core';

export const UploaderButton = styled(Button)`
    background-color:#fff !important;
    box-shadow:none !important;
    color:#009688 !important;
    cursor:pointer;
`;

export const UploaderButtonSend = styled.input`
    // background-color:#fff;
    // // box-shadow:none !important;
    // color:#009688;
    // cursor:pointer;
    display:none;
`;

// export const UploadButton = styled(Button)`
//     // background-color:#fff !important;
//     // box-shadow:none !important;
//     // color:#000 !important;
//     // cursor:pointer;
//     // border-radius:50% !important;
//     // &:hover{
//     //     color:#009688 !important;
//     //     border:1px solid #000;
//     // }
//     // background-color:#3f87a6 !important;
//     // border:1px solid #3f87a6 !important;
//     width:4rem !important;
//     background-color:rgba(63,135,166 ,0.7) !important;
//     // background-color:#3f87a6 !important;
//     border:1px solid transparent !important;
//     &:hover{
//         background-color:#eee !important;
//         border:1px solid #3f87a6 !important;
//     }
    

//     @media only screen and (max-width: 769px) {
//         min-width: 2rem !important;
//         // width:3rem !important;
//         margin-bottom: 2rem !important;
        
//     }


// `;

// export const UploadButton = styled.button`
//     cursor:pointer;
//     transition:all 0.3s;
//     border-radius:1rem;
//     width:6rem;
//     height:5rem;
//     background-color:rgba(63,135,166 ,0.7) ;
//     // background-color:#3f87a6 !important;
//     border:1px solid transparent;
//     &:hover{
//         background-color:#eee ;
//         border:1px solid #3f87a6;
//     }
    

//     @media only screen and (max-width: 769px) {
//         min-width: 2rem ;
//         // width:3rem ;
//         margin-bottom: 2rem ;
        
//     }


// `;

export const UploadButton = styled.div`
    cursor:pointer;
    transition:all 0.3s;
    border-radius:1rem;
    width:6rem;
    height:5rem;
    background-color:rgba(63,135,166 ,0.7) ;
    // background-color:#3f87a6 !important;
    border:1px solid transparent;
    text-align:center;
    display:flex;
    justify-content: center;
    align-items:center;
    &:hover{
        background-color:#eee ;
        border:1px solid #3f87a6;
    }
    

    @media only screen and (max-width: 769px) {
        min-width: 2rem ;
        // width:3rem ;
        margin-bottom: 2rem ;
        
    }


`;