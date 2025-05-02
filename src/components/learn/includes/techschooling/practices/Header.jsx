import React, { useContext } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { PracticeContext } from "../../../../contexts/stores/PracticeStore";
import { useSelector } from "react-redux";

const Header = ({ subject_slug }) => {
  const { practiceState } = useContext(PracticeContext);
  const { practice } = practiceState;
  const { user_profile } = useSelector((state) => state);
  return (
    <HeaderContainer>
      <SectionTop>
        <ImageContainer>
          <Image src={practice.image} />
        </ImageContainer>
        <ContentContainer>
          <TopContainer>
            <TopImage>
              <Image src={practice.image} />
            </TopImage>
            <ContentTop>{practice.title}</ContentTop>
          </TopContainer>
          <ContentBottom>
            {practice.designation && (
              <Label
                to={`/nanodegree/${subject_slug}/professions/${practice.designation_pk}/`}
              >
                {practice.designation}
              </Label>
            )}
            {practice.skill && (
              <>
                <Dot></Dot>
                <Label
                  to={`/nanodegree/${subject_slug}/lessons/${practice.skill_pk}/`}
                >
                  {practice.skill}
                </Label>
              </>
            )}
          </ContentBottom>
        </ContentContainer>
      </SectionTop>
      <SectionBottom>
        <HeaderButton
          activeClassName="selected"
          exact
          to={`/nanodegree/${subject_slug}/practices/view/${practice.id}/`}
        >
          Dashboard
        </HeaderButton>
        {practice.status !== "pending" &&
          practice.status !== "evaluating" &&
          practice.is_improvement_available && (
            <HeaderButton
              activeClassName="selected"
              exact
              to={`/nanodegree/${subject_slug}/practices/view/${practice.id}/improvement/`}
            >
              Improvement
            </HeaderButton>
          )}
        {practice.status !== "pending" &&
          practice.status !== "evaluating" &&
          practice.is_revaluation_available && (
            <HeaderButton
              activeClassName="selected"
              exact
              to={`/nanodegree/${subject_slug}/practices/view/${practice.id}/revaluation/`}
            >
              Revaluation
            </HeaderButton>
          )}
      </SectionBottom>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  @media all and (max-width: 640px) {
    margin-top: 0px;
  }
`;
const SectionTop = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const ImageContainer = styled.div`
  width: 100px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 20px;
  align-self: center;
  @media all and (max-width: 480px) {
    display: none;
  }
`;
const Image = styled.img`
  width: 100%;
  display: block;
`;
const ContentContainer = styled.div``;
const ContentTop = styled.h1`
  font-size: 22px;
  margin-bottom: 5px;
  font-family: "gordita_regular";
  font-weight: 600;
  color: #4d4d4d;
  @media all and (max-width: 640px) {
    font-size: 20px;
  }
`;
const TopContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media all and (max-width: 640px) {
    margin-bottom: 0px;
  }
`;
const TopImage = styled.div`
  width: 50px;
  margin-right: 15px;
  display: none;
`;
const ContentBottom = styled.div``;
const Label = styled(Link)`
  display: inline-block;
  /* padding: 5px 15px 3px; */
  /* border: 1px solid #4285f4; */
  color: #7b7b7b;
  font-size: 16px;
  /* border-radius: 30px; */
  /* margin-right: 8px; */
  font-family: gordita_regular;
  @media all and (max-width: 640px) {
    /* font-size: 16px;
        padding: 2px 10px; */
  }
  /* @media all and (max-width: 480px) {
        font-size: 14px;
        padding: 2px 7px;
        border-radius: 15px;
    } */
`;
const Dot = styled.small`
  display: inline-block;
  padding: 3px;
  color: #7b7b7b;
  background-color: #fff;
  /* margin-right: 8px; */
  font-size: 16px;
`;

const SectionBottom = styled.div`
  margin-top: 15px;
  border-bottom: 2px solid #e1eaf1;
`;
const HeaderButton = styled(NavLink)`
  display: inline-block;
  font-size: 16px;
  font-family: gordita_medium;
  margin-right: 50px;
  padding-bottom: 2px;
  color: #a8a8a8;
  transition: 0.2s;
  transform: translateY(2px);
  &:hover {
    color: #4dc56b;
    border-bottom: 2px solid #4dc56b;
  }
  &.selected {
    border-bottom: 2px solid #4dc56b;
    color: #4dc56b;
  }
  @media all and (max-width: 640px) {
    font-size: 16px;
    margin-right: 30px;
    padding-bottom: 0;
  }
  @media all and (max-width: 480px) {
    font-size: 14px;
    margin-right: 20px;
  }
  @media all and (max-width: 360px) {
    font-size: 13px;
    margin-right: 10px;
  }
`;
