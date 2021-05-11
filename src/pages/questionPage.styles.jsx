import styled from 'styled-components';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// background-image: linear-gradient(to bottom, #2ec4f6 , #177290);
// background-image: linear-gradient(to bottom, #1f6f8b , #1c2b2d);
export const QuestionPageContainer = styled.div`
    min-height:100vh;
    padding: 0 5rem;
    // padding:5rem;
    // background-image: linear-gradient(to bottom, #1f6f8b , #1c2b2d);
`;

export const QuestionPageDiv = styled.div`
    // border:1px solid #000;
    // box-shadow: 0 3px 20px 3px rgba(0,0,0,0.5);
    // background-color:rgba(256,256,256,0.4);
    // background-color:rgba(0,0,0,0.6);
    // background-color:rgba(256,256,256,0.3);
    // padding:5rem;
    border-radius:5rem;
    // background-image: linear-gradient(to bottom, #1f6f8b , #1c2b2d);
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

export const ComboDiv = styled.div`
    // display:flex;
    // justify-content:center;
    display:grid;
    // column-count: 6;
    grid-template-columns: repeat(7,1fr);
    column-gap: 1rem;
    row-gap: 3rem;
    width:100%;
    margin:2rem 0 4rem 0;
    text-align:center;
    padding:2rem;
    border-bottom:1px solid #000;
    box-sizing:border-box;
    direction:rtl;

    @media only screen and (max-width: 769) {
        grid-template-columns: repeat(5,1fr);
    }

    @media only screen and (max-width: 415px) {
        grid-template-columns: repeat(4,1fr);
    }

    @media only screen and (max-width: 375px) {
        grid-template-columns: repeat(3,1fr);
    }

    @media only screen and (max-width: 281) {
        grid-template-columns: repeat(2,1fr);
    }
`;

export const QuestionsContainer = styled.div`
    // border:2px solid #000;
    box-shadow: 0px 3px 2px 1px rgb(0 0 0 / 20%), 0px 1px 15px 0px rgb(0 0 0 / 14%), 0px 1px 6px 0px rgb(0 0 0 / 14%);
    padding:2rem 2rem;
    // background-image: linear-gradient(to bottom, #1f6f8b , #1c2b2d);
    border-radius:1rem;
`;