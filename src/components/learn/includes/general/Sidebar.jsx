import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { createRipples } from "react-ripples";
import { primeprogramsConfig } from "../../../../axiosConfig";
import arrowImage from "../../../../assets/images/new-dashboard/arrow.svg";
import learnImage from "../../../../assets/images/new-dashboard/learning.svg";
import leaderImage from "../../../../assets/images/new-dashboard/leader-board.svg";
import primeImage from "../../../../assets/images/new-dashboard/prime.svg";
import supportImage from "../../../../assets/images/new-dashboard/support.svg";
import meetImage from "../../../../assets/images/meet/videoconference 2.svg";
import techImage from "../../../../assets/images/new-dashboard/techupdates.svg";
import projects from "../../../../assets/images/projects-Image/projects.svg";
import syllabusIcon from "../../../../assets/images/new-dashboard/syllabus.svg";
import practiceIcon from "../../../../assets/images/new-dashboard/practice.svg";
import workshopIcon from "../../../../assets/images/new-dashboard/workshop.svg";
import assessmentIcon from "../../../../assets/images/new-dashboard/assessment.svg";
import certificationIcon from "../../../../assets/images/new-dashboard/certification.svg";
import supportIcon from "../../../../assets/images/support.svg";
import { useAuthStore } from "../../../../store/authStore";

const Sidebar = () => {
  const { user_data, user_profile, updateUserData } = useAuthStore();
  const [isSecondMenu, setSecondMenu] = useState(false);
  const location = useLocation();

  const handleIdUploadModal = () => {
    updateUserData({
      type: "TOGGLE_STUDENT_UPLOAD_MODAL",
    });
  };

  return (
    <SidebarWrapper>
      <SidebarContainer>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuLink to="/feed/">
              <SidebarMenuIcon className="las la-home" />
              <SidebarMenuText>Home</SidebarMenuText>
            </SidebarMenuLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink to="/meet/">
              <SidebarMenuIcon className="las la-video" />
              <SidebarMenuText>Meet</SidebarMenuText>
            </SidebarMenuLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink to="/tech-updates/">
              <SidebarMenuIcon className="las la-newspaper" />
              <SidebarMenuText>Tech Updates</SidebarMenuText>
            </SidebarMenuLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink to="/projects/">
              <SidebarMenuIcon className="las la-project-diagram" />
              <SidebarMenuText>Projects</SidebarMenuText>
            </SidebarMenuLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink to="/tech-schooling/">
              <SidebarMenuIcon className="las la-graduation-cap" />
              <SidebarMenuText>Tech Schooling</SidebarMenuText>
            </SidebarMenuLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink to="/my-club/">
              <SidebarMenuIcon className="las la-users" />
              <SidebarMenuText>My Club</SidebarMenuText>
            </SidebarMenuLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink to="/settings/">
              <SidebarMenuIcon className="las la-cog" />
              <SidebarMenuText>Settings</SidebarMenuText>
            </SidebarMenuLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContainer>
    </SidebarWrapper>
  );
};

export default Sidebar;

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 80px;
  height: 100vh;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const SidebarContainer = styled.div`
  padding: 20px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarMenuItem = styled.li`
  margin-bottom: 10px;
`;

const SidebarMenuLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  color: #666;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #007bff;
  }

  &.active {
    color: #007bff;
  }
`;

const SidebarMenuIcon = styled.i`
  font-size: 24px;
  margin-bottom: 5px;
`;

const SidebarMenuText = styled.span`
  font-size: 12px;
  text-align: center;
`;
