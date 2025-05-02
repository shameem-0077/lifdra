import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import $ from "jquery";
import Slider from "react-slick";
import { truncateString } from "../../../../../helpers/functions";
import { learnConfig } from "../../../../../../axiosConfig";
import StoriesTestimonial from "../../../general/steyp-landing-page/modal/StoriesTestimonial";
import quotes from "../../../../../../assets/images/web/test.svg";

function Customers() {
	const location = useLocation();
	const [isModal, setModal] = useState(false);
	const [testimonials, setTestimonials] = useState([]);
	const [personId, setPersonId] = useState(0);

	useEffect(() => {
		const fetchData = () => {
			learnConfig
				.get(`promotions/testimonials`)
				.then((response) => {
					const { StatusCode, data } = response.data;
					if (StatusCode === 6000) {
						setTestimonials(data);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		};

		fetchData();
	}, []);

	// next and prev button
	let slider = useRef();
	const next = () => {
		slider.slickNext();
	};
	const previous = () => {
		slider.slickPrev();
	};

	const settings = {
		dots: false,
		infinite: true,
		speed: 100,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	useEffect(() => {
		if (isModal) {
			$("html").addClass("modal-enabled");
		} else {
			$("html").removeClass("modal-enabled");
		}
	}, [isModal]);

	return (
		<>
			{isModal && (
				<StoriesTestimonial
					isModal={isModal}
					setModal={setModal}
					personId={personId}
					storieData={testimonials}
					setPersonId={setPersonId}
				/>
			)}
			<Contanier className="wrapper">
				<Top>
					<Heading>
						<h4>
							We have <span>achieved</span> a lot of satisfied{" "}
							<small> students!</small>
						</h4>
						<NavigateButton
							to={`${location.pathname}?action=phone`}
						>
							Start free trial
						</NavigateButton>
					</Heading>
					<Para>
						Review of the students who chose Steyp for their career
						growth.
					</Para>
				</Top>
				<Slider
					ref={(c) => {
						slider = c;
					}}
					{...settings}
				>
					{testimonials &&
						testimonials.map((data) => (
							<Div>
								<Testimonial key={data.id}>
									{data.student_image && (
										<Image>
											<img
												src={data.student_image}
												alt={data.student_name}
											/>
										</Image>
									)}
									<Content noImage={data.student_image}>
										<ParaMini>
											{truncateString(
												data.description,
												210
											)}
											{data.description.length > 210 && (
												<Span
													onClick={(e) => {
														e.preventDefault();
														setModal(true);
														setPersonId(data.id);
													}}
												>
													{" "}
													See More
												</Span>
											)}
										</ParaMini>

										<Info>
											<LeftInfo>
												<Social>
													<Name>
														-{data.student_name}
													</Name>
													{data.linkedin_url && (
														<Icon
															target="_blank"
															href={
																data.linkedin_url
															}
														>
															<img
																src={
																	"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/linkedin.svg"
																}
																alt=""
															/>
														</Icon>
													)}
												</Social>
												{data.student_class && (
													<Class>
														{"class" +
															" " +
															data.student_class}
													</Class>
												)}

												<IdelName>
													{data.student_school}
												</IdelName>
											</LeftInfo>
										</Info>
									</Content>
								</Testimonial>
								<Arrow>
									<LeftArrow onClick={previous}>
										<img
											src={
												"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/arrow-circle.svg"
											}
											alt=""
										/>
									</LeftArrow>
									<RightArrow onClick={next}>
										<img
											src={
												"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/arrow-circle.svg"
											}
											alt=""
										/>
									</RightArrow>
								</Arrow>
							</Div>
						))}
				</Slider>
			</Contanier>
		</>
	);
}

export default Customers;
const MainContainer = styled.div``;
const Contanier = styled.div`
	.slick-dots {
		display: none !important;
	}
	.slick-next {
		display: none !important;
	}
	.slick-prev {
		display: none !important;
	}
	padding: 90px 0;
	@media all and (max-width: 1280px) {
		padding: 70px 0;
	}
	@media all and (max-width: 1080px) {
		padding: 60px 0;
	}
`;
const Top = styled.div``;
const Div = styled.div`
	position: relative;
`;
const Heading = styled.h3`
	display: flex;
	justify-content: space-between;
	margin-bottom: 16px;
	small {
		position: relative;
		font-family: gordita_medium;
		display: inline;
		color: #000;
		font-size: 32px;
		@media all and (max-width: 1080px) {
			display: inline-block;
		}
		@media all and (max-width: 640px) {
			font-size: 24px;
		}
		@media all and (max-width: 480px) {
			font-size: 21px;
		}
		@media all and (max-width: 360px) {
			font-size: 20px;
		}
		::before {
			content: "";
			background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/line.svg");
			height: 13px;
			width: 145px;
			display: block;
			background-repeat: no-repeat;
			position: absolute;
			top: 85%;
			left: 4%;
			@media all and (max-width: 1080px) {
				top:80%;
			
			}
			@media all and (max-width: 640px) {
				left: 4%;
				width: 108px;
				

			}
			@media all and (max-width: 480px) {
				left: 4%;
				height: 11px;
				width: 94px;
			}
		}
	}

	h4 {
		font-family: gordita_medium;
		color: #000;
		font-size: 32px;
		@media all and (max-width: 1080px) {
			width: 70%;
		}
		@media all and (max-width: 640px) {
			font-size: 24px;
		}
		@media all and (max-width: 480px) {
			width: 100%;
			font-size: 21px;
		}
		span {
			color: #0e9f6a;
			font-family: gordita_medium;
		}
	}
`;
const Para = styled.p`
	font-size: 16px;
	margin-bottom: 28px;
	@media all and (max-width: 1080px) {
		margin-bottom: 0;
	}
	@media all and (max-width: 640px) {
		font-size: 14px;
	}
	@media all and (max-width: 360px) {
		margin-bottom: 10px;
	}
`;
const Testimonial = styled.div`
	padding-top: 90px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding-left: 10px;
	@media all and (max-width: 1280px) {
		padding-top: 80px;
	}
	@media all and (max-width: 980px) {
		align-items: start;
	}
	@media all and (max-width: 768px) {
		padding-top: 50px;
		align-items: center;
		flex-direction: column;
	}
`;
const Image = styled.div`
	width: 22%;
	border-radius: 4%;
	height: 272px;
	overflow: hidden;
	
	@media all and (max-width: 1280px) {
		width: 25%;
		height: 227px;
	}
	@media all and (max-width: 980px) {
		height: 235px;
	}
	@media all and (max-width: 768px) {
		width: 160px;
		height: 160px;
		margin-bottom: 15px;
		border-radius: 10px;
	}
	@media all and (max-width: 640px) {
		width: 130px;
		height: 130px;
	}
	@media all and (max-width: 360px) {
		width: 110px;
		height: 110px;
	}
	img {
		width: 100%;
		display: block;
		height: 100%;
		object-fit: cover;
	}
`;
const Content = styled.div`
	width: 70%;
	width: ${(props) => (props.noImage ? "70%" : "100%")};
	@media all and (max-width: 768px) {
		width: 93%;
	}
	@media all and (max-width: 480px) {
		width: 85%;
	}
`;
const ParaMini = styled.p`
	color: #101828;
	font-family: gordita_medium !important;
	font-size: 24px;
	font-weight: 500;
	line-height: 36px;
	letter-spacing: -0.72px;
	margin-bottom: 20px;
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
		font-size: 23px;
		font-weight: 500;
		line-height: 40px;
		letter-spacing: -0.72px;
		margin-bottom: 16px;
	}
	@media all and (max-width: 1080px) {
		font-size: 20px;
		font-weight: 500;
		line-height: 33px;
		margin-bottom: 6px;
	}
	@media all and (max-width: 980px) {
		font-size: 16px;
	}
	@media all and (max-width: 640px) {
		font-size: 16px;
		line-height: 24px;
	}
	@media all and (max-width: 480px) {
		font-size: 14px;
		line-height: 21px;
	}
`;
const Span = styled.small`
	color: #099250;
	cursor: pointer;
`;
const Info = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const LeftInfo = styled.div``;
const Name = styled.div`
	font-size: 20px;
	font-family: gordita_medium;
	color: #101828;
	margin-right: 15px;
	@media all and (max-width: 1080px) {
		font-size: 18px;
	}
	@media all and (max-width: 980px) {
		font-size: 16px;
	}
	@media all and (max-width: 640px) {
		font-size: 14px;
	}
	@media all and (max-width: 480px) {
		margin-bottom: 10px;
		margin-right: 10px;
	}
	@media all and (max-width: 360px) {
		margin-bottom: 8px;
		margin-right: 8px;
	}
`;
const Class = styled.div`
	padding: 4px 2px;
	color: #344054;
	box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
	border-radius: 6px;
	border: 1px solid #d0d5dd;
	background: #fff;
	font-family: gordita_medium !important;
	display: inline-block;
	margin-right: 8px;
	font-size: 14px;
	@media all and (max-width: 980px) {
		font-size: 13px;
	}
`;
const IdelName = styled.span`
	color: #667085;
	display: inline-block;
	font-size: 14px;
	margin-bottom: 16px;
	@media all and (max-width: 980px) {
		font-size: 13px;
	}
	@media all and (max-width: 480px) {
		margin-bottom: 20px;
	}
	@media all and (max-width: 360px) {
		margin-bottom: 0px;
		font-size: 10px;
	}
`;
const Social = styled.div`
	display: flex;
`;
const Icon = styled.a`
	height: 24px;
	width: 24px;
	cursor: pointer;
	margin-right: 16px;
	img {
		width: 100%;
		display: block;
	}
	@media all and (max-width: 480px) {
		width: 20px;
		height: 20px;
	}
	@media all and (max-width: 360px) {
		width: 18px;
		height: 18px;
	}
`;
const Arrow = styled.div`
	position: absolute;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		width: 100%;
		display: block;
	}
	@media all and (max-width: 768px) {
		top: 0;
		bottom: unset;
	}
`;
const LeftArrow = styled.div`
	margin-right: 26px;
	cursor: pointer;
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
	@media all and (max-width: 1080px) {
		height: 42px;
		padding: 8px 15px;
	}
	@media all and (max-width: 480px) {
		display: none;
		padding: 7px 13px;
	}
`;
