import styled from 'styled-components';

export const QuestionsInfoContainer = styled.div`
    // width:100%;
    // display:flex;
    // justify-content:space-evenly;
    // align-items:center;
    // &:not(&:last-child){
    //     border-bottom:1px dashed #82b1ff;
    // }

    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:not(&:last-child){
        border-bottom:1px dashed #82b1ff;
    }

    @media screen and (max-width:375px){
        flex-direction: column;
    }
`;

export const QuestionsInfosContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5rem auto 0;
    font-size: 1.2rem;
    // overflow-x:scroll;
`;

export const HeaderContainer = styled.div`
    // width:100%;
    // display:flex;
    // justify-content:space-evenly;
    // align-items:center;
    // border-bottom:1px solid #eee;
    // padding-bottom:2rem;
    //////////////////////
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid darkgray;
`;

export const HeaderGroup = styled.div`
    // font-family:Bnazanin;
    // font-size:1.8rem;
    // width:16%;
    width:20%;
`;

export const HeaderTitle = styled.h2`
    font-family:Bnazanin;
    font-size:1.8rem;
    color:#546E7A;
`;