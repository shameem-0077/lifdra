import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuthStore } from "../../../../../store/authStore";
import { Link } from "react-router-dom";
import { accountsConfig } from "../../../../../axiosConfig";
import Moment from "moment";
import RequestLoader from "../../authentication/general/RequestLoader";

function ProgramSubject() {
    const { user_data, updateUserData } = useAuthStore();
    const access_token = user_data?.access_token;
    const selectedEditingMyProfileData = user_data?.selected_editing_my_profile_data;

    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        if (access_token) {
            fetchSubjects();
        }
    }, [access_token]);

    const fetchSubjects = () => {
        setLoading(true);
        accountsConfig
            .get("/api/v1/users/get-student-subjects/", {
                headers: { Authorization: `Bearer ${access_token}` },
            })
            .then((response) => {
                setLoading(false);
                const { StatusCode, data } = response.data;
                if (StatusCode === 6000) {
                    setSubjects(data);
                } else {
                    setErrorMessage("Failed to fetch subjects");
                }
            })
            .catch((error) => {
                setLoading(false);
                setErrorMessage("Failed to fetch subjects");
            });
    };

    const handleSubjectClick = (subject) => {
        setLoading(true);
        accountsConfig
            .post(
                `/api/v1/users/update-student-subject/${subject?.id}/`,
                {
                    is_completed: !subject?.is_completed,
                },
                {
                    headers: { Authorization: `Bearer ${access_token}` },
                }
            )
            .then((response) => {
                setLoading(false);
                const { StatusCode, message } = response.data;
                if (StatusCode === 6000) {
                    fetchSubjects();
                } else {
                    setErrorMessage(message?.message);
                }
            })
            .catch((error) => {
                setLoading(false);
                setErrorMessage("Failed to update subject");
            });
    };

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    }, [errorMessage]);

    if (isLoading && subjects.length === 0) {
        return (
            <LoadingContainer>
                <RequestLoader height={40} />
            </LoadingContainer>
        );
    }

    return (
        <MainContainer>
            <Title>Program Subjects</Title>
            {subjects.map((subject) => (
                <SubjectContainer key={subject.id}>
                    <SubjectLeft>
                        <SubjectTitle>{subject.name}</SubjectTitle>
                        <SubjectDescription>{subject.description}</SubjectDescription>
                    </SubjectLeft>
                    <SubjectRight>
                        <SubjectStatus>
                            {subject.is_completed ? "Completed" : "Not Completed"}
                        </SubjectStatus>
                        <SubjectDate>
                            {subject.completed_date
                                ? Moment(subject.completed_date).format("DD MMM YYYY")
                                : "Not Started"}
                        </SubjectDate>
                    </SubjectRight>
                    <ActionContainer>
                        <ActionButton
                            onClick={() => handleSubjectClick(subject)}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <RequestLoader height={24} />
                            ) : subject.is_completed ? (
                                "Mark as Not Completed"
                            ) : (
                                "Mark as Completed"
                            )}
                        </ActionButton>
                        <ViewButton to={`/tech-schooling/subject/${subject.id}/`}>
                            View Subject
                        </ViewButton>
                    </ActionContainer>
                </SubjectContainer>
            ))}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </MainContainer>
    );
}

export default ProgramSubject;

const MainContainer = styled.div`
    width: 100%;
    padding: 20px;
`;

const Title = styled.h2`
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    font-family: "baloo_paaji_2semibold";
`;

const LoadingContainer = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SubjectContainer = styled.div`
    width: 100%;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SubjectLeft = styled.div`
    flex: 1;
`;

const SubjectTitle = styled.h3`
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
    font-family: "baloo_paaji_2semibold";
`;

const SubjectDescription = styled.p`
    font-size: 14px;
    color: #666;
    font-family: "gordita_regular";
`;

const SubjectRight = styled.div`
    text-align: right;
`;

const SubjectStatus = styled.div`
    font-size: 14px;
    color: #4ba870;
    margin-bottom: 5px;
    font-family: "gordita_medium";
`;

const SubjectDate = styled.div`
    font-size: 12px;
    color: #999;
    font-family: "gordita_regular";
`;

const ActionContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
`;

const ActionButton = styled.button`
    flex: 1;
    height: 40px;
    background: ${({ disabled }) => (disabled ? "#ccc" : "#4ba870")};
    color: #fff;
    border: none;
    border-radius: 5px;
    font-family: "baloo_paaji_2semibold";
    font-size: 14px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: ${({ disabled }) => (disabled ? "#ccc" : "#3d8c5c")};
    }
`;

const ViewButton = styled(Link)`
    flex: 1;
    height: 40px;
    background: #fff;
    color: #4ba870;
    border: 2px solid #4ba870;
    border-radius: 5px;
    font-family: "baloo_paaji_2semibold";
    font-size: 14px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: #f5f5f5;
    }
`;

const ErrorMessage = styled.div`
    font-size: 14px;
    color: #ff4d4f;
    margin-top: 10px;
    font-family: "gordita_regular";
`;
