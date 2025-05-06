import React, { useState } from "react";
import SearchProfileCard from "./SearchProfileCard";
import styled from "styled-components";
import { greenButtonNarrowRight } from "../../../assets/icons/styep 3.0/icons";
import { NavLink } from "react-router-dom";


const PeopleResults = ({ searchQuery, users_data}) => {
    
  return (
    <>
      <MainContainer>
        <Result>“{searchQuery}” People results</Result>
        {users_data.length > 0 ? (
          users_data.map((item) => {
            return <SearchProfileCard key={item.pk} item={item} />;
          })
        ) : (
          <NoDataFound>
            <img
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-11-2024/empty-search-icon.svg"
              alt="Search-icon"
            />
            <h5>
              Hmm, looks like we couldn't find any results. Wanna try a
              different keyword or phrase?
            </h5>
          </NoDataFound>
        )}
        {users_data.length > 4 && (
          <ButtonContainer>
            <StyledNavLink to={`/search/people?q=${searchQuery}`}>
              View all People
              <img src={greenButtonNarrowRight} alt="arrow-right" />
            </StyledNavLink>
          </ButtonContainer>
        )}
      </MainContainer>
    </>
  );
};

export default PeopleResults;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const NoDataFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
  background-color: #F8FAFC;
  border-radius: 8px;
  padding: 20px;

  h5 {
    font-family: "gordita_medium";
    font-size: ${pxToRem(14)};
    color: #475467;
    text-align: center;
  }
`;


const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background-color: #f8fafc;
  border: 1px solid #eef2f6;
  border-radius: 12px;
`;

const Result = styled.h4`
  font-family: "gordita_medium";
  color: #202939;
  font-size: ${pxToRem(18)};
`;
const ButtonContainer = styled.div`
  padding-top: 16px;
  border-top: 1px solid #eef2f6;
`;

const StyledNavLink = styled(NavLink)`
  font-family: "gordita_medium";
  color: #0fa76f;
  font-size: ${pxToRem(14)};
  display: flex;
  align-items: center;
  gap: 6px;
`;
