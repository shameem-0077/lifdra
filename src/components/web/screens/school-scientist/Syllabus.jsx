import styled from "styled-components";
import React, { useState } from "react";
// import HsSyllabus from "./HsSyllabus";
// import HssSyllabus from "./HssSyllabus";

function Syllabus() {
    const [science, setSeience] = useState(false);
    const [maths, setMaths] = useState(false);

    return (
        <Cover>
            <WrapperContainer className="wrapper">
                <Heading>Quiz Syllabus</Heading>
                <SubContainer>
                    <HeadCover>
                        <MinHeading>
                            <b>Junior & Senior</b>
                        </MinHeading>
                    </HeadCover>
                    <ListCover>
                        <ItemCard>
                            {/* <SubList>
                                <TopListhead>
                                    <ListHeading>
                                        <ImageContiner>
                                            <img
                                                src={
                                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/syllabus.svg"
                                                }
                                                alt=""
                                            />
                                        </ImageContiner>
                                    </ListHeading>
                                    <ListSubheding>SCIENCE</ListSubheding>
                                </TopListhead>
                                <DivContainer>
                                    <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>
                                            Energy Sources
                                        </SudLanguage>
                                    </BottomSubitems>
                                    <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>
                                            Space - A World of Wonders
                                        </SudLanguage>
                                    </BottomSubitems>

                                    <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>
                                            Along with Motion
                                        </SudLanguage>
                                    </BottomSubitems>
                                    <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>
                                            Moon and Stars
                                        </SudLanguage>
                                    </BottomSubitems>
                                    <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>
                                            When Current Flows
                                        </SudLanguage>
                                    </BottomSubitems>
                                    <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>
                                            For a Pollution Free Nature
                                        </SudLanguage>
                                    </BottomSubitems>
                                </DivContainer>
                            </SubList> */}
                            <SubList>
                                <TopListhead>
                                    <ListHeading>
                                        <ImageContiner>
                                            <img
                                                src={require("../../../../assets/images/school-scientist/world-logo.svg")}
                                            />
                                        </ImageContiner>
                                    </ListHeading>
                                    <ListSubheding>Environment</ListSubheding>
                                </TopListhead>
                                <DivContainer className={maths ? "maths" : ""}>
                                    <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>
                                            Waste Management{" "}
                                        </SudLanguage>
                                    </BottomSubitems>

                                    <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>
                                            Environmental Day
                                        </SudLanguage>
                                    </BottomSubitems>
                                    <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>
                                            Global Warming
                                        </SudLanguage>
                                    </BottomSubitems>

                                    <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>Pollution</SudLanguage>
                                    </BottomSubitems>
                                    <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>
                                            Energy Sources
                                        </SudLanguage>
                                    </BottomSubitems>
                                    {/* <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>
                                            Repeated Multiplication
                                        </SudLanguage>
                                    </BottomSubitems>
                                    <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>
                                            Area of a Triangle
                                        </SudLanguage>
                                    </BottomSubitems> */}
                                </DivContainer>
                                {/* <SpanCover onClick={() => setMaths(!maths)}>
                                    <SpanList>
                                        {maths ? "View less" : "View more"}
                                    </SpanList>
                                    <SpanArrow>
                                        <img
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/arrow-black.svg"
                                            alt=""
                                        />
                                    </SpanArrow>
                                </SpanCover> */}
                            </SubList>
                            <SubList>
                                <TopListhead>
                                    <ListHeading>
                                        <ImageContiner>
                                            <img
                                                src={
                                                    "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/syllabus3.svg"
                                                }
                                                alt=""
                                            />
                                        </ImageContiner>
                                    </ListHeading>
                                    <ListSubheding>
                                        TECHNOLOGY & ENGINEERING
                                    </ListSubheding>
                                </TopListhead>
                                <DivContainer style={{ marginBottom: "0" }}>
                                    <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>
                                            Information Technology
                                        </SudLanguage>
                                    </BottomSubitems>
                                    <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>
                                            Artificial Intelligence
                                        </SudLanguage>
                                    </BottomSubitems>
                                    <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>Robotics</SudLanguage>
                                    </BottomSubitems>
                                    <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>
                                            Programming & Coding
                                        </SudLanguage>
                                    </BottomSubitems>
                                    <BottomSubitems>
                                        <Subitemnumber></Subitemnumber>
                                        <SudLanguage>
                                            Internet of Things (IoT)
                                        </SudLanguage>
                                    </BottomSubitems>
                                </DivContainer>
                            </SubList>
                        </ItemCard>
                    </ListCover>
                </SubContainer>
                {/* <HsSyllabus />
				<HssSyllabus /> */}
            </WrapperContainer>
        </Cover>
    );
}

export default Syllabus;

const Cover = styled.div`
    background: #f8f4f0;
    background-image: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-01-2023/Our-syllabus.svg");
    padding: 120px 0px;
    background-color: #f8f4f0;
    background-size: 100%;
    background-position-x: 176px;
    background-position-y: -56px;
    @media all and (max-width: 980px) {
        padding: 60px 0px;
    }
    @media all and (max-width: 480px) {
        padding: 40px 0px;
    }
`;
const WrapperContainer = styled.div``;
const Heading = styled.div`
    text-align: center;
    font-family: "gordita_medium";
    font-size: 32px;
    color: #034086;
    margin-bottom: 80px;
    @media all and (max-width: 768px) {
        margin-bottom: 40px;
    }
    @media all and (max-width: 480px) {
        font-size: 24px;
        margin-bottom: 30px;
    }
`;
const SubContainer = styled.div`
    margin-bottom: 30px;
`;
const DivContainer = styled.div`
    height: 230px;
    overflow: hidden;
    transition: all 0.4s ease;
    margin-bottom: 30px;
    /* position: relative; */
    &.maths {
        height: 307px;
        /* position: absolute; */
        /* z-index: 3/; */
    }
`;
const SpanCover = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
`;
const SpanList = styled.div`
    color: #2d2d2d;
    font-family: "gordita_medium";
    font-size: 16px;
    margin-right: 10px;
    line-height: 18px;
`;
const SpanArrow = styled.div`
    img {
        width: 100%;
        display: block;
    }
`;
const HeadCover = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px 20px 10px;
    gap: 10px;
    width: 239px;
    height: 57px;
    background: #efe7d7;
    border-radius: 24px 24px 0px 0px;
    margin-bottom: 8px;
    margin-left: 150px;
    @media all and (max-width: 768px) {
        margin-left: auto;
        margin-right: auto;
    }
`;
const MinHeading = styled.div`
    font-size: 24px;
    font-family: "gordita_medium";
    text-align: center;
    color: #2d2d2d;
`;
const ListCover = styled.div`
    padding: 4%;
    width: 90%;
    margin: 0 auto;
    display: grid;
    background: #f5eedf;
    border-radius: 24px;
    @media all and (max-width: 320px) {
        width: 103%;
    }
`;

const ItemCard = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    flex-wrap: wrap;
`;
const SubList = styled.div`
    width: 47%;
    margin: 0 auto;
    border-radius: 24px;
    padding: 32px 24px;
    border-width: 3px;
    border-style: solid;
    border: 1px solid #eec749;

    &:hover {
        background-color: #f5e7c0;
        border-width: 1px;
        border-style: solid;
        border-radius: 24px;
        transition: background-color 0.3s ease-in-out;
    }
    @media all and (max-width: 1080px) {
        width: 100%;
        margin-bottom: 20px;
    }
`;
const TopListhead = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 24px;
`;
const ListHeading = styled.div``;
const ListSubheding = styled.h5`
    text-transform: uppercase;
    color: #0a0a0a;
    font-size: 20px;
    margin-left: 6px;
    font-family: "gordita_medium";
    @media all and (max-width: 320px) {
        font-size: 15px;
    }
`;
const BottomSubitems = styled.div`
    display: flex;
    margin-top: 10px;
    align-items: center;
`;
const Subitemnumber = styled.span`
    min-width: 8px;
    height: 8px;
    background-color: #2d2d2d;
`;
const SudLanguage = styled.p`
    color: #2d2d2d;
    font-size: 18px;
    margin-left: 10px;
    @media all and (max-width: 480px) {
        font-size: 16px;
    }
`;
const ImageContiner = styled.div`
    width: 70%;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 320px) {
        width: 85%;
    }
`;
