import React, { createContext, useReducer } from "react";
import AssessmentReducer from "../reducers/AssessmentReducer";

const initialState = {
	assessment: {},
	assessment_activities: [],
	assessment_assets: [],
	assessment_improvement: {},
	assessment_revaluation: {},
	assessment_score: {},
	improvement: {},
	revaluation: {},
	current_question: {},
	isLoading: true,
	activities_base: [
		{
			activity_type: "assessment_session_completed",
			icon_name: "check-circle",
			status: "success",
			color: "rgb(86, 192, 129)",
			title: "Assessment process completed",
			is_star_needed: true,
			border_radius: "50%",
		},
		{
			activity_type: "improvement_score_not_improved",
			icon_name: "star",
			status: "warning",
			color: "red",
			title: "Improvement : Score not improved",
			is_star_needed: true,
			border_radius: "50%",
		},
		{
			activity_type: "assessment_improvement_valuated",
			icon_name: "star",
			status: "info-light",
			color: "#079EF7",
			title: "Improvement : Score improved",
			is_star_needed: true,
			border_radius: "50%",
		},
		{
			activity_type: "improvement_completed",
			icon_name: "check-circle",
			status: "success",
			color: "rgb(86, 192, 129)",
			title: "Improvement : Assessment completed",
			is_star_needed: false,
			is_need_uploading_file: true,
			border_radius: "5px",
		},
		{
			activity_type: "assessment_improvement_started",
			icon_name: "rocket",
			status: "info-light",
			color: "#079EF7",
			title: "Improvement : Assessment started",
			is_star_needed: false,
			border_radius: "50%",
		},
		{
			activity_type: "applied_for_improvement",
			icon_name: "sync-alt",
			status: "info-light",
			color: "#694FB8",
			title: "Applied for improvement",
			is_star_needed: false,
			border_radius: "50%",
			background_color: "#D2CAE9",
		},
		{
			activity_type: "revaluation_score_not_improved",
			icon_name: "star",
			status: "warning",
			color: "red",
			title: "Revaluation : Score not improved",
			is_star_needed: true,
			border_radius: "50%",
		},
		{
			activity_type: "revaluation_score_improved",
			icon_name: "star",
			status: "success",
			color: "rgb(86, 192, 129)",
			title: "Revaluation : Score improved",
			is_star_needed: true,
			border_radius: "50%",
		},
		{
			activity_type: "applied_for_revaluation",
			icon_name: "sync-alt",
			status: "info-light",
			color: "#694FB8",
			title: "Applied for revaluation",
			is_star_needed: false,
			border_radius: "50%",
			background_color: "#D2CAE9",
		},
		{
			activity_type: "assessment_valuated",
			icon_name: "star",
			status: "info-light",
			color: "#079EF7",
			title: "Assessment score updated",
			is_star_needed: true,
			border_radius: "50%",
		},
		{
			activity_type: "assessment_completed",
			icon_name: "check-circle",
			status: "success",
			color: "rgb(86, 192, 129)",
			title: "Assessment completed",
			is_star_needed: false,
			is_need_uploading_file: true,
			border_radius: "5px",
		},
		{
			activity_type: "assessment_started",
			icon_name: "rocket",
			status: "info-light",
			color: "#079EF7",
			title: "Assessment started",
			is_star_needed: false,
			border_radius: "50%",
		},
	],
};

const AssessmentStore = ({ children }) => {
	const [assessmentState, assessmentDispatch] = useReducer(
		AssessmentReducer,
		initialState
	);

	return (
		<AssessmentContext.Provider
			value={{ assessmentState, assessmentDispatch }}
		>
			{children}
		</AssessmentContext.Provider>
	);
};

export const AssessmentContext = createContext(initialState);

export default AssessmentStore;
