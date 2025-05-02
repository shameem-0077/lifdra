import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Switch, useHistory, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector, useLocation } from "react-redux";
import "../../../assets/css/Style.css";
import RouteLoading from "../RouteLoading";
import queryString from "query-string";
import MeetsMain from "../../learn/screens/meets/MeetsSinglePage";
import NanodegreeMainPage from '../../learn/screens/nano-degree/pages/NanoDegreeMainPage'

const Error404 = lazy(() => import("../../error-pages/Error404"));




const NanodegreeRouter = () => {

//   useEffect(() => {
//     document.body.classList.add("spotlight-wrapper");

//     return () => {
//         document.body.classList.remove("spotlight-wrapper");
//     };
// }, []);
  return (
    <Suspense fallback={<RouteLoading />}>
      <Route exact path="/nanodegree/" component={NanodegreeMainPage} />
    </Suspense>
  );
};

export default NanodegreeRouter;
