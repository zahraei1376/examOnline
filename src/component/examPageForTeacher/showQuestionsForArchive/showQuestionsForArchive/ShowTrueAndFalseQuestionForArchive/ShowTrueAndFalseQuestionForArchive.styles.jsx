import styled from 'styled-components';


export const TrueAndFalseConatiner = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    direction:rtl;
`;

export const TrueAndFalseitemDiv = styled.div`
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

export const QuestionSquare = styled.div`
    width:2rem;
    height:2rem;
    border-radius:50%;
    position:relative;
    // outline: 1px solid #000;
    // outline-offset: 3px;
    // outline-style: solid;

    // &:before{
    //     content:'';
    //     position:absolute;
    //     border-radius:50%;
    //     border:2px solid #000;
    //     box-sizing:border-box;
    //     width:3rem;
    //     height:3rem;
    //     z-index:1;
    //     top:-4px;
    //     right:-4px;
    //     // bottom:-1px;
    //     // left:-1px;
    //     pointer-events:none;
    //   }
`;