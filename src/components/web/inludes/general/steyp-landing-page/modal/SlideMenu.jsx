import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";
import { Link as Direction } from "react-scroll";
import { useAuthStore } from "../../../../../../store/authStore";
import auth from "../../../../../routing/auth";

const SlideMenu = ({ isMenu, setMenu, isTechDegree, isSat, about }) => {
  const { user_profile } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMenu) {
      $("html").addClass("modal-enabled");
    } else {
      $("html").removeClass("modal-enabled");
    }
  }, [isMenu]);

  const handleModal = () => {
    navigate(location.pathname);
  };

  const onSubscribe = () => {
    if (auth.isAuthenticated()) {
      navigate({
        pathname: location.pathname,
        search: `action=subscribe`,
      });
    } else {
      navigate({
        pathname: location.pathname,
        search: `action=login`,
      });
    }
  };

  const firstmenu = [
    {
      id: 1,
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/programs.svg",
      title: "Programs",
      menuList: [
        { name: "School Students", link: "/" },
        { name: "College Students", link: "/" },
      ],
    },
  ];

  const menu = [
    {
      id: 1,
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/programs.svg",
      title: "Programs",
      menuList: [
        { name: "School Students", link: "sat" },
        { name: "College Students", link: "jobdesk" },
      ],
    },
  ];
  const menus = [
    {
      id: 1,
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/company.svg",
      title: "Company",
      menuList: [
        { name: "Success Stories", link: "/success-stories/" },
        { name: "About Us", link: "/about-us/" },
        { name: "Contact Us", link: "/contact-us/" },
      ],
    },
    {
      id: 2,
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/community.svg",
      title: "Community",
      menuList: [{ name: "Free Ground", link: "/free-ground/" }],
    },
  ];

  return (
    <BackContainer style={{ top: isMenu && 0 }}>
      <Overlay onClick={() => setMenu(false)}></Overlay>

      <Modal>
        <Cover>
          <Logo to={user_profile?.user_id ? "/dashboard" : "/"}>
            <img
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/steyp-logo.svg"
              alt="Logo"
            />
          </Logo>
          <MenuContainer>
            <LeftSection>
              {about ? (
                <>
                  {firstmenu.map((data, index) => (
                    <MenuSection key={data.id}>
                      <Icon>
                        <img src={data.icon} alt="icon" />
                      </Icon>
                      <Title>{data.title}</Title>
                      {data.menuList.map((item) => (
                        <MenuLinks
                          key={item.link}
                          to={item.link}
                          onClick={() => setMenu(false)}
                        >
                          <span>{item.name}</span>
                        </MenuLinks>
                      ))}
                    </MenuSection>
                  ))}
                </>
              ) : (
                <>
                  {menu.map((data, index) => (
                    <MenuSection key={data.id}>
                      <Icon>
                        <img src={data.icon} alt="icon" />
                      </Icon>
                      <Title>{data.title}</Title>
                      {data.menuList.map((item) => (
                        <Links
                          key={item.link}
                          to={item.link}
                          activeClass="active"
                          offset={-50}
                          duration={300}
                          onClick={() => {
                            setMenu(false);
                          }}
                        >
                          <span>{item.name}</span>
                        </Links>
                      ))}
                    </MenuSection>
                  ))}
                </>
              )}

              {menus.map((data, index) => (
                <MenuSection key={data.id}>
                  <Icon>
                    <img src={data.icon} alt="icon" />
                  </Icon>
                  <Title>{data.title}</Title>
                  {data.menuList.map((item) => (
                    <Linkss
                      key={item.link}
                      to={item.link}
                      onClick={() => setMenu(false)}
                    >
                      <span>{item.name}</span>
                    </Linkss>
                  ))}
                </MenuSection>
              ))}
            </LeftSection>
            <RightSection>
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
            </RightSection>
          </MenuContainer>

          <Close onClick={() => setMenu(false)}>
            <img
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/close.svg"
              alt="close"
            />
          </Close>
        </Cover>
      </Modal>
    </BackContainer>
  );
};

export default SlideMenu;

const BackContainer = styled.div`
  overflow: hidden;
  position: fixed;
  transition: 0.3s;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  left: 0;
  top: -100vh;

  backdrop-filter: blur(2px);
`;
const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0px;
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
`;
const Modal = styled.div`
  background: #fff;
  left: 0;
  top: 0;
  position: absolute;
  width: 100%;
  transition: 0.5s;
  z-index: 101;
  min-height: 40vh;
  padding: 50px 0;
  overflow-y: scroll;
  max-height: 100vh;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  @media all and (max-width: 360px) {
    padding: 30px 0;
  }
`;
const Logo = styled(Link)`
  width: 100px;
  display: block;
  img {
    display: block;
    width: 100%;
  }
`;
const MenuContainer = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: 3fr 2fr;
  @media all and (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;
const DashBoardButton = styled(Link)`
  color: #4eaf7c;
  font-size: 18px;
  width: 90%;
  max-width: 250px;
  height: 60px;
  font-family: gordita_medium;
  text-align: center;
  display: block;
  border: 2px solid #4eaf7c;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
  /* @media all and (max-width:) */
  @media all and (max-width: 768px) {
    font-size: 16px;
    width: 90%;
    max-width: 230px;
    height: 50px;
  }
  @media all and (max-width: 480px) {
    @media all and (max-width: 480px) {
      /* font-size: 12px;
            width: 100%;
            max-width: 140px;
            height: 40px; */
    }
  }
  @media all and (max-width: 360px) {
    max-width: 100%;
    width: 100%;
  }
`;
const BottomButton = styled(Link)`
  cursor: pointer;
  background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
  display: block;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 60px;
  font-size: 15px;
  width: 200px;
  &:hover {
    opacity: 0.8;
  }

  @media all and (max-width: 980px) {
    &::before {
      top: -50px;
    }
  }
  @media all and (max-width: 768px) {
    font-size: 16px;
    width: 90%;
    max-width: 230px;
    height: 50px;
  }
  @media all and (max-width: 480px) {
  }

  @media all and (max-width: 360px) {
    max-width: 100%;
    width: 100%;
  }
`;
const SignInButton = styled(Link)`
  color: #545454;
  background: #4eaf7c;
  color: #fff;
  font-family: gordita_medium;
  width: 90%;
  max-width: 250px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border: 2px solid #4eaf7c;
  border-radius: 5px;
  margin: 0 auto;
  transition: all 0.3s;
  position: relative;
  /* margin-bottom: 30px; */

  &:hover {
    opacity: 0.8;
  }

  @media all and (max-width: 980px) {
    &::before {
      top: -50px;
    }
  }
  @media all and (max-width: 768px) {
    font-size: 16px;
    width: 90%;
    max-width: 230px;
    height: 50px;
  }
  @media all and (max-width: 480px) {
  }

  @media all and (max-width: 360px) {
    max-width: 100%;
    width: 100%;
  }
`;
const ApplyNow = styled.span`
  color: #545454;
  background: #4eaf7c;
  cursor: pointer;
  color: #fff;
  font-family: gordita_medium;
  width: 90%;
  max-width: 250px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border: 2px solid #4eaf7c;
  border-radius: 5px;
  margin: 0 auto;
  transition: all 0.3s;
  position: relative;
  /* margin-bottom: 30px; */

  &:hover {
    opacity: 0.8;
  }

  @media all and (max-width: 980px) {
    &::before {
      top: -50px;
    }
  }
  @media all and (max-width: 768px) {
    font-size: 16px;
    width: 90%;
    max-width: 230px;
    height: 50px;
  }
  @media all and (max-width: 480px) {
  }

  @media all and (max-width: 360px) {
    max-width: 100%;
    width: 100%;
  }
`;
const Close = styled.span`
  display: block;
  width: 20px;
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 999;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
  @media all and (max-width: 360px) {
    right: 0px;
    top: 0px;
  }
`;

const Cover = styled.div`
  position: relative;
  height: 100%;
  width: 85%;
  margin: 0 auto;
`;
const LeftSection = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 20px;
  @media all and (max-width: 980px) {
    padding-bottom: 50px;
  }
  @media all and (max-width: 768px) {
    padding-bottom: 30px;
  }
  @media all and (max-width: 640px) {
    flex-wrap: wrap;
  }
  @media all and (max-width: 360px) {
    padding-bottom: 20px;
  }
`;
const RightSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-left: 1px solid #d2f7ea;
  grid-gap: 30px;
  @media all and (max-width: 980px) {
    border-left: none;
    border-top: 1px solid #d2f7ea;
    padding-top: 50px;
    flex-direction: row;
    justify-content: space-around;
  }
  @media all and (max-width: 768px) {
    padding-top: 30px;
  }
  @media all and (max-width: 480px) {
    flex-direction: column;
    justify-content: center;
    grid-gap: 20px;
  }
  @media all and (max-width: 360px) {
    padding-top: 20px;
  }
`;
const MenuSection = styled.div`
  @media all and (max-width: 640px) {
    width: 45%;
    /* margin: 0 auto; */
    text-align: left;
  }
  @media all and (max-width: 360px) {
    width: 48%;
  }
`;
const Icon = styled.span`
  display: block;
  width: 40px;
  margin-bottom: 20px;
  img {
    display: block;
    width: 100%;
  }
  @media all and (max-width: 480px) {
    width: 35px;
    margin-bottom: 15px;
  }
  @media all and (max-width: 640px) {
    /* margin: 0 auto; */
    /* margin: unset; */
    text-align: center;
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-family: gordita_medium;
  color: #707070;
  margin-bottom: 20px;
  @media all and (max-width: 640px) {
    font-size: 16px;
    margin-bottom: 15px;
  }
  @media all and (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;
const MenuLinks = styled(Link)`
  cursor: pointer;
  font-family: gordita_regular;
  display: block;
  margin-bottom: 15px;
  color: #9c9c9c;
  font-size: 16px;
  position: relative;
  &:hover {
    color: #4eaf7c;
  }

  &.selected {
    color: #4eaf7c;
    font-family: gordita_medium;
    span {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 15px;
        right: 0;
        width: 100%;
        height: 20px;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/line.svg")
          no-repeat;
        background-size: contain;
        display: block;
        z-index: -1;
        font-size: 16px;
      }
    }
  }
  @media all and (max-width: 640px) {
    font-size: 15px;
    margin-bottom: 15px;
  }
  @media all and (max-width: 360px) {
    font-size: 15px;
    span {
      position: relative;
      &::before {
        top: 12px !important;
      }
    }
  }
`;
const Links = styled(Direction)`
  cursor: pointer;
  font-family: gordita_regular;
  display: block;
  margin-bottom: 15px;
  color: #9c9c9c;
  font-size: 16px;
  position: relative;
  &:hover {
    color: #4eaf7c;
  }

  &.selected {
    color: #4eaf7c;
    font-family: gordita_medium;
    span {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 15px;
        right: 0;
        width: 100%;
        height: 20px;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/line.svg")
          no-repeat;
        background-size: contain;
        display: block;
        z-index: -1;
        font-size: 16px;
      }
    }
  }
  @media all and (max-width: 640px) {
    font-size: 15px;
    margin-bottom: 15px;
  }
  @media all and (max-width: 360px) {
    font-size: 15px;
    span {
      position: relative;
      &::before {
        top: 12px !important;
      }
    }
  }
`;

const Linkss = styled(Link)`
  cursor: pointer;
  font-family: gordita_regular;
  display: block;
  margin-bottom: 15px;
  color: #9c9c9c;
  font-size: 16px;
  position: relative;
  &:hover {
    color: #4eaf7c;
  }

  &.selected {
    color: #4eaf7c;
    font-family: gordita_medium;
    span {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 15px;
        right: 0;
        width: 100%;
        height: 20px;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/line.svg")
          no-repeat;
        background-size: contain;
        display: block;
        z-index: -1;
        font-size: 16px;
      }
    }
  }
  @media all and (max-width: 640px) {
    font-size: 15px;
    margin-bottom: 15px;
  }
  @media all and (max-width: 360px) {
    font-size: 15px;
    span {
      position: relative;
      &::before {
        top: 12px !important;
      }
    }
  }
`;
