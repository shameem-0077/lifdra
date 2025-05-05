import React, { Suspense, lazy } from "react";
import "../../../assets/css/web.css";
import "../../../assets/css/fancybox.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import auth from "../auth";
import { Routes, Route, Navigate } from "react-router-dom";
import RouteLoading from "../RouteLoading";
import Steyp3LandingPage from "../../web/screens/steyp-landing-page/3-0-landing-page/Steyp3LandingPage";

const LearnRouter = lazy(() => import("../learn/LearnRouter"));
const Web404 = lazy(() => import("../../error-pages/Web404"));
const AuthRouter = lazy(() => import("../authentication/AuthRouter"));
const LogoutRoute = lazy(() => import("../LogoutRoute"));

const PrimeLandingPage = lazy(() =>
  import("../../web/explore-pages/prime-program/screens/PrimeLandingPage")
);

const NewTermsAndConditions = lazy(() =>
  import("../../web/screens/NewTermsAndConditions")
);
const PrivacyPolicy = lazy(() => import("../../web/screens/PrivacyPolicy"));
const ContactUs = lazy(() => import("../../web/screens/ContactUs"));

const DynamicProgramPlans = lazy(() =>
  import("../../web/screens/techies-club-single-page/DynamicProgramPlans")
);

export default function WebRouter() {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/auth/logout/" element={<LogoutRoute />} />
        
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
        <Route path="/plans/" element={<DynamicProgramPlans />} />
        <Route path="/privacy-policy/" element={<PrivacyPolicy />} />
        <Route path="/contact-us/" element={<ContactUs />} />
        
        
        <Route path="/*" element={<LearnRouter />} />
        {/* Error Pages */}
        <Route path="*" element={<Web404 />} />
      </Routes>
    </Suspense>
  );
}
