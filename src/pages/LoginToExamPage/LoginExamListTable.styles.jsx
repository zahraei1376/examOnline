import styled from 'styled-components';
import TableContainer from '@material-ui/core/TableContainer';
import {Button} from '@material-ui/core';

export const MyTableContainer = styled(TableContainer)`
    direction:rtl;
`;

// export const DontAllowBtn = styled(Button)`
//     width:4rem !important;
//     color:red !important;
//     border:1px solid red !important;
//     font-family:Bnazanin;
//     font-size:2rem !important;
// `;

// export const AllowBtn = styled(Button)`
//     width:4rem !important;
//     color:green !important;
//     border:1px solid red !important;
//     font-family:Bnazanin;
//     font-size:2rem !important;
// `;

export const DontAllowBtn = styled.button`
    width:4rem;
    color:red ;
    border:1px solid red ;
    font-family:Bnazanin;
    font-size:2rem;
    border-radius:5px;
    display:flex;
    align-iems:center;
    justify-content: center;
    cursor:pointer;
    background-color:transparent;
    transition:all 0.2s;
    &:hover{
        background-color:#eee;
        // transform:scale(1.06);
    }
`;

export const AllowBtn = styled.button`
    width:4rem;
    color:green ;
    border:1px solid green ;
    font-family:Bnazanin;
    font-size:2rem;
    border-radius:5px;
    display:flex;
    align-iems:center;
    justify-content: center;
    cursor:pointer;
    background-color:transparent;
    transition:all 0.2s;
    &:hover{
        background-color:#eee;
        // transform:scale(1.06);
    }
`;