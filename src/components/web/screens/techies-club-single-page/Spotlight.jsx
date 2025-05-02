import React from "react";
import styled from "styled-components";
import bggradient from "../../../../assets/images/web/color.png";
import orangeLine from "../../../../assets/images/web/techiesClub/line.svg";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function Spotlight({ title, type, description, extra, addon }) {
	const { user_profile } = useSelector((state) => state);
	const location = useLocation();
	return (
		<Container>
			<ContentSection className="wrapper">
				<Title>{title}</Title>
				<Description>
					{description}
					<span type={type}>
						{type === "School"
							? "school students"
							: type === "College"
							? "college students"
							: type === "Graduates"
							? "graduates or dropout"
							: null}
					</span>
					{addon}
					<small>{extra && extra}</small>
				</Description>
				<Button
					to={
						user_profile.user_id
							? "/feed/"
							: `${location.pathname}?action=login&next=/dashboard`
					}
				>
					Go to dashboard{" "}
					<span>
						<img
							src={require("../../../../assets/images/web/right-side.svg")}
							alt=""
						/>
					</span>
				</Button>
			</ContentSection>
			<ImageSection>
				<Background
					src={require("../../../../assets/images/web/techiesClub/background.png")}
				/>
				<ImageContainer className="wrapper">
					<img
						src={
							type === "School"
								? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/06-05-2022/bg-image.png"
								: type === "College"
								? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/techies-hub.png"
								: type === "Graduates"
								? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/tech-degree.png"
								: null
						}
					/>
				</ImageContainer>
			</ImageSection>
		</Container>
	);
}

export default Spotlight;
const Container = styled.div`
	padding-top: 130px;
	@media all and (max-width: 980px) {
		padding-top: 100px;
	}
	@media all and (max-width: 768px) {
		padding-top: 80px;
	}
	@media all and (max-width: 640px) {
		padding-top: 70px;
	}
	@media all and (max-width: 480px) {
		padding-top: 50px;
	}
	@media all and (max-width: 360px) {
		padding-top: 40px;
	}
`;
const ContentSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Title = styled.h1`
	font-size: 44px;
	text-align: center;
	font-family: gordita_medium;
	color: #212121;
	position: relative;
	&::before {
		content: "";
		position: absolute;
		top: -80px;
		left: -170px;
		width: 300px;
		height: 300px;
		background: url(${bggradient}) no-repeat;
		background-size: contain;
		display: block;
		z-index: -1;
	}
	@media all and (max-width: 1280px) {
		font-size: 40px;
	}
	@media all and (max-width: 1280px) {
	}
	@media all and (max-width: 980px) {
		font-size: 38px;
	}
	@media all and (max-width: 768px) {
		font-size: 36px;
	}
	@media all and (max-width: 640px) {
		font-size: 34px;
	}
	@media all and (max-width: 480px) {
		font-size: 32px;
	}
	@media all and (max-width: 360px) {
		font-size: 30px;
	}
`;
const Description = styled.p`
	text-align: center;
	font-size: 18px;
	font-family: gordita_medium;
	color: #545454;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: center;
	margin: 10px 0 25px 0;
	max-width: 82%;
	small {
		display: inline-block;
		align-items: center;
		font-size: 17px;
		margin-left: 4px;

		font-family: gordita_regular;
		color: #545454;
		transform: translateY(2px) !important;
	}
	span {
		font-family: gordita_bold;
		position: relative;
		color: #666666;
		/* transform: translateY(1px); */
		display: inline-block;
		margin: 0 5px;

		&::before {
			content: "";
			position: absolute;
			top: 20px;
			right: 0;
			width: 100%;
			height: 20px;
			background: url(${orangeLine}) no-repeat;
			background-size: contain;
			display: block;
			z-index: -1;
		}

		@media all and (max-width: 640px) {
			display: inline-block;
			text-align: center;
			&::before {
				top: 18px;
			}
		}
	}
	@media all and (max-width: 980px) {
		font-size: 18px;
	}
	@media all and (max-width: 768px) {
		font-size: 16px;
		small {
			font-size: 16px;
		}
	}
	@media all and (max-width: 640px) {
		font-size: 15px;
		margin: 10px 0 20px 0;
		display: block;
		small {
			font-size: 15px;
		}
	}
	@media all and (max-width: 480px) {
		font-size: 14px;
		small {
			font-size: 14px;
			display: block;
		}
	}
	@media all and (max-width: 380px) {
		small {
			display: inline-block;
		}
	}
	@media all and (max-width: 360px) {
		font-size: 13px;
		small {
			font-size: 13px;
		}
	}
`;
const Button = styled(Link)`
	background-color: #0fa76f;
	font-size: 16px;
	color: #ffffff;
	font-family: gordita_medium;
	height: 50px;
	width: 190px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	margin-bottom: 30px;
	transition: all 0.4s ease;
	span {
		width: 0;
		display: block;
		transition: all 0.4s ease;
		img {
			display: block;
			width: 100%;
			transition: all 0.4s ease;
		}
	}
	&:hover {
		width: 220px;
		span {
			width: 20px;
			margin-left: 10px;
		}
	}
	/* transition: all 0.4s ease;
    &:hover {
        width: 220px;
    } */

	@media all and (max-width: 980px) {
		height: 50px;
		width: 250px;
	}
	@media all and (max-width: 768px) {
	}
	@media all and (max-width: 640px) {
		height: 40px;
		width: 200px;
	}
	@media all and (max-width: 480px) {
		/* margin: 30px auto 0; */
		font-size: 14px;
	}
`;
const ImageSection = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	margin-top: 25px;
	img {
		width: 78%;
	}
`;
const Background = styled.img`
	position: absolute;
	top: -120px;
	width: 100% !important;
	max-width: 1440px !important;
	/* zoom: 9; */
	z-index: -5;
	object-fit: cover;
`;
const ImageContainer = styled.div`
	width: 100% !important;
	position: relative;
	display: flex;
	justify-content: center;
`;
