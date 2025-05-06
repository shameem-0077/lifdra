import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Jdenticon from "react-jdenticon";
import auth from "../../../../routing/auth";
import { useNavigate, NavLink } from "react-router-dom";
import { serverConfig } from "../../../../../axiosConfig";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase";

const NavModal = ({
  setShowModal,
  showModal,
  props,
  width,
  setProfileSideBar,
}) => {
  const modalRef = useRef(null);
  const { user_data } = props;
  const navigate = useNavigate();
  // const [activeMenu, setActiveMenu] = useState(window.location.pathname);

  const menuItems = [
    {
      path: "/feed/",
      label: "Home",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/28-09-2024/home-icon.svg",
      active_icon:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/07-10-2024/home_icon.svg",
      arrow_icon: "",
    },
    {
      path: "/nanodegree/",
      label: "NanoDegree",
      active_icon:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/19-10-2024/activestate_hat.svg",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/14-10-2024/nanodegree.svg",
      arrow_icon: "",
    },
    {
      path: "/tech-updates/",
      label: "Tech Updates",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/05-10-2024/techupdate_icon.svg",
      active_icon:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/28-09-2024/compass-03.svg",
      arrow_icon:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-09-2024/Icon+wrap.svg",
    },
    {
      path: "/notifications/",
      label: "Notifications",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/14-10-2024/bell_icon.svg",
      active_icon:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/07-10-2024/home_icon.svg",
      arrow_icon: "",
    },
  ];

  const notification = [
    {
      path: "/notifications/",
      label: "Notifications",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/14-10-2024/bell_icon.svg",
      active_icon:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/07-10-2024/home_icon.svg",
      arrow_icon: "",
    },
  ];

  const removeChatUser = async (user_data) => {
    if (user_data?.uid) {
      const docRef = doc(db, "users", user_data.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        updateDoc(doc(db, "users", user_data.uid), {
          isOnline: false,
          lastActiveTime: Timestamp.fromDate(new Date()),
          activeDeviceToken: null,
        });
      }
    }
    localStorage.clear();
    window.location.href = "/";
  };

  const onLogout = (user_data) => {
    accountsConfig
      .post(
        "/authentication/logout/",
        {},
        {
          headers: {
            Authorization: `Bearer ${user_data?.access_token}`,
          },
        }
      )
      .then((response) => {
        const { StatusCode, data } = response.data;

        if (StatusCode === 6000) {
          // Handle successful logout
          removeChatUser(user_data);
        } else {
          // Handle error during logout
        }
      })
      .catch((error) => {
        // Handle network error or other exceptions
      });
  };

  const closeOnOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  const onSubscribe = () => {
    if (auth.isAuthenticated()) {
      navigate(`${props.location.pathname}?action=subscribe`);
    } else {
      navigate(`${props.location.pathname}?action=login`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowModal(false);
    }
  };

  const renderPhoto = () => {
    let { name, photo } = props.user_profile;

    if (photo) {
      return (
        <Profile>
          <img src={photo} alt={name} />
        </Profile>
      );
    } else {
      return (
        <Profile>
          <Jdenticon size="45px" value={name ? name : "Name"} />
        </Profile>
      );
    }
  };

  const handleRouteChange = () => {
    if (user_data && user_data.is_verified) {
      navigate("/feed/profile/");
    } else {
      onSubscribe();
    }
    setShowModal(false);
  };

  const handleClick = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", closeOnOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]); // Make sure to include setGlobalSearch in the dependency array

  if (!showModal) {
    return null;
  }
  return (
    <>
      <MainContainer ref={modalRef}>
        {width > 440 && (
          <>
            <Container>
              {width > 768
                ? notification.map((item, i) => (
                    <>
                      <ItemContainer to={`${item.path}`} key={i}>
                        <Img src={item.icon} alt="icon" />

                        <Links onClick={handleClick}>{item.label}</Links>
                      </ItemContainer>
                    </>
                  ))
                : menuItems.map((item, i) => (
                    <ItemContainer
                      to={`${item.path}`}
                      key={i}
                      onClick={handleClick}
                    >
                      <Img src={item.icon} alt="icon" />

                      <Links>{item.label}</Links>
                    </ItemContainer>
                  ))}
            </Container>

            <Hr />
          </>
        )}

        <ProfileWrapper>
          <div style={{ display: "flex" }} onClick={handleRouteChange}>
            {renderPhoto()}
            <Name className="g-medium">
              {props.user_profile.name ? "  Me " : "User"}
            </Name>
          </div>

          <LogoutContainer onClick={() => onLogout(user_data)}>
            <span>Logout</span>
            <span className="las la-sign-out-alt"></span>
          </LogoutContainer>
        </ProfileWrapper>

        {/* <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "6px 12px",
          }}
        >
          <SettingContainer to={"/profile/"} onClick={handleClick}>
            Settings
          </SettingContainer>
          <LogoutContainer onClick={() => onLogout(user_data)}>
            Logout
          </LogoutContainer>
        </div> */}
      </MainContainer>
      <BlurBackground />
    </>
  );
};

export default NavModal;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const Hr = styled.hr`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 71px;
  border-top: 1px solid #e3e8ef;
`;

const LogoutContainer = styled.small`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 12px 0;
  color: #c30000;
  font-family: "gordita_medium";
  font-size: 14px;
  &:hover {
    color: #0399f4;
  }
`;

const SettingContainer = styled(NavLink)`
  padding: 12px;
  color: #000;
  font-family: "gordita_medium";
  font-size: 14px;
  &:hover {
    color: #0399f4;
  }
`;

const BlurBackground = styled.div`
  position: fixed;
  top: 84px;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(1px);
  z-index: 5;

  @media (max-width: 768px) {
    top: 64px;
  }
`;

const Img = styled.img`
  display: block;
  width: 24px;
  height: 24px;
`;

const ItemContainer = styled(NavLink)`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 16px;

  &.active {
    background-color: #ecfdf4;
    color: #059664;
  }
`;

const Profile = styled.div`
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  background: #fff;
  max-height: 38px;
  max-width: 38px;
  min-height: 38px;
  min-width: 38px;
  align-items: center;
  justify-content: center;
  /* padding-top: 10px; */
  object-fit: cover;
  img {
    display: block;
    width: 100%;
  }
  @media (max-width: 768px) {
    overflow: hidden;
    /* padding-top: 8px; */
  }
`;

const Links = styled.li`
  font-family: "gordita_medium";
  /* color: #060505; */
  font-size: ${pxToRem(14)};
  padding: 8px 12px;
  list-style-type: none;

  &.active {
    color: green;
  }
`;

const MainContainer = styled.div`
  width: 300px;
  background: #ffffff;
  border-radius: 8px;
  position: absolute;
  top: 90px;
  right: 16px;
  z-index: 998;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    top: 74px;
  }
  @media (max-width: 600px) {
    width: 100%;
    left: 4px;
    right: 4px;
  }
  @media (max-width: 440px) {
    /* max-width: 320px; */
    width: 97%;
    right: 4px;
    left: 4px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
`;

const ProfileWrapper = styled.div`
  padding: 16px 24px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Name = styled.span`
  width: fit-content;
  padding: 10px;
  font-family: "gordita_regular";
  font-weight: 500 !important;
  font-size: 1rem;
  color: #344049;
`;
