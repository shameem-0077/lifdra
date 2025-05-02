import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { learnConfig } from "../../../../../axiosConfig";
import LessonsCard from "./LessonsCard";
import { useSelector } from "react-redux";
import Loader from "../general/loaders/Loader";

function NewLessons({ subject_slug }) {
	const { id } = useParams();
	const [lessons, setLessons] = useState([]);
	const [error, setError] = useState(false);
	const user_data = useSelector((state) => state.user_data);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		fetchLessons();
	}, []);

	const fetchLessons = () => {
		let { access_token } = user_data;
		learnConfig
			.get(`learn/new-content/lessons/${id}/`, {
				headers: { Authorization: `Bearer ${access_token}` },
			})
			.then((response) => {
				setLoading(false);
				let { StatusCode, data } = response.data;
				if (StatusCode === 6000) {
					setLessons(data);
				} else if (StatusCode === 6001) {
					setError(true);
				}
			});
	};

	return (
		<Lessons>
			{isLoading ? (
				<LoaderContainer>
					<Loader />
				</LoaderContainer>
			) : (
				<LessonGrid>
					<LessonsCard
						lessons={lessons}
						subject_slug={subject_slug}
					/>
				</LessonGrid>
			)}
		</Lessons>
	);
}

export default NewLessons;

const LoaderContainer = styled.div`
	min-height: 400px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Lessons = styled.div``;
const Title = styled.h3`
	margin: 25px 0px;
	font-size: 21px;
	/* font-family: "gordita_medium"; */
	font-family: "gordita_medium";
`;
const LessonGrid = styled.div`
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
