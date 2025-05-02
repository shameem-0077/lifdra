import React from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

function NewContentNavBar({ subject_slug }) {
	const { id } = useParams();
	return (
		<NavigBar>
			<NavigItem
				exact
				to={`/new-content/skills/${id}/lessons/`}
				activeClassName="active"
			>
				Learning
			</NavigItem>
			{/* <NavigItem
                exact
                to={`/tech-schooling/new-content/skills/${id}/practices/`}
                activeClassName="active"
            >
                Practices
            </NavigItem>
            <NavigItem
                exact
                to={`/tech-schooling/new-content/skills/${id}/workshops/`}
                activeClassName="active"
            >
                Workshops
            </NavigItem>
            <NavigItem
                to={`/tech-schooling/new-content/skills/${id}/assessments/`}
                activeClassName="active"
            >
                Assessments
            </NavigItem> */}
		</NavigBar>
	);
}

export default NewContentNavBar;

const NavigBar = styled.div`
	padding-bottom: 6px;
	border-bottom: 2px solid #e8f0fe;
`;
const NavigItem = styled(NavLink)`
	font-size: 19px;
	padding-bottom: 5px;
	color: #464b4e;
	font-family: "gordita_medium";
	margin-right: 70px;
	&:last-child {
		margin-right: 0;
	}
	&.active {
		border-bottom: 4px solid #41c569;
	}
	@media only screen and (max-width: 480px) {
		margin-right: 30px;
	}
	@media only screen and (max-width: 360px) {
		margin-right: 25px;
		font-size: 17px;
	}
`;
