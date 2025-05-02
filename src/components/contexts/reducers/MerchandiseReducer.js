const MerchandiseReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_EARNED_COINS":
            return {
                ...state,
                earned_coins: action.earned_coins,
            };
        case "INCREASE_EARNED_COINS":
            return {
                ...state,
                earned_coins: {
                    ...state.earned_coins,
                    earned_coins_balance: state.earned_coins.earned_coins_balance + action.coins,
                    earned_coins_used: state.earned_coins.earned_coins_used - action.coins,
                },
            };
        case "DECREASE_EARNED_COINS":
            return {
                ...state,
                earned_coins: {
                    ...state.earned_coins,
                    earned_coins_balance: state.earned_coins.earned_coins_balance - action.coins,
                    earned_coins_used: state.earned_coins.earned_coins_used + action.coins,
                },
            };
        case "UPDATE_CART_COUNT":
            return {
                ...state,
                cart_count: action.cart_count,
            };
        case "INCREASE_CART_COUNT":
            return {
                ...state,
                cart_count: state.cart_count + 1,
            };
        case "DECREASE_CART_COUNT":
            return {
                ...state,
                cart_count: state.cart_count - 1,
            };
        case "RESET_CART_COUNT":
            return {
                ...state,
                cart_count: 0,
            };
        default:
            return state;
    }
};

export default MerchandiseReducer;
