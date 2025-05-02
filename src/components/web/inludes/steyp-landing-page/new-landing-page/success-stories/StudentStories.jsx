import React, { useRef, useState } from "react";
import styled from "styled-components";
import SpotlightVideo from "../../../../screens/steyp-landing-page/sat/modal/SpotlightVideo";

function StudentStories({ story }) {
	const containerRef = useRef(null);
	const [isModal, setModal] = useState(false);
	const [vedioTemp, setVedioTemp] = useState("");
	const [vedioUrl, setVedioUrl] = useState("");

	const handleScroll = (scrollAmount) => {
		if (containerRef.current) {
			containerRef.current.scrollTo({
				left: containerRef.current.scrollLeft + scrollAmount,
				behavior: "smooth",
			});
		}
	};

	function capitalizeWords(sentence) {
        const words = sentence.split(" ");
        const capitalizedWords = words.map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
        return capitalizedWords.join(" ");
    }

	
	  

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
				<div className="wrapper">
					<Box>
						<h3>Inspiring stories of our students</h3>
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
					</Box>
					<Para>
						Listen to what the parents of our students have to say
						about Steyp.
					</Para>
					<Scroll>
						<ScrollBox ref={containerRef}>
							{story.map((element) => (
								<Item
									key={element.id}
									onClick={() => {
										setModal(!isModal);
										setVedioTemp(element.thumbnail);
										setVedioUrl(element.post_url);
									}}
								>
									<ImageBox>
										<img
											src={element.thumbnail}
											alt="Card"
										/>
									</ImageBox>
									<PlayIcon>
										<img
											src={
												"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/play-button.svg"
											}
											alt="Plays"
										/>
									</PlayIcon>
									<NameBox>
    									<span>{capitalizeWords(element.title)}</span>
									</NameBox>
								</Item>
							))}
						</ScrollBox>
					</Scroll>
				</div>
			</Container>
		</>
	);
}

export default StudentStories;



const Container = styled.div`
	background-color: #f6fef9;
	padding: 90px 0;
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
		padding-top: 20px;
	}
`;

function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
  }

const Box = styled.div`
	margin-bottom: 14px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media all and (max-width: 480px) {
	}
	h3 {
		font-family: gordita_medium;
		color: #101828;
		font-size: 32px;
	}
	@media all and (max-width: 768px) {
		margin-bottom: 10px;
		h3 {
			font-size: 28px;
		}
	}
	@media all and (max-width: 480px) {
		h3 {
			font-size: 21px;
		}
	}
	@media all and (max-width: 360px) {
		h3 {
			font-size: 20px;
		}
	}
`;
const Arrow = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
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
const Para = styled.p`
	font-size: 16px;
	margin-bottom: 58px;
	width: 50%;
	color: #475467;
	display: block;
	@media all and (max-width: 1080px) {
		margin-bottom: 48px;
	}
	@media all and (max-width: 980px) {
		margin-bottom: 40px;
		width: 65%;
	}
	@media all and (max-width: 768px) {
		margin-bottom: 30px;
		width: 75%;
		font-size: 14px;
	}
	@media all and (max-width: 640px) {
		margin-bottom: 24px;
		width: 91%;
		font-size: 14px;
	}
	@media all and (max-width: 480px) {
		margin-bottom: 18px;
		width: 97%;
		font-size: 12px;
	}
`;
const Scroll = styled.div``;
const ScrollBox = styled.div`
	display: flex;
	overflow-x: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;
const Item = styled.div`
	position: relative;
	border-radius: 8px;
	cursor: pointer;
	overflow: hidden;
	width: 23%;
	list-style: none;
	flex: 0 0 auto;
	margin-right: 28px;
	@media all and (max-width: 1280px) {
		width: 28%;
	}
	@media all and (max-width: 1080px) {
		width: 31%;
		margin-right: 20px;
	}
	@media all and (max-width: 980px) {
		width: 38%;
		margin-right: 18px;
	}
	@media all and (max-width: 768px) {
		width: 45%;
	}
	@media all and (max-width: 640px) {
		width: 55%;
	}
	@media all and (max-width: 480px) {
		width: 70%;
	}
	@media all and (max-width: 400px) {
		width: 100%;
		/* margin-right: 14px; */
	}
`;
const ImageBox = styled.div`
	width: 100%;
	min-height: 350px;
	img {
		display: block;
		width: 100%;
		object-fit: cover;
		min-height: inherit;
	}
	@media all and (max-width: 1080px) {
		height: 280px;
		img {
			display: block;
			width: 100%;
			object-fit: cover;
			height: 100%;
		}
	}
`;
const NameBox = styled.div`
	background: linear-gradient(
		180deg,
		rgba(170, 240, 196, 0.7) 0%,
		#aaf0c4 100%
	);
	padding: 20px;
	@media all and (max-width: 1380px) {
		padding: 18px;
		span {
			padding: 14px;
		}
	}
	@media all and (max-width: 640px) {
		padding: 15px;
		
	}
	@media all and (max-width: 480px) {
		padding: 12px;
		
	}
	span {
		display: inline-block;
		padding: 16px;
		color: #095c37;
		border: 1px solid rgba(255, 255, 255, 0.5);
		background: rgba(255, 255, 255, 0.3);
		font-size: 14px;
		font-family: gordita_medium;
		width: 100%;
		text-align: center;
	}
`;
const PlayIcon = styled.div`
	position: absolute;
	bottom: 27%;
	left: 8%;
	width: 25%;
	
	cursor: pointer;
	
	
	img {
		width: 100%;
		display: block;			 
	}
`;
