import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { learnConfig } from "../../../../axiosConfig";

function TechSchoolingMembershipFee() {
	const dispatch = useDispatch();
	const steps = [
		{
			id: 1,
			title: "Steyp's Aptitude Test",
			abbr: "(SAT)",
			isabbr: true,
			icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/interview.svg",
			description:
				"To get access to Steyp's Tech Schooling program the candidate have to clear SAT.",
		},
		{
			id: 2,
			title: "Selection ",
			abbr: "",
			isabbr: false,
			icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/selection.svg",
			description: "Selection will be based on the SAT scores.",
		},
		{
			id: 3,
			title: "Program",
			abbr: "",
			isabbr: false,
			icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/06-05-2022/program.svg",
			description: "The training will be done through Steyp's platform.",
		},
		{
			id: 4,
			title: "Certificate",
			abbr: "",
			isabbr: false,
			icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/06-05-2022/certificate.svg",
			description:
				"After the successful completion of the program. Candidates can download the digital certificate through the platform.",
		},
	];

	const [plans, setPlans] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);
	const fetchData = () => {
		learnConfig.get(`subscriptions/plan-category/`).then((response) => {
			let { StatusCode, data } = response.data;
			if (StatusCode === 6000) {
				setPlans(data.filter((item) => item.name === ""));
			}
		});
	};
	const handleModal = () => {
		dispatch({
			type: "TOGGLE_TECH_DEGREE_FORM_MODAL",
		});
	};
	return (
		<Container>
			<Cover className="wrapper">
				<LeftSection>
					<Title>Tech Schooling Fee</Title>
					<Description>
						{/* <span> Upload your valid ID card </span>and get <small>50% </small>off on
                        your package. */}
						Students who have cleared SAT can pay a one-time fee for{" "}
						<HighlightedText>1 Year</HighlightedText> to avail the
						membership
					</Description>

					<Card>
						<TopSection>
							<Icon>
								<img
									src={
										"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/6-months.svg"
									}
									alt="icon"
								/>
							</Icon>
							<Period>1 Year</Period>
						</TopSection>
						<PriceSection>
							<Label>Our Price</Label>
							<DiscountPrice>₹ 20,000</DiscountPrice>
							{/* <Price>₹ 44000</Price> */}
							<Terms>* Terms and conditions apply</Terms>
						</PriceSection>
					</Card>
				</LeftSection>
				<RightSection>
					{steps.map((data) => (
						<StepCard key={data.id}>
							<CardIcon>
								<img src={data.icon} alt="" />
							</CardIcon>
							<CardContent
							// style={{ paddingTop: data.id === 1 && 0 }}
							>
								{data.button ? (
									<ApplyNow onClick={handleModal}>
										{data.title}
									</ApplyNow>
								) : (
									<CardTitle>
										{data.title}{" "}
										{data.isabbr ? (
											<Span>{data.abbr}</Span>
										) : (
											""
										)}
									</CardTitle>
								)}
								<DetailsBox>
									<Details>{data.description}</Details>
									{data.isabbr ? (
										<KnowMoreBtn to="/sat/">
											Know more
										</KnowMoreBtn>
									) : (
										""
									)}
								</DetailsBox>
							</CardContent>
						</StepCard>
					))}
				</RightSection>
			</Cover>
		</Container>
	);
}

const Container = styled.div`
	padding: 140px 0;
	@media all and (max-width: 1280px) {
		padding: 120px 0;
	}
	@media all and (max-width: 640px) {
		padding: 100px 0;
	}
	@media all and (max-width: 480px) {
		padding: 60px 0;
	}
	@media all and (max-width: 360px) {
		padding: 40px 0;
	}
`;
const LeftSection = styled.div``;
const RightSection = styled.div``;
const Cover = styled.div`
	display: grid;
	grid-template-columns: 3fr 4fr;
	grid-gap: 50px;
	@media all and (max-width: 980px) {
		grid-template-columns: 1fr;
		text-align: center;
	}
`;

const Title = styled.h3`
	font-size: 34px;
	color: #2d2d2d;
	font-family: gordita_medium;
	position: relative;
	margin-bottom: 20px;
	position: relative;
	&::before {
		content: "";
		position: absolute;
		top: -60px;
		left: -70px;
		width: 200px;
		height: 200px;
		opacity: 0.8;
		background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/color.png")
			no-repeat;
		background-size: 200px;
		background-position: center;
		display: block;
		z-index: -1;
	}

	@media all and (max-width: 1280px) {
		font-size: 32px;
		margin-bottom: 20px;
	}
	@media all and (max-width: 980px) {
		&::before {
			left: 50%;
		}
	}
	@media all and (max-width: 640px) {
		font-size: 26px;
	}
	@media all and (max-width: 480px) {
		font-size: 24px;
	}
	@media all and (max-width: 480px) {
		margin-bottom: 15px;
	}
`;
const Description = styled.p`
	font-size: 16px;
	color: #666666;
	margin-bottom: 100px;
	max-width: 83%;
	line-height: 30px;

	/* 
    span {
        font-size: inherit;
        position: relative;
        color: #0fa76f;

        &::before {
            content: "";
            position: absolute;
            top: 18px;
            right: 0;
            width: 100%;
            height: 20px;
            background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/line.svg")
                no-repeat;
            background-size: contain;
            display: block;
            z-index: -1;
        }
    } */
	small {
		color: #0fa76f;
		font-family: gordita_medium;
		font-size: 16px;
	}
	@media all and (max-width: 1280px) {
		font-size: 15px;
		margin-bottom: 80px;
	}
	@media all and (max-width: 980px) {
		margin: 0 auto 80px;
	}
	@media all and (max-width: 640px) {
		margin-bottom: 50px;
		line-height: 1.8;
	}
	@media all and (max-width: 480px) {
		margin-bottom: 40px;
		font-size: 13px;
		/* small {
            font-size: 14px;
        } */
	}
`;
const HighlightedText = styled.span`
	font-size: 16px;
	color: #0fa76f;
	font-family: gordita_bold;

	position: relative;
	&::before {
		content: "";
		position: absolute;
		top: 20px;
		right: 0;
		display: inline-block;
		width: 100%;
		height: 4px;
		background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/line.svg")
			no-repeat;
		background-size: contain;
		display: block;
		z-index: -1;
	}

	@media all and (max-width: 1280px) {
		font-size: 15px;
	}
	@media all and (max-width: 480px) {
		font-size: 13px;
		/* small {
            font-size: 14px;
        } */
	}
`;

const Card = styled.div`
	padding: 30px 40px;
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	background-color: #fff;
	max-width: 380px;
	@media all and (max-width: 1100px) {
		padding: 20px 30px;
	}
	@media all and (max-width: 980px) {
		max-width: 400px;
		padding: 30px 40px;
		margin: 0 auto;
	}

	@media all and (max-width: 640px) {
		padding: 20px 30px;
	}
`;
const TopSection = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding-bottom: 20px;
	border-bottom: 1px dashed #00000014;
`;
const Icon = styled.span`
	width: 50px;
	display: block;
	margin-right: 20px;
	img {
		display: block;
		width: 100%;
	}
	@media all and (max-width: 980px) {
		width: 60px;
	}
	@media all and (max-width: 640px) {
		width: 50px;
	}
	@media all and (max-width: 360px) {
		width: 40px;
	}
`;
const Period = styled.p`
	font-size: 24px;
	font-family: gordita_medium;
	color: #383f50d9;
	transform: translateY(4px);
	@media all and (max-width: 1100px) {
		font-size: 22px;
	}
	@media all and (max-width: 980px) {
		font-size: 26px;
	}
	@media all and (max-width: 640px) {
		font-size: 24px;
	}
	@media all and (max-width: 360px) {
		font-size: 20px;
	}
`;
const PriceSection = styled.div`
	padding: 30px 0 20px;
	text-align: center;
	@media all and (max-width: 1100px) {
		padding: 25px 0 10px;
	}
`;
const Label = styled.p`
	text-transform: capitalize;
	color: #0fa76f;
	font-family: gordita_medium;
	font-size: 14px;
	@media all and (max-width: 980px) {
		font-size: 16px;
	}
	@media all and (max-width: 640px) {
		font-size: 14px;
	}
`;
const DiscountPrice = styled.h4`
	font-size: 34px;
	font-family: gordita_bold;
	color: #0fa76f;
	margin-bottom: 10px;
	@media all and (max-width: 1100px) {
		font-size: 32px;
	}
	@media all and (max-width: 980px) {
		font-size: 34px;
	}
	@media all and (max-width: 640px) {
		font-size: 32px;
	}
	@media all and (max-width: 360px) {
		font-size: 30px;
	}
`;
const Price = styled.p`
	font-size: 22px;
	font-family: gordita_medium;
	color: #383f50;
	position: relative;
	&::before {
		content: "";
		position: absolute;
		top: 5px;
		left: 0;
		width: 100%;
		height: 20px;
		background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/green-line.svg")
			no-repeat;
		background-size: 110px;
		background-position: center;
		display: block;
		z-index: 0;
	}
	@media all and (max-width: 980px) {
		font-size: 26px;
		&::before {
			top: 8px;
		}
	}
	@media all and (max-width: 640px) {
		font-size: 22px;
		&::before {
			top: 5px;
		}
	}

	@media all and (max-width: 360px) {
		font-size: 18px;
	}
`;
const Terms = styled.p`
	color: #373e4f;
	font-size: 10px;
	font-family: gordita_medium;
	@media all and (max-width: 980px) {
		font-size: 12px;
	}
	@media all and (max-width: 640px) {
		font-size: 10px;
	}
`;
const StepCard = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	position: relative;
	&::before {
		content: "";
		height: 95%;
		width: 2px;
		border-left: 2px dashed #6fc9b0;
		position: absolute;
		display: block;
		top: 50%;
		left: 20px;
		z-index: -1;
	}
	&:last-child {
		&::before {
			display: none;
		}
	}

	@media all and (max-width: 640px) {
		&::before {
			left: 15px;
		}
	}
	@media all and (max-width: 480px) {
		&::before {
			left: 18px;
		}
	}
	@media all and (max-width: 360px) {
		&::before {
			left: 15px;
		}
	}
`;
const CardIcon = styled.span`
	width: 40px;
	min-width: 40px;
	display: block;
	margin-right: 30px;

	img {
		display: block;
		width: 100%;
	}
	@media all and (max-width: 640px) {
		width: 30px;
		min-width: 30px;
		margin-right: 20px;
	}
	@media all and (max-width: 480px) {
		width: 36px;
		min-width: 36px;
	}
	@media all and (max-width: 360px) {
		width: 30px;
		min-width: 30px;
	}
`;
const CardContent = styled.div`
	flex: 1;
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-gap: 30px;
	align-items: center;
	border-bottom: 1px solid #f0eded;
	padding: 40px 0;
	&::first-child {
		padding-top: 0 !important;
	}
	@media all and (max-width: 640px) {
		padding: 30px 0;
		grid-gap: 20px;
	}
	@media all and (max-width: 480px) {
		grid-gap: 10px;
		padding: 20px 0;
		grid-template-columns: 1fr;
		text-align: left;
	}
`;
const ApplyNow = styled.span`
	cursor: pointer;
	display: block;
	font-size: 22px;
	font-family: gordita_medium;
	color: #2d2d2d;
	@media all and (max-width: 640px) {
		font-size: 20px;
	}
	@media all and (max-width: 480px) {
		font-size: 18px;
	}
`;
const CardTitle = styled.h4`
	font-size: 22px;
	font-family: gordita_medium;
	color: #2d2d2d;
	@media all and (max-width: 640px) {
		font-size: 20px;
	}
	@media all and (max-width: 480px) {
		font-size: 18px;
	}
`;
const Span = styled.span`
	font-size: 22px;
	font-family: gordita_medium;
	color: #0fa76f;
	@media all and (max-width: 640px) {
		font-size: 20px;
	}
	@media all and (max-width: 480px) {
		font-size: 18px;
	}
`;
const DetailsBox = styled.div`
	position: relative;
`;
const Details = styled.p`
	font-size: 16px;
	@media all and (max-width: 694px) {
		text-align: left;
	}
	@media all and (max-width: 640px) {
		font-size: 14px;
	}
	@media all and (max-width: 480px) {
		font-size: 13px;
	}
`;
const KnowMoreBtn = styled(Link)`
	position: absolute;
	bottom: 2px;
	right: 0;
	cursor: pointer;
	color: #0fa76f;
	font-family: gordita_medium;
	text-decoration: underline;
	/* border-bottom: 1px solid #0fa76f; */
	font-size: 14px;
	text-align: center;
	display: block;
	@media all and (max-width: 1467px) {
		right: -46px;
	}
	@media all and (max-width: 1414px) {
		right: -13px;
		bottom: -25px;
	}
	@media all and (max-width: 1274px) {
		right: 5px;
		bottom: 0px;
	}
	@media all and (max-width: 1087px) {
		right: 22px;
		bottom: -23px;
	}
	@media all and (max-width: 694px) {
		bottom: 2px;
	}
	@media all and (max-width: 677px) {
		right: -9px;
	}
	@media all and (max-width: 641px) {
		right: 25px;
		bottom: -25px;
	}
	@media all and (max-width: 587px) {
		bottom: 0px;
		font-size: 13px;
	}
	@media all and (max-width: 493px) {
		bottom: -20px;
	}
	@media all and (max-width: 481px) {
		bottom: 0px;
	}
	@media all and (max-width: 438px) {
		bottom: -15px;
		font-size: 12px;
	}
	@media all and (max-width: 378px) {
		bottom: 0px;
	}
`;

export default TechSchoolingMembershipFee;
