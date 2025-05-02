import React, { createContext, useReducer } from "react";
import TechSchoolingReducer from "../reducers/TechSchoolingReducer";

const initialState = {
    techSchooling: {},
};

const TechSchoolingStore = ({ children }) => {
    const [techSchoolingState, techSchoolingDispatch] = useReducer(
        TechSchoolingReducer,
        initialState
    );

    return (
        <TechSchoolingContext.Provider value={{ techSchoolingState, techSchoolingDispatch }}>
            {children}
        </TechSchoolingContext.Provider>
    );
};

export const TechSchoolingContext = createContext(initialState);

export default TechSchoolingStore; 