import React from "react";
import styled from "styled-components";
import left_quote from "../../../../assets/images/prime-explore/left_quote.svg";
import right_quote from "../../../../assets/images/prime-explore/right_quote.svg";
import curve_line from "../../../../assets/images/prime-explore/curve_line.svg";
import arrow_right from "../../../../assets/images/prime-explore/arrow-right.svg";
import auth from "../../../routing/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function SubscriptionBanner() {
    const location = useLocation();
    const navigate = useNavigate();
    const { prime_program_subscription } = useSelector(
        (state) => state.user_profile
    );
    return (
        <Container
            onClick={(e) => {
                e.preventDefault();
                if (auth.isAuthenticated()) {
                    navigate(`/prime-programs/courses/?action=subscribe-prime-programs`);
                } else {
                    navigate(`${location.pathname}?action=login`);
                }
            }}
        >
            {prime_program_subscription?.is_expired ? (
                <>
                    <Web
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/19-03-2022/desktop-renew.svg"
                        alt="banner"
                    />
                    <Lap
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/19-03-2022/lap-renew.svg"
                        alt="banner"
                    />
                    <Tab
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/19-03-2022/tap-renew.svg"
                        alt="banner"
                    />
                    <Mobile
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/19-03-2022/mobile-renew.svg"
                        alt="banner"
                    />
                </>
            ) : (
                <>
                    <Web
                        src={require("../../../../assets/images/prime-explore/desktop.svg")}
                        alt="banner"
                    />
                    <Lap
                        src={require("../../../../assets/images/prime-explore/lap.svg")}
                        alt="banner"
                    />
                    <Tab
                        src={require("../../../../assets/images/prime-explore/tab.svg")}
                        alt="banner"
                    />
                    <Mobile
                        src={require("../../../../assets/images/prime-explore/mobile.svg")}
                        alt="banner"
                    />
                </>
            )}
        </Container>
    );
}

export default SubscriptionBanner;

const Cover = styled.div`
    background-color: #cdeccc;
    border-radius: 10px;
    cursor: pointer;
`;
const Container = styled.div`
    cursor: pointer;
`;
const Web = styled.img`
    display: block;
    width: 100%;
    cursor: pointer;
    @media all and (max-width: 1280px) {
        display: none;
    }
`;
const Lap = styled.img`
    display: none;
    width: 100%;
    @media all and (max-width: 1280px) {
        display: block;
    }
    @media all and (max-width: 768px) {
        display: none;
    }
`;
const Tab = styled.img`
    display: none;
    width: 100%;
    @media all and (max-width: 768px) {
        display: block;
    }
    @media all and (max-width: 360px) {
        display: none;
    }
`;
const Mobile = styled.img`
    display: none;
    width: 100%;
    @media all and (max-width: 360px) {
        display: block;
    }
`;
