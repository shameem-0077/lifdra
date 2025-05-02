import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

function RenewBanner(props) {
	const user_profile = useSelector((state) => state.user_profile);
	const location = useLocation();

	return (
		<Container>
			<Left>
				<ImageContainer>
					<BannerImage
						src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/renewbanner/student.svg"
						alt=""
					/>
				</ImageContainer>
			</Left>
			<Right>
				<User>Hi, {user_profile.name}</User>
				<Content>
					നിങ്ങളുടെ സബ്സ്ക്രിപ്ഷൻ അവസാനിച്ചിരിക്കുകയാണ്.
					തുടർന്ന് പഠിക്കാൻ താല്പര്യം ഉണ്ടെങ്കിലും കൂടുതൽ
					ഡിസ്കസ് ചെയ്യുന്നതിനും ഈ whatsapp നമ്പറിൽ
					കോണ്ടാക്ട് ചെയ്യൂ{" "}
					<WaLink
						target="_blank"
						href="https://api.whatsapp.com/send?phone=919072021886"
					>
						+91 907 2021 886
					</WaLink>
				</Content>

				<RenewButton
					to={`${location.pathname}?action=subscribe`}
				>
					<Renew>Renew Now</Renew>
					<Button className="las la-arrow-right"></Button>
				</RenewButton>
			</Right>
			<Bg1
				src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/renewbanner/left.svg"
				alt=""
			/>
			<Bg2
				src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/renewbanner/right.svg"
				alt=""
			/>
		</Container>
	);
}

export default RenewBanner;

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-gap: 20px;
	padding: 40px 100px 40px 40px;
	background-color: #5783e4;
	border-radius: 10px;
	position: relative;
	@media all and (max-width: 980px) {
		grid-template-columns: 1fr;
	}
	@media all and (max-width: 640px) {
		padding: 30px;
	}
	@media all and (max-width: 440px) {
		padding: 20px;
	}
`;
const Left = styled.div``;
const Right = styled.div`
	position: relative;
	z-index: 9;
`;
const User = styled.h3`
	margin-bottom: 5px;
	font-size: 24px;
	color: #fff;
	font-family: "gordita_medium";
	@media all and (max-width: 640px) {
		font-size: 22px;
	}
	@media all and (max-width: 440px) {
		font-size: 18px;
	}
`;
const Content = styled.h3`
	font-family: "EGGIndulekhaUni";
	font-size: 26px;
	color: #fff;
	margin-bottom: 20px;
	line-height: 35px;
	@media all and (max-width: 640px) {
		font-size: 22px;
		line-height: 28px;
	}
	@media all and (max-width: 440px) {
		font-size: 18px;
	}
`;
const WaLink = styled.a`
	font-family: "EGGIndulekhaUni";
	font-size: 26px;
	color: #fff;
	text-decoration: underline;
`;
const RenewButton = styled(Link)`
	width: 250px;
	height: 45px;
	background-color: #fff;
	display: flex;
	align-items: center;
	border-radius: 22px;
	justify-content: space-between;
	cursor: pointer;
	@media all and (max-width: 440px) {
		width: 199px;
		height: 45px;
	}
`;
const Renew = styled.h3`
	flex: 1;
	text-align: center;
	font-family: "gordita_medium";
	font-size: 20px;
	color: #5a7be9;
	@media all and (max-width: 440px) {
		font-size: 19px;
	}
`;
const Button = styled.span`
	width: 40px;
	height: 40px;
	background-color: #5a7be9;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 28px;
	color: #fff;
	margin-right: 3px;
`;
const ImageContainer = styled.div`
	position: relative;
	height: 100%;
	@media all and (max-width: 980px) {
		position: absolute;
		width: 200px;
		height: unset;
		bottom: 10px;
		right: 10px;
	}
	@media all and (max-width: 640px) {
		opacity: 0.7;
	}
	@media all and (max-width: 440px) {
		display: none;
	}
`;
const BannerImage = styled.img`
	width: 100%;
	position: absolute;
	bottom: -40px;
	z-index: 8;
	max-width: 350px;
	@media all and (max-width: 980px) {
		bottom: 0;
	}
	@media all and (max-width: 640px) {
		width: 56%;
		right: 10px;
	}
`;
const Bg1 = styled.img`
	width: 200px;
	position: absolute;
	z-index: 5;
	top: 0px;
	left: 0px;
	@media all and (max-width: 980px) {
		width: 100px;
	}
	@media all and (max-width: 640px) {
		width: 57px;
	}
	@media all and (max-width: 440px) {
		width: 28px;
	}
`;
const Bg2 = styled.img`
	width: 200px;
	position: absolute;
	z-index: 5;
	bottom: 0px;
	right: 0px;
	@media all and (max-width: 980px) {
		width: 100px;
	}
	@media all and (max-width: 640px) {
		width: 57px;
	}
	@media all and (max-width: 440px) {
		width: 28px;
	}
`;
