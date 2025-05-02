import React, { createContext, useReducer } from "react";
import PracticeReducer from "../reducers/PracticeReducer";

const initialState = {
    practice: {},
    practice_activities: [],
    practice_assets: [],
    practice_improvement: {},
    practice_revaluation: {},
    practice_score: {},
    workshop: {},
    improvement: {},
    revaluation: {},
    isLoading: true,

    activities_base: [
        {
            activity_type: "practice_session_completed",
            icon_name: "check-circle",
            status: "success",
            color: "rgb(86, 192, 129)",
            title: "Practice process completed",
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
            activity_type: "improvement_score_improved",
            icon_name: "star",
            status: "success",
            color: "rgb(86, 192, 129)",
            title: "Improvement : Score improved",
            is_star_needed: true,
            border_radius: "50%",
        },
        {
            activity_type: "practice_improvement_uploaded",
            icon_name: "check-circle",
            status: "success",
            color: "rgb(86, 192, 129)",
            title: "Improvement : Practice uploaded",
            is_star_needed: false,
            is_need_uploading_file: true,
            border_radius: "5px",
        },
        {
            activity_type: "practice_improvement_valuated",
            icon_name: "rocket",
            status: "info-light",
            color: "#079EF7",
            title: "Improvement : Practice score updated",
            is_star_needed: true,
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
        // {
        //     activity_type: "revaluation_score_not_improved",
        //     icon_name: "star",
        //     status: "warning",
        //     color: "red",
        //     title: "Revaluation : Score not improved",
        //     is_star_needed: true,
        //     border_radius: "50%",
        // },
        {
            activity_type: "revaluation_completed",
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
            activity_type: "practice_valuated",
            icon_name: "star",
            status: "info-light",
            color: "#000",
            title: "Practice score updated",
            is_star_needed: true,
            border_radius: "50%",
        },
        {
            activity_type: "practice_uploaded",
            icon_name: "check-circle",
            status: "success",
            color: "#000",
            title: "Practice uploaded",
            is_star_needed: false,
            is_need_uploading_file: true,
            border_radius: "5px",
        },
    ],
};

const PracticeStore = ({ children }) => {
    const [practiceState, practiceDispatch] = useReducer(
        PracticeReducer,
        initialState
    );

    return (
        <PracticeContext.Provider value={{ practiceState, practiceDispatch }}>
            {children}
        </PracticeContext.Provider>
    );
};

export const PracticeContext = createContext(initialState);

export default PracticeStore;
