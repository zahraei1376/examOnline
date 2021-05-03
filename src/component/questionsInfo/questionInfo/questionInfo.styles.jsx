import styled from 'styled-components';

export const QuestionInfoContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    // margin-bottom:2rem;
    padding: 1rem 0;
    // &:not(last-child){
    //     border-bottom:1px dashed #82b1ff;
    // }
    // border-bottom:1px dashed #000;
`;

export const QuestionInfoGroup = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`;

export const QuestionInfoCourseName = styled.h2`
    font-family:Bnazanin;
    font-size:2rem;
`;

export const QuestionInfoUpload = styled.div`
    width:10%;
    // margin-left:2rem;
`;


export const QuestionInfoLabel = styled.label`
    font-family:Bnazanin;
    font-size:1.8rem;
`;

export const QuestionInfoInput = styled.input`
    font-family:Bnazanin;
    font-size:1.8rem;
    width:5rem;
    border-radius:2rem;
    text-align:center;
    border:1px solid #546E7A;
    margin-right:2rem;
`;

export const BtnOk =styled.button`
    font-size:4rem !important;
    text-align:center;
    border:none;
    border-bottom:1px solid #3f87a6 !important;
    border-radius:50% !important;
    padding:0 1rem;
    box-sizing:border-box;
    cursor:pointer;
    transition:all .1s;
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