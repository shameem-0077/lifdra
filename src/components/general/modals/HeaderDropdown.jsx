import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

function HeaderDropdown({
  setShowModal,
  showModal,
  subMenuItems,
  activeTab,
  setActiveTab,
  setActiveSubTab,
}) {
  const modalRef = useRef(null);
  const [background, setBackground] = useState({ left: 0, width: 0 });
  const [hoverIndex, setHoverIndex] = useState(null);
  const tabRefs = useRef([]);

  useEffect(() => {
    setActiveTab(window.location.pathname);
  }, []);

  useEffect(() => {
    if (hoverIndex !== null && tabRefs.current[hoverIndex]) {
      const activeTabElement = tabRefs.current[hoverIndex];
      const parentElement = activeTabElement.parentElement;

      requestAnimationFrame(() => {
        const tabOffset = activeTabElement.offsetLeft; // Get the left offset
        const tabWidth = activeTabElement.offsetWidth; // Get the width of the tab

        const leftPercent = (tabOffset / parentElement.offsetWidth) * 100;
        const widthPercent = (tabWidth / parentElement.offsetWidth) * 100;

        setBackground({
          left: leftPercent,
          width: widthPercent,
        });
      });
    }
  }, [hoverIndex]);

  const closeOnOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeOnOutsideClick);
    return () => {
      document.removeEventListener("click", closeOnOutsideClick);
    };
  }, []);

  const handleMouseLeave = () => {
    setShowModal(false);
    setHoverIndex(null);
  };

  if (!showModal) return null;

  return (
    <MainContainer onMouseLeave={handleMouseLeave}>
      <Container ref={modalRef}>
        {hoverIndex !== null && (
          <MovingBackground
            style={{
              left: `${background.left}%`,
              width: `${background.width}%`,
            }}
          />
        )}
        {subMenuItems.map((item, index) => {
          return (
            <MenuItem
              ref={(el) => (tabRefs.current[index] = el)}
              onMouseEnter={() => setHoverIndex(index)}
              key={index}
              to={item.path}
              onClick={() => {
                setActiveTab(item.path);
                setShowModal(false);
                setActiveSubTab("/tech-updates/");
              }}
              className={activeTab === item.path ? "active" : ""}
            >
              <IconBox>
                <img src={item.icon} alt={item.label} />
              </IconBox>

              <TitleBox>
                <p>{item.label}</p>
                <span className="description">{item.description}</span>
              </TitleBox>
            </MenuItem>
          );
        })}
      </Container>
    </MainContainer>
  );
}

export default HeaderDropdown;

const MainContainer = styled.div`
  max-width: 1120px;
  max-height: 112px;
  background: #ffffff;
  border: 1px solid #e3e8ef;
  border-radius: 12px;
  padding: 20px 32px;
  position: absolute;
  top: 64px;
  z-index: 9999;
  box-shadow: 0px 4px 6px -2px #10182808;
  box-shadow: 0px 12px 16px -4px #10182814;
`;

const Container = styled.div`
  display: flex;
  gap: 8px;
  position: relative;
`;

const MenuItem = styled(NavLink)`
  width: 258px;
  /* width: 100%; */
  max-height: 74px;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  padding: 12px;
  gap: 12px;
  border-radius: 50px;
  color: #060505;
  text-decoration: none;
  span {
    font-size: 1rem;
  }
  span.description {
    font-family: "gordita_regular";
    line-height: 14px;
    display: inline-block;
    color: #475467;
    font-size: 0.857rem;
  }
  &.active {
    background-color: #eef2f6;
    /* color: #059664;
    span {
      color: #059664;
    } */
  }
`;

const IconBox = styled.div`
  width: 40px !important;
  height: 40px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 27px;
  border: 1px solid #e3e8ef;
  background: #f8fafc;

  img {
    display: block;
    width: 24px;
    height: 24px;
  }
`;

const TitleBox = styled.div`
  p {
    margin-bottom: 0px !important;
    font-size: 16px;
    line-height: 22px;
    color: #202939;
    font-family: "gordita_medium" !important;
  }
`;

const MovingBackground = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  background-color: #eef2f6;
  border-radius: 50px;
  transition: left 0.3s ease, width 0.3s ease;
  z-index: -1;
`;
