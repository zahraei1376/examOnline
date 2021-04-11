// .fontText {
// 	font-family: 'BTitrBold';
// }

// .locationDatePicker {
// 	// display: flex;
// 	// justify-content: center;
// 	// align-items: center;
// 	// padding-left: 10px;
// 	// padding-right: 10px;

// 	// text-align: center;
// }

// .locationLable {
// 	@media only screen and (max-width: 769px) {
// 		display: flex;
// 		justify-content: flex-end;
// 		margin-top: 11px;
// 	}
// }

// .selectedDateConatiner {
// 	margin: 50px 0 50px 0;
// 	@media only screen and (max-width: 769px) {
// 		margin: 20px 0 30px 0;
// 	}
// }
import styled from 'styled-components';

// export const LableDiv = styled.div`

// `;

// export const Lable = styled.label`

//     font-family:Bnazanin;
//     font-size:1.8rem;

// 	@media only screen and (max-width: 769px) {
//         display: flex;
//         justify-content: flex-end;
//         margin-top: 11px;
//     }
// `;

export const TableContainer = styled.div`
    width: 94%;
    display:flex;
    flex-direction:column;
    // width:100%;
    box-shadow: 0 3px 20px 3px rgba(0,0,0,0.5);
    // border:1px solid #000;
    border-radius:3rem;
    margin:3rem;
    padding-bottom:3rem;
`;

export const DateContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    border-bottom: 4px solid #009688;
    padding:2rem;
    border-radius:2rem;
    background-color:#fff;
    margin:5rem auto;
    direction:rtl;
`;

export const LableDiv =styled.div`
    margin-left:3rem;
`;

export const Lable =styled.label`
    text-align:center;
    font-family:Bnazanin;
    font-size:1.8rem;
`;

export const QuestionsContainer =styled.div`
    margin:12rem 2rem 2rem 2rem;
    box-shadow: 0 1px 9px 1px rgba(0,0,0,0.5);
`;