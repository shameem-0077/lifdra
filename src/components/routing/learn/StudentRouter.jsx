import React, { Suspense, lazy, useEffect, useContext, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import RouteLoading from "../RouteLoading";
import Error401 from "../../error-pages/Error401";
import Error403 from "../../error-pages/Error403";
import Error404 from "../../error-pages/Error404";
import Error500 from "../../error-pages/Error500";
import styled from "styled-components";
import Header from "../../learn/includes/general/Header";
import MessagePopUp from "../../learn/includes/general/MessagePopUp";
import Sidebar from "../../learn/includes/general/Sidebar";
import {
  accountsConfig,
  learnConfig,
  notificationsConfig,
  studentActivitiesConfig,
} from "../../../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import WebSocketMessagesInstance from "../../../messages-socket";
import { PrivateRoute } from "../PrivateRoute";
import TechSchoolingStore from "../../contexts/stores/TechSchoolingStore";
import { SupportEngineerContext } from "../../contexts/stores/SupportEngineerStore";
import TrialGiftModal from "../../learn/includes/general/TrialGiftModal";
import SubscriptionDiscountModal from "../../learn/includes/general/SubscriptionDiscountModal";
import ValidationModal from "../../learn/includes/general/ValidationModal";
import { PrimeProgramContext } from "../../contexts/stores/PrimeProgramStore";
import CertificateModal from "../../learn/includes/techschooling/certification/CertificateModal";
import MainErrorPage from "../../error-pages/MainErrorPage";
import ProgramSubject from "../../learn/includes/techschooling/dashboard/ProgramSubject";
import PrimeProgramSucessModal from "../../learn/screens/prime-programs/PrimeProgramSucessModal";
import { useLocation } from "react-router-dom";
import MobailNavManu from "../../learn/includes/general/MobailNavManu";

const CommunityRouter = lazy(() => import("../community/CommunityRouter"));
const MeetRouter = lazy(() => import("../meet/MeetRouter"));
const TechUpdatesRouter = lazy(() =>
  import("../tech-updates/TechUpdatesRouter")
);
const ProjectsRouter = lazy(() => import("../project/ProjectsRouter"));

const GlobalSearch = lazy(() =>
  import("../../learn/screens/global-search/page/GlobalSearchPage")
);

const ProgramPlans = lazy(() =>
  import("../../web/screens/techies-club-single-page/ProgramPlans")
);

const PrimeProgramsCertificate = lazy(() =>
  import("../../learn/screens/prime-programs/PrimeProgramsCertificate")
);

const NotificationSinglePage = lazy(() =>
  import("../../learn/includes/general/Notification/NotificationSinglePage")
);

const MyclubRouter = lazy(() => import("../my-club/MyclubRouter"));

const ProgramRouter = lazy(() => import("../tech-schooling/ProgramRouter"));
const PrimeProgramsRouter = lazy(() =>
  import("../prime-programs/PrimeProgramsRouter")
);
const PrimeProgramsInnerRouter = lazy(() =>
  import("../prime-programs/PrimeProgramsInnerRouter")
);
const SettingsRouter = lazy(() => import("./SettingsRouter"));

const StudentRouter = (props) => {
  // const [isSecondMenu, setSecondMenu] = useState(false);

  const { user_profile, user_data } = useSelector((state) => state);
  const errorState = useSelector((state) => state.errorState);
  const currentToken = localStorage.getItem("currentToken");
  const dispatch = useDispatch();
  const { supportEngineerDispatch } = useContext(SupportEngineerContext);
  const { primeProgramDispatch } = useContext(PrimeProgramContext);
  const location = useLocation();

  const [allowedFeatures, setAllowedFeatures] = useState([]);

  useEffect(() => {
    if (user_data) {
      let { access_token } = user_data;

      let coins_settings_stored = localStorage.getItem("coins_settings");
      let coins_settings_value = JSON.parse(coins_settings_stored);

      primeProgramDispatch({
        type: "UPDATE_IS_PURCHASED_COINS_VALUE",
        coins_settings: coins_settings_value,
      });
    }
  }, [user_data && Object.keys(user_data).length]);

  const initializeMessages = (chatProfile) => {
    waitForSocketConnection(() => {
      WebSocketMessagesInstance.addCallbacks(setMessages, addMessage);
      WebSocketMessagesInstance.fetchMessages(chatProfile);
    });
    if (!WebSocketMessagesInstance.isConnected) {
      WebSocketMessagesInstance.connect(`student/messages/${chatProfile}`);
    }
  };

  const setMessages = (message) => {
    dispatch({
      type: "SET_MESSAGES",
      message: message,
    });
  };

  const addMessage = (message) => {
    if (message.message_type === "premium_assist_picked") {
      supportEngineerDispatch({
        type: "OPEN_PREMIUM_ASSIST",
      });
      supportEngineerDispatch({
        type: "UPDATE_ACTIVE_PA_CHAT_SESSION",
        active_pa_chat_session: message.pa_chat_session,
      });
      supportEngineerDispatch({
        type: "UPDATE_ACTIVE_PA_CHAT_SESSION_ID",
        active_pa_chat_session_id: message.pa_chat_session_id,
      });
    } else {
      dispatch({
        type: "ADD_MESSAGE",
        message: message,
      });
    }
  };

  const waitForSocketConnection = (callback) => {
    setTimeout(() => {
      if (WebSocketMessagesInstance.state() === 1) {
        callback();
        return;
      } else {
        waitForSocketConnection(callback);
      }
    }, 100);
  };

  const handleIdUploadModal = () => {
    dispatch({
      type: "TOGGLE_STUDENT_UPLOAD_MODAL",
    });
  };

  useEffect(() => {
    const fetchCampusData = () => {
      let campus_data_stored = localStorage.getItem("campus_data");
      if (!campus_data_stored) {
        localStorage.setItem("campus_data", JSON.stringify(campus_data_stored));
        campus_data_stored = localStorage.getItem("campus_data");
      }
      let campus_data_value = JSON.parse(campus_data_stored);
      dispatch({
        type: "UPDATE_CAMPUS_DATA",
        campus_data: campus_data_value,
      });
    };

    fetchCampusData();
  }, []);

  useEffect(() => {
    const fetchPrograms = () => {
      let { access_token } = user_data;
      learnConfig
        .get(`learn/programs/`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          let { StatusCode, data } = response.data;

          if (StatusCode === 6000) {
            dispatch({
              type: "UPDATE_PROGRAMS",
              loading: false,
              programs: data,
            });
          }
        })
        .catch(() =>
          dispatch({
            type: "UPDATE_PROGRAMS",
            loading: false,
            programs: [],
          })
        );
    };
    const fetchFeatures = () => {
      let { access_token } = user_data;
      accountsConfig
        .get("/api/v1/users/list-user-features/", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          const { status_code, data } = response.data;
          if (status_code === 6000) {
            const features = data.map((item) => item?.feature?.name.trim());
            setAllowedFeatures(features);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (user_data?.access_token) {
      fetchPrograms();
      fetchFeatures();
      // fetchDummy();
    }
  }, [user_data && user_data.access_token]);

  useEffect(() => {
    const createDevice = () => {
      const formData = new FormData();

      formData.append("registration_id", currentToken);
      formData.append("type", "web");
      formData.append("active", true);

      notificationsConfig
        .post("/main/create-device/", formData, {
          headers: {
            Authorization: `Bearer ${user_data?.access_token}`,
          },
        })
        .then((response) => {})
        .catch((error) => {});
    };
    if (user_data?.access_token && currentToken) {
      createDevice();
    }
  }, [user_data.access_token, currentToken]);

  const combinedProps = {
    ...props, // Existing props
    allowedFeatures: allowedFeatures, // New key to be added
  };

  return (
    <div id="main-container">
      {/* <WarningMenu isSecondMenu={isSecondMenu} /> */}
      <PrimeProgramSucessModal />
      <TrialGiftModal />
      <CertificateModal />
      <MessagePopUp />
      <Header {...props} />
      {location.pathname != "/feed/" ||
      location.pathname != "/feed/profile" ||
      location.pathname != "/tech-updates/" ? null : (
        <>
          <Sidebar {...props} />
        </>
      )}
      <InvitationModal />
      <PaymentLinkModal />
      <SubscriptionDiscountModal handleIdUploadModal={handleIdUploadModal} />
      {/* {auth.isAuthenticated() && <MobailNavManu />} */}
      <MobailNavManu />
      {/* <BottomNavBar isSecondMenu={isSecondMenu} /> */}

      <ValidationModal handleIdUploadModal={handleIdUploadModal} />
      {errorState.isError ? (
        <MainErrorPage />
      ) : (
        <Suspense fallback={<RouteLoading />}>
          <Switch>
            <Route exact path="/">
              <Redirect
                to={{
                  pathname: "/nanodegree/:slug/daily-syllabus/",
                }}
              />
            </Route>
            {/* <PrivateRoute exact path="/dashboard/" component={NewDashBoard} /> */}
            <Route
              exact
              path="/nanodegree/:slug/daily-syllabus/"
              component={NewDashBoard}
            />

            <PrivateRoute
              exact
              path="/nanodegree/:slug/support/"
              // component={ChatScreen}
              component={user_data.uid ? ChatScreen : Connect}
            />

            <Route
              exact
              path="/subscription/"
              render={() => (
                <ProgramPlans title="Tech Schooling" program="tech-schooling" />
                // <DashBoard />
              )}
            />
            <Route
              exact
              path="/feed/tech-schooling/"
              render={() => (
                <ProgramPlans title="Tech Schooling" program="tech-schooling" />
              )}
            />
            <Route
              exact
              path="/feed/tech-degree/"
              render={() => (
                <ProgramPlans title="Tech Degree" program="tech-degree" />
              )}
            />

            <Route
              exact
              path="/feed/program/tech-schooling/:id"
              render={() => <ProgramSubject title="Tech Schooling" />}
            />
            <Route
              exact
              path="/feed/program/tech-degree/:id/"
              render={() => <ProgramSubject title="Tech Degree" />}
            />
            <Route
              exact
              path="/feed/program/tech-grad/:id"
              render={() => <ProgramSubject title="Tech Grad" />}
            />
            {/* Profile routes are here */}

            <Route path="/profile/" component={SettingsRouter} />

            <PrivateRoute exact path="/search/:id" component={GlobalSearch} />

            <PrivateRoute
              exact
              path="/notifications/"
              component={NotificationSinglePage}
            />

            <Route path="/coins/" component={SettingsRouter} />

            <Route
              path="/prime-programs/courses/"
              component={PrimeProgramsRouter}
            />

            <Route
              path="/prime-programs/"
              component={PrimeProgramsInnerRouter}
            />

            <Route
              exact
              path="/certificate/"
              component={PrimeProgramsCertificate}
            />
            <PrivateRoute path="/my-club/" component={MyclubRouter} />
            <PrivateRoute
              path="/nanodegree/:slug/leaderboard/"
              component={LeaderBoard}
            />

            <PrivateRoute
              exact
              path="/nanodegree/:slug/projects/*"
              component={ProjectsRouter}
            />

            <PrivateRoute
              exact
              path="/tech-updates/*"
              component={TechUpdatesRouter}
            />
            <PrivateRoute exact path="/feed/*" component={CommunityRouter} />

            <PrivateRoute
              exact
              path="/support/"
              component={
                (user_profile?.subscription_data?.has_active_subscription &&
                  !user_profile.subscription_data.expired_subscription &&
                  user_data.uid) ||
                (allowedFeatures.includes("support") && user_data.uid)
                  ? ChatScreen
                  : Connect
              }
            />
            {/* <PrivateRoute exact path="/projects*" component={ProjectsRouter} /> */}

            <PrivateRoute
              exact
              path="/tech-updates/*"
              component={TechUpdatesRouter}
            />
            <PrivateRoute
              exact
              path="/nanodegree/:slug/meet/"
              component={MeetRouter}
            />
            <PrivateRoute path="/401/">
              <ErrorWrap>
                <Error401 />
              </ErrorWrap>
            </PrivateRoute>
            <PrivateRoute path="/403/">
              <ErrorWrap>
                <Error403 />
              </ErrorWrap>
            </PrivateRoute>
            <PrivateRoute path="/500/">
              <ErrorWrap>
                <Error500 />
              </ErrorWrap>
            </PrivateRoute>
            {/* Tech-schooling routes are here */}
            <PrivateRoute path="/nanodegree/:slug/*">
              <TechSchoolingStore>
                <ProgramRouter {...props} />
              </TechSchoolingStore>
            </PrivateRoute>
            <Route component={Error404} />
          </Switch>
        </Suspense>
      )}
    </div>
  );
};

export default StudentRouter;
const ErrorWrap = styled.div`
  min-height: calc(100vh);
  position: relative;
`;
