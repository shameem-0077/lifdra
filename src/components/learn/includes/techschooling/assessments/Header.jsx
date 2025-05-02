import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, NavLink, useParams } from "react-router-dom";
import { AssessmentContext } from "../../../../contexts/stores/AssessmentStore";
import { useSelector } from "react-redux";
import ToggleButton from "./ToggleButton";

function Header({ subject_slug }) {
  const { id } = useParams();
  const { assessmentState } = useContext(AssessmentContext);
  const user_profile = useSelector((state) => state.user_profile);
  const [english, setEnglish] = useState(false);

  return (
    <HeaderContainer>
      <TopContainer>
        <Content>
          <ImageContainer>
            <Image src={assessmentState.assessment.image} />
          </ImageContainer>
          <FullContainer>
            <ContentTop>
              {/* <TitleImage>
                                <Picture
                                    src={assessmentState.assessment.image}
                                />
                            </TitleImage> */}
              <Title>{assessmentState.assessment.title}</Title>
            </ContentTop>
            <ContentBottom>
              {assessmentState.assessment.designation && (
                <Label
                  to={`/nanodegree/${subject_slug}/professions/${assessmentState.assessment.designation_pk}/`}
                >
                  {assessmentState.assessment.designation}
                </Label>
              )}
              {assessmentState.assessment.skill && (
                <>
                  <Dot></Dot>
                  <Label
                    to={`/nanodegree/${subject_slug}/lessons/${assessmentState.assessment.skill_pk}/`}
                  >
                    {assessmentState.assessment.skill}
                  </Label>
                </>
              )}
            </ContentBottom>
          </FullContainer>
        </Content>
        {window.location.pathname === `/assessments/view/${id}/` ? null : (
          <MainContainer>
            <div div className="right">
              {/* <Tag>Improvement</Tag> */}
              {/* <Time className="time">00:00:00</Time> */}
              {/* <Malayalam english={english}>Malayalam</Malayalam>
              <ToggleButton setEnglish={setEnglish} />
              <English english={english}>English</English> */}
              {/* <a href="/profile/setting/">change language</a> */}
            </div>
          </MainContainer>
        )}
      </TopContainer>
      <BottomContainer>
        <NavBar>
          <LinkItem
            activeClassName="selected"
            exact
            to={`/nanodegree/${subject_slug}/assessments/view/${id}/`}
          >
            Dashboard
          </LinkItem>
          {(assessmentState.assessment.status === "completed" ||
            assessmentState.assessment.status === "evaluating") && (
            <LinkItem
              activeClassName="selected"
              to={`/nanodegree/${subject_slug}/assessments/view/${id}/questions/`}
            >
              Questions
            </LinkItem>
          )}
          {assessmentState.assessment.status === "completed" &&
            assessmentState.assessment.is_revaluation_available && (
              <LinkItem
                activeClassName="selected"
                exact
                to={`/nanodegree/${subject_slug}/assessments/view/${id}/revaluation/`}
              >
                Revaluation
              </LinkItem>
            )}
          {assessmentState.assessment.status === "completed" &&
            assessmentState.assessment.is_improvement_available && (
              <LinkItem
                activeClassName="selected"
                exact
                to={`/nanodegree/${subject_slug}/assessments/view/${id}/improvement/`}
              >
                Improvement
              </LinkItem>
            )}
        </NavBar>
      </BottomContainer>
    </HeaderContainer>
  );
}
const HeaderContainer = styled.div`
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media all and (max-width: 768px) {
    padding-bottom: 20px;
  }
`;
const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 45px;
  @media all and (max-width: 768px) {
    margin-bottom: 20px;
  }
  .right {
    display: flex;
  }
`;
const ImageContainer = styled.div`
  width: 52px;
  margin-right: 18px;
  @media all and (max-width: 640px) {
    display: none;
  }
  /* @media all and (max-width: 1100px) {
        width: 8%;
    }
    @media all and (max-width: 980px) {
        width: 10%;
    }
    @media all and (max-width: 768px) {
        width: 11%;
    }
    @media all and (max-width: 640px) {
        display: none;
    } */
`;
const Image = styled.img`
  width: 100%;
  display: block;
  @media all and (max-width: 640px) {
    display: none;
  }
`;
const TitleImage = styled.div`
  @media all and (max-width: 1980px) {
    display: none;
  }
  @media all and (max-width: 640px) {
    display: block;
    width: 15%;
    margin-right: 25px;
  }
  @media all and (max-width: 360px) {
    width: 16%;
    display: none;
  }
`;
const Picture = styled.img`
  @media all and (max-width: 1980px) {
    display: none;
  }
  @media all and (max-width: 640px) {
    display: block;
    width: 100%;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
`;
const ContentTop = styled.div`
  @media all and (max-width: 640px) {
    /* display: flex; */
    margin-bottom: 20px;
    align-items: center;
  }
`;
const Title = styled.h1`
  font-family: gordita_medium;
  font-size: 20px;
  @media all and (max-width: 360px) {
    font-size: 23px;
  }
`;
const ContentBottom = styled.div`
  display: flex;
  align-items: center;
  @media all and (max-width: 480px) {
    overflow-x: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Label = styled(Link)`
  display: block;
  padding: 5px 15px 3px;
  border-radius: 25px;
  font-family: gordita_regular;
  min-width: fit-content;
  font-size: 12px;
  border: 1px solid #4285f4;
  color: #4285f4;
`;
const Dot = styled.small`
  background-color: #c2c2c2;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin: 0 10px;
`;
const BottomContainer = styled.div`
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;
const NavBar = styled.div`
  display: flex;
  border-bottom: 2px solid #e1eaf1;
`;
const LinkItem = styled(NavLink)`
  font-family: gordita_regular;
  font-size: 18px;
  margin-right: 55px;
  padding-bottom: 7px;
  color: #c2c2c2;
  transform: translateY(2px);
  border-bottom: 2px solid #e1eaf1;

  &:hover {
    border-bottom: 2px solid #4dc56b;
    color: #4dc56b;
  }
  &.selected {
    border-bottom: 2px solid #4dc56b;
    color: #4dc56b;
  }
  @media all and (max-width: 1280px) {
    padding-bottom: 0px;
  }
  @media all and (max-width: 768px) {
    font-size: 16px;
    margin-right: 30px;
  }
  @media all and (max-width: 360px) {
    font-size: 14px;
    margin-right: 20px;
  }
`;
const Malayalam = styled.span`
  font-size: 16px;
  margin-right: 10px;

  color: ${({ english }) => !english && "#4fbe79"};
`;
const English = styled.span`
  font-size: 16px;
  margin-left: 10px;
  color: ${({ english }) => english && "#4fbe79"};
`;
const MainContainer = styled.div``;
const FullContainer = styled.div``;

export default Header;
