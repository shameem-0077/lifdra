import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { learnConfig } from "../../../../../axiosConfig";

export default function ProgramNavBar({ program_slug }) {
  const { user_profile, user_data, activeProgramNav } = useSelector(
    (state) => state
  );
  const [skills, setSkills] = useState([]);
  const location = useLocation();

  const title = program_slug.replace("-", " ");

  useEffect(() => {
    let { access_token } = user_data;
    learnConfig
      .get(`/learn/new-content/skills/tech-schooling/`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        let { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          setSkills(data);
        }
      })
      .catch((error) => console.log(error));
  }, [program_slug]);

  if (location.key) {
    return (
      <Container>
        <Heading>{title}</Heading>
        <MenuContainer>
          <NavItem
            exact
            activeClassName="active"
            to={`/nanodegree/${program_slug}/daily-syllabus/`}
          >
            Daily Syllabus
          </NavItem>
          <NavItem
            activeClassName="active"
            className={activeProgramNav === "learning" && "active"}
            to={`/nanodegree/${program_slug}/professions/`}
          >
            Learning
          </NavItem>
          <NavItem
            activeClassName="active"
            to={`/nanodegree/${program_slug}/practices/`}
          >
            Practices
          </NavItem>
          <NavItem
            activeClassName="active"
            to={`/nanodegree/${program_slug}/workshops/`}
          >
            Workshops
          </NavItem>
          <NavItem
            activeClassName="active"
            to={`/nanodegree/${program_slug}/assessments/`}
          >
            Assessments
          </NavItem>
          {/* <NavItem
                activeClassName="active"
                to={`/${subject_slug}/subscribe/`}
            >
                Subscribe
            </NavItem> */}
          {/* <NavItem activeClassName="active" to={`/${subject_slug}/explore/`}>
                Explore Tech Schooling
            </NavItem> */}
          {user_profile.subscription_data &&
            !user_profile.subscription_data.expired_subscription &&
            skills.length > 0 && (
              <NavItem
                activeClassName="active"
                to={`/nanodegree/${program_slug}/new-content/`}
              >
                New Content
              </NavItem>
            )}

          <NavItem
            activeClassName="active"
            to={`/nanodegree/${program_slug}/certification/`}
          >
            Certification
          </NavItem>

          {/* <NavItem
                activeClassName="active"
                to={`/${subject_slug}/qa-spot/`}
            >
                QA Spot
            </NavItem>
            <NavItem
                activeClassName="active"
                to={`/${subject_slug}/doubt-hub/`}
            >
                Doubt Hub
            </NavItem> */}
        </MenuContainer>
      </Container>
    );
  } else {
    return null;
  }
}

const Container = styled.div``;
const Heading = styled.h3`
  text-transform: capitalize;
  font-family: "gordita_medium";
  font-size: 23px;
  margin-bottom: 19px;
  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 6px;
  }
`;
const MenuContainer = styled.div`
  display: flex;
  /* box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1); */
  /* padding: 12px 25px 0; */
  margin-bottom: 15px;
  border-bottom: 1px solid #e8e8e8;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #fff;
  }
  &::-webkit-scrollbar-thumb {
    background: #e5e5e5;
    border-radius: 0.625rem;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #b7b7b7;
  }
  @media (max-width: 768px) {
    /* margin-bottom: 15px; */
    overflow-x: scroll;
  }
  @media all and (max-width: 1024px) {
    margin-bottom: 8px;
  }
`;
const NavItem = styled(NavLink)`
  font-family: "gordita_regular";
  min-width: fit-content;
  display: inline-block;
  color: #717171;
  font-size: 15px;
  margin-right: 32px;
  padding-bottom: 12px;
  &:last-child {
    padding-right: 0;
    margin-right: 0;
  }
  &.active {
    font-family: "gordita_regular";
    color: #5fd18a;
    border-bottom: 3px solid #5fd18a;
  }
  @media (max-width: 480px) {
    font-size: 14px;
    margin-right: 35px;
  }
  @media all and (max-width: 1024px) {
    padding-bottom: 3px;
  }
`;
