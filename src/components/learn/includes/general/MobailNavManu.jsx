import React from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import auth from "../../../routing/auth";

function MobailNavManu() {
  const location = useLocation();

  const menuItems = [
    {
      path: "/feed",
      label: "Home",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/28-09-2024/home-icon.svg",
      active_icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/07-10-2024/home_icon.svg",
    },
    {
      path: "/nanodegree",
      label: "NanoDegree",
      active_icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/19-10-2024/activestate_hat.svg",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/14-10-2024/nanodegree.svg",
    },
    {
      path: "/tech-updates",
      label: "Tech Updates",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/05-10-2024/techupdate_icon.svg",
      active_icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/28-11-2024/g740.svg",
    },
  ];

  if (auth.isAuthenticated()) {
    menuItems.push({
      path: "/notifications",
      label: "Notifications",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/14-10-2024/bell_icon.svg",
      active_icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-11-2024/bell-03.svg",
    });
  }

  return (
    <Head>
      <Container>
        {menuItems.map((item, index) => (
          <MenuBox 
            to={item.path} 
            key={index}
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <ItemIconContainer>
              <img
                src={location.pathname === item.path ? item.active_icon : item.icon}
                alt={item.label}
              />
            </ItemIconContainer>
            <ItemTitle className={location.pathname === item.path ? "active" : ""}>
              {item.label}
            </ItemTitle>
          </MenuBox>
        ))}
      </Container>
    </Head>
  );
}

export default MobailNavManu;

const pxToRem = (px) => `${(px / 16).toFixed(2)}rem`;

const Head = styled.div`
  max-width: 100%;
  width: 100%;
  height: 80px;
  padding: 12px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 999;
  box-shadow: 3px 1px 4px 0px #00000040;
  display: none;
  @media all and (max-width: 440px) {
    display: block;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  gap: 8px;
  @media all and (max-width: 380px) {
    gap: 0px;
  }
`;

const ItemTitle = styled.div`
  font-size: ${pxToRem(12)};
  font-family: "gordita_regular";
  color: #475467;
  
  &.active {
    color: #059664;
  }
  
  @media all and (max-width: 340px) {
    font-size: ${pxToRem(10)};
  }
`;

const MenuBox = styled(NavLink)`
  max-width: 87px;
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  
  &:nth-child(1) {
    max-width: 60px;
  }

  &.active {
    ${ItemTitle} {
      color: #059664;
    }
  }
`;

const ItemIconContainer = styled.div`
  width: 24px;
  height: 24px;
  img {
    width: 100%;
    display: block;
    object-fit: contain;
  }
`;
