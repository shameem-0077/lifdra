import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import RouteLoading from "../conponents/RouteLoading";

import { useAuthStore } from "../../../store/authStore";
import { useTidioStore } from "../../../store/tidioStore";

// const WebRouter = lazy(() => import("./web/WebRouter"));
const WebRouter = lazy(() => import("./WebRouter"));

const SteypTermsAndCondition = lazy(() =>
  import("../pages/SteypTermsAndCondition")
);

const NewTermsAndConditions = lazy(() =>
  import("../pages/NewTermsAndConditions")
);
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const AboutUs = lazy(() => import("../pages/AboutUs"));

function AppRouter() {
  const { user_profile } = useAuthStore();
  const { tidioSettings, updateTidioSettings } = useTidioStore();
  const [isToast, setToast] = useState(false);

  const handleTidioClick = (bool) => {
    updateTidioSettings(bool);
  };

  useEffect(() => {
    document.addEventListener("tidioChat-open", () => {
      setToast(false);
      handleTidioClick(true);
    });

    if (window.tidioChatApi) {
      window.tidioChatApi.on("ready", () => {
        setToast(true);
      });

      document.tidioIdentify = {
        distinct_id: user_profile?.user_id, // Unique visitor ID in your system
        email: user_profile?.email, // visitor email
        name: user_profile?.name, // Visitor name
        phone: user_profile?.phone ? `+91 ${user_profile.phone}` : undefined, //Visitor phone
      };

      window.tidioChatApi.setContactProperties({
        user_id: user_profile?.user_id,
        program: user_profile?.program?.name,
        rm: user_profile?.rm_name,
      });

      window.tidioChatApi.setVisitorData({
        distinct_id: user_profile?.user_id, // Unique visitor ID in your system
        email: user_profile?.email, // visitor email
        name: user_profile?.name, // Visitor name
        phone: user_profile?.phone ? `+91 ${user_profile.phone}` : undefined, //Visitor phone
      });
    } else {
      document.addEventListener("tidioChat-ready", () => {
        setToast(true);
        document.tidioIdentify = {
          distinct_id: user_profile?.user_id, // Unique visitor ID in your system
          email: user_profile?.email, // visitor email
          name: user_profile?.name, // Visitor name
          phone: user_profile?.phone ? `+91 ${user_profile.phone}` : undefined, //Visitor phone
        };

        window.tidioChatApi.setContactProperties({
          user_id: user_profile?.user_id,
          program: user_profile?.program?.name,
          rm: user_profile?.rm_name,
        });

        window.tidioChatApi.setVisitorData({
          distinct_id: user_profile?.user_id, // Unique visitor ID in your system
          email: user_profile?.email, // visitor email
          name: user_profile?.name, // Visitor name
          phone: user_profile?.phone ? `+91 ${user_profile.phone}` : undefined, //Visitor phone
        });
      });
    }
  }, [user_profile, window.tidioChatApi]);

  return (
    <>
      <Suspense fallback={<RouteLoading />}>
        <Routes>
          <Route path="/tos/" element={<SteypTermsAndCondition />} />
          <Route
            path="/termsand-conditions/"
            element={<NewTermsAndConditions />}
          />
          <Route path="/privacy-policy/" element={<PrivacyPolicy />} />
          <Route path="/contact-us/" element={<ContactUs />} />
          <Route path="/about-us/" element={<AboutUs />} />

          {/* Website Pages */}
          <Route path="/*" element={<WebRouter />} />
        </Routes>
      </Suspense>
      {/* <Notification /> */}
    </>
  );
}

export default AppRouter;

const BubbleCard = styled.div`
  position: fixed;
  background: #fff;
  box-shadow: rgb(0 18 46 / 16%) 0px 8px 36px 0px;
  bottom: 133px;
  right: 26px;
  cursor: pointer;
  border-radius: 11px;
  pointer-events: auto;
  z-index: 9999;
  left: auto;
  padding: 18px 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  span.shape {
    width: 0px;
    height: 0px;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 13px solid rgb(255, 255, 255);
    position: absolute;
    right: 17px;
    bottom: -8px;
  }
  @media (max-width: 768px) {
    bottom: 112px;
    right: 17px;
  }
  @media (max-width: 480px) {
    bottom: 109px;
    right: 13px;
  }
`;
const Emoji = styled.span`
  font-size: 29px;
`;
const Para = styled.p`
  font-family: "gordita_regular";
  font-size: 14px;
  color: #2d2d2d;
  span {
    font-family: "gordita_medium";
    text-transform: uppercase;
  }
`;
const Close = styled.img`
  position: absolute;
  right: 11px;
  top: 13px;
  width: 9px;
  display: block;
  cursor: pointer;
`;
