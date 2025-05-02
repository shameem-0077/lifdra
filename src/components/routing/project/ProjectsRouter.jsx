import React, { Suspense, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import styled from "styled-components";
import { Route, useLocation, Link, useParams } from "react-router-dom";
import RouteLoading from "../RouteLoading";
import ProjectCard from "../../learn/screens/projects/ProjectCard";
import ProjectCreatePortfolio from "../../learn/screens/projects/ProjectCreatePortfolio";
import BugSheet from "../../learn/screens/projects/BugSheet";
import OverlayContent from "../../learn/screens/projects/OverlayContent";
import Activities from "../../learn/screens/projects/Activities";
import Rules from "../../learn/screens/projects/Rules";
import $ from "jquery";
import Error404 from "../../error-pages/Error404";
import Sidebar from "../../learn/includes/general/Sidebar";

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
function ProjectsRouter(props) {
  // console.log(props);

  const { divMainClass, tech_topic, user_profile } = useSelector(
    (state) => state
  );
  // useEffect(() => {
  //   document.body.classList.add("projects");

  //   return () => {
  //     document.body.classList.remove("projects");
  //   };
  // }, []);
  useEffect(() => {
    props.updateActiveMenu("projects");
  }, []);
  // const [isNewUpdateModal, setUpdateModal] = useState(true);
  // useEffect(() => {
  //     if (isNewUpdateModal) {
  //         $("html").addClass("hide-tidio");
  //     } else {
  //         $("html").removeClass("hide-tidio");
  //     }
  // }, [isNewUpdateModal]);

  // useEffect(() => {
  //   document.body.classList.add("project-main");

  //   return () => {
  //     document.body.classList.remove("project-main");
  //   };
  // }, []);

  const { slug } = useParams();

  return (
    <div id="main" className={`${divMainClass} projects`}>
      <Suspense fallback={RouteLoading}>
        {/* {user_profile?.subscription_data?.has_active_subscription ? ( */}
        <Sidebar {...props} slug={slug} />
        <>
          <Route
            exact
            path="/nanodegree/:slug/projects"
            component={() => <ProjectCard subject_slug={slug} />}
          />
          <Route
            exact
            path="/nanodegree/:slug/projects/:pk/"
            component={ProjectCreatePortfolio}
          />

          <Route
            exact
            path="/nanodegree/:slug/projects/:pk/activity/"
            component={Activities}
          />
          <Route
            exact
            path="/nanodegree/:slug/projects/:pk/rules/"
            component={Rules}
          />
          <Route
            exact
            path="/nanodegree/:slug/projects/:pk/bugsheet/"
            component={BugSheet}
          />
        </>
        {/* ) : (
          <Route component={Error404} /> */}
        {/* )} */}
      </Suspense>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchtoProps)(ProjectsRouter);
