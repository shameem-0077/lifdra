import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
// import Search from "../../../../../src/assets/images/search.png";
import { useLocation, Link, useHistory } from "react-router-dom";
import { learnConfig } from "../../../../axiosConfig";
import { useSelector, useDispatch } from "react-redux";
import RouteLoading from "../../../routing/RouteLoading";
import Loader from "../techschooling/general/loaders/Loader";
import SaveSkeleton from "../../screens/tech-updates/skeleton/SaveSkeleton";
import TopicSkeleton from "../../screens/tech-updates/skeleton/TopicSkeleton";

function SideBox() {
  //---------------- user Datas -----------------------//
  const { user_data, is_bookmarked } = useSelector((state) => state);
  const { access_token } = user_data;
  const dispatch = useDispatch();

  //---------------- filter  datas -----------------------//
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  //---------------------- topic length will be reduce --------------------//
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  //---------------- save api store Data -----------------------//'

  const [savedPost, setSavedPost] = useState([]);

  //---------------- Topic set Data states -------------- //
  const [selectedTopic, setSelectedTopic] = useState("");
  const [savedLoading, setSavedLoading] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [isTopicLoading, setTopicLoading] = useState(false);

  //------------------ Topic fetch api ------------------ //
  useEffect(() => {
    async function fetchTechUpdateCategories() {
      setTopicLoading(true);
      try {
        const response = await learnConfig.get(`/tech-updates/categories/`, {
          params: {
            response_type: "parent",
            q: searchQuery,
          },
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const { StatusCode, data } = response.data;

        if (StatusCode === 6000) {
          setSelectedTopics(data);
          setTopicLoading(false);
        } else if (StatusCode === 6001) {
          // Handle StatusCode 6001 if needed
          setSelectedTopics([]);
          setTopicLoading(false);
        } else {
          setTopicLoading(false);
          // Handle other status codes if needed
        }
      } catch (error) {}
    }

    fetchTechUpdateCategories();
  }, [searchQuery]);

  //---------------- save fetch api -----------------------//
  useEffect(() => {
    async function fetchSavedArticles() {
      setSavedLoading(true);
      try {
        const response = await learnConfig.get(
          "/tech-updates/saved-articles/",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        const { StatusCode, data } = response.data;

        if (StatusCode === 6000) {
          setSavedLoading(false);
          setSavedPost(data);
        } else if (StatusCode === 6001) {
          setSavedPost([]);
          setSavedLoading(false);
          // Handle StatusCode 6001 if needed
        } else {
          // Handle other status codes if needed
        }
      } catch (error) {
        setSavedLoading(false);
        // Handle error here
      }
    }

    fetchSavedArticles();
  }, [access_token, is_bookmarked]);

  //------------------ truncate fuction -------------- //
  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    }

    return str.slice(0, maxLength) + "...";
  }

  return (
    <TopContainer>
      <ContentBox>
        <TopicHeading>Search topics</TopicHeading>
        <TopicSearchDiv>
          <SearchField
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            maxLength={45}
          />
        </TopicSearchDiv>
        <BottomBox>
          {isTopicLoading ? (
            <>
              <TopicSkeleton />
            </>
          ) : (
            <>
              <TopicTags>
                <List>
                  {selectedTopics.length > 0 ? (
                    <>
                      {selectedTopics.slice(0, 5).map((topic) => (
                        <SubList key={topic.id}>
                          <Items
                            to=""
                            className={selectedTopic === topic.slug && "active"}  
                            key={topic.pk}
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedTopic(topic.slug);
                              dispatch({
                                type: "UPDATE_TECH_CATEGORY",
                                tech_topic: topic.title,
                              });
                              history.push(
                                `/tech-updates/?updates=${topic.slug}`
                              );
                            }}
                          >
                            {topic.title}
                          </Items>
                        </SubList>
                      ))}
                    </>
                  ) : (
                    <>
                      <NoFountContienr>No data found</NoFountContienr>
                    </>
                  )}

                  <SeeMoreButton to="/tech-updates/topics/">
                    View All
                  </SeeMoreButton>
                </List>
              </TopicTags>
            </>
          )}
        </BottomBox>
      </ContentBox>
      <ReadingBox>
        <SaveName>My reading list</SaveName>

        <TopPost>
          {savedLoading ? (
            <>
              {[...Array(3)].map((_, index) => (
                <SaveSkeleton key={index} />
              ))}
            </>
          ) : savedPost.length > 0 ? (
            savedPost.slice(0, 3).map((items) =>
              items.post.map((post) => (
                <PostDiv key={post.id} to={`/tech-updates/post/${post?.slug}/`}>
                  <ParaDiv>
                    <SmallProfile>
                      <img src={post.author.image} alt={post.author.name} />
                    </SmallProfile>
                    <ProfileHeading>{post.author.name}</ProfileHeading>
                  </ParaDiv>
                  <Paragraph>{truncateString(post.title, 64)}</Paragraph>
                </PostDiv>
              ))
            )
          ) : (
            <NoSveContienr>
              <ImageContienr>
                <img
                  src={require("../../../../assets/images/tech-update/nosave-image.jpg")}
                  alt=""
                />
              </ImageContienr>
              <p>
                You haven't saved yet. Simply click the{" "}
                <span>
                  ‘
                  <img
                    src={require("../../../../assets/images/tech-update/g1353.svg")}
                    alt=""
                  />
                  ’
                </span>{" "}
                on any Tech updates to get started.
              </p>
            </NoSveContienr>
          )}
          {savedPost.length > 2 && (
            <SmallOne to="/tech-updates/saved-posts/?updates=all">
              View All
            </SmallOne>
          )}
        </TopPost>
      </ReadingBox>
    </TopContainer>
  );
}

export default SideBox;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TopicSearchDiv = styled.div`
  padding: 10px;
  /* height: 40px; */
  border: 1px solid #e3e8ef;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  &:before {
    content: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/search-icon.svg");

    width: 20px;
    height: 20px;
    display: inline-block;
  }
  
`;
const SearchField = styled.input`
  width: 100%;
  font-family: "gordita_regular" !important;
`;
const BottomBox = styled.div`
  max-height: calc(100vh - 215px);
  /* margin-top: 10px; */
  /* @media all and (max-width: 480px) {
        max-height: calc(100vh - 160px);
    } */
`;
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;
`;
const ContentBox = styled.section`
  /* position: relative; */
  position: sticky;
  padding: 20px;
  border: 1.6px solid #eef2f6;
  border-radius: 12px;
  background-color: #fff;
  max-height: calc(100vh - 80px);
  z-index: 2;
  overflow-y: scroll;
  flex-direction: column;
  display: flex;
  gap: 16px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ReadingBox = styled.div`
  padding: 20px;
  border: 1.6px solid #eef2f6;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const SearchDiv = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  height: 45px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  input {
    font-size: 14px;
  }
`;
const SearchIcon = styled.div`
  margin-right: 10px;
  img {
    width: 100%;
    display: block;
  }
`;
const TopicHeading = styled.h3`
  font-size: 20px;
  color: #4e4c4c;
  font-family: "gordita_medium" !important;
`;
const TopicTags = styled.div`
  /* margin-bottom: 10px; */
`;
const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: row;
  gap: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
  /* @media all and (max-width: 1200px) {
        justify-content: flex-start !important;
    } */
`;
const SubList = styled.li``;

const Items = styled(Link)`
  display: inline-block;
  cursor: pointer;
  padding: 5px 12px;
  border-radius: 24px;
  font-size: 14px;
  color: #202939;
  font-family: "gordita_medium";
  border: 1px solid #cdd5df;
  &.active {
    background-color: #cff1e4;
    border: 1px solid #4ebf96;
    color: #4ebf96;
  }
`;
const SeeMoreButton = styled(Link)`
  color: #15bf81;
  cursor: pointer;
  font-size: 14px;
  padding: 4% 0;
  font-family: "gordita_medium";
  width: 100%;
`;
const SavedPost = styled.div`
  margin: 0 0 25px 0px;
  display: flex;
  border-top: 1px solid #e8e8e8;
  padding-top: 25px;
  /* @media all and (max-width: 768px) {
        margin: 20px 0px;
    } */
`;
const SaveIcon = styled.div`
  margin-right: 10px;
`;
const SaveName = styled.h3`
  color: #202939;
  font-size: 18px;
  font-family: "gordita_medium" !important;
`;
const TopPost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const PostDiv = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
`;
const ParaDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
`;
const SmallProfile = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`;
const ProfileHeading = styled.h4`
  font-size: 14px;
`;
const Paragraph = styled.p`
  font-size: 1.143;
  font-family: "gordita_medium" !important;
  color: #202939;
  width: 100%;
  line-height: 1.4rem;
  @media all and (max-width: 1280px) {
    font-size: 1rem;
  }
`;
const SmallOne = styled(Link)`
  color: #15bf81;
  font-size: 14px;
  font-family: "gordita_medium" !important;
  cursor: pointer;
`;
const NoSveContienr = styled.div`
  border: 2px dashed #e8e8e8;
  border-radius: 3px;
  padding: 4% 2%;
  p {
    font-family: "gordita_regular" !important;
    font-size: 15px;
    text-align: center;
  }
  img {
    margin-bottom: -8px;
  }
`;
const ImageContienr = styled.div`
  width: 80%;
  margin: 0 auto;
  img {
    width: 100%;
    display: block;
  }
`;
const SaveImageContienr = styled.div`
  width: 10%;
  margin: 0 auto;
  img {
    width: 100%;
    /* display: block; */
  }
`;

const NoFountContienr = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;
