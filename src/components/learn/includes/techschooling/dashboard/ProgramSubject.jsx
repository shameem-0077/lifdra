import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { learnConfig } from "../../../../../axiosConfig";
import Loader from "../general/loaders/Loader";
import SubjectModal from "../../profile/modals/SubjectModal";

function ProgramSubject() {
    const [subjects, setSubjects] = useState([]);
    const [isSubjectModal, setSubjectModal] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState({});
    const [isLoading, setLoading] = useState(true);
    const { user_data, user_profile } = useSelector((state) => state);
    const [gridColumns, setGridColumns] = useState("");

    const history = useHistory();
    useEffect(() => {
        if (user_profile.program.program_id) fetchData();
    }, [user_data, user_profile]);
    const fetchData = () => {
        let { access_token } = user_data;
        learnConfig
            .get(`learn/subjects/${user_profile.program?.program_id}/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((response) => {
                let { StatusCode, data } = response.data;
                if (StatusCode === 6000) {
                    setSubjects(data.subjects);
                    setGridColumns(
                        data.subjects.length === 3 || data.subjects.length === 2
                            ? data.subjects.length
                            : "4"
                    );
                    setLoading(false);
                }
                if (StatusCode === 6001) {
                    setLoading(false);
                }
            });
    };
    return (
        <MainContainer>
            <SubjectModal
                selectedSubject={selectedSubject}
                isSubjectModal={isSubjectModal}
                setSubjectModal={setSubjectModal}
            />

            {isLoading ? (
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            ) : (
                <Contains>
                    <h3>Subjects</h3>
                    <Contents count={gridColumns}>
                        {subjects
                            .sort((a, b) => a.order_id - b.order_id)
                            .map((item) => (
                                <CardContainer
                                    type={item.name}
                                    to={item.slug}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (item.is_started) {
                                            history.push(`/${item.slug}/`);
                                        } else {
                                            setSubjectModal(true);
                                        }
                                        setSelectedSubject(item);
                                    }}
                                >
                                    <GridTopBox type={item.name}>
                                        <Image
                                            src={item.top_image}
                                            alt="Image"
                                        />
                                    </GridTopBox>
                                    <ImageContainer>
                                        <Image
                                            src={item.icon_image}
                                            alt="Image"
                                        />
                                    </ImageContainer>

                                    <Title status={item.type}>
                                        {item.name}
                                    </Title>

                                    <Button to={item.link}>
                                        <Images
                                            src={item.arrow_image}
                                            alt="Image"
                                        />
                                    </Button>
                                    <GridBottomBox type={item.name}>
                                        <Image
                                            src={item.bottom_image}
                                            alt="Image"
                                        />
                                    </GridBottomBox>
                                </CardContainer>
                            ))}
                    </Contents>
                </Contains>
            )}
        </MainContainer>
    );
}

export default ProgramSubject;
const LoaderContainer = styled.div`
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;
const MainContainer = styled.div``;
const Contains = styled.div`
    padding-top: 25px;
    h3 {
        font-size: 21px;
        color: #000;
        font-family: "gordita_medium";
        @media (max-width: 480px) {
            font-size: 18px;
        }
    }
`;
const Contents = styled.div`
    display: grid;
    grid-template-columns: repeat(${(props) => props.count}, 1fr);
    grid-gap: 17px;
    padding-top: 10px;
    border-radius: 5px;
    @media (max-width: 980px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 640px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;
const CardContainer = styled(Link)`
    position: relative;
    border-radius: 7px;
    padding: 40px 30px;
    height: 276px;
    background-color: ${(props) =>
        props.type === "Tech Schooling"
            ? "#ecfded"
            : props.type === "Technology Fundamentals"
            ? "#fcf0e5"
            : props.type === "Academics Mentoring"
            ? "#e3f6fa"
            : "#f6e8f9"};
`;

const Title = styled.h3`
    font-family: "gordita_medium";
    font-size: 18px;
    margin-top: 20px;
    width: 50%;
    color: #373737;
    @media (max-width: 980px) {
        font-size: 16px;
    }
    @media all and (max-width: 480px) {
        font-size: 20px;
        width: unset;
    }
`;
const GridBottomBox = styled.div`
    position: absolute;
    bottom: 5px;
    right: ${(props) => (props.type === "tech" ? "0px" : "unset")};
    left: ${(props) => (props.type === "tech" ? "unset" : "0px")};
    width: 60px;
    display: block;
`;
const GridTopBox = styled.div`
    display: block;
    position: absolute;
    top: 5px;
    left: ${(props) => (props.type === "tech" ? "0px" : "unset")};
    right: ${(props) => (props.type === "tech" ? "240px" : "0px")};
    width: ${(props) =>
        props.type === "tech" || props.type === "mentoring" ? "60px" : "60px"};
    @media all and (max-width: 480px) {
        width: ${(props) =>
            props.type === "tech" || props.type === "mentoring"
                ? "100px"
                : "100px"};
    }
`;
const ImageContainer = styled.div`
    box-shadow: 4px 3px 19px #00000029;
    border-radius: 50%;
    width: 50px;
    display: block;
`;
const Image = styled.img`
    width: 100%;
    display: block;
`;
const Images = styled.img`
    width: 100%;
    display: block;
`;
const Button = styled(Link)`
    cursor: pointer;
    width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 60px;
`;
