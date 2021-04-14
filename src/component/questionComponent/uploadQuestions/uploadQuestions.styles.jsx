import styled from 'styled-components';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';

export const UploadSection = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    // border:1px solid #000;
    border-radius:2rem;
    padding:2rem 3rem;
    width:100%;
`;

export const UploadLabel = styled.label`
    font-family:Bnazanin;
    font-size:1.8rem;
`;

export const MyCloudUploadIcon = styled(CloudUploadIcon)`
    font-size:2.8rem  !important;
    padding:0 2rem;
    cursor:pointer;
`;

export const NumOfQuestionSection = styled.div`
    // border:1px solid #000;
    border-radius:2rem;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:2rem 3rem;
    margin-right:7rem !important;
    width:100%;
`;

export const MyTypography = styled(Typography)`
    display:flex !important;
    justify-content:space-between !important;
    align-items:center !important;
    width:100%;
`;

export const MyAccordionDetails = styled(AccordionDetails)`
    // display:flex !important;
    // justify-content:space-between !important;
    // align-items:center !important;
`;

export const NumOfQuestionInput = styled.input`
    border:none;
    border-bottom:1px solid #000;
    text-align:center;
    padding:1rem 2rem;
    margin-right:2rem ;
    width:10rem;
    &:focus{
        outline:none;
    }
`;

export const BtnOk =styled.button`
    font-size:4rem !important;
    text-align:center;
    border:none;
    // box-shadow: 0 3px 20px 3px #3f87a6;
    border-bottom:1px solid #3f87a6 !important;
    border-radius:50% !important;
    background-color:inherit;
    padding:0 1rem;
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