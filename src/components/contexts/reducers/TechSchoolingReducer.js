const TechSchoolingReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_TECHSCHOOLING":
            return {
                ...state,
                techSchooling: action.techSchooling,
            };
        default:
            return state;
    }
};

export default TechSchoolingReducer;
