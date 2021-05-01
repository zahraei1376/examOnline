import styled from 'styled-components';

export const ShowQuestionsContainer = styled.div`
    direction: rtl;
    // position:relative;
`;

export const ShowQuestionsCourseNameContainer = styled.div`
    // margin-top:3rem;
    
`;

export const ShowQuestionsCourseName = styled.h5`
    font-family:Bnazanin;
    font-size:1.8rem;
    border-bottom:1px solid #3f87a6;
    display: inline-block;
    padding:1rem 0;
`;

export const ShowLoginTimeContainer = styled.div`
    //  position:absolute;
    // // top:0;
    // right:5rem;
    // display:flex;
    // justify-content:center;
    // align-items:center;
`;

export const ShowLoginTime = styled.h5`
    font-family:Bnazanin;
    font-size:1.8rem;
    border-bottom:1px solid #3f87a6;
    display: inline-block;
    padding:1rem 0;
`;

export const ShowInfoExam = styled.div`
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    margin-top:3rem;
`;

export const ExitButtonContainer = styled.div`
    position:absolute;
    // top:0;
    right:5rem;
    display:flex;
    justify-content:center;
    align-items:center;
`;

export const ExitButton = styled.button`
    width:5rem;
    height:5rem;
    display:flex;
    justify-content:center;
    align-items:center;
    font-family:Bnazanin;
    font-size:1.8rem;
    border-radius:1rem;
    border:none;
    border:1px solid #3f87a6;
    color:#3f87a6;
    cursor:pointer;
    margin-left:2rem;
    transition:all 0.2s;
    &:hover {
        box-shadow:0 5px 8px 0 rgba(0,0,0,0.3);
        transform:scale(1.01);
        // background-color:#3f87a6;
        // color:#fff;
        // border:1px solid #fff;
    }
`;