import React from "react";
import styled from "styled-components";

export default function FlagDropDown(props) {
    return (
        <Container onClick={props.handleClick} isArrowIcon={props?.isArrowIcon}>
            <ImgContainer
                responsive={props.Responsive}
                additional_info={props.additional_info}
                height={props.height}
                width={props.width}
            >
                <Image
                    src={props.selectedCountry && props.selectedCountry.flag}
                    alt="Image"
                />
            </ImgContainer>
            {!(props?.isArrowIcon === false) && (
                <Icon
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/arrow.svg"
                    alt=""
                />
            )}
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    margin: auto 0;
    cursor: ${({ isArrowIcon }) =>
        isArrowIcon === false ? "auto" : "pointer"};
`;
const ImgContainer = styled.div`
    height: ${({ additional_info }) => (additional_info ? "28px" : "42px")};
    width: ${({ additional_info }) => (additional_info ? "28px" : "42px")};
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    margin-right: 7px;
    @media (max-width: 480px) {
        height: ${({ responsive, height }) =>
            height ? `${height}px` : responsive ? "28px" : "36px"};
        width: ${({ responsive, width }) =>
            width ? `${width}px` : responsive ? "28px" : "36px"};
    }
`;
const Image = styled.img`
    display: block;
    object-fit: cover;
    width: 100%;
`;
const Icon = styled.img`
    display: block;
    width: 6px;
    transform: rotate(90deg);
    @media (max-width: 480px) {
        /* width: 5px; */
        display: none;
    }
`;
