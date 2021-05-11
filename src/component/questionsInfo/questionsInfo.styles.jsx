import styled from 'styled-components';

export const QuestionsInfoContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    &:not(&:last-child){
        border-bottom:1px dashed #82b1ff;
    }

    // border-top:1px solid #000;
    // &:first-child{
    //     border-top:1px solid #000;
    // }
`;