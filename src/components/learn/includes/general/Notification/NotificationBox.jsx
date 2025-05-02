import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import NotificationModal from "./Modal/NotifcationModal";
import { notificationsConfig } from "../../../../../axiosConfig";
import { useSelector } from "react-redux";
import useInfiniteScroll from "./component/useInfiniteScroll";
import usePolling from "./component/usePolling";
import { el } from "date-fns/locale";

function NotificationBox() {
  const [isNotification, setNotification] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [pageNationData, setPageNationData] = useState([]);
  const [page, setPage] = useState();
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const buttonRef = useRef(null); // Reference to the container
  const fetchNotificationRef = useRef();
  const isFirstLoad = useRef(true);
  const toggleMessagesModal = () => {
    setNotification(!isNotification);
  };
  const {
    user_data: { access_token },
  } = useSelector((state) => state);

  const fetchNotification = useCallback(async (loadMore = false) => {
    if (isFirstLoad.current) {
      setInitialLoading(true); // Show initial loading spinner
    } else if (loadMore) {
      setLoading(true); // Show loading spinner for infinite scroll
    }
    try {
      const response = await notificationsConfig.get(
        `/main/list-notifications/`,

        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          params: {
            page: loadMore ? page + 1 : 1,
            notification_type: "un-read",
          },
        }
      );

      const { status_code, data, pagination_data } = response.data;
      if (status_code === 6000) {
        setNotificationData((prevData) =>
          loadMore ? [...prevData, ...data] : data
        );
        setPageNationData(pagination_data);
        setPage((prev) => (loadMore ? prev + 1 : 1));
        setTimeout(() => setLoading(false), 500);
        setTimeout(() => setInitialLoading(false), 500);
      } else {
        setLoading(false);
        setInitialLoading(false);
        setNotificationData([]);
        setPageNationData([]);
      }
    } catch (error) {
      setLoading(false);
      setInitialLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  });

  useEffect(() => {
    fetchNotification();
  }, [isNotification]);

  // usePolling(fetchNotification, 1000);

  const handilMarkAsRead = async () => {
    try {
      // setLoading(true);
      setInitialLoading(false); // Show initial loading spinner

      const response = await notificationsConfig.post(
        `/main/notification-mark-as-read/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const { status_code, data } = response.data;
      if (status_code == 6000) {
        // setLoading(false);
        setNotificationData([]);
        fetchNotification();
        setInitialLoading(false); // Show initial loading spinner
      }
    } catch (error) {
      // setLoading(false);
      setInitialLoading(false); // Show initial loading spinner
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useInfiniteScroll(fetchNotificationRef, isLoading, pageNationData, () =>
    fetchNotification(true)
  );

  return (
    <>
      <NotificationModal
        isShowNotication={isNotification}
        notificationData={notificationData}
        onClose={() => {
          setNotification(false);
        }}
        buttonRef={buttonRef}
        initialLoading={initialLoading}
        isLoading={isLoading}
        handilMarkAsRead={handilMarkAsRead}
        fetchNotificationRef={fetchNotificationRef}
        pageNationData={pageNationData}
      />
      <Container
        ref={buttonRef} // Attach ref to the container
        action={isNotification}
        onClick={() => {
          toggleMessagesModal();
        }}
      >
        <ContainerBox>
          <NotificationIcon>
            <img
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/14-10-2024/bell_icon.svg"
              alt="icon"
            />
          </NotificationIcon>
          {pageNationData?.total_items > 0 && (
            <NotificationCount>
              <span>
                {pageNationData?.total_items > 99
                  ? "99+"
                  : pageNationData?.total_items || 0}
              </span>
            </NotificationCount>
          )}
        </ContainerBox>
      </Container>
    </>
  );
}

export default NotificationBox;

const Container = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${({ action }) => (action ? "#e3e8ef" : "")};
  border-radius: 25px;
  border: ${({ action }) => action && "1px solid #e3e8ef"};
  transition: background 0.3s ease, transform 0.3s ease; // Smooth transition for background and scale
`;

const ContainerBox = styled.div`
  position: relative;
`;

const NotificationIcon = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease; // Smooth transition for scale

  &:hover {
    transform: scale(1.1); // Scale the icon on hover
  }

  img {
    width: 100%;
    height: 24px;
    display: inline-block;
  }
`;
const NotificationCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  border-radius: 14px;
  background: #0fa76f;
  position: absolute;
  top: 1px;
  right: -3px;
  span {
    display: inline-block;
    font-family: "gordita_regular";
    font-weight: 500;
    font-size: 10px;
    line-height: 17.1px;
    color: #fff;
  }
`;
