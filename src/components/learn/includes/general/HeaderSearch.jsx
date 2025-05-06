import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import SearchModal from "./modals/SearchModal";
import { useNavigate, useLocation } from "react-router-dom";
import { serverConfig } from "../../../../axiosConfig";
import { useSelector } from "react-redux";

const HeaderSearch = ({
  setGlobalSearch,
  globalSearch,
  setSearchModal,
  isSearchModal,
  historyStack,
  setHistoryStack,
  id,
  inputRef,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user_data = useSelector((state) => state.user_data);
  const { access_token } = user_data;
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchPostData, setSearchPostData] = useState([]);

  const addHistorytoStack = (searchWord) => {
    const trimmedSearchWord = searchWord.trim();
    if (!trimmedSearchWord) return;

    const filteredHistoryStack = historyStack.filter(
      (word) => word.toLowerCase() !== trimmedSearchWord.toLowerCase()
    );

    const updatedHistoryStack = [trimmedSearchWord, ...filteredHistoryStack];

    if (historyStack.length > 4) {
      updatedHistoryStack.pop();
    }
    setHistoryStack(updatedHistoryStack);

    localStorage.setItem("searchHistory", JSON.stringify(updatedHistoryStack));
  };

  const handleSearchClick = () => {
    addHistorytoStack(globalSearch);
    navigate(`/search/all?q=${globalSearch}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchModal(false);
      handleSearchClick();
    }
  };

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setHistoryStack(JSON.parse(storedHistory));
    }
  }, []);

  const fetchSearchData = async () => {
    setLoading(true);
    setError(false);

    try {
      const { data } = await accountsConfig.get(
        `/general/global-search/?q=${globalSearch}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      let { data: datas, status_code } = data;

      if (status_code === 6000) {
        setSearchData(datas);
        setLoading(false);
      } else {
        setSearchData([]);
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
      setLoading(false);
      setError(true);
    }
  };

  // useEffect(() => {
  //   setGlobalSearch("");
  // }, [location.pathname]);

  useEffect(() => {
    if (globalSearch?.length > 1) {
      const debounceTimeout = setTimeout(() => {
        fetchSearchData();
      }, 400);

      return () => clearTimeout(debounceTimeout);
    } else {
      setSearchData([]);
    }
  }, [globalSearch]);

  return (
    <>
      <SearchContainer id={id}>
        <SearchLabel htmlFor="search-input">
          <SearchIcon
            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/search-icon.svg"
            alt="Icon"
          />
        </SearchLabel>

        <SearchInput
          ref={inputRef}
          type="text"
          placeholder="Search "
          value={globalSearch}
          maxLength="128"
          onChange={(e) => {
            setSearchModal(true);
            setGlobalSearch(e.target.value);
          }}
          onFocus={(e) => {
            e.preventDefault();
            if (historyStack.length > 0 || globalSearch.length > 0) {
              setSearchModal(true);
            }
          }}
          onKeyDown={handleKeyDown}
        />
        <SearchModal
          setGlobalSearch={setGlobalSearch}
          setShowModal={setSearchModal}
          showModal={isSearchModal}
          historyStack={historyStack}
          globalSearch={globalSearch}
          id={id}
          searchData={searchData}
          searchPostData={searchPostData}
          isLoading={isLoading}
          setHistoryStack={setHistoryStack}
          isError={isError}
          addHistorytoStack={addHistorytoStack}
        />

        {globalSearch.length > 1 && (
          <SearchButton onClick={handleSearchClick}>
            <img
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/03-09-2024/right-black-arrow.svg"
              alt="button-icon"
            />
          </SearchButton>
        )}
      </SearchContainer>
    </>
  );
};

export default HeaderSearch;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 298px;
  max-height: 40px;
  gap: 8px;
  padding: 10px;
  /* border: 1px solid #9aa4b2; */
  border: 2px solid #e3e8ef;
  border-radius: 12px;

  @media (max-width: 1246px) {
    min-width: 250px;
    ${({ id }) =>
      id === "smallScreen" &&
      css`
        position: absolute;
        right: 60px;
        @media (max-width: 1060px) {
          left: 60%;
        }
        @media (max-width: 900px) {
          left: 50%;
        }
        @media (max-width: 648px) {
          left: 170px;
        }
        @media (max-width: 499px) {
          left: 25px;
        }
        @media (max-width: 425px) {
          left: 16px;
        }
      `};
  }
`;

const SearchLabel = styled.label`
  width: 24px;
  height: 24px;
`;
const SearchIcon = styled.img`
  height: 24px;
  width: 24px;
  display: block;
  ${({ id }) => id === "iconOnly" && `cursor: pointer;`};
`;

const SearchInput = styled.input`
  font-family: "gordita_regular";
  font-size: 14px;
  flex-grow: 1;
  ::placeholder {
    color: #697586 !important;
    font-size: 1rem !important;
    line-height: 1.425rem !important;
    font-weight: 400 !important;
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
  background-color: #0fa76f;
  cursor: pointer;
  border-radius: 50%;
  img {
    display: block;
    filter: brightness(0) invert(1);
    ${({ id }) => id === "cross" && `height:14px; width:14px`};
  }
`;

const Closebutton = styled.button`
  cursor: pointer;
  width: 14px;
  height: 14px;
`;

const CloseIcon = styled.img`
  width: 100%;
  display: block;
`;
