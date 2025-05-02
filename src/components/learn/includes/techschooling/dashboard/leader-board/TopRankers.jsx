import React, { useState } from "react";
import styled from "styled-components";
import Medal1 from "../../../../../../assets/images/leader-board/First-medal.svg";
import Medal2 from "../../../../../../assets/images/leader-board/Second-medal.svg";
import BannerBg1 from "../../../../../../assets/images/leader-board/bannerBg.svg";
import Medal3 from "../../../../../../assets/images/leader-board/Third-medal.svg";
import Avatar from "react-avatar";

function TopRankers({ toppers }) {
	return (
		<Container>
			<TopContainer>
				{toppers
					.filter((item) => item.position === 1)
					.map((data) => (
						<FirstContainer>
							<ImgContainer className="first">
								<Avatar
									name={data.student_name}
									size="100%"
									maxInitials={2}
								/>
							</ImgContainer>
							<MedalContainer className="first">
								<img src={Medal1} alt="Medal1" />
							</MedalContainer>
							<DetailsContainer className="first">
								<p>{data.point}</p>
								<h4>{data.student_name}</h4>
							</DetailsContainer>
						</FirstContainer>
					))}
			</TopContainer>
			<BottomContainer>
				{toppers
					.filter((item) => item.position === 2)
					.map((data) => (
						<SecondContainer>
							<ImgContainer className="second">
								<Avatar
									name={data.student_name}
									size="100%"
									maxInitials={2}
								/>
							</ImgContainer>
							<MedalContainer className="second">
								<img src={Medal2} alt="Medal2" />
							</MedalContainer>
							<DetailsContainer className="second">
								<p>{data.point}</p>
								<h4>{data.student_name}</h4>
							</DetailsContainer>
						</SecondContainer>
					))}
				{toppers
					.filter((item) => item.position === 3)
					.map((data) => (
						<ThirdContainer>
							<ImgContainer className="third">
								<Avatar
									name={data.student_name}
									size="100%"
									maxInitials={2}
								/>
							</ImgContainer>
							<MedalContainer className="third">
								<img src={Medal3} alt="Medal3" />
							</MedalContainer>
							<DetailsContainer className="third">
								<p>{data.point}</p>
								<h4>{data.student_name}</h4>
							</DetailsContainer>
						</ThirdContainer>
					))}
			</BottomContainer>
		</Container>
	);
}

export default TopRankers;
const Container = styled.div`
	display: none;
	@media all and (max-width: 480px) {
		display: flex;
		flex-direction: column;
		width: 100%;
		border-radius: 5px;
		padding: 20px;
		background-color: #003c3c;
		display: flex;
		background-image: url(${BannerBg1});
		background-position: inherit;
		background-size: 100%;
		border-right: 1px solid #d4d4d4;
	}
`;
const TopContainer = styled.div``;
const FirstContainer = styled.div`
	height: 130px;
	width: 140px;
	background: linear-gradient(180.35deg, #fab036 -44.32%, #ffffff 99.7%);
	border-radius: 6px;
	margin: 0 auto;
	top: 29px;
	padding: 12px;
	position: relative;
	display: flex;
	flex-direction: column;
`;
const ImgContainer = styled.div`
	position: absolute;
	border-radius: 50%;
	border: 3px solid #fff;
	overflow: hidden;
	&.first {
		top: -39px;
		left: 25px;
		width: 90px;
		height: 90px;
	}
	&.second {
		width: 60px;
		height: 60px;
		top: -27px;
		left: 29px;
	}
	&.third {
		width: 55px;
		top: -24px;
		height: 55px;
		right: 24px;
	}
`;
const MedalContainer = styled.div`
	position: absolute;
	img {
		width: 100%;
		display: block;
	}
	&.first {
		width: 33px;
		top: 26px;
		left: 55px;
	}
	&.second {
		width: 28px;
		left: 44px;
		top: 13px;
	}
	&.third {
		width: 22px;
		left: 38px;
		top: 12px;
	}
`;
const DetailsContainer = styled.div`
	text-align: center;
	padding: 8px 0px;
	display: flex;
	flex-direction: column;
	p {
		color: #01b95b;
		font-size: 12px;
		font-family: "gordita_medium";
	}
	h4 {
		font-size: 12px;
		font-family: "gordita_medium";
		text-transform: capitalize;
	}
	&.first {
		transform: translate(1px, 53px);
	}
	&.second {
		transform: translate(-2px, 35px);
	}
	&.third {
		transform: translate(1px, 23px);
	}
`;
const BottomContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-top: 70px;
`;
const SecondContainer = styled.div`
	min-height: 100px;
	width: 40%;
	padding: 10px;
	background: linear-gradient(180.9deg, #6dc1fd -66.94%, #ffffff 99.22%);
	border-radius: 6px;
	position: relative;
	display: flex;
	flex-direction: column;
`;
const ThirdContainer = styled.div`
	background: linear-gradient(180deg, #0fa76f -78.06%, #ffffff 100%);
	min-height: 100px;
	width: 40%;
	padding: 12px 8px;
	border-radius: 6px;
	position: relative;
	display: flex;
	flex-direction: column;
`;
