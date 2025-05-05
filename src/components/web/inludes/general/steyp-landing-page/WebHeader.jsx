import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import SlideMenu from "./modal/SlideMenu";
import queryString from "query-string";
import LoginModal from "../../../../learn/includes/authentication/modals/LoginModal";
import PasswordModal from "../../../../learn/includes/authentication/modals/PasswordModal";
import LoginWithOTPModal from "../../../../learn/includes/authentication/modals/LoginWithOTPModal";
import EnterPhoneModal from "../../../../learn/includes/authentication/modals/EnterPhoneModal";
import EnterOTPModal from "../../../../learn/includes/authentication/modals/EnterOTPModal";
import EnterNameModal from "../../../../learn/includes/authentication/modals/version-2.0/EnterNameModal";
import SetPasswordModal from "../../../../learn/includes/authentication/modals/SetPasswordModal";
import EnterTrialDistrict from "../../../../learn/includes/authentication/modals/EnterTrialDistrict";
import ResetOne from "../../../../learn/includes/authentication/modals/ResetOne";
import ResetTwo from "../../../../learn/includes/authentication/modals/ResetTwo";
import ResetThree from "../../../../learn/includes/authentication/modals/ResetThree";
import EnterBalanceDetails from "../../../../learn/includes/authentication/modals/version-2.0/EnterBalanceDetails";
import auth from "../../../../routing/auth";
import { Link as Direction } from "react-scroll";
import RequestLoader from "../../../../learn/includes/authentication/general/RequestLoader";
import $ from "jquery";
import { useAuthStore } from "../../../../../store/authStore";
import hamburgerIcon from "../../../../../assets/images/web/hamburg.svg";

const WebHeader = ({
  about,
  show,
  selectedForm,
  isTechDegree,
  clubs,
  isSat,
}) => {
  //local states
  const [navBar, setNavbar] = useState(false);
  const [isMenu, setMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [action, setAction] = useState(null);
  const [nextPath, setNextPath] = useState(null);
  const [plan, setPlan] = useState(null);
  const [phone, setPhone] = useState(null);
  const [status, setStatus] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [event, setEvent] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const { user_profile } = useAuthStore();

  //to handle tech degree form
  const closeModal = () => {
    setAction("");
    navigate(location.pathname);
  };
  const handleModal = () => {
    navigate(location.pathname);
  };

  useEffect(() => {
    if (
      action === "password" ||
      action === "login" ||
      action === "phone" ||
      action === "district" ||
      action === "otp" ||
      action === "verify-otp" ||
      action === "name" ||
      action === "forgot-password" ||
      action === "forgot-password-verify-otp" ||
      action === "forgot-password-reset" ||
      action === "set-password"
    ) {
      $("html").addClass("modal-enabled");
    } else {
      $("html").removeClass("modal-enabled");
    }
  }, [
    action === "password" ||
      action === "login" ||
      action === "phone" ||
      action === "district" ||
      action === "otp" ||
      action === "verify-otp" ||
      action === "name" ||
      action === "forgot-password" ||
      action === "forgot-password-verify-otp" ||
      action === "forgot-password-reset" ||
      action === "set-password",
  ]);

  useEffect(() => {
    let { search } = location;

    const values = queryString.parse(search);

    let searchValue = values.q;
    const action = values.action;
    const phone = values.phone;
    const plan = values.plan;
    const status = values.status;
    const event = values.event;
    const next = values.next;
    const c = values.c;
    setSearchValue(searchValue);
    setAction(action);
    setPlan(plan);
    setPhone(phone);
    setEvent(event);
    setStatus(status);
    setCourseId(c);
    setNextPath(next);
  }, [location.search]);

  useEffect(() => {
    if (action) {
      if (action === "vacation-plans") {
        if (auth.isAuthenticated()) {
          navigate(`${location.pathname}?action=vacation-plans`);
        } else {
          navigate(`${location.pathname}?action=login&next=/mlp/vacation-program/?action=vacation-plans`);
        }
      }
    }
  }, [action]);

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
      ) : action === "district" ? (
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
    ) : action === "techschooling" &&
      location.pathname.includes("/tech-schooling/") ? (
      <EnterBalanceDetails
        action={action}
        nextPath={nextPath}
        closeModal={closeModal}
      />
    ) : null;

  return (
    <>
      {renderModal()}
      <Container
        className={navBar && "active"}
      >
        <Section className="wrapper">
          <Logo to={user_profile?.user_id ? "/dashboard" : "/"}>
            <img
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/steyp-logo.svg"
              alt="Logo"
            />
          </Logo>
          <Menu>
            <MenuLinks>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
              <NavLink
                to="/about-us/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                About Us
              </NavLink>
              <NavLink
                to="/contact-us/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Contact Us
              </NavLink>
            </MenuLinks>
            <ButtonContainer>
              {!location.pathname === "/success-stories" ? (
                !isSat ? (
                  isTechDegree ? (
                    <ApplyNow onClick={handleModal}>Apply now</ApplyNow>
                  ) : !user_profile?.user_id ? (
                    <SignInButton to={`${location.pathname}?action=login`}>
                      Join now{" "}
                    </SignInButton>
                  ) : null
                ) : null
              ) : null}
              <DashBoardButton
                to={
                  user_profile?.user_id
                    ? "/feed/"
                    : `${location.pathname}?action=login&next=/dashboard`
                }
              >
                Go to dashboard
              </DashBoardButton>
            </ButtonContainer>
          </Menu>
          <HandBurger onClick={() => setMenu(true)}>
            <img src={hamburgerIcon} alt="menu" />
          </HandBurger>
        </Section>
      </Container>
      <SlideMenu
        isMenu={isMenu}
        setMenu={setMenu}
        isTechDegree={isTechDegree}
        isSat={isSat}
        about={about}
      />
    </>
  );
};

export default WebHeader;
const BottomButton = styled(Link)`
  cursor: pointer;
  background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
  display: block;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 50px;
  font-size: 15px;
  width: 180px;
  @media all and (max-width: 1100px) {
    height: 40px;
    font-size: 13px;
    width: 150px;
  }
  @media all and (max-width: 980px) {
    display: none;
  }
`;
const Links = styled(Link)`
  cursor: pointer;
  color: #707070;
  font-size: 16px;
  font-family: "gordita_medium" !important;
  transition: all 0.3s;
  margin-right: 35px;
  &:hover {
    color: #4eaf7c;
  }
  @media all and (max-width: 1100px) {
    font-size: 13px;
  }
  @media all and (max-width: 480px) {
    margin-right: 15px;
  }
  &.active {
    color: #4eaf7c;
  }
  @media all and (max-width: 768px) {
    display: none;
  }
`;

const Container = styled.div`
  /* position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  // height: 100px;
  z-index: 999;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px; */
  /* position: fixed;
  top: 0;
  left: 0; */
  width: 100%;
  height: 100px;
  background-color: #fff;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding-top: 20px; */
  &.active {
    box-shadow: 0 16px 24px rgb(0 0 0 / 3%);
  }
  @media all and (max-width: 1100px) {
    height: 70px;
  }

  /* @media all and (max-width: 640px) {
    padding-top: 45px;
  }
  @media all and (max-width: 480px) {
    padding-top: 40px;
  } */

  /* &.active {
        box-shadow: 0 16px 24px rgb(0 0 0 / 3%);
    } */
  /* &.postion-active {
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 999;
    padding-top: 0px;
    @media all and (max-width: 1100px) {
      height: 70px;
    }
  } */
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 85%;
    margin: 0 auto;
    // @media all and (max-width: 1024px) {
    //     margin: 0 99px 0 75px;
    // }
    // @media all and (max-width: 1224px) {
    //     margin: 0 101px 0px 92px;
    // }
    // @media all and (max-width: 980px) {
    //     margin: 0 auto;
    // }
  }
  @media all and (max-width: 1100px) {
    // height: 70px;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 85%;
  margin: 0 auto;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

const MenuLinks = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
  @media all and (max-width: 980px) {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  @media all and (max-width: 980px) {
    display: none;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;
const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &.none {
    display: none;
  }
`;
const Logo = styled(Link)`
  width: 120px;
  display: block;
  margin-right: 38px;
  img {
    width: 100%;
    display: block;
  }
  @media all and (max-width: 1100px) {
    width: 90px;
  }
`;

const DashBoardButton = styled(Link)`
  color: #4eaf7c;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border: 2px solid #4eaf7c;
  border-radius: 5px;
  width: 200px;
  height: 50px;
  font-family: "gordita_medium" !important;
  transition: all 0.3s;
  margin-right: 24px;
  &:hover {
    color: #4eaf7c;
  }
  @media all and (max-width: 1100px) {
    height: 40px;
    font-size: 13px;
    width: 150px;
  }
  @media all and (max-width: 980px) {
    display: none;
  }
`;
const SignInButton = styled(Link)`
  color: #545454;
  background-color: #4eaf7c;
  color: #fff;
  font-family: gordita_medium;
  width: 130px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border: 2px solid #4eaf7c;
  border-radius: 5px;
  transition: all 0.3s;
  margin-left: 30px;

  &:hover {
    background-color: #4eaf7c;
    color: #ffffff;
  }
  @media all and (max-width: 1100px) {
    height: 40px;
    font-size: 15px;
    width: 100px;
  }
  @media all and (max-width: 768px) {
    display: none;
  }
`;
const ApplyNow = styled.span`
  color: #545454;
  background-color: #4eaf7c;
  color: #fff;
  font-family: gordita_medium;
  width: 130px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border: 2px solid #4eaf7c;
  border-radius: 5px;
  transition: all 0.3s;
  margin-left: 30px;
  cursor: pointer;
  &:hover {
    background-color: #4eaf7c;
    color: #ffffff;
  }
  @media all and (max-width: 1100px) {
    height: 40px;
    font-size: 15px;
    width: 110px;
  }
  @media all and (max-width: 768px) {
    display: none;
  }
`;
const HandBurger = styled.span`
  display: none;
  @media all and (max-width: 980px) {
    display: block;
    width: 30px;
    margin-left: 30px;
    cursor: pointer;
    img {
      display: block;
      width: 100%;
    }
    margin-left: 15px;
  }
  @media all and (max-width: 480px) {
    display: block;
    width: 25px;
    margin-left: 0;
  }
`;
const NavItem = styled(Direction)`
  cursor: pointer;
  color: #707070;
  font-size: 16px;
  font-family: "gordita_medium" !important;
  transition: all 0.3s;
  margin-right: 35px;
  &:hover {
    color: #4eaf7c;
  }
  @media all and (max-width: 1280px) {
    font-size: 14px;
    margin-right: 30px;
  }
  @media all and (max-width: 1100px) {
    font-size: 13px;
    margin-right: 30px;
  }
  @media all and (max-width: 980px) {
    margin-right: 12px;
  }
  @media all and (max-width: 480px) {
    margin-right: 15px;
  }
  &.active {
    color: #4eaf7c;
  }
  @media all and (max-width: 768px) {
    display: none;
  }
`;

const NavBarLink = styled(Link)`
  cursor: pointer;
  color: #707070;
  font-size: 16px;
  font-family: "gordita_medium" !important;
  transition: all 0.3s;
  margin-right: 35px;
  &:hover {
    color: #4eaf7c;
  }
  @media all and (max-width: 1280px) {
    font-size: 14px;
    margin-right: 21px;
  }
  @media all and (max-width: 1100px) {
    font-size: 13px;
    margin-right: 30px;
  }
  @media all and (max-width: 980px) {
    margin-right: 12px;
  }
  @media all and (max-width: 480px) {
    margin-right: 15px;
  }
  &.active {
    color: #4eaf7c;
  }
  @media all and (max-width: 768px) {
    display: none;
  }
`;
