import React, { Suspense, useEffect, useState, lazy } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
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

  const navigate = useNavigate();
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
    navigate(location.pathname);
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
        <Routes>
          <Route
            path="/assessments"
            element={
              <ChildrenPrivateRoute>
                <AssessmentsMainRouter subject_slug={program_slug} />
              </ChildrenPrivateRoute>
            }
          />
          <Route
            path="/assessments/all"
            element={
              <ChildrenPrivateRoute>
                <AllAssessments subject_slug={program_slug} />
              </ChildrenPrivateRoute>
            }
          />
          <Route
            path="/professions"
            element={
              <ChildrenPrivateRoute>
                <TechSchoolingProfessions subject_slug={program_slug} />
              </ChildrenPrivateRoute>
            }
          />
          <Route
            path="/professions/:id"
            element={
              <SubscriptionPrivateRoute>
                <SkillsPage subject_slug={program_slug} />
              </SubscriptionPrivateRoute>
            }
          />
          <Route
            path="/lessons/:id"
            element={
              <SubscriptionPrivateRoute>
                <LessonsListPage subject_slug={program_slug} />
              </SubscriptionPrivateRoute>
            }
          />
          <Route
            path="/topics/view/:id"
            element={
              <SubscriptionPrivateRoute>
                <TechSchoolingTopicSingle subject_slug={program_slug} />
              </SubscriptionPrivateRoute>
            }
          />
          <Route
            path="/practices"
            element={
              <ChildrenPrivateRoute>
                <TechSchoolingPractices subject_slug={program_slug} />
              </ChildrenPrivateRoute>
            }
          />
          <Route
            path="/practices/all"
            element={
              <PrivateRoute>
                <AllPractices subject_slug={program_slug} />
              </PrivateRoute>
            }
          />
          <Route
            path="/workshops"
            element={
              <ChildrenPrivateRoute>
                <TechSchoolingWorkshops subject_slug={program_slug} />
              </ChildrenPrivateRoute>
            }
          />
          <Route
            path="/workshops/all"
            element={
              <PrivateRoute>
                <AllWorkshops subject_slug={program_slug} />
              </PrivateRoute>
            }
          />
          <Route
            path="/workshops/view/:id"
            element={
              <SubscriptionPrivateRoute>
                <TechSchoolingWorkshop subject_slug={program_slug} />
              </SubscriptionPrivateRoute>
            }
          />
          <Route
            path="/new-content"
            element={
              <PrivateRoute>
                <NewContent subject_slug={program_slug} />
              </PrivateRoute>
            }
          />
          <Route
            path="/new-content/skills/:id"
            element={
              <PrivateRoute>
                <NewContentRouter subject_slug={program_slug} />
              </PrivateRoute>
            }
          />
          <Route
            path="/certification"
            element={
              <ChildrenPrivateRoute>
                <CertificateHome subject_slug={program_slug} />
              </ChildrenPrivateRoute>
            }
          />
          <Route
            path="/certification/:id"
            element={<CertificateSinglePage />}
          />
          <Route path="/" element={<Navigate to="/feed/" replace />} />
          <Route
            path="/401"
            element={
              <PrivateRoute>
                <ErrorWrap>
                  <Error401 />
                </ErrorWrap>
              </PrivateRoute>
            }
          />
          <Route
            path="/403"
            element={
              <PrivateRoute>
                <ErrorWrap>
                  <Error403 />
                </ErrorWrap>
              </PrivateRoute>
            }
          />
          <Route
            path="/500"
            element={
              <PrivateRoute>
                <ErrorWrap>
                  <Error500 />
                </ErrorWrap>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
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
