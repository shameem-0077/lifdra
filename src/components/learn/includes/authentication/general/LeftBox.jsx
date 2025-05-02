import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

export default function LeftBox() {
	return (
		<Container>
			<Logo>
				<Link to="/">
					<LogoImage
						src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/logo-vertical-white.png"
						alt="steyp-logo"
					/>
				</Link>
			</Logo>
			<Bottom>
				<Text className="b-medium">
					World of Industry 4.0
				</Text>
				<Para>
					Take your first step to the future with Talrop
				</Para>
				{/* <Button className="b-regular">
                    <Icon
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/play.svg"
                    />
                    Watch the demo
                </Button> */}
			</Bottom>
		</Container>
	);
}

const Container = styled.div`
	background: linear-gradient(
			0deg,
			rgba(31, 41, 52, 0.6),
			rgba(31, 41, 52, 0.9)
		),
		url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/cover.jpg");
	width: 60%;
	background-size: cover;
	background-position: center;
	padding: 82px 82px 115px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	@media (max-width: 1100px) {
		padding: 82px 64px 110px;
	}
	@media (max-width: 1100px) {
		padding: 82px 45px 93px;
		width: 55%;
	}
	@media (max-width: 768px) {
		width: fit-content;
	}
	@media (max-width: 640px) {
		display: none;
	}
`;
const Logo = styled.h1`
	width: 78px;
`;
const LogoImage = styled.img`
	display: block;
	width: 100%;
`;
const Bottom = styled.div``;
const Text = styled.h3`
	font-size: 50px;
	line-height: 1.3em;
	color: #fff;
	font-family: "gordita_medium";
	font-weight: 500;
	@media (max-width: 1100px) {
		font-size: 38px;
	}
	@media (max-width: 980px) {
		font-size: 28px;
	}
	@media (max-width: 640px) {
		display: none;
	}
`;
const Para = styled.span`
	font-family: "gordita_medium";
	color: #fff;
	font-size: 20px;
`;
const Button = styled(Link)`
	background: #fff;
	font-family: "Baloo Paaji 2", cursive;
	color: #47ca75;
	display: inline-flex;
	align-items: center;
	padding: 10px 27px;
	border-radius: 5px;
	font-size: 16px;
	margin-top: 30px;
	@media (max-width: 768px) {
		display: none;
	}
`;
const Icon = styled.img`
	display: block;
	width: 20px;
	margin-right: 7px;
`;
