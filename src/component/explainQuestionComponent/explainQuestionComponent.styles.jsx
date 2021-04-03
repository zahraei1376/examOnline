import styled from 'styled-components';
import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export const ExplainDivContainer = styled.div`
    border-left:2px solid #3f87a6;
    // padding-left:1rem;
    margin-left: 2rem;
    display:flex;
    align-items: center;
    height: 66%;
`;

export const ExplainDiv = styled.pre`
    white-space: pre-wrap;      
    white-space: -moz-pre-wrap;  
    white-space: -pre-wrap;      
    white-space: -o-pre-wrap;   
    word-wrap: break-word;
    font-family:Bnazanin;
    font-size:1.8rem;
`;

export const TimeDiv = styled.pre`
    white-space: pre-wrap;      
    white-space: -moz-pre-wrap;  
    white-space: -pre-wrap;      
    white-space: -o-pre-wrap;   
    word-wrap: break-word;
    font-family:Bnazanin;
    font-size:1.8rem;
    margin-top:2rem;
`;

export const MyTypography = styled(Typography)`
    font-family:Bnazanin !important;
    font-size:1.8rem !important;
    float:right;
    color:#fff;
`;

export const MyButton = styled(Button)`
    font-family:Bnazanin;
    font-size:1.6rem !important;
`;

// export const MyMainButton = styled(Button)`
//     font-family:Bnazanin;
//     font-size:1.6rem !important;
//     border-radius:50% !important;
//     padding:0 !important;
// `;


export const MyMainButton = styled.button`
    font-family:Bnazanin;
    font-size:1.6rem;
    border-radius:50%;
    padding:0 ;
    width:4rem;
    height:4rem;
    border:1px solid #3f87a6;
    cursor:pointer;
    transition:all .2s;
    margin-left:1rem;

    &:focus{
        outline:none;
    }

    &:hover{
        background-color:#3f87a6;
        color:#fff;
    }
`;