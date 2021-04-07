// .fontText {
// 	font-family: 'BTitrBold';
// }

// .locationDatePicker {
// 	display: flex;
// 	justify-content: flex-end;
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

// .arrawContainer {
// 	display: flex;
// 	align-items: center;
// }

// .arrow {
// 	// animation-name: toBottom;
// 	// animation-duration: 1s;
// 	font-size: 50px;
// 	margin-left: 30px;
// 	color: rgb(139, 3, 3);
// 	animation: toBottom 1s linear alternate infinite;
// 	// animation: toBottom 1s linear alternate 10;
// 	&__text {
// 		font-size: 17px;
// 		color: rgb(82, 79, 79);
// 	}
// }

import styled from 'styled-components';

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

export const ListOfStudentContainer =styled.div`
    margin-top:3rem;
`;