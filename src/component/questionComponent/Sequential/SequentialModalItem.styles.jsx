import styled from 'styled-components';
import {Button} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

export const InputDivContainer =styled.div`
    // display:flex;
    // justify-content:space-evenly;
    // align-items:center;
    margin:30px 0 0 0;
    position:relative;
`;

export const InputContainerIcon =styled(Icon)`
    color:#000;

    &:hover{
        color:red;
    }
`;

export const InputContainerButton =styled(Button)`
    position:absolute !important;
    // top: -17px;
    // right: 10px;
    top: -1rem;
    right: -1rem;
    transition:all .2s;
    &:hover{
        color:red;
    }
`;

export const Input =styled.input`
    text-align:right;
    height:40px;
    overflow-Y:scroll;
    margin: 0 0 0 3rem;
    // white-space: pre;
    // text-overflow: clip;
`;



