import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import EnterPhone from "../components/EnterPhone";
import VerifyOtp from "../components/VerifyOtp";
import SetPassword from "../components/SetPassword";
import EnterName from "../components/EnterName";
import EnterReferral from "../components/EnterReferral";

class LoginRouter extends React.PureComponent {
  render() {
    return (
      <Switch>
        {/* <Route
                    exact
                    path="/auth/join/enter/phone/"
                    component={EnterPhone}
                />
                <Route
                    exact
                    path="/auth/join/verify/phone/"
                    component={VerifyOtp}
                />
                <Route
                    exact
                    path="/auth/join/set/password/"
                    component={SetPassword}
                />
                <Route
                    exact
                    path="/auth/join/enter/name/"
                    component={EnterName}
                />
                <Route
                    exact
                    path="/auth/join/enter/referral-code/"
                    component={EnterReferral}
                /> */}
      </Switch>
    );
  }
}

export default LoginRouter;

const Container = styled.div`
  display: flex;
`;
