import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import NotificationDropdown from "./NotificationDropdown";
import ProfileSideBar from "../my-profile/ProfileSideBar";
import styled, { keyframes } from "styled-components";
import {
  getLetterColor,
  getUserTimeFromUTC,
  numberWithCommas,
} from "../../../helpers/functions";
import queryString from "query-string";
import Jdenticon from "react-jdenticon";
import AOS from "aos";
import "aos/dist/aos.css";
import LoginModal from "../authentication/modals/LoginModal";
import PasswordModal from "../authentication/modals/PasswordModal";
import LoginWithOTPModal from "../authentication/modals/LoginWithOTPModal";
import EnterPhoneModal from "../authentication/modals/EnterPhoneModal";
import EnterOTPModal from "../authentication/modals/EnterOTPModal";
import EnterNameModal from "../authentication/modals/version-2.0/EnterNameModal";
import SetPasswordModal from "../authentication/modals/SetPasswordModal";
import EnterTrialDistrict from "../authentication/modals/EnterTrialDistrict";
import auth from "../../../routing/auth";
import HeaderTimer from "./HeaderTimer";
import ResetOne from "../authentication/modals/ResetOne";
import ResetTwo from "../authentication/modals/ResetTwo";
import ResetThree from "../authentication/modals/ResetThree";
import EnterBalanceDetails from "../authentication/modals/version-2.0/EnterBalanceDetails";
import SearchModal from "./modals/SearchModal";
import NavMenu from "./NavMenu";
import NotificationBox from "./Notification/NotificationBox";
import AutoComplete from "./HeaderSearch";
import HeaderSearch from "./HeaderSearch";
import NavModal from "./modals/NavModal";
import LoginJoinButton from "./LoginJoinButton";

function mapDispatchToProps(dispatch) {
  return {
    toggleProfile: () =>
      dispatch({
        type: "TOGGLE_PROFILE_MENU",
      }),
    toggleRespMenu: () =>
      dispatch({
        type: "TOGGLE_RESP_SIDE_MENU",
      }),
    setHeaderIconRef: (ref) =>
      dispatch({
        type: "SET_MENU_ICON_REF",
        ref: ref,
      }),
    toggleRespSearch: (value) =>
      dispatch({
        type: "TOGGLE_RESP_SEARCH",
        respSearch: value,
      }),
  };
}

function mapStateToProps(state) {
  return {
    menu_type: state.menu_type,
    active_menu: state.active_menu,
    user_profile: state.user_profile,
    user_data: state.user_data,
    respSideMenuClass: state.respSideMenuClass,
    respSearch: state.respSearch,
    notifications: state.notifications,
    notifications_count: state.notifications_count,
  };
}

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];

  const { message } = useSelector((state) => state);
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
  const [active, setActive] = useState("");
  const [isNavMenuModal, setNavMenuModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [isSearchModal, setSearchModal] = useState(false);
  const [marginLeft, setMarginLeft] = useState(0);
  const [totalWidth, setTotalWidth] = useState(0);
  const [recentHistory, setRecentHistory] = useState("");
  const [historyStack, setHistoryStack] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [isProfileSideActive, setProfileSideBar] = useState(false);

  let wrapperRef = useRef(null);
  const messageWrapRef = useRef(null);
  const messageIconRef = useRef(null);
  const notifIconRef = useRef(null);
  const inputRef = useRef(null);

  const setWrapperRef = (ref) => {
    wrapperRef = ref;
  };

  const handleActive = (path) => {
    setActive("active");
    navigate(path);
  };

  const tabRefs = useRef([]);

  // calculate the margin left of the second tab
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

    requestAnimationFrame(() => handleResize());

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [tabRefs.current, marginLeft, window.innerWidth]);

  useEffect(() => {
    setShowSearch(false);
  }, [window.innerWidth]);

  useEffect(() => {
    let { location } = props;
    if (window.innerWidth <= 768 && location.pathname === "/search/") {
      props.toggleRespSearch(true);
    }
    return () => {
      AOS.init({
        duration: 400,
      });
    };
  }, []);

  useEffect(() => {
    const location = props?.location || {};
    const search = location?.search || '';
    const values = queryString.parse(search);
    let searchValue = values.q;
    const action = values.action;
    //
    const phone = values.phone;
    const plan = values.plan;
    const status = values.status;
    const event = values.event;
    const next = values.next;
    const c = values.c;
    const d = values.d;
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

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (showSearch) {
      inputRef.current.focus();
    }
  }, [showSearch]);

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

  const showSideMenu = (e) => {
    props.toggleRespMenu();
  };

  const onSubmitSearch = () => {
    let { location } = props;
    // if (photo) {
    //     return (
    //         <Profile>
    //             <img src={photo} alt={name} />
    //         </Profile>
    //     );
    // } else {
    //     return (
    //         <Profiles>
    //             <Jdenticon size="45px" value={name ? name : "Name"} />
    //         </Profiles>
    //     );
    // }

    if (location.pathname === "/search/") {
      setSearchRedirect("update");
    } else {
      setSearchRedirect("push");
    }
    setTimeout(() => {
      setSearchRedirect(null);
    }, 200);
  };

  const onSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  //   const closSearch = () => {
  //
  //     setSearchModal(false);
  //     setGlobalSearch("");
  //      // Log to check value
  //   };

  const onSearchIconClick = () => {
    setSearchRedirect("push");
    props.toggleRespSearch();
  };

  //Preventing "Enter" key function
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmitSearch();
    }
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

  const truncate = (str) => {
    if (str) {
      return str.length > 18 ? str.substring(18, 0) + "..." : str;
    }
    return " - ";
  };

  const dispatch = useDispatch();

  const closeModal = () => {
    setAction("");
    dispatch({
      type: "UPDATE_SIGNUP_DATA",
      signup_data: {},
    });
    navigate(location.pathname);
  };

  //Pushing to urls with param changes
  useEffect(() => {
    if (action) {
      if (auth.isAuthenticated()) {
        if (action === "subscribe") {
          setRedirectUrl(
            `${location.pathname}?action=${action}${
              status ? `&status=${status}` : ""
            }${plan ? `&plan=${plan}` : ""}${event ? `&event=${event}` : ""}`
          );
        } else if (
          action === "buy-course" &&
          !courseId &&
          location.pathname === "/prime-programs/"
        ) {
          setRedirectUrl(`${location.pathname}`);
        } else if (action === "buy-course" && !courseId) {
          setRedirectUrl(`${location.pathname}?action=${action}`);
        } else if (action === "techschooling") {
          setRedirectUrl(`${location.pathname}?action=${action}`);
        } else if (action === "buy-course" && courseId) {
          setRedirectUrl(`${location.pathname}?action=${action}&c=${courseId}`);
        } else if (action === "login") {
          setRedirectUrl(`${location.pathname}?action=subscribe`);
        } else if (action === "subscribe-prime-programs" && days) {
          setRedirectUrl(`${location.pathname}?action=${action}&&d=${days}`);
        } else if (action === "subscribe-prime-programs") {
          setRedirectUrl(`${location.pathname}?action=${action}`);
        } else {
          setRedirectUrl(`${location.pathname}`);
        }
      } else {
        if (
          action === "subscribe" ||
          action === "buy-course" ||
          action === "subscribe-prime-programs"
        ) {
          setRedirectUrl(`${location.pathname}?action=login`);
        } else {
          setRedirectUrl(
            `${location.pathname}?action=${action}${
              status ? `&status=${status}` : ""
            }${plan ? `&plan=${plan}` : ""}${phone ? `&phone=${phone}` : ""}${
              nextPath ? `&next=${nextPath}` : ""
            }`
          );
        }
      }
    } else {
      setRedirectUrl("");
    }
  }, [action, nextPath, courseId]);

  const menuItems = [
    {
      path: "/feed/",
      label: "Home",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/01-06-2024/community.svg",
    },
    {
      path: "/nanodegree/",
      label: "NanoDegree",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/10-09-2024/nano_degree_icons.svg",
    },
    {
      path: "/tech-updates/",
      label: "Tech Updates",
      icon: "https://steyp.com/static/media/techupdates.53fa5c58.svg",
    },
  ];

  // let { total_coins } = props.user_profile;

  const { notifications, notifications_count, user_data, respSearch } = props;

  const onSubscribe = () => {
    if (auth.isAuthenticated()) {
      navigate(`${props.location.pathname}?action=subscribe`);
    } else {
      navigate(`${props.location.pathname}?action=login`);
    }
  };

  const renderModal = () =>
    !auth.isAuthenticated() ? (
      action === "login" ? (
        <LoginModal
          action={action}
          nextPath={nextPath}
          closeModal={closeModal}
        />
      ) : action === "password" ? (
        <PasswordModal
          action={action}
          nextPath={nextPath}
          closeModal={closeModal}
        />
      ) : action === "otp" ? (
        <LoginWithOTPModal
          action={action}
          nextPath={nextPath}
          closeModal={closeModal}
        />
      ) : action === "phone" ? (
        <EnterPhoneModal
          action={action}
          nextPath={nextPath}
          closeModal={closeModal}
        />
      ) : action === "verify-otp" ? (
        <EnterOTPModal
          action={action}
          nextPath={nextPath}
          closeModal={closeModal}
        />
      ) : action === "name" ? (
        <EnterNameModal
          action={action}
          nextPath={nextPath}
          closeModal={closeModal}
        />
      ) : action === "set-password" ? (
        <SetPasswordModal
          action={action}
          nextPath={nextPath}
          closeModal={closeModal}
        />
      ) : action === "referral" ? (
        <EnterTrialDistrict
          action={action}
          nextPath={nextPath}
          closeModal={closeModal}
        />
      ) : action === "forgot-password" ? (
        <ResetOne action={action} nextPath={nextPath} closeModal={closeModal} />
      ) : action === "forgot-password-verify-otp" ? (
        <ResetTwo action={action} nextPath={nextPath} closeModal={closeModal} />
      ) : action === "forgot-password-reset" ? (
        <ResetThree
          action={action}
          nextPath={nextPath}
          closeModal={closeModal}
        />
      ) : null
    ) : action === "techschooling" ? (
      <EnterBalanceDetails
        action={action}
        nextPath={nextPath}
        closeModal={closeModal}
      />
    ) : null;

  if (respSearch) {
    return (
      <React.Fragment>
        {renderRedirect()}
        <Head>
          <SearchRightContainer onClick={showSideMenu} className="search">
            <i className="las la-bars"></i>
          </SearchRightContainer>

          <SearchRespContainer>
            <SearchInner className="search">
              <form
                style={{
                  width: "100%",
                  // border: " 1px solid #E3E8EF",
                  // borderRadius: "12px",
                }}
                action=""
                className="search"
              >
                <i className="las la-search"></i>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Search"
                  onChange={() => {
                    onSearchValueChange();
                  }}
                  onKeyDown={handleKeyDown}
                  value={searchValue}
                  autoFocus
                />
                <i
                  onClick={() => {
                    props.toggleRespSearch();
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

  const searchProps = {
    setGlobalSearch,
    globalSearch,
    setSearchModal,
    isSearchModal,
    historyStack,
    setHistoryStack,
  };

  return (
    <>
      {renderModal()}
      {renderRedirect()}
      {redirectUrl ? <Navigate to={redirectUrl} /> : null}
      <div className="drop-down">
        {/* <NotificationDropdown
          notifications={notifications}
          notifications_count={notifications_count}
          isNotificationModalVisible={isNotificationModalVisible}
          toggleNotificationModal={toggleNotificationModal}
          setNotifModalRef={setWrapperRef}
        /> */}

        {/* {renderMessageDropdown()} */}

        <ProfileSideBar setProfileSideBar={setProfileSideBar} />
      </div>
      <Head>
        <Left
          style={{ marginRight: `${marginLeft}px` }}
          ref={(el) => (tabRefs.current[0] = el)}
          // marginLeft={marginLeft}
        >
          {!(width < 500 && showSearch) && (
            <>
              {window.location.pathname.includes("order-summary") ||
              window.location.pathname.includes("profile") ||
              window.location.pathname.includes("entrance") ||
              window.location.pathname.includes("post") ||
              window.location.pathname === "/" ? null : (
                <>
                  {![
                    "tech-updates",
                    "feed",
                    "notification",
                    "nanodegree",
                    "leaderboard",
                    "notifications",
                    "saved",
                    "all",
                    "tech-newbie",
                    "people",
                  ].includes(lastSegment) &&
                    !/^\/nanodegree(\/(tech-degree|[^/]+(\/order-summary)?)?)?$/.test(
                      window.location.pathname
                    ) && (
                      <HeaderIcon
                        onClick={showSideMenu}
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/menu-icon.svg"
                        alt="Icon"
                      />
                    )}
                </>
              )}

              {/* ))} */}
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

          {user_data && user_data.is_verified
            ? width > 1060 && (
                <HeaderSearch {...searchProps} id={"largeScreen"} />
              )
            : null}
        </Left>

        {width > 768 && !showSearch && (
          <Center>
            <div ref={(el) => (tabRefs.current[1] = el)}>
              <NavMenu />
            </div>
          </Center>
        )}
        {user_data && user_data.is_verified ? (
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
                      user_data && user_data.is_verified
                        ? props.toggleProfile()
                        : onSubscribe();
                    }}
                  >
                    {renderPhoto()}
                    <Name className="g-medium">
                      {props.user_profile.name && props.user_profile.name
                        ? "  Me "
                        : "User"}
                    </Name>
                    <Polygon
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/polygon.svg"
                      alt="Icon"
                    />
                  </ProfileWrapper>
                </div>
              ) : (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "14px" }}
                >
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
                      alt="Icon"
                      id={"iconOnly"}
                      onClick={() => setShowSearch(!showSearch)}
                    />
                  )}

                  {
                    showSearch || isNavMenuModal || isProfileSideActive ? (
                      <CrossIcon
                        onClick={() => {
                          setProfileSideBar(false);
                          setNavMenuModal(false);
                          setShowSearch(false);
                        }}
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/cross-icon.svg"
                        alt="Icon"
                      />
                    ) : (
                      <>
                        <ProfileWrapper
                          onClick={() => {
                            if (window.innerWidth < 440) {
                              // history.push("/feed/profile");
                              setNavMenuModal(true);
                            } else {
                              setNavMenuModal(true);
                            }
                          }}
                        >
                          {renderPhoto()}
                        </ProfileWrapper>
                      </>
                    )
                    // )
                  }
                </div>
              )}
              <NavModal
                showModal={isNavMenuModal}
                setShowModal={setNavMenuModal}
                props={props}
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

// header countdown

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
  /* margin-top: 10px; */
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
  ${({ id }) => id === "iconOnly" && `cursor: pointer;  `};
`;

const CrossIcon = styled.img`
  cursor: pointer;
  display: block;
  width: 18px;
  height: 18px;
  margin: 10px;
`;

const MenuIcon = styled.img`
  cursor: pointer;
  display: block;
  width: 38px;
  height: 38px;
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

const IconBox = styled.div`
  position: relative;
  margin-right: 21px;
  &:last-child {
    margin-right: 0;
  }
  @media (max-width: 1100px) {
    margin-right: 13px;
  }
`;
const SideIcons = styled.img`
  cursor: pointer;
  display: block;
  width: 20px;
  max-height: 19px;
`;
const SearchResIcon = styled.img`
  cursor: pointer;
  display: block;
  width: 20px;
  max-height: 17px;
  margin-right: 13px;
`;

const MessagesDropDown = styled.div`
  position: absolute;
  width: 360px;
  background: #fff;
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
  right: 44px;
  top: 72px;
  padding: 25px;
  color: #333;
  z-index: 100;
  @media only screen and (max-width: 640px) {
    padding: 10px;
    top: 40px;
    right: 20px;
  }
  @media only screen and (max-width: 480px) {
    padding: 10px;
    top: 45px;
    right: 0;
    width: 100%;
  }
`;
const MessageItem = styled(Link)`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  position: relative;
  &:last-child {
    margin-bottom: unset;
  }
`;
const MessagesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;
const HeaderTitle = styled.h4`
  font-size: 18px;
  font-family: "gordita_medium";
`;
const Button = styled(Link)`
  color: #3b86ff;
  font-size: 14px;
`;
const JdenticonBox = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  border: 0.5px solid #aaa;
`;
const MessagesBody = styled.div``;
const LeftBox = styled.div`
  margin-right: 14px;
  width: 45px;
  height: 45px;
`;
const Image = styled.img``;
const ActiveTag = styled.span``;
const RightBox = styled.div``;
const Top = styled.div``;
const NameItem = styled.p`
  font-size: 14px;
  font-family: "gordita_medium";
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`;
const LastMessage = styled.span`
  font-family: "gordita_regular";
  font-size: 12px;
`;
const Dot = styled.small`
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #333;
  margin: 0 15px;
`;
const Timestamp = styled.small`
  font-family: "gordita_regular";
  font-size: 11px;
`;
const MessageCount = styled.span`
  position: absolute;
  right: 0;
  top: 17px;
  font-size: 12px;
  background: red;
  color: #fff;
  display: flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-family: "gordita_medium";
`;

const SearchBox = styled.div`
  display: none !important;
  width: 18px;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    cursor: pointer;
  }
  @media all and (max-width: 540px) {
    display: block !important;
    /* width: 16px; */
  }
`;
const SearchBoxIcon = styled.img`
  width: 100%;
  display: block;
`;

const NotificationIcon = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;

  img {
    width: 100%;
    height: 24px;
    display: inline-block;
  }
`;

const InstallButton = styled.div`
  width: 134px;
  background: #e6f9f1;
  margin: 0px 20px;
  padding: 5px 10px;
  border: 1px solid #bae8d6;
  border-radius: 5px;
  display: none;
  align-items: center;
  color: #0fa76f;
  justify-content: space-between;
  font-family: "baloo_paaji_2medium";
  cursor: pointer;
  transition: all 0.5s ease;

  @media all and (max-width: 890px) {
    width: 94px;
    margin: 0px 9px;
    padding: 5px 5px;
  }
  @media all and (max-width: 420px) {
    position: fixed;
    bottom: 30px;
  }
`;
const IconContainer = styled.span`
  width: 25px;
  height: 25px;
  background: #fff;
  border-radius: 50% 50%;
  display: flex;
  overflow: hidden;
  @media all and (max-width: 890px) {
    width: 20px;
    height: 20px;
  }
`;
const Icon = styled.img`
  width: 100%;
  display: block;
`;
const Span = styled.span`
  font-family: gordita_medium;
  @media all and (max-width: 890px) {
    font-size: 13px;
  }
`;
const DownloadIconContainer = styled.span`
  width: 15px;
  height: 22px;
  display: flex;
  @media all and (max-width: 890px) {
    width: 13px;
    height: 15px;
  }
`;

const EmptyWrapper = styled.div``;
const LoginButton = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background: #57c081;
  color: #fff;
  padding: 3px 16px;
  border-radius: 4px;
  font-family: "gordita_medium";
  margin-top: 10px;
  font-size: 14px;
  i {
    margin-left: 5px;
  }
`;

const Profiles = styled.div`
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  background: #fff;
  max-height: 43px;
  padding-top: 10px;
  max-width: 39px;
  min-height: 39px;
  min-width: 43px;
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

const Letter = styled.span`
  font-family: "baloo_paaji_2semibold";
  display: flex;
  width: 100%;
  background-color: ${(props) =>
    props.letter ? getLetterColor(props.letter) : "#ccc"};
  border-radius: 50%;
  color: #fff;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  height: -webkit-fill-available;
`;
const CoinContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 23px;
  @media (max-width: 768px) {
    padding-right: 0;
    margin-right: 14px;
  }
`;
const CoinsWrap = styled(Link)`
  @media (max-width: 1210px) {
    display: none !important;
  }
`;
const Coins = styled.div`
  padding: 6px 16px;
  background: linear-gradient(90deg, #ffeb3b 0%, #fff9c4 100%);
  border-radius: 6px;
  border: 1px solid #f9a825;
  margin-right: 30px;
  display: flex;
  align-items: center;
  color: #333333;
  cursor: pointer;
`;
const Count = styled.span`
  font-size: 14px;
  margin: 0 12px 0 6px;
`;
const AddCoins = styled.span`
  border-radius: 50%;
  padding: 3px;
  background: #f9a825;
  color: #fff;
  font-size: 14px;
`;
const SearchBoxCard = styled.div`
  /* width: 95%;
    margin: 0 auto; */
`;
const SearchBoxContainer = styled.form`
  position: fixed;
  top: 12px;
  left: 0px;
  margin-left: 12px;
  width: 95%;
  height: 38px;
  padding: 8px 15px 7px 15px;
  border-radius: 5px;
  background: #fff;
  display: flex;
  align-items: center;
`;

const Closebutton = styled.button`
  cursor: pointer;
  width: 14px;
  height: 14px;
`;
const CloseIcon = styled.img`
  width: 100%;
  display: block;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
