import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Slider from "react-slick";
import SpotlightVideo from "../../../../screens/steyp-landing-page/sat/modal/SpotlightVideo";

function StoriesSpotlight({ featured }) {
	// for location
	const location = useLocation();
	const [isModal, setModal] = useState(false);
	const [vedioTemp, setVedioTemp] = useState("");
	const [vedioUrl, setVedioUrl] = useState("");
	const [currentSlide, setCurrentSlide] = useState(0);

	// next and prev button
	let slider = useRef();
	const next = () => {
		slider.slickNext();
	};
	const previous = () => {
		slider.slickPrev();
	};
	// slider settings
	const settings = {
		dots: false,
		autoplay: false,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		afterChange: (current) => {
			setCurrentSlide(current);
		},
	};

	console.log(featured.lenght, "featured -->");

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
				<Slider
					ref={(c) => {
						slider = c;
					}}
					{...settings}
				>
					{featured.map((slide) => (
						<Div>
							<Top>
								<h3>{slide.title}</h3>
								<p>{slide.description}</p>
								<ButtonCover>
									<ButtonSign
										to={`${location.pathname}?action=phone`}
									>
										Sign up
									</ButtonSign>
									<ButtonPlay
										onClick={() => {
											setVedioUrl(slide.post_url);
											setVedioTemp(slide.thumbnail);
											setModal(true);
										}}
									>
										<div>
											<img
												src={
													"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/play-button-new.svg"
												}
												alt="Vedio Play"
											/>
										</div>
										<span> Play now</span>
									</ButtonPlay>
								</ButtonCover>
							</Top>
							<Bottom>
								<VedioContainer>
									<VedioImage>
										<img src={slide.thumbnail} alt="" />
									</VedioImage>

									<PlayButton
										onClick={() => {
											setVedioUrl(slide.post_url);
											setVedioTemp(slide.thumbnail);
											setModal(true);
										}}
									>
										<img
											src={
												"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/button-new.svg"
											}
											alt="Play"
										/>
									</PlayButton>
								</VedioContainer>
							</Bottom>
						</Div>
					))}
				</Slider>
				<Arrow>
					<LeftArrow onClick={previous}>
						<img
							src={
								"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/chevron-left.svg"
							}
							alt="arrow"
						/>
					</LeftArrow>
					<Count>
						<Span>{currentSlide + 1}</Span>/
						<Small>{featured.length}</Small>
					</Count>
					<RightArrow onClick={next}>
						<img
							src={
								"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/chevron-left.svg"
							}
							alt="arrow"
						/>
					</RightArrow>
				</Arrow>
			</Container>
		</>
	);
}

export default StoriesSpotlight;
const Container = styled.section`
	@media all and (max-width: 480px) {
		padding-bottom: 30px;
	}
	& .slick-dots li button:before {
		line-height: 4px;
		width: 35px;
		height: 6px;
		background: #087443;
		border-radius: 6px;
		content: "";
	}
	.slick-dots li {
		margin: 0px 12px;
	}
	.slick-dots {
		position: absolute;
		/* bottom: -8%; */
		bottom: 9%;
		left: -1%;
	}
	@media all and (max-width: 1280px) {
		.slick-dots {
			bottom: 10%;
		}
	}
	@media all and (max-width: 1080px) {
		.slick-dots {
			bottom: 11%;
		}
	}
	@media all and (max-width: 980px) {
		.slick-dots {
			bottom: 11.5%;
		}
	}
	@media all and (max-width: 768px) {
		.slick-dots {
			/* bottom: 20%; */
			display: none !important;
		}
	}
	@media all and (max-width: 640px) {
		.slick-dots {
			display: none !important;
		}
	}
`;
const Top = styled.div`
	padding-top: 90px;
	text-align: center;
	background-color: #ecfcf2;
	padding-bottom: 5px;


	@media all and (max-width: 980px) {
		padding-bottom: 40px;
		padding-top: 80px;
	}
	@media all and (max-width: 640px) {
		padding-bottom: 30px;
		padding-top: 70px;
	}
	@media all and (max-width: 480px) {
		padding-bottom: 25px;
		padding-top: 45px;
	}
	@media all and (max-width: 480px) {
		padding-bottom: 25px;
		padding-top: 45px;
	}
	h3 {
		color: #084c2e;
		font-size: 50px;
		font-family: gordita_medium;
		width: 65%;
		margin: 0 auto 20px;
		height: 140px;
		display: flex;
		align-items: end;
		justify-content: center;
		@media all and (max-width: 1280px) {
			width: 75%;
		}
		@media all and (max-width: 1080px) {
			font-size: 43px;
			height: 130px;
		}
		@media all and (max-width: 980px) {
			font-size: 38px;
			width: 83%;
			margin: 0 auto 18px;
			height: 110px;
		}
		@media all and (max-width: 768px) {
			font-size: 35px;
			height: 100px;
		}
		@media all and (max-width: 640px) {
			font-size: 28px;
			width: 90%;
			margin: 0 auto 16px;
			height: 85px;
		}
		@media all and (max-width: 480px) {
			font-size: 21px;
			height: 60px;
		}
		@media all and (max-width: 360px) {
			margin: 0 auto 12px;
		}
	}
	p {
		color: #087443;
		text-align: center;
		font-size: 16px;
		width: 35%;
		margin: 0 auto 44px;
		@media all and (max-width: 1280px) {
			width: 47%;
		}
		@media all and (max-width: 980px) {
			margin: 0 auto 42px;
		}
		@media all and (max-width: 768px) {
			width: 55%;
			font-size: 14px;
			margin: 0 auto 38px;
		}
		@media all and (max-width: 640px) {
			width: 70%;
			margin: 0 auto 30px;
		}
		@media all and (max-width: 480px) {
			width: 80%;
			margin: 0 auto 24px;
			font-size: 13px;
		}
		@media all and (max-width: 360px) {
			width: 90%;
			margin: 0 auto 20px;
			font-size: 13px;
		}
	}
`;
const ButtonCover = styled.div`
	display: flex;
	justify-content: center;
	width: 73%;
	margin: 0 auto;
	
	@media all and (max-width: 360px) {
		width: 80%;
		margin: 0 auto;
		justify-content: space-between;
	}
`;
const Div = styled.div`
	& .slick-slider .slick-track,
	& .slick-slider .slick-list {
		width: 65%;
		margin: 0 auto;
	}

	& .slick-dots li button:before {
		line-height: 4px;
		width: 35px;
		height: 6px;
		background: #087443;
		border-radius: 6px;
		content: "";
	}
	.slick-dots li {
		margin: 0px 12px;
	}
	.slick-dots {
		position: absolute;
		bottom: -8%;
	}
	@media all and (max-width: 1280px) {
		.slick-dots {
			bottom: -10%;
		}
	}
	@media all and (max-width: 980px) {
		.slick-dots {
			bottom: -12%;
		}
	}
	@media all and (max-width: 768px) {
		.slick-dots {
			bottom: 20%;
		}
	}
	@media all and (max-width: 640px) {
		.slick-dots {
			display: none !important;
		}
	}
	@media all and (max-width: 480px) {
		& .slick-slider .slick-track,
		& .slick-slider .slick-list {
			width: 73%;
			margin: 0 auto;
		}
	}
	@media all and (max-width: 360px) {
		.slick-dots li.slick-active button:before {
			opacity: 1;
		}
		& .slick-slider .slick-track,
		& .slick-slider .slick-list {
			width: 80%;
			margin: 0 auto;
		}
	}
`;
const ButtonSign = styled(Link)`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	background: linear-gradient(127deg, #0fa76f 0%, #0f9ea7 100%);
	padding: 12px 34px;
	font-family: gordita_medium;
	font-size: 14px;
	color: #fff;
	margin-right: 24px;
	cursor: pointer;
	@media all and (max-width: 980px) {
		padding: 14px 32px;
	}
	@media all and (max-width: 768px) {
		margin-right: 22px;
		padding: 14px 30px;
	}
	@media all and (max-width: 640px) {
		margin-right: 18px;
	}
	@media all and (max-width: 480px) {
		margin-right: 16px;
		padding: 12px 0;
		width: 48%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	@media all and (max-width: 360px) {
		margin-right: 14px;
		font-size: 13px;
		margin-right: 0;
	}
`;
const ButtonPlay = styled.button`
	border-radius: 10px;
	border: 1px solid #d0d5dd;
	background: #fff;
	box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 12px 34px;
	cursor: pointer;
	font-size: 14px;
	@media all and (max-width: 980px) {
		padding: 14px 32px;
	}
	@media all and (max-width: 768px) {
		padding: 14px 30px;
	}
	@media all and (max-width: 640px) {
		padding: 14px 40px;
	}
	@media all and (max-width: 480px) {
		/* padding: 10px 15px; */
		padding: 12px 0;
		width: 48%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	@media all and (max-width: 360px) {
	}
	div {
		width: 24px;
		margin-right: 10px;
		img {
			width: 100%;
			display: block;
		}
	}
	@media all and (max-width: 360px) {
		font-size: 13px;
		div {
			width: 18px;
			margin-right: 8px;
		}
	}
	span {
		font-family: gordita_medium;
		display: inline-block;
		color: #344054;
		font-size: 14px;
	}
`;
const Bottom = styled.div`
	background: url(${"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/green-line.jpeg"});
	width: 100%;
	height: 100%;
	background-repeat: no-repeat;
	position: relative;
	padding-top: 70px;
	padding-bottom: 40px;
	background-size: contain;
	@media all and (max-width: 1280px) {
	padding-top: 55px;
		
		}
	
	@media all and (max-width: 980px) {
		
	}

	@media all and (max-width: 640px) {
		padding-top: 20px;
		
	}
	@media all and (max-width: 480px) {
		
	}
	@media all and (max-width: 360px) {
		
	}
`;
const Arrow = styled.div`
	display: flex;
	align-items: center;
	width: 13%;
	margin: 0px auto 60px;
	justify-content: space-between;
	img {
		width: 100%;
		display: block;
	}
	@media all and (max-width: 1280px) {
		width: 16%;
	}
	@media all and (max-width: 1080px) {
		width: 16%;
	}
	@media all and (max-width: 980px) {
		width: 22%;
		margin: 0 auto 44px;
	}
	@media all and (max-width: 768px) {
		width: 25%;
		margin: 0 auto 20px;
	}
	@media all and (max-width: 640px) {
		width: 25%;
		margin: 0px auto 12px;
	}
	@media all and (max-width: 540px) {
		width: 30%;
		margin: 0px auto 15px;
	}
	@media all and (max-width: 480px) {
		width: 37%;
		margin: 0px auto;
	}
	@media all and (max-width: 360px) {
		width: 42%;
	}
`;
const LeftArrow = styled.div`
	cursor: pointer;
	border: 1px solid #eaecf0;
	background: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(4px);
	padding: 14px;
	width: 56px;
	height: 56px;
	border-radius: 50%;
	&:hover{
		border: 1px solid #8b8b8b;
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
	&:hover{
		border: 1px solid #8b8b8b;
	}
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
const Count = styled.div`
	display: flex;
	justify-content: center;
	align-items: baseline;
	font-size: 22px;
	@media all and (max-width: 768px) {
		font-size: 18px;
	}
`;
const Span = styled.span`
	display: inline-block;
	color: #087443;
	line-height: 1em;
	font-size: 23px;
	font-family: gordita_medium;
	margin-right: 5px;
	transition: transform 0.5s ease-in-out;
	@media all and (max-width: 768px) {
		font-size: 18px;
	}
`;
const Small = styled.small`
	display: inline-block;
	line-height: 1em;
	color: #707070;
	font-size: 17px;
	margin-left: 5px;
	font-family: gordita_medium;
	@media all and (max-width: 768px) {
		font-size: 12px;
	}
`;

const VedioContainer = styled.div`
	
	position: relative;
	
	& .slick-slider .slick-track,
	& .slick-slider .slick-list {
		width: 65%;
		margin: 0 auto;
	}

	@media all and (max-width: 480px) {
		& .slick-slider .slick-track,
		& .slick-slider .slick-list {
			width: 73%;
			margin: 0 auto;
		}
	}
	@media all and (max-width: 360px) {
		.slick-dots li.slick-active button:before {
			opacity: 1;
		}
		& .slick-slider .slick-track,
		& .slick-slider .slick-list {
			width: 80%;
			margin: 0 auto;
		}
	}
`;
const VedioImage = styled.div`		
	width: 61%;
	margin: 0 auto;
	overflow: hidden;
	border-radius: 10px;
	img {		
		width: 100%;
		display: block;		
	}
	@media all and (max-width: 1280px) {
		width: 64%;
	}
	@media all and (max-width: 640px) {
		width: 70%;
	}
	@media all and (max-width: 480px) {
		width: 75%;
	}
	@media all and (max-width: 360px) {
		width: 80%;
	}
`;
const PlayButton = styled.div`
	position: absolute;
	cursor: pointer;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 7%;
	filter: opacity(0.6);
	&:hover{
		filter: opacity(0.8);
		width:7.5%;
	}
	img {
		width: 100%;
		display: block;
		
	}
	@media all and (max-width: 640px) {
		width: 10%;
	}
`;
