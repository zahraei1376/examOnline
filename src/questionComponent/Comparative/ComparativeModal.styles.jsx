import {Button} from '@material-ui/core';
import styled from 'styled-components';
export const ComparativeItemContainer = styled.div`
    height:88%;
    overflow-Y:scroll;
`;

export const ComparativeButton = styled(Button)`
    // background-color:#009688 !important;
    // float:left;
    color:#fff !important;
    // width:100px;
`;

// export const ComparativeButton = styled.div`
//     background-color:#fff !important;
//     float:right;
//     color:#009688 !important;
//     width:100%;
//     display:flex;
//     justify-content: flex-end;
// `;

export const ComparativeButtonSave = styled(Button)`
    background-color:#009688 !important;
    color:#fff !important;
    bottom: 0;
    transition:all .3s;
    &:hover{
        background-color:rgba(0,0,0,.9);
    }
`;

