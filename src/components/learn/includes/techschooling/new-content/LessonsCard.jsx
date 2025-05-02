import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { secondsTohm } from "../../../../helpers/functions";

function LessonsCard({ lessons, subject_slug }) {
	return (
		<>
			{lessons.map((data) => (
				<MainContainer>
					<Card
						to={`/nanodegree/${subject_slug}/new-content/skills/${data.id}/topics/`}
					>
						<ImageContainer>
							<Image src={data.image} />
						</ImageContainer>
						<Content>
							<ContentTop>
								<Heading>{data.name}</Heading>
								<Button status={data.progres}>
									{data.progres === "pending"
										? "On Progress"
										: "Start"}
								</Button>
							</ContentTop>
							<ContentMiddle>
								<Paragraph>
									{data.description}
								</Paragraph>
							</ContentMiddle>

							<ContentBottom>
								<BottomLeft>
									<Icon1 className="las la-play-circle"></Icon1>
									<Topic>
										{data.topics} Topics
									</Topic>
								</BottomLeft>
								<BottomRight>
									<Icon2 className="las la-clock"></Icon2>
									<Time>
										{secondsTohm(data.duration)}
									</Time>
								</BottomRight>
							</ContentBottom>
						</Content>
					</Card>
				</MainContainer>
			))}
		</>
	);
}

export default LessonsCard;

const Card = styled(Link)`
	border-radius: 5px;
	position: relative;
	cursor: pointer;
	display: flex;
	flex-direction: column;
`;
// const LockedCard = styled.div`
//     box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
//     position: relative;
//     cursor: pointer;
//     display: flex;
//     flex-direction: column;
//     cursor: not-allowed;
//     &:before {
//         position: absolute;
//         top: 0;
//         bottom: 0;
//         right: 0;
//         width: 100%;
//         content: "";
//         background: rgba(255, 255, 255, 0.6);
//     }
// `;
const MainContainer = styled.div`
	box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
	background-color: #fff;
`;
const ImageContainer = styled.div`
	overflow: hidden;
	/* min-height: 241px; */
	max-height: 241px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Image = styled.img`
	display: block;
	width: 100%;
`;
const Content = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 25px;
	@media only screen and (max-width: 480px) {
		padding: 14px 24px;
	}
`;
const ContentTop = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const Heading = styled.h3`
	font-family: "gordita_medium";
	letter-spacing: 1px;
	width: 88%;
	color: #333;
	font-size: 18px;
	@media only screen and (max-width: 1024px) {
		font-size: 16px;
		line-height: 1.3em;
	}
`;
const Button = styled.span`
	display: inline-block;
	background-color: ${(props) =>
		props.status === "finished" ? "#f69803" : "#41c569"};
	padding: 6px;
	border-radius: 5px;
	color: rgb(255, 255, 255);
	font-family: "gordita_medium";
	font-size: 16px;
	width: 140px;
	text-align: center;
	@media only screen and (max-width: 1024px) {
		font-size: 14px;
	}
`;
const ContentMiddle = styled.div``;
const Paragraph = styled.p`
	margin: 20px 0px;
	color: rgb(69, 90, 100);
`;
const ContentBottom = styled.div`
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: start;
	justify-content: flex-start;
	@media only screen and (max-width: 860px) {
		flex-direction: column;
		align-items: flex-start;
	}
	@media only screen and (max-width: 640px) {
		flex-direction: row;
		align-items: center;
	}
`;
const BottomLeft = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 30px;
`;
const Icon1 = styled.i`
	color: rgb(153, 153, 153);
	font-size: 28px;
	margin-right: 10px;
`;
const Topic = styled.span`
	color: rgb(153, 153, 153);
	font-size: 15px;
`;
const BottomRight = styled.div`
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: center;
	justify-content: center;
	@media only screen and (max-width: 860px) {
		margin-top: 10px;
	}
	@media only screen and (max-width: 640px) {
		margin-top: 0;
	}
`;
const Icon2 = styled.i`
	color: rgb(153, 153, 153);
	font-size: 28px;
	margin-right: 10px;
`;
const Time = styled.span`
	color: rgb(153, 153, 153);
	font-size: 15px;
	font-family: "baloo_paaji_2regular";
`;
