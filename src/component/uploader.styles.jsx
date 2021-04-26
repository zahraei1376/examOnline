import styled from 'styled-components';
import {Button} from '@material-ui/core';

export const UploaderButton = styled(Button)`
    background-color:#fff !important;
    box-shadow:none !important;
    color:#009688 !important;
    cursor:pointer;
`;

export const UploaderButtonSend = styled.input`
    // background-color:#fff;
    // // box-shadow:none !important;
    // color:#009688;
    // cursor:pointer;
    display:none;
`;

export const ShowDescriptionButton = styled(Button)`
    // background-color:#fff !important;
    // box-shadow:none !important;
    // color:#000 !important;
    // cursor:pointer;
    // border-radius:50% !important;
    // &:hover{
    //     color:#009688 !important;
    //     border:1px solid #000;
    // }
    // background-color:#3f87a6 !important;
    // border:1px solid #3f87a6 !important;
    background-color:#3f87a6 !important;
    &:hover{
        background-color:#eee !important;
        border:1px solid #3f87a6 !important;
    }
    

    @media only screen and (max-width: 769px) {
        margin-bottom: 2rem !important;
        
    }


`;