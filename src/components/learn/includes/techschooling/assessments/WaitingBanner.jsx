import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const WaitingBanner = ({ description, link, title, buttonText }) => {
	return (
		<Waiting>
			<ContentBox>
				<Title>{title}</Title>
				<Paragraph>{description}</Paragraph>
				<Button to={link}>{buttonText}</Button>
			</ContentBox>
		</Waiting>
	);
};

export default WaitingBanner;

const Waiting = styled.div`
	background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/waiting-bg.png");
	background-size: cover;
	background-repeat: no-repeat;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 60px;
	width: 100%;
	@media all and (max-width: 1024px) {
		padding: 37px;
	}
	@media all and (max-width: 980px) {
		background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/waiting-bg-2.png");
	}
	@media all and (max-width: 640px) {
		padding: 1px 5px;
	}
`;
const ContentBox = styled.div`
	max-width: 450px;
	text-align: center;
	padding-top: 80px;
	@media all and (max-width: 640px) {
		max-width: 300px;
		padding-top: 35px;
	}
	@media all and (max-width: 480px) {
		padding-top: 35px;
	}
`;
const Title = styled.h1`
	font-size: 29px;
	font-family: "gordita_medium";
	margin-bottom: 4px;
	color: #facd03;
	@media all and (max-width: 480px) {
		font-size: 25px;
	}
`;
const Paragraph = styled.p`
	font-size: 19px;
	@media all and (max-width: 1110px) {
		font-size: 16px;
	}
`;
const Button = styled(Link)`
	background-color: #facd03;
	box-shadow: 0px 0px 14px 0px #facd03;
	font-family: "gordita_medium";
	padding: 11px 45px;
	font-size: 17px;
	display: inline-block;
	margin-top: 35px;
	border-radius: 7px;
	color: #fff;
	@media all and (max-width: 480px) {
		margin-top: 19px;
		padding: 5px 13px;
	}
`;
