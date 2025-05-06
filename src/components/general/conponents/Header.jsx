import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import {
  getLetterColor,
  getUserTimeFromUTC,
} from "../helpers/functions";
import queryString from "query-string";
import Jdenticon from "react-jdenticon";
import AOS from "aos";
import "aos/dist/aos.css";
import LoginModal from "../../authentications/modals/LoginModal";
import PasswordModal from "../../authentications/modals/PasswordModal";
import LoginWithOTPModal from "../../authentications/modals/LoginWithOTPModal";
import EnterPhoneModal from "../../authentications/modals/EnterPhoneModal";
import EnterOTPModal from "../../authentications/modals/EnterOTPModal";
import EnterNameModal from "../../authentications/modals/EnterNameModal";
import SetPasswordModal from "../../authentications/modals/SetPasswordModal";
import EnterTrialDistrict from "../../authentications/modals/EnterTrialDistrict";
import auth from "../../../utils/auth";
import ResetOne from "../../authentications/modals/ResetOne";
import ResetTwo from "../../authentications/modals/ResetTwo";
import ResetThree from "../../authentications/modals/ResetThree";
import SearchModal from "../modals/SearchModal";
import NavMenu from "../conponents/NavMenu";
import NotificationBox from "../../notifications/pages/NotificationBox";
import HeaderSearch from "./HeaderSearch";
import NavModal from "../modals/NavModal";
import LoginJoinButton from "../conponents/LoginJoinButton";
import { useAuthStore } from "../../../store/authStore";
import { useUIStore } from "../../../store/uiStore";
import { useNotificationStore } from "../../../store/notificationStore";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];

  // Get state and actions from Zustand stores
  const { user_data, user_profile } = useAuthStore();
  const {
    menu_type,
    active_menu,
    respSideMenuClass,
    respSearch,
    toggleProfile,
    toggleRespMenu,
    toggleRespSearch,
    setRespSearch,
  } = useUIStore();
  const { notifications, notifications_count } = useNotificationStore();

  // State management
  const [searchValue, setSearchValue] = useState("");
  const [searchRedirect, setSearchRedirect] = useState(false);
  const [action, setAction] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [plan, setPlan] = useState(null);
  const [phone, setPhone] = useState(null);
  const [status, setStatus] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [event, setEvent] = useState(null);
  const [days, setDays] = useState(null);
  const [nextPath, setNextPath] = useState(null);
  const [isNavMenuModal, setNavMenuModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [isSearchModal, setSearchModal] = useState(false);
  const [marginLeft, setMarginLeft] = useState(0);
  const [totalWidth, setTotalWidth] = useState(0);
  const [historyStack, setHistoryStack] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [isProfileSideActive, setProfileSideBar] = useState(false);

  // Refs
  const wrapperRef = useRef(null);
  const messageWrapRef = useRef(null);
  const messageIconRef = useRef(null);
  const notifIconRef = useRef(null);
  const inputRef = useRef(null);
  const tabRefs = useRef([]);

  // Effects
  useEffect(() => {
    function handleResize() {
      const halfScreenWidth = window.innerWidth / 2;
      let widthOne = 0;
      let widthTwo = 0;

      if (tabRefs.current[0]) {
        widthOne = tabRefs.current[0].offsetWidth;
      }

      if (tabRefs.current[1]) {
        widthTwo = tabRefs.current[1].offsetWidth / 2;
      }

      const total = widthOne + widthTwo + 18;
      const newMarginLeft = Math.max(25, halfScreenWidth - total);
      setMarginLeft(newMarginLeft);
    }

    requestAnimationFrame(handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [tabRefs.current, marginLeft]);

  useEffect(() => {
    setShowSearch(false);
  }, [window.innerWidth]);

  useEffect(() => {
    if (window.innerWidth <= 768 && location.pathname === "/search/") {
      toggleRespSearch(true);
    }
    return () => {
      AOS.init({
        duration: 400,
      });
    };
  }, []);

  useEffect(() => {
    const search = location?.search || '';
    const values = queryString.parse(search);
    const {
      q: searchValue,
      action,
      phone,
      plan,
      status,
      event,
      next,
      c,
      d
    } = values;

    setSearchValue(searchValue);
    setAction(action);
    setPlan(plan);
    setPhone(phone);
    setEvent(event);
    setStatus(status);
    setCourseId(c);
    setNextPath(next);
    setDays(d);
  }, [location.search]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setSearchModal(false);
      setNavMenuModal(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showSearch) {
      inputRef.current?.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const actionParam = searchParams.get('action');
    if (actionParam && actionParam !== action) {
      setAction(actionParam);
    }
  }, [location.search]);

  // Handlers
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmitSearch();
    }
  };

  const onSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onSubmitSearch = () => {
    if (location.pathname === "/search/") {
      setSearchRedirect("update");
    } else {
      setSearchRedirect("push");
    }
    setTimeout(() => {
      setSearchRedirect(null);
    }, 200);
  };

  const onSubscribe = () => {
    if (auth.isAuthenticated()) {
      navigate(`${location.pathname}?action=subscribe`);
    } else {
      const newAction = "login";
      setAction(newAction);
      navigate(`${location.pathname}?action=${newAction}`, { replace: true });
    }
  };

  const closeModal = () => {
    setAction("");
    navigate(location.pathname, { replace: true });
  };

  const renderPhoto = () => {
    if (user_profile?.photo) {
      return (
        <Profile>
          <img src={user_profile.photo} alt={user_profile.name} />
        </Profile>
      );
    }
    return (
      <Profile>
        <Jdenticon size="45px" value={user_profile?.name || "Name"} />
      </Profile>
    );
  };

  const renderRedirect = () => {
    if (searchRedirect === "push") {
      return (
        <Navigate
          to={{
            pathname: "/search/",
            search: searchValue ? `?q=${searchValue}` : "",
          }}
          replace={false}
        />
      );
    }
    if (searchRedirect === "update") {
      return (
        <Navigate
          to={{
            pathname: "/search/",
            search: searchValue ? `?q=${searchValue}` : "",
          }}
          replace={true}
        />
      );
    }
    return null;
  };

  const renderModal = () => {
    if (!auth.isAuthenticated() && action) {
      switch (action) {
        case "login":
          return <LoginModal key="login-modal" action={action} nextPath={nextPath} closeModal={closeModal} isOpen={true} />;
        case "password":
          return <PasswordModal action={action} nextPath={nextPath} closeModal={closeModal} isOpen={true} />;
        case "otp":
          return <LoginWithOTPModal action={action} nextPath={nextPath} closeModal={closeModal} isOpen={true} />;
        case "phone":
          return <EnterPhoneModal action={action} nextPath={nextPath} closeModal={closeModal} isOpen={true} />;
        case "verify-otp":
          return <EnterOTPModal action={action} nextPath={nextPath} closeModal={closeModal} isOpen={true} />;
        case "name":
          return <EnterNameModal action={action} nextPath={nextPath} closeModal={closeModal} isOpen={true} />;
        case "set-password":
          return <SetPasswordModal action={action} nextPath={nextPath} closeModal={closeModal} isOpen={true} />;
        case "referral":
          return <EnterTrialDistrict action={action} nextPath={nextPath} closeModal={closeModal} isOpen={true} />;
        case "forgot-password":
          return <ResetOne action={action} nextPath={nextPath} closeModal={closeModal} isOpen={true} />;
        case "forgot-password-verify-otp":
          return <ResetTwo action={action} nextPath={nextPath} closeModal={closeModal} isOpen={true} />;
        case "forgot-password-reset":
          return <ResetThree action={action} nextPath={nextPath} closeModal={closeModal} isOpen={true} />;
        default:
          return null;
      }
    }
    return null;
  };

  const searchProps = {
    setGlobalSearch,
    globalSearch,
    setSearchModal,
    isSearchModal,
    historyStack,
    setHistoryStack,
  };

  if (respSearch) {
    return (
      <React.Fragment>
        {renderRedirect()}
        <Head>
          <SearchRightContainer onClick={toggleRespMenu} className="search">
            <i className="las la-bars"></i>
          </SearchRightContainer>

          <SearchRespContainer>
            <SearchInner className="search">
              <form style={{ width: "100%" }} action="" className="search">
                <i className="las la-search"></i>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Search"
                  onChange={onSearchValueChange}
                  onKeyDown={handleKeyDown}
                  value={searchValue}
                  autoFocus
                />
                <i
                  onClick={() => {
                    toggleRespSearch();
                    setSearchRedirect("");
                  }}
                  className="las la-times"
                ></i>
              </form>
            </SearchInner>
          </SearchRespContainer>
        </Head>
      </React.Fragment>
    );
  }

  return (
    <>
      {renderModal()}
      {renderRedirect()}
      {redirectUrl ? <Navigate to={redirectUrl} /> : null}
      <Head>
        <Left
          style={{ marginRight: `${marginLeft}px` }}
          ref={(el) => (tabRefs.current[0] = el)}
        >
          {!(width < 500 && showSearch) && (
            <>
              {!["tech-updates", "feed", "notification", "nanodegree", "leaderboard", "notifications", "saved", "all", "tech-newbie", "people"].includes(lastSegment) &&
                !/^\/nanodegree(\/(tech-degree|[^/]+(\/order-summary)?)?)?$/.test(window.location.pathname) && (
                  <HeaderIcon
                    onClick={toggleRespMenu}
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/menu-icon.svg"
                    alt="Menu"
                  />
                )}
              <ImageContainer>
                <LogoLink to="/">
                  <Logo
                    className="thumb"
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/steyp-logo.svg"
                    alt="Steyp-logo"
                  />
                </LogoLink>
              </ImageContainer>
            </>
          )}
          {user_data?.is_verified && width > 1060 && (
            <HeaderSearch {...searchProps} id={"largeScreen"} />
          )}
        </Left>

        {width > 768 && !showSearch && (
          <Center>
            <div ref={(el) => (tabRefs.current[1] = el)}>
              <NavMenu />
            </div>
          </Center>
        )}

        {user_data?.is_verified ? (
          <nav className="right">
            <RightContainer>
              {width > 1060 ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <NotificationBox />
                  <hr
                    style={{
                      height: "40px",
                      width: "1px",
                      background: "#697586",
                      margin: "0px 20px",
                    }}
                  />
                  <ProfileWrapper
                    onClick={() => {
                      user_data?.is_verified ? toggleProfile() : onSubscribe();
                    }}
                  >
                    {renderPhoto()}
                    <Name className="g-medium">
                      {user_profile?.name ? "  Me " : "User"}
                    </Name>
                    <Polygon
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/polygon.svg"
                      alt="Icon"
                    />
                  </ProfileWrapper>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  {showSearch ? (
                    <HeaderSearch
                      {...searchProps}
                      setShowSearch={setShowSearch}
                      id={"smallScreen"}
                      inputRef={inputRef}
                    />
                  ) : (
                    <SearchIcon
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/search-icon.svg"
                      alt="Search"
                      id={"iconOnly"}
                      onClick={() => setShowSearch(!showSearch)}
                    />
                  )}

                  {showSearch || isNavMenuModal || isProfileSideActive ? (
                    <CrossIcon
                      onClick={() => {
                        setProfileSideBar(false);
                        setNavMenuModal(false);
                        setShowSearch(false);
                      }}
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/cross-icon.svg"
                      alt="Close"
                    />
                  ) : (
                    <ProfileWrapper
                      onClick={() => setNavMenuModal(true)}
                    >
                      {renderPhoto()}
                    </ProfileWrapper>
                  )}
                </div>
              )}
              <NavModal
                showModal={isNavMenuModal}
                setShowModal={setNavMenuModal}
                width={width}
                setProfileSideBar={setProfileSideBar}
              />
            </RightContainer>
          </nav>
        ) : (
          <LoginJoinButton onSubscribe={onSubscribe} />
        )}
      </Head>
    </>
  );
};

// Styled components
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
  object-fit: cover;
  img {
    display: block;
    width: 100%;
  }
  @media (max-width: 768px) {
    overflow: hidden;
  }
`;

const Head = styled.header`
  padding: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  border-bottom: 1px solid #eef2f6;
  height: 84px;
  z-index: 999;
  align-items: ${(props) => (props.respSearch ? "center" : "inherit")};
  @media (max-width: 768px) {
    height: 68px;
    padding: 16px;
  }
`;

const ImageContainer = styled.h1`
  width: 100px;
  margin-right: 33px;
  @media only screen and (max-width: 1280px) {
    width: 74px;
    margin-right: 16px;
  }
  @media only screen and (max-width: 1060px) {
    width: 100px;
  }
  @media all and (max-width: 768px) {
    width: 90px;
    margin-left: 0px;
  }
`;

const LogoLink = styled(Link)`
  display: block;
`;

const Logo = styled.img`
  display: block;
  width: 100%;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;

const SearchIcon = styled.img`
  height: 24px;
  width: 24px;
  display: block;
  ${({ id }) => id === "iconOnly" && `cursor: pointer;`};
`;

const CrossIcon = styled.img`
  cursor: pointer;
  display: block;
  width: 18px;
  height: 18px;
  margin: 10px;
`;

const HeaderIcon = styled.img`
  display: none;
  @media (max-width: 1100px) {
    cursor: pointer;
    display: block;
    width: 19px;
  }
`;

const SearchRespContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const SearchInner = styled.div`
  width: 100%;
  i {
    cursor: pointer;
  }
`;

const SearchRightContainer = styled.div`
  display: none;
  @media only screen and (max-width: 1440px) {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
  @media only screen and (max-width: 640px) {
    margin-right: 0;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ProfileWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  @media (max-width: 980px) {
    padding-left: 0;
    border-left: unset;
  }
  @media (max-width: 768px) {
    border-radius: 50%;
  }
`;

const Name = styled.span`
  padding: 10px;
  font-family: "gordita_regular";
  font-weight: 500 !important;
  font-size: 1rem;
  color: #344049;
  @media (max-width: 980px) {
    display: none;
  }
`;

const Polygon = styled.img`
  display: inline-block;
  width: 10px;
  height: 10px;
  @media (max-width: 980px) {
    display: none;
  }
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export default Header;
