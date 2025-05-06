import React, { useEffect, useState } from "react";
import "./assets/css/LineAwesome.css";
import { serverConfig } from "./axiosConfig";
import AppRouter from "./components/routing/AppRouter";
import auth from "./components/routing/auth";
import RouteLoading from "./components/routing/RouteLoading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-magic-slider-dots/dist/magic-dots.css";
import queryString from "query-string";
import { useNavigate, useLocation, BrowserRouter } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useAuthStore } from "./store/authStore";
import { useUIStore } from "./store/uiStore";
import { useNotificationStore } from "./store/notificationStore";

let hidden = null;
let visibilityChange = null;
if (typeof document.hidden !== "undefined") {
  // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

const MainApp = (props) => {
  const [isAppLoading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  // Get state and actions from Zustand stores
  const { user_data, user_profile, setUserData, setUserProfile } = useAuthStore();
  const { setMenuType } = useUIStore();
  const { setNotifications } = useNotificationStore();

  const [nextPath, setNextPath] = useState("");
  const [cnextPath, setCnextPath] = useState("");

  useEffect(() => {
    let { search } = location;
    const values = queryString.parse(search);
    if (values.r) {
      setNextPath(values.r);
    } else if (values.c) {
      setCnextPath(values.c);
    }
  }, []);

  useEffect(() => {
    // Detect platform and store it in localStorage
    const platform = navigator.platform.toLowerCase();
    localStorage.setItem("device_type", platform);
  }, []);

  useEffect(() => {
    if (nextPath) {
      localStorage.setItem("referral_code", JSON.stringify(nextPath));
    } else {
      window.localStorage.removeItem("referral_code");
    }
    if (cnextPath !== "") {
      localStorage.setItem("c", JSON.stringify(cnextPath));
    } else {
      window.localStorage.removeItem("c");
    }
  }, [nextPath, cnextPath]);

  async function updateStatus(type) {
    const docRef = doc(db, "users", user_data.uid);
    const docSnap = await getDoc(docRef);

    if (auth.isAuthenticated()) {
      if (docSnap.exists()) {
        updateDoc(doc(db, "users", user_data.uid), {
          isOnline: type,
          lastActiveTime: !type ? Timestamp.fromDate(new Date()) : null,
        });
      }
    }
  }

  const handleVisibilityChange = () => {
    if (user_data?.uid) {
      if (document[hidden]) {
        updateStatus(false);
      } else {
        updateStatus(true);
      }
    }
  };

  useEffect(() => {
    document.addEventListener(visibilityChange, handleVisibilityChange, false);

    return () =>
      document.removeEventListener(visibilityChange, handleVisibilityChange);
  }, [user_data?.uid]);

  useEffect(() => {
    function updateDimensions() {
      let menu_type = "";
      if (window.innerWidth <= 1100) {
        menu_type = "hidden";
      } else if (window.innerWidth <= 1500) {
        menu_type = "mini-sidebar";
      } else {
        menu_type = "normal";
      }
      setMenuType(menu_type);
    }

    async function fetchTidioSettings() {
      let promise = new Promise((resolve, reject) => {
        let tidioSettings = localStorage.getItem("tidioSettings");
        if (tidioSettings) {
          tidioSettings = JSON.parse(tidioSettings);
        } else {
          tidioSettings = { isOpened: false };
        }
        // TODO: Add tidio settings to Zustand store if needed
        setTimeout(() => {
          resolve("done!");
        }, 500);
      });

      let result = await promise;
    }

    fetchTidioSettings();

    const fetchUserData = () => {
      let { search } = location;
      const values = queryString.parse(search);
      const access_token = values.t;
      if (values.t) {
        serverConfig
          .get(
            "api/v1/users/get-student-info/",
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
              params: {
                service: "learn",
              },
            }
          )
          .then((response) => {
            let { status_code, data } = response.data;
            if (status_code === 6000) {
              setUserData(data);
              fetchUserProfileData(data);
              navigate("/tech-schooling/");
            } else if (status_code === 6001) {
              navigate("/tech-schooling/");
            }
          });
      } else {
        let user_data_stored = localStorage.getItem("user_data");
        let user_data_value = JSON.parse(user_data_stored);

        let signup_data_stored = localStorage.getItem("signup_data");
        if (!signup_data_stored) {
          localStorage.setItem("signup_data", JSON.stringify({}));
          signup_data_stored = localStorage.getItem("signup_data");
        }

        let signup_data_value = JSON.parse(signup_data_stored);
        // TODO: Add signup data to Zustand store if needed

        fetchUserProfileData(user_data_value);
      }
    };
    fetchUserData();
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [auth.isAuthenticated()]);

  const refreshToken = () => {
    let { access_token, refresh_token } = user_data;
    serverConfig
      .post(
        "/api/v1/users/token/refresh/",
        {
          service: "learn",
          refresh_token: refresh_token,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((response) => {
        const { status_code, data } = response.data;

        if (status_code === 6000) {
          if (data.error === "invalid_grant") {
            localStorage.clear();
            auth.logout(() => {
              return true;
            });
            window.location = "";
            setTimeout(() => {
              setLoading(false);
            }, 500);
          } else {
            setUserData({
              ...user_data,
              access_token: "32ijz2OGEoIXV3wGmqY6mxiBl1Smri",
              refresh_token: "aspKCIrDTwcv5OEeGE874ht5N3JxA1",
            });
            setTimeout(() => {
              fetchUserProfileData();
            }, 500);
          }
        } else {
          localStorage.clear();
          window.location = "";
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      })
      .catch((error) => {
        localStorage.clear();
        window.location = "";
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  const fetchUserProfileData = (data) => {
    let user = data ? data : user_data;
    if (user) {
      if (user.is_verified) {
        auth.login(() => {
          return true;
        });
      } else {
        auth.logout(() => {
          return true;
        });
      }
    }

    if (user) {
      const { access_token, is_verified } = user || {};

      if (is_verified) {
        serverConfig
          .get("/api/v1/users/profile/", {
            params: { response_type: "minimal" },
            headers: { Authorization: `Bearer ${access_token}` },
          })
          .then((response) => {
            const { status_code, data } = response.data;

            if (status_code === 6000) {
              let { subscription_data } = data;
              if (subscription_data.has_active_subscription) {
                setUserData({
                  ...user,
                  has_active_subscription: subscription_data.has_active_subscription,
                  name: data.name,
                  phone: data.phone,
                  signup_type: data.signup_type,
                  pk: data.id,
                });
              } else {
                setUserData({
                  ...user,
                  name: data.name,
                  phone: data.phone,
                  signup_type: data.signup_type,
                  pk: data.id,
                });
              }

              setUserProfile(data);
              // TODO: Add prime subscription to Zustand store if needed
              setLoading(false);
            } else {
              setLoading(false);
            }
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 401) {
                refreshToken();
              } else {
                setLoading(false);
              }
            } else {
              setLoading(false);
            }
          });
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const fetchNotifications = (access_token) => {
    serverConfig
      .get("main/user-notifications/", {
        params: { "response-length": 3 },
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        const { status_code, data, count } = response.data;

        if (status_code === 6000) {
          setNotifications(data, count);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const element = document.getElementById("zsiq_float");
      if (element) {
        if (!auth.isAuthenticated()) {
          element.classList.add("hide-zoho");
          clearInterval(interval);
        } else {
          element.classList.remove("hide-zoho");
          clearInterval(interval);
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isAppLoading, auth.isAuthenticated()]);

  return (
    <React.Fragment>
      {/* <ScheduledMaintenance /> */}
      {/* {user_data?.access_token && <Notification />} */}
      {isAppLoading ? <RouteLoading /> : <AppRouter {...props} />}
    </React.Fragment>
  );
};

export default App;
