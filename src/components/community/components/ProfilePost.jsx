import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import ProfileSlider from "../../learn/screens/community/ProfileSlider";
import { serverConfig } from "../../../axiosConfig";
import plus from "../../../../../assets/images/profile-screen/plus.svg";
import ProfilePostSliderSkeleton from "./ProfilePostSliderSkeleton";
import CommunityNoDataFound from "./CommunityNoDataFound";
import { toast } from "react-toastify";
import { useAuthStore } from "../../../store/authStore";

function ProfilePost({ userId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user_data, user_profile } = useAuthStore();

  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleCreatePost = () => {
    navigate("/feed/", { state: { openModal: true } });
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchMyPosts() {
      setLoading(true);
      try {
        const response = await serverConfig.get(`api/v1/posts/profile-posts/`, {
          headers: {
            Authorization: `Bearer ${user_data?.access_token}`,
          },
          params: { section: "posts", profile_id: userId },
        });
        const { status_code, data, message, pagination_data } = response.data;

        if (status_code === 6000) {
          if (isMounted) {
            setUserPosts(data);
            setLoading(false);
          }
        } else {
          if (isMounted) {
            setUserPosts([]);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (user_data?.access_token) {
      fetchMyPosts();
    }

    return () => {
      isMounted = false;
    };
  }, [user_data?.access_token, userId]);

  const handleDelete = (postId) => {
    serverConfig
      .delete(`api/v1/posts/profile-posts/${postId}/`, {
        headers: {
          Authorization: `Bearer ${user_data?.access_token}`,
        },
      })
      .then((response) => {
        const { status_code } = response.data;
        if (status_code === 6000) {
          toast.success("Post deleted successfully");
          setUserPosts(userPosts.filter((post) => post.id !== postId));
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <Container>
      <Top>
        <Heading>Posts</Heading>
        {userPosts.length > 0 && userId == user_profile?.user_id ? (
          <ButtonContainer onClick={handleCreatePost}>
            <PlusContainer>
              <Plus src={plus} alt="addImage" />
            </PlusContainer>
            <AddText>Create post</AddText>
          </ButtonContainer>
        ) : null}
      </Top>
      {isLoading ? (
        <ProfilePostSliderSkeleton />
      ) : userPosts.length > 0 ? (
        <FadeInContent>
          <ProfileSlider cards={userPosts} userId={userId} />
        </FadeInContent>
      ) : (
        <NoDataContainer>
          <CommunityNoDataFound
            message={
              location?.pathname === "/feed/"
                ? "No posts available at the moment. Start by following people you may know!"
                : location?.pathname === "/feed/saved/"
                ? "You have no saved posts."
                : userId == user_profile?.user_id
                ? "There aren't any posts here yet. Be the first to share something awesome!"
                : "There aren't any posts here yet"
            }
            thumbnail={
              "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/03-07-2024/community_empty.svg"
            }
          />
          {userId == user_profile?.user_id && (
            <AddPostButton onClick={handleCreatePost}>Add post</AddPostButton>
          )}
        </NoDataContainer>
      )}
    </Container>
  );
}

export default ProfilePost;

const Container = styled.div`
  background: #f9f9fb;
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  /* margin-bottom: 32px; */
  overflow: hidden;

  @media all and (max-width: 1024px) {
    margin-bottom: 32px;
    padding: 15px;
  }
  @media all and (max-width: 375px) {
    margin-bottom: 15px;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PlusContainer = styled.div`
  margin-right: 6px;
  width: 20px;
  @media (max-width: 640px) {
    width: 18px;
  }
`;

const Plus = styled.img`
  display: block;
  width: 100%;
`;

const Heading = styled.h4`
  font-size: 18px;
  margin-bottom: 14px;
  font-family: "gordita_medium";
  color: #2d2d2d;
  @media (max-width: 640px) {
    font-size: 15px;
  }
`;

const FadeInContent = styled.div`
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;
  width: 100%;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media all and (max-width: 376px) {
    padding-top: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 14px;
`;

const AddText = styled.h3`
  font-size: 14px;
  font-family: "gordita_medium";
  /* padding-top: 4px; */
  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

const NoDataContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const AddPostButton = styled.button`
  padding: 0 12px;
  margin-top: 10px;
  background: #059664;
  border-radius: 8px;
  height: 34px;
  font-size: 14px;
  width: fit-content;
  color: #ffffff;
  cursor: pointer;
  font-family: "gordita_medium";
  transition: transform 0.2s ease-in-out, background 0.3s, color 0.3s,
    border 0.3s;

  :hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.95);
  }
`;
