import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";
import { serverConfig } from "../../../axiosConfig";
import SearchComponent from "../components/SearchComponent";
import UserFollowComponent from "../components/UserFollowComponent";
import UserFollowSkeletonLoader from "../../general/skeltons/UserFollowSkeletonLoader";
import useUserStore from "../../../store/userStore";

const ENDPOINTS = {
  following: "api/v1/users/list-following/",
  followers: "api/v1/users/list-followers/",
};

const useUserList = (activeTab, access_token, username) => {
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchUsersRef = useRef();

  const fetchUsers = useCallback(
    async (loadMore = false) => {
      setLoading(true);
      try {
        const response = await serverConfig.get(ENDPOINTS[activeTab], {
          params: {
            page: loadMore ? page + 1 : 1,
            type: "data",
            q: searchTerm,
            username: username,
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const { status_code, data, pagination_data } = response.data;

        if (status_code === 6000) {
          setUserDetails((prevUsers) =>
            loadMore ? [...prevUsers, ...data] : data
          );
          setPagination(pagination_data);
          setPage((prev) => (loadMore ? prev + 1 : 1));
        } else {
          setUserDetails([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    },
    [activeTab, access_token, page, searchTerm, username]
  );

  fetchUsersRef.current = fetchUsers;

  useEffect(() => {
    setPage(1); // Reset page number on tab change or search term change
    fetchUsersRef.current();
  }, [activeTab, username, searchTerm]);

  return { userDetails, isLoading, pagination, fetchUsers, setSearchTerm };
};

const ListProfileModal = React.memo(
  ({
    isModal,
    setModal,
    username,
    setFollowCount,
    setActiveTab,
    activeTab,
  }) => {
    const { loginData } = useUserStore();
    const listSectionRef = useRef(null);

    const { userDetails, isLoading, pagination, fetchUsers, setSearchTerm } =
      useUserList(activeTab, loginData?.accessToken, username);

    const debouncedSearch = useMemo(
      () =>
        debounce((term) => {
          setSearchTerm(term);
        }, 300),
      [setSearchTerm]
    );

    const handleTabChange = useCallback((tab) => {
      setActiveTab(tab);
      setSearchTerm(""); // Clear search term on tab change
    }, []);

    const handleScroll = useCallback(() => {
      if (listSectionRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          listSectionRef.current;
        if (
          scrollTop + clientHeight >= scrollHeight - 5 &&
          !isLoading &&
          pagination?.has_next_page
        ) {
          fetchUsers(true);
        }
      }
    }, [fetchUsers, isLoading, pagination]);

    useEffect(() => {
      const listSection = listSectionRef.current;
      if (listSection) {
        listSection.addEventListener("scroll", handleScroll);
        return () => listSection.removeEventListener("scroll", handleScroll);
      }
    }, [handleScroll]);

    return (
      <>
        <Backdrop isVisible={isModal} />
        <Container isVisible={isModal}>
          <Overlay>
            <InnerContainer>
              <CloseButton onClick={() => setModal(false)}>
                <img
                  src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/cross-icon.svg"
                  alt="close"
                />
              </CloseButton>
              <ContentSection>
                <TopSection>
                  <Heading>
                    {activeTab === "following" ? "Following" : "Followers"}
                  </Heading>
                </TopSection>
                <MenuBar>
                  <MenuItem
                    active={activeTab === "followers"}
                    onClick={() => handleTabChange("followers")}
                  >
                    Followers
                  </MenuItem>
                  <MenuItem
                    active={activeTab === "following"}
                    onClick={() => handleTabChange("following")}
                  >
                    Following
                  </MenuItem>
                </MenuBar>
                <SearchContainer>
                  <SearchComponent onSearch={debouncedSearch} />
                </SearchContainer>
                <ListSection ref={listSectionRef}>
                  {isLoading && userDetails.length === 0 ? (
                    Array(5)
                      .fill()
                      .map((_, index) => (
                        <UserFollowSkeletonLoader key={index} />
                      ))
                  ) : userDetails.length > 0 ? (
                    <ListContainer>
                      {userDetails.map((item) => (
                        <UserFollowComponent
                          key={item?.id}
                          item={item}
                          setModal={setModal}
                          setFollowCount={setFollowCount}
                        />
                      ))}
                      {isLoading && <UserFollowSkeletonLoader />}
                    </ListContainer>
                  ) : (
                    <EmptyContainer>
                      <EmptyImage>
                        <img
                          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/18-07-2024/follow-empty.svg"
                          alt="Empty"
                        />
                      </EmptyImage>
                      <EmptyContent>
                        {activeTab === "following"
                          ? "No following yet."
                          : "No followers yet."}
                      </EmptyContent>
                    </EmptyContainer>
                  )}
                </ListSection>
              </ContentSection>
            </InnerContainer>
          </Overlay>
        </Container>
      </>
    );
  }
);

export default ListProfileModal;

const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s, visibility 0.3s;
  background: rgba(13, 18, 28, 0.6);
`;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s, visibility 0.3s;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0px;
  width: 100%;
  height: 100vh;
`;

const InnerContainer = styled.div`
  width: 35vw;
  height: 65vh;
  margin: 0 auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  border-radius: 10px;
  transition: 0.5s;
  z-index: 101;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: 3841px) {
    width: 1344px;
    height: 2160px;
  }

  @media (max-width: 1920px) {
    width: 40vw;
  }

  @media (max-width: 1440px) {
    width: 45vw;
  }

  @media (max-width: 1024px) {
    width: 50vw;
  }

  @media (max-width: 980px) {
    width: 700px;
  }

  @media (max-width: 768px) {
    width: 70vw;
    height: 70vh;
  }

  @media (max-width: 480px) {
    width: 90vw;
    height: 80vh;
  }

  @media (max-width: 320px) {
    width: 95vw;
    height: 85vh;
  }
`;

const ContentSection = styled.div`
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CloseButton = styled.div`
  height: 20px;
  width: 20px;
  cursor: pointer;
  position: absolute;
  right: 22px;
  top: 20px;

  img {
    display: block;
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
    right: 18px;
    top: 18px;
  }

  @media (max-width: 480px) {
    width: 15px;
    height: 15px;
    right: 15px;
    top: 15px;
  }

  @media (max-width: 320px) {
    width: 12px;
    height: 12px;
    right: 12px;
    top: 12px;
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e3e8ef;
`;

const Heading = styled.h2`
  color: #101828;
  font-size: 20px;
  padding: 16px 8px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }

  @media (max-width: 320px) {
    font-size: 14px;
  }
`;

const MenuBar = styled.div`
  display: flex;
  border-bottom: 1px solid #e3e8ef;
`;

const MenuItem = styled.div`
  width: 50%;
  padding: 16px 8px;
  text-align: center;
  cursor: pointer;
  color: ${(props) => (props.active ? "#101828" : "#667085")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  border-bottom: 2px solid
    ${(props) => (props.active ? "#059664" : "transparent")};

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 12px 4px;
  }

  @media (max-width: 320px) {
    font-size: 12px;
    padding: 10px 2px;
  }
`;

const ListSection = styled.div`
  padding: 32px;
  overflow-y: auto;
  height: calc(100% - 180px);

  @media (max-width: 768px) {
    padding: 24px;
    height: calc(100% - 160px);
  }

  @media (max-width: 480px) {
    padding: 16px;
    height: calc(100% - 140px);
  }

  @media (max-width: 320px) {
    padding: 12px;
    height: calc(100% - 120px);
  }
`;

const ListContainer = styled.div``;

const SearchContainer = styled.div`
  padding: 32px 32px 0 32px;

  @media (max-width: 768px) {
    padding: 24px 24px 0 24px;
  }

  @media (max-width: 480px) {
    padding: 16px 16px 0 16px;
  }

  @media (max-width: 320px) {
    padding: 12px 12px 0 12px;
  }
`;

const EmptyImage = styled.div`
  margin: 0 auto 12px;
  width: 50%;

  img {
    display: block;
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;

  @media (max-width: 768px) {
    height: 25vh;
  }

  @media (max-width: 480px) {
    height: 20vh;
  }
`;

const EmptyContent = styled.p`
  font-size: 16px;
  color: #101828;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
