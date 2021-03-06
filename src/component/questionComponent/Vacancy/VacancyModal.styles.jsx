import {Button} from '@material-ui/core';
import styled from 'styled-components';

export const VacancyButton = styled(Button)`
    width:200px;
    background-color:#ccc;
    float:right;
    color:#000;
`;

export const VacancyButtonSave = styled(Button)`
    background-color:#009688 !important;
    color:#fff !important;
    font-size:1.5rem !important;
    bottom: 0;
    transition:all .3s;
    &:hover{
        background-color:rgba(0,0,0,.9);
    }
`;

export const VacancyInputContainer = styled.div`
    width:100%;
    height:40vh;
`;

export const VacancyInput = styled.textarea`
    margin:30px 0;
`;

export const VacancyShowText = styled.pre`
    white-space: pre-wrap;     
    white-space: -moz-pre-wrap;  
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word; 
    font-size:18px;
    border-width:5px;  
    border-style:double;
`;

export const RecordButton = styled.button`
    border:none;
    background-color:#009688;
    color:#fff;
    font-family:Bnazanin;
    font-size:1.8rem;
    padding:1rem 1rem;
    border-radius:2rem;
    cursor:pointer;
`;

