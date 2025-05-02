import React, { useState } from "react";
import styled from "styled-components";
import { secondsTohm } from "../../../../helpers/functions";
import Banner from "../certification/Banner";
import Loader from "../general/loaders/Loader";
import VideoModal from "../general/VideoModal";

const ProfessionskillTop = ({ profession, loading, subject_slug }) => {
	const [is_active, setActive] = useState(false);

	const handleModal = () => {
		setActive((prevValve) => !prevValve);
	};

	return (
		<>
			<VideoModal
				profession={profession}
				video_url={
					profession.playlists && profession.playlists.auto.playlist
				}
				is_active={is_active}
				handleModal={handleModal}
			/>
			{loading ? (
				<LoaderContainer>
					<Loader />
				</LoaderContainer>
			) : (
				<>
					<TopContainer>
						<ContentContainer>
							<Title>
								What you need to know before you get started
								with {profession.name}
							</Title>
							<LabelContaner>
								<Label>
									<Icon className="sc-hgHYgh efxkHP las la-layer-group"></Icon>
									{profession.skills} Skills
								</Label>
								<Label>
									<Icon className="sc-hgHYgh efxkHP las la-stream"></Icon>
									{profession.lessons} Lessons
								</Label>
								<Label>
									<Icon className="sc-cLQEGU cMxqtu las la-play-circle"></Icon>
									{profession.topics} Videos
								</Label>
								<Label>
									<Icon className="sc-cLQEGU cMxqtu las la-clock"></Icon>
									{secondsTohm(profession.duration)}
								</Label>
							</LabelContaner>
							<Description>{profession.description}</Description>
						</ContentContainer>
						<VideoTopiCard onClick={handleModal}>
							<VideoContent image={profession.image}>
								<VideoCardBottom>
									<PlayButton>
										<Play className="las la-play-circle"></Play>
									</PlayButton>
								</VideoCardBottom>
							</VideoContent>
						</VideoTopiCard>
					</TopContainer>
					{profession.status === "completed" ? (
						<BannerContainer>
							<Banner subject_slug={subject_slug} />
						</BannerContainer>
					) : null}
				</>
			)}
		</>
	);
};

export default ProfessionskillTop;

const LoaderContainer = styled.div`
	min-height: 500px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;
const TopContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 30px;
	flex-wrap: wrap;
	align-items: center;
`;
const ContentContainer = styled.div`
	width: 60%;
	@media all and (max-width: 980px) {
		width: 100%;
		order: 2;
	}
`;

const Title = styled.h2`
	font-size: 22px;
	font-family: 'gordita_medium';
	max-width: 500px;
	margin-bottom: 22px;
	line-height: 34px;
	@media all and (max-width: 980px) {
		max-width: 100%;
		margin-top: 0;
	}
	@media all and (max-width: 480px) {
		font-size: 18px;
		margin-bottom: 15px;
		line-height: 25px;
	}
	@media all and (max-width: 360px) {
		font-size: 16px;
		line-height: 20px;
	}
`;
const LabelContaner = styled.div`
	width: 100%;
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	margin-bottom: 19px;
	flex-wrap: wrap;
	gap: 16px;
`;

const Label = styled.span`
	color: rgb(176, 190, 197);
	font-size: 14px;
	word-spacing: 2px;
	display: flex;
	align-items: center;
	font-family: 'gordita_regular';
	transform: translateY(-2px);
	@media all and (max-width: 768px) {
		/* font-size: 15px; */
	}
	@media all and (max-width: 640px) {
		font-size: 14px;
		width: 50%;
	}
`;
const Icon = styled.small`
	font-size: 24px;
	display: inline-block;
	/* margin-right: 16px; */
`;
const Description = styled.p`
	width: 90%;
	color: rgb(73, 86, 92);
	font-size: 16px;

	line-height: 1.6em;
	font-family: 'gordita_regular';
	/* color: #111; */
	@media all and (max-width: 980px) {
		width: 100%;
	}
	@media all and (max-width: 640px) {
		font-size: 14px;
		margin-top: 15px;
		margin-bottom: 0;
	}
`;
const VideoTopiCard = styled.div`
	margin-bottom: 25px;
	width: 40%;
	@media all and (max-width: 980px) {
		width: 100%;
	}
`;
const VideoContent = styled.div`
	background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)) 0% 0% /
			cover,
		url(${(props) => props.image}) center center/cover no-repeat;
	display: block;
	padding: 0.9375rem;
	border-radius: 0.625rem;
	color: rgb(255, 255, 255);
	position: relative;
	cursor: pointer;
`;
const VideoCardBottom = styled.div`
	margin-top: 13rem;
	@media all and (max-width: 540px) {
		margin-top: 10rem;
	}
	@media all and (max-width: 440px) {
		margin-top: 7rem;
	}
	@media all and (max-width: 360px) {
		margin-top: 5rem;
	}
`;
const PlayButton = styled.span`
	display: inline-block;
`;
const Play = styled.i`
	font-size: 80px;
`;
const BannerContainer = styled.div`
	/* padding: 10px 0 20px; */
`;
