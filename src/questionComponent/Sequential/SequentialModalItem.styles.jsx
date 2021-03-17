import styled from 'styled-components';
import {Button} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

export const InputDivContainer =styled.div`
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    margin:30px 20px;
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
    top: 35px;
    right: 0;
    transition:all .2s;
    &:hover{
        color:red;
    }
`;

export const Input =styled.input`
    text-align:right;
    height:40px;
`;



