import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import primeImage from "../../../../assets/images/new-dashboard/prime.svg";
import supportImage from "../../../../assets/images/new-dashboard/support.svg";

const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarWrapper>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuLink
            to="/prime-programs/"
            className={location.pathname === "/prime-programs/" ? "active" : ""}
          >
            <SidebarMenuIcon>
              <img src={primeImage} alt="Prime Programs" />
            </SidebarMenuIcon>
            <SidebarMenuText>Prime Programs</SidebarMenuText>
          </SidebarMenuLink>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuLink
            to="/prime-programs/support/"
            className={location.pathname === "/prime-programs/support/" ? "active" : ""}
          >
            <SidebarMenuIcon>
              <img src={supportImage} alt="Support" />
            </SidebarMenuIcon>
            <SidebarMenuText>Support</SidebarMenuText>
          </SidebarMenuLink>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarWrapper>
  );
};

export default Sidebar;

const SidebarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 260px;
  height: calc(100vh - 82px);
  background: #fff;
  border-right: 1px solid #f0f0f0;
  z-index: 1000;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarMenuItem = styled.li`
  margin-bottom: 0;
`;

const SidebarMenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 24px 24px 24px 32px;
  color: #222;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  border-left: 4px solid transparent;
  background: transparent;
  transition: background 0.2s, border-color 0.2s, color 0.2s;

  &.active {
    background: #f8f6ff;
    border-left: 4px solid #a02060;
    color: #a02060;
    font-weight: 700;
  }

  &:hover {
    background: #f8f6ff;
    color: #a02060;
  }
`;

const SidebarMenuIcon = styled.span`
  display: flex;
  align-items: center;
  margin-right: 16px;
  width: 28px;
  height: 28px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SidebarMenuText = styled.span`
  font-size: 16px;
  font-weight: inherit;
`;
