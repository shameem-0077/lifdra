import React, { useState } from "react";
import styled from "styled-components";

export default function SideProfileCard() {
	const [isRated, setIsRated] = useState(false);

	const rate_star_count = 2;
	const stars = [...Array(5 - rate_star_count)].map((index) => (
		<StarItem key={index}>
			<Star
				src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/general/star.svg"
				alt=""
			/>
		</StarItem>
	));
	const rated_stars = [...Array(rate_star_count)].map((index) => (
		<StarItem key={index}>
			<Star
				src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/general/filled-star.svg"
				alt=""
			/>
		</StarItem>
	));

	return (
		<Container>
			<InfoCard>
				<PhotoContainer>
					<Photo
						src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/students/student.jpg"
						alt=""
					/>
					<Content>
						<Name className="d-b white semi-bold">
							Aubrey Fisher
						</Name>
						<LastSeen className="d-b white medium">
							Last seen today at 03.42 pm
						</LastSeen>
					</Content>
				</PhotoContainer>
				<Infos>
					<Title>Contact Info</Title>
					<InfoItem>
						<InfoTitle>Email Address</InfoTitle>
						<InfoText>audrey@example.com</InfoText>
					</InfoItem>
					<InfoItem>
						<InfoTitle>Phone Number</InfoTitle>
						<InfoText>(239)555-0108</InfoText>
					</InfoItem>
					<InfoItem>
						<InfoTitle>Street Address</InfoTitle>
						<InfoText>JI. Diponegoro No.21</InfoText>
					</InfoItem>
					<InfoItem>
						<InfoTitle>City</InfoTitle>
						<InfoText>Cilacap</InfoText>
					</InfoItem>
				</Infos>
			</InfoCard>
			<RatingCard>
				<Title>Rating</Title>
				<StarContainer className="d-f j-s-b">
					{rated_stars}
					{stars}
				</StarContainer>
				<RatingDescription className="medium">
					Lorem ipsum dolor sit amet, consectetur
					adipisicing elit. Et blanditiis, vel sint quod
					molestias corrupti! Ea rerum illum asperiores
					cupiditate id, dignissimos magnam earum
					repudiandae quis soluta doloremque, dolor nisi.
				</RatingDescription>
			</RatingCard>
		</Container>
	);
}
const Container = styled.div`
	width: 45%;
	margin-left: 22px;
	overflow-y: scroll;
	height: calc(100vh - 110px);
	&::-webkit-scrollbar {
		width: 0;
	}
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none;
`;
const PhotoContainer = styled.div`
	position: relative;
`;
const Photo = styled.img`
	display: block;
	width: 100%;
`;
const Content = styled.div`
	right: 0;
	position: absolute;
	bottom: 0;
	top: 0;
	left: 0;
	background: linear-gradient(#0000 60%, #000);
	padding: 18px 25px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`;
const Name = styled.span`
	font-size: 31px;
	margin-bottom: -12px;
`;
const LastSeen = styled.span``;
const InfoCard = styled.div`
	border-radius: 5px;
	overflow: hidden;
	background: #1f2934;
`;
const Infos = styled.div`
	padding: 21px 25px;
`;
const Title = styled.span`
	font-family: "gordita_medium";
	color: #2196f3;
	display: block;
	margin-bottom: 18px;
`;
const InfoItem = styled.div`
	margin-bottom: 20px;
	&:last-child {
		margin-bottom: 0;
	}
`;
const InfoTitle = styled.span`
	font-family: "gordita_medium";
	color: #909da6;
	display: block;
	font-size: 15px;
`;
const InfoText = styled.span`
	font-family: "gordita_medium";
	display: block;
	color: #fff;
`;
const RatingCard = styled.div`
	padding: 18px 25px;
	background: #1f2934;
	margin-top: 15px;
`;
const StarContainer = styled.div``;
const Star = styled.img`
	display: block;
	width: 100%;
`;
const RatingDescription = styled.p`
	color: #909da6;
	margin-top: 22px;
`;
const StarItem = styled.div``;
