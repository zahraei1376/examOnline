
import styled from 'styled-components';

export const QuestionImageIconContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

export const QuestionImageIcon = styled.img`
    width:20px;
`;

export const QuestionImageIconText = styled.p`
    font-size:10px;
`;

export const QuestionImageIconTextV = styled.p`
    font-size:10px;
    color:rgb(74,144,226);
`;

export const AddRowBtn = styled.button`
    border:none;
    width:12rem;
    background-color:#3f87a6;
    padding:1rem 1rem;
    border-radius:1rem;
    color:#fff;
    cursor:pointer;
    border:1px solid transparent;
    transition:all 0.3s;
    margin-bottom: 3rem;
    position:absolute;
    left:3rem;
    top:2rem;
    z-index:100;
    font-family:Bnazanin;
    font-size:1.9rem;
    &:hover{
        border:1px solid #3f87a6;
        background-color:#eee;
        color:#546E7A;
    }
`;