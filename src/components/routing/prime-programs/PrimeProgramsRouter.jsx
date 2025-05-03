import React, { Suspense, lazy, useState, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { connect } from "react-redux";
import "../../../assets/css/Style.css";
import RouteLoading from "../RouteLoading";
import Nav from "../../learn/screens/prime-programs/Nav";
import { PrivateRoute } from "../PrivateRoute";
import BuynowModal from "../../learn/screens/prime-programs/BuynowModal";
import queryString from "query-string";
import TalropEdtechHelmet from "../../helpers/TalropEdtechHelmet";
import NewBuyNowModal from "../../learn/screens/prime-programs/NewBuyNowModal";
import PrimeSubcribeModal from "../../web/explore-pages/prime-program/Modals/PrimeSubcribeModal";
import PrimeLandingPage from "../../web/explore-pages/prime-program/screens/PrimeLandingPage";

// const PrimeLandingPage = lazy(() =>
//     import("../../web/explore-pages/prime-program/screens/PrimeLandingPage")
// );

const PrimeProgramsHome = lazy(() =>
  import("../../learn/screens/prime-programs/PrimeProgramsHome")
);

const PrimeProgramsPurchasedList = lazy(() =>
  import("../../learn/screens/prime-programs/PrimeProgramsPurchasedList")
);

function mapStateToProps(state) {
  return {
    divMainClass: state.divMainClass,
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    updateActiveMenu: (active_menu) =>
      dispatch({
        type: "ACTIVE_MENU",
        active_menu: active_menu,
      }),
  };
}

function PrimeProgramsRouter(props) {
  const location = useLocation();
  const [action, setAction] = useState("");
  const [days, setDays] = useState("");
  const navigate = useNavigate();

  const closeModal = () => {
    setAction("");
    setDays("");
    navigate(location.pathname);
  };

  useEffect(() => {
    const { search } = location;
    const values = queryString.parse(search);
    const action = values.action;
    const d = values.d;

    setAction(action);
    setDays(d);
  }, [location.search]);

  useEffect(() => {
    props.updateActiveMenu("prime-programs");
  }, []);

  return (
    <>
      <TalropEdtechHelmet title="Prime Programs" />
      <div id="main" className={props.divMainClass}>
        {/* <BuynowModal
                    location={props.location}
                    action={action}
                    closeModal={closeModal}
                /> */}
        <NewBuyNowModal
          location={location}
          action={action}
          closeModal={closeModal}
        />
        <PrimeSubcribeModal
          location={location}
          action={action}
          closeModal={closeModal}
          days={days}
        />
        <Nav />
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            {/* <Route
                            exact
                            path="/prime-programs/"
                            component={PrimeLandingPage}
                        /> */}

            {/* <Route
                            exact
                            path="/prime-programs/courses/"
                            component={PrimeProgramsHome}
                        /> */}
            <Route path="/prime-programs/courses/" element={<Navigate to="/prime-programs/courses/purchased" replace />} />
            <Route
              path="/prime-programs/courses/purchased/"
              element={
                <PrivateRoute>
                  <PrimeProgramsPurchasedList />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(PrimeProgramsRouter);
