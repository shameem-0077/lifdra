import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import TalropEdtechHelmet from "../../../helpers/TalropEdtechHelmet";
import ReferInfo from "../../includes/profile/referAndEarn/ReferInfo";
import ReferCardNew from "../../includes/profile/ReferCardNew";
import ReferCard from "../../includes/profile/version-2.0/ReferCard";
import AllReferals from "./AllReferals";
import queryString from "query-string";

function ReferAndEarn() {
    const [height, setHeight] = useState(0);
    const { param } = useParams();

    // useEffect(() => {
    //     //responsive scroll function

    //     console.log(
    //         "-----------------#main.responsive-mini-------------------------------------------"
    //     );
    //     let comp = document.getElementById("main");
    //     const responsiveScroll = () => {
    //         console.log(
    //             "response scroll+++++++++++++++++++++++++++",
    //             comp.innerWidth,
    //             document.documentElement
    //         );
    //         if (comp.innerWidth <= 768) {
    //             if (
    //                 comp.innerHeight + document.documentElement.scrollTop + 1 >=
    //                 document.documentElement.offsetHeight
    //             ) {
    //                 // if (currentPage < totalPages) {
    //                 // setCurrentPage((current) => current + 1);
    //                 // }
    //             }
    //         }
    //     };

    //     comp.addEventListener("scroll", responsiveScroll);
    //     return () => {
    //         comp.removeEventListener("scroll", responsiveScroll);
    //     };
    // }, []);

    return (
        <>
            <TalropEdtechHelmet title="Refer and Earn" />
            <Container id="responsiveScroller">
                {/* <Title>Refer and Earn</Title> */}
                <Cover>
                    {/* <ReferCardNew /> */}
                    <BottomSection>
                        <LeftSide>
                            <ReferInfo />
                        </LeftSide>
                        <RightSide>
                            <AllReferals height={height} search={param} />
                        </RightSide>
                    </BottomSection>
                </Cover>
            </Container>
        </>
    );
}

export default ReferAndEarn;

const Container = styled.div``;
const Title = styled.h2`
    font-family: "gordita_medium";
    font-size: 26px;
    margin-bottom: 10px;
    @media all and (max-width: 480px) {
        font-size: 22px;
    }
`;
const Cover = styled.div``;
const BottomSection = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 20px;
    @media all and (max-width: 1050px) {
        grid-template-columns: 1fr;
    }
    @media all and (max-width: 980px) {
        grid-template-columns: 1fr 2fr;
    }
    @media all and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;
const LeftSide = styled.div`
    min-width: 280px;
`;
const RightSide = styled.div``;
