import styled from 'styled-components';
import {Button} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

export const InputDivContainer =styled.div`
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    margin:30px 0;
`;

export const Input =styled.input`
    text-align:right;
    height:40px;
`;

export const InputContainerButton =styled(Button)`
    
`;

export const InputContainerIcon =styled(Icon)`
    color:#000;

    &:hover{
        color:red;
    }
`;