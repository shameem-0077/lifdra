import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function TrendingPrograms() {
	const datas = [
		{
			id: 1,
			title: "Prime Programs",
			description: `An opportunity to perfect your skills in selected professions of your choice.`,
			person: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/Prime-program.svg",
			count: 200,
			link: "/prime-programs/",
		},
		{
			id: 2,
			title: "Challenges",
			description: `Steyp has now introduced a variety of exciting challenges! Come join us and earn awesome rewards.`,
			person: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/challenge.svg",
			count: 350,
			link: "/challenges/",
		},
	];

	return (
		<MainContainer>
			{/* <Heading>Trending Programs</Heading> */}
			<Contain>
				<h3> Explore More</h3>
				<Contains>
					{datas.map((data) => (
						<BottomMainCard to={data.link}>
							<BottomCardLeft>
								<CardImage src={data.person} alt="image" />
							</BottomCardLeft>
							<BottomCardRight>
								<CardInnerLeft>
									<CardInnerHead>{data.title}</CardInnerHead>
									<CardInnerDescription>
										{data.description}
									</CardInnerDescription>
								</CardInnerLeft>
								<CardInnerRight>
									<div>
										<Count>{data.count}+</Count>
										<p>Students Joined</p>
									</div>
									<Button to={data.link}>
										Explore More
										<span>
											<img
												src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/right-arrow-icon.svg"
												alt="icon"
											/>
										</span>
									</Button>
								</CardInnerRight>
							</BottomCardRight>
						</BottomMainCard>
					))}
				</Contains>
			</Contain>
		</MainContainer>
	);
}

export default TrendingPrograms;
const MainContainer = styled.div`
	margin: 35px 0px 20px 0px !important;
	padding-bottom: 10px;
`;
const Contains = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	margin-top: 10px;
	grid-gap: 15px;
	@media all and (max-width: 768px) {
		grid-template-columns: 1fr;
	}
	@media all and (max-width: 480px) {
		grid-template-columns: 1fr 1fr;
	}
`;
const Contain = styled.div`
	h3 {
		font-size: 21px;
		color: #000;
		font-family: "gordita_medium";
		@media (max-width: 480px) {
			font-size: 18px;
		}
	}
`;
const BottomMainCard = styled(Link)`
	display: block;
	border: 1px solid #eae5e5;
	border-radius: 10px;
	padding: 15px 20px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	position: relative;
	overflow: hidden;
	background-color: #f9f9fb;
	@media all and (max-width: 1200px) {
		align-items: unset;
	}
	@media all and (max-width: 640px) {
		height: 212px;
	}
	@media all and (max-width: 520px) {
		height: 234px;
	}
	@media all and (max-width: 480px) {
		flex-direction: column;
		height: unset;
	}
	@media all and (max-width: 420px) {
		padding: 15px 15px;
	}
`;

const BottomCardLeft = styled.div`
	width: 175px;
	margin-right: 10px;

	@media all and (max-width: 1200px) {
		width: 39%;
		margin: auto 0px;
	}
	@media all and (max-width: 980px) {
		width: 190px;
	}
	@media all and (max-width: 480px) {
		width: 72px;
	}
`;

const CardImage = styled.img`
	display: block;
	width: 100%;
`;

const BottomCardRight = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 75%;

	@media all and (max-width: 1200px) {
		flex-direction: column;
	}

	@media all and (max-width: 480px) {
		width: 100%;
	}
`;
const CardInnerLeft = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 57%;
	@media all and (max-width: 1200px) {
		width: 100%;
	}
`;

const CardInnerHead = styled.h6`
	font-size: 19px;
	font-family: "gordita_medium";
	margin-bottom: 10px;
	text-align: left;
	@media all and (max-width: 480px) {
		margin-bottom: 0px;
		font-size: 16px;
		margin-top: 15px;
	}
	@media all and (max-width: 390px) {
		font-size: 14px;
	}
`;

const CardInnerDescription = styled.p`
	font-size: 14px;
	font-family: "gordita_regular";
	line-height: unset;
	text-align: left;
	color: #7b7a6c;
	width: 258px;
	@media all and (max-width: 1200px) {
		width: unset;
	}
	@media all and (max-width: 480px) {
		display: none;
	}
`;
const CardInnerRight = styled.div`
	width: 38%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	div {
		visibility: hidden;
		text-align: right;
		font-size: 24px;
		@media all and (max-width: 1200px) {
			text-align: left;
		}
		@media all and (max-width: 980px) {
			display: none;
		}
		p {
			font-size: 13px;
			transform: translateY(-4px);
			@media all and (max-width: 1200px) {
				transform: translateY(0px);
			}
			@media all and (max-width: 520px) {
				width: 70%;
			}
			@media all and (max-width: 480px) {
				width: 100%;
			}
		}
	}
	@media all and (max-width: 1200px) {
		flex-direction: row;
		justify-content: space-between;
		margin-top: 13px;
		width: 100%;
	}
	@media all and (max-width: 980px) {
		justify-content: flex-end;
	}
	@media all and (max-width: 480px) {
		display: none;
	}
`;
const Count = styled.div`
	font-family: gordita_medium;
	font-size: 19px;
	display: inline;
`;
const Button = styled(Link)`
	background-color: unset;
	font-size: 15px;
	color: #0fa76f;
	font-family: gordita_medium;
	width: 110px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	margin-top: 39px;
	transition: all 0.4s ease;
	span {
		width: 0;
		display: block;
		transition: all 0.4s ease;
		img {
			display: block;
			width: 100%;
			transition: all 0.4s ease;
		}
	}
	&:hover {
		width: 140px;
		span {
			width: 15px;
			margin-left: 9px;
		}
		@media all and (max-width: 520px) {
			width: 125px;
		}
	}
	@media all and (max-width: 1200px) {
		margin-top: 0px;
	}
	@media all and (max-width: 520px) {
		font-size: 14px;
	}
`;
