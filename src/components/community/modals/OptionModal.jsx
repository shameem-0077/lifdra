import React, { useState } from "react";
import useUserStore from "../../../store/userStore";
import styled from "styled-components";
import { serverConfig } from "../../../axiosConfig";

function OptionModal({
  isOpen,
  setOpen,
  item,
  isDelete,
  setDelete,
  setSelectedId,
  toast,
  setReport,
  isReport,
}) {
  const loginData = useUserStore((state) => state.loginData);
  const { accessToken, user } = loginData;
  const [isSaved, setSaved] = useState(false || item?.is_saved);

  const handleDelete = () => {
    setOpen(false);
    setDelete(true);
    setSelectedId(item?.id);
  };

  const handleReport = () => {
    setReport(!isReport);
    setOpen(false);
    setSelectedId(item?.id);
  };

  const handleSave = async () => {
    setSaved(!isSaved);
    try {
      const response = await serverConfig.post(
        `api/v1/posts/save-post/${item?.id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { status_code, message } = response.data;
      if (status_code === 6000) {
        if (message?.message === "Post saved") {
          toast.success("Post saved", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else if (message?.message === "Post un-saved") {
          toast.success("Post unsaved", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }

        setOpen(false);
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <Container isVisible={isOpen}>
      <ListItem>
        {user?.id === item?.author?.id ? (
          <>
            {/* <Items>Edit Post</Items> */}
            <Items onClick={handleDelete}>Delete</Items>
          </>
        ) : (
          <Items onClick={handleReport}>Report</Items>
        )}
        {/* <Items onClick={handleReport}>Share</Items> */}
        <Items onClick={handleSave}>{isSaved ? "Unsave" : "Save"}</Items>
      </ListItem>
    </Container>
  );
}

export default OptionModal;

const Container = styled.div`
  position: absolute;
  right: 21px;
  top: 60px;
  width: 160px;
  z-index: 10;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #e3e8ef;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.3s, visibility 0.3s;
  box-shadow: 0px 4px 30px -2px #10182808;
  box-shadow: 0px 12px 30px -4px #10182814;
  overflow: hidden;
  @media all and (max-width: 440px) {
    right: 15px;
    top: 30px;
  }
`;
const ListItem = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
const Items = styled.li`
  font-size: 14px;
  color: #202939;
  cursor: pointer;
  padding: 8px 12px;
  transition: background-color 0.2s ease;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    background: #ecfdf4;
  }
`;
