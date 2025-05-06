import React from "react";
import styled from "styled-components";
import SearchProfileCard from "./SearchProfileCard";

const AllPeopleResults = ({ searchQuery, users_data }) => {
  return (
    <>
      <MainContainer>
        <Result>“{searchQuery}” People results</Result>
        {users_data.length > 0 ? (
          users_data.map((item) => {
            return <SearchProfileCard key={item.id} item={item} />;
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
      </MainContainer>
    </>
  );
};

export default AllPeopleResults;

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
