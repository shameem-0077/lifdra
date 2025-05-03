import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import ReactPlaceholder from "react-placeholder";

export default function Spotlight({
	banners,
	is_explore,
	isLoading,
	setLoading,
}) {
	const [imageLoaded, setImageLoaded] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const { user_profile, user_data } = useSelector((state) => state);

	let slider = useRef();
	let getImage = useRef();

	const next = (e) => {
		e.preventDefault();
		slider.slickNext();
	};
	const previous = (e) => {
		e.preventDefault();
		slider.slickPrev();
	};
	const settings = {
		autoplay: true,
		dots: false,
		arrows: false,
		infinite: true,
		speed: 1200,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
	};

	useEffect(() => {
		if (!getImage.current) {
			setLoading(true);
		} else {
			setLoading(false);
		}
	}, [getImage.current]);

	const Test = () => {
		return (
			<Container user_profile={user_profile}>
				<BannerLink>
					<Slider
						ref={(c) => {
							slider = c;
						}}
						{...settings}
					>
						{banners.map((banner) => (
							<Banner
								onClick={() => {
									if (is_explore) {
										user_profile.subscription_data
											.expired_subscription
											? navigate("/tech-schooling/subscribe/")
											: navigate("/");
									} else {
										if (user_data.signup_type === "other") {
											navigate({
												pathname: location.pathname,
												search: `action=techschooling`,
											});
										} else {
											navigate({
												pathname: location.pathname,
												search: `action=login`,
											});
										}
									}
								}}
								key={banner.id}
							>
								<WebImage
									onLoad={() => {
										setImageLoaded(true);
									}}
									src={
										window.innerWidth >= 1280
											? banner.web_image
											: window.innerWidth >= 980
											? banner.tab_image
											: banner.mobile_image
									}
									alt="Image"
								/>
							</Banner>
						))}
					</Slider>
					<ArrowWrapper>
						<ArrowContainer onClick={previous}>
							<PrevArrow
								src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/left-arrow.png"
								alt="Image"
							/>
						</ArrowContainer>
						<ArrowContainer onClick={next}>
							<NextArrow
								src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/right-arrow.png"
								alt="Image"
							/>
						</ArrowContainer>
					</ArrowWrapper>
				</BannerLink>
				{imageLoaded && !isLoading ? <TrialContainer /> : <></>}
			</Container>
		);
	};

	const TrialContainer = () => {
		return (
			<Trial
				onClick={() => {
					if (is_explore) {
						user_profile.subscription_data.expired_subscription
							? navigate("/tech-schooling/subscribe/")
							: navigate("/");
					} else {
						navigate({
							pathname: location.pathname,
							search: `action=login`,
						});
					}
				}}
			>
				3 Day Trial Available
				{/* <Span></Span> */}
			</Trial>
		);
	};

	const awesomePlaceholder = (
		<ContainerDiv>
			<FirstDiv className="animation"></FirstDiv>
			<SecondDiv className="animation"></SecondDiv>
			<ThirdDiv className="animation">
				<span>Loading....</span>
			</ThirdDiv>
		</ContainerDiv>
	);
	return (
		<ReactPlaceholder
			type="media"
			ready={!isLoading}
			customPlaceholder={awesomePlaceholder}
		>
			{!isLoading && <Test />}
		</ReactPlaceholder>
	);
}
const Trial = styled.span`
	position: absolute;
	top: 0px;
	left: 0;
	z-index: 2;
	width: 160px;
	height: 32px;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	font-style: italic;
	font-size: 14px;
	justify-content: center;
	align-items: center;
	box-shadow: 1px 1px 1px 1px #fff0cc00;
	border-radius: 3px;
	font-family: "gordita_medium";
	background: #fac70a;
	background-size: 100%;
	animation: glow 3s linear infinite;
	overflow: hidden;
	@keyframes glow {
		0% {
			background: linear-gradient(
				to right,
				#fac70a 12%,
				#fff0cc00 20%,
				#fac70a 30%
			);
			background-position: -160px 0;
		}
		100% {
			background: linear-gradient(
				to right,
				#fac70a 12%,
				#fff0cc00 20%,
				#fac70a 30%
			);
			background-position: 160px 0;
		}
	}
	@media (max-width: 580px) {
		width: 150px;
		height: 30px;
		font-size: 13px;
		@keyframes glow {
			0% {
				background: linear-gradient(
					to right,
					#fac70a 12%,
					#fff0cc00 20%,
					#fac70a 30%
				);
				background-position: -150px 0;
			}
			100% {
				background: linear-gradient(
					to right,
					#fac70a 12%,
					#fff0cc00 20%,
					#fac70a 30%
				);
				background-position: 150px 0;
			}
		}
	}
	@media (max-width: 420px) {
		width: 135px;
		height: 26px;
		font-size: 12px;
		@keyframes glow {
			0% {
				background: linear-gradient(
					to right,
					#fac70a 12%,
					#fff0cc00 20%,
					#fac70a 30%
				);
				background-position: -135px 0;
			}
			100% {
				background: linear-gradient(
					to right,
					#fac70a 12%,
					#fff0cc00 20%,
					#fac70a 30%
				);
				background-position: 135px 0;
			}
		}
	}
`;
// const Span = styled.span`
//     position: absolute;
//     top: 0;
//     left: 31px;
//     background: linear-gradient(
//         to right,
//         #fac70a 12%,
//         #fff0cc00 20%,
//         #fac70a 30%
//     );
//     box-shadow: 0px 3px 22px #0000000a;
//     width: 40px;
//     height: 40px;
//     opacity: 0.4;
//     animation: glow 3s linear infinite;
//     overflow: hidden;
//     background: #fff;
//     background-position: 210px 0;
//     @keyframes glow {
//         0% {
//             background: linear-gradient(90deg, #fff -216%, #fff0cc00 119%);
//             box-shadow: 0px 3px 22px #0000000a;
//             left: 0;
//             background: #fff;
//             background-position: -210px 0;
//         }
//         100% {
//             background: linear-gradient(90deg, #fff -216%, #fff0cc00 119%);
//             box-shadow: 0px 3px 22px #0000000a;
//             left: 210px;
//             background: #fff;
//             background-position: 210px 0;
//         }
//     }
// `;
const WebImage = styled.img`
	display: block !important;
	width: 100%;
`;
const ContainerDiv = styled.div`
	width: 100%;
	height: 508px;
	padding: 100px 30px;
	& .animation {
		animation: placeHolderShimmer 2s linear 0s infinite normal;
		background: linear-gradient(
			to right,
			#eeeeee 8%,
			#eaeaea 18%,
			#eeeeee 33%
		);
		@keyframes placeHolderShimmer {
			0% {
				background-position: -468px 0;
			}
			100% {
				background-position: 468px 0;
			}
		}
	}
	@media (max-width: 640px) {
		padding: 52px 0px;
	}
	@media (max-width: 480px) {
		padding: 32px 0px;
		height: 240px;
	}
	@media (max-width: 360px) {
		height: 230px;
	}
`;
const FirstDiv = styled.div`
	width: 30%;
	height: 2em;
	background: linear-gradient(to right, #eeeeee 8%, #eaeaea 18%, #eeeeee 33%);
	@media (max-width: 768px) {
		width: 48%;
		height: 2em;
	}
	@media (max-width: 640px) {
		width: 58%;
	}
	@media (max-width: 480px) {
		height: 20px;
	}
`;
const SecondDiv = styled.div`
	width: 70%;
	height: 121px;
	background: linear-gradient(to right, #eeeeee 8%, #eaeaea 18%, #eeeeee 33%);
	margin-top: 41px;
	@media (max-width: 768px) {
		width: 82%;
		height: 71px;
	}
	@media (max-width: 640px) {
		width: 100%;
		height: 90px;
	}
	@media (max-width: 480px) {
		height: 61px;
		margin-top: 30px;
	}
	@media (max-width: 360px) {
		margin-top: 25px;
	}
`;
const ThirdDiv = styled.div`
	width: 30%;
	height: 52px;
	background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
	margin-top: 41px;
	border-radius: 31px;
	display: flex;
	align-items: center;
	justify-content: center;
	@media (max-width: 768px) {
		width: 46%;
		height: 52px;
	}
	@media (max-width: 640px) {
		width: 64%;
	}
	@media (max-width: 480px) {
		width: 60%;
		height: 37px;
		margin-top: 30px;
	}
	@media (max-width: 360px) {
		margin-top: 25px;
	}
`;
const Container = styled.div`
	cursor: pointer;
	position: relative;
	margin-top: ${({ user_profile }) =>
		user_profile.subscription_data &&
		user_profile.subscription_data.expired_subscription &&
		"30px"};
`;
const BannerLink = styled.div`
	display: block;
	position: relative;
	box-shadow: 0px 3px 94px #00000012;
	/* min-height: 508px; */
	@media (max-width: 640px) {
		/* min-height: 280px; */
	}
	@media (max-width: 360px) {
		/* min-height: 184px; */
	}
`;
const Banner = styled.div`
	width: 100%;
	display: block;
	border-radius: 12px;
	overflow: hidden;
`;
const ArrowWrapper = styled.div`
	position: absolute;
	right: 25px;
	bottom: 18px;
	display: flex;
	align-items: center;
	@media all and (max-width: 980px) {
		display: none;
	}
`;
const ArrowContainer = styled(Link)`
	height: 41px;
	width: 41px;
	display: block;
	&:first-child {
		margin-right: 7px;
	}
`;
const PrevArrow = styled.img`
	display: block;
	width: 100%;
`;
const NextArrow = styled.img`
	display: block;
	width: 100%;
`;
