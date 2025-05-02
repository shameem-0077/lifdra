import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { learnConfig } from "../../../../../axiosConfig";
import Loader from "../general/loaders/Loader";
import { useSelector, useDispatch } from "react-redux";

const NewAssessment = () => {
	const [assessments, setAssessments] = useState([]);
	const [setError] = useState(false);
	const user_data = useSelector((state) => state.user_data);
	const [isLoading, setLoading] = useState(true);
	const history = useHistory();
	const dispatch = useDispatch();
	useEffect(() => {
		let { access_token } = user_data;
		learnConfig
			.get(`/assessments/new-content/assessments/`, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})
			.then((response) => {
				setLoading(false);
				let { StatusCode, data } = response.data;
				if (StatusCode === 6000) {
					setAssessments(data);
				} else if (StatusCode === 6001) {
					setError(false);
				}
			})
			.catch((error) => {
				setLoading(false);

				dispatch({
					type: "UPDATE_ERROR",
					error: error,
					errorMessage: "Server error, please try again",
				});
			});
	}, []);

	return (
		<MainContainer>
			{isLoading ? (
				<LoaderContainer>
					<Loader />
				</LoaderContainer>
			) : assessments.length > 0 ? (
				<UpcomingCardContainer>
					{assessments.map((data) => (
						<UpcomingCard
							to={`/new-content/skills/assessments/view/${data.id}/`}
						>
							<TopicImage>
								<TopicImg src={data.image} />
							</TopicImage>
							<RightSection>
								<RightTop>
									<Id>#{data.auto_id}</Id>
									<Title>{data.title}</Title>
								</RightTop>
								<Designation>
									{data.designation}
								</Designation>
							</RightSection>
						</UpcomingCard>
					))}
				</UpcomingCardContainer>
			) : (
				<EmptyContanier>
					<ImageContainer>
						<Image
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/new-content/empty.svg"
							alt=""
						/>
					</ImageContainer>
					<ContentContainer>
						<ContentTitle>
							There are no assessments
						</ContentTitle>
						<Description>
							Currently, you have no assessments to
							attend
						</Description>
						<Button to="/tech-schooling/new-content/skills/">
							Go back
						</Button>
					</ContentContainer>
				</EmptyContanier>
			)}
		</MainContainer>
	);
};

export default NewAssessment;

const LoaderContainer = styled.div`
	min-height: 400px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const EmptyContanier = styled.div`
	text-align: center;
	@media screen and (max-width: 480px) {
		margin: 15px 0;
		box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
		padding: 25px;
		padding-bottom: 35px;
	}
	@media screen and (max-width: 360px) {
		padding: 18px;
		padding-bottom: 35px;
	}
`;

const ImageContainer = styled.div`
	margin: 20px 0;
`;
const Image = styled.img`
	width: 100%;
	max-width: 300px;
`;
const ContentContainer = styled.div``;
const ContentTitle = styled.h3`
	font-size: 22px;
	font-family: "gordita_medium";
	margin-bottom: 8px;
`;
const Description = styled.p`
	font-size: 16px;
	line-height: 20px;
	margin: 0 auto;
	margin-bottom: 15px;
	max-width: 80%;
	color: #747474;
	@media (max-width: 600px) {
		max-width: 100%;
	}
`;
const Button = styled(Link)`
	display: inline-block;
	background-color: #0a81fb;
	font-family: "gordita_medium";
	padding: 8px 42px;
	color: #fff;
	border-radius: 10px;
	@media all and (max-width: 480px) {
		font-size: 14px;
		padding: 7px 15px;
		border-radius: 7px;
	}
`;

const MainContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 20px;
	margin-top: 30px;
	@media all and (max-width: 980px) {
		grid-template-columns: 1fr;
	}
`;

const UpcomingCardContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 20px;
	@media all and (max-width: 1224px) {
		grid-template-columns: 1fr 1fr;
	}
	@media all and (max-width: 640px) {
		grid-template-columns: 1fr;
	}
`;

const UpcomingCard = styled(Link)`
	position: relative;
	padding: 20px;
	display: flex;
	align-items: center;
	margin-top: 10px;
	border-radius: 10px;
	cursor: pointer;
	width: 100%;
	background-color: #fafafa;
	&:first-child {
		margin-top: 0;
	}
	@media all and (max-width: 1280px) {
		margin-bottom: 10px;
		margin-top: 0;
		padding: 20px;
	}
	@media all and (max-width: 980px) {
		width: 100%;
	}
	@media all and (max-width: 640px) {
		flex-wrap: wrap;
	}
	@media all and (max-width: 361px) {
		padding: 12px;
	}
`;

const TopicImage = styled.div`
	width: 39%;
	margin-right: 20px;
`;

const TopicImg = styled.img`
	display: block;
	width: 100%;
	border-radius: 12px;
`;

const RightSection = styled.div``;

const RightTop = styled.div``;
const Id = styled.h3`
	color: #41c569;
	font-size: 17px;
`;

const Title = styled.h2`
	font-size: 18px;
	font-family: "gordita_medium";
	color: #333;
`;

const Designation = styled.p`
	font-size: 15px;
`;
