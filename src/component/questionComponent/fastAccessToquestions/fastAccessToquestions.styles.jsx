import styled from 'styled-components';
import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AccordionDetails from '@material-ui/core/AccordionDetails';

export const FastAccessDivContainer = styled.div`
    margin-left: 2rem;
    display:flex;
    align-items: center;
    height: 66%;
    z-index:10;

`;

export const MyTypography = styled(Typography)`
    font-family:Bnazanin !important;
    font-size:2rem !important;
    float:right;
    color:#fff;
`;

export const FastAccessDiv = styled.div`
    display:flex;
    flex-direction:column;
    align-items: flex-start;
    padding:0 5rem;
    // align-items: center;
    // justify-content:flex-end !important;
`;

export const MyButton = styled(Button)`
    font-family:Bnazanin;
    font-size:1.6rem !important;
`;

// export const MyMainButton = styled(Button)`
//     font-family:Bnazanin;
//     font-size:1.6rem !important;
//     border-radius:50% !important;
//     padding:0 !important;
// `;


export const MyMainButton = styled.button`
    font-family:Bnazanin;
    font-size:1.6rem;
    border-radius:50%;
    padding:0 ;
    width:6rem;
    height:6rem;
    border:1px solid #3f87a6;
    cursor:pointer;
    transition:all .2s;
    margin-left:1rem;
    position: absolute;
    top: 3rem;
    right: 7rem;

    &:focus{
        outline:none;
    }

    &:hover{
        background-color:#3f87a6;
        color:#fff;
        border:1px solid #fff;
    }
`;


/////////////////////////////////////

export const UploadSection = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    // border:1px solid #000;
    border-radius:2rem;
    padding:3rem;
`;

export const UploadLabel = styled.label`
    font-family:Bnazanin;
    font-size:1.6rem;
`;

export const MyCloudUploadIcon = styled(CloudUploadIcon)`
    font-size:2.8rem  !important;
    padding:0 2rem;
    cursor:pointer;
`;

export const NumOfQuestionSection = styled.div`
    // border:1px solid #000;
    // border-radius:2rem;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:3rem 0 0 0;
    border-top:1px dashed #3f87a6;
    // margin-right:7rem !important;
`;

export const MyAccordionDetails = styled(AccordionDetails)`
    // display:flex !important;
    // justify-content:space-between !important;
    // align-items:center !important;
`;

export const NumOfQuestionInput = styled.input`
    // border:none;
    // border-bottom:1px solid #000;
    text-align:center;
    padding:5px 1rem;
    margin-right:2rem ;
    width:10rem;
    &:focus{
        outline:none;
    }
`;

export const BtnOk =styled.button`
    width:4rem;
    height:4rem;
    text-align:center;
    border:none;
    border-bottom:1px solid #3f87a6 !important;
    border-radius:50% !important;
    background-color:inherit;
    // padding:0 1rem;
    box-sizing:border-box;
    cursor:pointer;
    transition:all .1s;
    margin-right:2rem;
    &:hover{
        background: linear-gradient(to left, #3f87a6, #ebf8e1);
        box-shadow:0 1rem 2rem 0 rgba(0,0,0,.3);
        color:#000;
        border-bottom:1px solid transparent !important;
    }

    &:focus{
        outline:none;
    }
`;