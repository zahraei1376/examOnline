import styled from 'styled-components';
// import {Button} from '@material-ui/core';
// import {IconButton} from '@material-ui/core'

export const VacancyItemConatiner = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    // align-items:center;
    // justify-content: space-evenly;
    margin-top:4rem;
    
    @media only screen and (max-width: 769px) {
            flex-direction:column;
    }
`;

export const VacancyQuestion = styled.h6`
    font-size:2rem;
    font-family:Bnazanin;
    padding:2rem 3rem 4rem 3rem;
    line-height:4rem;
    text-align:right;
`;

export const VnacyTextsContainer = styled.div`
    // display:flex;
    // align-items:center;
    // justify-content: space-evenly;
    // margin-top:4rem;
    // @media only screen and (max-width: 769px) {
    //     flex-direction:column;
    // }
    width:100%;
    direction:rtl;
    display:grid;
    grid-template-columns: auto auto auto;
    column-gap: 3rem;
    row-gap: 3rem;
    overflow-X:scroll;
    @media only screen and (max-width: 769px) {
        grid-template-columns: auto auto;
    }
`;

export const VnacyTextDiv = styled.div`
    // width:80%;
    // padding:2rem;
    // direction:rtl;
    // text-align:right;
    // margin:2rem 0;
    // box-sizing:border-box;
    // height:3rem;
    // text-align:right;
    // @media only screen and (max-width: 767px) {
    //     width:18rem;
    // }
`;


export const VnacyText = styled.input`
    // width:50%;
    // padding:2rem;
    // direction:rtl;
    // text-align:right;
    // margin:2rem 0;
    // box-sizing:border-box;
    font-size:1.9rem;
    font-family:Bnazanin;
    box-sizing:border-box;
    height:3rem;
    text-align:center;
    @media only screen and (max-width: 767px) {
        width:18rem;
    }
`;

export const VnacySpan = styled.span`
    font-size:2rem;
    font-family:Bnazanin;
    margin-left:1rem;
`;