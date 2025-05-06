import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginInitial from "../components/login/LoginInitial";
import LoginEnterPassword from "../components/login/LoginEnterPassword";
import LoginWithOtp from "../components/login/LoginWithOtp";

class LoginRouter extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/auth/login/" component={LoginInitial} />
        {/* <Route
                    exact
                    path="/auth/login/verify/"
                    component={LoginEnterPassword}
                />
                <Route
                    exact
                    path="/auth/login/verify-otp/"
                    component={LoginWithOtp}
                /> */}
      </Switch>
    );
  }
}

export default LoginRouter;
