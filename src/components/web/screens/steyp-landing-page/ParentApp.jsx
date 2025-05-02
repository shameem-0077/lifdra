import React from "react";
import styled from "styled-components";

function ParentApp() {
    return (
        <MainContainer>
            <Container className="wrapper">
                <Left>
                    <Heading>
                        Download<span> Parent App</span>
                    </Heading>

                    <Description>
                        Steyp's parent's app enables parents to monitor the
                        activities and learning outcomes of students on Steyp's
                        platform in real-time and makes it easier to direct them
                        accordingly. <br /> Parents can keep track of children
                        on their learning and their level of understanding of
                        each topic through the detailed evaluation reports
                        provided through this application.
                    </Description>
                    <AppSection>
                        <AppIcon
                            className="appStore"
                            href="https://apps.apple.com/in/app/steyp-parent/id1619318231"
                            target="_blank"
                        >
                            <img
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/parent-app-appstore.svg"
                                alt="app store"
                            />
                        </AppIcon>
                        <AppIcon
                            href="https://play.google.com/store/apps/details?id=com.steyp.parents"
                            target="_blank"
                        >
                            <img
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/parent-app-playstore.svg"
                                alt="play store"
                            />
                        </AppIcon>
                    </AppSection>
                </Left>
                <Right>
                    <ImageContainer className="image">
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/parent-app-image.png"
                            alt="parent app"
                        />
                    </ImageContainer>
                </Right>
                {/* <AppSectionBottom>
					<AppIcon className="appStore" to={"www.appstore.com"}>
						<img
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/parent-app-appstore.svg"
							alt="app store"
						/>
					</AppIcon>
					<AppIcon to={"www.playstore.com"}>
						<img
							src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/parent-app-playstore.svg"
							alt="play store"
						/>
					</AppIcon>
				</AppSectionBottom> */}
            </Container>
        </MainContainer>
    );
}

export default ParentApp;

const MainContainer = styled.div`
    margin-top: 100px;
    @media all and (max-width: 640px) {
        margin-top: 90px;
    }
    @media all and (max-width: 480px) {
        margin-top: 60px;
    }
`;
const Container = styled.div`
    padding: 0 70px;
    background-color: #f8f8f8;
    border-radius: 5px;
    background-image: url(${"https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/parent-app-background.svg"});
    background-repeat: no-repeat;
    background-position: left top;
    background-size: 45%;
    display: flex;
    flex-wrap: wrap;
    /* align-items: center; */
    @media all and (max-width: 980px) {
        padding: 40px;
        align-items: center;
    }
    @media all and (max-width: 768px) {
        padding: 70px 40px 10px;
    }
    @media all and (max-width: 640px) {
        padding: 50px 30px 0;
        width: 90%;
    }
    @media all and (max-width: 480px) {
        padding: 45px 20px 0;
        width: 90% !important;
    }
`;
const Left = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media all and (max-width: 768px) {
        width: 100%;
        padding-top: 0px;
    }
`;
const Right = styled.div`
    width: 50%;
    /* @media all and (max-width: 980px) {
		width: 100%;
	} */
    @media all and (max-width: 768px) {
        width: 100%;
        padding-top: 0px;
    }
`;
const Heading = styled.h4`
    font-size: 30px;
    font-family: gordita_medium;
    color: #2d2d2d;
    span {
        color: #0cbe62;
        @media all and (max-width: 980px) {
            margin-right: 5px;
        }
    }
    @media all and (max-width: 1280px) {
        font-size: 28px;
    }
    @media all and (max-width: 1080px) {
        font-size: 25px;
    }
    @media all and (max-width: 980px) {
        font-size: 28px;
        br {
            display: none;
        }
    }
    @media all and (max-width: 640px) {
        font-size: 26px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
    }
    @media all and (max-width: 360px) {
        font-size: 22px;
    }
`;
const Description = styled.p`
    color: #545454;
    font-size: 15px;
    font-family: "gordita_regular";
    /* max-width: 90%; */
    margin-top: 30px;
    @media all and (max-width: 980px) {
        max-width: unset;
    }
    @media all and (max-width: 640px) {
        font-size: 14px;
    }
    @media all and (max-width: 480px) {
        margin-top: 20px;
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
    }
`;
const ImageContainer = styled.div`
    width: 100%;
    /* margin-left: 75px; */
    @media all and (max-width: 980px) {
        margin-left: unset;
    }
    img {
        width: 100%;
        display: block;
    }
`;
const AppSection = styled.div`
    display: flex;
    margin-top: 30px;
    grid-gap: 12px;
`;
const AppIcon = styled.a`
    display: block;
    width: 170px;
    cursor: pointer;
    @media all and (max-width: 1280px) {
        width: 150px;
    }
    @media all and (max-width: 480px) {
        width: 40%;
    }
    &.appStore {
        margin-right: 25px;
        @media all and (max-width: 480px) {
            margin-right: unset;
            margin-bottom: 30px;
        }
    }
    img {
        width: 100%;
        display: block;
    }
`;
const AppSectionBottom = styled.div`
    width: 100%;
    @media all and (max-width: 980px) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    @media all and (max-width: 480px) {
        flex-direction: column;
    }
`;
