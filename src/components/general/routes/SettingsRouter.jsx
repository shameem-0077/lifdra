import React, { Suspense, lazy, useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import { PrivateRoute } from "../../routing/PrivateRoute";
import RouteLoading from "../../../general/conponents/RouteLoading";

import styled from "styled-components";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    divMainClass: state.divMainClass,
    active_profile_menu: state.active_profile_menu,
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    updateActiveMenu: (active_menu) =>
      dispatch({
        type: "ACTIVE_MENU",
        active_menu: active_menu,
      }),
  };
}

const ProfileRouter = lazy(() => import("../../profiles/routes/ProfileRouter"));
const CoinRouter = lazy(() => import("./profile/CoinRouter"));

function SettingsRouter(props) {
  useEffect(() => {
    props.updateActiveMenu("profile");
  }, []);
  useEffect(() => {}, [props.active_profile_menu]);

  const [innerHeight, setInnerHeight] = useState(window?.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setInnerHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Suspense fallback={<RouteLoading />}>
      <Container
        // id="main"
        // className={props.divMainClass}
        maxheight={innerHeight}
      >
        <Wrapper>
          <InnerContainer>
            {/* <HorizontalMenu /> */}
            <Switch>
              <PrivateRoute path="/profile/" component={ProfileRouter} />
              <PrivateRoute path="/coins/" component={CoinRouter} />
            </Switch>
          </InnerContainer>
        </Wrapper>
      </Container>
    </Suspense>
  );
}

export default connect(mapStateToProps, mapDispatchtoProps)(SettingsRouter);
const Test = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  /* max-height: ${({ maxheight }) =>
    maxheight && `${maxheight}px`} !important; */
  height: 100vh;
  padding: 84px 48px 0px;

  @media all and (max-width: 1023px) {
    padding: 84px 16px 0px 16px;
  }
  @media all and (max-width: 768px) {
    padding: 84px 16px 0px 16px;
  }
  @media all and (max-width: 440px) {
    padding: 84px 16px 84px 16px;
  }

  &#main {
    @media all and (max-width: 640px) {
      padding: 60px 15px 10px 15px !important;
    }
  }
  &#main.responsive-mini {
  }
`;
const Wrapper = styled.div`
  /* padding: 15px 0px; */
  display: flex;
  justify-content: space-between;
  height: 100%;
`;
const InnerContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  /* margin-left: 296px; */

  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1100px) {
    // margin-left: 287px;
  }
  @media (max-width: 980px) {
    margin-left: 0;
    width: 100%;
  }
  @media (max-width: 640px) {
    padding: 0;
  }
`;
