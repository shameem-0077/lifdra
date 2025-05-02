const PracticeReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_PRACTICE":
            return {
                ...state,
                practice: action.practice,
            };
        case "UPDATE_PRACTICE_ACTIVITIES":
            return {
                ...state,
                practice_activities: action.practice_activities,
            };
        case "UPDATE_PRACTICE_ASSETS":
            return {
                ...state,
                practice_assets: action.practice_assets,
            };
        case "UPDATE_PRACTICE_IMPROVEMENT":
            return {
                ...state,
                practice_improvement: action.practice_improvement,
            };
        case "UPDATE_PRACTICE_REVALUATION":
            return {
                ...state,
                practice_revaluation: action.practice_revaluation,
            };
        case "UPDATE_PRACTICE_SCORE":
            return {
                ...state,
                practice_score: action.practice_score,
            };
        case "UPDATE_WORKSHOP":
            return {
                ...state,
                workshop: action.workshop,
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
        case "TOGGLE_LOADING":
            return {
                ...state,
                isLoading: !state.isLoading,
            };
        default:
            return state;
    }
};

export default PracticeReducer;
