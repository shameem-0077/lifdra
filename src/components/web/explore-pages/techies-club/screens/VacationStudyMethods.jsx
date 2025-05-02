import React, { useState } from "react";
import styled from "styled-components";
import auth from "../../../../routing/auth";
import { Link, useHistory, useLocation } from "react-router-dom";

function VacationStudyMethods() {
    const location = useLocation();
    const history = useHistory();
    const [methods, setMethods] = useState([
        {
            id: 1,
            heading: "കുറച്ചു സമയം കൂടുതൽ പഠനം ",
            description:
                "ഒരു ദിവസം ഒന്നു മുതൽ രണ്ടു മണിക്കൂർ വരെ മാത്രം പഠിച്ചാൽ മതി.",

            img: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/icon1.svg",
            path: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/path1.svg",
            res_arrow:
                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/drop-arrow-right.svg",
        },
        {
            id: 2,
            heading: "മലയാളത്തിലുള്ള ക്ലാസുകൾ",
            description:
                "സ്റ്റെയ്പ് പ്ലാറ്റ്ഫോമിലൂടെ കുട്ടികൾക്ക് എത്ര  തവണ വേണമെങ്കിലും കാണാൻ കഴിയുന്ന രീതിയിൽ മലയാളത്തിൽ തയ്യാറാക്കിയിരിക്കുന്ന ക്ലാസുകൾ.",
            img: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/icon2.svg",
            path: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/path2.svg",
            res_arrow:
                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/drop-arrow-left.svg",
        },
        {
            id: 3,
            heading: "എക്സ്പേർട്ട് എഞ്ചിനീയേർസിന്റെ ഡയറക്റ്റ് സപ്പോർട്ട്",
            description:
                "പഠന സമയത്തുള്ള നിങ്ങളുടെ സംശയങ്ങൾക്ക് അപ്പോൾ തന്നെ ഒരു എക്സ്പേർട്ട് എഞ്ചിനീയറുടെ സഹായം ലഭിക്കുന്ന രീതിയിലുള്ള സപ്പോർട്ട് സിസ്റ്റം.",
            img: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/icon3.svg",
            path: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/path3.svg",
            res_arrow:
                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/drop-arrow-right.svg",
        },
        {
            id: 4,
            heading: "കുട്ടികളുടെ പഠന പുരോഗതി കൃത്യമായി രക്ഷിതാക്കളിലേക്ക്",
            description:
                "കുട്ടികളുടെ ഓരോ ദിവസത്തെയും പഠന പുരോഗതി കൃത്യമായി സ്റ്റെയ്പ് ആപ്പിലൂടെ തന്നെ രക്ഷിതാക്കൾക്ക് മോണിറ്റർ ചെയ്യാനുള്ള സൗകര്യം.",

            img: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/icon4.svg",
            path: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/path4.svg",
            res_arrow:
                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/drop-arrow-left.svg",
        },
        {
            id: 5,
            heading: "പ്രാക്ടിക്കൽ ഇവാലുവേഷൻ",
            description:
                "പഠനത്തോടൊപ്പം തന്നെ പ്രാക്ടീസ് ചെയ്യാനും, നിശ്ചിത ഭാഗം കഴിയുമ്പോൾ വർക്ക്ഷോപ്പ്സ്, അസ്സെസ്സ്മെന്റ്സ് എന്നിവയിലൂടെ കുട്ടിയുടെ പഠന നിലവാരം ഉറപ്പു വരുത്തുവാനും കഴിയുന്ന രീതിയിലുള്ള സിസ്റ്റം.",

            img: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/icon5.svg",
            path: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/path5.svg",
            res_arrow:
                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/drop-arrow-right.svg",
        },
        {
            id: 6,
            heading: "ഓരോ പ്രൊഫഷൻ കഴിയുമ്പോഴും സർട്ടിഫിക്കറ്റ്",
            description:
                "ഓരോ പ്രൊഫഷനുകളും പൂർത്തിയാകുമ്പോൾ അത് കൃത്യമായി പരിശോധിച്ച് സർട്ടിഫിക്കറ്റുകൾ ഓൺലൈനായി പ്രോസസ്സ് ചെയ്യുന്നു.",

            img: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/21-01-2022/icon6.svg",
        },
    ]);

    return (
        <Container className="wrapper">
            {" "}
            <Title>
                <span>
                    <small>Steyp-</small>ന്റെ
                </span>
                <br />
                പഠനരീതികൾ പരിചയപ്പെടാം
            </Title>
            {/* <Content> Techies Club-ന്റെ പഠന രീതി പരിചയപെടാം.</Content> */}
            <MethodsContainer>
                {methods.map((data, index) => (
                    <MethodCard key={data.id}>
                        <ArrowPath className={`arrow${1 + index}`}>
                            <img src={data.path} alt="" />
                        </ArrowPath>
                        <DropArrow className={`down-arrow${1 + index}`}>
                            <img src={data.res_arrow} alt="" />
                        </DropArrow>
                        <Icon>
                            <img src={data.img} alt="" />
                        </Icon>
                        <Heading>{data.heading}</Heading>
                        <Description>{data.description}</Description>
                    </MethodCard>
                ))}
            </MethodsContainer>
            <SubscribeNow
                onClick={() => {
                    if (auth.isAuthenticated()) {
                        history.push({
                            pathname: location.pathname,
                            search: "?action=vacation-plans",
                        });
                    } else {
                        history.push({
                            pathname: location.pathname,
                            search: `?action=login&next=/mlp/vacation-program/?action=vacation-plans`,
                        });
                    }
                }}
            >
                Subscribe Now
            </SubscribeNow>
        </Container>
    );
}

export default VacationStudyMethods;

const Container = styled.div`
    position: relative;
    padding: 100px;
    background: #f4f5fa;
    border-radius: 30px;
    margin-top: 50px !important;
    @media all and (max-width: 1425px) {
    }
    @media all and (max-width: 1280px) {
        /* background-position: top right; */
        /* padding: 130px 100px 90px; */
        /* background-size: contain; */
    }
    @media all and (max-width: 768px) {
        padding: 80px 60px;
    }
    @media all and (max-width: 640px) {
        padding: 60px 60px;
        border-radius: 15px;
    }
    @media all and (max-width: 480px) {
        padding: 60px 20px;
    }
`;

const Title = styled.h2`
    font-family: "EGGIndulekhaUni";
    color: #2d2d2d;
    text-align: center;
    margin-bottom: 100px;
    font-size: 38px;
    span {
        color: #2334a7;
        small {
            font-family: gordita_bold;
        }
    }
    @media all and (max-width: 1280px) {
        margin-bottom: 80px;
    }
    @media all and (max-width: 768px) {
        margin-bottom: 60px;
    }
    @media all and (max-width: 640px) {
        margin-bottom: 50px;
        font-size: 30px;
    }
`;

const MethodsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    max-width: 1030px;
    margin: 0 auto;
    margin-bottom: 100px;
    @media all and (max-width: 768px) {
        justify-content: center;
        margin-bottom: 0px;
    }
`;

const MethodCard = styled.div`
    width: 45%;
    margin-bottom: 80px;
    position: relative;
    :nth-child(2n) {
        transform: translateY(100px);
    }
    @media all and (max-width: 768px) {
        width: 100%;
        :nth-child(2n) {
            transform: translateY(0px);
        }
    }
    @media all and (max-width: 480px) {
        margin-bottom: 50px;
    }
`;

const Icon = styled.span`
    display: block;
    width: 140px;
    margin: 0 auto;
    margin-bottom: 10px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 1280px) {
        width: 100px;
    }
    @media all and (max-width: 480px) {
        width: 80px;
    }
`;

const Heading = styled.h3`
    font-size: 22px;
    color: #2d2d2d;
    text-align: center;
    max-width: 200px;
    margin: 0 auto;
    font-family: "EGGIndulekhaUni";
    margin-bottom: 10px;
    @media all and (max-width: 480px) {
        max-width: 230px;
    }
`;
const Description = styled.p`
    font-size: 15px;
    color: #545454;
    text-align: center;
    max-width: 300px;
    margin: 0 auto;
    font-family: "Indulekha_regular";
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
`;

const ArrowPath = styled.span`
    display: block;
    width: 45%;
    position: absolute;
    img {
        display: block;
        width: 100%;
    }
    &.arrow1 {
        top: 75px;
        right: -30%;
    }
    &.arrow2 {
        top: 50%;
        left: -27%;
        width: 40%;
    }
    &.arrow3 {
        top: 32%;
        right: -26%;
        width: 40%;
    }
    &.arrow4 {
        top: 85%;
        left: -32%;
        width: 45%;
    }
    &.arrow5 {
        bottom: -50%;
        right: -25%;
        width: 50%;
    }
    @media all and (max-width: 768px) {
        display: none;
    }
`;
const DropArrow = styled.span`
    display: none;
    width: 40%;
    position: absolute;
    top: 70%;
    right: -10%;
    img {
        display: block;
        width: 100%;
    }
    &.down-arrow2,
    &.down-arrow4 {
        top: 70%;
        left: -10%;
    }
    @media all and (max-width: 768px) {
        display: block;
    }
    @media all and (max-width: 640px) {
        right: -25%;
        width: 50%;
        &.down-arrow2,
        &.down-arrow4 {
            top: 70%;
            left: -25%;
        }
    }
    @media all and (max-width: 480px) {
        right: -20%;
        width: 50%;
        top: 90%;
        &.down-arrow2,
        &.down-arrow4 {
            left: -20%;
        }
    }
`;

const SubscribeNow = styled.div`
    width: 220px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2334a7;
    margin: 0 auto;
    margin-top: 150px;
    color: #fff;
    font-family: gordita_medium;
    border-radius: 6px;
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
    @media all and (max-width: 768px) {
        width: 100%;
        margin-top: 0;
        max-width: 270px;
        height: 60px;
    }
    @media all and (max-width: 640px) {
        width: 100%;
        max-width: 250px;
        height: 50px;
    }
`;
