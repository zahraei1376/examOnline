import styled from 'styled-components';


export const MultipleChoiceConatiner = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    direction:rtl;
`;

export const MultipleChoiceitemDiv = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    margin:3rem 2rem;
`;

export const Item = styled.h6`
    font-size:1.7rem;
    font-family:Bnazanin;
    margin-left:2rem;
    border-bottom:1px solid #000;
`;

export const InputRadio = styled.input`
    // font-size:1.7rem;
    // font-family:Bnazanin;
    // margin-left:2rem;
    // border-bottom:1px solid #000;

    &:checked{
        color:#3f87a6;
    }
`;

export const InputLabel = styled.label`
    font-size:2rem;
    font-family:Bnazanin;
    margin-right:2rem;
`;