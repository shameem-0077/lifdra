import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { requestForToken } from "../firebase";
import { requestForToken, onMessageListener } from "../firebase";

const Notify = () => {
  const [notification, setNotification] = useState({
    title: "",
    body: "",
  });
  const notify = () => toast(<ToastDisplay />);
  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    if (notification.title) {
      notify();
    }
  }, [notification]);

  requestForToken();
  // onMessageListener().then((payload) => {
  //   setNotification({
  //     title: payload?.notification?.title,
  //     body: payload?.notification?.body,
  //   });
  // });

  return <Toaster />;
};

export default Notify;
