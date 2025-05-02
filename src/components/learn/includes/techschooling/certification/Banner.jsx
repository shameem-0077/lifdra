import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { learnConfig } from "../../../../../axiosConfig";
import { useSelector } from "react-redux";
import styled from "styled-components";
import bg from "../../../../../assets/images/certificate/bg-image.svg";
import CertificateModal from "./CertificateModal";

const Banner = ({ subject_slug }) => {
	return (
		<Container>
			<MainContainer className="anim-fade">
				<LeftImage>
					<Image
						src={require("../../../../../assets/images/certificate/man.svg")}
						alt="Image"
					/>
				</LeftImage>
				{/* <RigthContainer> */}

				<ContentContainer>
					<Title>Congratulations!</Title>
					<Para>
						You have completed your course. Now you can
						apply for a certificate.
					</Para>
					<Button to={`/nanodegree/${subject_slug}/certification/`}>
						Get Certificate
					</Button>
				</ContentContainer>
				<RightImage>
					<Img
						src={require("../../../../../assets/images/certificate/right.svg")}
						alt="Image"
					/>
				</RightImage>
				{/* </RigthContainer> */}
			</MainContainer>
		</Container>
	);
};

export default Banner;

const Container = styled.div``;
const MainContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-image: url(${bg});
	background-repeat: no-repeat;
	background-size: cover;
	height: 240px;
	padding: 0 4%;
	margin: 20px 0 40px 0;
	border-radius: 5px;
	@media (max-width: 1200px) {
		height: 230px;
		padding: 0 1%;
	}
	@media (max-width: 1080px) {
		height: 210px;
	}
	@media (max-width: 980px) {
		height: unset;
		padding: 20px 1%;
	}
	@media (max-width: 768px) {
		padding: 20px;
	}
`;

const LeftImage = styled.div`
	/* width: 260px; */
	height: 110%;
	margin-top: -25px;
	@media (max-width: 980px) {
		height: auto;
		margin-top: unset;
		margin-bottom: -20px;
		width: 20%;
	}
	@media (max-width: 768px) {
		display: none;
	}
`;
const Image = styled.img`
	width: 100%;
	height: 100%;
	display: block;
	object-fit: contain;
`;
const RigthContainer = styled.div`
	width: calc(100% - 240px);
	padding-left: 15%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const ContentContainer = styled.div`
	text-align: center;
	/* width: 390px; */
	width: 30%;
	@media (max-width: 1200px) {
		width: 35%;
	}
	@media (max-width: 980px) {
		width: 40%;
	}
	@media (max-width: 840px) {
		width: 45%;
	}
	@media (max-width: 768px) {
		text-align: left;
		width: 50%;
	}
	@media (max-width: 640px) {
		text-align: left;
		width: 60%;
	}
	@media (max-width: 480px) {
		text-align: center;
		width: 80%;
		margin: 0 auto;
	}
	@media (max-width: 380px) {
		text-align: center;
		width: 100%;
		margin: 0 auto;
	}
`;
const Title = styled.h3`
	color: #4a7aee;
	font-size: 26px;
	font-family: "baloo_paaji_2semibold";
	@media (max-width: 980px) {
		font-size: 23px;
	}
	@media (max-width: 640px) {
		font-size: 22px;
	}
	@media (max-width: 480px) {
		font-size: 20px;
	}
	@media (max-width: 380px) {
		font-size: 18px;
	}
`;
const Para = styled.p`
	color: #393838;
	margin: 5px 0 20px;
	font-size: 16px;
	@media (max-width: 640px) {
		font-size: 15px;
	}
	@media (max-width: 380px) {
		font-size: 14px;
	}
`;
const Button = styled(Link)`
	color: #fff;
	padding: 10px 60px;
	background-color: #4a7aee;
	display: inline-block;
	border-radius: 5px;
	cursor: pointer;
	font-family: "gordita_medium";
	font-size: 16px;
	@media (max-width: 640px) {
		font-size: 15px;
		padding: 8px 40px;
	}
	@media (max-width: 380px) {
		font-size: 14px;
	}
`;
const RightImage = styled.div`
	height: 100%;
	@media (max-width: 980px) {
		width: 20%;
		margin-bottom: -20px;
	}
	@media (max-width: 768px) {
		width: 25%;
	}
	@media (max-width: 480px) {
		display: none;
	}
`;
const Img = styled.img`
	width: 100%;
	height: 100%;
	display: block;
	object-fit: contain;
`;
