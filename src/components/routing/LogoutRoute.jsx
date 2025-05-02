import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import auth from "./auth";

const LogoutRoute = () => {
    useEffect(() => {
        localStorage.clear();
        window.location = "/feed/";
        auth.logout(() => {
            return "Success";
        });
    }, []);

    return (
        <Redirect
            to={{
                pathname: "/feed/",
            }}
        />
    );
};
export default LogoutRoute;
