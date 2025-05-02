import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NextEmptyCard = ({ link, title, description }) => {
	const userSubscriptionType = useSelector(
		(state) => state.userSubscriptionType
	);

	const location = useLocation();

	return (
		<CardContanier className="anim-fade">
			<ImageContainer>
				<Image
					src={require("../../../../../assets/images/empty-page.svg")}
				/>
			</ImageContainer>
			<ContentContainer>
				<ContentTitle>{title}</ContentTitle>
				<Description>{description}</Description>
				{userSubscriptionType === "expired_subscription" ? (
					<RenewButton to={`${location.pathname}subscribe/`}>
						Renew Now
					</RenewButton>
				) : userSubscriptionType === "trial_end" ? (
					<RenewButton to={`${location.pathname}subscribe/`}>
						Subscribe
					</RenewButton>
				) : (
					<Button to={link}>Go to Dashboard</Button>
				)}
			</ContentContainer>
		</CardContanier>
	);
};

export default NextEmptyCard;
const CardContanier = styled.div`
	text-align: center;
	padding: 0 0 30px 0;
	border-radius: 5px;
	background: #f9f9fb;

	@media screen and (max-width: 480px) {
		margin: 15px 0;
		box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
		padding: 25px;
		/* padding-bottom: 35px; */
	}
	@media screen and (max-width: 360px) {
		padding: 18px;
		padding-bottom: 35px;
	} ;
`;
const ImageContainer = styled.div``;
const Image = styled.img`
	width: 100%;
	max-width: 300px;
`;
const ContentContainer = styled.div``;
const ContentTitle = styled.h3`
	font-size: 20px;
	font-family: gordita_medium;
	margin-bottom: 8px;
`;
const Description = styled.p`
	// font-size: 16px;
	// line-height: 20px;
	margin: 0 auto;
	margin-bottom: 15px;
	max-width: 80%;
	color: #747474;
	font-family: gordita_regular;
	font-size: 14px;
	@media (max-width: 600px) {
		max-width: 100%;
	}
`;
const Button = styled(Link)`
	display: inline-block;
	background-color: #0fa76f;
	font-family: gordita_medium;
	padding: 12px 25px;
	color: #fff;
	border-radius: 5px;
	font-size: 14px;
	@media all and (max-width: 480px) {
		font-size: 13px;
		padding: 7px 15px;
		border-radius: 7px;
	}
`;
const RenewButton = styled(Link)`
	display: inline-block;
	background-color: #0a81fb;
	font-family: gordita_medium;
	padding: 8px 25px;
	color: #fff;
	border-radius: 10px;
	font-size: 14px;
	@media all and (max-width: 480px) {
		font-size: 13px;
		padding: 7px 15px;
		border-radius: 7px;
	}
`;
