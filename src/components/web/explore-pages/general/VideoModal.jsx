import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import styled, { keyframes } from "styled-components";
import $ from "jquery";
import VideoPlayer from "../../../applications/video-player/src/VideoPlayer";

function VideoModal({ isModal, setModal, videoThumnail, videoUrl }) {
	const videoJsOptions = {
		autoplay: true,
		controls: true,
		sources: [
			{
				src: "https://storage.googleapis.com/coverr-main/mp4%2Fcoverr-an-early-morning-1579770136327.mp4",
				type: "video/mp4",
			},
		],
	};
	useEffect(() => {
		if (isModal) {
			$("html").addClass("modal-enabled");
		} else {
			$("html").removeClass("modal-enabled");
		}
	}, [isModal]);
	return (
		isModal && (
			<BackContainer id="invite-video">
				<Overlay onClick={() => setModal(false)}></Overlay>
				<VideoModalContainer>
					<Video className="player-wrapper">
						{/* <ReactPlayer
                            className="react-player"
                            url={videoUrl}
                            playing={true}
                            controls={true}
                            width="100%"
                            height="100%"
                        /> */}
						<VideoPlayer
							source={videoUrl}
							cover={videoThumnail}
							{...videoJsOptions}
						/>
					</Video>
					<CloseIconContainer
						onClick={() => setModal(false)}
					>
						<CloseIcon
							src={
								"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-10-2021/close.svg"
							}
							alt=""
						/>
					</CloseIconContainer>
				</VideoModalContainer>
			</BackContainer>
		)
	);
}

export default VideoModal;
const videoAnimation = keyframes`
 0% { transform:scale(0,0); opacity:0; }
 100% { transform:scale(1,1); opacity:1; }
`;
const BackContainer = styled.div`
	position: fixed;
	transition: 0.3s;
	width: 100%;
	height: 100vh;
	z-index: 1000;
	left: 0;
	top: 0;
	animation-name: ${videoAnimation};
	animation-duration: 0.3s;
`;
const Overlay = styled.div`
	background-color: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100vh;
`;

const VideoModalContainer = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	border-radius: 9px;
	background-color: #000;
	width: 70%;

	@media (max-width: 480px) {
		width: 97%;
	}
`;
const Video = styled.div`
	position: relative;
`;
const CloseIcon = styled.img`
	display: block;
	width: 100%;
`;
const CloseIconContainer = styled.div`
	position: absolute;
	top: 0;
	right: -35px;
	width: 25px;
	cursor: pointer;
	@media (max-width: 640px) {
		right: -30px;
		width: 22px;
	}
	@media (max-width: 480px) {
		right: 0;
		top: -28px;
		width: 20px;
	}
`;
const VideoDetail = styled.div`
	margin-top: 5px;
	padding: 15px 15px 25px 15px;
	justify-content: space-between;
	@media (max-width: 480px) {
		padding: 7px 14px;
	}
`;
const VideoTitle = styled.h2`
	font-family: "gordita_medium";
	font-size: 14px;
	@media (max-width: 640px) {
		font-size: 13px;
	}
`;
const VideoNumbers = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 15px;
`;
const VideoLikes = styled.div`
	display: flex;
	align-items: center;
	margin-right: 10px;
`;
const LikeImg = styled.img`
	display: block;
	width: 20px;
	transform: translate(0px, -1px);
	@media (max-width: 480px) {
		width: 15px;
	}
	@media (max-width: 360px) {
		width: 10px;
		transform: translate(0px, 0px);
	}
`;
const LikeNum = styled.span`
	margin-left: 10px;
	@media (max-width: 480px) {
		font-size: 14px;
	}
	@media (max-width: 360px) {
		font-size: 13px;
	}
`;
const VideoViews = styled.div`
	display: flex;
	align-items: center;
`;
const ViewImg = styled.img`
	display: block;
	width: 25px;
	transform: translate(0px, -1px);
	@media (max-width: 480px) {
		width: 20px;
	}
	@media (max-width: 360px) {
		width: 15px;
		transform: translate(0px, 0px);
	}
`;
const ViewNum = styled.span`
	margin-left: 10px;
	@media (max-width: 480px) {
		font-size: 14px;
	}
	@media (max-width: 360px) {
		font-size: 13px;
	}
`;
