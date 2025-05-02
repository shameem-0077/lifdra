const SupportEngineerReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_MODAL":
            return {
                ...state,
                modal_type: action.modal_type
                    ? action.modal_type
                    : state.modal_type,
                is_modal: action.is_modal,
            };
        case "UPDATE_SELECTED_PACKAGE":
            return {
                ...state,
                selected_package: action.selected_package,
            };
        case "UPDATE_ACTIVE_PREMIUM_ASSIST":
            return {
                ...state,
                active_premium_assist: action.active_premium_assist,
            };
        case "UPDATE_ACTIVE_PA_CHAT_SESSION":
            return {
                ...state,
                active_pa_chat_session: action.active_pa_chat_session,
            };
        case "UPDATE_ACTIVE_PA_CHAT_SESSION_ID":
            return {
                ...state,
                active_pa_chat_session_id: action.active_pa_chat_session_id,
            };
        case "UPDATE_PREVIOUS_PREMIUM_ASSISTS":
            return {
                ...state,
                previous_premium_assists: action.previous_premium_assists,
            };
        case "TOGGLE_PREVIOUS_ASSISTS_LOADING":
            return {
                ...state,
                is_previous_assists_loading: action.is_previous_assists_loading,
            };
        case "REASSIGN_PREMIUM_ASSIST":
            return {
                ...state,
                active_premium_assist: {
                    ...state.active_premium_assist,
                    is_reassigned: true,
                },
            };
        case "OPEN_PREMIUM_ASSIST":
            return {
                ...state,
                active_premium_assist: {
                    ...state.active_premium_assist,
                    is_opened: true,
                    is_reassigned: null,
                },
            };

        default:
            return state;
    }
};

export default SupportEngineerReducer;
