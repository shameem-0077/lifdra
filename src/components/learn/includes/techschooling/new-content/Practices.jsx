import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useHistory, useParams } from "react-router-dom";
import UpcomingListCard from "./UpcomingListCard";
import { serverConfig } from "../../../../../axiosConfig";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../general/loaders/Loader";

const Practices = () => {
	const [isLoading, setLoading] = useState(true);
	const [practices, setPractices] = useState([]);
	const [error, setError] = useState(false);
	const user_data = useSelector((state) => state.user_data);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		let { access_token } = user_data;
		serverConfig
			.get(`/practices/new-content/practices/`, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})
			.then((response) => {
				setLoading(false);
				let { status_code, data } = response.data;
				if (status_code === 6000) {
					setPractices(data);
				} else if (status_code === 6001) {
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
			) : practices.length > 0 ? (
				<UpcomingCardContainer>
					{practices.map((data) => (
						<UpcomingListCard data={data} />
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
							There are no practices
						</ContentTitle>
						<Description>
							Currently, you have no new practices to
							attend.
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

export default Practices;

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
	max-width: 60%;
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

const CardHead = styled.h2`
	font-size: 21px;
	text-align: left;
`;

const UpcomingContainer = styled.div`
	/* background-color: #fafafa;
    padding: 20px;
    @media all and (max-width: 480px) {
        padding: 20px 0;
    } */
`;

const Header = styled.h2`
	font-size: 19px;
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

const UpcomingCard = styled.div`
	display: flex;
	align-items: center;
	background-color: #fff;
	@media all and (max-width: 480px) {
		flex-direction: column;
	}
`;

const TopicImage = styled.div`
	width: 200px;

	margin-right: 20px;
	@media all and (max-width: 1280px) {
		width: 150px;
		margin-right: 10px;
	}
	@media all and (max-width: 480px) {
		width: 175px;
		margin-right: 0;
		margin-top: 25px;
	}
`;

const TopicImg = styled.img`
	display: block;
	width: 100%;
	border-radius: 12px;
`;

const RightSection = styled.div`
	@media all and (max-width: 480px) {
		margin: 25px 0;
	}
`;

const RightTop = styled.div`
	display: flex;
	align-items: center;
`;
const Id = styled.h3`
	color: #41c569;
	font-size: 19px;
	@media all and (max-width: 1280px) {
		font-size: 16px;
	}
`;

const Span = styled.span`
	color: #333333;
	font-family: "gordita_medium";
	font-size: 19px;
	margin: 0 5px;
	padding-bottom: 3px;
	@media all and (max-width: 1280px) {
		font-size: 16px;
	}
`;

const Title = styled.h2`
	font-size: 19px;
	@media all and (max-width: 1280px) {
		font-size: 16px;
	}
`;

const RightBottom = styled.div`
	margin-left: 40px;
	margin-top: 10px;
`;

const Designation = styled.p`
	font-size: 15px;
`;
const WorkshopContainerLeft = styled(Link)`
	padding: 22px;
	border: 1px solid #f0f0f0;
	border-radius: 25px;
	/* margin-top: 20px; */
	display: block;
	@media (max-width: 1280px) {
		border-radius: 14px;
	}
	@media all and (max-width: 980px) {
		padding: 23px;
		display: flex;
		width: 100%;
		position: relative;
		justify-content: space-between;
		padding: 23px;
		border-radius: 14px;
		overflow: hidden;
	}
	@media all and (max-width: 640px) {
		flex-wrap: wrap;
		padding: 0px;
		margin-top: 15px;
	}
`;
const LockedWorkshopContainerLeft = styled.div`
	cursor: not-allowed;
	padding: 22px;
	border: 1px solid #f0f0f0;
	border-radius: 25px;
	margin-top: 20px;
	display: block;
	position: relative;
	@media (max-width: 1280px) {
		border-radius: 14px;
	}
	@media all and (max-width: 980px) {
		padding: 23px;
		display: flex;
		width: 100%;
		position: relative;
		justify-content: space-between;
		padding: 23px;
		border-radius: 14px;
		overflow: hidden;
	}
	@media all and (max-width: 640px) {
		flex-wrap: wrap;
		padding: 0px;
		margin-top: 15px;
	}
	&:before {
		position: absolute;
		content: "";
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 50;
		background: rgba(255, 255, 255, 0.5);
	}
`;
const WorkshopContainerTop = styled.div`
	width: 100%;
	display: block;
	overflow: hidden;
	@media all and (max-width: 980px) {
		width: 45%;
		margin-right: 0px;
	}
	@media all and (max-width: 640px) {
		width: 100%;
		margin-right: 0px;
	}
`;
const WorkshopContainerTopimage = styled.img`
	width: 100%;
	display: block;
	min-height: 150px;
	max-height: 347px;
	object-fit: cover;
	border-radius: 15px;
	@media all and (max-width: 980px) {
		height: 220px;
	}
	@media all and (max-width: 768px) {
		height: 179px;
	}
	@media all and (max-width: 640px) {
		height: 246px;
	}

	@media all and (max-width: 480px) {
		height: 208px;
	}
`;
const WorkshopContainerBottom = styled.div`
	margin-top: 30px;
	@media all and (max-width: 1280px) {
		margin-top: 18px;
	}
	@media all and (max-width: 980px) {
		margin-top: 0;
		width: 51%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	@media all and (max-width: 640px) {
		padding: 20px;
		width: 100%;
	}
	@media all and (max-width: 480px) {
		padding: 21px;
	}
`;
const WorkshopContainerBottomContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	@media all and (max-width: 480px) {
		flex-wrap: wrap;
	}
`;
const WorkshopTop = styled.h3`
	color: #333333;
	font-family: "gordita_medium";
	font-size: 18px;
	width: 58%;
	/* @media all and (max-width: 1280px) {
        width: 100%;
    } */
	@media all and (max-width: 768px) {
		font-size: 16px;
	}
	@media all and (max-width: 640px) {
		font-size: 16px;
		width: 66%;
	}

	@media all and (max-width: 480px) {
		width: 100%;
	}
`;
const WorkshopContainerBottomSpan = styled.span`
	color: #49b27c;
	font-family: "gordita_medium";
	font-size: 18px;
	@media all and (max-width: 768px) {
		font-size: 16px;
	}
	@media all and (max-width: 480px) {
		font-size: 16px;
	}
`;
const MidSpan = styled.span`
	color: #333333;
	font-family: "gordita_medium";
	font-size: 18px;
	margin: 0 5px;
	@media all and (max-width: 640px) {
		font-size: 16px;
	}
`;
const ProgressLinkSpan = styled.span`
	@media all and (max-width: 480px) {
		margin-top: 20px;
	}
`;
const ProgressLink = styled(Link)`
	padding: 5px 19px;
	color: #fff;
	background-color: #f7ab2f;
	border-radius: 8px;
	font-size: 18px;
	display: flex;
	align-items: center;
	@media all and (max-width: 1280px) {
		position: absolute;
		width: 133px;
		right: 0px;
		top: 0px;
		border-radius: 0px;
		border-bottom-left-radius: 15px;
	}
	@media all and (max-width: 768px) {
		font-size: 16px;
	}
	@media all and (max-width: 640px) {
		padding: 3px 14px;
		justify-content: center;
	}
`;
const WorkshopContainerBottomAssets = styled.ul`
	display: flex;
	align-items: center;
	margin-top: 30px;
	@media all and (max-width: 1280px) {
		margin-top: 6px;
	}
	@media all and (max-width: 980px) {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-top: 10px;
	}
	@media all and (max-width: 640px) {
		margin-top: 20px;
	}
`;
const WorkshopContainerBottomAsset = styled.li`
	color: #9b9b9b;
	margin-right: 30px;
	display: flex;
	&:last-child {
		margin-right: 0px;
	}
`;
const Icon = styled.i`
	color: #9b9b9b;
	font-size: 20px;
	margin-right: 5px;
`;
const IconContent = styled.span`
	font-size: 16px;
	@media all and (max-width: 980px) {
		font-size: 15px;
		display: flex;
		align-items: center;
		background: #ffffff;
		border-radius: 15px;
		width: 100%;
	}
	@media all and (max-width: 640px) {
		font-size: 15px;
	}
`;
const WorkshopRight = styled.div`
	background-color: #fafafa;
	width: 57%;
	padding: 30px 20px;
	@media all and (max-width: 1280px) {
		width: 100%;
		/* margin-top: 50px; */
	}
	@media all and (max-width: 480px) {
	}
`;
const MainTitleRight = styled.div`
	color: #1e4e52;
	font-size: 24px;
	margin-bottom: 10px;
	font-family: "baloo_paaji_2Regular";
	@media all and (max-width: 480px) {
		font-size: 22px;
		margin-bottom: 7px;
	}
`;
const WorkshopRightContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 12px;
`;
const Feedback = styled.div`
	margin-top: 10px;
	width: 100%;
	/* @media all and (max-width: 1280px) {
        margin-top: 12px;
    } */
`;
const Workshopmain = styled.div`
	width: 41%;
	@media all and (max-width: 1280px) {
		width: 100%;
	}
`;
const LockedWorkshop = styled.div`
	margin-top: 30px;
	@media (max-width: 1280px) {
		width: 96%;
	}
	@media (max-width: 980px) {
		width: 100%;
	}
`;
// const Title = styled.h3`
//     color: #1e4e52;
//     font-size: 24px;
//     font-family: "baloo_paaji_2Regular";
//     @media all and (max-width: 480px) {
//         font-size: 22px;
//     }
// `;
const LockedWorkShopCards = styled.div`
	margin-top: 20px;
	/* @media all and (max-width: 1280px) {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
    } */
	@media all and (max-width: 980px) {
		flex-wrap: wrap;
	}
	@media all and (max-width: 640px) {
		flex-wrap: wrap;
	}
`;
