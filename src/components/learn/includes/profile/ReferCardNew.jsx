import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import bg from "../../../../assets/images/profile/refer/background.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
    ToastsContainer,
    ToastsStore,
    ToastsContainerPosition,
} from "react-toasts";
import { WhatsappShareButton } from "react-share";
import { Link } from "react-router-dom";

function ReferCardNew() {
    const user_profile = useSelector((state) => state.user_profile);
    const [copySuccess, setCopySuccess] = useState(false);
    const [referralCode, setRefferalCode] = useState();
    const [inviteLink] = useState(
        `Hello!\n\nI'm ${
            user_profile.name
        }, Tech Schooling made coding a lot more easier for me. Start your coding classes by clicking on the link below. \n\nhttps://invite.steyp.com/?r=${
            user_profile.subscription_data
                ? user_profile.subscription_data.referral_code
                : ""
        } \n\nHappy coding!`
    );

    const handleCopy = (elem_id) => {
        const elem = document.getElementById(elem_id);
        if (elem_id === "certificateURL")
            elem.parentElement.classList.add("show");
        else elem.parentElement.classList.add("show");

        elem.focus();
        elem.setSelectionRange(0, 99999);
        elem.select();
        document.execCommand("copy");
        setTimeout(function () {
            if (elem_id === "certificateURL")
                elem.parentElement.parentElement.classList.remove("show");
            elem.parentElement.classList.remove("show");
        }, 2000);
    };

    return (
        <Container>
            <Description>
                You can buy products from Merchandise with the coins you earned
                on a <span>10% </span>commission based on the package chosen by
                your referral person
            </Description>
            <CopySection>
                <ReferCode
                    id="certificateURL"
                    className={
                        user_profile.subscription_data.is_paid_subscription &&
                        user_profile.subscription_data.referral_code
                            ? "active"
                            : null
                    }
                    value={
                        user_profile.subscription_data.referral_code
                            ? user_profile.subscription_data.referral_code
                            : "* * * * *"
                    }
                />

                {/* </ReferCode> */}
                {user_profile.subscription_data.is_paid_subscription ? (
                    <CodeShare>
                        <Icons onClick={() => handleCopy("certificateURL")}>
                            <IconImage
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/version-2.0/copy-color.svg"
                                alt=""
                            />
                        </Icons>
                        <Icons>
                            <WhatsappShareButton
                                url={inviteLink}
                                className="social-button"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    display: "flex",
                                }}
                            >
                                <IconImage
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/version-2.0/whatsapp-color.svg"
                                    alt=""
                                />
                            </WhatsappShareButton>
                        </Icons>
                        <ToolTipContainer x-placement="right">
                            <ToolTip>Copied!</ToolTip>
                        </ToolTipContainer>
                    </CodeShare>
                ) : (
                    <CodeShare>
                        <Icons style={{ cursor: "not-allowed" }}>
                            <IconImage
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/version-2.0/copy.svg"
                                alt=""
                            />
                        </Icons>
                        <Icons style={{ cursor: "not-allowed" }}>
                            <IconImage
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/version-2.0/whatsapp.svg"
                                alt=""
                            />
                        </Icons>
                    </CodeShare>
                )}
            </CopySection>
            <Explore to={"/merchandise/"}>Explore</Explore>
            <Image
                // src={require("../../../../assets/images/profile/refer/refer.png")}
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/refer.png
"
                alt=""
            />
        </Container>
    );
}

export default ReferCardNew;

const Container = styled.div`
    padding: 30px;
    // background: url() no-repeat;
    background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/background.png");
    background-size: cover;
    position: relative;
`;
const Description = styled.p`
    color: #484848;
    font-family: "gordita_regular";
    font-size: 14px;
    max-width: 400px;
    span {
        color: #15bf81;
        font-size: 14px;
    }
`;

const ReferCode = styled.input`
    height: 36px;
    display: flex;
    align-items: center;
    font-family: "gordita_regular";
    justify-content: center;
    width: 130px;
    border: 2px dashed #c5c5c5;
    border-radius: 4px;
    margin-right: 10px;
    color: #c5c5c5;
    // padding-top: 7px;
    text-align: center;
    font-size: 14px;
    cursor: default;
    &.active {
        color: #365b9b;
        border: 2px dashed #365b9b;
        padding: 0 !important;
        height: 40px;
        @media all and (max-width: 480px) {
            height: 32px;
        }
    }
    @media all and (max-width: 480px) {
        height: 32px;
    }
`;

const ToolTipContainer = styled.div`
    position: absolute;
    will-change: transform;
    top: 57px;
    transition: opacity 0.15s linear;
    opacity: 0;
    z-index: 99;
    &:before {
        content: "";
        position: absolute;
        top: -2px;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        width: 0;
        height: 0;
        margin-top: -6px;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-right: 6px solid #000;
        transform: rotate(90deg);
    }
    @media (max-width: 480px) {
        top: 45px;
    }
`;
const CopySection = styled.div`
    display: flex;
    align-items: center;
    margin-top: 15px;
    &.show ${ToolTipContainer} {
        opacity: 0.9;
    }
`;
const CodeShare = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    &.show ${ToolTipContainer} {
        opacity: 0.9;
    }
`;
const Icons = styled.span`
    width: 40px;
    height: 40px;
    margin-right: 10px;
    cursor: pointer;
    display: flex;
    &:last-child {
        margin-right: 0;
        // margin-left: 8px;
    }
    @media all and (max-width: 480px) {
        height: 32px;
        width: 32px;
    }

    &.social-button {
        width: 40px !important;
        height: 40px !important;
        @media all and (max-width: 480px) {
            height: 32px;
            width: 32px;
        }
    }
`;
const IconImage = styled.img`
    width: 100%;
    display: block;
`;
const Explore = styled(Link)`
    width: 150px;
    height: 40px;
    font-family: "gordita_medium";
    color: #fff;
    background-color: #15bf81;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    font-size: 18px;
    border-radius: 5px;
    @media all and (max-width: 480px) {
        font-size: 16px;
    }
`;

const Image = styled.img`
    width: 50%;
    max-width: 200px;
    position: absolute;
    right: 30px;
    bottom: 30px;
    @media all and (max-width: 700px) {
        max-width: 150px;
    }
    @media all and (max-width: 510px) {
        max-width: 100px;
        right: 10px;
        bottom: 10px;
    }
    @media all and (max-width: 375px) {
        max-width: 80px;
        right: 10px;
        bottom: 10px;
    }
`;

const ToolTip = styled.div`
    position: relative;
    max-width: 200px;
    padding: 3px 8px;
    color: #fff;
    text-align: center;
    background-color: #000;
    border-radius: 0.25rem;
    @media (max-width: 480px) {
        font-size: 14px;
    }
`;
