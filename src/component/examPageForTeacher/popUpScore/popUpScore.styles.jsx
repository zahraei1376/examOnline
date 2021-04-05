
// 	///////////////
// 	&__header {
// 		margin: 10px;
// 		padding: 20px;
// 		display: flex;
// 		justify-content: space-between;
// 		align-items: center;
// 		border: 3px solid #797a7c;
// 		font-family: 'BNazanin';
// 		border-radius: 10px;
// 		@media only screen and (max-width: 769px) {
// 			flex-direction: column;
// 		}

// 		&-timeDiv {
// 			display: flex;
// 			justify-content: space-between;
// 			align-items: center;
// 			font-family: 'BNazanin';
// 		}

// 		&-score {
// 			color: black;
// 		}
// 	}


// 	&__user {
// 		font-size: 2.5rem;
// 		text-align: center;
// 		margin-top: 2rem;
// 	}
import styled , {keyframes} from 'styled-components';

const Load = keyframes`

`;

export const PopUpScoreContainer =styled.div`
	height: 100vh;
	width: 100%;
	font-family: 'BNazanin';
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0,0,0, 0.5);
	z-index: 1;
	transition: all 0.3s;
	// animation-name: load;
	// animation-duration: 1s;
	direction: ltr;

	@supports (-webkit-backdrop-filter: blur(5px)) or (backdrop-filter: blur(5px)) {
		-webkit-backdrop-filter: blur(5px);
		backdrop-filter: blur(5px);
		background-color: rgba(0,0,0, 0.3);
		direction: ltr;
	}
`;

export const PopUpScoreContent = styled.div`
    width: 80%;
    height: 90vh;
    // scroll-behavior: smooth;
    overflow-y: scroll;
    // z-index: 45789;
    // position: absolute;
    // top: 120%;
    // bottom: 20%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    margin: auto;
    background-color: #f0f3f5;
    box-shadow: 0 2rem 4rem rgba(0,0,0, 0.2);
    border-radius: 3px;
    color: black;
    margin-top: 70px;
    margin-bottom: 30px;
    // display: table;
    // overflow: hidden;
    // opacity: 0;
    // transform: translate(-50%, -50%) scale(.25);
    transition: all 0.5s 0.2s;
    @media only screen and (max-width: 769px) {
        width: 100%;
    }
`;

export const PopUpScoreHeader = styled.div`
    margin: 10px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 3px solid #797a7c;
    font-family: 'BNazanin';
    border-radius: 10px;
    @media only screen and (max-width: 769px) {
        flex-direction: column;
    }
`;

export const PopUpScoreHeaderGroup = styled.div`

`;

export const PopUpScoreHeaderTime = styled.h1`
    color: black;
    font-size: 16px;
    text-align: center;
    font-family: 'BNazanin';
`;

export const PopUpScoreHeaderDelay = styled.div`
    color: red;
    font-size: 18px;
    text-align: center;
`;

export const PopUpScoreBtnClose = styled.button`
		// font-family: 'BNazanin';
		// font-size: large;
		// width: 5rem;
		// height: 5rem;
		// background-color: rgba(#000, 0.5);
		// color: #fff;
		// border-radius: 50%;
		// outline: none;
		// position: absolute;
		// top: 13%;
		// right: 5%;
		// z-index: 100;
		///////////
		width: 55px;
		height: 55px;
		font-size: 21px;
		// background-color: rgba(#000, 0.5);
		// color: #fff;
		background-color:rgba( 0,77,64,0.7);
		color: #fff;
		border:1px solid #fff;
		border-radius: 50%;
		outline: none;
		position: absolute;
		top: 70px;
		left: 70px;
		z-index: 100;
		@media only screen and (max-width: 769px) {
		top: 90px;
		left: 30px;
		}
		// width: 3rem;
		// height: 3rem;
		// background-color: rgba(#000, 0.5);
		// color: #fff;
		// border-radius: 50%;
		// outline: none;
		// position: absolute;
		// top: 5px;
		// right: 5px;
`;

export const PopUpScorePageQuesion = styled.div`
		margin: 10px;
		// border: 1px solid #797a7c;
		border: 3px solid #797a7c;
		border-radius: 10px;
		// padding-right: 10px;
`;