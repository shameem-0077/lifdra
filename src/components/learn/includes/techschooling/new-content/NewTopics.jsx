import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { serverConfig } from "../../../../../axiosConfig";
import { useSelector } from "react-redux";
import TopicsCard from "./TopicsCard";

function NewLessons({ subject_slug }) {
	const { id } = useParams();
	const [topics, setTopics] = useState([]);
	const [error, setError] = useState(false);
	const user_data = useSelector((state) => state.user_data);

	useEffect(() => {
		fetchLessons();
	}, []);

	const fetchLessons = () => {
		let { access_token } = user_data;
		learnConfig
			.get(`learn/new-content/topics/${id}/`, {
				headers: { Authorization: `Bearer ${access_token}` },
			})
			.then((response) => {
				let { StatusCode, data } = response.data;
				if (StatusCode === 6000) {
					setTopics(data);
				} else if (StatusCode === 6001) {
					setError(true);
				}
			});
	};
	return (
		<Topics>
			<TopicsGrid>
				<TopicsCard
					topics={topics}
					subject_slug={subject_slug}
				/>
			</TopicsGrid>
		</Topics>
	);
}

export default NewLessons;

const Topics = styled.div``;
const Title = styled.h3`
	margin: 25px 0px;
	font-size: 21px;
	/* font-family: "gordita_medium"; */
	font-family: "gordita_medium";
`;

const TopicsGrid = styled.div`
	display: grid;
	grid-gap: 30px;
	grid-template-columns: 1fr 1fr 1fr;
	margin-top: 20px;

	@media only screen and (max-width: 980px) {
		grid-template-columns: 1fr 1fr;
		margin-top: 15px;
	}
	@media only screen and (max-width: 640px) {
		grid-template-columns: 1fr;
		margin-top: 10px;
	}
`;
