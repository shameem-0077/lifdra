import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { learnConfig } from "../../../../../axiosConfig";

function OptionComments({
  item,
  isCmtDel,
  setCmDel,
  setSelectedId,
  toast,
  setReport,
  isReport,
  isOptions,
  setOptions,
}) {
  const user_data = useSelector((state) => state.user_data);
  const { access_token } = user_data;

  const handleDelete = () => {
    setCmDel(true);
    setSelectedId(item?.id);
  };

  const handleReport = () => {
    // setOptions(!isOptions);
    setReport(!isReport);
  };

  return (
    <Container>
      <ListItem>
        {user_data?.pk === item?.author?.id ? (
          <>
            <Items onClick={handleDelete}>Delete</Items>
          </>
        ) : (
          <Items onClick={handleReport}>Report</Items>
        )}
      </ListItem>
    </Container>
  );
}

export default OptionComments;

const Container = styled.div`
  position: absolute;
  width: 185px;
  z-index: 10;
  right: 0px;
  top: 30px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #e3e8ef;
  /* opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")}; */
  transition: opacity 0.3s, visibility 0.3s;
  -webkit-box-shadow: 0px 2px 6px -1px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 6px -1px rgba(0, 0, 0, 0.57);
  box-shadow: 0px 2px 6px -1px rgba(0, 0, 0, 0.57);
`;
const ListItem = styled.ul``;
const Items = styled.li`
  font-size: 14px;
  color: #202939;
  cursor: pointer;
  padding: 8px;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    background: #ecfdf4;
  }
`;
