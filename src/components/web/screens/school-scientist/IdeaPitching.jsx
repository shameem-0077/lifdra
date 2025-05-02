import React, { useState } from "react";
import styled from "styled-components";
import IdeaButton from "../../../../components/web/screens/exam-screens/components/modals/IdeaButton";

function IdeaPitching() {
    const [malayalam, setMalayalam] = useState(false);

    const handleToggle = () => {
        setMalayalam(!malayalam);
    };

    const Ideas = [
        { id: 1, Desc: "Wearable location tracker during a disaster." },
        {
            id: 2,
            Desc: "IOT-Based Smart Waste Management System for Smart City.",
        },
        {
            id: 3,
            Desc: "In the agriculture sector usually farmers find it difficult to identify disease that causes on crops. It takes along time to identify the source by collecting the crops' specimens for testing.",
        },
        {
            id: 4,
            Desc: "Developing solutions, keeping in mind the need to enhance the primary sector of India - Agriculture and to manage and process our agricultural produce.",
        },
        {
            id: 5,
            Desc: " Develop an affordable app-based solution for Soil health monitoring and suggest which crop to be sown based on it. (Technology Bucket: IoT, AI, ML, etc.)",
        },
        {
            id: 6,
            Desc: "Develop an app-based solution for Cotton Crop health monitoring and suggest remedial actions. (Technology Bucket: IoT, UAVs, Satellite Imagery, AI, ML, etc.)",
        },
        {
            id: 7,
            Desc: "Develop smart & affordable solutions to protect crops from wild animals (Technology Bucket: IoT, UAV, AI, GPS, etc.)",
        },
        {
            id: 8,
            Desc: "Innovative product which facilitate easy and safe harvest in pepper, coffee, clove and nutmeg Early detection of red palm weevil attack in coconut.Develop smart & affordable solutions to protect crops from wild animals (Technology Bucket: IoT, UAV, AI, GPS, etc.)",
        },
        {
            id: 9,
            Desc: "Innovative ideas for vertical farming and hydroponics.",
        },
        {
            id: 10,
            Desc: "Early detection of red palm weevil attack in coconut.",
        },
    ];

    const MalayalamIdeas = [
        {
            id: 1,
            Desc: "ദുരന്ത സമയങ്ങളിൽ ആളുകളെ കണ്ടെത്തുന്നതിനും ജീവൻ രക്ഷിക്കുന്നതിനും ആവശ്യമായ ലൊക്കേഷൻ ട്രാക്കറുകൾ GB വികസിപ്പിക്കുക.",
        },
        {
            id: 2,
            Desc: "സ്മാർട്ട് സിറ്റിക്കായുള്ള IoT അടിസ്ഥാനമാക്കിയുള്ള സ്മാർട്ട് വേസ്റ്റ് മാനേജ്മെന്റ് സിസ്റ്റം.",
        },
        {
            id: 3,
            Desc: "കർഷകർക്ക് വിളകളെ ബാധിക്കുന്ന രോഗങ്ങളെ മുൻകൂട്ടി തിരിച്ചറിയുന്നതിനുള്ള പരിഹാരമാർഗ്ഗങ്ങൾ നിർദ്ദേശിക്കുക.",
        },
        {
            id: 4,
            Desc: "കാർഷിക ഉത്പന്നങ്ങൾ കൈകാര്യം ചെയ്യുന്നതിനും സംസ്കരിക്കുന്നതിനുമുള്ള പരിഹാരമാർഗ്ഗങ്ങൾ നിർദ്ദേശിക്കുക.",
        },
        {
            id: 5,
            Desc: "Soil health സംരക്ഷിക്കുന്നതിനായി ഒരു ആപ്ലിക്കേഷൻ വികസിപ്പിക്കുകയും ഏത് വിളയാണ് മണ്ണിന് യോജിച്ചതെന്ന് നിർദ്ദേശിക്കുകയും ചെയ്യുക.",
        },
        {
            id: 6,
            Desc: "പരുത്തി വിളകളുടെ ആരോഗ്യം സംരക്ഷിക്കുന്നതിനായി ഒരു App-based Solution ഡെവലപ് ചെയ്യുക.(Technology Bucket: IoT, UAVs, Satellite imagery, AI, ML, etc.)",
        },
        {
            id: 7,
            Desc: "വന്യമൃഗങ്ങളിൽ നിന്നും വിളകളെ സംരക്ഷിക്കുന്നതിനായി റിമോട്ട് സെൻസിംഗ് സാങ്കേതികവിദ്യയുടെ സഹായത്തോടെ പരിഹാരമാർഗ്ഗങ്ങൾ വികസിപ്പിക്കുക.",
        },
        {
            id: 8,
            Desc: "കുരുമുളക്, കാപ്പി, ഗ്രാമ്പൂ, ജാതിക്ക തുടങ്ങിയവയുടെ വിളവെടുപ്പ് എളുപ്പത്തിലും സുരക്ഷിതവുമായി  നടത്തുന്നതിന് സഹായിക്കുന്ന നൂതന ഉൽപ്പന്നം.",
        },
        {
            id: 9,
            Desc: "വെർട്ടിക്കൽ ഫാമിങ്ങ് ഹൈഡ്രോപോണിക്സ് എന്നീ കൃഷി രീതികൾക്കുള്ള നൂതന ആശയങ്ങൾ.",
        },
        {
            id: 10,
            Desc: "തെങ്ങിനെ ബാധിക്കുന്ന ചെമ്പൻ ചെല്ലിയുടെ ആക്രമണം നേരത്തേ കണ്ടെത്തൽ.",
        },
    ];

    return (
        <Cover>
            <WrapperContainer className="wrapper">
                <SubContainer>
                    <Top>
                        <Heading>Idea pitching topics</Heading>
                        <ToggleSection>
                            <MalayalamBtn malayalam={malayalam}>
                                Malayalam
                            </MalayalamBtn>
                            <IdeaButton
                                setMalayalam={setMalayalam}
                                onClick={handleToggle}
                            ></IdeaButton>

                            <EnglishBtn malayalam={malayalam}>
                                English
                            </EnglishBtn>
                        </ToggleSection>
                    </Top>

                    <Bottom>
                        {malayalam ? (
                            <Ul>
                                {Ideas.map((item) => (
                                    <Li key={item.id} className="green">
                                        <Down>
                                            <Para>{item.Desc}</Para>
                                        </Down>
                                    </Li>
                                ))}
                            </Ul>
                        ) : (
                            <Ul>
                                {MalayalamIdeas.map((item) => (
                                    <Li key={item.id} className="green">
                                        <Down>
                                            <Para>{item.Desc}</Para>
                                        </Down>
                                    </Li>
                                ))}
                            </Ul>
                        )}
                    </Bottom>
                </SubContainer>
            </WrapperContainer>
        </Cover>
    );
}

export default IdeaPitching;

// toggle

const ToggleSection = styled.div`
    display: flex;
    justify-content: end;

    /* align-items: center; */
    /* @media all and (max-width: 1280px) {
        width: 100%;
    }
    @media all and (max-width: 360px) {
        width: 94%;
    }
    @media all and (max-width: 768px) {
        width: 98%;
    } */
`;

const MalayalamBtn = styled.span`
    font-size: 14px;
    margin-right: 10px;

    color: ${({ malayalam }) => !malayalam && "#4fbe79"};
`;

const EnglishBtn = styled.span`
    font-size: 14px;
    margin-left: 34px;
    color: ${({ malayalam }) => malayalam && "#4fbe79"};
`;

//-------

const Cover = styled.div`
    background: url(${require("../../../../assets/images/school-scientist/categories-bg.png")});
    padding: 120px 0px;
    background-size: 90%;
    position: relative;
    @media all and (max-width: 980px) {
        padding: 60px 0px;
    }
    @media all and (max-width: 480px) {
        padding: 40px 0px;
    }
    ::before {
        content: "";
        display: inline-block;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/cloud-image.svg");
        width: 220px;
        height: 122px;
        position: absolute;
        background-size: 80%;
        background-repeat: no-repeat;
        top: -58px;
        right: 6%;
        @media all and (max-width: 768px) {
            background-size: 70%;
            right: 0;
        }
        @media all and (max-width: 640px) {
            display: none;
        }
    }
`;
const WrapperContainer = styled.div``;
const SubContainer = styled.div``;
const Top = styled.div`
    text-align: center;
    margin-bottom: 75px;
    @media all and (max-width: 1280px) {
        margin-bottom: 65px;
    }
    @media all and (max-width: 640px) {
        margin-bottom: 30px;
    }
`;
const Heading = styled.h2`
    font-size: 34px;
    font-family: "gordita_medium" !important;
    color: #023a7f;
    margin-bottom: 5px;
    @media all and (max-width: 640px) {
        font-size: 30px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
    }
`;
const Bottom = styled.div``;
const Ul = styled.ul`
    /* display: flex;
    flex-wrap: wrap;
    justify-content: center; */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 40px;
    grid-row-gap: 40px;
    @media all and (max-width: 1080px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media all and (max-width: 675px) {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(10, 1fr);
        grid-column-gap: 20px;
        grid-row-gap: 20px;
    }
`;
const Li = styled.li`
    /* margin-right: 64px; */
    /* width: 25%; */
    /* height: 350px; */
    padding: 32px 35px;
    box-shadow: 0px 5.05258px 118.736px rgba(0, 0, 0, 0.05);
    border-radius: 24px;
    position: relative;
    display: flex;
    align-items: center;

    justify-content: center;

    &.green {
        background: #d2f0e4;
        ::before {
            position: absolute;
            content: "";
            display: inline-block;
            width: 100px;
            height: 100px;
            top: -21%;
            z-index: -1;
            left: -9%;
            background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/rectangle.png");
            background-repeat: no-repeat;
            @media all and (max-width: 1280px) {
                background-size: 80%;
            }
            @media all and (max-width: 480px) {
                display: none;
            }
        }
        &:last-child {
            grid-area: 4 / 2 / 5 / 3;
            @media all and (max-width: 675px) {
                grid-area: 10 / 1 / 11 / 2;
            }
        }

        /* ::after {
            content: "";
            position: absolute;
            display: inline-block;
            width: 100px;
            height: 100px;
            background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-05-2023/01.svg");
            background-repeat: no-repeat;
            right: -14%;
            bottom: -39%;
            @media all and (max-width: 1280px) {
                background-size: 70%;
            }
            @media all and (max-width: 480px) {
                right: -20%;
                background-size: 50%;
                bottom: -43%;
            }
        } */
    }
`;
const Down = styled.div`
    text-align: center;
`;
const Para = styled.p`
    font-size: 18px;
`;
