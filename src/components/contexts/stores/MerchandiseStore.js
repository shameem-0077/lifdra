import React, { createContext, useReducer } from "react";
import MerchandiseReducer from "../reducers/MerchandiseReducer";

const initialState = {
    earned_coins: {},
    cart_count: 0
};

const MerchandiseStore = ({ children }) => {
    const [merchandiseState, merchandiseDispatch] = useReducer(MerchandiseReducer, initialState);


    return (
        <MerchandiseContext.Provider value={{ merchandiseState, merchandiseDispatch }}>
            {children}
        </MerchandiseContext.Provider>
    );
};

export const MerchandiseContext = createContext(initialState);

export default MerchandiseStore;
