import React from "react";
import styled from "styled-components";
import SearchPostCard from "./SearchPostCard";

const AllPostResults = ({
  searchQuery,
  posts_data,
  isLoading,
  isDelete,
  setDelete,
  setSelectedId,
  setFollowCount,
  setReport,
  isReport,
  isOptions,
  setOptions,
  setCmDel,
  isCmtDel,
  deletionUpdate,
  setDeletionUpdate,
  toast
}) => {
  console.log(posts_data);

  return (
    <>
      <MainContainer>
        <Result>“{searchQuery}” Posts results</Result>

        {posts_data.length > 0 ? (
          posts_data.map((item) => {
            return (
              <SearchPostCard
                key={item.id}
                item={item}
                isLoading={isLoading}
                isDelete={isDelete}
                setDelete={setDelete}
                setSelectedId={setSelectedId}
                setOptions={setOptions}
                isOptions={isOptions}
                setReport={setReport}
                isReport={isReport}
                setCmDel={setCmDel}
                isCmtDel={isCmtDel}
                deletionUpdate={deletionUpdate}
                setDeletionUpdate={setDeletionUpdate}
                toast={toast}
              />
            );
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

export default AllPostResults;

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
