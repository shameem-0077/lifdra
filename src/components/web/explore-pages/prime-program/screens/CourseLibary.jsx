import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import auth from "../../../../routing/auth";

function CourseLibary({ isSteyp }) {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const user_profile = useSelector((state) => state.user_profile);
	return (
		<Container isSteyp={isSteyp}>
			{" "}
			<Section className="wrapper">
				<ContentSection>
					{isSteyp ? (
						<Title>Prime programs</Title>
					) : (
						<Title>
							<span>Get Access </span> to the <br /> Entire Course
							Library
						</Title>
					)}
					{isSteyp ? (
						<Description>
							Through Prime Program, we offer a wide range of
							skill training. you can choose from the different
							programs we offer and shape your skills in those
							fields.
						</Description>
					) : (
						<Description>
							Access the entire course library of Prime Programs
							with a single subscription so that you can explore
							and find the niche you are good at or learn them
							all!
						</Description>
					)}

					{/* <Description>
						Access the entire course library of Prime Programs with
						a single subscription so that you can explore and find
						the niche you are good at or learn them all!
					</Description> */}
					<DetailPoints>
						<Tick>
							<img
								src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/top-tick.svg"
								alt=""
							/>
						</Tick>
						<span>Explore all the courses</span>
					</DetailPoints>
					<DetailPoints>
						<Tick>
							<img
								src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/bottom-tick.svg"
								alt=""
							/>
						</Tick>
						<span>Find the best for you</span>
					</DetailPoints>
					{user_profile.length > 0 ? (
						user_profile.prime_program_subscription
							.is_subscription &&
						!user_profile.prime_program_subscription.is_expired ? (
							<SubscribeButton
								onClick={(e) => {
									history.push({
										pathname: `/prime-programs/courses/`,
									});
								}}
							>
								Continue
							</SubscribeButton>
						) : (
							<SubscribeButton
								onClick={(e) => {
									e.preventDefault();
									if (auth.isAuthenticated()) {
										history.push({
											pathname: `/prime-programs/courses/`,
											search: `?action=subscribe-prime-programs`,
										});
									} else {
										history.push({
											pathname: location.pathname,
											search: `?action=login`,
										});
									}
								}}
							>
								Subscribe Now
							</SubscribeButton>
						)
					) : (
						<SubscribeButton
							onClick={(e) => {
								e.preventDefault();
								if (auth.isAuthenticated()) {
									history.push({
										pathname: `/prime-programs/courses/`,
										search: `?action=subscribe-prime-programs`,
									});
								} else {
									history.push({
										pathname: location.pathname,
										search: `?action=login`,
									});
								}
							}}
						>
							Subscribe Now
						</SubscribeButton>
					)}
				</ContentSection>
				<ImageSection>
					<div>
						<Web
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/courses.png"
							alt="courses"
						/>
						<Web
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/courses.png"
							alt="courses"
						/>
					</div>
					<div>
						<Web
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/courses.png"
							alt="courses"
						/>
						<Web
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/courses.png"
							alt="courses"
						/>
					</div>
					<div>
						<Mob
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/courses-responsive.png"
							alt="courses"
						/>
						<Mob
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/courses-responsive.png"
							alt="courses"
						/>
						<Mob
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/courses-responsive.png"
							alt="courses"
						/>
						<Mob
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/courses-responsive.png"
							alt="courses"
						/>
					</div>
				</ImageSection>
			</Section>
		</Container>
	);
}

export default CourseLibary;

const Container = styled.div`
	padding: 120px 0;
	background-color: ${(props) => (props.isSteyp ? "#F8F8F8" : "#eff7ed80;")};
	@media all and (max-width: 980px) {
		padding: 100px 0;
	}
	@media all and (max-width: 768px) {
		padding: 80px 0;
	}
	@media all and (max-width: 640px) {
		padding: 70px 0;
	}
	@media all and (max-width: 360px) {
		padding: 50px 0;
	}
`;
const Section = styled.div`
	padding: 0 5%;
	display: grid;
	grid-gap: 50px;
	grid-template-columns: 1fr 1fr;
	@media all and (max-width: 980px) {
		grid-gap: 30px;
	}
	@media all and (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`;
const ImageSection = styled.div`
	/* padding: 20px; */
	overflow: hidden;
	max-width: 900px;
	width: 100%;
	margin: 0 auto;
	position: relative;
	display: flex;
	flex-direction: column;
	margin: -120px 0;
	max-height: 640px;
	@media all and (max-width: 980px) {
		margin: -100px 0;
	}
	div {
		display: flex;
		flex-direction: column;
		position: relative;
		animation: marquee 24s linear infinite;
		justify-content: space-around;
	}
	img {
		display: block;
		height: 100%;
	}

	@keyframes marquee {
		0% {
			transform: translateY(0%);
		}
		100% {
			transform: translateY(-100%);
		}
	}
	@media all and (max-width: 768px) {
		max-height: unset;
		margin: 0;
		overflow: visible;
		img {
			display: block;
			height: auto;
			width: 100%;
		}
		div {
			display: flex;
			flex-direction: row;
			position: relative;
			animation: marquee 8s linear infinite;
			justify-content: space-around;
		}
		@keyframes marquee {
			0% {
				transform: translateX(0%);
			}
			100% {
				transform: translateX(-100%);
			}
		}
	}
	@media all and (max-width: 640px) {
		img {
			display: block;
			height: auto;
			width: 150%;
		}
	}
`;
const ContentSection = styled.div`
	/* order: ${(props) => (props.img_right ? 1 : 2)}; */
	display: flex;
	flex-direction: column;
	justify-content: center;
	/* margin-right: 20px; */
	&:nth-child(2n) {
		margin-right: 0;
		/* margin-left: 50px; */
	}
`;
const Title = styled.h2`
	font-family: gordita_medium;
	font-size: 34px;
	margin-bottom: 10px;
	span {
		color: #4ca473;
	}
	@media all and (max-width: 1100px) {
		font-size: 32px;
	}
	@media all and (max-width: 768px) {
		font-size: 28px;
	}
	@media all and (max-width: 640px) {
		font-size: 24px;
	}
`;

const Description = styled.p`
	max-width: 550px;
	margin-bottom: 20px;
	@media all and (max-width: 480px) {
		font-size: 15px;
	}
`;
const SubscribeButton = styled.span`
	display: block;
	width: 200px;
	height: 55px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #4ca473;
	border: 2px solid #fff;
	color: #fff;
	font-family: gordita_medium;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	margin-top: 30px;
	&:hover {
		color: #4ca473;
		background-color: #fff;
		border: 2px solid #4ca473;
	}
	@media all and (max-width: 360px) {
		margin-top: 20px;
		width: 200px;
		height: 50px;
	}
`;

const DetailPoints = styled.span`
	display: flex;
	margin-bottom: 10px;
	color: #595959;
	span {
		font-size: 14px;
		font-family: "gordita_medium";
	}
	@media all and (max-width: 640px) {
		span {
			font-size: 15px;
		}
	}
`;
const Tick = styled.span`
	display: block;
	width: 25px;
	margin-right: 15px;
	img {
		display: block;
		width: 100%;
		transform: translateY(-3px);
	}
`;

const Web = styled.img`
	display: block;
	@media all and (max-width: 768px) {
		display: none !important;
	}
`;
const Mob = styled.img`
	display: none !important;
	@media all and (max-width: 768px) {
		display: block !important
        ;
	}
`;
