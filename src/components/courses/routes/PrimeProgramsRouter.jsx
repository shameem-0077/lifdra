import React, { Suspense, lazy, useState, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import "../../../assets/css/Style.css";
import RouteLoading from "../../../general/conponents/RouteLoading";

import Nav from "../../learn/screens/prime-programs/Nav";
import { PrivateRoute } from "../../routing/PrivateRoute";
import NewBuyNowModal from "../../learn/screens/prime-programs/NewBuyNowModal";
import PrimeSubcribeModal from "../../web/explore-pages/prime-program/Modals/PrimeSubcribeModal";
import queryString from "query-string";
import TalropEdtechHelmet from "../../general/helpers/TalropEdtechHelmet";
import Sidebar from "../../general/conponents/Sidebar";
const PrimeProgramsPurchasedList = lazy(() =>
  import("../../learn/screens/prime-programs/PrimeProgramsPurchasedList")
);

function PrimeProgramsRouter() {
  const { user_data, updateUserData } = useAuthStore();
  const divMainClass = user_data?.divMainClass;
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
    updateUserData({ active_menu: "prime-programs" });
  }, [updateUserData]);

  return (
    <>
      <TalropEdtechHelmet title="Prime Programs" />
      <div id="main" className={divMainClass}>
        <Sidebar />
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

export default PrimeProgramsRouter;
