import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import TalropEdtechHelmet from "../helpers/TalropEdtechHelmet";

function Error403() {
	const navigate = useNavigate();
	return (
		<>
			<TalropEdtechHelmet title="Page Forbidden" />
			<ErrorContainer>
				<ErrorImage>
					<ErrorImg
						// src={require("../../assets/images/error-403.svg")}
						src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/error-403.svg
                        "
						alt="Error 403"
					/>
				</ErrorImage>
				<ErrorContents>
					<ErrorTitle>forbidden error</ErrorTitle>
					<ErrorDescription>
						Lorem ipsum dolor sit amet consectetur nisi
						tenetur est animi nostrum hic exercitationem
						ad molestiae neque
					</ErrorDescription>
					<ErrorButton
						onClick={() => {
							navigate(-1);
						}}
					>
						Go Back
					</ErrorButton>
				</ErrorContents>
			</ErrorContainer>
		</>
	);
}

export default Error403;

const ErrorContainer = styled.div`
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
const ErrorImg = styled.img`
	display: block;
	width: 100%;
`;
const ErrorContents = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	transform: translate(0px, -75px);
	@media (max-width: 1280px) {
		transform: translate(0px, -35px);
	}
	@media (max-width: 980px) {
		transform: translate(0px, -30px);
	}
`;
const ErrorTitle = styled.h3`
	font-size: 26px;
	font-family: "baloo_paaji_2semibold";
	text-transform: capitalize;
	color: #373737;
	@media (max-width: 480px) {
		font-size: 23px;
	}
`;
const ErrorDescription = styled.p`
	margin: 5px 0 35px;
	color: #373737;
	font-size: 15px;
	max-width: 575px;
	text-align: center;
	@media (max-width: 640px) {
		max-width: 425px;
	}
	@media (max-width: 480px) {
		max-width: 90%;
		font-size: 14px;
	}
`;
const ErrorButton = styled(Link)`
	background-color: #0fa76f;
	color: #fff;
	padding: 10px 30px;
	border-radius: 6px;
	font-size: 15px;
	font-family: "gordita_medium";
`;
