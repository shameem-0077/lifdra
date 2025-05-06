import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import TalropEdtechHelmet from "../helpers/TalropEdtechHelmet";

function Error500() {
	const navigate = useNavigate();
	return (
		<>
			<TalropEdtechHelmet title="Internal Server Error" />
			<Container>
				<ErrorImage>
					<Image
						// src={require("../../assets/images/error-500.svg")}
						src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/error-500.svg
                        "
						alt="Error 500"
					/>
				</ErrorImage>

				<ErrorContents>
					<Title>Internal Server Error</Title>
					<Description>
						<Text>Sorry , Something went wrong</Text>
						<Smiley> : (</Smiley>
					</Description>

					<Button
						onClick={() => {
							navigate(-1);
						}}
					>
						Go Back
					</Button>
				</ErrorContents>
			</Container>
		</>
	);
}

export default Error500;

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const ErrorImage = styled.div`
	width: 25%;
	@media (max-width: 1440px) {
		width: 29%;
	}
	@media (max-width: 1280px) {
		width: 31%;
	}
	@media (max-width: 1130px) {
		width: 33%;
	}
	@media (max-width: 880px) {
		width: 37%;
	}
	@media (max-width: 640px) {
		width: 41%;
	}
	@media (max-width: 560px) {
		width: 45%;
	}
	@media (max-width: 480px) {
		width: 50%;
	}
	@media (max-width: 420px) {
		width: 55%;
	}
	@media (max-width: 360px) {
		width: 60%;
	}
`;
const Image = styled.img`
	display: block;
	width: 100%;
`;
const Title = styled.h3`
	font-size: 26px;
	font-family: "baloo_paaji_2semibold";
	text-transform: capitalize;
	color: #373737;
	@media (max-width: 480px) {
		font-size: 23px;
	}
`;
const Description = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 30px;
`;
const Smiley = styled.p`
	font-size: 23px;
	font-family: "baloo_paaji_2semibold";
	margin-left: 7px;
`;
const Text = styled.p`
	color: #373737;
	font-size: 15px;
	text-align: center;

	@media (max-width: 480px) {
		font-size: 14px;
	}
`;
const Button = styled(Link)`
	background-color: #0fa76f;
	color: #fff;
	padding: 10px 30px;
	border-radius: 6px;
	font-size: 15px;
	font-family: "gordita_medium";
`;
const ErrorContents = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	transform: translate(0px, -50px);
	@media (max-width: 1280px) {
		transform: translate(0px, -30px);
	}
	@media (max-width: 980px) {
		transform: translate(0px, -25px);
	}
`;
