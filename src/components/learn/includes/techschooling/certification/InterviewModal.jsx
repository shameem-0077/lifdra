import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { serverConfig } from "../../../../../axiosConfig";
import ButtonLoader from "../../../../../assets/lotties/modal/buttonloader.json";
import SuccessTick from "../../../../../assets/lotties/modal/successtick.json";

import Lottie from "react-lottie";

function InterviewModal({
	isModal,
	setModal,
	designationPK,
	setIsApplied,
}) {
	const user_data = useSelector((state) => state.user_data);
	const [isError, setError] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [isApproved, setApproved] = useState(false);

	const lottieDefaultOptions = {
		loop: true,
		autoplay: true,
		animationData: ButtonLoader,
		rendererSettings: {},
	};
	const TickLottieDefaultOptions = {
		loop: false,
		autoplay: true,
		animationData: SuccessTick,
		rendererSettings: {},
	};

	const applyCertificate = () => {
		setLoading(true);
		setError(false);

		let { access_token } = user_data;
		serverConfig
			.post(
				`/certifications/apply-for-certification/${designationPK}/`,
				{},
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				}
			)
			.then((response) => {
				let { status_code, data } = response.data;
				if (status_code === 6000) {
					setLoading(false);
					setError(false);
					setIsApplied(true);
					setApproved(true);
					setTimeout(() => {
						setModal(false);
						setApproved(false);
					}, 3000);
				} else {
					setError(true);
					setLoading(false);
				}
			})
			.catch((error) => {
				setLoading(false);
				setError(true);
			});
	};

	return (
		isModal && (
			<MainContainer>
				<Overlay
					onClick={() => (setModal(false), setError(false))}
				></Overlay>
				{!isApproved ? (
					<ModalContainer className="anim-fade">
						<Top>
							<Head>Are you sure?</Head>
							<Close
								onClick={() => (
									setModal(false), setError(false)
								)}
							>
								<img
									src={require("../../../../../assets/images/certificate/closeBig.svg")}
									alt="Close"
								/>
							</Close>
						</Top>
						<Bottom>
							<BottomMessage>
								<Message>
									You will not be able to apply for
									improvement / revaluation once you
									apply for the certificate
								</Message>
								{isError && (
									<ErrorMessage>
										Something went wrong! Please
										try again
									</ErrorMessage>
								)}
							</BottomMessage>
							<BottomButtons>
								<Button
									className="cancel"
									onClick={() => (
										setModal(false),
										setError(false)
									)}
								>
									Cancel
								</Button>
								{!isLoading ? (
									<Button
										className="continue"
										onClick={() =>
											applyCertificate()
										}
									>
										{isError
											? "Retry"
											: "Continue"}
									</Button>
								) : (
									<Button className="continue">
										<Lottie
											options={
												lottieDefaultOptions
											}
											height={25}
											width={25}
										/>
									</Button>
								)}
							</BottomButtons>
						</Bottom>
					</ModalContainer>
				) : (
					<ModalContainer className="anim-fade">
						<SuccessLottieContainer>
							<Lottie
								options={TickLottieDefaultOptions}
								height={120}
								width={120}
							/>
							<SuccessLottieContent>
								Applied Successfully
							</SuccessLottieContent>
						</SuccessLottieContainer>
					</ModalContainer>
				)}
			</MainContainer>
		)
	);
}

export default InterviewModal;

const MainContainer = styled.div`
	position: fixed;
	transition: all ease 0.4s;
	width: 100%;
	height: 100vh;
	z-index: 1000;
	left: 0;
	top: 0;
	display: grid;
	place-items: center;
`;

const Overlay = styled.div`
	background-color: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100vh;
	cursor: pointer;
`;
const ModalContainer = styled.div`
	position: absolute;
	width: 600px;
	height: 340px;
	border-radius: 9px;
	background-color: #fff;
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-bottom: 7px solid #47a27f;
	@media (max-width: 1440px) {
		width: 530px;
		height: 300px;
	}
	@media (max-width: 980px) {
		width: 480px;
		height: 290px;
	}
	@media (max-width: 768px) {
		width: 460px;
	}
	@media (max-width: 640px) {
		width: 430px;
		height: 280px;
	}
	@media (max-width: 580px) {
		width: 410px;
		height: 270px;
	}
	@media (max-width: 480px) {
		width: 90%;
		/* height: 260px; */
		height: auto;
	}
`;

const Top = styled.div`
	padding: 25px 40px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #d3d3d3;
	@media (max-width: 640px) {
		padding: 20px 30px;
	}
	@media (max-width: 380px) {
		padding: 15px 25px;
	}
`;
const Head = styled.h6`
	font-size: 22px;
	font-family: "baloo_paaji_2semiBold";
	color: #3e3e3e;
	@media (max-width: 480px) {
		font-size: 19px;
	}
`;
const Close = styled.div`
	width: 16px;
	height: 16px;
	cursor: pointer;
	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	@media (max-width: 480px) {
		width: 15px;
		height: 15px;
	}
`;
const Bottom = styled.div`
	padding: 25px 40px;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	border-bottom: 7px solid #58c591;
	@media (max-width: 640px) {
		padding: 20px 30px;
	}
	@media (max-width: 380px) {
		padding: 15px 25px;
	}
`;
const BottomMessage = styled.div`
	font-size: 16px;
	font-family: "gordita_medium";
	color: #5f656a;
	@media (max-width: 980px) {
		font-size: 16px;
	}
	@media (max-width: 480px) {
		font-size: 15px;
	}
`;
const Message = styled.div``;
const ErrorMessage = styled.div`
	color: #c41f1f;
	margin-top: 5px;
	margin-bottom: 10px;
	@media (max-width: 350px) {
		font-size: 14px;
	}
`;
const BottomButtons = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	@media (max-width: 480px) {
		margin-top: 20px;
	}
`;
const Button = styled.div`
	width: 120px;
	padding: 6px 12px;
	text-align: center;
	margin-right: 15px;
	border-radius: 5px;
	font-family: "gordita_medium";
	cursor: pointer;
	vertical-align: middle;
	&.cancel {
		border: 1px solid #d3d3d3;
		background: #fff;
		color: #4a555e;
		&:hover {
			border: 1px solid #08bd80;
		}
	}
	&.continue {
		border: 1px solid #08bd80;
		background: #08bd80;
		color: #fff;
	}

	:last-child {
		margin-right: unset;
	}
	@media (max-width: 640px) {
		font-size: 15px;
		padding: 6px 12px;
	}
`;
const SuccessLottieContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 30px;
`;
const SuccessLottieContent = styled.div`
	font-size: 18px;
	font-family: "baloo_paaji_2semiBold";
	color: #47a27f;
	@media (max-width: 980px) {
		font-size: 17px;
	}
	@media (max-width: 480px) {
		font-size: 16px;
	}
`;
