import {Button} from '@material-ui/core';
import styled from 'styled-components';

export const SequentialButton = styled(Button)`
    width:200px;
    background-color:#009688 !important;
    float:right;
    color:#000;
`;

export const SequentialButtonSave = styled(Button)`
    background-color:#009688 !important;
    color:#fff;
    bottom: 0;
    transition:all .3s;
    &:hover{
        background-color:rgba(0,0,0,.9);
    }
`;

export const SequentialItemContainer = styled.div`
    width:100%;
    height:80%;
    overflow:scroll;
   display:grid;
   grid-template-columns: auto auto auto auto auto auto;
//    grid-column-gap:1rem;
`;

export const RecordButton = styled.button`
    border:none;
    background-color:#009688;
    color:#fff;
    font-family:Bnazanin;
    font-size:1.8rem;
    padding:1rem 2rem;
    border-radius:2rem;
    cursor:pointer;
`;

