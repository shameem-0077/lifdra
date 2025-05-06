import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import Jdenticon from "react-jdenticon";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SearchModal({
  setShowModal,
  showModal,
  setGlobalSearch,
  historyStack,
  globalSearch,
  id,
  searchData,
  isLoading,
  setHistoryStack,
  addHistorytoStack,
  isError,
  searchPostData,
}) {
  const modalRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const itemRefs = useRef([]);
  const [skeletonsToLoad] = useState(Array(2).fill(null));
  const closeOnOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === "Escape") {
  //     setShowModal(false);
  //   } else if (e.key === "ArrowDown") {
  //     e.preventDefault();
  //     setSelectedIndex((prevIndex) =>
  //       prevIndex < historyStack.length + searchData.length - 1
  //         ? prevIndex + 1
  //         : prevIndex
  //     );
  //   } else if (e.key === "ArrowUp") {
  //     // e.preventDefault();
  //     setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  //   } else if (e.key === "Enter" && selectedIndex >= 0) {
  //     const selectedItem = itemRefs.current[selectedIndex];
  //     console.log(selectedItem);
  //     if (selectedItem) {
  //       // const selectedValue = selectedItem.textContent || selectedItem.value;
  //       // setGlobalSearch(selectedValue)
  //       selectedItem.click();
  //     }
  //   }
  // };

  const handleRouteChange = (data) => {
    addHistorytoStack(data);
    setShowModal(false);
  };

  const handleClearHistory = () => {
    localStorage.clear("searchHistory");
    setHistoryStack([]);
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", closeOnOutsideClick);
      // document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      // document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal, globalSearch]);

  useEffect(() => {
    if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex].scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  if (!showModal) {
    return null;
  }

  return (
    <>
      <MainContainer id={id} ref={modalRef}>
        {globalSearch.length > 1 ? (
          <SuggestionContainer>
            {isLoading ? (
              skeletonsToLoad.map((_, i) => (
                <Skeleton key={`skeleton-${i}`} width="100%" height={24} />
              ))
            ) : isError ? (
              <NoDataFound>
                <img
                  src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-11-2024/empty-search-icon.svg"
                  alt="Search-icon"
                />
                <h5>Hmm, looks like we couldn't find any results.</h5>
              </NoDataFound>
            ) : searchData ? (
              searchData?.map((user, index) => {
                return (
                  <ItemContainer
                    key={user?.user_id}
                    ref={(el) => (itemRefs.current[index] = el)}
                    style={{
                      backgroundColor:
                        selectedIndex === index ? "#f0f0f0" : "transparent",
                    }}
                  >
                    {/* <Img
                      src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/search-icon.svg"
                      alt="search-icon"
                    /> */}

                    <Suggestion
                      to={`/feed/profile/${user?.username}`}
                      onClick={() => handleRouteChange(user?.name)}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "6px",
                        }}
                      >
                        <Links>{user?.name}</Links>
                        <div>
                          <Dot />
                          <Key>{user?.designation}</Key>
                        </div>
                      </div>
                      <ImgContainer>
                        {user?.photo ? (
                          <ProfilePic src={user?.photo} alt="photo" />
                        ) : (
                          <Jdenticon value={user?.name} />
                        )}
                      </ImgContainer>
                    </Suggestion>
                  </ItemContainer>
                );
              })
            ) : (
              !isLoading &&
              searchData?.length === 0 && (
                <NoDataFound>
                  <img
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-11-2024/empty-search-icon.svg"
                    alt="Search-icon"
                  />
                  <h5>Hmm, looks like we couldn't find any results.</h5>
                </NoDataFound>
              )
            )}
          </SuggestionContainer>
        ) : (
          <HistoryContainer>
            {historyStack.length === 0 ? (
              <Heading>No recent search</Heading>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Heading>Recent Search</Heading>
                <HistoryClear onClick={handleClearHistory}>
                  Clear History
                </HistoryClear>
              </div>
            )}

            {historyStack.map((item, i) => (
              <ItemContainer
                to={`/search/all?q=${item}`}
                onClick={() => handleRouteChange(item)}
                key={i}
                ref={(el) => (itemRefs.current[searchData?.length + i] = el)} // Offset for history items
                style={{
                  backgroundColor:
                    selectedIndex === searchData?.length + i
                      ? "#f0f0f0"
                      : "transparent",
                }}
              >
                <Img
                  src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/search-icon.svg"
                  alt="search-icon"
                />

                <Links>{item}</Links>
              </ItemContainer>
            ))}
          </HistoryContainer>
        )}

        {searchData?.length !== 0 && (
          <Viall
            to={`/search/all?q=${globalSearch}`}
            onClick={()=>handleRouteChange(globalSearch)}
            search={globalSearch}
          >
            <span>View all "{globalSearch}" results</span>
          </Viall>
        )}
      </MainContainer>
      <BlurBackground />
    </>
  );
}

export default SearchModal;

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

const HistoryClear = styled.button`
  padding-right: 7px;
  width: fit-content;
  font-family: "gordita_regular";
  font-size: ${pxToRem(14)};
  color: #047853;
  cursor: pointer;
`;

const BlurBackground = styled.div`
  position: fixed;
  top: 84px;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(1px); /* Adjust blur amount */
  z-index: 5;
`;

const Heading = styled.h5`
  font-family: "gordita_medium";
  color: #121926;
  font-size: ${pxToRem(14)};
  /* padding: 8px 0; */
`;

const ItemContainer = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0 8px;
  border-radius: 8px;
`;

const Img = styled.img`
  display: block;
  width: 20px;
  height: 20px;
`;

const Key = styled.span`
  font-family: "gordita_regular";
  color: #697586;
  font-size: ${pxToRem(14)};
`;

const ImgContainer = styled.div`
  background-color: white;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`;

const ProfilePic = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SuggestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Suggestion = styled(Link)`
  display: flex;
  width: 100%;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
`;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #697586;
`;

const Links = styled.span`
  font-family: "gordita_medium";
  color: #121926;
  font-size: ${pxToRem(14)};
  /* padding: 8px 0; */
`;

const MainContainer = styled.div`
  min-width: 381px;
  /* width: 381px; */
  /* max-height: 400px;
  overflow-y: auto; */
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 998;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 1060px) {
    min-width: auto;
    right: 0;
  }
  @media (max-width: 768px) {
    top: 47px;
  }
`;

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Viall = styled(Link)`
  ${({ search }) => css`
    display: ${search.length > 1 ? "block" : "none"};
  `}
  width: 100%;

  span {
    width: 100%;
    color: #059664;
    display: flex;
    font-size: 1rem;
  }
`;
