import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import SearchModal from "../modals/SearchModal";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { serverConfig } from "../../../axiosConfig";
import useUserStore from "../../../store/userStore";

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
  const { loginData } = useUserStore();
  const { accessToken } = loginData;
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchPostData, setSearchPostData] = useState([]);
  const [showResults, setShowResults] = useState(false);

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

  const fetchSearchData = async () => {
    setLoading(true);
    setError(false);

    try {
      const { data } = await serverConfig.get(
        `/general/global-search/?q=${globalSearch}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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

  const handleSearch = (e) => {
    setGlobalSearch(e.target.value);
    setShowResults(true);
  };

  const handleResultClick = (result) => {
    setShowResults(false);
    setGlobalSearch("");
    navigate(`/learn/course/${result.slug}/`);
  };

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
          onChange={handleSearch}
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
      {showResults && searchData.length > 0 && (
        <ResultsContainer>
          {searchData.map((result, index) => (
            <ResultItem
              key={index}
              onClick={() => handleResultClick(result)}
            >
              <ResultImage src={result.thumbnail} alt="" />
              <ResultContent>
                <ResultTitle>{result.title}</ResultTitle>
                <ResultDescription>
                  {result.description}
                </ResultDescription>
              </ResultContent>
            </ResultItem>
          ))}
        </ResultsContainer>
      )}
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

const ResultsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 8px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
`;

const ResultItem = styled.div`
  display: flex;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ResultImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
  margin-right: 12px;
`;

const ResultContent = styled.div`
  flex: 1;
`;

const ResultTitle = styled.h4`
  margin: 0 0 4px;
  font-size: 14px;
  color: #333;
`;

const ResultDescription = styled.p`
  margin: 0;
  font-size: 12px;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
