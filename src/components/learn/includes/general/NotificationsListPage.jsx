import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getDateStr, getTimeStrFromDate } from "../../../helpers/functions";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import NotificationCard from "../notification/NotificationCard";
import { Link, useHistory, useLocation } from "react-router-dom";
import auth from "../../../routing/auth";
import PushNotification from "../../../../PushNotification";
import logoImage from "../../../../assets/images/notification/logo.svg";
import { serverConfig } from "../../../../axiosConfig";
import BasicLoading from "./BasicLoading";

function NotificationsListPage() {
  const {
    divMainClass,
    user_data,
    user_profile,
    userSubscriptionType,
    isMarked,
    isNewNotification,
  } = useSelector((state) => state);
  const {
    user_data: { access_token },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isExamAvilable, setExamAvailabilty] = useState(true);

  const [notifications, setNotifications] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [seen, setSeen] = useState(false);
  const [active, setActive] = useState(false);
  const [notId, setNotId] = useState([]);

  const fetchNotifications = () => {
    let { access_token } = user_data;
    // setLoading(true);
    serverConfig
      .get("main/list-notifications/", {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        const { status_code, data } = response.data;
        if (status_code === 6000) {
          setNotifications(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleClick = () => {
    // setMarked(!isMarked);
    dispatch({
      type: "UPDATE_NOTIFICATIONS_MARKED",
      isMarked: !isMarked,
    });
    serverConfig
      .post(
        `/main/notification-mark-as-read/ `,
        {},
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        const { status_code, data } = response.data;
        if (status_code == 6000) {
          setNotifications([])
        }
      })
      .catch((error) => {
        console.log(error, "error=====")
      });
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, [isMarked, isNewNotification]);

  useEffect(() => {
    fetchNoty();
  }, [notifications]);
  const fetchNoty = () => {
    notifications.map((item) => {
      setNotId((prev) => [...prev, item.id]);
    });
  };

  return (
    <Container id="main" className={divMainClass}>
      {isLoading ? (
        <BasicLoading show={isLoading} />
      ) : (
        <InnerContainer>
          <TopConatiner>
            <Head>Notifications</Head>
            <Logo onClick={() => handleClick()}>
              <span>Mark all as read</span>
            </Logo>
          </TopConatiner>
          <BottomContainer>
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notifications_id={notification.id}
                title={notification.message_category}
                description={notification.message}
                date={`${getTimeStrFromDate(
                  notification.date_added
                )}, ${getDateStr(notification.date_added)}`}
                notification={notification}
                setActive={setActive}
                setSeen={setSeen}
                isMarked={isMarked}
              />
            ))}
          </BottomContainer>
        </InnerContainer>
      )}
      <div></div>
    </Container>
  );
}

export default NotificationsListPage;
const BottomContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 19px;
  background: #fff;
  @media all and (max-width: 768px) {
    width: 70%;
  }
  @media all and (max-width: 480px) {
    width: 100%;
  }
`;
const InnerContainer = styled.div`
  background: #f9f9fb;
  padding: 10px;
`;
const TopConatiner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #efefef;
  padding-bottom: 22px;
  background: #fff;
  width: 50%;
  margin: 0 auto;
  padding: 10px;
  @media all and (max-width: 768px) {
    width: 70%;
  }
  @media all and (max-width: 480px) {
    width: 100%;
  }
`;
const Head = styled.h5`
  font-size: 16px;
  font-weight: 700;
  display: inline-block;
  font-family: gordita_regular;
  @media all and (max-width: 480px) {
    font-size: 14px;
  }
`;
const Logo = styled.div`
  /* width: 30px;
	height: 30px; */
  cursor: pointer;
  color: #5188e5;
  font-size: 13px;
  @media all and (max-width: 480px) {
    font-size: 12px;
  }
  & img {
    width: 100%;
    display: block;
  }
`;

const Container = styled.div`
  /* background-color: grey;  */
`;
const Title = styled.h2`
  font-family: gordita_medium;
  font-size: 24px;
  margin-top: 20px;
  overflow: hidden;
  @media all and (max-width: 1480px) {
    font-size: 22px;
    margin-top: 0px;
  }
  @media all and (max-width: 480px) {
    font-size: 22px;
    margin-top: 0;
  }
`;

const TopBanner = styled.div`
  padding: 5px 20px;
  background-color: #e4f2e5;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-family: gordita_medium;
    font-size: 24px;
    span {
      color: #50b278;
    }
  }

  @media all and (max-width: 480px) {
    margin: 10px -20px 0;
    h3 {
      font-size: 20px;
    }
  }
  @media all and (max-width: 360px) {
    padding: 30px 20px;
    h3 {
      font-size: 20px;
    }
  }
`;

const SpotLightSection = styled.div`
  display: grid;
  /* height: 100%; */
  grid-template-columns: 1fr 1fr;
  padding: 60px 60px 0px;
  background-color: #f5f3f3;
  margin-top: 15px;
  position: relative;
  padding-right: 30px;
  @media all and (max-width: 1280px) {
    padding: 50px 40px 30px;
  }
  @media all and (max-width: 980px) {
    grid-template-columns: 1fr;
    padding: 50px 40px 0px;
  }
  @media all and (max-width: 768px) {
    padding: 40px 40px 0px;
  }
  @media all and (max-width: 640px) {
    padding: 30px 30px 0px;
    overflow: hidden;
  }
  @media all and (max-width: 480px) {
    margin: 10px -20px 0;
    padding: 30px 20px 0px;
  }
`;
const LeftSection = styled.div``;

const SpotLightTitle = styled.h3`
  font-family: "EGGIndulekhaUni";
  font-size: 40px;
  line-height: 50px;
  margin-bottom: 20px;
  &.customeTheme {
    background-color: #fff !important;
    color: #a5a3a4;
  }
  span {
    color: #50b278;
  }
  @media all and (max-width: 1280px) {
    font-size: 34px;
    line-height: 44px;
  }
  @media all and (max-width: 1100px) {
    font-size: 36px;
  }
  @media all and (max-width: 980px) {
    width: 90%;
  }
  @media all and (max-width: 768px) {
    font-size: 32px;
    line-height: 36px;
  }
  @media all and (max-width: 640px) {
    width: 100%;
  }
  @media all and (max-width: 480px) {
    font-size: 30px;
  }
  @media all and (max-width: 480px) {
    margin-bottom: 10px;
  }
`;
const Descrption = styled.p`
  width: 90%;
  margin-bottom: 40px;
  font-size: 16px;
  font-family: gordita_regular;
  @media all and (max-width: 1280px) {
    margin-bottom: 30px;
  }
  @media all and (max-width: 980px) {
    width: 64%;
  }
  @media all and (max-width: 768px) {
    margin-bottom: 20px;
  }
  @media all and (max-width: 640px) {
    width: 73%;
  }
  @media all and (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 15px;
  }
`;

////
const RightSection = styled.div`
  display: block;
  img {
    display: block;
    width: 110%;
    transform: translateX(-10%);
  }
  @media all and (max-width: 980px) {
    margin-bottom: -20%;
    height: 70%;

    img {
      display: block;
      width: 55%;
      transform: translate(84%, -47%);
    }
  }
  @media all and (max-width: 768px) {
    img {
      width: 70%;
      transform: translate(59%, -35%);
    }
  }
  @media all and (max-width: 640px) {
    img {
      width: 80%;
      transform: translate(48%, -32%);
    }
  }
`;
const TopDecro = styled.img`
  position: absolute;
  width: 30%;
  display: block;
  top: 0;
  left: 0;
`;
const BottomDecro = styled.img`
  position: absolute;
  width: 30%;
  display: block;
  bottom: 0;
  right: 0;
`;

const Button = styled(Link)`
  position: relative;
  z-index: 1;
  font-family: gordita_medium;
  width: 180px;
  height: 50px;
  display: flex;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  background: transparent
    linear-gradient(
      102deg,
      rgba(15, 167, 111, 1) 0%,
      rgba(15, 158, 167, 1) 100%
    )
    0% 0% no-repeat padding-box;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.4s;
  span {
    transition: all 0.4s;
    width: 0 !important;
  }
  &:hover {
    width: 200px;
    span {
      width: 20px !important;
    }
  }
`;

const Decored = styled.span`
  width: 70px;
  display: block;
  img {
    display: block;
    width: 100%;
  }
  @media all and (max-width: 640px) {
    width: 50px;
  }
  @media all and (max-width: 360px) {
    display: none;
  }
`;
const Icon = styled.span`
  display: block;
  width: 20px;
  transform: translateY(-1px);
  margin-left: 10px;
  img {
    display: block;
    width: 100%;
  }
`;
const TryAgainButton = styled.span`
  font-family: gordita_medium;
  position: relative;
  z-index: 2;
  width: fit-content;
  padding: 10px 10px;
  display: flex;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  border: 2px solid #4baf9e;
  color: #4baf9e;
  border-radius: 5px;
  transition: all 0.4s;
  span {
    transition: all 0.4s;
    width: 0 !important;
    display: none;
  }
  @media all and (max-width: 768px) {
    font-size: 15px;
  }
  @media all and (max-width: 640px) {
    margin-bottom: 50px;
  }
  @media all and (max-width: 480px) {
    padding: 8px 8px;
    font-size: 13px;
    border: 1px solid #4baf9e;
  }
`;
const ToolTip = styled.span`
  font-family: gordita_regular;
  font-size: 14px;
`;
const UpdateBanner = styled.div`
  background-color: #fff3ec;
  padding: 12px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 7px;
  margin-bottom: 15px;
  opacity: 1;
  animation: fade 0.4s ease;
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media all and (max-width: 1200px) {
    padding: 12px 21px;
  }
  @media all and (max-width: 768px) {
    padding: 12px 18px;
  }
  @media all and (max-width: 640px) {
    align-items: flex-end;
  }
  @media all and (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media all and (max-width: 420px) {
    padding: 20px 13px;
  }
`;
const BannerLeftContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-right: 6px;
  @media all and (max-width: 640px) {
    flex-direction: column;
    width: 71%;
    align-items: flex-start;
  }
  @media all and (max-width: 480px) {
    width: 100%;
    margin-right: 0px;
  }
`;
const IconContainer = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  @media all and (max-width: 640px) {
    // width: 30px;
    margin-right: 0px;
    margin-bottom: 10px;
  }
  img {
    display: block;
    width: 100%;
  }
  @media all and (max-width: 480px) {
    display: none;
  }
`;
const BannerHead = styled.h3`
  color: #656563;
  font-size: 16px;
  font-family: "gordita_medium";
  transform: translateY(2px);
  b {
    color: #e4794b;
    font-size: 15px;
    font-family: "gordita_medium";
    @media all and (max-width: 840px) {
      font-size: 14px;
      font-family: "gordita_regular";
    }
  }
  @media all and (max-width: 840px) {
    font-size: 14px;
    font-family: "gordita_regular";
    transform: translateY(0px);
  }
  @media all and (max-width: 640px) {
    font-size: 15px;
  }
  @media all and (max-width: 480px) {
    font-family: "gordita_regular";
    transform: translateY(2px);
    font-size: 14px;
  }
`;
const RightButton = styled(Link)`
  display: flex;
  justify-content: center;
  width: 130px;
  font-family: gordita_medium;
  padding: 10px 15px;
  border-radius: 6px;
  background-color: #e4794b;
  color: #fff;
  font-size: 15px;
  @media all and (max-width: 480px) {
    margin-top: 10px;
    width: 108px;
    padding: 7px 8px;
    border-radius: 5px;
    font-size: 13px;
  }
`;
