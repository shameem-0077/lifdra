import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import successTick from "../../../../../../assets/images/job-desk/success-tick.svg";
import closeImage from "../../../../../../assets/images/job-desk/close.svg";
import { manageConfig } from "../../../../../../axiosConfig";
import RequestLoader from "../../../../../learn/includes/authentication/general/RequestLoader";

function ContactUsOptModal({
	isOtpModal,
	setOtpModal,
	selectedCountry,
	mobile,
	setMobile,
	setSuccessModal,
	setFormSuccessModal,
}) {
	const [isError, setError] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [otp, setOtp] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isResendSuccess, setResendSuccess] = useState(null);
	const [isResendLoading, setResendLoading] = useState(false);
	const [counter, setCounter] = useState(20);
	const [resend, setResend] = useState("");

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
		} else if (e.keyCode === 69) {
			e.preventDefault();
		}
	};
	const onChange = (e) => {
		const re = /^[0-9\b]+$/;
		if (e.target.value === "" || re.test(e.target.value)) {
			setOtp(e.target.value);
			setErrorMessage("");
		}
	};

	const renderSubmit = () => {
		setError(true);

		const formData = new FormData();

		formData.append("country", selectedCountry.web_code);
		formData.append("phone", mobile);
		formData.append("otp", otp);
		if (otp !== "") {
			setLoading(true);

			manageConfig
				.post(`web/verify/contact-enquiry/`, formData)
				.then((response) => {
					setLoading(false);
					const { StatusCode, data } = response.data;
					if (StatusCode === 6000) {
						setOtp("");
						setCounter(20);
						setOtpModal(false);
						setSuccessModal(true);
						setFormSuccessModal(true);
						setError(false);
						setErrorMessage("");
					} else {
						setErrorMessage(response.data.data.message);
						setError(true);
					}
				})
				.catch((error) => {
					setLoading(false);
				});
		} else {
			setError(true);
			setErrorMessage("This Field Is Required");
		}
	};

	const resendOtp = () => {
		const formData = new FormData();

		formData.append("country", selectedCountry.web_code);
		formData.append("phone", mobile);
		setLoading(true);

		manageConfig
			.post(`web/resend-otp/service-referral/`, formData)
			.then((response) => {
				setLoading(false);
				const { StatusCode, data } = response.data;
				if (StatusCode === 6000) {
					setError(false);
					setOtp("");
					setResend(data.message);
					setErrorMessage("");
				} else if (StatusCode === 6001) {
					setErrorMessage("Enter valid otp");
				}
			})
			.catch((error) => {
				setLoading(false);
			});
	};

	const Timer = ({
		resendOtp,
		isLoading,
		isResendSuccess,
		otpErrorMessage,
	}) => {
		useEffect(() => {
			isOtpModal &&
				counter > 0 &&
				setTimeout(() => setCounter(counter - 1), 1000);
		}, [counter]);

		return (
			<TimerMainContainer>
				{counter === 0 ? (
					<TimerContainer onClick={resendOtp}>
						{isResendSuccess ? (
							<SendIcon
								className="las la-check-circle"
								style={{
									color: isResendSuccess
										? "#5cc66a"
										: isResendSuccess === false
										? "#f44336"
										: "#000",
								}}
							></SendIcon>
						) : isResendSuccess === false ? (
							<SendIcon
								style={{ color: "#f44336" }}
								className="las la-exclamation-circle"
							></SendIcon>
						) : (
							<SendIcon
								className={`las la-undo-alt ${
									isLoading && "loader"
								}`}
							></SendIcon>
						)}

						<Resend
							className="b-medium"
							style={{
								color: isResendSuccess
									? "#5cc66a"
									: isResendSuccess === false
									? "#f44336"
									: "#000",
							}}
						>
							{isResendSuccess
								? "OTP Sent!"
								: isResendSuccess === false
								? "Resend OTP failed"
								: "Resend OTP"}
						</Resend>
					</TimerContainer>
				) : (
					<>
						<Resending className="b-medium">
							Resend verification code in{" "}
							<p>{counter}s</p>{" "}
						</Resending>
					</>
				)}
			</TimerMainContainer>
		);
	};
	return (
		<>
			<Overlay
				onClick={() => {
					setOtpModal(false);
					setErrorMessage("");
					setOtp("");
				}}
				className={isOtpModal ? "active" : ""}
			></Overlay>
			<BackContainer
				style={{ transform: isOtpModal && "scale(1,1)" }}
			>
				<Modal>
					<TitleSection>
						<ImageContainer>
							<img src={successTick} />
						</ImageContainer>
						<Title>Enter OTP</Title>
						<Close
							onClick={() => {
								setOtpModal(false);
								setErrorMessage("");
								setOtp("");
							}}
						>
							<img src={closeImage} alt="Close" />
						</Close>
					</TitleSection>
					<Container>
						<InputDescription>
							Enter the OTP sent to your mobile
						</InputDescription>
						<OtpInput
							type="text"
							placeholder="Enter OTP"
							onKeyDown={handleKeyDown}
							onChange={onChange}
							value={otp}
							maxLength="4"
						/>
						<Timer
							resendOtp={resendOtp}
							isResendLoading={isResendLoading}
							isResendSuccess={isResendSuccess}
						/>
						{/* {isError ? <p>hello world</p> : null} */}

						{/* <ErrorMessage
                            className={
                                isError
                                    ? "error-active"
                                    : errorMessage === ""
                                    ? ""
                                    : "error-active"
                            }
                        >
                            {isError
                                ? "Enter valid OTP"
                                : otp.length > 1
                                ? "This Field is Required"
                                : errorMessage !== ""
                                ? errorMessage
                                : ""}
                        </ErrorMessage> */}
						<ErrorMessage>
							{errorMessage && errorMessage}
						</ErrorMessage>
						{resend === "OTP sent successfully" ? (
							<P>{resend} </P>
						) : null}
						<Button onClick={renderSubmit}>
							{isLoading ? (
								<RequestLoader />
							) : (
								"Continue"
							)}
						</Button>
					</Container>
					<BottomLine></BottomLine>
				</Modal>
			</BackContainer>
		</>
	);
}

export default ContactUsOptModal;

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
	font-size: 16px;
	background-color: #15bf81;
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
