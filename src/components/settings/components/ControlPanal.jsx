import React, { useState, useCallback } from "react";
import styled from "styled-components";

function ControlPanal({ menuData, tabType, setTabType }) {
  const [menuState, setMenuState] = useState({
    openIndex: null,
    activeIndex: null,
    activeSubIndex: null,
  });
  console.log(tabType, "tabType");
  const toggleMenu = useCallback((index) => {
    setMenuState((prev) => ({
      ...prev,
      openIndex: prev.openIndex === index ? null : index,
    }));
  }, []);

  const handleMainMenuClick = useCallback(
    (index) => {
      const selectedType = menuData.menu[index] || null;

      const hasSubMenu = menuData.menu[index]?.subMenu?.length > 0;

      setMenuState((prev) => ({
        ...prev,
        activeIndex: index,
        activeSubIndex: hasSubMenu ? 0 : null,
      }));

      const newTabType = hasSubMenu
        ? menuData.menu[index].subMenu[0]
        : selectedType;

      setTabType({
        ...newTabType,
        index: index,
      });
      toggleMenu(index);
    },
    [setTabType, toggleMenu, menuData.menu]
  );

  const handleSubMenuClick = useCallback(
    (mainIndex, subIndex) => {
      const selectedSubType =
        menuData.menu[mainIndex].subMenu[subIndex] || null;

      setMenuState({
        openIndex: mainIndex,
        activeIndex: mainIndex,
        activeSubIndex: subIndex,
      });

      setTabType({
        ...selectedSubType,
        index: mainIndex,
      });
    },
    [menuData.menu, setTabType]
  );

  const { openIndex, activeIndex, activeSubIndex } = menuState;

  // Helper to determine if no submenu is active
  const isNoneActive = activeSubIndex === null;

  return (
    <MainContainer>
      {menuData.menu.map((item, index) => (
        <div key={index}>
          <Item
            isActive={
              activeIndex === index &&
              isNoneActive &&
              (!item.subMenu || activeSubIndex === null)
            }
            isNoneActive={activeSubIndex !== null}
            onClick={() => handleMainMenuClick(index)}
          >
            <Content
              isActive={
                activeIndex === index &&
                isNoneActive &&
                (!item.subMenu || activeSubIndex === null)
              }
              isNoneActive={activeSubIndex !== null}
            >
              <span>{item.title}</span>
              {item.subMenu && (
                <DownIconBox
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(index);
                  }}
                >
                  <img
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/17-10-2024/chevron-down.svg"
                    alt="Down arrow"
                  />
                </DownIconBox>
              )}
            </Content>
          </Item>

          {item.subMenu && openIndex === index && (
            <SubMenu>
              {item.subMenu.map((subItem, subIndex) => (
                <SubMenuItem
                  key={subIndex}
                  isActive={
                    activeIndex === index && activeSubIndex === subIndex
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubMenuClick(index, subIndex);
                  }}
                >
                  <span>{subItem.title}</span>
                </SubMenuItem>
              ))}
            </SubMenu>
          )}
        </div>
      ))}
    </MainContainer>
  );
}

export default React.memo(ControlPanal);

// Styled Components
const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const MainContainer = styled.div`
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  @media all and (max-width: 640px) {
    gap: 10px;
    width: 48%;
  }
`;

const Item = styled.div`
  padding: 6px 16px;
  width: 100%;
  border-left: ${({ isActive, isNoneActive }) =>
    isNoneActive ? "none" : isActive ? "1px solid #059664" : "none"};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  span {
    font-size: ${pxToRem(14)};
    font-family: "gordita_regular";
    font-weight: 600;
    color: ${({ isActive, isNoneActive }) =>
      isNoneActive ? "#364152" : isActive ? "#059664" : "#364152"};
  }
`;

const DownIconBox = styled.div`
  width: 24px;
  height: 24px;
  img {
    width: 100%;
    display: block;
    filter: invert();
  }
  @media all and (max-width: 440px) {
    display: none;
  }
`;

const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 14px;
  margin-top: 16px;

  @media all and (max-width: 440px) {
    gap: 8px;
    margin: 10px;
  }
`;

const SubMenuItem = styled.button`
  padding: 6px 0;
  cursor: pointer;
  border-left: ${({ isActive }) => (isActive ? "1px solid #059664" : "none")};
  span {
    padding-left: 32px;
    font-size: ${pxToRem(14)};
    font-family: "gordita_regular";
    font-weight: 600;
    color: ${({ isActive }) => (isActive ? "#059664" : "#364152")};
    cursor: pointer;
  }
`;
