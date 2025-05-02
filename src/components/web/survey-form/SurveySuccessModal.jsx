import React from "react";
import styled from "styled-components";

import successTick from "../../../../src/assets/images/job-desk/success-tick.svg";
import closeImage from "../../../../src/assets/images/job-desk/close.svg";
import { Link } from "react-router-dom";

function SurveySuccessModal({ setSuccessModal, isSuccessModal }) {
	return (
		<>
			<Overlay
				onClick={() => setSuccessModal(false)}
				className={isSuccessModal ? "active" : ""}
			></Overlay>
			<BackContainer
				style={{ transform: isSuccessModal && "Scale(1,1)" }}
			>
				<Modal>
					<TitleSection>
						<ImageContainer>
							<img src={successTick} />
						</ImageContainer>
						<Title>Successful</Title>
						<Close onClick={() => setSuccessModal(false)}>
							<img src={closeImage} alt="Close" />
						</Close>
					</TitleSection>
					<Container>
						<ModalDescription>
							Thank you for information that will help
							us give students an amazing career!
						</ModalDescription>
						<Button to="/">Continue</Button>
					</Container>
					<BottomLine></BottomLine>
				</Modal>
			</BackContainer>
		</>
	);
}

export default SurveySuccessModal;

const BackContainer = styled.div`
	position: fixed;
	transition: all 0.3s ease;
	transform: scale(0, 0);
	width: 100%;
	height: 100vh;
	z-index: 10000;
	left: 0;
	top: 0px;
	background: rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(4px);
`;
const Overlay = styled.div`
	position: fixed;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: 1000;
	display: none;
	backdrop-filter: blur(5px);
	background: rgba(0, 0, 0, 0.5);
	&.active {
		display: block;
	}
`;
const Modal = styled.div`
	width: 700px;
	max-height: 90vh;
	overflow: hidden;
	margin: 0 auto;
	background-color: #fff;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	position: absolute;
	padding: 50px;
	border-radius: 10px;
	transition: all 0.4s ease;
	z-index: 101;
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	background-image: url(${"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/congratulations.svg"});
	background-size: contain;
	background-repeat: no-repeat;
	max-width: 450px;

	@media (max-width: 560px) {
		max-width: 400px;
	}
	@media (max-width: 450px) {
		max-width: 350px;
		padding: 35px;
	}
	@media (max-width: 390px) {
		max-width: 300px;
	}
`;

const ModalDescription = styled.p`
	font-size: 16px;
	color: #333333;
	margin-bottom: 20px;

	width: 100%;
	display: flex;
	align-self: baseline;
	@media (max-width: 560px) {
		width: 100%;
	}
`;
const Close = styled.span`
	width: 15px;
	display: block;
	margin-left: auto;
	margin-right: 0;
	cursor: pointer;
	img {
		display: block;
		width: 100%;
	}
`;
const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	padding-top: 25px;
`;
const Button = styled(Link)`
	font-size: 16px;
	background-color: #15bf81;
	padding: 5px 20px;
	border-radius: 5px;
	cursor: pointer;
	font-family: "gordita_medium";
	border: 1px solid #15bf81;
	color: #fff;

	@media (max-width: 340px) {
		font-size: 14px;
	}
`;
const BottomLine = styled.span`
	display: block;
	width: 100%;
	border-top: 7px solid #5ac78b;
	border-bottom: 7px solid #459e7b;
	position: absolute;
	bottom: 0;
	left: 0;
`;

const TitleSection = styled.div`
	padding-bottom: 25px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	justify-content: flex-start;
	border-bottom: 1px solid #e7e6e6;
`;
const ImageContainer = styled.div`
	width: 50px;
	margin-right: 20px;

	& img {
		width: 100%;
		display: block;
	}
	@media all and (max-width: 480px) {
		width: 40px;
	}
`;

const Title = styled.h2`
	font-family: "gordita_medium";
	font-size: 20px;
	color: #000;
`;
