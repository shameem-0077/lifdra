import React from "react";
import styled from "styled-components";

const StartExamBanner = ({
	description,
	onClick,
	title,
	buttonText,
}) => {
	return (
		<Waiting>
			<ContentBox>
				<Title>{title}</Title>
				<Paragraph>{description}</Paragraph>
				<ExamButton onClick={onClick}>
					{buttonText}
				</ExamButton>
			</ContentBox>
		</Waiting>
	);
};

export default StartExamBanner;

const Waiting = styled.div`
	background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/improvement-bg.svg");
	background-size: 100% 100%;
	background-repeat: no-repeat;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 60px;
	margin-top: 50px;
	width: 100%;
	@media all and (max-width: 1024px) {
		padding: 37px;
	}
	@media all and (max-width: 980px) {
	}
	@media all and (max-width: 640px) {
		padding: 1px 5px;
		background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/waiting-bg-2.png");
	}
`;
const ContentBox = styled.div`
	max-width: 450px;
	text-align: center;
	padding-top: 80px;
	@media all and (max-width: 768px) {
		max-width: 265px;
	}
	@media all and (max-width: 640px) {
		padding-top: 35px;
	}
	@media all and (max-width: 480px) {
		padding-top: 35px;
		max-width: 265px;
	}
`;
const Title = styled.h1`
	font-family: "gordita_medium";
	@media all and (max-width: 480px) {
		font-size: 25px;
	}
`;
const Paragraph = styled.p`
	font-size: 20px;
	@media all and (max-width: 1110px) {
		font-size: 16px;
	}
`;
const ExamButton = styled.span`
	background-color: #3383ff;
	box-shadow: 0px 0px 14px 0px #3383ff;
	font-family: "gordita_medium";
	padding: 12px 23px;
	display: inline-block;
	margin-top: 35px;
	border-radius: 7px;
	color: #fff;
	cursor: pointer;
	@media all and (max-width: 480px) {
		margin-top: 19px;
		padding: 5px 13px;
	}
`;
