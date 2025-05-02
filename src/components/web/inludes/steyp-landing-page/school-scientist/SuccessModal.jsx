import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import closeImage from "../../../../../assets/images/school-scientist/close.svg";
import successImage from "../../../../../assets/images/school-scientist/success-image.svg";

function SuccessModal({ successModal, setSuccessModal, viewPhone }) {
	const history = useHistory();
	return (
		<>
			<Overlay
				onClick={() => setSuccessModal(false)}
				className={successModal ? "active" : ""}
			></Overlay>
			<BackContainer
				style={{ transform: successModal && "scale(1,1)" }}
			>
				<Modal>
					<TitleSection>
						<Left>
							<TickImage>
								<img src={successImage} alt="Tick" />
							</TickImage>
							<Title>Successfully Registered!</Title>
						</Left>

						<Close onClick={() => setSuccessModal(false)}>
							<img src={closeImage} alt="Close" />
						</Close>
					</TitleSection>
					<Container>
						<InputDescription>
							You have successfully registered for
							School Scientist!
						</InputDescription>
					</Container>
					<Button onClick={() => setSuccessModal(false)}>
						Close
					</Button>
					<SubButton
						onClick={() =>
							history.push("/school-scientist")
						}
					>
						<p> Visit School Scientist</p>
					</SubButton>
				</Modal>
			</BackContainer>
		</>
	);
}

export default SuccessModal;

const SubButton = styled.div`
	p {
		color: #034086;
		font-size: 14px;
		cursor: pointer;
		font-family: "gordita_medium";
		text-decoration: underline;
		@media (max-width: 480px) {
			font-size: 13px;
		}
	}
`;
const P = styled.p`
	color: black;
	font-size: 16px;
	text-align: right;
`;
const BackContainer = styled.div`
	position: fixed;
	transition: all 0.3s ease;
	transform: scale(0, 0);
	width: 100%;
	height: 100vh;
	z-index: 10000;
	left: 0;
	top: 0px;
	backdrop-filter: blur(4px);

	&.active {
		transform: scale(1);
	}
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
const InputDescription = styled.p`
	margin-bottom: 20px;

	width: 100%;
	display: flex;
	align-self: baseline;
	font-size: 16px;
	color: #333333;
	span {
		color: green;
	}
	p {
	}
	@media (max-width: 560px) {
		width: 100%;
	}
`;

const OtpInput = styled.input`
	border: 2px solid #e6e6e6;
	border-radius: 10px !important;
	font-size: 16px;
	width: 100%;
	height: 100%;
	padding: 15px;
	margin-bottom: 15px;
`;
const Close = styled.span`
	width: 15px;
	display: block;
	cursor: pointer;
	margin-left: auto;
	margin-right: 0;
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
	position: relative;
`;
const Button = styled.span`
	margin: 0px 0px 0px auto;
	font-size: 16px;
	background-color: #02529c;
	padding: 5px 20px;
	border-radius: 5px;
	cursor: pointer;
	font-family: "gordita_medium";
	border: 1px solid #15bf81;
	color: #fff;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100px;

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
const ErrorMessage = styled.p`
	color: red;
	font-size: 12px;
	text-align: right;
	opacity: 1;
	margin-bottom: 10px;

	/* &.error-active {
        opacity: 1;
    } */
`;
const TimerMainContainer = styled.div``;
const TimerContainer = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
`;
const SendIcon = styled.span`
	font-size: 14px;
	margin-right: 5px;
	transform: translateY(-2px);
	-webkit-text-stroke-width: 0.02em;
	&.loader {
		animation: rotate 2s infinite linear reverse;
	}
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@media all and (max-width: 480px) {
		transform: translateY(-1px);
		margin-right: 3px;
	}
`;
const Resend = styled.p`
	font-size: 14px;
	font-family: "gordita_regular" !important;
	text-align: right;
	cursor: pointer;

	& b {
		color: #4ca473;
	}
	@media all and (max-width: 360px) {
		font-size: 12px;
	}
`;
const Resending = styled.p`
	font-size: 14px;
	font-family: "gordita_regular" !important;
	text-align: right;
	& p {
		font-size: 14px;
		display: inline-block;
		color: #0fa679;
		font-family: "gordita_regular" !important;
	}
	@media all and (max-width: 360px) {
		font-size: 12px;
	}
`;
const Left = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;
const TickImage = styled.div`
	width: 15%;
	margin-right: 10px;

	img {
		width: 100%;
		display: block;
	}
`;
