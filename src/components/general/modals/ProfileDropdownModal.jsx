import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../../store/userStore";

const ProfileDropdownModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useUserStore();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <MenuList>
          <MenuItem>
            <Link to="/feed/profile" onClick={onClose}>
              <MenuIcon src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/user-icon.svg" alt="Profile" />
              <MenuText>View Profile</MenuText>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/settings" onClick={onClose}>
              <MenuIcon src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/settings-icon.svg" alt="Settings" />
              <MenuText>Settings</MenuText>
            </Link>
          </MenuItem>
          <Divider />
          <MenuItem>
            <button onClick={handleLogout}>
              <MenuIcon src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/logout-icon.svg" alt="Logout" />
              <MenuText>Logout</MenuText>
            </button>
          </MenuItem>
        </MenuList>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProfileDropdownModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 84px;
  right: 48px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-width: 240px;
  z-index: 1001;

  @media (max-width: 768px) {
    top: 68px;
    right: 16px;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 8px 0;
  margin: 0;
`;

const MenuItem = styled.li`
  a, button {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    width: 100%;
    text-decoration: none;
    color: #344049;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f8f9fa;
    }
  }
`;

const MenuIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const MenuText = styled.span`
  font-family: "gordita_regular";
  font-weight: 500;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 8px 0;
`; 