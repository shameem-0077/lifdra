import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function ChatSmallMenu({ author, contactPk, onDelete }) {
    const [isDropVisible, setDropVisible] = useState(false);

    const toggleSetVisible = () => {
        setDropVisible((prev) => !prev);
    };

    const dropBox = useRef(null);
    const dropIcon = useRef(null);

    const handleClickOutside = (event) => {
        if (dropIcon.current && !dropIcon.current.contains(event.target)) {
            if (dropBox.current && !dropBox.current.contains(event.target)) {
                toggleSetVisible();
            }
        }
    };
    useEffect(() => {
        document.addEventListener("mouseup", handleClickOutside);
        document.addEventListener("touchend", handleClickOutside);
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
            document.removeEventListener("touchend", handleClickOutside);
        };
    }, []);

    return (
        <Menu>
            <DotsBox ref={dropIcon} onClick={toggleSetVisible}>
                <MenuDots></MenuDots>
                <MenuDots></MenuDots>
                <MenuDots></MenuDots>
            </DotsBox>
            {isDropVisible && (
                <MenuDrop
                    ref={dropBox}
                    style={
                        author === contactPk
                            ? {
                                  right: "5px",
                                  top: "5px",
                              }
                            : {
                                  left: "5px",
                                  top: "5px",
                              }
                    }
                    onClick={onDelete}
                >
                    <MenuItem>Delete</MenuItem>
                </MenuDrop>
            )}
        </Menu>
    );
}

const Menu = styled.div`
    align-self: center;
    display: flex;
    position: relative;
    margin: 0 8px;
`;
const DotsBox = styled.div`
    display: flex;
    cursor: pointer;
`;
const MenuDots = styled.span`
    width: 2px;
    height: 2px;
    background: #777;
    display: inline-block;
    margin-right: 2px;
    &:last-child {
        margin-right: unset;
    }
`;
const MenuDrop = styled.ul`
    position: absolute;
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
    background: #fff;
    font-size: 14px;
    padding: 3px 9px;
    border-radius: 2px;
`;
const MenuItem = styled.li`
    cursor: pointer;
`;
