import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import loader from "../../../../../assets/lotties/modal/buttonloader.json";
import { Link, useParams, useNavigate } from "react-router-dom";
import { serverConfig } from "../../../../../axiosConfig";
import $ from "jquery";

function SubjectModal({
	isSubjectModal,
	setSubjectModal,
	selectedSubject,
	subject_slug,
}) {
	const [isButtonLoading, setButtonLoading] = useState(false);
	const { id } = useParams();
	const user_data = useSelector((state) => state.user_data);
	const navigate = useNavigate();

	const loaderdefaultOptions = {
		loop: true,
		autoplay: true,
		animationData: loader,
		rendererSettings: {},
	};

	const startNow = (e) => {
		setButtonLoading(true);
		let { access_token } = user_data;
		serverConfig
			.post(
				`/learn/start-subject/${selectedSubject.slug}/`,
				{},
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				}
			)
			.then((response) => {
				const { status_code, data } = response.data;
				if (status_code === 6000) {
					navigate(`/${selectedSubject.slug}/`);
					setButtonLoading(true);
				} else if (status_code === 6001) {
					setButtonLoading(false);
				}
			})
			.catch((error) => {
				setButtonLoading(false);
			});
	};
	useEffect(() => {
		$("videos").addClass("auto-play");
		return () => {
			$("videos").removeClass("auto-play");
		};
	}, []);
	return isSubjectModal ? (
		<BackContainer
			className="success-modal"
			// style={{ transform: isSubjectModal && "scale(1,1)" }}
		>
			<Overlay>
				<Modal>
					<VideoSection>
						<Video id="videos" className="player-wrapper">
							<ReactPlayer
								className="react-player"
								url={selectedSubject.video_url}
								playing={false}
								controls={true}
								light={true}
								width="100%"
								height="100%"
							/>
						</Video>
					</VideoSection>
					<Close onClick={() => setSubjectModal(false)}>
						<img
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/close-icon-gray.svg"
							alt=""
						/>
					</Close>
					<TitleSection>
						<Title> {selectedSubject.name}</Title>
					</TitleSection>
					<Container>
						<ModalDescription>
							{selectedSubject.description}
						</ModalDescription>
						<Button onClick={startNow} type="success">
							{!isButtonLoading ? (
								"Start Now"
							) : (
								<Lottie
									options={loaderdefaultOptions}
									height={29}
									width={100}
								/>
							)}
						</Button>
					</Container>
					<BottomLineOne></BottomLineOne>
					<BottomLineTwo></BottomLineTwo>
				</Modal>
			</Overlay>
		</BackContainer>
	) : (
		<></>
	);
}

export default SubjectModal;
const BackContainer = styled.div`
	position: fixed;
	transition: 0.3s;
	// transform: scale(0, 0);
	width: 100%;
	height: 100vh;
	z-index: 1000;
	left: 0;
	top: 0px;
	backdrop-filter: blur(4px);
`;
const Overlay = styled.div`
	position: fixed;
	left: 0;
	top: 0px;
	width: 100%;
	height: 100vh;
`;
const Modal = styled.div`
	width: 600px;
	overflow: hidden;
	margin: 0 auto;
	background-color: #fff;
	position: relative;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	position: absolute;
	padding: 40px;
	border-radius: 10px;
	transition: 0.5s;
	z-index: 101;
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	background-size: contain;
	background-repeat: no-repeat;
	max-width: 700px;
	@media (max-width: 980px) {
		max-width: 550px;
	}

	@media (max-width: 640px) {
		max-width: 500px;
	}
	@media (max-width: 540px) {
		max-width: 400px;
		padding: 35px;
	}
	@media (max-width: 480px) {
		max-width: 350px;
	}
	@media (max-width: 360px) {
		max-width: 300px;
	}
`;
const VideoSection = styled.div`
	width: 100%;
	margin: 0 auto;
	border-radius: 5px;
	overflow: hidden;
	margin-bottom: 20px;
`;
const Video = styled.div`
	width: 100%;
	position: relative;
	.react-player__shadow {
		width: 100px !important;
	}
	.react-player__play-icon {
		background: url(${"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/play-circle.svg"})
			no-repeat;

		background-size: 60%;
		background-position: center;
		width: 100px;
		height: 100px;
		border-style: none !important;
	}
`;

const ModalDescription = styled.p`
	font-size: 15px;
	color: #333333;
	margin-bottom: 20px;
	display: flex;
	align-self: baseline;
	@media (max-width: 560px) {
		width: 100%;
	}
`;
const Close = styled.span`
	display: block;
	width: 15px;
	cursor: pointer;
	position: absolute;
	top: 4%;
	right: 4%;
	img {
		display: block;
		width: 100%;
	}
`;
const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	width: 100%;
`;
const Button = styled(Link)`
	font-size: 16px;
	width: 104px;
	height: 41px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #15bf81;
	padding: 5px 15px;
	border-radius: 5px;
	cursor: pointer;
	font-family: "gordita_medium";
	border: 1px solid#15bf81;
	color: #fff;
	margin: 0 auto;

	@media (max-width: 340px) {
		font-size: 14px;
	}
`;
const BottomLineOne = styled.span`
	display: block;
	width: 100%;
	height: 6px;
	background-color: #459e7b;
	position: absolute;
	bottom: 0;
	left: 0;
`;
const BottomLineTwo = styled.span`
	display: block;
	width: 100%;
	height: 6px;
	background-color: #5ac78b;
	position: absolute;
	bottom: 5px;
	left: 0;
`;

const TitleSection = styled.div`
	margin-bottom: 10px;
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.h2`
	font-family: "gordita_medium";
	font-size: 20px;
	color: #000;
`;
