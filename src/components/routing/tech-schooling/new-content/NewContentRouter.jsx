import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate, useParams, NavLink } from "react-router-dom";
// import styled from "styled-components";
// import { serverConfig } from "../../../../axiosConfig";
import NewAssessment from "../../../learn/includes/techschooling/new-content/NewAssessment";
// import NewContent from "../../../learn/includes/techschooling/new-content/NewContent";
import NewContentSinglePage from "../../../learn/includes/techschooling/new-content/NewContentSinglePage";
import NewLessons from "../../../learn/includes/techschooling/new-content/NewLessons";
import NewTopics from "../../../learn/includes/techschooling/new-content/NewTopics";
import Practices from "../../../learn/includes/techschooling/new-content/Practices";
import WorkShop from "../../../learn/includes/techschooling/new-content/WorkShop";
import { PrivateRoute } from "../../PrivateRoute";
import RouteLoading from "../../RouteLoading";
// import { useSelector } from "react-redux";
// import { data } from "jquery";
import AssessmentPage from "../../../learn/includes/techschooling/new-content/AssessmentPage";
import PracticePage from "../../../learn/includes/techschooling/new-content/PracticePage";
import TechSchoolingWorkshop from "../../../learn/screens/techschooling/workshops/inner-pages/TechSchoolingWorkshop";
import AssessmentStore from "../../../contexts/stores/AssessmentStore";
import NewContentNavBar from "../../../learn/includes/techschooling/new-content/NewContentNavBar";

export default function NewContentRouter({ subject_slug }) {
	console.log(subject_slug);

	return (
		<Suspense fallback={<RouteLoading />}>
			<NewContentNavBar subject_slug={subject_slug} />
			<Routes>
				<Route
					path="/topics/lessons"
					element={
						<PrivateRoute>
							<Navigate to="/new-content/skills/" replace />
						</PrivateRoute>
					}
				/>
				<Route
					path="/lessons"
					element={
						<PrivateRoute>
							<NewLessons subject_slug={subject_slug} />
						</PrivateRoute>
					}
				/>
				<Route
					path="/topics"
					element={
						<PrivateRoute>
							<NewTopics subject_slug={subject_slug} />
						</PrivateRoute>
					}
				/>
				<Route
					path="/topics/view/:id"
					element={
						<PrivateRoute>
							<NewContentSinglePage subject_slug={subject_slug} />
						</PrivateRoute>
					}
				/>
			</Routes>
		</Suspense>
	);
}
