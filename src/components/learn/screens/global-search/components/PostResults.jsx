import React from "react";
import styled from "styled-components";
import { greenButtonNarrowRight } from "../../../../../assets/icons/styep 3.0/icons";
import { NavLink } from "react-router-dom";
import SearchProfileCard from "./SearchProfileCard";
import SearchPostCard from "./SearchPostCard";

const PostResults = ({ searchQuery, posts_data }) => {
  
  
  return (
    <>
      <MainContainer>
        <Result>“{searchQuery}” Posts results</Result>

        {posts_data.length > 0 ? (
          posts_data.map((item) => {
            return <SearchPostCard key={item.id} item={item} />;
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

        {posts_data.length > 4 && (
          <ButtonContainer>
            <StyledNavLink to={`/search/post?q=${searchQuery}`}>
              View all Post
              <img src={greenButtonNarrowRight} alt="arrow-right" />
            </StyledNavLink>
          </ButtonContainer>
        )}
      </MainContainer>
    </>
  );
};

export default PostResults;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const NoDataFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 20px;

  img{
    width: 100%;
    height: 100%;
    display: block;
  }

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
