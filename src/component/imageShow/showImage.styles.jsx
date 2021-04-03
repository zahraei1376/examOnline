// @import '@components/Messages/ChatComponents/sass/abstract/_variable';
// @import '@components/Messages/ChatComponents/sass/base/_animations';

// .showImage {
// 	height: 100vh;
// 	// min-height: 1000px;
// 	width: 100%;
// 	position: fixed;
// 	top: 50%;
// 	left: 50%;
// 	// position: absolute;
// 	// top: 50%;
// 	// left: 50%;
// 	transform: translate(-50%, -50%);
	
// 	background-color: rgba(#000, 0.5);
// 	z-index: 99999;
// 	transition: all 0.3s;
// 	animation-name: load;
// 	animation-duration: 1s;
// 	// overflow-y: scroll;
// 	direction: rtl;
// 	overflow-y: scroll;
// 	// direction: rtl;

// 	@supports (-webkit-backdrop-filter: blur(20px)) or (backdrop-filter: blur(20px)) {
// 		-webkit-backdrop-filter: blur(20px);
// 		backdrop-filter: blur(20px);
// 		background-color: rgba(#000, 0.8);
// 	}

// 	//   &__image {
// 	//     width: 50%;
// 	//     height: auto;
// 	//     z-index: 45789;
// 	//     position: absolute;
// 	//     top: 50%;
// 	//     left: 50%;
// 	//     transform: translate(-50%, -50%);
// 	//     margin: auto;
// 	//     // background-color: $color-grey-light-2;
// 	//     box-shadow: 0 2rem 4rem rgba(#000, 0.2);
// 	//     transition: all 0.5s 0.2s;
// 	//     @media only screen and (max-width: 769px) {
// 	//       width: 100%;
// 	//     }
// 	//   }

// 	&__content {
// 		width: 100%;
// 		min-height: 95%;
// 		z-index: 45789;
// 		background-color: rgba(#000, 1);
		
// 		display: flex;
// 		flex-direction: column;
// 		// justify-content: space-between;
// 		align-items: center;
// 		// position: relative;
// 		// overflow-y: scroll;
// 		position: absolute;
// 		top: 0;
// 		left: 50%;
// 		transform: translate(-50%, 0);
// 		// margin: auto;
// 		// background-color: $color-grey-light-2;
// 		box-shadow: 0 2rem 4rem rgba(#000, 0.2);
// 		// border-radius: 3px;
// 		// color: black;
// 		// display: table;
// 		// overflow: hidden;
// 		// opacity: 0;
// 		// transform: translate(-50%, -50%) scale(.25);
// 		transition: all 0.5s 0.2s;
// 		margin-top: 60px;
// 		margin-bottom: 60px;
// 		&-image {
// 			//   position: relative;
// 			//   top: 0;
// 			//   left: 50%;
// 			//   transform: translate(-50%,0 );
// 			width: 50%;
// 			margin-top: 30px;
// 			//   width: 70%;
// 			display: flex;
// 			justify-content: center;
// 			align-items: center;
// 			height: auto;
// 			cursor: zoom-out;
// 			@media only screen and (max-width: 769px) {
// 				width: 100%;
// 			}
// 		}

// 		&-imageQuestion {
// 			width: 80%;
// 			margin-top: 6px;
// 			margin-bottom: 30px;
// 			// overflow-y: scroll;
// 			//   width: 70%;
// 			display: flex;
// 			justify-content: center;
// 			align-items: center;
// 			height: auto;
// 			cursor: zoom-out;
// 			@media only screen and (max-width: 769px) {
// 				width: 100%;
// 			}
// 		}

// 		&-imageText {
// 			width: 50%;
// 			margin-top: 30px;
// 			//   width: 70%;
// 			display: flex;
// 			justify-content: center;
// 			align-items: center;
// 			height: auto;
// 			cursor: zoom-out;
// 			@media only screen and (max-width: 769px) {
// 				width: 100%;
// 			}
// 		}
// 	}
// 	///////////////
// 	//   &__btn {
// 	//     width: 3rem;
// 	//     height: 3rem;
// 	//     background-color: rgba(#000, 0.5);
// 	//     color: #fff;
// 	//     border-radius: 50%;
// 	//     outline: none;
// 	//     position: absolute;
// 	//     top: 0;
// 	//     right: 25%;
// 	//     @media only screen and (max-width: 769px) {
// 	//       top: 25%;
// 	//       right: 0;
// 	//     }
// 	//   }

// 	//   &__btnClose {
// 	//     width: 3rem;
// 	//     height: 3rem;
// 	//     background-color: rgba(#000, 0.5);
// 	//     color: #fff;
// 	//     border-radius: 50%;
// 	//     outline: none;
// 	//     position: absolute;
// 	//     top: 5px;
// 	//     right: 5px;
// 	//   }

// 	&__btn {
// 		width: 3rem;
// 		height: 3rem;
// 		background-color: rgba(#000, 0.5);
// 		color: #fff;
// 		border-radius: 50%;
// 		outline: none;
// 		position: absolute;
// 		top: 5px;
// 		right: 5px;
// 	}

// 	&_caption {
// 		font-size: 18px;
// 		color: white;
// 		margin-top: 10px;
// 		//   height: 30%;
// 		//   position: absolute;
// 		//   top: 30px;
// 		//   bottom: 20%;
// 		//   text-align: center;
// 		//   right: 50%;
// 		//   transform: translate(-50%, 0);
// 		//   height: auto;
// 	}
// }

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
