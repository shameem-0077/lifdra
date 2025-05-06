import React, { Suspense, lazy, useEffect, useContext, useState, useCallback, useMemo } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import RouteLoading from "../RouteLoading";
import Error401 from "../../error-pages/Error401";
import Error403 from "../../error-pages/Error403";
import Error404 from "../../error-pages/Error404";
import Error500 from "../../error-pages/Error500";
import styled from "styled-components";
import Header from "../../learn/includes/general/Header";
import MessagePopUp from "../../learn/includes/general/MessagePopUp";
import Sidebar from "../../learn/includes/general/Sidebar";
import { serverConfig } from "../../../axiosConfig";
import WebSocketMessagesInstance from "../../../messages-socket";
import { PrivateRoute } from "../PrivateRoute";
import TechSchoolingStore from "../../contexts/stores/TechSchoolingStore";
import { SupportEngineerContext } from "../../contexts/stores/SupportEngineerStore";
import { PrimeProgramContext } from "../../contexts/stores/PrimeProgramStore";
import PrimeProgramSucessModal from "../../learn/screens/prime-programs/PrimeProgramSucessModal";
import MobailNavManu from "../../learn/includes/general/MobailNavManu";
import { useAuthStore } from "../../../store/authStore";

const CommunityRouter = lazy(() => import("../community/CommunityRouter"));
const MeetRouter = lazy(() => import("../meet/MeetRouter"));
const TechUpdatesRouter = lazy(() => import("../tech-updates/TechUpdatesRouter"));
const ProjectsRouter = lazy(() => import("../project/ProjectsRouter"));
const GlobalSearch = lazy(() => import("../../learn/screens/global-search/page/GlobalSearchPage"));
const ProgramPlans = lazy(() => import("../../web/screens/techies-club-single-page/ProgramPlans"));
const PrimeProgramsCertificate = lazy(() => import("../../learn/screens/prime-programs/PrimeProgramsCertificate"));
const NotificationSinglePage = lazy(() => import("../../learn/includes/general/Notification/NotificationSinglePage"));
const MyclubRouter = lazy(() => import("../my-club/MyclubRouter"));
const ProgramRouter = lazy(() => import("../tech-schooling/ProgramRouter"));
const PrimeProgramsRouter = lazy(() => import("../prime-programs/PrimeProgramsRouter"));
const PrimeProgramsInnerRouter = lazy(() => import("../prime-programs/PrimeProgramsInnerRouter"));
const SettingsRouter = lazy(() => import("./SettingsRouter"));

const StudentRouter = () => {
  const { user_profile, user_data, updateUserData } = useAuthStore();
  const currentToken = localStorage.getItem("currentToken");
  const { supportEngineerDispatch } = useContext(SupportEngineerContext);
  const { primeProgramDispatch } = useContext(PrimeProgramContext);
  const location = useLocation();
  const [allowedFeatures, setAllowedFeatures] = useState([]);

  const setMessages = useCallback((message) => {
    updateUserData({ messages: message });
  }, [updateUserData]);

  const addMessage = useCallback((message) => {
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
      updateUserData({
        type: "ADD_MESSAGE",
        message: message,
      });
    }
  }, [supportEngineerDispatch, updateUserData]);

  const waitForSocketConnection = useCallback((callback) => {
    setTimeout(() => {
      if (WebSocketMessagesInstance.state() === 1) {
        callback();
        return;
      }
      waitForSocketConnection(callback);
    }, 100);
  }, []);

  const initializeMessages = useCallback((chatProfile) => {
    waitForSocketConnection(() => {
      WebSocketMessagesInstance.addCallbacks(setMessages, addMessage);
      WebSocketMessagesInstance.fetchMessages(chatProfile);
    });
    if (!WebSocketMessagesInstance.isConnected) {
      WebSocketMessagesInstance.connect(`student/messages/${chatProfile}`);
    }
  }, [waitForSocketConnection, setMessages, addMessage]);

  useEffect(() => {
    if (user_data?.access_token) {
      const coins_settings_stored = localStorage.getItem("coins_settings");
      const coins_settings_value = JSON.parse(coins_settings_stored);
      
      primeProgramDispatch({
        type: "UPDATE_IS_PURCHASED_COINS_VALUE",
        coins_settings: coins_settings_value,
      });
    }
  }, [user_data?.access_token, primeProgramDispatch]);

  useEffect(() => {
    const fetchCampusData = () => {
      const campus_data_stored = localStorage.getItem("campus_data");
      if (!campus_data_stored) {
        localStorage.setItem("campus_data", JSON.stringify(campus_data_stored));
      }
      const campus_data_value = JSON.parse(campus_data_stored);
      updateUserData({
        type: "UPDATE_CAMPUS_DATA",
        campus_data: campus_data_value,
      });
    };

    fetchCampusData();
  }, [updateUserData]);

  useEffect(() => {
    if (!user_data?.access_token) return;

    const fetchPrograms = async () => {
      try {
        const response = await serverConfig.get(`learn/programs/`, {
          headers: { Authorization: `Bearer ${user_data.access_token}` },
        });
        const { status_code, data } = response.data;
        if (status_code === 6000) {
          updateUserData({ programs: data, loading: false });
        }
      } catch (error) {
        updateUserData({ programs: [], loading: false });
      }
    };

    const fetchFeatures = async () => {
      try {
        const response = await serverConfig.get("/api/v1/users/list-user-features/", {
          headers: { Authorization: `Bearer ${user_data.access_token}` },
        });
        const { status_code, data } = response.data;
        if (status_code === 6000) {
          const features = data.map((item) => item?.feature?.name.trim());
          setAllowedFeatures(features);
        }
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchPrograms();
    fetchFeatures();
  }, [user_data?.access_token, updateUserData]);

  useEffect(() => {
    if (!user_data?.access_token || !currentToken) return;

    const createDevice = async () => {
      const formData = new FormData();
      formData.append("registration_id", currentToken);
      formData.append("type", "web");
      formData.append("active", true);

      try {
        await serverConfig.post("/main/create-device/", formData, {
          headers: { Authorization: `Bearer ${user_data.access_token}` },
        });
      } catch (error) {
        console.error("Error creating device:", error);
      }
    };

    createDevice();
  }, [user_data?.access_token, currentToken]);

  const routes = useMemo(() => (
    <Routes>
      <Route path="/feed/*" element={<CommunityRouter />} />
      <Route path="/meet/*" element={<MeetRouter />} />
      <Route path="/tech-updates/*" element={<TechUpdatesRouter />} />
      <Route path="/projects/*" element={<ProjectsRouter />} />
      <Route path="/global-search/*" element={<GlobalSearch />} />
      <Route path="/plans/*" element={<ProgramPlans />} />
      <Route path="/prime-programs/certificate/*" element={<PrimeProgramsCertificate />} />
      <Route path="/notifications/:id/*" element={<NotificationSinglePage />} />
      <Route path="/my-club/*" element={<MyclubRouter />} />
      <Route path="/tech-schooling/*" element={<ProgramRouter />} />
      <Route path="/prime-programs/*" element={<PrimeProgramsRouter />} />
      <Route path="/prime-programs-inner/*" element={<PrimeProgramsInnerRouter />} />
      <Route path="/settings/*" element={<SettingsRouter />} />
      <Route path="/401" element={<Error401 />} />
      <Route path="/403" element={<Error403 />} />
      <Route path="/404" element={<Error404 />} />
      <Route path="/500" element={<Error500 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  ), []);

  return (
    <div id="main-container">
      <Header />
      <MessagePopUp />
      <MobailNavManu />
      <PrimeProgramSucessModal />
      <Suspense fallback={<RouteLoading />}>
        {routes}
      </Suspense>
    </div>
  );
};

export default React.memo(StudentRouter);

const ErrorWrap = styled.div`
  min-height: calc(100vh);
  position: relative;
`;
