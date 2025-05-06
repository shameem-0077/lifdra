import React, { Suspense, lazy } from "react";
import "../../../assets/css/web.css";
import "../../../assets/css/fancybox.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import auth from "../../../utils/auth";
import { Routes, Route, Navigate } from "react-router-dom";
import RouteLoading from "../conponents/RouteLoading";

import Steyp3LandingPage from "../pages/Steyp3LandingPage";

const LearnRouter = lazy(() => import("./LearnRouter"));
const Web404 = lazy(() => import("../pages/Web404"));
const AuthRouter = lazy(() => import("../../authentications/routes/AuthRouter"));

const PrimeLandingPage = lazy(() =>
  import("../../courses/pages/PrimeLandingPage")
);

const NewTermsAndConditions = lazy(() =>
  import("../pages/NewTermsAndConditions")
);
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const ContactUs = lazy(() => import("../pages/ContactUs"));


export default function WebRouter() {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />} />
        
        {/* web pages */}
        <Route
          path="/"
          element={
            auth.isAuthenticated() ? (
              <Navigate to="/feed/" replace />
            ) : (
              <Steyp3LandingPage />
            )
          }
        />

        <Route
          path="/terms-of-service/"
          element={<NewTermsAndConditions />}
        />
        <Route path="/privacy-policy/" element={<PrivacyPolicy />} />
        <Route path="/contact-us/" element={<ContactUs />} />
        
        
        <Route path="/*" element={<LearnRouter />} />
        {/* Error Pages */}
        <Route path="*" element={<Web404 />} />
      </Routes>
    </Suspense>
  );
}
