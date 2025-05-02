import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import VideoPlayer from "../../../../applications/video-player/src/VideoPlayer";
export default function EnrollPopup({
	is_active,
	setModalActive,
	isVideoOnlyModal,
	video_url,
	image,
}) {
	const [isFullScreen, setFullScreen] = useState(false);
	const [boxHeight, setBoxHeight] = useState(window.innerHeight);
	const videoJsOptions = {
		autoplay: true,
		controls: false,
		sources: [
			{
				src: "https://talroplearnvideos.s3.ap-south-1.amazonaws.com/videos/designations/34167af1-49ec-4330-92e0-eceb0aa06cf8/video.m3u8",
				type: "video/mp4",
			},
		],
	};

	const handleResize = () => {
		setBoxHeight(window.innerHeight);
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleFullScreen = () => {
		setFullScreen(!isFullScreen);
	};

	return (
		is_active && (
			// (isFullScreen ? (
			//     <FullContainer boxHeight={boxHeight}>
			//         <FullBox>
			//             <VideoPlayer
			//                 handleFullScreen={handleFullScreen}
			//                 {...videoJsOptions}
			//                 cover={image}
			//                 source={video_url}
			//             />
			//         </FullBox>{" "}
			//     </FullContainer>
			// ) : (
			<Container
				isFullScreen={isFullScreen}
				boxHeight={boxHeight}
			>
				<Box
					isFullScreen={isFullScreen}
					boxHeight={boxHeight}
				>
					{!isFullScreen && (
						<CloseIconContainer
							onClick={() => setModalActive(false)}
						>
							<CloseIcon className="las la-times"></CloseIcon>
						</CloseIconContainer>
					)}
					<VideoPlayer
						isModal={true}
						handleFullScreen={handleFullScreen}
						{...videoJsOptions}
						cover={image}
						source={video_url}
					/>
					{!isVideoOnlyModal && (
						<BoxBottom>
							<MainHead>
								<FieldHead>UI Engineering</FieldHead>
								<FieldHeadSection>
									Build an interactive Story App
								</FieldHeadSection>
							</MainHead>
							<MainContent>
								Lorem, ipsum dolor sit amet
								consectetur adipisicing elit. Velit
								aliquam dolores quidem odio libero
								dicta dolorum doloribus neque
								blanditiis repellat minus ullam
								repellendus, nesciunt quaerat
								voluptate sit soluta quo alias?
							</MainContent>
							<CoinSpan>
								<CoinContentImg>
									<CoinContentPic
										src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/coin.svg"
										alt="Image"
									/>
								</CoinContentImg>
								5 Coins
							</CoinSpan>
							<Bottom>
								<Enroll>Enroll</Enroll>
								<Message>
									*Free Coins Accepted
								</Message>
							</Bottom>
						</BoxBottom>
					)}
				</Box>
			</Container>
		)
		// ))
	);
}
const FullContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	height: ${(props) => props.boxHeight};
	width: 100%;
	background: rgba(0, 0, 0, 0.6);
	/* display: flex;
    align-items: center;
    justify-content: center; */
	z-index: 4000;
`;
const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(0, 0, 0, 0.6);
	display: ${(props) => (props.isFullScreen ? "block" : "flex")};
	align-items: ${(props) =>
		props.isFullScreen ? "unset" : "center"};
	justify-content: ${(props) =>
		props.isFullScreen ? "unset" : "center"};
	z-index: 4000;
`;

const Box = styled.div`
	position: relative;
	height: ${(props) =>
		props.isFullScreen ? props.boxHeight + "px" : "auto"};
	width: ${(props) => (props.isFullScreen ? "100%" : "43%")};
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
		width: ${(props) => (props.isFullScreen ? "100%" : "52%")};
	}
	@media all and (max-width: 1280px) {
		width: ${(props) => (props.isFullScreen ? "100%" : "61%")};
	}
	@media all and (max-width: 980px) {
		width: ${(props) => (props.isFullScreen ? "100%" : "78%")};
	}
	@media all and (max-width: 768px) {
		width: ${(props) => (props.isFullScreen ? "100%" : "80%")};
	}
	@media all and (max-width: 640px) {
		width: ${(props) => (props.isFullScreen ? "100%" : "90%")};
	}
`;
const FullBox = styled.div`
	height: 100%;
	width: 100%;
	transform: scale(1);
	animation: scale 0.2s ease;
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
