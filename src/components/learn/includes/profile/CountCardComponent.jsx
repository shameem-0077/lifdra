import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { serverConfig } from "../../../../axiosConfig";

export default function CountCardComponent() {
    const user_data = useSelector((state) => state.user_data);
    const [counts, setCounts] = useState([]);
    const [AcademicsCounts] = useState([
        {
            id: 1,
            type: "practice",
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/practice.svg",
        },
        {
            id: 2,
            type: "workshop",
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/workshop.svg",
        },
        {
            id: 3,
            type: "support",
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/support.svg",
        },
        {
            id: 4,
            type: "assesment",
            icon: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/assessment.svg",
        },
    ]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        let { access_token } = user_data;
        learnConfig
            .get("general/student-activities-count/", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((response) => {
                let { StatusCode, data } = response.data;
                setCounts(data);
            });
    };
    return (
        <RightBottomContainer>
            {AcademicsCounts.map((data) => (
                <RightBottom key={data.id} type={data.type}>
                    <RightBottomTop>
                        <RightBottomIconContaner type={data.type}>
                            <RightBottomIcon alt="icon" src={data.icon} />
                        </RightBottomIconContaner>
                        <RightBottomCount type={data?.type}>
                            {data.type === "practice"
                                ? counts.practice_count
                                : data.type === "workshop"
                                ? counts.workshop_count
                                : data.type === "support"
                                ? counts.support_count
                                : data.type === "assesment"
                                ? counts.assessment_count
                                : null}
                        </RightBottomCount>
                    </RightBottomTop>
                    <RightBottomBottom>
                        {data.type === "practice"
                            ? "Practices attended"
                            : data.type === "workshop"
                            ? "Workshops attended"
                            : data.type === "support"
                            ? "Support requests"
                            : data.type === "assesment"
                            ? "Assessments attended"
                            : null}
                    </RightBottomBottom>
                </RightBottom>
            ))}
        </RightBottomContainer>
    );
}

const RightBottomContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.6em;

    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
    // @media (max-width: 360px) {
    //     padding: 0 14px 13px;
    // }
`;
const RightBottom = styled.div`
    background: ${(data) =>
        data.type === "practice"
            ? "#f0f4fe"
            : data.type === "workshop"
            ? "#f1fcf8"
            : data.type === "support"
            ? "#fdf6f9"
            : data.type === "assesment"
            ? "#fffbe7"
            : null};
    padding: 18px;
    border: 1px solid
        ${(data) =>
            data.type === "practice"
                ? "#c2d3fb"
                : data.type === "workshop"
                ? "#bcfbe5"
                : data.type === "support"
                ? "#FEEEF4"
                : data.type === "assesment"
                ? "#FFF1AF"
                : null};
    border-radius: 5px;
    @media (max-width: 640px) {
        // box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
        // background: #ffffff;
    }
`;
const RightBottomTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const RightBottomIconContaner = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: ${(data) =>
        data.type === "practice"
            ? "#c2d3fb"
            : data.type === "workshop"
            ? "#bcfbe5"
            : data.type === "support"
            ? "#FEEEF4"
            : data.type === "assesment"
            ? "#FFF1AF"
            : null};
    display: flex;
    align-items: center;
    justify-content: center;
`;
const RightBottomIcon = styled.img`
    display: block;
    width: 21px;
`;
const RightBottomCount = styled.span`
    font-family: "gordita_medium";
    font-size: 26px;
    color: ${(data) =>
        data.type === "practice"
            ? "#2680EB"
            : data.type === "workshop"
            ? "#15BF81"
            : data.type === "support"
            ? "#F7478C"
            : data.type === "assesment"
            ? "#F3C900"
            : null};
`;
const RightBottomBottom = styled.span`
    width: 100%;
    margin-top: 20px;
    display: block;
    letter-spacing: 0.01rem;
    text-align: right;
    font-size: 14px;
    font-family: "gordita_medium";
    color: #585c64;
    @media (max-width: 1440px) {
        line-height: 1.4rem;
    }
`;
