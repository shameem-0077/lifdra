import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "../../../assets/css/Style.css";
import RouteLoading from "../conponents/RouteLoading";

import useUserStore from "../../../store/userStore";
import { useSubscriptionStore } from "../../../store/subscriptionStore";

const StudentRouter = lazy(() => import("./StudentRouter"));
const Error404 = lazy(() => import("../pages/Error404"));

export default function LearnRouter(props) {
  const { loginData } = useUserStore();
  const { setSubscriptionType } = useSubscriptionStore();
  const [subscriptionType, setLocalSubscriptionType] = useState("");

  return (
    <Suspense fallback={<RouteLoading />}>
      <Routes>
        {/* Student Pages */}
        <Route
          path="/*"
          element={
            <StudentRouter />
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}
