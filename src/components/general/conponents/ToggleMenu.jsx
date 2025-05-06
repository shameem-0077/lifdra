import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const ToggleMenu = ({ menus, searchQuery, users_data, posts_data }) => {
  const totalResults = users_data?.length + posts_data?.length;

  return (
    <>
      <MainContainer>
        {totalResults > 0 ? (
          <Result>
            Showing over {totalResults} results for <span>“{searchQuery}”</span>
          </Result>
        ) : (
          <Result>Looks like we couldn't find any results.</Result>
        )}
        <Container>
          <h3>Search for results in</h3>
          <MenuContainer>
            {menus?.map((item, i) => {
              return (
                <Menu
                  key={item?.id}
                  exact
                  to={`${item?.path}?q=${searchQuery}`}
                >
                  {item?.linkName}
                </Menu>
              );
            })}
          </MenuContainer>
        </Container>
      </MainContainer>
    </>
  );
};

export default ToggleMenu;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const MainContainer = styled.div`
  max-width: 372px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  @media (max-width: 1023px) {
    padding: 0;
  }
`;

const Result = styled.p`
  font-family: "gordita_regular";
  font-size: ${pxToRem(16)};
  color: #364152;
  span {
    font-family: "gordita_medium" !important;
    font-size: ${pxToRem(16)};
    color: #364152;
  }

  @media (max-width: 1023px) {
    font-size: ${pxToRem(14)};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  h3 {
    font-family: "gordita_medium";
    font-size: ${pxToRem(18)};
    color: #121926;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 1023px) {
    flex-direction: row;
  }
`;

const Menu = styled(NavLink)`
  font-family: "gordita_medium";
  font-size: ${pxToRem(14)};
  color: #364152;
  width: fit-content;
  padding: 12px 16px;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease-out;
  transition: transform 0.3s ease-in-out;

  &.active {
    color: #0fa76f;
  }

  @media (min-width: 1024px) {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 2px; /* Left side line width */
      height: 100%;
      background-color: #0fa76f;
      transform: scaleY(0);
      transform-origin: top;
      transition: transform 0.3s ease-out;
    }

    &.active::after {
      transform: scaleY(1);
      transform-origin: top;
      transition: transform 0.3s ease-in-out;
    }

    &:hover {
      color: #0fa76f;
      transform: scale(1.1);

      &::after {
        transform: scaleY(0);
      }
    }
  }

  @media (max-width: 1023px) {
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #0fa76f;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease-out;
    }

    &.active::after {
      transform: scaleX(1);
      transform-origin: left;
      transition: transform 0.3s ease-in-out;
    }

    &:hover {
      color: #0fa76f;
      transform: scale(1.1);
      ::after {
        transform: scaleX(0);
      }
    }
  }
`;
