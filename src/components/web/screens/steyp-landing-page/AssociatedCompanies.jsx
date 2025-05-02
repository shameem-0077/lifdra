import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HiringModal from "../../inludes/general/steyp-landing-page/modal/HiringModal";

const AssociatedCompanies = () => {
    const [isModal, setModal] = useState(false);
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 2000,
        cssEase: "linear",
    };

    const infiniteScroll = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const chart = [
        {
            id: 1,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/red-high.svg",
            count: 15,
            label: "Companies",
        },
        {
            id: 2,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/blue-high.svg",
            count: 100,
            label: "placed",
        },
        {
            id: 3,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/yellow-high.svg",
            count: 100,
            label: "Interviews conducted",
        },
        {
            id: 4,
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/green-high.svg",
            count: 500,
            label: "currently enrolled",
        },
    ];

    const hireDeveloper = [
        {
            id: 1,
            title: "Selection",
            description: "Steyp selects the right candidates directly from campus",
        },
        {
            id: 2,
            title: "Training",
            description:
                "Candidates are trained by Steyp for the industry by employing them in real projects",
        },
        {
            id: 3,
            title: "Certification",
            description:
                "Using a 3 step verification, candidates are categorized based on their skillset.",
        },
        {
            id: 4,
            title: "Placement",
            description:
                "Steyp provides an automated dashboard for companies to select candidates by skill requirement, interview and hire.",
        },
    ];
    const handleModal = (data) => {
        setModal((prev) => !prev);
    };
    return (
        <Cover>
            <HiringModal isModal={isModal} handleModal={handleModal} />
            <Container
                className="wrapper"
                data-aos="fade-left"
                data-aos-duration="3000"
                data-aos-once="true"
            >
                <TopSection>
                    <LeftSection>
                        <Title>Placements in startups and MNCs</Title>
                        <Description>
                            Steyp has associated with various companies. We assure placement
                            assistance to get placed in those companies based on your interest and
                            performance, after successful completion of our program.
                        </Description>
                        <Charts>
                            {chart.map((data) => (
                                <ChartSection>
                                    <ChartIcon>
                                        <img src={data.icon} alt="" />
                                    </ChartIcon>
                                    <ChartDetails>
                                        <ChartCount>{data.count}+</ChartCount>
                                        <ChartLabel>{data.label}</ChartLabel>
                                    </ChartDetails>
                                </ChartSection>
                            ))}
                        </Charts>
                        <Button onClick={handleModal}>
                            Hire Developers{" "}
                            <span>
                                <img
                                    src={
                                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/right-side.svg"
                                    }
                                    alt=""
                                />
                            </span>
                        </Button>
                    </LeftSection>
                    <RightSection>
                        {/* <ImageCover></ImageCover> */}
                        <img
                            src={
                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/05-11-2021/company-logo.png"
                            }
                            alt=""
                        />
                        <FadeGradient></FadeGradient>
                        <FadeGradientRight></FadeGradientRight>
                        <FadeGradientTop></FadeGradientTop>
                        <FadeGradientBottom></FadeGradientBottom>
                    </RightSection>
                </TopSection>
                <BottomSection>
                    <Title className="bottom-title">How to hire developers through Steyp?</Title>
                    <ContentSection>
                        {hireDeveloper.map((data) => (
                            <ContentCard key={data.id}>
                                <ID>
                                    <span>{data.id}</span>
                                </ID>
                                <ContentTitle>{data.title}</ContentTitle>
                                <ContentDescription>{data.description}</ContentDescription>
                            </ContentCard>
                        ))}
                    </ContentSection>
                    <Button className="bottom" onClick={handleModal}>
                        Hire Developers{" "}
                        <span>
                            <img
                                src={
                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/right-side.svg"
                                }
                                alt=""
                            />
                        </span>
                    </Button>
                </BottomSection>
            </Container>
        </Cover>
    );
};

export default AssociatedCompanies;
const Cover = styled.div`
    background-color: #f8f8f8;
`;
const Container = styled.div`
    padding: 80px 0;
    @media all and (max-width: 1280px) {
        padding: 120px 0;
    }
    @media all and (max-width: 980px) {
        padding: 100px 0;
    }
    @media all and (max-width: 640px) {
        padding: 80px 0;
    }
    @media all and (max-width: 480px) {
        padding: 60px 0;
    }
    @media all and (max-width: 360px) {
        padding: 50px 0;
    }
`;
const TopSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media all and (max-width: 980px) {
        grid-template-columns: 1fr;
    }
`;
const LeftSection = styled.div`
    padding-right: 20px;
    @media all and (max-width: 980px) {
        margin-bottom: 60px;
    }
    @media all and (max-width: 768px) {
        margin-bottom: 40px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 30px;
    }
`;
const RightSection = styled.div`
    height: 100%;
    width: 100%;
    /* max-height: 400px; */
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
    img {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        /* width: 300%; */

        animation: slideshow 18s linear infinite;
    }
    @keyframes slideshow {
        0% {
            left: 0;
        }
        100% {
            left: -70%;
        }
    }
    @media all and (max-width: 980px) {
        height: 300px;
    }
    @media all and (max-width: 768px) {
        height: 250px;
    }
`;
const Title = styled.h3`
    font-family: gordita_medium;
    position: relative;
    font-size: 30px;
    margin-bottom: 30px;
    color: #2d2d2d;
    /* @media all and (max-width: 1280px) {
        font-size: 28px;
        margin-bottom: 20px;
    } */
    @media all and (max-width: 1280px) {
        font-size: 30px;
        margin-bottom: 25px;
    }
    @media all and (max-width: 768px) {
        font-size: 26px;
        /* margin-bottom: 25px; */
    }
    @media all and (max-width: 640px) {
        margin-bottom: 20px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
        margin-bottom: 15px;
    }
    @media all and (max-width: 360px) {
        font-size: 21px;
    }
    /* z-index: 3; */
`;
const Description = styled.p`
    font-size: 16px;
    width: 85%;
    @media all and (max-width: 1280px) {
        font-size: 15px;
    }
    @media all and (max-width: 980px) {
        font-size: 16px;
    }
    @media all and (max-width: 640px) {
        font-size: 14px;
        width: 100%;
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
    }
`;
const Charts = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 30px;
    margin-top: 30px;
`;
const ChartSection = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const ChartIcon = styled.span`
    width: 45px;
    display: block;
    margin-right: 15px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 1280px) {
        width: 40px;
    }
    @media all and (max-width: 980px) {
        width: 45px;
    }
    @media all and (max-width: 640px) {
        width: 38px;
    }
    @media all and (max-width: 480px) {
        width: 35px;
    }
    @media all and (max-width: 360px) {
        width: 30px;
        margin-right: 10px;
    }
`;
const ChartDetails = styled.span``;
const ChartCount = styled.p`
    font-family: gordita_medium;
    font-size: 20px;
    @media all and (max-width: 1100px) {
        font-size: 18px;
    }
    @media all and (max-width: 980px) {
        font-size: 20px;
    }
    @media all and (max-width: 640px) {
        font-size: 18px;
    }
    @media all and (max-width: 480px) {
        font-size: 16px;
    }
    @media all and (max-width: 360px) {
        font-size: 14px;
    }
`;
const ChartLabel = styled.p`
    font-size: 15px;
    @media all and (max-width: 1100px) {
        font-size: 15px;
    }
    @media all and (max-width: 980px) {
        font-size: 16px;
    }
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
    }
`;
const Button = styled.span`
    cursor: pointer;
    width: 200px;
    background-color: #0fa76f;
    font-size: 16px;
    color: #ffffff;
    font-family: gordita_medium;
    height: 50px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    transition: all 0.4s ease;
    span {
        width: 0;
        display: block;
        transition: all 0.4s ease;
        img {
            display: block;
            width: 100%;
            transition: all 0.4s ease;
        }
    }
    &:hover {
        width: 220px;
        span {
            width: 20px;
            margin-left: 10px;
        }
    }
    &.bottom {
        margin: 40px auto 0 !important;
    }
    @media all and (max-width: 480px) {
        width: 190px;
        height: 40px;
        font-size: 15px;
    }
`;
const BottomSection = styled.div`
    text-align: center;
    padding: 0 100px;
    padding-top: 120px;
    h3 {
        margin-bottom: 70px;
    }
    @media all and (max-width: 1280px) {
        padding: 0 70px;
        padding-top: 90px;
        h3 {
            margin-bottom: 50px;
        }
    }
    @media all and (max-width: 1100px) {
        padding: 0 50px;
        padding-top: 70px;
        h3 {
            margin-bottom: 40px;
            font-size: 26px;
        }
    }

    @media all and (max-width: 768px) {
        padding: 70px 0 0;
    }
    @media all and (max-width: 480px) {
        padding: 50px 0 0;
    }
    @media all and (max-width: 360px) {
        padding: 40px 0 0;
        h3 {
            font-size: 23px;
            margin-bottom: 30px;
        }
    }
`;
const ContentSection = styled.div`
    text-align: left;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 50px;
    @media all and (max-width: 1280px) {
        grid-gap: 30px;
    }
    @media all and (max-width: 980px) {
        grid-template-columns: 1fr 1fr;
        padding: 0 10%;
    }
    @media all and (max-width: 768px) {
        padding: 0 5%;
    }
    @media all and (max-width: 400px) {
        grid-template-columns: 1fr;
    }
`;
const ContentCard = styled.div``;
const ID = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 26px;
    height: 26px;

    background-color: #3b3b3b;
    border-radius: 50%;
    margin-bottom: 10px;
    line-height: 10px;
    span {
        font-size: 12px;
        transform: translateY(2px);
        color: #fff;
        font-family: gordita_medium;
    }
    @media all and (min-width: 1550px) {
        transform: translateY(0px);
    }
    @media all and (max-width: 480px) {
        width: 22px;
        height: 22px;

        span {
            font-size: 10px;
            transform: translateY(1px);
        }
    }
`;
const ContentTitle = styled.h4`
    font-family: gordita_medium;
    font-size: 18px;
    color: #2d2d2d;
    margin-bottom: 10px;
    @media all and (max-width: 1100px) {
        font-size: 16px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
`;
const ContentDescription = styled.p`
    font-size: 14px;
    @media all and (max-width: 1100px) {
        font-size: 13px;
    }
    @media all and (max-width: 480px) {
        font-size: 12px;
    }
`;
const ImageCover = styled.div`
    /* animation: moveSlideshow 12s linear infinite;

    @keyframes moveSlideshow {
        100% {
            transform: translateX(-66.6666%);
        }
    } */
`;
const FadeGradient = styled.div`
    width: 20px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;

    background: linear-gradient(90deg, rgba(248, 248, 248, 1) 0%, rgba(245, 248, 248, 0.2) 100%);
    background: -webkit-linear-gradient
        (90deg, rgba(248, 248, 248, 1) 0%, rgba(0, 212, 255, 0) 100%);
`;
const FadeGradientRight = styled.div`
    width: 20px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(90deg, rgba(245, 248, 248, 0.2) 0%, rgba(248, 248, 248, 1) 100%);
    background: -webkit-linear-gradient
        (90deg, rgba(0, 212, 255, 0) 0%, rgba(248, 248, 248, 1) 100%);
`;

const FadeGradientTop = styled.div`
    width: 100%;
    height: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(0deg, rgba(248, 248, 248, 1) 0%, rgba(245, 248, 248, 0.2) 100%);
    background: -webkit-linear-gradient
        (0deg, rgba(248, 248, 248, 1) 0%, rgba(245, 248, 248, 0.2) 100%);
`;
const FadeGradientBottom = styled.div`
    width: 100%;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(0deg, rgba(245, 248, 248, 0.2) 0%, rgba(248, 248, 248, 1) 100%);
    background: -webkit-linear-gradient
        (0deg, rgba(245, 248, 248, 0.2) 0%, rgba(248, 248, 248, 1) 100%);
`;
