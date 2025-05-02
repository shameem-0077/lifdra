import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "./auth";

export const PrivateRoute = ({ element: Element, ...rest }) => {
    const location = useLocation();

    if (!auth.isAuthenticated()) {
        return (
            <Navigate
                to="/"
                state={{ from: location }}
                replace
            />
        );
    }

    return <Element {...rest} />;
};
