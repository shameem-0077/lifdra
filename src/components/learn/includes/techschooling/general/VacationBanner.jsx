import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { learnConfig } from "../../../../../axiosConfig";

function VacationBanner() {
    return (
        <UpdateBanner>
            <BannerLeftContainer>
                <LeftContainer>
                    <IconContainer>
                        <img
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-03-22/banner-offer.svg"
                            }
                            alt="Icon"
                        />
                    </IconContainer>
                </LeftContainer>
                <BannerHead>
                    ഈ അവധികാലത്ത്
                    <span>
                        <small>₹</small>10 രൂപ {""}
                    </span>
                    ദിവസവും മുടക്കി {""}
                    <span>കോഡിംഗ് പഠിച്ചാലോ</span>?
                </BannerHead>
            </BannerLeftContainer>

            <RightButton to="/mlp/vacation-program/">Join Now</RightButton>
        </UpdateBanner>
    );
}

export default VacationBanner;

const UpdateBanner = styled.div`
    background-color: #2334a7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 7px;
    margin-bottom: 15px;
    opacity: 1;
    position: relative;
    height: 55px;
    animation: fade 0.4s ease;
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @media all and (max-width: 768px) {
        padding: 15px;
        height: unset;
    }
    @media all and (max-width: 640px) {
        align-items: flex-end;
    }
    @media all and (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;
const BannerLeftContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 6px;
    @media all and (max-width: 768px) {
        flex-direction: column;
        width: 70%;
        align-items: flex-start;
    }
    @media all and (max-width: 480px) {
        width: 100%;
        margin-right: 0px;
    }
`;
const LeftContainer = styled.div`
    width: 170px;
`;
const IconContainer = styled.div`
    width: 170px;
    position: absolute;
    top: -9px;
    left: -14px;
    @media all and (max-width: 768px) {
        width: 120px;

        top: -20px;
        left: -12px;
    }

    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 480px) {
    }
`;
const BannerHead = styled.h3`
    font-family: "EGGIndulekhaUni";
    font-size: 24px !important;
    color: #fff;
    transform: translateY(2px);

    span {
        color: #f8c333;
    }
    small {
        color: #f8c333;
        margin-left: 8px;
        font-size: 16px;
        @media all and (max-width: 640px) {
            font-size: 14px !important;
        }
    }
    @media all and (max-width: 980px) {
        font-size: 22px !important;
    }
    @media all and (max-width: 890px) {
        font-size: 20px !important;
        /* margin-left: 15px; */
    }
    @media all and (max-width: 768px) {
        margin-top: 10px;
    }
    @media all and (max-width: 640px) {
        font-size: 18px !important;
    }
    @media all and (max-width: 480px) {
        font-size: 16px !important;
        transform: translateY(2px);
        font-size: 14px;
        margin-top: 15px;
    }
`;
const RightButton = styled(Link)`
    display: flex;
    justify-content: center;
    width: 130px;
    font-family: gordita_medium;
    padding: 10px 15px;
    border-radius: 6px;
    background-color: #fff;
    color: #2334a7;
    font-size: 15px;
    margin-right: 25px;
    @media all and (max-width: 768px) {
        margin-right: 10px;
    }
    @media all and (max-width: 480px) {
        margin-top: 10px;
        width: 108px;
        padding: 4px;
        border-radius: 5px;
        font-size: 13px;
    }
`;
