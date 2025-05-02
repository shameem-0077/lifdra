import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const [isNavBar, setNavbar] = useState(false);
  const [isMenu, setMenu] = useState(false);
  const handleNavbar = () => {
    if (window.scrollY >= 300) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", handleNavbar);

  return (
    <Container className={isNavBar && "active"}>
      <div className="wrapper">
        <LeftSection>
          <h1>
            <Logo to="/">
              <img
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/steyp-logo.svg"
                alt="Logo"
              />
            </Logo>
          </h1>
        </LeftSection>
        <RightSection>
          <HandBurger
            onClick={() => {
              setMenu(true);
            }}
          >
            <img
              src={require("../../../../assets/images/web/hamburg.svg")}
              alt="Menu"
            />
          </HandBurger>
        </RightSection>
      </div>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background-color: #fff;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

  &.active {
    box-shadow: 0 16px 24px rgb(0 0 0 / 3%);
  }
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 80%;
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
    height: 70px;
  }
`;

const LeftSection = styled.div``;
const RightSection = styled.div``;

const Logo = styled(Link)`
  width: 120px;
  display: block;
  img {
    width: 100%;
    display: block;
  }
  @media all and (max-width: 1100px) {
    width: 90px;
  }
`;

const HandBurger = styled.span`
  display: block;
  width: 30px;
  margin-left: 30px;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
  @media all and (max-width: 480px) {
    display: block;
    width: 25px;
  }
`;
