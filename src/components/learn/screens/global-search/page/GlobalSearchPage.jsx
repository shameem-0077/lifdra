import React, { useEffect, useState } from "react";
import ToggleMenu from "../components/ToggleMenu";
import styled from "styled-components";
import SearchResult from "../components/SearchResult";
import { useLocation } from "react-router-dom";
import TalropEdtechHelmet from "../../../../helpers/TalropEdtechHelmet";
import { useSelector } from "react-redux";
import { serverConfig } from "../../../../../axiosConfig";
import { toast } from "react-toastify";

const GlobalSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [isLoading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isDelete, setDelete] = useState(false);
  const [isCmtDel, setCmDel] = useState(false);
  const [isReport, setReport] = useState(false);
  const [isSelectedId, setSelectedId] = useState("");
  const [isOptions, setOptions] = useState(null);
  const [deletionUpdate, setDeletionUpdate] = useState(false);

  const user_data = useSelector((state) => state.user_data);
  const { access_token } = user_data;

  const menus = [
    { id: 1, linkName: "All", path: "/search/all" },
    { id: 2, linkName: "People", path: "/search/people" },
    { id: 3, linkName: "Post", path: "/search/post" },
  ];

  const fetchSearchData = async () => {
    if (!searchQuery?.trim()) {
      setUserData([]);
      return;
    }

    setLoading(true);
    try {
      const { data } = await serverConfig.get(
        `/general/global-search/?q=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      let { data: datas, status_code } = data;

      if (status_code !== 6000) {
        setUserData([]);

        setLoading(false);
      } else {
        setUserData(datas);

        setLoading(false);
      }
    } catch (error) {
      setUserData([]);
      console.error("Error fetching cards:", error);
    }
  };

  const fetchSearchPostData = async () => {
    if (!searchQuery?.trim()) {
      setPostData([]);
      return;
    }

    setLoading(true);
    try {
      const { data } = await serverConfig.get(
        `api/v1/posts/global-search?q=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      let { data: datas, status_code } = data;

      if (status_code !== 6000) {
        setPostData([]);
        setLoading(false);
      } else {
        setPostData(datas);
        setLoading(false);
      }
    } catch (error) {
      setPostData([]);

      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    if (!searchQuery?.trim()) {
      setUserData([]);
      setPostData([]);
      return;
    }
    fetchSearchData();
    fetchSearchPostData();
  }, [searchQuery]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    // const searchWord = queryParams.get("q");
    const searchWord = queryParams.get("q")?.trim() || "";
    setSearchQuery(searchWord);
  }, [location.search]);

  return (
    <>
      <div className="global-search-wrapper">
        <TalropEdtechHelmet title="Global Search" />

        <MainContainer>
          <ToggleMenu
            users_data={userData}
            posts_data={postData}
            menus={menus}
            searchQuery={searchQuery}
            isLoading={isLoading}
          />

          <SearchResult
            users_data={userData}
            posts_data={postData}
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
        </MainContainer>
      </div>
    </>
  );
};

export default GlobalSearchPage;

const MainContainer = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 1023px) {
    flex-direction: column;
  }
`;
