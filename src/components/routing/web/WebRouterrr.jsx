import React, { Suspense, useState, useEffect, lazy } from "react";
import "../../../assets/css/web.css";
import "../../../assets/css/fancybox.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import auth from "../auth";
import { Switch, Route, Redirect } from "react-router-dom";
import RouteLoading from "../RouteLoading";
import { AuthRoute } from "../AuthRoute";
import StudentInfo from "../../web/screens/StudentInfo";
import SignupInfo from "../../web/screens/SignupInfo";
import PromocodeInfo from "../../web/screens/PromocodeInfo";
import PromocodeUsers from "../../web/screens/PromocodeUsers";
import ReferralToken from "../../web/screens/ReferralToken";
import ReferralTokenInfo from "../../web/screens/ReferralTokenInfo";
import SatCampusForm from "../../web/screens/SatCampusForm";
import SatEnterOtp from "../../web/screens/SatEnterOtp";
import SteypLandingPage from "../../web/screens/steyp-landing-page/new-landing-page/SteypLandingPage";

const LearnRouter = lazy(() => import("../learn/LearnRouter"));
const Web404 = lazy(() => import("../../error-pages/Web404"));
const AuthRouter = lazy(() => import("../authentication/AuthRouter"));
const LogoutRoute = lazy(() => import("../LogoutRoute"));
const SatLandingPage = lazy(() =>
  import("../../web/screens/steyp-landing-page/SatLandingPage")
);
const ExamCompletedPage = lazy(() =>
  import(
    "../../web/screens/steyp-landing-page/school-scientists/ExamCompletedPage"
  )
);
const ExamExpird = lazy(() =>
  import("../../web/screens/steyp-landing-page/school-scientists/ExamExpird")
);
const VacationLandingPage = lazy(() =>
  import("../../web/explore-pages/techies-club/screens/VacationLandingPage")
);
const TechiesClubSingle = lazy(() =>
  import("../../web/screens/techies-club-single-page/TechiesClubSingle")
);

const PrimeLandingPage = lazy(() =>
  import("../../web/explore-pages/prime-program/screens/PrimeLandingPage")
);
const LandingPage = lazy(() =>
  import("../../web/screens/steyp-landing-page/LandingPage")
);
// const SchoolScientistLandingPage = lazy(() =>
//     import(
//         "../../web/screens/steyp-landing-page/new-landing-page/SchoolScientistLandingPage"
//     )
// );
const SchoolScientistRegisterPage = lazy(() =>
  import("../../web/screens/school-scientist/SchoolScientistRegisterPage")
);

const TechiesHubSingle = lazy(() =>
  import("../../web/screens/techies-hub-page/TechiesHubSingle")
);
const TechDegreeLanding = lazy(() =>
  import("../../web/screens/tech-degree/TechDegreeLanding")
);
const SteypTermsAndCondition = lazy(() =>
  import("../../learn/screens/terms&condition/SteypTermsAndCondition")
);
const NewTermsAndConditions = lazy(() =>
  import("../../web/screens/NewTermsAndConditions")
);
const PrivacyPolicy = lazy(() => import("../../web/screens/PrivacyPolicy"));
const ContactUs = lazy(() => import("../../web/screens/ContactUs"));

//explore pages
const TechiesClubExplore = lazy(() =>
  import("../../web/explore-pages/techies-club/screens/TechiesClubExplore")
);

class WebRouterrr extends React.PureComponent {
  render() {
    return (
      <Suspense fallback={<RouteLoading />}>
        {/* <NewBuyNowModal
                    location={props.location}
                    action={action}
                    closeModal={closeModal}
                /> */}
        <Switch>
          <AuthRoute path="/auth/" component={AuthRouter} />
          <Route
            exact
            path="/get-info/refferal-token/712ee99b-260f-42e2-807f-b7690458d17e/"
            component={StudentInfo}
          />
          <Route
            exact
            path="/get-info/refferal-token/712ee99b-260f-42e2-807f-b7690458d17e/:phone/"
            component={SignupInfo}
          />
          <Route
            exact
            path="/get-info/promo-token/712ee99b-260f-42e2-807f-b7690458d17e/"
            component={PromocodeInfo}
          />
          <Route
            exact
            path="/get-info/promo-token/712ee99b-260f-42e2-807f-b7690458d17e/:token/"
            component={PromocodeUsers}
          />
          <Route
            exact
            path="/get-info/referral-token/712ee99b-260f-42e2-807f-b7690458d17e/"
            component={ReferralTokenInfo}
          />
          <Route
            exact
            path="/get-info/referral-token/712ee99b-260f-42e2-807f-b7690458d17e/:token/"
            component={ReferralToken}
          />
          <LogoutRoute exact path="/auth/logout/" />
          {/* web pages */}
          {auth.isAuthenticated() ? (
            <Route exact path="/">
              <Redirect
                to={{
                  pathname: "/feed/",
                }}
              />
            </Route>
          ) : (
            // <Route exact path="/" component={LandingPage} />
            <Route exact path="/" component={SteypLandingPage} />
          )}
          <Route exact path="/sat/" component={SatLandingPage} />
          <Route exact path="/job-desk/" component={JobDeskLanding} />
          <Route
            exact
            path="/tech-schooling/apply/"
            component={SatCampusForm}
          />
          <Route exact path="/tech-degree/apply" component={SatCampusForm} />
          <Route exact path="/tech-grad/apply/" component={SatCampusForm} />
          <Route exact path="/sc">
            <Redirect
              to={{
                pathname: "/greenovation",
              }}
            />
          </Route>
          {/* <Route exact path="/sc">
						<Redirect
							to={{
								pathname: "/school-scientist",
							}}
						/>
					</Route> */}

          {/* <Route
                        exact
                        path="/school-scientist"
                        component={SchoolScientistLandingPage}
                    /> */}
          {/* <Route
                        exact
                        path="/school-scientist/apply/"
                        component={SchoolScientistRegisterPage}
                    /> */}
          {/* <Route
            exact
            path="/school-scientist/student/verify"
            component={ExamLoginPage}
          />
          <ScientistPrivateRoute path={`/school-scientist/exam/start/`}>
            <ExamInstructions />
          </ScientistPrivateRoute>
          <ScientistPrivateRoute path={`/school-scientist/exam/questions/`}>
            <ExaminationPage />
          </ScientistPrivateRoute>
          <ScientistPrivateRoute path={`/school-scientist/exam/completed/`}>
            <ExamCompletedPage />
          </ScientistPrivateRoute>
          <ScientistPrivateRoute path={`/school-scientist/exam/expired/`}>
            <ExamExpird />
          </ScientistPrivateRoute> */}
          <Route
            exact
            path="/tech-degree/apply/info/"
            component={CollegeApplicationForm}
          />
          <Route
            exact
            path="/tech-grad/apply/info/"
            component={DropoutApplicationForm}
          />
          <Route exact path="/sat/enquire/" component={SatEligibilityForm} />
          <Route exact path="/submit-otp/" component={SatEnterOtp} />
          <Route
            exact
            path="/tech-schooling/apply/info/"
            component={SatApplicationForm}
          />

          {/* <Route exact path="/hall-ticket/" component={} /> */}
          <Route
            exact
            path="/explore/tech-schooling/"
            component={TechiesClubSingle}
          />
          {/* <Route exact path="/prime-programs/" component={PrimeLandingPage} /> */}
          <Route
            exact
            path="/explore/tech-degree/"
            component={TechiesHubSingle}
          />
          <Route
            exact
            path="/explore/tech-grad/"
            component={TechDegreeLanding}
          />
          <Route
            exact
            path="/mlp/tech-Schooling/"
            component={TechiesClubExplore}
          />
          <Route
            exact
            path="/mlp/vacation-program/"
            component={VacationLandingPage}
          />
          <Route
            exact
            path="/terms-of-service/"
            component={NewTermsAndConditions}
          />
          <Route exact path="/privacy-policy/" component={PrivacyPolicy} />
          <Route exact path="/contact-us/" component={ContactUs} />
          {/* <Route path="/" component={LearnRouter} /> */}
          <Route path="/" component={LearnRouter} />
          {/* Error Pages */}
          <Route component={Web404} />
        </Switch>
      </Suspense>
    );
  }
  styles = {
    overlay: {
      backgroundColor: "rgba(255,255,255,0.7)",
      height: "100%",
      width: "100%",
      display: "block",
      position: "absolute",
      zIndex: 3,
    },
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      textAlign: "center",
      borderRadius: "10px",
    },
  };
}

export default WebRouterrr;
