import React, { createContext, useReducer } from "react";
import SupportEngineerReducer from "../reducers/SupportEngineerReducer";

const initialState = {
    modal_type: "",
    is_modal: false,
    selected_package: {},
    active_premium_assist: {},
    previous_premium_assists: [],
    active_pa_chat_session: "",
    active_pa_chat_session_id: "",
    is_previous_assists_loading: true,
};

const SupportEngineerStore = ({ children }) => {
    const [supportEngineerState, supportEngineerDispatch] = useReducer(
        SupportEngineerReducer,
        initialState
    );

    return (
        <SupportEngineerContext.Provider
            value={{ supportEngineerState, supportEngineerDispatch }}
        >
            {children}
        </SupportEngineerContext.Provider>
    );
};

export const SupportEngineerContext = createContext(initialState);

export default SupportEngineerStore;
