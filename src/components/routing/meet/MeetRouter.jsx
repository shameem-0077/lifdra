import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Switch, useHistory, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector, useLocation } from "react-redux";
import "../../../assets/css/Style.css";
import RouteLoading from "../RouteLoading";
import queryString from "query-string";
import MeetsMain from "../../learn/screens/meets/MeetsSinglePage";
import Sidebar from "../../learn/includes/general/Sidebar";

const Error404 = lazy(() => import("../../error-pages/Error404"));

function mapStateToProps(state) {
  return {
    divMainClass: state.divMainClass,
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

function MeetRouter(props) {
  const { divMainClass, tech_topic, user_profile } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();

  useEffect(() => {
    props.updateActiveMenu("meet");
  }, []);

  // useEffect(() => {
  //   document.body.classList.add("meet-mainpage");

  //   return () => {
  //     document.body.classList.remove("meet-mainpage");
  //   };
  // }, []);

  const { slug } = useParams();

  return (
    // <div id="main" className={props.divMainClass}>
    <>
      <Sidebar slug={slug} />
      <Suspense fallback={<RouteLoading />}>
        <Route exact path="/nanodegree/:slug/meet/" component={MeetsMain} />
      </Suspense>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchtoProps)(MeetRouter);
