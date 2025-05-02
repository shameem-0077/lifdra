import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CopyModal from "../../../../merchandise/includes/modals/CopyModal";
// import ShareModal from "./ShareModal";

function SubscribeBanner({ is_explore }) {
    const { user_profile, userSubscriptionType, user_data } = useSelector((state) => state);
    const [isCopy, setIsCopy] = useState(false);
    const location = useLocation();
    const history = useHistory();

    const shareCode = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: "Join Steyp's Tech Schooling",
                    text: `Hey! Join Steyp, a tech schooling platform for Industry 4.0. Start learning now, from UI Engineering to Robotics Engineering. \nhttps://steyp.com/tech-schooling/`,
                    // url: `https://steyp.com/tech-schooling/`,
                })
                .then(() => console.log("Successful share"))
                .catch((error) => console.log("Error sharing", error));
        }
    };

    return (
        <>
            <CopyModal isCopy={isCopy} setIsCopy={setIsCopy} />
            <Banner>
                <Left>
                    <Title>കാത്തു നിൽക്കേണ്ട! ഇപ്പോൾ തന്നെ പഠിച്ചു തുടങ്ങാം</Title>
                    <Content>
                        ഏറ്റവും മികച്ച എഞ്ചിനീയർമാരുടെ ശിക്ഷണത്തിൽ മികച്ച സപ്പോർട്ടോടെ, പൂർണ്ണ
                        ആത്മവിശ്വാസത്തോടെ ഇപ്പോൾ തന്നെ പഠിച്ചു തുടങ്ങൂ!
                    </Content>
                    <DescriptionBottom>
                        <Subscribe
                            onClick={() => {
                                if (is_explore) {
                                    user_profile.subscription_data &&
                                    user_profile.subscription_data.expired_subscription
                                        ? history.push("/tech-schooling/subscribe/")
                                        : history.push("/");
                                } else {
                                    if (user_data.signup_type === "other") {
                                        history.push({
                                            pathname: location.pathname,
                                            search: `action=techschooling`,
                                        });
                                    } else {
                                        history.push({
                                            pathname: location.pathname,
                                            search: `action=login`,
                                        });
                                    }
                                }
                            }}
                        >
                            {is_explore
                                ? user_profile.subscription_data.expired_subscription
                                    ? "Renew Now"
                                    : "Go to Dashboard"
                                : "Subscribe Now"}
                        </Subscribe>
                        {window.innerWidth < 640 ? (
                            userSubscriptionType === "paid_subscription" && user_profile.id ? (
                                <Share onClick={shareCode}>
                                    <GreenShare
                                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/ongoing/share-button.png"
                                        alt="Share"
                                    />
                                </Share>
                            ) : (
                                <Share>
                                    <GrayShare
                                        // src={require("../../../../../assets/images/grayshare.svg")}
                                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/grayshare.svg
                                        "
                                        alt="grayIcon"
                                    />
                                </Share>
                            )
                        ) : (
                            <div
                                id="share"
                                text={`Hey! Join Steyp is an EdTech company, a beginning of the Digital University for Industry 4.0. \nhttps://steyp.com/tech-schooling/`}
                            >
                                <div id="toast">
                                    <img
                                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp/favicon.png"
                                        id="img"
                                        alt=""
                                    />
                                    <div id="desc">Copied!</div>
                                </div>
                                {userSubscriptionType === "paid_subscription" && user_profile.id ? (
                                    <Share onClick={() => setIsCopy(true)}>
                                        <GreenShare
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/ongoing/share-button.png"
                                            alt="Share"
                                        />
                                    </Share>
                                ) : (
                                    <Share>
                                        <GrayShare
                                            // src={require("../../../../../assets/images/grayshare.svg")}
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/grayshare.svg
                                            "
                                            alt="grayIcon"
                                        />
                                    </Share>
                                )}
                            </div>
                        )}
                    </DescriptionBottom>
                </Left>
                <Right>
                    <Image
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/subscribe-banner.svg"
                        alt="Arrow"
                    />
                </Right>
            </Banner>
        </>
    );
}

const Banner = styled.div`
    display: flex;
    justify-content: space-between;
    background: #dcf6ec;
    align-items: center;
    padding: 15px 60px;
    border-radius: 10px;
    @media all and (max-width: 980px) {
        padding: 25px 35px;
    }
    @media all and (max-width: 480px) {
        padding: 24px 29px;
    }
`;
const Left = styled.div``;
const Title = styled.h4`
    font-family: "EGGIndulekhaUni";
    font-size: 31px;
    font-weight: bold;
    letter-spacing: 0.2px;
    color: #0ab950;
    @media (max-width: 640px) {
        font-size: 26px;
    }
    @media (max-width: 400px) {
        font-size: 24px;
        margin-bottom: 9px;
    }
`;
const Content = styled.p`
    font-family: "EGGIndulekhaUni";
    font-size: 22px;
    line-height: 1.9rem;
    max-width: 650px;
    margin: 15px 0 25px 0;
    color: #2f2f2f;
    @media all and (max-width: 980px) {
        font-size: 19px;
        max-width: 650px;
        margin: 0px 0 11px 0;
    }
    @media (max-width: 640px) {
        font-size: 18px;
        line-height: 1.6rem;
    }
`;
const DescriptionBottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    margin-top: 20px;
    @media (max-width: 480px) {
        margin-top: 10px;
    }
`;
const Subscribe = styled.div`
    cursor: pointer;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 86px #00000017;
    border-radius: 39px;
    padding: 8px 38px;
    font-size: 18px;
    font-family: gordita_medium;
    letter-spacing: 0.19px;
    color: #11111c;
    opacity: 1;
    margin-right: 16px;
    @media all and (max-width: 1280px) {
        font-size: 14px;
    }
    @media (max-width: 420px) {
        padding: 8px 22px 8px 22px;
        font-size: 12px;
    }
`;
const Share = styled.span`
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    @media (max-width: 1280px) {
        width: 40px;
        height: 40px;
    }
`;
const GreenShare = styled.img`
    width: 100%;
    display: block;
    cursor: pointer;
`;
const GrayShare = styled.img`
    display: block;
    width: 100%;
    cursor: not-allowed;
`;
const Right = styled.div`
    @media all and (max-width: 640px) {
        display: none;
    }
`;
const Image = styled.img`
    display: block;
    width: 100%;
    border-radius: 6px;
`;

export default SubscribeBanner;
