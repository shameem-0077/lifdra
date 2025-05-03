import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import auth from "./auth";

export const SubscriptionPrivateRoute = ({ element: Element }) => {
    const user_profile = useSelector((state) => state.user_profile);
    const location = useLocation();

    if (!auth.isAuthenticated()) {
        return (
            <Navigate
                to={{
                    pathname: "/feed/",
                    search: `?action=login&next=${location.pathname}`,
                }}
                replace
            />
        );
    }

    if (!user_profile.subscription_data || user_profile.subscription_data.expired_subscription) {
        return (
            <Navigate
                to="/feed/"
                replace
            />
        );
    }

    return <Element />;
};
