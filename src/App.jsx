import React, { useEffect, useState } from "react";
import "./assets/css/LineAwesome.css";
import { serverConfig } from "./axiosConfig";
import AppRouter from "./components/general/routes/AppRouter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-magic-slider-dots/dist/magic-dots.css";
import queryString from "query-string";
import { useNavigate, useLocation, BrowserRouter } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import useUserStore from "./store/userStore";
import { useUIStore } from "./store/uiStore";
import { useNotificationStore } from "./store/notificationStore";
import RouteLoading from "./components/general/conponents/RouteLoading";
import auth from "./utils/auth";


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
  const [isAppLoading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Get state and actions from Zustand stores
  const { loginData, setLoginData, logout } = useUserStore();
  const { setMenuType } = useUIStore();
  const { setNotifications } = useNotificationStore();

  const [nextPath, setNextPath] = useState("");
  const [cnextPath, setCnextPath] = useState("");




  return (
    <React.Fragment>
      {/* <ScheduledMaintenance /> */}
      {/* {user_data?.access_token && <Notification />} */}
      {isAppLoading ? <RouteLoading /> : <AppRouter {...props} />}
    </React.Fragment>
  );
};

export default App;
