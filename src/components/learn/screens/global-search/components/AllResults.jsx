import React from "react";
import PeopleResults from "./PeopleResults";
import styled from "styled-components";
import PostResults from "./PostResults";

const AllResults = ({ searchQuery, users_data, posts_data, isLoading }) => {
  const noData =
  !isLoading && posts_data?.length === 0 && users_data?.length === 0;

  return (
    <>
      <MainContainer>
        {noData && (
          <>
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
          </>
        )}
        {Array.isArray(users_data) && users_data.length !== 0 && (
          <PeopleResults
            users_data={users_data}
            posts_data={posts_data}
            searchQuery={searchQuery}
          />
        )}
        {Array.isArray(posts_data) && posts_data.length !== 0 && (
          <PostResults
            users_data={users_data}
            posts_data={posts_data}
            searchQuery={searchQuery}
          />
        )}
      </MainContainer>
    </>
  );
};

export default AllResults;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NoDataFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 100px 20px;

  h5 {
    font-family: "gordita_medium";
    font-size: ${pxToRem(14)};
    color: #475467;
    text-align: center;
  }
`;
