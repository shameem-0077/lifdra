import React, { useEffect, useState } from "react";
import styled from "styled-components";

function WarningMenu({ isSecondMenu }) {
    const [showMenu, setShowMenu] = useState(isSecondMenu);
    const [isVisible, setIsVisible] = useState(false); // Controls visibility with animation

    useEffect(() => {
        if (isSecondMenu) {
            setShowMenu(true); // Initially set to true to show the menu
            setTimeout(() => setIsVisible(true), 10); // Slight delay to trigger the slide-in animation

            const timer = setTimeout(() => {
                setIsVisible(false); // Slide-out after 5 seconds
                setTimeout(() => setShowMenu(false), 500); // Hide after animation completes (500ms)
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isSecondMenu]);

    return (
        <>
            {showMenu && (
                <MainContainer className={`${isVisible ? "active" : ""}`}>
                    <p>For better experience use mobile menu</p>
                </MainContainer>
            )}
        </>
    );
}

export default WarningMenu;

const MainContainer = styled.div`
    max-width: fit-content;
    width: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px 20px 6px;
    position: fixed;
    top: 20%;
    right: -100%; /* Start off-screen to the right */
    z-index: 9999;
    box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.1);
    transition: right 0.5s ease; /* Smooth transition for sliding */

    &.active {
        right: 10%; /* Slide in to the right position */
    }

    p {
        font-size: 14px;
        color: #6b2020;
    }
`;
