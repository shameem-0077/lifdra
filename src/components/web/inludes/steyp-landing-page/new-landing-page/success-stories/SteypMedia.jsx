import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getDateStrWithoutReplace } from "../../../../../helpers/functions";
import SpotlightVideo from "../../../../screens/steyp-landing-page/sat/modal/SpotlightVideo";
function SteypMedia({ media }) {
	const location = useLocation();

	const [isModal, setModal] = useState(false);
	const [vedioTemp, setVedioTemp] = useState("");
	const [vedioUrl, setVedioUrl] = useState("");
	const truncatedText = (text) => {
		let newText = text.length > 90 ? text.slice(0, 90) + "..." : text;
		return newText;
	};

	const containerRef = useRef(null);

	const handleScroll = (scrollAmount) => {
		if (containerRef.current) {
			containerRef.current.scrollTo({
				left: containerRef.current.scrollLeft + scrollAmount,
				behavior: "smooth",
			});
		}
	};
	return (
		<>
			<SpotlightVideo
				isModal={isModal}
				setModal={setModal}
				videoUrl={vedioUrl}
				videoThumnail={vedioTemp}
				stories={true}
			/>
			<Container>
				<Main className="wrapper">
					<Head>
						<Cover>
							<Heading>Steyp in Media</Heading>
							<NavigateButton
								to={`${location.pathname}?action=phone`}
							>
								Start free trial
							</NavigateButton>
						</Cover>
						<Para>Steyp's events reported in the media.</Para>
					</Head>
					<Scroll ref={containerRef}>
						{media &&
							media.map((element) => (
								<Item
									href={element.post_url}
									target="_blank"
									key={element.id}
								>
									<Box>
										<Image>
											<img
												src={element.thumbnail}
												alt="Group"
											/>
										</Image>

										<PlayButton
											className={
												element.post_type === "blog" &&
												"active"
											}
										>
											<img
												src={
													"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/play-button.svg"
												}
												alt="Play"
											/>
										</PlayButton>
									</Box>
									<Content>
										<Mini>
											<Logo>
												<img
													src={element.media_logo}
													alt="News"
												/>
											</Logo>
											<span>
												{element.media_title} •{" "}
												{getDateStrWithoutReplace(
													element.date_added
												)}
											</span>
										</Mini>
										<Headline>{element.title}</Headline>
										<News>
											{truncatedText(element.description)}
										</News>
									</Content>
								</Item>
							))}
					</Scroll>
					<Arrow>
						<LeftArrow onClick={() => handleScroll(-275)}>
							<img
								src={
									"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/arrow-circle.svg"
								}
								alt=""
							/>
						</LeftArrow>
						<RightArrow onClick={() => handleScroll(275)}>
							<img
								src={
									"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/arrow-circle.svg"
								}
								alt=""
							/>
						</RightArrow>
					</Arrow>
				</Main>
			</Container>
		</>
	);
}

export default SteypMedia;
const Container = styled.div`
	padding: 90px 0;
	background-color: #ecfcf2;
	@media all and (max-width: 1080px) {
		padding: 80px 0;
	}
	@media all and (max-width: 980px) {
		padding: 70px 0;
	}
	@media all and (max-width: 768px) {
		padding: 60px 0;
	}
	@media all and (max-width: 640px) {
		padding: 50px 0;
	}
	@media all and (max-width: 480px) {
		padding: 40px 0;
	}
`;
const Head = styled.div``;
const Heading = styled.h3`
	color: #101828;
	font-family: gordita_medium;
	font-size: 32px;
	line-height: 40px;
	letter-spacing: -0.72px;
	margin-bottom: 14px;
	@media all and (max-width: 480px) {
		font-size: 21px;
		padding-right: 30px;
		margin-bottom: 0;
	}
	@media all and (max-width: 360px) {
		font-size: 20px;
		padding-right: 0px;
	}
`;

const Cover = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media all and (max-width: 980px) {
		margin-bottom: 20px;
	}
`;
const Para = styled.p`
	font-size: 16px;
	color: #475467;
	margin-bottom: 45px;
	@media all and (max-width: 640px) {
		width: 95%;
		margin-bottom: 24px;
	}
	@media all and (max-width: 480px) {
		font-size: 14px;
	}
	@media all and (max-width: 360px) {
		margin-bottom: 17px;
		width: 95%;
	}
`;

const Scroll = styled.div`
	display: flex;
	overflow-x: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;
const Item = styled.a`
	min-width: 24%;
	border-radius: 12px;
	border: 1px solid #eaecf0;
	background: #fff;
	cursor: pointer;
	overflow: hidden;
	margin-right: 28px;
	@media all and (max-width: 1300px) {
		margin-right: 18px;
		min-width: 36%;
	}
	@media all and (max-width: 1280px) {
		min-width: 30%;
	}
	@media all and (max-width: 1080px) {
		min-width: 36%;
	}
	@media all and (max-width: 980px) {
		min-width: 40%;
	}
	@media all and (max-width: 768px) {
		min-width: 52%;
		margin-right: 14px;
	}
	@media all and (max-width: 640px) {
		min-width: 65%;
	}
	@media all and (max-width: 480px) {
		min-width: 80%;
	}
	@media all and (max-width: 360px) {
		min-width: 100%;
	}
`;
const Box = styled.div`
	position: relative;
	margin-bottom: 24px;
`;
const Image = styled.div`
	height: 178px;
	img {
		width: 100%;
		display: block;
		object-fit: 100%;
		height: 100%;
	}
	
	@media all and (max-width: 480px) {
		height: 160px;
	}
`;

const Content = styled.div`
	padding: 0 24px 24px 24px;
	display: inline-block;
	font-size: 12px;

	span {
		color: #087443;
		font-family: "gordita_medium";
	}
`;
const Mini = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;
const Logo = styled.div`
	width: 30px;
	height: 18px;
	margin-right: 8px;
	display: inline-block;
	margin-bottom: 8px;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 100%;
		display: block;
	}
`;
const Main = styled.div`
	@media all and (max-width: 768px) {
	}
	@media all and (max-width: 768px) {
	}
`;
const Headline = styled.h3`
	color: #101828;
	font-size: 20px;
	font-family: gordita_medium;
	margin-bottom: 4px;
	@media all and (max-width: 480px) {
		font-size: 16px;
		
	}
`;
const News = styled.p`
	color: #475467;
	font-size: 14px;
`;
const Arrow = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	margin-top: 28px;
	@media all and (max-width: 480px) {
		margin-top: 18px;
	}
	img {
		width: 100%;
		display: block;
	}
`;
const LeftArrow = styled.div`
	cursor: pointer;
	margin-right: 26px;
	border: 1px solid #eaecf0;
	background: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(4px);
	padding: 14px;
	width: 56px;
	height: 56px;
	border-radius: 50%;
	@media all and (max-width: 1080px) {
		padding: 12px;
		width: 50px;
		height: 50px;
		margin-right: 23px;
	}
	@media all and (max-width: 768px) {
		padding: 10px;
		width: 45px;
		height: 45px;
		margin-right: 17px;
	}
	@media all and (max-width: 480px) {
		padding: 8px;
		width: 40px;
		height: 40px;
		margin-right: 8px;
	}

	img {
		width: 100%;
		display: block;
	}
`;
const RightArrow = styled.div`
	cursor: pointer;
	border: 1px solid #eaecf0;
	background: rgba(255, 255, 255, 0.9);
	transform: rotate(180deg);
	backdrop-filter: blur(4px);
	padding: 14px;
	width: 56px;
	height: 56px;
	border-radius: 50%;
	img {
		width: 100%;
		display: block;
	}
	@media all and (max-width: 1080px) {
		padding: 12px;
		width: 50px;
		height: 50px;
	}
	@media all and (max-width: 768px) {
		padding: 10px;
		width: 45px;
		height: 45px;
	}
	@media all and (max-width: 480px) {
		padding: 8px;
		width: 40px;
		height: 40px;
	}
`;
const NavigateButton = styled(Link)`
	display: inline-block;
	border-radius: 8px;
	border: 1px solid #099250;
	background: #099250;
	color: #fff;
	font-family: gordita_medium;
	padding: 11px 19px;
	cursor: pointer;
	font-size: 13px;
	box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
	@media all and (max-width: 480px) {
		padding: 8px 15px;
		font-size: 12px;
	}
	@media all and (max-width: 360px) {
		padding: 7px 13px;
		font-size: 11px;
	}
`;
const PlayButton = styled.div`
	position: absolute;
	bottom: 8%;
	left: 5%;
	width: 17%;
	&.active {
		display: none;
	}

	img {
		width: 100%;
		display: block;
	}
`;
