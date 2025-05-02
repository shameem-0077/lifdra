import React from "react";
import { Route, Navigate } from "react-router-dom";
import auth from "./auth";

export const AuthRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            element={
                auth.isAuthenticated() ? (
                    <Navigate to="/feed/" replace />
                ) : (
                    <Component />
                )
            }
        />
    );
};
