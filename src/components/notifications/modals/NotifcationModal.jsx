import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import NotificationCard from "../pages/NotificationCard";
import Nodata from "../pages/Nodata";
import NotificationSkeleton from "../pages/NotificationSkeleton";

function NotificationModal({
  isShowNotication,
  onClose,
  notificationData,
  buttonRef,
  initialLoading,
  handilMarkAsRead,
  fetchNotificationRef,
  pageNationData,
  isLoading,
}) {
  const [show, setShow] = useState(false);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const modalRef = useRef(null);
  useEffect(() => {
    if (isShowNotication) {
      setShow(true);
    } else {
      // Add a delay to allow the slide-out animation to complete before unmounting
      const timer = setTimeout(() => setShow(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isShowNotication]);

  useEffect(() => {
    const updateHeight = () => {
      setScreenHeight(window.innerHeight);
    };

    // Update screen height when the window is resized
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !(buttonRef && buttonRef.current?.contains(event.target))
      ) {
        onClose(false);
      }
    };

    if (isShowNotication) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShowNotication]);

  if (!show && !isShowNotication) return null;

  return (
    <>
      <Overlay>
        <MainContainer
          ref={modalRef}
          className={isShowNotication ? "show" : ""}
        >
          <MainTop>
            <LeftTop>
              <span>Notifications</span>
              {pageNationData?.total_items > 0 && (
                <NotificationCount>
                  <span>{pageNationData?.total_items || 0}</span>
                </NotificationCount>
              )}
            </LeftTop>
            {notificationData?.length > 0 && (
              <>
                <RightTop
                  onClick={() => {
                    handilMarkAsRead();
                  }}
                >
                  Mark all as read
                </RightTop>
              </>
            )}
          </MainTop>

          <NotificationContent
            ref={fetchNotificationRef}
            screenHeight={screenHeight - 226}
          >
            <div>
              {notificationData?.length === 0 &&
                !isLoading &&
                !initialLoading && (
                  <>
                    <Nodata />
                  </>
                )}
            </div>
            {initialLoading && (
              <>
                {[...Array(10)].map((_, index) => (
                  <NotificationSkeleton key={index} />
                ))}
              </>
            )}

            {notificationData?.length > 0 && (
              <>
                {notificationData?.map((items, intex) => (
                  <NotificationCard key={intex} data={items} />
                ))}
              </>
            )}
            {isLoading && (
              <>
                {[...Array(pageNationData?.total_items)].map((_, index) => (
                  <NotificationSkeleton key={index} />
                ))}
              </>
            )}
          </NotificationContent>
          <>
            <BottomBox>
              <ViewAllButton
                onClick={() => {
                  handilMarkAsRead();
                  onClose();
                }}
                to="/notifications/"
              >
                <span>View All</span>
                <ViewAllIcon>
                  <img
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/03-09-2024/arrow-narrow-right-green.svg"
                    alt=""
                  />
                </ViewAllIcon>
              </ViewAllButton>
            </BottomBox>
          </>
          {/* )} */}
        </MainContainer>
      </Overlay>
    </>
  );
}

export default NotificationModal;

const Overlay = styled.div`
  position: fixed;
  top: 84px;
  height: calc(100vh - 84px);
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #18232d40;
  z-index: 98;
`;

const MainContainer = styled.div`
  max-width: 520px;
  width: 100%;
  height: calc(100vh - 84px);
  background: #ffffff;
  position: fixed;
  right: -100%;
  z-index: 9999;
  transition: right 0.5s ease;
  &.show {
    right: 0;
  }
`;

const MainTop = styled.div`
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NotificationContent = styled.div`
  height: ${({ screenHeight }) => `${screenHeight}px`};
  overflow-y: scroll;
  padding: 0 4px 10px;
`;

const LeftTop = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;

  span {
    display: inline-block;
    font-family: "gordita_medium";
    font-weight: 500;
    font-size: 1.286rem;
    line-height: 25.65px;
    color: #4e4e4e;
  }
`;

const NotificationCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  border-radius: 14px;
  background: #0fa76f;

  span {
    display: inline-block;
    font-family: "gordita_regular";
    font-weight: 500;
    font-size: 0.857rem;
    line-height: 17.1px;
    color: #ffffff;
  }
`;

const RightTop = styled.button`
  cursor: pointer;
  font-family: "gordita_regular";
  font-weight: 700;
  font-size: 1rem;
  display: inline-block;
  line-height: 19.56px;
  color: #0fa76f;
`;

const BottomBox = styled.div`
  position: fixed;
  bottom: 0;
  padding: 16px 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 520px;
  background-color: #ffffff;
  box-shadow: 0px -4px 8px -2px #1018281a;
`;

const ViewAllButton = styled(NavLink)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eef2f6;
  border-radius: 16px;
  padding: 12px 0;
  margin: 0 auto;

  span {
    margin-right: 4px;
    font-family: "gordita_regular";
    font-weight: 600;
    font-size: 1rem;
    line-height: 20px;
    display: inline-block;
    color: #047853;
  }
`;

const ViewAllIcon = styled.div`
  width: 20px;
  height: 20px;

  img {
    width: 100%;
    display: inline-block;
  }
`;
