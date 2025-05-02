import React, { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "../../../assets/css/Style.css";
import PrimeProgramStore from "../../contexts/stores/PrimeProgramStore";
import SupportEngineerStore from "../../contexts/stores/SupportEngineerStore";
import RouteLoading from "../RouteLoading";

const StudentRouter = lazy(() => import("./StudentRouter"));
const Error404 = lazy(() => import("../../error-pages/Error404"));

export default function LearnRouter(props) {
  const user_profile = useSelector((state) => state.user_profile) || {};
  const subscription_data = user_profile?.subscription_data || {};

  const dispatch = useDispatch();
  const [subscriptionType, setSubscriptionType] = useState("");

  useEffect(() => {
    if (
      subscription_data?.has_active_subscription
    ) {
      if (!subscription_data?.expired_subscription) {
        if (subscription_data?.is_paid_subscription) {
          setSubscriptionType("paid_subscription");
        } else {
          setSubscriptionType("trial_active");
        }
      } else {
        if (subscription_data?.is_paid_subscription) {
          setSubscriptionType("expired_subscription");
        } else {
          setSubscriptionType("trial_end");
        }
      }
    }
  }, [subscription_data?.end_timestamp]);

  useEffect(() => {
    dispatch({
      type: "UPDATE_SUBSCRIPTION_TYPE",
      userSubscriptionType: subscriptionType,
    });
  }, [subscriptionType]);

  return (
    <Suspense fallback={<RouteLoading />}>
      <Routes>
        {/* Student Pages */}
        <Route
          path="/*"
          element={
            <SupportEngineerStore>
              <PrimeProgramStore>
                <StudentRouter {...props} />
              </PrimeProgramStore>
            </SupportEngineerStore>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}
