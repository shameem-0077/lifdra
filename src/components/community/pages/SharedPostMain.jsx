import React, { useState, useEffect, useCallback, useRef } from "react";
import TalropEdtechHelmet from "../../general/helpers/TalropEdtechHelmet";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PostTop from "../components/PostTop";
import TrendToggle from "../components/TrendToggle";
import PostCard from "../components/PostCard";
import { serverConfig } from "../../../axiosConfig";
import CommunityNoDataFound from "../components/CommunityNoDataFound";
import PostCardSkeleton from "../components/PostCardSkeleton";
import PostDeleteModal from "../modals/PostDeleteModal";
import ReportModal from "../modals/ReportModal";
import {
  ProfileRouteRegex,
  ProfilePostRedirctRegex,
  SinglePageRouteRegex,
  SavedRouteRegex,
  PostRouteRegex,
} from "../components/RouteRegexPattern";
import CommentDelModal from "../modals/CommentDelModal";
import PostProcessing from "../components/PostProcessing";
import CommunitySuggetionCard from "./CommunitySuggetionCard";

function SharedPostMain({
  toast,
  setFollowCount,
  userProfileDetails,
  setUsername,
}) {
  const { username } = useParams();
  const { slug } = useParams();

  const [selected, setSelected] = useState("trending");
  const [postIds, setPostIds] = useState([]);
  const [randomId, setRandomId] = useState(null);
  const location = useLocation();
  const user_data = useSelector((state) => state.user_data);
  const { user_profile } = useSelector((state) => state);

  const { access_token } = user_data;

  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isDelete, setDelete] = useState(false);
  const [isCmtDel, setCmDel] = useState(false);
  const [isReport, setReport] = useState(false);
  const [isSelectedId, setSelectedId] = useState("");
  const [isOptions, setOptions] = useState(null);
  const [deletionUpdate, setDeletionUpdate] = useState(false);
  const [deletionOccurred, setDeletionOccurred] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [isModal, setModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isPostId, setPostId] = useState("");

  // const observer = useRef();
  // const lastPostElementRef = useCallback(
  //   (node) => {
  //     if (isLoading) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && hasMore) {
  //         setPage((prevPage) => prevPage + 1);
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [isLoading, hasMore]
  // );

  // const shuffleArray = (array) => {
  //   return array.sort(() => Math.random() - 0.5);
  // };

  // const GeneratePost = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("status", "on_draft");

  //     const response = await serverConfig.post(`api/v1/posts/create/`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     const { status_code, data } = response.data;
  //     if (status_code === 6000) {
  //       setPostId(data?.post_id);
  //     }
  //   } catch (error) {
  //     console.error("Error creating post:", error);
  //   }
  // };

  // useEffect(() => {
  //   // Extract all post IDs when postData changes and shuffle them
  //   if (postData.length > 0) {
  //     const ids = postData.map((post) => post.id);
  //     setPostIds(shuffleArray(ids));
  //   }
  // }, [postData]);

  // useEffect(() => {
  //   if (postIds.length > 0) {
  //     setRandomId(postIds[0]); // Pick the first ID from the shuffled array
  //   }
  // }, [postIds]);

  const fetchPosts = useCallback(async () => {
    if (page === 1) {
      setInitialLoading(true);
    } else {
      setLoading(true);
    }
    try {
      let url = `api/v1/posts/view/${slug}/`;
      let params = {};
      // let url = "api/v1/posts/";
      // let params = { type: selected, page };

      // if (location.pathname.match(SavedRouteRegex)) {
      //   url = "api/v1api/v1/posts/profile-posts/";
      //   params = { section: "saved", page };
      // } else if (
      //   location.pathname.match(PostRouteRegex) ||
      //   location.pathname.match(ProfilePostRedirctRegex)
      // ) {
      //   url = "api/v1api/v1/posts/profile-posts/";
      //   params = {
      //     section: "posts",
      //     page,
      //     profile_id:
      //       user_profile?.user_id == userProfileDetails?.user_id
      //         ? null
      //         : userProfileDetails?.user_id,
      //   };
      // } else if (location.pathname.match(ViewPostRouteRegex)) {
      //   url = "api/v1/posts/view";
      //   params = {
      //     pk: "b8e5176e-2467-4047-a5a5-062d0cca486c",
      //   };
      // }

      const response = await serverConfig.get(url, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params,
      });
      const { status_code, data, pagination_data } = response.data;

      if (status_code === 6000) {
        // if (page === 1) {
        setPostData(data);
        // } else {
        // setPostData((prevData) => [...prevData, ...data]);
        // }
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
  }, [access_token, location, selected, page, username]);

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
        <ContentSection>
          {initialLoading ? (
            <LoaderCover>
              {[...Array(3)].map((_, index) => (
                <PostCardSkeleton key={index} initialLoading={initialLoading} />
              ))}
            </LoaderCover>
          ) : postData ? (
            <>
              <div
                key={postData.id}
                // ref={
                //   index === postData.length - 1 ? lastPostElementRef : null
                // }
              >
                {postData?.status === "processing" &&
                  !location?.pathname?.match(SavedRouteRegex) && (
                    <PostProcessing
                      // key={index}
                      item={postData}
                      setSelectedId={setSelectedId}
                    />
                  )}
                {(postData?.status === "published" ||
                  postData?.post?.status === "published") && (
                  <PostCard
                    item={postData}
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
                    isSinglePost={true}
                  />
                )}
              </div>
              {/* {randomId == item.id && (
                  <SuggetionBox>
                    <CommunitySuggetionCard />
                  </SuggetionBox>
                )} */}
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

export default SharedPostMain;

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
