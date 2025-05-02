import React from "react";
import styled from "styled-components";

const NotificationNavBar = ({
  setActiveTab,
  activeTab,
  setNotificationData,
}) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setNotificationData([]);
  };

  return (
    <Container>
      <>
        <NavItem
          className={activeTab === "all" ? "active" : ""}
          onClick={() => {
            handleTabClick("all");
          }}
        >
          All
        </NavItem>
        <NavItem
          className={activeTab === "un-read" ? "active" : ""}
          onClick={() => {
            handleTabClick("un-read");
          }}
        >
          Unread
        </NavItem>
        <NavItem
          className={activeTab === "read" ? "active" : ""}
          onClick={() => {
            handleTabClick("read");
          }}
        >
          Read
        </NavItem>
      </>
    </Container>
  );
};

export default NotificationNavBar;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const NavItem = styled.button`
  cursor: pointer;
  font-family: "gordita_regular";
  position: relative;
  display: inline-block;
  color: #697586;
  font-size: 1rem;
  font-weight: 600;
  padding: 0 12px 8px 12px;
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    color: #059664;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: #059664;
    transition: width 0.4s ease-in-out;
  }

  &:hover::after,
  &.active::after {
    width: 90%;
  }

  &.active {
    color: #059664;
  }
`;
