import React, { useState, useEffect, useCallback, useRef } from "react";
import TalropEdtechHelmet from "../../../helpers/TalropEdtechHelmet";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import PostTop from "../../includes/community/PostTop";
import TrendToggle from "../../includes/community/TrendToggle";
import PostCard from "../../includes/community/PostCard";
import { serverConfig } from "../../../../axiosConfig";
import CommunityNoDataFound from "../../includes/community/CommunityNoDataFound";
import PostCardSkeleton from "../../includes/community/PostCardSkeleton";
import PostDeleteModal from "../../includes/community/modals/PostDeleteModal";
import ReportModal from "../../includes/community/modals/ReportModal";
import {
  ProfileRouteRegex,
  ProfilePostRedirctRegex,
  SavedRouteRegex,
  PostRouteRegex,
} from "../../includes/community/RouteRegexPattern";
import CommentDelModal from "../../includes/community/modals/CommentDelModal";
import PostProcessing from "../../includes/community/PostProcessing";
import CommunitySuggetionCard from "./CommunitySuggetionCard";
import { useAuthStore } from "../../../../store/authStore";

function PostMain({
  toast,
  setFollowCount,
  userProfileDetails,
  setUsername,
}) {
  const { username } = useParams();
  const { slug } = useParams();
  const location = useLocation();
  const { user_data, user_profile } = useAuthStore();

  const [selected, setSelected] = useState("trending");
  const [postIds, setPostIds] = useState([]);
  const [randomId, setRandomId] = useState(null);
  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [deletionOccurred, setDeletionOccurred] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [isSelectedId, setSelectedId] = useState(null);
  const [isOptions, setOptions] = useState(false);
  const [isReport, setReport] = useState(false);
  const [isCmtDel, setCmDel] = useState(false);
  const [deletionUpdate, setDeletionUpdate] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isModal, setModal] = useState(false);
  const [isPostId, setPostId] = useState(null);

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const GeneratePost = async () => {
    try {
      const formData = new FormData();
      formData.append("status", "on_draft");

      const response = await serverConfig.post(`api/v1/posts/create/`, formData, {
        headers: {
          Authorization: `Bearer ${user_data?.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const { status_code, data } = response.data;
      if (status_code === 6000) {
        setPostId(data?.post_id);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    // Extract all post IDs when postData changes and shuffle them
    if (postData.length > 0) {
      const ids = postData.map((post) => post.id);
      setPostIds(shuffleArray(ids));
    }
  }, [postData]);

  useEffect(() => {
    if (postIds.length > 0) {
      setRandomId(postIds[0]); // Pick the first ID from the shuffled array
    }
  }, [postIds]);

  const fetchPosts = useCallback(async () => {
    if (page === 1) {
      setInitialLoading(true);
    } else {
      setLoading(true);
    }
    try {
      let url = "api/v1/posts/";
      let params = { type: selected, page };

      if (location.pathname.match(SavedRouteRegex)) {
        url = "api/v1/posts/profile-posts/";
        params = { section: "saved", page };
      } else if (
        location.pathname.match(PostRouteRegex) ||
        location.pathname.match(ProfilePostRedirctRegex)
      ) {
        url = "api/v1/posts/profile-posts/";
        params = {
          section: "posts",
          page,
          profile_id:
            user_profile?.user_id == userProfileDetails?.user_id
              ? null
              : userProfileDetails?.user_id,
        };
      }

      const response = await serverConfig.get(url, {
        headers: {
          Authorization: `Bearer ${user_data?.access_token}`,
        },
        params,
      });
      const { status_code, data, pagination_data } = response.data;

      if (status_code === 6000) {
        if (page === 1) {
          setPostData(data);
        } else {
          setPostData((prevData) => [...prevData, ...data]);
        }
        setHasMore(pagination_data.has_next_page);

        setInitialLoading(false);
        setLoading(false);
      } else {
        setHasMore(false);
        setInitialLoading(false);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setInitialLoading(false);
      setLoading(false);
    }
  }, [user_data?.access_token, location, selected, page, username, user_profile, userProfileDetails]);

  useEffect(() => {
    setPostData([]);
    setPage(1);
    setHasMore(true);
  }, [selected, location]);

  useEffect(() => {
    if (deletionOccurred) {
      setPostData([]);
      setPage(1);
      setHasMore(true);
      setDeletionOccurred(false);
    }
  }, [deletionOccurred]);

  useEffect(() => {
    if (
      location.pathname.match(PostRouteRegex) ||
      location.pathname.match(ProfilePostRedirctRegex)
    ) {
      setUsername(username);
    }
    fetchPosts();
  }, [fetchPosts, deletionOccurred, isUpdate, username]);

  return (
    <>
      <PostDeleteModal
        toast={toast}
        setDelete={setDelete}
        isDelete={isDelete}
        isSelectedId={isSelectedId}
        onDeleteSuccess={() => setDeletionOccurred(true)}
      />
      <CommentDelModal
        setCmDel={setCmDel}
        isCmtDel={isCmtDel}
        isSelectedId={isSelectedId}
        setOptions={setOptions}
        toast={toast}
        deletionUpdate={() => setDeletionUpdate(true)}
      />
      <ReportModal
        setReport={setReport}
        isReport={isReport}
        isSelectedId={isSelectedId}
        setSelectedId={setSelectedId}
        isOptions={isOptions}
        setOptions={setOptions}
        toast={toast}
      />
      <TalropEdtechHelmet title="Feed" />
      <Container
        isProfileroute={
          location.pathname.match(ProfilePostRedirctRegex) ||
          location.pathname.match(SavedRouteRegex) ||
          location.pathname.match(PostRouteRegex)
            ? true
            : false
        }
      >
        {location.pathname.match(PostRouteRegex) ||
        location.pathname.match(ProfilePostRedirctRegex) ||
        location.pathname.match(SavedRouteRegex) ? (
          <></>
        ) : (
          <TopSection>
            <ActionButton
              onClick={() => {
                setModal(true);
                GeneratePost();
              }}
            >
              <ImageBox>
                <img
                  src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-11-2024/edit-05.svg"
                  alt="Edit Icon"
                />
              </ImageBox>
            </ActionButton>
            <PostTop
              toast={toast}
              isUpdate={isUpdate}
              setUpdate={setIsUpdate}
              setModal={setModal}
              isModal={isModal}
              generatePost={GeneratePost}
              isPostId={isPostId}
            />
            <TrendToggle selected={selected} setSelected={setSelected} />
          </TopSection>
        )}
        <ContentSection>
          {initialLoading ? (
            <LoaderCover>
              {[...Array(3)].map((_, index) => (
                <PostCardSkeleton key={index} initialLoading={initialLoading} />
              ))}
            </LoaderCover>
          ) : postData.length > 0 ? (
            <>
              {postData.map((item, index) => (
                <div
                  key={item.id}
                  ref={index === postData.length - 1 ? lastPostElementRef : null}
                >
                  {item?.status === "processing" &&
                    !location?.pathname?.match(SavedRouteRegex) && (
                      <PostProcessing
                        key={index}
                        item={item}
                        setSelectedId={setSelectedId}
                      />
                    )}
                  {(item?.status === "published" ||
                    item?.post?.status === "published") && (
                    <PostCard
                      item={item}
                      toast={toast}
                      setFollowCount={setFollowCount}
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
                      selectedComment={selectedComment}
                      setSelectedComment={setSelectedComment}
                    />
                  )}
                  {randomId == item.id && (
                    <SuggetionBox>
                      <CommunitySuggetionCard />
                    </SuggetionBox>
                  )}
                </div>
              ))}
            </>
          ) : (
            <NoDataContainer>
              <CommunityNoDataFound
                message={
                  location?.pathname === "/feed/"
                    ? "No posts available at the moment. Start by following people you may know!"
                    : location.pathname.match(SavedRouteRegex)
                    ? "You have no saved posts."
                    : username == user_profile?.username
                    ? "You have no posts."
                    : "There aren't any posts here yet"
                }
                thumbnail={
                  "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/03-07-2024/community_empty.svg"
                }
              />
            </NoDataContainer>
          )}
          {isLoading && (
            <LoaderCover>
              <PostCardSkeleton />
            </LoaderCover>
          )}
        </ContentSection>
      </Container>
    </>
  );
}

export default PostMain;

const Container = styled.section`
  /* padding: ${({ isProfileroute }) => (isProfileroute ? "0" : "32px 0")}; */
  width: 100%;
  margin: 0 auto;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
const TopSection = styled.div``;
const ContentSection = styled.div``;
const LoaderCover = styled.div`
  width: 100%;
`;

const NoDataContainer = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const SuggetionBox = styled.div`
  display: none;
  @media all and (max-width: 1024px) {
    display: block;
  }
`;

const ActionButton = styled.button`
  display: none;
  cursor: pointer;
  position: fixed;
  padding: 18px;
  bottom: 86px;
  right: 20px;
  z-index: 1000;
  width: 56px;
  height: 56px;
  border-radius: 35px;
  background-color: #059664;
  box-shadow: 0px 7px 29px 0px #64646f33;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth animation */

  &:hover {
    transform: scale(1.1); /* Slightly enlarges the button */
    box-shadow: 0px 10px 35px 0px #05966488; /* Stronger shadow on hover */
  }

  @media all and (max-width: 440px) {
    display: block;
  }
`;

const ImageBox = styled.div`
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    display: block;
  }
`;
