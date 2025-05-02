import React, { useState } from "react";
import styled from "styled-components";
import Loader from "../general/loaders/Loader";
import ProfessionSkillCard from "./ProfessionSkillCard";

const ProfessionSkillTabContainer = ({
    skills,
    profession,
    loading,
    subject_slug,
}) => {
    const [color] = useState([
        "linear-gradient(#36d1dc,#5b86e5)",
        "linear-gradient(#ffafbd,#ffc3a0)",
        "linear-gradient(#2193b0,#6dd5ed)",
        "linear-gradient(#cc2b5e,#753a88)",
        "linear-gradient(#42275a,#734b6d)",
        "linear-gradient(#de6262,#ffb88c)",
        "linear-gradient(#06beb6,#48b1bf)",
        "linear-gradient(#eb3349,#f45c43)",
        "linear-gradient(#56ab2f,#a8e063)",
        "linear-gradient(#614385,#516395)",
        "linear-gradient(#02aab0,#00cdac)",
    ]);

    return (
        <>
            {loading ? (
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            ) : (
                <TabContainer>
                    <TabTitle>
                        <Title>Explore skills - {profession.name}</Title>
                    </TabTitle>
                    <TabContent>
                        {skills.map((data, index) => {
                            return (
                                <ProfessionSkillCard
                                    key={index}
                                    data={data}
                                    background={color[index]}
                                    subject_slug={subject_slug}
                                />
                            );
                        })}
                    </TabContent>
                </TabContainer>
            )}
        </>
    );
};

export default ProfessionSkillTabContainer;

const LoaderContainer = styled.div`
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;
const TabContainer = styled.div`
    margin-top: 30px;
    @media all and (max-width: 640px) {
        margin: 10px -31px 0;
        padding-left: 21px;
    }
    @media all and (max-width: 480px) {
        margin: 0;
        margin: 10px -31px 0;
    }
`;
const TabTitle = styled.div`
    margin-top: 30px;
    font-family: gordita_medium;
    @media all and (max-width: 480px) {
        margin-top: 15px;
    }
`;
const Title = styled.h3`
    font-size: 20px;

    @media all and (max-width: 480px) {
        font-size: 15px;
    }
`;
const TabContent = styled.div`
    margin-top: 19px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    /* padding-bottom: 25px; */
    @media all and (max-width: 768px) {
        grid-template-columns: 1fr;
    }
    @media all and (max-width: 680px) {
        display: flex;
        margin-top: 10px;
        overflow-y: scroll;
        gap: unset;
        &::-webkit-scrollbar {
            display: none;
        }
    }
`;
