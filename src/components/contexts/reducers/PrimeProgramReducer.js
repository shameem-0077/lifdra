const PrimeProgramsReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_IS_PURCHASED_COINS_VALUE":
            if (action.coins_settings) {
                return action.coins_settings;
            } else {
                localStorage.setItem("coins_settings", JSON.stringify(state));
                return state;
            }

        case "TOGGLE_IS_PURCHASED_COINS":
            const newState = {
                ...state,
                isUsedPurchasedCoins: !state.isUsedPurchasedCoins,
            };

            localStorage.setItem("coins_settings", JSON.stringify(newState));
            return newState;

        default:
            return state;
    }
};

export default PrimeProgramsReducer;
