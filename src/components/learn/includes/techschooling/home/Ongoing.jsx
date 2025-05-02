import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import ReactPlaceholder from "react-placeholder";
import YTModal from "../general/YTModal";
import CopyModal from "../../../../merchandise/includes/modals/CopyModal";

export default function Ongoing({
    techSchooling,
    is_explore,
    isLoading,
    setLoading,
    setStatusModal,
}) {
    const [is_modal_active, setModalActive] = useState(false);
    const handleModal = () => {
        setModalActive((prev) => !prev);
    };
    const location = useLocation();
    const history = useHistory();

    const { user_profile, user_data, userSubscriptionType } = useSelector((state) => state);
    const [isCopy, setIsCopy] = useState(false);

    const launch_toast = () => {
        var x = document.getElementById("toast");
        x.className = "show";
        setTimeout(function () {
            x.className = x.className.replace("show", "");
        }, 2500);
        copy_to_clipboard();
    };
    const copy_to_clipboard = () => {
        const el = document.createElement("textarea");
        el.value = document.getElementById("share").getAttribute("text");
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    };

    const signupAction = () => {
        history.push({
            pathname: location.pathname,
            search: `action=techschooling`,
        });
    };

    const shareCode = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: "Join Steyp's Tech Schooling",
                    text: `Hey! Join Steyp,  an EdTech company, a beginning of the Digital University for Industry 4.0.  \nhttps://steyp.com/tech-schooling/`,
                    // url: `https://steyp.com/tech-schooling/`,
                })
                .then(() => console.log("Successful share"))
                .catch((error) => console.log("Error sharing", error));
        }
    };
    const VideoCard = () => {
        return (
            <LeftVideoCard onClick={handleModal}>
                <VideoImage
                    src={techSchooling.thumbnail}
                    onLoad={() => {
                        setLoading(false);
                    }}
                    alt="Image"
                />
                <Play>
                    <GreenPlay
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/ongoing/playgreen.png"
                        alt="Play"
                    />
                </Play>
            </LeftVideoCard>
        );
    };

    const awesomePlaceholder = (
        <ContainerDiv>
            <PlayButton className="las la-play-circle"></PlayButton>
        </ContainerDiv>
    );

    return (
        <Container>
            <CopyModal isCopy={isCopy} setIsCopy={setIsCopy} />

            <YTModal
                is_active={is_modal_active}
                setModalActive={setModalActive}
                videoUrl="https://youtu.be/oKiL9PC4i7o"
            />
            <ReactPlaceholder
                type="media"
                rows={3}
                ready={!isLoading}
                customPlaceholder={awesomePlaceholder}
            >
                {!isLoading && <VideoCard />}
            </ReactPlaceholder>
            <OngoingCard>
                <Description>
                    <Heading>എട്ടു വയസ്സു മുതൽ പഠിക്കാം</Heading>
                    <Content>
                        വെബ് ഡെവലപ്പ്മെന്റ് മുതൽ റോബോട്ടിക്‌സ് എഞ്ചിനിയറിംഗ് വരെ മലയാളത്തിൽ പഠിച്ച്
                        എക്സ്പർട്ട് എഞ്ചിനീയർ ആകാം!
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
                                        signupAction();
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

                        {/* {window.innerWidth < 640 ? (
                            <Share onClick={shareCode}>
                                <GreenShare
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/ongoing/share-button.png"
                                    alt="Share"
                                />
                            </Share>
                        ) : (
                            <div
                                id="share"
                                text={`Hey! Join Steyp, an EdTech company, a beginning of the Digital University for Industry 4.0. \nhttps://steyp.com/tech-schooling/`}
                            >
                                <div id="toast">
                                    <img
                                        alt=""
                                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/steyp/favicon.png"
                                        id="img"
                                    />
                                    <div id="desc">
                                        Your sharing link has been copied!
                                    </div>
                                </div> */}
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
                        {/* <Share onClick={(shareCode, launch_toast)}>
                            <GreenShare
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/ongoing/share-button.png"
                                alt="Share"
                            />
                        </Share> */}
                        {/* </div> */}
                        {/* )} */}
                    </DescriptionBottom>
                </Description>
                <Launch>
                    <LaunchImage
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/ongoing/ongoing.png"
                        alt="Launch"
                    />
                </Launch>
            </OngoingCard>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    margin: 65px 0;
    display: flex;
    justify-content: space-between;
    @media all and (max-width: 1270px) {
        align-items: center;
    }
    @media (max-width: 640px) {
        flex-wrap: wrap;
        margin: 45px 0;
    }
    @media (max-width: 640px) {
        flex-wrap: wrap;
        margin: 27px 0 32px;
    }
`;
const ContainerDiv = styled.div`
    height: 324px;
    width: 35%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, #eeeeee 8%, #eaeaea 18%, #eeeeee 33%);
    animation: placeHolderShimmer 2s linear 0s infinite normal;
    @keyframes placeHolderShimmer {
        0% {
            background-position: -468px 0;
        }
        100% {
            background-position: 468px 0;
        }
    }
    @media (max-width: 768px) {
        height: 248px;
        width: 32%;
    }
    @media (max-width: 640px) {
        width: 100%;
        margin-bottom: 20px;
    }
`;
const PlayButton = styled.span`
    font-size: 93px;
    color: #fff;
`;
const LeftVideoCard = styled.div`
    display: block;
    border-radius: 10px;
    position: relative;
    width: 35%;
    cursor: pointer;
    @media (max-width: 1280px) {
        width: 35%;
    }
    @media (max-width: 1270px) {
        margin-right: 0px;
        margin: 0 auto;
    }
    @media (max-width: 980px) {
        width: 35%;
        z-index: 5;
    }
    @media (max-width: 890px) {
        width: 37%;
        border: 3px solid white;
    }
    @media (max-width: 768px) {
        width: 45%;
    }
    @media (max-width: 640px) {
        width: 100%;
        margin-bottom: 20px;
    }
`;
const VideoImage = styled.img`
    width: 100%;
    display: block;
    border-radius: 10px;
`;
const Play = styled.span`
    display: block;
    width: 60px;
    height: 60px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
    @media (max-width: 890px) {
        width: 40px;
        height: 40px;
    }
    @media (max-width: 640px) {
        width: 70px;
        height: 70px;
    }
`;
const GreenPlay = styled.img`
    width: 100%;
    display: block;
`;
const OngoingCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #b4f1da91;
    width: 63.1%;
    border-radius: 10px;
    padding: 0px 40px 0px 40px;
    @media (max-width: 1270px) {
        padding: 30px 40px;
        position: relative;
    }
    @media (max-width: 980px) {
        margin-left: -17px;
    }
    @media (max-width: 890px) {
        margin-left: -30px;
        margin-right: 15px;
    }
    @media (max-width: 768px) {
        padding: 20px 30px 20px 60px;
        margin-left: -40px;
    }
    @media (max-width: 640px) {
        width: 100%;
        margin-left: 0px;
        margin-right: 0px;
        padding: 35px 22px;
    }
`;
const Description = styled.div`
    width: 80%;
    @media all and (max-width: 1100px) {
        width: 100%;
    }
`;
const Heading = styled.h2`
    text-align: left;
    font-family: "EGGIndulekhaUni";
    font-size: 31px;
    font-weight: bold;
    letter-spacing: 0.2px;
    color: #0ab950;
    opacity: 1;
    @media (max-width: 640px) {
        font-size: 26px;
    }
`;
const Content = styled.p`
    font-family: "EGGIndulekhaUni";
    font-size: 22px;
    line-height: 1.9rem;
    width: 92%;
    color: #2f2f2f;
    margin-top: 14px;
    @media (max-width: 890px) {
        width: 90%;
    }
    @media (max-width: 768px) {
        width: 100%;
        font-size: 20px;
    }
    @media (max-width: 640px) {
        margin-top: 10px;
        font-size: 18px;
        line-height: 1.6rem;
    }
`;
const DescriptionBottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    margin-top: 20px;
`;
const Subscribe = styled.span`
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
    }
`;
const Share = styled.span`
    display: block;
    width: 50px;
    height: 50px;
    cursor: pointer;
    border-radius: 50%;
    @media (max-width: 1280px) {
        width: 40px;
        height: 40px;
    }
`;
const GreenShare = styled.img`
    width: 100%;
    display: block;
`;
const GrayShare = styled.img`
    display: block;
    width: 100%;
    cursor: not-allowed;
`;
const Launch = styled.div`
    width: 35%;
    @media (max-width: 1270px) {
        width: 20%;
        position: absolute;
        right: -21px;
        bottom: -44px;
    }
    @media (max-width: 1110px) {
        z-index: 1;
    }
    @media (max-width: 890px) {
        width: 30%;
    }
    @media (max-width: 768px) {
        display: none;
    }
    @media (max-width: 480px) {
        width: 60%;
    }
`;
const LaunchImage = styled.img`
    width: 100%;
    display: block;
    transform: translateY(-106px);
    @media (max-width: 1665px) {
        transform: translateY(-96px);
    }
    @media (max-width: 1280px) {
        transform: translateY(-37px);
    }
`;
