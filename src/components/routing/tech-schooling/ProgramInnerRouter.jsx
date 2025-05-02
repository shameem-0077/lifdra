import React, { Suspense, useEffect, useState, lazy } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

import styled from "styled-components";
import ProgramNavBar from "../../learn/includes/techschooling/general/ProgramNavBar";
import AssessmentsMainRouter from "./assessments/AssessmentsMainRouter";

import LessonsListPage from "../../learn/screens/techschooling/learning/LessonsListPage";
import auth from "../auth";
import { useSelector } from "react-redux";
import RouteLoading from "../RouteLoading";
import { PrivateRoute } from "../PrivateRoute";
import TechSchoolingExplore from "../../learn/screens/techschooling/TechSchoolingExplore";
import { TechSchoolingRoute } from "../TechSchoolingRoute";
import { SubscriptionPrivateRoute } from "../SubscriptionPrivateRoute";
import TechSchoolingSubscription from "../../learn/screens/techschooling/TechSchoolingSubscription";
import queryString from "query-string";
import SubscribeModal from "../../learn/includes/techschooling/subscribe/SubscribeModal";
import NewContentRouter from "./new-content/NewContentRouter";
import CertificateHome from "../../learn/includes/techschooling/certification/CertificateHome";
import Certificate from "../../learn/includes/techschooling/certification/Certificate";

import ProgramDashboard from "../../learn/screens/techschooling/ProgramDashboard";
import ChildrenPrivateRoute from "../ChildrenPrivateRoute";
import ChatScreen from "../../learn/screens/chat/ChatScreen";
import Connect from "../../learn/screens/chat/Connect";
import AllAssessments from "../../learn/screens/techschooling/assessments/AllAssessments";
const TechSchoolingProfessions = lazy(() =>
  import("../../learn/screens/techschooling/learning/TechSchoolingProfessions")
);
const AllPractices = lazy(() =>
  import("../../learn/screens/techschooling/practices/AllPractices")
);
const TechSchoolingPractices = lazy(() =>
  import("../../learn/screens/techschooling/practices/TechSchoolingPractices")
);
const TechSchoolingTopicSingle = lazy(() =>
  import("../../learn/screens/techschooling/learning/TechSchoolingTopicSingle")
);

const TechSchoolingWorkshops = lazy(() =>
  import("../../learn/screens/techschooling/workshops/TechSchoolingWorkshops")
);
const TechSchoolingWorkshop = lazy(() =>
  import(
    "../../learn/screens/techschooling/workshops/inner-pages/TechSchoolingWorkshop"
  )
);
const AllWorkshops = lazy(() =>
  import("../../learn/screens/techschooling/workshops/AllWorkshops")
);
const SkillsPage = lazy(() =>
  import("../../learn/screens/techschooling/learning/SkillsPage")
);
const CertificateSinglePage = lazy(() =>
  import(
    "../../learn/includes/techschooling/certification/CertificateSinglePage"
  )
);
const NewContent = lazy(() =>
  import("../../learn/includes/techschooling/new-content/NewContent")
);
const Error500 = lazy(() => import("../../error-pages/Error500"));
const Error401 = lazy(() => import("../../error-pages/Error401"));
const Error404 = lazy(() => import("../../error-pages/Error404"));
const Error403 = lazy(() => import("../../error-pages/Error403"));

function ProgramInnerRouter({ program_slug }) {
  const user_profile = useSelector((state) => state.user_profile);
  const user_data = useSelector((state) => state.user_data);

  const history = useHistory();
  const location = useLocation();

  const [action, setAction] = useState("");

  useEffect(() => {
    let { search } = location;

    const values = queryString.parse(search);
    const action = values.action;
    setAction(action);
  }, [location.search]);

  const closeModal = () => {
    setAction("");
    history.push({
      pathname: location.pathname,
    });
  };

  const menuHeader = () => {
    if (
      auth.isAuthenticated() &&
      ((user_profile.subscription_data &&
        user_profile.subscription_data.has_active_subscription) ||
        (user_profile.subscription_data &&
          !user_profile.subscription_data.has_active_subscription))
    ) {
      return <ProgramNavBar program_slug={program_slug} />;
    }
  };

  useEffect(() => {
    menuHeader();
  }, [Object.keys(user_profile).length]);


  return (
    <Container>
      {menuHeader()}
      {action === "subscribe" && <SubscribeModal closeModal={closeModal} />}
      <Suspense fallback={<RouteLoading />}>
        <Switch>
          <ChildrenPrivateRoute exact path={`/nanodegree/:slug/assessments`}>
            <AssessmentsMainRouter subject_slug={program_slug} />
          </ChildrenPrivateRoute>

          <ChildrenPrivateRoute exact path={`/nanodegree/:slug/assessments/all`}>
            <AllAssessments subject_slug={program_slug} />
          </ChildrenPrivateRoute>

          <ChildrenPrivateRoute exact path={`/nanodegree/:slug/professions/`}>
            <TechSchoolingProfessions subject_slug={program_slug} />
          </ChildrenPrivateRoute>

          <SubscriptionPrivateRoute
            exact
            path={`/nanodegree/:slug/professions/:id/`}
          >
            <SkillsPage subject_slug={program_slug} />
          </SubscriptionPrivateRoute>

          <SubscriptionPrivateRoute
            exact
            path={`/nanodegree/:slug/lessons/:id/`}
          >
            <LessonsListPage subject_slug={program_slug} />
          </SubscriptionPrivateRoute>

          <SubscriptionPrivateRoute
            exact
            path={`/nanodegree/:slug/topics/view/:id/`}
          >
            <TechSchoolingTopicSingle subject_slug={program_slug} />
          </SubscriptionPrivateRoute>

          <ChildrenPrivateRoute exact path={`/nanodegree/:slug/practices/`}>
            <TechSchoolingPractices subject_slug={program_slug} />
          </ChildrenPrivateRoute>

          <PrivateRoute exact path={`/nanodegree/:slug/practices/all/`}>
            <AllPractices subject_slug={program_slug} />
          </PrivateRoute>

          <ChildrenPrivateRoute exact path={`/nanodegree/:slug/workshops/`}>
            <TechSchoolingWorkshops subject_slug={program_slug} />
          </ChildrenPrivateRoute>

          <PrivateRoute exact path={`/nanodegree/:slug/workshops/all/`}>
            <AllWorkshops subject_slug={program_slug} />
          </PrivateRoute>

          <SubscriptionPrivateRoute
            exact
            path={`/nanodegree/:slug/workshops/view/:id/`}
          >
            <TechSchoolingWorkshop subject_slug={program_slug} />
          </SubscriptionPrivateRoute>

          {/* <PrivateRoute exact path={`/nanodegree/:slug/new-content/`}>
            <Redirect
              to={{
                pathname: `/new-content/skills/`,
              }}
            />

          </PrivateRoute>
          <PrivateRoute exact path={`/new-content/skills/`}>
            <NewContent subject_slug={program_slug} />
          </PrivateRoute> */}
          <PrivateRoute exact path={`/nanodegree/:slug/new-content/`}>
            <NewContent subject_slug={program_slug} />
          </PrivateRoute>

          <PrivateRoute path={`/nanodegree/:slug/new-content/skills/:id/`}>
            <NewContentRouter subject_slug={program_slug} />
          </PrivateRoute>

          <ChildrenPrivateRoute exact path={`/nanodegree/:slug/certification/`}>
            <CertificateHome subject_slug={program_slug} />
          </ChildrenPrivateRoute>
          <Route
            exact
            path={`/nanodegree/:slug/certification/:id/`}
            component={CertificateSinglePage}
          />

          <Route exact path={`/`}>
            <Redirect
              to={{
                pathname: `/feed/`,
              }}
            />
          </Route>

          <PrivateRoute path={`/401/`}>
            <ErrorWrap>
              <Error401 />
            </ErrorWrap>
          </PrivateRoute>

          <PrivateRoute path={`/403/`}>
            <ErrorWrap>
              <Error403 />
            </ErrorWrap>
          </PrivateRoute>

          <PrivateRoute path={`/500/`}>
            <ErrorWrap>
              <Error500 />
            </ErrorWrap>
          </PrivateRoute>

          <Route component={Error404} />
        </Switch>
      </Suspense>
    </Container>
  );
}

export default ProgramInnerRouter;

const Container = styled.div`
  /* margin: 100px 0 0 228px; */
  padding: 25px 0px;
  @media all and (max-width: 480px) {
    padding: 15px 0px;
  }
`;
const ErrorWrap = styled.div`
  min-height: calc(100vh - 270px);
  position: relative;
`;
