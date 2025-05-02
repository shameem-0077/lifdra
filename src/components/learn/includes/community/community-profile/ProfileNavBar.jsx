import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function ProfileNavBar({ navData }) {
  return (
    <ProfileCategory>
      {navData?.map((item, index) => (
        <CategoryList to={item?.url} key={index} >
          {item?.title}
        </CategoryList>
      ))}
    </ProfileCategory>
  );
}

export default ProfileNavBar;

const ProfileCategory = styled.div`
  width: 100%;
  border-bottom: 1px solid #e8e8e8;
  padding: 24px 0px 12px 0px;
  display: flex;
  align-items: center;
  @media (max-width: 480px) {
    padding: 0px 0px 10px 0px;
  }
`;
const CategoryList = styled(NavLink)`
  margin-right: 30px;
  color: #7b7b7b;
  font-family: "gordita_medium";
  font-size: 15px;
  &.active {
    color: rgba(15, 167, 111, 1);
    position: relative;
    &::after {
      content: "";
      background: rgba(15, 167, 111, 1);
      height: 4px;
      width: 100%;
      position: absolute;
      bottom: -15px;
      left: 0;
      border-radius: 30px;
    }
  }
  &:last-child {
    margin-right: 0;
  }
  @media (max-width: 640px) {
    font-size: 14px;
  }
`;
