import React from "react";
import { Route, Switch } from "react-router-dom";
import ResetPasswordEnterPhone from "../components/login/ResetPasswordEnterPhone";
import ResetPasswordVerify from "../components/login/ResetPasswordVerify";
import PasswordReset from "../components/login/PasswordReset";

class ResetRouter extends React.PureComponent {
    render() {
        return (
            <Switch>
                <Route
                    exact
                    path="/auth/reset/password/phone/enter/"
                    component={ResetPasswordEnterPhone}
                />
                <Route
                    exact
                    path="/auth/reset/password"
                    component={PasswordReset}
                />
                <Route
                    exact
                    path="/auth/reset/password/phone/verify/"
                    component={ResetPasswordVerify}
                />
            </Switch>
        );
    }
}

export default ResetRouter;
