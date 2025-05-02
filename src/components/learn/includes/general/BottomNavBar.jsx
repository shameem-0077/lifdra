import React, { useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import styled, { keyframes } from "styled-components";
import HeaderDropdown from "./modals/HeaderDropdown";

function BottomNavBar({ props, isSecondMenu }) {
    const [showModal, setShowModal] = useState(false);

    const menuItems = [
        {
            path: "/feed/",
            label: "Home",
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/01-06-2024/community.svg",
        },
        {
            path: "/NanoDegree/",
            label: "NanoDegree",
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/10-09-2024/nano_degree_icons.svg",
        },
        {
            path: "/tech-updates/",
            label: "Tech Updates",
            icon: "https://steyp.com/static/media/techupdates.53fa5c58.svg",
        },
    ];
    return (
        <>
            {isSecondMenu && (
                <Head>
                    <Center>
                        <TabMenu>
                            {menuItems.map((item) => (
                                <Menu
                                    onMouseEnter={() => {
                                        if (item?.label == "NanoDegree") {
                                            setShowModal(true);
                                        } else {
                                            setShowModal(false);
                                        }
                                    }}
                                    key={item?.path}
                                    to={item?.path}
                                    end={item?.path === "/feed/"}
                                    className={({ isActive }) =>
                                        isActive ? "active" : null
                                    }
                                >
                                    <MenuIcon
                                        src={item.icon}
                                        alt={`${item?.label} Icon`}
                                    />
                                    <span>{item?.label}</span>
                                </Menu>
                            ))}
                            <HeaderDropdown
                                setShowModal={setShowModal}
                                isSecondMenu={isSecondMenu}
                                showModal={showModal}
                            />
                        </TabMenu>
                    </Center>
                </Head>
            )}
        </>
    );
}

export default BottomNavBar;
const Head = styled.header`
    width: fit-content;
    margin: 0 auto;
    padding: 0 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 5px;
    left: 0;
    right: 0;
    background: #fff;
    height: 70px;
    z-index: 99;
    background: #f9f9fb;
    border-radius: 8px;
    box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.3);
    align-items: ${(props) => (props.respSearch ? "center" : "inherit")};
`;

const Center = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const TabMenu = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    width: max-content;
`;

const Menu = styled(NavLink)`
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4px;
    padding: 0 38px;
    text-decoration: none;
    cursor: pointer;
    color: inherit; /* Ensures color transition is consistent with background transition */
    background-color: transparent;
    border-bottom: 4px solid transparent; /* Ensures border transition is smooth */
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out,
        border-bottom 0.3s ease-in-out;

    &.active {
        color: #059664;
        background-color: #eef2f6;
        border-bottom: 4px solid #059664;
        border-top: 4px solid #059664;
    }
    &:hover {
        color: #059664;
        transform: scaleY(1.1);
    }
    span {
        font-size: 14px;
        font-family: "gordita_medium";
    }
    @media all and (max-width: 1080px) {
        width: 170px;
        padding: 0px;
    }
    @media all and (max-width: 580px) {
        width: 140px;
        span {
            font-size: 13px;
        }
    }
`;
const MenuIcon = styled.img`
    display: block;
    width: 24px;
`;
