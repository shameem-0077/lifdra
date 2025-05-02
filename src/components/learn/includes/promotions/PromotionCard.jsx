import React from "react";
import styled from "styled-components";
import Lightbox from "react-modal-image";
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactPlaceholder from "react-placeholder";

function mapStateToProps(state) {
    return {
        user_profile: state.user_profile,
    };
}

function PromotionCard({ data, user_profile, onCopy }) {
    const awesomePlaceholder = (
        <div className="my-awesome-placeholder">
            <ContainerDiv>
                <FirstDiv className="animation"></FirstDiv>
            </ContainerDiv>
        </div>
    );
    return (
        <ReactPlaceholder
            ready={data ? true : false}
            showLoadingAnimation={true}
            delay={1000}
            customPlaceholder={awesomePlaceholder}
        >
            <Container>
                <TopContainer>
                    <LoaderImage
                        small={data.image}
                        medium={data.image}
                        large={data.image}
                    />
                </TopContainer>
                <Social>
                    <IconLink
                        href={`${window.location.origin}/promotion/?r=${user_profile.id}&p=${data.id}&token=${user_profile.referral_code}`}
                    >
                        <WhatsappShareButton
                            title={data.description}
                            description={data.description}
                            url={`${window.location.origin}/promotion/?r=${user_profile.id}&p=${data.id}&token=${user_profile.referral_code}`}
                            image={data.image}
                            className="social-button"
                        >
                            <Icon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/social/whatsapp.svg"
                                alt=""
                            />
                        </WhatsappShareButton>
                    </IconLink>
                    <IconLink
                        href={`${window.location.origin}/promotion/?r=${user_profile.id}&p=${data.id}&token=${user_profile.referral_code}`}
                    >
                        <LinkedinShareButton
                            title={data.description}
                            description={data.description}
                            url={`${window.location.origin}/promotion/?r=${user_profile.id}&p=${data.id}&token=${user_profile.referral_code}`}
                            image={data.image}
                            className="social-button"
                        >
                            <Icon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/social/linkedin.svg"
                                alt=""
                            />
                        </LinkedinShareButton>
                    </IconLink>
                    <IconLink
                        href={`${window.location.origin}/promotion/?r=${user_profile.id}&p=${data.id}&token=${user_profile.referral_code}`}
                    >
                        <FacebookShareButton
                            title={data.description}
                            description={data.description}
                            url={`${window.location.origin}/promotion/?r=${user_profile.id}&p=${data.id}&token=${user_profile.referral_code}`}
                            image={data.image}
                            quote={"Steyp"}
                            hashtag="#steyp"
                            className="social-button"
                        >
                            <Icon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/social/facebook.svg"
                                alt=""
                            />
                        </FacebookShareButton>
                    </IconLink>
                    <IconLink
                        href={`${window.location.origin}/promotion/?r=${user_profile.id}&p=${data.id}&token=${user_profile.referral_code}`}
                    >
                        <TwitterShareButton
                            title={data.description}
                            description={data.description}
                            url={`${window.location.origin}/promotion/?r=${user_profile.id}&p=${data.id}&token=${user_profile.referral_code}`}
                            image={data.image}
                            className="social-button"
                        >
                            <Icon
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/social/twitter.svg"
                                alt=""
                            />
                        </TwitterShareButton>
                    </IconLink>
                    <IconLink
                        href={`${window.location.origin}/promotion/?r=${user_profile.id}&p=${data.id}&token=${user_profile.referral_code}`}
                        onClick={(e) => e.preventDefault()}
                    >
                        <CopyToClipboard
                            text={`${data.description + "\n\n"} ${
                                window.location.origin
                            }/promotion/?r=${user_profile.id}&p=${
                                data.id
                            }&token=${user_profile.referral_code}`}
                            onCopy={onCopy}
                        >
                            <Copy>
                                <i className="las la-copy"></i>
                            </Copy>
                        </CopyToClipboard>
                    </IconLink>
                </Social>
            </Container>
        </ReactPlaceholder>
    );
}

export default connect(mapStateToProps)(PromotionCard);

const Container = styled.div`
    transition: 0.4s ease-in-out;
    &:hover {
        box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
    }
`;
const TopContainer = styled.div``;
const LoaderImage = styled(Lightbox)`
    display: block;
    width: 100%;
    border-radius: 25px;
    overflow: hidden;
    @media only screen and (max-width: 768px) {
        border-radius: 10px;
    }
    @media only screen and (max-width: 480px) {
        border-radius: 5px;
    }
`;
const Social = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 17px;
`;
const IconLink = styled.a`
    display: inline-block;
`;
const Icon = styled.img`
    display: block;
    width: 25px;
`;
const Copy = styled.span`
    color: #000;
    display: flex;
    align-items: center;
    font-family: "product_sansbold";
    i {
        font-size: 25px;
    }
`;
const ContainerDiv = styled.div`
    width: 100%;
    & .animation {
        animation: placeHolderShimmer 2s linear 0s infinite normal;
        background: linear-gradient(
            to right,
            #eeeeee 8%,
            #eaeaea 18%,
            #eeeeee 33%
        );
        @keyframes placeHolderShimmer {
            0% {
                background-position: -468px 0;
            }
            100% {
                background-position: 468px 0;
            }
        }
    }
    @media (max-width: 640px) {
        padding: 52px 0px;
    }
    @media (max-width: 480px) {
        padding: 32px 0px;
        height: 240px;
    }
    @media (max-width: 360px) {
        height: 230px;
    }
`;
const FirstDiv = styled.div`
    height: 300px;
    width: 100%;
    border-radius: 20px;
`;
