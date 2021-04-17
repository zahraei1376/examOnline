import styled from 'styled-components';

export const ContainerForm = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    padding:30px;
    min-height:100vh;
    // overflow-Y:scroll;
    box-sizing:border-box;
    background: linear-gradient(to bottom, #3f87a6, #ebf8e1, #f69d3c);
    // background-image: linear-gradient(to bottom, #a7ffeb , #f9fbe7,#ffccbc);
`;

export const Form = styled.form`
    background-color:rgba(255,255,255 , .5);
    padding:30px;
    border-radius:5px;
    box-shadow:0 1px 11px 2px rgba(0,0,0,.3);
    // display:flex;
    // flex-direction:column;
    // justify-content:space-between;
    // align-items:center;
    // margin:30px;
`;

export const GroupDiv = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    padding:30px 0;
    // border-bottom:1px solid #f69d3c;
    border-bottom:1px solid #1f6f8b;
`;

export const DatesDiv = styled.div`
    width:100%;
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    padding:30px 0;
    // border-bottom:1px solid #f69d3c;
    border-bottom:1px solid #1f6f8b;
`;

export const DateDiv = styled.div`
width:50%;
    display:flex;
    justify-content:center;
    align-items:center;
    // padding:30px 0;
`;

export const ClocksDivContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding:30px 0;
    // border-bottom:1px solid #f69d3c;
    border-bottom:1px solid #1f6f8b;
`;


export const ClocksDiv = styled.div`
    width:100%;
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    margin-bottom:30px;
    // padding:30px 0;
    // border-bottom:1px solid #f69d3c;
    // border-bottom:1px solid #1f6f8b;
`;

export const ClockDiv = styled.div`
width:50%;
    display:flex;
    justify-content:center;
    align-items:center;
    // padding:30px 0;
`;

export const TimeDiv = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:30px;
    // padding:30px 0;
    // border-top:1px dashed #f69d3c;
    // border-bottom:1px solid #1f6f8b;
`;

export const SelectDiv = styled.div`
    text-align:right;
    width:70%
`;

export const MySelect = styled.select`
    border-radius:10px;
    width:100%;
    direction: rtl;
    // text-align:right;
    // direction:rtl;
`;

export const Option = styled.option`
    width:100%
    text-align:right;
    direction:rtl;
    font-family:Bnazanin;
    font-size:1.8rem;
`;

export const LabelGroup = styled.label`
    width:30%;
    text-align:right;
    padding:0 20px;
    font-family:Bnazanin;
    font-size:1.8rem;
`;

export const LabelTime = styled.label`
    width:50%;
    text-align:left;
    padding:0 10px;
    font-family:Bnazanin;
    font-size:1.8rem;
`;

export const InputGroup = styled.input`
    border-radius:10px;
    // padding:1rem;
    font-family:Bnazanin;
    font-size:1.8rem;
    width:70%;
    text-align:right;
    direction:rtl;
    border:1px solid rgb(118, 118, 118);
    &:focus{
        outline:none;
    }
`;
export const InputTimeContainer = styled.div`
    width:50%;
    text-align:right;
    margin:0 1rem 0 0;
`;


export const InputTime = styled.input`
    border-radius:10px;
    font-family:Bnazanin;
    font-size:1.8rem;
    // width:70%;
    text-align:right;
    // direction:rtl;
    padding:0 1rem;
    border:1px solid rgb(118, 118, 118);
    &:focus{
        outline:none;
    }
`;

export const BtnGroupContainer = styled.div`
    margin-top:40px;
    display:flext;
    align-items:flex-end;
`;

export const BtnSend = styled.input`
    width:80px;
    height:40px;
    transiion:all .3s;
    font-family:BNazaninBold;
    font-size:18px;
    align-items:cente;
    background-color:#1f6f8b;
    color:#fff;
    border-radius:5px;
    border:none;
    cursor:pointer;
    box-shadow:none;
    &:focus{
        outline:none;
    }

    &:hover{
        background-color:#1c2b2d;
        box-shadow:0 1px 11px 2px rgba(0,0,0,.3);
    }
`;