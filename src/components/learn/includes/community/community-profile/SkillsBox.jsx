import React from "react";
import styled from "styled-components";

function SkillsBox({ userProfileDetails }) {
  return (
    <>
      {userProfileDetails?.programming_languages?.length > 0 ||
      userProfileDetails?.technology_skills?.length > 0 ? (
        <Skills>
          <div>
            {userProfileDetails?.technology_skills?.length > 0 && (
              <>
                <Heading className="skills">Skills</Heading>
                <SkillsCategory>
                  {userProfileDetails?.technology_skills?.map((item, index) => (
                    <SkillsList key={index}>{item?.name}</SkillsList>
                  ))}
                </SkillsCategory>
              </>
            )}
            {userProfileDetails?.programming_languages?.length > 0 && (
              <>
                <Heading className="skills">Coding languages</Heading>
                <Languages>
                  {userProfileDetails?.programming_languages?.map(
                    (item, index) => (
                      <LanguageList key={index}>{item?.name}</LanguageList>
                    )
                  )}
                </Languages>
              </>
            )}
          </div>
        </Skills>
      ) : (
        ""
      )}
    </>
  );
}

export default SkillsBox;

const Skills = styled.div`
  background: #f9f9fb;
  padding: 24px;
  border-radius: 8px;
  /* margin-bottom: 32px; */

  display: flex;
  justify-content: space-between;

  overflow-wrap: break-word;
  word-break: break-all;
`;
const SkillText = styled.h5`
  font-size: 16px;
  font-family: "gordita_medium";
  margin-bottom: 8px;
`;
const SkillsCategory = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;
const SkillsList = styled.li`
  margin: 0 7px 7px 0;
  font-size: 15px;
  border: 2px solid #CDD5DF;
  padding: 4px 13px 4px 13px;
  border-radius: 16px;
  color: #202939;
  font-family: "gordita_medium";
  padding-top: 6px;
  &:last-child {
    margin-right: 0;
  }
  @media (max-width: 640px) {
    font-size: 13px;
  }
  @media (max-width: 360px) {
    font-size: 12px;
  }

  /* @media (max-width: 420px) {
        font-size: 10px;
        padding: 5px;
        margin-bottom: 10px;
    } */
`;
const Languages = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const LanguageList = styled.li`
  margin: 0 7px 7px 0;
  font-size: 14px;
  border: 2px solid #3437ca;
  padding: 6px 13px 4px 13px;
  border-radius: 16px;
  color: #3437ca;
  font-family: "gordita_medium";
  &:last-child {
    margin-right: 0;
  }
  @media (max-width: 640px) {
    font-size: 13px;
  }
  @media (max-width: 360px) {
    font-size: 12px;
  }
`;
const Heading = styled.h4`
  font-size: 18px;
  font-family: "gordita_medium";
  color: #2d2d2d;
  @media (max-width: 640px) {
    font-size: 15px;
  }

  &.skills {
    margin-bottom: 10px;
    @media (max-width: 360px) {
      font-size: 13px;
    }
  }
  &.add-details {
    margin-bottom: 30px;
  }
`;
