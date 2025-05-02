import React from "react";
import styled from "styled-components";

export default function TechSchoolingSystem() {
    const reasons = [
        {
            image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/system1.svg",
            title: "Simplified E-learning Process",
            description: "Learning is made as easy as it comes. Learn wherever, whenever",
            color: "#e6eff6",
        },
        {
            image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/system2.svg",
            title: "Perfect Support System",
            description: "24x7 support for doubts and queries, because asking is learning",
            color: "#fbf8e3",
        },
        {
            image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/system3.svg",
            title: "Dedicated FollowUp System",
            description:
                "Helping hand and required assistance by dedicated Student Relationship Managers",
            color: "#eee8ef",
        },
        {
            image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/system4.svg",
            title: "Practice System",
            description:
                "To polish skills and become industry ready, timely practises are provided",
            color: "#e8ecee",
        },
        {
            image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/system5.svg",
            title: "Workshop System",
            description:
                "Apply and concrete yourself in the industry, with workshops conducted by expert engineers",
            color: "#eef4e7",
        },
        {
            image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/system6.svg",
            title: "Assessment System",
            description: "Evaluate and know where you stand with regular assessments",
            color: "#e0f4f3",
        },
        {
            image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/system7.svg",
            title: "Certification System",
            description: "Earn certificates on successfully completing a profession",
            color: "#e7eaf1",
        },
        {
            image: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/system8.svg",
            title: "Placement System",
            description: "Get placements in top MNCs with the help of the placement cell",
            color: "#fbf2e6",
        },
    ];
    return (
        <Container>
            <Title>Why Steyp's Tech Schooling</Title>
            <CardsContainer>
                {reasons.map((reason) => (
                    <Card key={reason.id} color={reason.color}>
                        <Left>
                            <CardTitle className="g-medium">{reason.title}</CardTitle>
                            <Description className="g-regular">{reason.description}</Description>
                        </Left>
                        <Image src={reason.image} />
                    </Card>
                ))}
            </CardsContainer>
        </Container>
    );
}

const Container = styled.div`
    background: #fbfbfb;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    padding: 45px 30px;
    text-align: center;
    @media (max-width: 1280px) {
        width: 100%;
    }
    @media (max-width: 768px) {
        padding: 35px 0;
    }
    @media (max-width: 480px) {
        padding: 32px 0;
    }
`;
const Title = styled.span`
    display: block;
    font-family: "gordita_medium";
    font-size: 30px;
    margin-bottom: 18px;
    @media (max-width: 1104px) {
        line-height: 2rem;
        font-size: 25px;
    }
    @media (max-width: 768px) {
        line-height: 2.2rem;
        font-size: 23px;
        width: 80%;
    }
    @media (max-width: 640px) {
        width: 71%;
        margin-bottom: 16px;
    }
    @media (max-width: 480px) {
        /* margin-bottom: 25px; */
        font-size: 21px;
        line-height: 1.4em;
        width: 86%;
        margin-bottom: 11px;
    }
`;
const CardsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;
const Card = styled.div`
    background-color: ${(props) => props.color};
    width: 49%;
    box-shadow: 0px 6px 15px #eff0f4;
    border-radius: 6px;
    display: flex;
    padding: 22px 35px;
    align-items: center;
    margin-bottom: 28px;
    justify-content: space-between;
    @media (max-width: 1440px) {
        width: 49%;
    }
    @media (max-width: 980px) {
        width: 80%;
        margin: 0 auto 20px;
        height: 100px;
    }
    @media (max-width: 640px) {
        width: 93%;
    }
    @media (max-width: 480px) {
        padding: 19px 21px;
        margin-bottom: 10px;
    }
`;
const Image = styled.img`
    display: block;
    @media (max-width: 480px) {
        display: none;
    }
`;
const Left = styled.div`
    text-align: left;
`;
const CardTitle = styled.span`
    font-size: 19px;
    display: block;
    @media (max-width: 1280px) {
        font-size: 18px;
        line-height: 1.4rem;
    }
    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
const Description = styled.p`
    font-size: 14px;
    @media (max-width: 480px) {
        font-size: 13px;
    }
`;
