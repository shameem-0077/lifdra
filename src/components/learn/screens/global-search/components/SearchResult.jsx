import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import AllResults from "./AllResults";
import { Switch } from "react-router-dom";
import AllPeopleResults from "./AllPeopleResults";
import AllPostResults from "./AllPostResults";

const SearchResult = ({
  searchQuery,
  users_data,
  posts_data,
  isLoading,
  isDelete,
  setDelete,
  setSelectedId,
  setReport,
  isReport,
  isOptions,
  setOptions,
  setCmDel,
  isCmtDel,
  deletionUpdate,
  setDeletionUpdate,
  toast,
}) => {
  const [height, setHeight] = useState(window?.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window?.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <MainContainer height={height}>
        <Switch>
          <Route path="/search/all">
            <AllResults
              users_data={users_data}
              posts_data={posts_data}
              searchQuery={searchQuery}
              isLoading={isLoading}
            />
          </Route>
          <Route path="/search/people">
            <AllPeopleResults
              users_data={users_data}
              posts_data={posts_data}
              searchQuery={searchQuery}
              isLoading={isLoading}
            />
          </Route>
          <Route path="/search/post">
            <AllPostResults
              users_data={users_data}
              posts_data={posts_data}
              searchQuery={searchQuery}
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
          </Route>
        </Switch>
      </MainContainer>
    </>
  );
};

export default SearchResult;

const MainContainer = styled.div`
  height: ${({ height }) => `${height - 104}px`};
  /* background-color: #bffdbf; */
  max-width: 696px;
  width: 100%;
  overflow-y: scroll;
  padding-bottom:48px;
  @media (max-width: 1023px) {
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
    height: ${({ height }) => `${height - 268}px`};
    padding-bottom:24px;


  }
  @media (max-width: 768px) {
    max-width: 100%;
    height: ${({ height }) => `${height - 238}px`};
    padding-bottom:24px;


  }
`;
