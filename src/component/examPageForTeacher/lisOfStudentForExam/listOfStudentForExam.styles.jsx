// @import '@components/Messages/ChatComponents/sass/abstract/_variable';
// .listOfStudentBox {
// 	list-style: none;
// 	margin-top: 30px;
// 	padding: 0 30 30 30px;
// 	border-radius: 10px;
// 	// border: 1px solid #000;
// 	box-shadow: 0 3px 20px 3px rgba($color: #000000, $alpha: 0.5);
// 	@media only screen and (max-width: 280px) {
// 		padding: 0;
// 	}
// }

// .back {
// 	background-color: #535252;
// 	margin-top: 100px;
// 	width: 100%;
// 	height: 200px;
// 	&__text {
// 		color: white;
// 		font-size: 30px;
// 		text-align: center;
// 	}
// }

// .listOfStudent {
// 	list-style: none;
// 	width: 100%;
// 	// margin-top: 60px;
// 	&_itemBox {
// 		// margin: 10px;
// 		display: flex;
// 		flex-direction: column;
// 		justify-content: center;
// 		align-items: center;
// 		background-color: #eee;
// 		width: 100%;
// 		height: 100px;
// 		color: black;
// 		border-radius: 5px;
// 		font-size: 16px;
// 		cursor: pointer;
// 		transition: all 0.2s;
// 		position: relative;
// 		&:hover {
// 			transform: scale(1.05);
// 			// background-color: #004d40;
// 			border: 1px solid #5ca388;
// 			// box-shadow: 0 10px 10px rgba($color: #004d40, $alpha: 0.7);
// 			// color: white;
// 		}

// 		&-infoStudent {
// 			display: flex;
// 			justify-content: center;
// 			align-items: center;
// 		}

// 		&-currentNumber {
// 			width: 100%;
// 			display: flex;
// 			justify-content: space-evenly;
// 			align-items: center;
// 			&-current {
// 				color: rgb(65, 202, 65);
// 				// border-bottom: 1px solid rgb(65, 202, 65);
// 				padding: 5px;
// 				span {
// 					color: rgb(65, 202, 65);
// 				}
// 			}

// 			&-wrong {
// 				// color: red;
// 				color: rgb(122, 116, 116);
// 				// border-bottom: 1px solid red;
// 				padding: 5px;
// 				// span {
// 				//   color: red;
// 				// }
// 			}
// 		}
// 	}
// 	&_item {
// 		// margin: 10px;
// 		display: flex;
// 		justify-content: center;
// 		align-items: center;
// 		list-style: none;
// 		width: 60%;
// 		height: 50px;

// 		// background-color: #aed581;
// 		// border: 1px solid #004d40;
// 		// color: black;
// 		// border-radius: 5px;
// 		// font-size: 16px;
// 		// cursor: pointer;
// 		// transition: all 0.2s;
// 		// &:hover {
// 		//   transform: scale(1.1);
// 		//   background-color: #004d40;
// 		//   border: 1px solid #aed581;
// 		//   color: white;
// 		// }
// 	}

// 	&_Score {
// 		width: 40%;
// 		height: 30px;
// 		display: flex;
// 		justify-content: center;
// 		align-items: center;
// 		// border: none;
// 		&-input {
// 			width: 90%;
// 			// height: 100px;
// 			border: none;
// 		}

// 		// &a:link i {
// 		//   color: #616161;
// 		// }
// 		// &a:visited i {
// 		//   color: white;
// 		// }
// 		// &a:hover i {
// 		//   color: white;
// 		// }
// 		// &a:active i {
// 		//   color: white;
// 		// }

// 		&-check {
// 			position: absolute;
// 			top: 20%;
// 			left: 20px;
// 			cursor: pointer;
// 			// color: #6e4949;
// 			// text-decoration: none;
// 			// &:hover {
// 			//   text-decoration: none;
// 			// }
// 			// &:active,
// 			// &:visited {
// 			//   color: white;
// 			//   text-decoration: none;
// 			// }
// 		}
// 	}
// }

// // .listOfStudent_Score-check:active {
// //   color: white;
// // }

// .archiveBtn {
// 	width: 100px;
// 	height: 50px;
// 	background-color: $color-A5;
// 	color: white;
// 	border-radius: 5px;
// 	transition: all 0.2s;
// 	margin-top: 30px;
// 	border: none;
// 	&:hover {
// 		background-color: #eee;
// 		border: 1px solid $color-A5;
// 		color: black;
// 	}
// }

////////////////////////////////////////////
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const GridContainer = styled(Grid)`
	// padding:3rem;
    margin:3rem;
    border:1px solid #000;
    box-sizing:border-box;
`;

export const MyGrid = styled(Grid)`
	list-style: none;
	margin-top: 30px;
	padding: 0 30 30 30px;
	border-radius: 10px;
	// border: 1px solid #000;
	box-shadow: 0 3px 20px 3px rgba($color: #000000, $alpha: 0.5);
	@media only screen and (max-width: 280px) {
		padding: 0;
	}
`;
