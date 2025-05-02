import React, { Suspense, useState, useEffect, lazy } from "react";
import "../../../assets/css/web.css";
import "../../../assets/css/fancybox.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import auth from "../auth";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import RouteLoading from "../RouteLoading";
import { AuthRoute } from "../AuthRoute";
import StudentInfo from "../../web/screens/StudentInfo";
import SignupInfo from "../../web/screens/SignupInfo";
import PromocodeInfo from "../../web/screens/PromocodeInfo";
import PromocodeUsers from "../../web/screens/PromocodeUsers";
import ReferralToken from "../../web/screens/ReferralToken";
import ReferralTokenInfo from "../../web/screens/ReferralTokenInfo";
import SteypLandingPage from "../../web/screens/steyp-landing-page/new-landing-page/SteypLandingPage";
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

const TechiesClubExplore = lazy(() =>
  import("../../web/explore-pages/techies-club/screens/TechiesClubExplore")
);

const DynamicProgramPlans = lazy(() =>
  import("../../web/screens/techies-club-single-page/DynamicProgramPlans")
);

export default function WebRouter() {
  const dispatch = useDispatch();

  return (
    <Suspense fallback={<RouteLoading />}>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route
          path="/get-info/refferal-token/712ee99b-260f-42e2-807f-b7690458d17e/"
          element={<StudentInfo />}
        />
        <Route
          path="/get-info/refferal-token/712ee99b-260f-42e2-807f-b7690458d17e/:phone/"
          element={<SignupInfo />}
        />
        <Route
          path="/get-info/promo-token/712ee99b-260f-42e2-807f-b7690458d17e/"
          element={<PromocodeInfo />}
        />
        <Route
          path="/get-info/promo-token/712ee99b-260f-42e2-807f-b7690458d17e/:token/"
          element={<PromocodeUsers />}
        />
        <Route
          path="/get-info/referral-token/712ee99b-260f-42e2-807f-b7690458d17e/"
          element={<ReferralTokenInfo />}
        />
        <Route
          path="/get-info/referral-token/712ee99b-260f-42e2-807f-b7690458d17e/:token/"
          element={<ReferralToken />}
        />
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
          path="/mlp/tech-Schooling/"
          element={<TechiesClubExplore />}
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
