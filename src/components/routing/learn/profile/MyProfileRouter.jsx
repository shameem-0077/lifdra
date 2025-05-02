import React, { Suspense, lazy, useEffect, useState } from "react";
import { PrivateRoute } from "../../PrivateRoute";
import ProfileTop from "../../../learn/screens/profile/my-profile/ProfileTop";
import NewUpdatesProfileModal from "../../../learn/includes/profile/modals/NewUpdatesProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { accountsConfig } from "../../../../axiosConfig";
import RouteLoading from "../../RouteLoading";
import { Switch } from "react-router-dom";

const MyProfile = lazy(() =>
  import("../../../learn/screens/profile/my-profile/MyProfile")
);
const PaymentHistory = lazy(() =>
  import("../../../learn/screens/profile/my-profile/PaymentHistory")
);
const TransactionHistory = lazy(() =>
  import("../../../learn/screens/profile/coins/TransactionHistory")
);
const Devices = lazy(() =>
  import("../../../learn/screens/profile/my-profile/Devices")
);
const Setting = lazy(() =>
  import("../../../learn/screens/profile/my-profile/setting/MySttings")
);

function MyProfileRouter() {
  const {
    user_data: { access_token },
    isNewUpdateModal,
  } = useSelector((state) => state);
  const [userProfileDetails, setUserProfileDetails] = useState({});
  const [isReload, setReload] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const handleSocialMedia = () => {
    dispatch({
      type: "TOGGLE_NEW_UPDATES_MODAL",
    });
    dispatch({
      type: "UPDATE_NEW_UPDATES_MODAL_TYPE",
      newUpdatesModalType: "add_social_media",
    });
  };
  useEffect(() => {
    if (isNewUpdateModal) {
      dispatch({
        type: "TOGGLE_NEW_UPDATES_MODAL",
      });
    }
  }, []);

  const getMyProfileDetails = () => {
    setLoading(true);
    accountsConfig
      .get("/api/v1/users/profile/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          setUserProfileDetails(data);

          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (access_token) {
      getMyProfileDetails();
    }
  }, [access_token, isReload]);

  return (
    <>
      <ProfileTop
        userProfileDetails={userProfileDetails}
        setReload={setReload}
        handleSocialMedia={handleSocialMedia}
      />
      <NewUpdatesProfileModal
        setReload={setReload}
        userProfileDetails={userProfileDetails}
      />
      <Suspense fallback={<RouteLoading />}>
        <Switch>
          <PrivateRoute
            exact
            path="/profile/"
            component={() => (
              <MyProfile
                userProfileDetails={userProfileDetails}
                isLoading={isLoading}
              />
            )}
          />
          <PrivateRoute
            exact
            path="/profile/payment-history/"
            /// component={PaymentHistory}
            component={TransactionHistory}
          />
          <PrivateRoute exact path="/profile/devices/" component={Devices} />
          <PrivateRoute exact path="/profile/setting/" component={Setting} />
        </Switch>
      </Suspense>
    </>
  );
}

export default MyProfileRouter;
