import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "../../../assets/css/Style.css";
import SupportEngineerStore from "../../contexts/stores/SupportEngineerStore";
import RouteLoading from "../../../general/conponents/RouteLoading";

import { useAuthStore } from "../../../store/authStore";
import { useSubscriptionStore } from "../../../store/subscriptionStore";

const StudentRouter = lazy(() => import("./StudentRouter"));
const Error404 = lazy(() => import("../pages/Error404"));

export default function LearnRouter(props) {
  const { user_profile } = useAuthStore();
  const { setSubscriptionType } = useSubscriptionStore();
  const subscription_data = user_profile?.subscription_data || {};
  const [subscriptionType, setLocalSubscriptionType] = useState("");

  useEffect(() => {
    if (subscription_data?.has_active_subscription) {
      if (!subscription_data?.expired_subscription) {
        if (subscription_data?.is_paid_subscription) {
          setLocalSubscriptionType("paid_subscription");
        } else {
          setLocalSubscriptionType("trial_active");
        }
      } else {
        if (subscription_data?.is_paid_subscription) {
          setLocalSubscriptionType("expired_subscription");
        } else {
          setLocalSubscriptionType("trial_end");
        }
      }
    }
  }, [subscription_data?.end_timestamp]);

  useEffect(() => {
    setSubscriptionType(subscriptionType);
  }, [subscriptionType]);

  return (
    <Suspense fallback={<RouteLoading />}>
      <Routes>
        {/* Student Pages */}
        <Route
          path="/*"
          element={
            <StudentRouter {...props} />
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}
