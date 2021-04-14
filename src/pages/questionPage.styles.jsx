import styled from 'styled-components';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// background-image: linear-gradient(to bottom, #2ec4f6 , #177290);
// background-image: linear-gradient(to bottom, #1f6f8b , #1c2b2d);
export const QuestionPageContainer = styled.div`
    min-height:100vh;
    padding:5rem;
    background-image: linear-gradient(to bottom, #1f6f8b , #1c2b2d);
`;

export const QuestionPageDiv = styled.div`
    // border:1px solid #000;
    box-shadow: 0 3px 20px 3px rgba(0,0,0,0.5);
    // background-color:rgba(256,256,256,0.4);
    background-color:rgba(0,0,0,0.6);
    padding:5rem;
    border-radius:5rem;
`;

export const UploadSectionContainer = styled.div`
    margin-bottom:3rem;
`;

export const UploadSection = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`;

export const UploadLabel = styled.label`
    font-family:Bnazanin;
    font-size:1.8rem;
`;

export const MyCloudUploadIcon = styled(CloudUploadIcon)`
    font-size:2.8rem  !important;
`;