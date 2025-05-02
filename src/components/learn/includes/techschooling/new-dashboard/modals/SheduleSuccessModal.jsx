import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import animationData from "../../assets/lotties/modal/successtick.json";

export default function SheduleSuccessModal({
	isSuccess,
	setSuccess,
}) {
	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {},
	};
	return (
		<ModalContainer className={!isSuccess ? "active" : ""}>
			<Overlay></Overlay>
			<SucessModal>
				<SuccesCard>
					<SuccessIcon>
						<Lottie
							options={defaultOptions}
							height={"100%"}
							width={"100%"}
						/>
					</SuccessIcon>
					<SuccessTitle>Success</SuccessTitle>
					<SuccessLabel>Successfully created</SuccessLabel>
					<ContinueButton onClick={() => setSuccess(false)}>
						Continue
					</ContinueButton>
				</SuccesCard>
			</SucessModal>
		</ModalContainer>
	);
}
const ModalContainer = styled.div`
	position: fixed;
	left: 0;
	top: 0px;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(2px);
	transition: all 0.3s ease 0s;
	transform: scale(0);
	z-index: 1001;
	&.active {
		transform: scale(1);
	}
`;
const Overlay = styled.div`
	position: fixed;
	left: 0;
	top: 0px;
	width: 100%;
	height: 100vh;
	transition: all 0.3s ease 0s;
	z-index: 1002;
`;
const SucessModal = styled.div`
	width: 450px;
	max-height: 127vh;
	min-height: 200px;
	margin: 0 auto;
	background: #fff;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	position: absolute;
	border-radius: 10px;
	transition: 0.5s;
	z-index: 1003;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	@media all and (max-width: 480px) {
		width: 330px;
		min-height: 170px;
	}
	@media all and (max-width: 360px) {
		width: 300px;
	}
`;

const SuccesCard = styled.div`
	position: relative;
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	padding: 20px;
`;
const SuccessIcon = styled.div`
	width: 150px;
	height: 150px;
	border-radius: 50%;
	box-shadow: 0 16px 24px rgb(0 0 0 / 10%);
	margin: 0 auto;
	background-color: #fff;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	top: -80px;
	margin: 0 auto;
	@media all and (max-width: 480px) {
		width: 100px;
		height: 100px;
		top: -65px;
	}
`;
const SuccessTitle = styled.h3`
	text-align: center;
	font-size: 34px;
	/* font-family: "baloo_paaji_2semibold"; */
	font-family: gordita_medium;
	margin-top: 60px;
	width: 100%;
	@media all and (max-width: 480px) {
		font-size: 26px;
		margin-top: 30px;
	}
`;
const SuccessLabel = styled.p`
	font-size: 18px;
	text-align: center;
	/* font-family: "gordita_medium"; */
	font-family: gordita_medium;
	color: #3c4852;
	max-width: 350px;
	max-width: 420px;
	@media all and (max-width: 480px) {
		font-size: 16px;
	}
`;
const ContinueButton = styled.span`
	width: 100%;
	height: 50px;
	background-color: #4ba870;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	/* font-family: "baloo_paaji_2semibold"; */
	font-family: gordita_medium;
	margin-top: 30px;
	border-radius: 5px;
	font-size: 20px;
	cursor: pointer;
`;
