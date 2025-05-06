import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { serverConfig } from "../../../../../axiosConfig";
import SkillCard from "./SkillCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../general/loaders/Loader";

function NewContent(props) {
	const user_data = useSelector((state) => state.user_data);
	const [skills, setSkills] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [designations, setDesignations] = useState([]);

	
	useEffect(() => {
		let { access_token } = user_data;

		serverConfig
			.get(`/learn/new-content/skills/tech-schooling/`, {
				headers: { Authorization: `Bearer ${access_token}` },
			})
			.then((response) => {
				setLoading(false);
				let { status_code, data } = response.data;
				if (status_code === 6000) {
					setSkills(data);
					let list = [];
					data.forEach((item) => {
						list.push(item.designation_name);
					});
					list = [...new Set(list)];
					setDesignations(list);
				}
			})
			.catch((error) => setLoading(false));
	}, [props.subject_slug]);

	const [color] = useState([
		"linear-gradient(#36d1dc,#5b86e5)",
		"linear-gradient(#ffafbd,#ffc3a0)",
		"linear-gradient(#2193b0,#6dd5ed)",
		"linear-gradient(#cc2b5e,#753a88)",
		"linear-gradient(#42275a,#734b6d)",
		"linear-gradient(#de6262,#ffb88c)",
		"linear-gradient(#06beb6,#48b1bf)",
		"linear-gradient(#eb3349,#f45c43)",
		"linear-gradient(#56ab2f,#a8e063)",
		"linear-gradient(#614385,#516395)",
		"linear-gradient(#02aab0,#00cdac)",
	]);

	return isLoading ? (
		<LoaderContainer>
			<Loader />
		</LoaderContainer>
	) : skills.length > 0 ? (
		<MainContainer>
			{designations.map((data) => (
				<WebContainer>
					<WebHeading>{data}</WebHeading>
					<CardsContainer>
						{skills
							.filter(
								(items) =>
									items.designation_name === data
							)
							.sort((a, b) => a.order_id - b.order_id)
							.map((data, index) => (
								<SkillCard
									data={data}
									background={color[index]}
									subject_slug={props.subject_slug}
								/>
							))}
					</CardsContainer>
				</WebContainer>
			))}
		</MainContainer>
	) : (
		<EmptyContanier>
			<ImageContainer>
				<Image
					src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/new-content/empty.svg"
					alt=""
				/>
			</ImageContainer>
			<ContentContainer>
				<ContentTitle>No new contents</ContentTitle>
				<Description>
					Currently, you have no new contents
				</Description>
				<Button to={`/`}>Go to learn dashboard</Button>
			</ContentContainer>
		</EmptyContanier>
	);
}

export default NewContent;

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
	font-size: 20px;
	font-family: gordita_medium;
	margin-bottom: 8px;
`;
const Description = styled.p`
	font-size: 14px;
	line-height: 20px;
	margin: 0 auto;
	font-family: gordita_regular;
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
	/* display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    @media all and (max-width: 1290px) {
        grid-template-columns: 1fr 1fr;
    }
    @media all and (max-width: 768px) {
        grid-template-columns: 1fr;
    } */
`;
const WebContainer = styled.div`
	padding-bottom: 50px;
`;

const WebHeading = styled.h2`
	font-size: 21px;
	font-family: gordita_medium;
	margin: 20px 0;
`;
const CardsContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 30px;
	@media all and (max-width: 1400px) {
		grid-template-columns: 1fr 1fr;
	}
	@media all and (max-width: 768px) {
		grid-template-columns: 1fr;
		grid-gap: 20px;
	}
	@media all and (max-width: 480px) {
		margin-right: -15px;
	}
`;
