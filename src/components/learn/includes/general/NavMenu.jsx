import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import HeaderDropdown from "./modals/HeaderDropdown";

function NavMenu() {
  const [showModal, setShowModal] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const tabRefs = useRef([]);

  const menuItems = [
    {
      path: ["/feed/"],
      label: "Home",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/28-09-2024/home-icon.svg",
      active_icon:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/07-10-2024/home_icon.svg",
      arrow_icon: null,
    },
    {
      path: ["/prime-programs/"],
      label: "Courses",
      active_icon:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/19-10-2024/activestate_hat.svg",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/14-10-2024/nanodegree.svg",
      arrow_icon: null,
    },
    {
      path: ["/feed/"],
      label: "Explore",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/07-10-2024/explore_icon.svg",
      active_icon:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/28-09-2024/compass-03.svg",
      arrow_icon: null,
    },
  ];

  const subMenuItems = [
    {
      path: "/tech-updates/",
      label: "Tech Updates",
      description: "Discover the latest trends in technology.",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/05-10-2024/techupdate_icon.svg",
    },
    {
      path: "/meet/",
      label: "Meet",
      description: "Join expert-led online sessions",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/05-10-2024/meet_icon.svg",
    },
    {
      path: "/projects",
      label: "Projects",
      description: "Enroll in real projects and get certified.",
      icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/05-10-2024/project_icon.svg",
    },
    // {
    //   path: "/doubt-hub/",
    //   label: "Doubt Hub",
    //   description: "Share and solve questions with peers.",
    //   icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/05-10-2024/doubthub_icon.svg",
    // },
  ];

  useEffect(() => {
    setActiveSubTab(window.location.pathname);
  }, []);

  useEffect(() => {
    // Get the current path from the URL
    const currentPath = window.location.pathname;

    // Define the list of keys you want to match in the path
    const keys = ["/feed/", "/nanodegree/", "/tech-updates/"];

    // Find the first matching key or default to "/dashboard/"
    const matchedKey =
      keys.find((key) => currentPath.includes(key)) || "/feed/";
    const activeTabElement = tabRefs.current[matchedKey];
    const parentElement = activeTabElement?.parentElement;

    if (activeTabElement && parentElement) {
      requestAnimationFrame(() => {
        const tabOffset = activeTabElement.offsetLeft;
        const tabWidth = activeTabElement.offsetWidth;

        const leftPercent = (tabOffset / parentElement.offsetWidth) * 100;
        const widthPercent = (tabWidth / parentElement.offsetWidth) * 100;

        setBackgroundPosition({
          left: leftPercent,
          width: widthPercent,
        });
      });
    }
  }, [activeSubTab]);

  const handleMouseLeave = () => {
    setShowModal(false);
  };

  return (
    <TabMenu>
      <SlidingBackground
        style={{
          left: `${backgroundPosition.left}%`,
          width: `${backgroundPosition.width}%`,
        }}
      />
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          {" "}
          {/* Using index as key since paths are arrays */}
          <MenuContainer
            ref={(el) => {
              item.path.forEach((p) => {
                tabRefs.current[p] = el;
              });
            }}
            to={item.path[0]}
            end={item.path.includes("/feed/")}
            onClick={() => {
              setActiveSubTab(item.path);
              {
                /* Storing the array of paths */
              }
              if (item.label === "Explore") {
                setShowModal(true);
              }
            }}
            onMouseEnter={() => {
              if (item.label === "Explore") {
                setShowModal(true);
              }
            }}
            onMouseLeave={() => {
              if (item.label === "Explore") {
                // setTimeout(handleMouseLeave, 500);
                // setShowModal(false);
              }
            }}
            onMouseOver={() => {
              if (item.label === "Explore") {
                // setShowModal(true);
              }
            }}
            className={item.path.includes(activeSubTab) ? "active" : ""}
          >
            <MenuIconContainer>
              <MenuIcon
                src={
                  item.path.includes(activeSubTab)
                    ? item.active_icon
                    : item.icon
                }
                alt={`${item.label} Icon`}
              />
            </MenuIconContainer>
            <span className="mac">{item.label}</span>
            {item?.arrow_icon && (
              <ArrowBox>
                <ArrowIcon
                  style={{ transform: "rotate(180deg)" }}
                  src={item?.arrow_icon ? item?.arrow_icon : ""}
                  alt="Arrow"
                />
              </ArrowBox>
            )}
          </MenuContainer>
        </React.Fragment>
      ))}

      <HeaderDropdown
        setShowModal={setShowModal}
        showModal={showModal}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        subMenuItems={subMenuItems}
        setActiveSubTab={setActiveSubTab}
      />
    </TabMenu>
  );
}

export default NavMenu;

const TabMenu = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: max-content;
`;

const SlidingBackground = styled.div`
  position: absolute;
  padding: 8px 16px;
  top: 0;
  height: 100%;
  background-color: #ecfdf4;
  border-radius: 30px;
  border: 1px solid #cdd5df;
  transition: left 0.3s ease, width 0.3s ease;
  z-index: -1;
  box-shadow: 0px 1px 2px 0px #1018280f;
  box-shadow: 0px 1px 3px 0px #1018281a;
`;

const MenuContainer = styled(NavLink)`
  padding: 8px 16px;
  min-width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  text-decoration: none;
  cursor: pointer;
  color: inherit;
  position: relative;
  z-index: 1;
  border-radius: 30px;
  transition: color 0.3s ease-in-out;

  &.active {
    color: #059664;
  }

  &:hover {
    color: #059664;
  }

  span {
    /* margin-top: 4px; */
    font-size: 1rem;
    display: inline-block;
    font-family: "gordita_medium";
  }
`;

const MenuIconContainer = styled.div`
  width: 24px;
  height: 24px;
`;
const ArrowBox = styled.div`
  width: 20px;
  height: 20px;
`;
const ArrowIcon = styled.img`
  width: 100%;
`;

const MenuIcon = styled.img`
  display: block;
  width: 100%;
`;
