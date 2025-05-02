import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

export default function YTModal({
	is_active,
	setModalActive,
	videoUrl,
}) {
	return (
		is_active && (
			<Container>
				<Box>
					<CloseIconContainer
						onClick={() => setModalActive(false)}
					>
						<CloseIcon className="las la-times"></CloseIcon>
					</CloseIconContainer>
					<div className="player-wrapper">
						<ReactPlayer
							className="react-player"
							url={videoUrl}
							playing="true"
							controls="true"
							width="100%"
							height="100%"
						/>
					</div>
				</Box>
			</Container>
		)
	);
}

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100%;
	background: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 4000;
`;

const Box = styled.div`
	position: relative;
	width: 43%;
	background: #fff;
	transform: scale(1);
	animation: scale 0.2s ease;
	@keyframes scale {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@media all and (max-width: 1550px) {
		width: 52%;
	}
	@media all and (max-width: 1280px) {
		width: 61%;
	}
	@media all and (max-width: 980px) {
		width: 78%;
	}
	@media all and (max-width: 768px) {
		width: 80%;
	}
	@media all and (max-width: 640px) {
		width: 90%;
	}
`;
const CloseIconContainer = styled.div`
	cursor: pointer;
	position: absolute;
	top: -28px;
	right: 0;
	border: 1px solid #e49c28;
	display: flex;
	align-items: center;
	padding: 2px;
	border-radius: 50%;
	background: rgba(0, 0, 0, 0.6);
	overflow: hidden;
`;
const CloseIcon = styled.i`
	color: #e49c28;
	display: block;
	width: 100%;
	font-size: 18px;
`;
const BoxBottom = styled.div`
	padding: 35px;
	@media all and (max-width: 480px) {
		padding: 25px;
	}
	@media all and (max-width: 360px) {
		padding: 11px;
	}
`;

const MainHead = styled.div`
	margin-bottom: 4px;
`;
const FieldHead = styled.h3`
	color: #000;
	font-size: 17px;
`;
const FieldHeadSection = styled.h3`
	color: #000;
	font-size: 24px;
	font-family: "gordita_medium";
	@media all and (max-width: 480px) {
		font-size: 21px;
	}
	@media all and (max-width: 360px) {
		font-size: 20px;
	}
`;
const MainContent = styled.p`
	font-size: 16px;
	font-family: "baloo_paaji_2regular";
	@media all and (max-width: 480px) {
		font-size: 13px;
		width: 100%;
	}
`;
const CoinSpan = styled.span`
	display: flex;
	align-items: center;
	font-size: 17px;
	font-family: "baloo_paaji_2semibold";
	margin: 10px 0;
	@media all and (max-width: 360px) {
		margin: 8px 0;
	}
`;
const CoinContentImg = styled.small`
	width: 17px;
	margin-right: 7px;
`;
const CoinContentPic = styled.img`
	display: block;
	width: 100%;
`;
const Bottom = styled.div`
	display: flex;
	align-items: center;
`;
const Enroll = styled(Link)`
	color: #fff;
	font-size: 19px;
	background-color: #31826c;
	padding: 5px 30px;
	border-radius: 5px;
	font-family: "gordita_medium";
	margin-right: 12px;
	@media all and (max-width: 480px) {
		font-size: 19px;
		padding: 4px 29px;
	}
	@media all and (max-width: 360px) {
		padding: 4px 19px;
	}
`;
const Message = styled.span`
	color: #44c790;
	font-size: 15px;
	font-family: "baloo_paaji_2semibold";
`;
