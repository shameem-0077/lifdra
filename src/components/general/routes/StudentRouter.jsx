import React, { Suspense, lazy, useEffect, useContext, useState, useCallback, useMemo } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import RouteLoading from "../conponents/RouteLoading";

import Error401 from "../pages/Error401";
import Error403 from "../pages/Error403";
import Error404 from "../pages/Error404";
import Error500 from "../pages/Error500";
import styled from "styled-components";
import Header from "../conponents/Header";
import { serverConfig } from "../../../axiosConfig";
import WebSocketMessagesInstance from "../../../messages-socket";
import PrimeProgramSucessModal from "../../courses/pages/PrimeProgramSucessModal";
import MobailNavManu from "../conponents/MobailNavManu";
import { useAuthStore } from "../../../store/authStore";
import { useSupportEngineerStore } from "../../../store/supportEngineerStore";

const CommunityRouter = lazy(() => import("../../community/routes/CommunityRouter"));
const GlobalSearch = lazy(() => import("../pages/GlobalSearchPage"));
const PrimeProgramsCertificate = lazy(() => import("../../courses/pages/PrimeProgramsCertificate"));
const NotificationSinglePage = lazy(() => import("../../notifications/pages/NotificationSinglePage"));
const PrimeProgramsRouter = lazy(() => import("../../courses/routes/PrimeProgramsRouter"));
const PrimeProgramsInnerRouter = lazy(() => import("../../courses/routes/PrimeProgramsInnerRouter"));
const SettingsRouter = lazy(() => import("./SettingsRouter"));

const StudentRouter = () => {
  const { user_profile, user_data, updateUserData, isAuthenticated } = useAuthStore();
  const { setSupportEngineer } = useSupportEngineerStore();
  const currentToken = localStorage.getItem("currentToken");
  const location = useLocation();
  const [allowedFeatures, setAllowedFeatures] = useState([]);
  const navigate = useNavigate();

  const setMessages = useCallback((message) => {
    updateUserData({ messages: message });
  }, [updateUserData]);

  const addMessage = useCallback((message) => {
    if (message.message_type === "premium_assist_picked") {
      setSupportEngineer({
        type: "OPEN_PREMIUM_ASSIST",
      });
      setSupportEngineer({
        type: "UPDATE_ACTIVE_PA_CHAT_SESSION",
        active_pa_chat_session: message.pa_chat_session,
      });
      setSupportEngineer({
        type: "UPDATE_ACTIVE_PA_CHAT_SESSION_ID",
        active_pa_chat_session_id: message.pa_chat_session_id,
      });
    } else {
      updateUserData({
        type: "ADD_MESSAGE",
        message: message,
      });
    }
  }, [setSupportEngineer, updateUserData]);

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

  const handleSupportEngineerUpdate = (data) => {
    setSupportEngineer(data);
  };

  const routes = useMemo(() => {
    if (!isAuthenticated) {
      return <Navigate to="/?action=login" replace />;
    }

    return (
      <Routes>
        <Route path="/feed/*" element={<CommunityRouter />} />
        <Route path="/global-search/*" element={<GlobalSearch />} />
        <Route path="/prime-programs/certificate/*" element={<PrimeProgramsCertificate />} />
        <Route path="/notifications/:id/*" element={<NotificationSinglePage />} />
        <Route path="/prime-programs/*" element={<PrimeProgramsRouter />} />
        <Route path="/prime-programs-inner/*" element={<PrimeProgramsInnerRouter />} />
        <Route path="/settings/*" element={<SettingsRouter />} />
        <Route path="/401" element={<Error401 />} />
        <Route path="/403" element={<Error403 />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="/500" element={<Error500 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    );
  }, [isAuthenticated]);

  return (
    <div id="main-container">
      <Header />
      {/* <MessagePopUp /> */}
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
