import React, { useState } from "react";
import styled from "styled-components";
import SpotlightVideo from "../../../../screens/steyp-landing-page/sat/modal/SpotlightVideo";
import quotes from "../../../../../../assets/images/web/test.svg";

function HowToCode({ testimonial }) {
	let data = testimonial[0];
	const [isModal, setModal] = useState(false);
	const [vedioTemp, setVedioTemp] = useState("");
	const [vedioUrl, setVedioUrl] = useState("");
	return (
		<>
			<SpotlightVideo
				isModal={isModal}
				setModal={setModal}
				videoUrl={vedioUrl}
				videoThumnail={vedioTemp}
				stories={true}
			/>
			<Container className="wrapper">
				<h3>
					<span>Steyp</span> teaches you more than just how to code.
				</h3>
				<Box>
					<Left>
						<Para>{data.description}</Para>
						<div>
							<Span>— {data.author}</Span>
							<Small>{data.designation}</Small>
						</div>
					</Left>
					<Right>
						<ImageContainer>
							<img src={data.thumbnail} alt="Growlius" />
						</ImageContainer>
						<PlayIcon
							onClick={() => {
								setModal(!isModal);
								setVedioTemp(data.thumbnail);
								setVedioUrl(data.post_url);
							}}
						>
							<img
								src={
									"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/button-new.svg"
								}
								alt="Plays"
							/>
						</PlayIcon>
					</Right>
				</Box>
			</Container>
		</>
	);
}

export default HowToCode;

const Container = styled.div`
	h3 {
		text-align: center;
		color: #101828;
		margin-bottom: 52px;
		font-family: gordita_medium;
		font-size: 30px;
		@media all and (max-width: 1080px) {
			font-size: 28px;
			margin-bottom: 45px;
		}
		@media all and (max-width: 980px) {
			font-size: 28px;
			margin-bottom: 40px;
		}
		@media all and (max-width: 768px) {
			margin-bottom: 40px;
			width: 80%;
			margin: 0 auto;
		}
		@media all and (max-width: 640px) {
			width: 90%;
			margin: 0 auto;
		}
		@media all and (max-width: 640px) {
			width: 100%;
			margin-bottom: 25px;
			font-size: 24px;
		}
		@media all and (max-width: 480px) {
			margin-bottom: 20px;
			font-size: 21px;
		}
		@media all and (max-width: 360px) {
			font-size: 20px;
		}
		span {
			color: #0e9f6a;
			font-family: gordita_medium;
			position: relative;
			::before {
				content: "";
				background-image: url(${"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/line-yellow.svg"});
				height: 11px;
				background-size: 100%;
				width: 125px;
				display: block;
				background-repeat: no-repeat;
				position: absolute;
				top: 100%;
				left: -16%;
				@media all and (max-width: 1080px) {					
					left: 0;
					background-size: 83%;
				}
				@media all and (max-width: 768px) {
					
					left: 0;
					background-size: 60%;
				}
				@media all and (max-width: 480px) {
					left: 0;
					background-size: 57%;
				
				}
			}
		}
	}
	color: #0e9f6a;
	text-align: center;
	font-size: 36px;
	padding: 90px 0;
	@media all and (max-width: 1080px) {
		padding: 65px 0 80px 0;
	}
	@media all and (max-width: 980px) {
	}
	@media all and (max-width: 768px) {
		padding: 55px 0 70px 0;
	}
	@media all and (max-width: 640px) {
		padding: 45px 0 60px 0;
	}
	@media all and (max-width: 480px) {
		padding: 35px 0 50px 0;
	}
`;
const Box = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 60px 0px 60px 60px;
	border-radius: 20px;
	background: #f9fafb;
	@media all and (max-width: 1080px) {
		padding: 55px;
		border-radius: 18px;
	}
	@media all and (max-width: 980px) {
		flex-direction: column-reverse;
		flex-wrap: wrap;
		padding: 45px;
	}
	@media all and (max-width: 640px) {
		padding: 30px;
	}
	@media all and (max-width: 480px) {
		padding: 25px;
	}
	@media all and (max-width: 360px) {
		padding: 14px;
	}
`;
const Left = styled.div`
	width: 58%;
	div {
		display: flex;
		flex-direction: column;
	}
	@media all and (max-width: 1080px) {
		width: 100%;
	}
`;
const Para = styled.p`
	color: #101828;
	font-size: 22px;
	line-height: 35px;
	margin-bottom: 26px;
	text-align: left;
	position: relative;
	::before {
		content: url(${quotes});
		position: absolute;
		left: -20px;
		top: -12px;
		color: #2d2d2d;
		width: 16px;
		display: block;
	}

	@media all and (max-width: 1280px) {
		line-height: 28px;
		font-size: 18px;
	}
	@media all and (max-width: 1080px) {
		line-height: 30px;
		font-size: 18px;
		margin-bottom: 28px;
	}
	@media all and (max-width: 768px) {
		line-height: 23px;
		font-size: 16px;
		margin-bottom: 16px;
	}
	@media all and (max-width: 640px) {
		line-height: 21px;
		font-size: 16px;
		margin-bottom: 14px;
	}
	@media all and (max-width: 480px) {
		line-height: 20px;
		font-size: 13px;
		margin-bottom: 10px;
		::before {
			display: none;
		}
	}
`;
const Span = styled.span`
	color: #000;
	display: inline-block;
	font-size: 14px;
	text-align: left;
	width: 100%;
	margin-bottom: 3px;

	font-size: 18px;
	font-family: gordita_medium;
	@media all and (max-width: 768px) {
		font-size: 14px;
	}
	@media all and (max-width: 640px) {
		font-size: 12px;
	}
	@media all and (max-width: 360px) {
		font-size: 11px;
	}
`;
const Small = styled.span`
	display: inline-block;
	font-size: 11px;
	text-align: left;
	width: 100%;
	color: #667085;
	@media all and (max-width: 768px) {
		font-size: 10px;
	}
	@media all and (max-width: 768px) {
		font-size: 9px;
	}
`;
const Right = styled.div`
	position: relative;
	width: 38%;
	height: 280px;
	@media all and (max-width: 1280px) {
		display: flex;
		justify-content: center;
		height: 170px;
	}
	@media all and (max-width: 1080px) {
		width: 100%;
	}
	@media all and (max-width: 980px) {
		margin-bottom: 30px;
		border-radius: 10px;
	}
	@media all and (max-width: 768px) {
		margin-bottom: 25px;
	}
	@media all and (max-width: 480px) {
		margin-bottom: 10px;
	}

	overflow: hidden;
	img {
		width: 100%;
		display: block;
	}
`;
const ImageContainer = styled.div`
	border-radius: 8px 0px 0px 8px;
	overflow: hidden;
	@media all and (max-width: 1280px) {
		height: 170px;
	}
	@media all and (max-width: 980px) {
		border-radius: 8px 8px 8px 8px;
	}
	@media all and (max-width: 480px) {
		height: 160px;
	}
	img {
		width: 100%;
		display: block;
		height: 100%;
	}
`;
const PlayIcon = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	cursor: pointer;
	width: 18%;
	filter: opacity(0.5);
	&:hover{
		filter: opacity(0.6);		
		width:19%;
	}
	@media all and (max-width: 980px) {
		width: 8%;
	}
	@media all and (max-width: 768px) {
		width: 10%;
	}
	@media all and (max-width: 480px) {
		width: 18%;
	}
	img {
		width: 100%;
		display: block;
	}
`;
