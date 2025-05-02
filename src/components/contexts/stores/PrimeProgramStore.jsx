import React, { createContext, useReducer } from "react";
import PrimeProgramReducer from "../reducers/PrimeProgramReducer";

const initialState = {
    isUsedPurchasedCoins: false,
};

const PrimeProgramStore = ({ children }) => {
    const [primeProgramState, primeProgramDispatch] = useReducer(
        PrimeProgramReducer,
        initialState
    );

    return (
        <PrimeProgramContext.Provider
            value={{ primeProgramState, primeProgramDispatch }}
        >
            {children}
        </PrimeProgramContext.Provider>
    );
};

export const PrimeProgramContext = createContext(initialState);

export default PrimeProgramStore;
