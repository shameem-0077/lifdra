const AssessmentReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_ASSESSMENT":
            return {
                ...state,
                assessment: action.assessment,
            };
        case "UPDATE_ASSESSMENT_ACTIVITIES":
            return {
                ...state,
                assessment_activities: action.assessment_activities,
            };
        case "UPDATE_ASSESSMENT_ASSETS":
            return {
                ...state,
                assessment_assets: action.assessment_assets,
            };
        case "UPDATE_ASSESSMENT_IMPROVEMENT":
            return {
                ...state,
                assessment_improvement: action.assessment_improvement,
            };
        case "UPDATE_ASSESSMENT_REVALUATION":
            return {
                ...state,
                assessment_revaluation: action.assessment_revaluation,
            };
        case "UPDATE_ASSESSMENT_SCORE":
            return {
                ...state,
                assessment_score: action.assessment_score,
            };
        case "UPDATE_IMPROVEMENT":
            return {
                ...state,
                improvement: action.improvement,
            };
        case "UPDATE_REVALUATION":
            return {
                ...state,
                revaluation: action.revaluation,
            };
        case "UPDATE_CURRENT_QUESTION":
            return {
                ...state,
                current_question: action.current_question,
            };
        case "TOGGLE_LOADING":
            return {
                ...state,
                isLoading: !state.isLoading,
            };
        default:
            return state;
    }
};

export default AssessmentReducer;
