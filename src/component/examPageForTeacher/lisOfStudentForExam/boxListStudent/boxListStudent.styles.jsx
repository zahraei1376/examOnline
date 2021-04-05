

//     &-value {
//       padding: 10px;
//     }


//     @media only screen and (max-width: 768px) {
//       &-red {
//         color: red;
//         border: 1px solid red;
//         box-shadow: 0px 5px 5px 1px rgba(0, 0, 0, 0.3);
//         // margin: 0 10px;
//         // display: flex;
//         // flex-direction: column;
//         // align-items: center;
//         // justify-content: center;
//         // &:hover{
//         //     text-decoration: none;
//         // }
//         i {
//           margin-right: 0;
//         }
//       }

//       &-green {
//         color: green;
//         border: 1px solid green;
//         box-shadow: 0px 5px 5px 1px rgba(0, 0, 0, 0.3);
//         // display: flex;
//         // flex-direction: column;
//         // align-items: center;
//         // justify-content: center;
//         // &:hover{
//         //     text-decoration: none;
//         // }
//         i {
//           margin-right: 0;
//         }
//       }
//     }
//   }

//   &_body {
//     padding-top: 15px;
//     padding-bottom: 15px;
//     height: 100px;
//     border-radius: 0 !important;
//     display: flex;
//     justify-content: space-evenly;
//     align-items: center;

//     &-check {
//       // position: absolute;
//       // top: 20%;
//       // left: 20px;
//       cursor: pointer;
//     }

//     &-ScoreInput {
//       width: 50%;
//       text-align:center
//       // height: 100px;
//       // border: none;
//     }
//   }
// }

// // .card-header:first-child {
// //     border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
// // }

// // .pt-2, .py-2 {
// //     padding-top: .5rem !important;
// // }

// // .mb-0, .my-0 {
// //     margin-bottom: 0 !important;
// // }

// // .question-card img {
// //     max-width: 100%;
// //     height: auto;
// // }

// // .forum-card-img-30 img {
// //     width: 30px;
// //     height: 30px;
// // }

// // .card-body {
// //     padding-top: 1.5rem;
// //     padding-bottom: 1.5rem;
// //     border-radius: 0 !important;
// // }
// // .card-body {
// //     -ms-flex: 1 1 auto;
// //     flex: 1 1 auto;
// //     min-height: 1px;
// //     padding: 1.25rem;
// // }
// // .btn[class*="btn-outline-"].btn-sm {
// //     padding-top: .38rem;
// //     padding-bottom: .38rem;
// // }
// // .btn:not(:disabled):not(.disabled) {
// //     cursor: pointer;
// // }
// // .btn[class*="btn-outline-"] {
// //     padding-top: .7rem;
// //     padding-bottom: .7rem;
// // }
// // .btn.btn-sm {
// //     padding: .5rem 1.6rem;
// //     font-size: .64rem;
// // }

import styled,{css} from 'styled-components';
import { IconButton } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const LikeAndDisLikeCss = css`
  width: 60px;
  height: 40px;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:5px;
  @media only screen and (max-width: 768px) {
    box-shadow: 0px 5px 5px 1px rgba(0, 0, 0, 0.3);
    i {
      margin-right: 0;
    }
  }
`;



export const CardHeader = styled.div`
    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
    background-color: rgba(0, 0, 0, 0.03);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e4e9f2;
    color: #888c9c;
    cursor: pointer;
    transition:all .3s;

    &:hover{
      background-color: #009688;
      color:#fff;
    }
`;

export const LikeBtn = styled.div`
    color: green;
    border: 1px solid green;
    box-shadow: 0px 5px 5px 1px rgba(0, 0, 0, 0.3);
    text-align: center;
    ${LikeAndDisLikeCss}
    // &:hover{
    //     text-decoration: none;
    // }
    i {
      margin-right: 3px;
    }
`;

export const DislikeBtn = styled.div`
    color: red;
    border: 1px solid red;
    box-shadow: 0px 5px 5px 1px rgba(0, 0, 0, 0.3);
    margin: 0 10px;
    text-align: center;
    ${LikeAndDisLikeCss}
    // &:hover{
    //     text-decoration: none;
    // }
    i {
      margin-right: 3px;
    }
`;


export const Card = styled.div`
  // width:90%;
  margin:0 1rem;
  font-weight: 400;
  border: 0;
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  cursor:pointer;
  box-sizing: border-box;
  border-radius:1rem;
  border:1px solid transparent;
  // -webkit-backface-visibility: hidden;
  // backface-visibility: hidden;
  &:hover{
    border:1px solid rgba(0,0,0,.4);

    
    ${CardHeader}{
      background-color: #009688;
      color:#fff;
      border-top-left-radius:1rem;
      border-top-right-radius:1rem;
    }

    ${LikeBtn}{
      background-color:rgba(256,256,256,.7);
    }

    ${DislikeBtn}{
      background-color:rgba(256,256,256,.7);
    }
  }
`;
export const CardImage = styled.img`
    margin: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
`;

export const CardName = styled.strong`
    font-size: 18px;
    font-family: Bnazanin;
    text-align: center;
`;

export const LikeContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;



export const Span =styled.span`
  padding: 10px;
  font-size:1.5rem;
`;

export const SpanIcon =styled.i`
font-size:1.8rem;
`;

export const CardBody =styled.div`
    padding-top: 15px;
    padding-bottom: 15px;
    height: 100px;
    border-radius: 0 !important;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

export const CardBodyIconConatiner =styled(IconButton)`
  cursor: pointer;
  // font-size:2rem;
`;

export const CardBodyIcon =styled(CheckCircleIcon)`
  // cursor: pointer;
  font-size:3rem;
  &:hover{
    color:#009688;
  }
`;



export const CardBodyInput =styled.input`
  min-width:50px;
  border:2px solid #b5b5b5;
  border-radius:4px;
  width: 50%;
  text-align:center
`;