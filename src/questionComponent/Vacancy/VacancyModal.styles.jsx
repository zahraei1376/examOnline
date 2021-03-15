import {Button} from '@material-ui/core';
import styled from 'styled-components';


export const ComparativeButton = styled(Button)`
    background-color:#ccc;
    float:right;
    color:#000;
`;

export const ComparativeButtonSave = styled(Button)`
    background-color:#000;
    color:#fff;
    bottom: 0;
    transition:all .3s;
    &:hover{
        background-color:rgba(0,0,0,.9);
    }
`;

