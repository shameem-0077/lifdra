import React, { useEffect, useState } from "react";
import "./assets/css/LineAwesome.css";
import { useDispatch, useSelector, Provider } from "react-redux";
import { accountsConfig, notificationsConfig } from "./axiosConfig";
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
import store from "./store";

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
    <Provider store={store}>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </Provider>
  );
}

const MainApp = (props) => {
  const [isAppLoading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const { user_data, playerSettings, user_profile, subscribed } = useSelector(
    (state) => state
  );

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
    // Detect platform and store it in Redux and localStorage
    const platform = navigator.platform.toLowerCase();
    // Store the device type in localStorage
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

  const dispatch = useDispatch();

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
    dispatch({
      type: "UPDATE_PRIME_PROGRAM_PLAN",
      primeSubscriptionPlan: user_profile?.prime_program_subscription || null,
    });
  }, [user_profile]);

  // useEffect(() => {
  //   if (
  //     user_profile?.is_old_student === true &&
  //     user_profile.subscription_data.has_active_subscription === true &&
  //     user_profile.subscription_data.expired_subscription === true &&
  //     user_profile?.is_sat_approval_status === "not_applied"
  //   ) {
  //     history.push("/subscription/");
  //   }
  // }, []);

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
      dispatch({
        type: "MENU_TYPE",
        menu_type: menu_type,
      });
    }

    async function fetchTidioSettings() {
      let promise = new Promise((resolve, reject) => {
        let tidioSettings = localStorage.getItem("tidioSettings");
        if (tidioSettings) {
          tidioSettings = JSON.parse(tidioSettings);
        } else {
          tidioSettings = { isOpened: false };
        }

        dispatch({
          type: "UPDATE_TIDIO_SETTINGS",
          tidioSettings: tidioSettings,
        });

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
        accountsConfig
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
            let { StatusCode, data } = response.data;
            if (StatusCode === 6000) {
              dispatch({
                type: "UPDATE_USER_DATA",
                user_data: data,
              });
              fetchUserProfileData(data);
              navigate("/tech-schooling/");
            } else if (StatusCode === 6001) {
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
        dispatch({
          type: "UPDATE_SIGNUP_DATA",
          signup_data: signup_data_value,
        });

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

  useEffect(() => {
    const fetchSchoolScientistData = () => {
      let schoolScientistData = localStorage.getItem("school_scientist_data");
      if (schoolScientistData) {
        schoolScientistData = JSON.parse(schoolScientistData);
        dispatch({
          type: "UPDATE_SCHOOL_SCIENTIST_DATA",
          school_scientist_data: schoolScientistData,
        });
      }
    };

    const fetchOneCreatorScholarshipData = () => {
      let oneCreatorScholarshipData = localStorage.getItem("one_creator_data");
      if (oneCreatorScholarshipData) {
        oneCreatorScholarshipData = JSON.parse(oneCreatorScholarshipData);
        dispatch({
          type: "UPDATE_ONE_CREATOR_DATA",
          one_creator_data: oneCreatorScholarshipData,
        });
      }
    };

    const fetchMsfScholarshipData = () => {
      let msfcholarshipData = localStorage.getItem("msf_scholarship_data");
      if (msfcholarshipData) {
        msfcholarshipData = JSON.parse(msfcholarshipData);
        dispatch({
          type: "UPDATE_MSF_SCHOLARSHIP_DATA",
          msf_scholarship_data: msfcholarshipData,
        });
      }
    };

    const fetchOneCreatorScholarshipExamData = () => {
      let scholarshipExamData = localStorage.getItem("one_creator_exam_data");
      if (scholarshipExamData) {
        scholarshipExamData = JSON.parse(scholarshipExamData);
        dispatch({
          type: "UPDATE_ONE_CREATOR_EXAM_DATA",
          dispatchValue: scholarshipExamData,
        });
      }
    };

    const fetchMsfScholarshipExamData = () => {
      let MsfScholarshipExamData = localStorage.getItem(
        "msf_scholarship_exam_data"
      );
      if (MsfScholarshipExamData) {
        MsfScholarshipExamData = JSON.parse(MsfScholarshipExamData);
        dispatch({
          type: "UPDATE_MSF_SCHOLARSHIP_EXAM_DATA",
          dispatchValue: MsfScholarshipExamData,
        });
      }
    };

    const fetchGreenovationExamData = () => {
      let GreenovationExamData = localStorage.getItem(
        "greenovation_scholarship_exam_data"
      );
      if (GreenovationExamData) {
        GreenovationExamData = JSON.parse(GreenovationExamData);
        dispatch({
          type: "UPDATE_GREENOVATION_SCHOLARSHIP_EXAM_DATA",
          dispatchValue: GreenovationExamData,
        });
      }
    };

    const fetchScholarshipExamLanguage = () => {
      let scholarshipExamLanguage = localStorage.getItem(
        "scholarshipExamLanguage"
      );
      if (scholarshipExamLanguage) {
        scholarshipExamLanguage = JSON.parse(scholarshipExamLanguage);
        dispatch({
          type: "UPDATE_SCHOLARSHIP_LANGUAGE",
          scholarshipExamLanguage: scholarshipExamLanguage,
        });
      }
    };

    const fetchEntranceExamData = () => {
      let scholarshipEntranceExamData =
        localStorage.getItem("entrance_exam_data");
      if (scholarshipEntranceExamData) {
        scholarshipEntranceExamData = JSON.parse(scholarshipEntranceExamData);
        dispatch({
          type: "UPDATE_ENTRANCE_EXAM_DATA",
          dispatchValue: scholarshipEntranceExamData,
        });
      }
    };

    fetchSchoolScientistData();
    fetchOneCreatorScholarshipData();
    fetchMsfScholarshipData();
    fetchOneCreatorScholarshipExamData();
    fetchMsfScholarshipExamData();
    fetchGreenovationExamData();
    fetchScholarshipExamLanguage();
    fetchEntranceExamData();
  }, []);

  const refreshToken = () => {
    let { access_token, refresh_token } = user_data;
    accountsConfig
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
        const { StatusCode, data } = response.data;

        if (StatusCode === 6000) {
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
            dispatch({
              type: "UPDATE_USER_DATA",
              user_data: {
                ...user_data,
                access_token: "32ijz2OGEoIXV3wGmqY6mxiBl1Smri",
                refresh_token: "aspKCIrDTwcv5OEeGE874ht5N3JxA1",
              },
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

  const { is_profile_update } = useSelector((state) => state);

  // useEffect(() => {
  //     fetchUserProfileData();
  // }, [is_profile_update]);

  useEffect(() => {
    const { access_token } = user_data || {};
    if (!access_token) {
      let userdata = localStorage.getItem("user_data");
      if (userdata) {
        userdata = JSON.parse(userdata);
        dispatch({
          type: "UPDATE_USER_DATA",
          user_data: userdata,
        });
      }
    }
  }, []);

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
        accountsConfig
          .get("/api/v1/users/profile/", {
            params: { response_type: "minimal" },
            headers: { Authorization: `Bearer ${access_token}` },
          })
          .then((response) => {
            const { StatusCode, data } = response.data;

            if (StatusCode === 6000) {
              let { subscription_data } = data;
              if (subscription_data.has_active_subscription) {
                dispatch({
                  type: "UPDATE_USER_DATA",
                  user_data: {
                    ...user,
                    has_active_subscription:
                      subscription_data.has_active_subscription,
                    name: data.name,
                    phone: data.phone,
                    signup_type: data.signup_type,
                    pk: data.id,
                  },
                });
              } else {
                dispatch({
                  type: "UPDATE_USER_DATA",
                  user_data: {
                    ...user,
                    name: data.name,
                    phone: data.phone,
                    signup_type: data.signup_type,
                    pk: data.id,
                  },
                });
              }

              dispatch({
                type: "UPDATE_USER_PROFILE",
                user_profile: data,
              });
              dispatch({
                type: "UPDATE_PRIME_SUBSCRIPTION",
                prime_subscription: data.primeSubscriptionPlan,
              });
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
    notificationsConfig
      .get("main/user-notifications/", {
        params: { "response-length": 3 },
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        const { StatusCode, data, count } = response.data;

        if (StatusCode === 6000) {
          dispatch({
            type: "UPDATE_NOTIFICATIONS",
            notifications: data,
            notifications_count: count,
          });
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
      {user_data?.access_token && <Notification />}
      {isAppLoading ? <RouteLoading /> : <AppRouter {...props} />}
    </React.Fragment>
  );
};

export default App;
