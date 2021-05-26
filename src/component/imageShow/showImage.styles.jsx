import styled,{keyframes} from 'styled-components';

const Load = keyframes`
    0% {
	        opacity: 0;
	        visibility: hidden;
	        // width: 0;
	    }
	    50% {
	        opacity: .5;
	        // visibility: hidden;
	    }
	    100% {
	        opacity: 1;
	        // visibility: hidden;
	        // width: 100%;
	    }

`;


export const ShowImageContainer = styled.div`
	height: 100vh;
	// min-height: 1000px;
	width: 100%;
	position: fixed;
	top: 50%;
	left: 50%;
	// position: absolute;
	// top: 50%;
	// left: 50%;
	transform: translate(-50%, -50%);
	
	background-color: rgba(0,0,0, 0.5);
	z-index: 99999;
	transition: all 0.3s;
	animation-name: ${Load};
	animation-duration: 1s;
	// overflow-y: scroll;
	direction: rtl;
	overflow-y: scroll;
	// direction: rtl;

	@supports (-webkit-backdrop-filter: blur(20px)) or (backdrop-filter: blur(20px)) {
		-webkit-backdrop-filter: blur(20px);
		backdrop-filter: blur(20px);
		// background-color: rgba(#000, 0.8);
	}
`;

export const ShowImageContent =styled.div`
		width: 100%;
		min-height: 95%;
		z-index: 45789;
		background-color: rgba(#000, 1);
		
		display: flex;
		flex-direction: column;
		// justify-content: space-between;
		align-items: center;
		// position: relative;
		// overflow-y: scroll;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, 0);
		// margin: auto;
		// background-color: $color-grey-light-2;
		box-shadow: 0 2rem 4rem rgba(#000, 0.2);
		// border-radius: 3px;
		// color: black;
		// display: table;
		// overflow: hidden;
		// opacity: 0;
		// transform: translate(-50%, -50%) scale(.25);
		transition: all 0.5s 0.2s;
		margin-top: 60px;
		margin-bottom: 60px;
`;

export const ShowImageImgText = styled.img`
			width: 50%;
			margin-top: 30px;
			//   width: 70%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: auto;
			cursor: zoom-out;
			@media only screen and (max-width: 769px) {
				width: 100%;
			}
`;

export const ShowImageImgQuestion = styled.img`
			width: 80%;
			margin-top: 6px;
			margin-bottom: 30px;
			// overflow-y: scroll;
			//   width: 70%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: auto;
			cursor: zoom-out;
			@media only screen and (max-width: 769px) {
				width: 100%;
			}
`;


export const ShowImageCaption = styled.p`
		font-size: 18px;
		color: white;
		margin-top: 10px;
		margin-bottom:30px;
		padding:0 6rem;
		//   height: 30%;
		//   position: absolute;
		//   top: 30px;
		//   bottom: 20%;
		//   text-align: center;
		//   right: 50%;
		//   transform: translate(-50%, 0);
		//   height: auto;
`;

export const BtnClose = styled.button`
	width: 6rem;
	height: 6rem;
	background-color: rgb(63, 135, 166);
	color: #fff;
	border-radius: 50%;
	outline: none;
	border:1px solid transparent;
	position: absolute;
	top: 1rem;
	right: 5rem;
	font-size:2rem;
	font-family:Bnazanin;
	cursor:pointer;
	transition:all 0.3s;
	&:hover{
		background-color: #fff;
		border:1px solid rgb(63, 135, 166);
		color:rgb(63, 135, 166);
	}
`;