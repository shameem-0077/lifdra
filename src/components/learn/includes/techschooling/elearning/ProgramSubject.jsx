import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuthStore } from "../../../../../store/authStore";
import { Link } from "react-router-dom";
import { serverConfig } from "../../../../../axiosConfig";
import Moment from "moment";
import RequestLoader from "../../authentication/general/RequestLoader";

const ProgramSubject = ({ subject, isOffline }) => {
    const { user_data, updateUserData } = useAuthStore();
    const access_token = user_data?.access_token;
    const selectedEditingMyProfileData = user_data?.selected_editing_my_profile_data;

    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubjectClick = () => {
        if (isOffline) {
            setErrorMessage("Check your network connection");
        } else {
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
                        updateUserData({ selected_editing_my_profile_data: {} });
                    } else {
                        setErrorMessage(message?.message);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    }, [errorMessage]);

    return (
        <MainContainer>
            <SubjectContainer>
                <SubjectLeft>
                    <SubjectTitle>{subject?.name}</SubjectTitle>
                    <SubjectDescription>{subject?.description}</SubjectDescription>
                </SubjectLeft>
                <SubjectRight>
                    <SubjectStatus>
                        {subject?.is_completed ? "Completed" : "Not Completed"}
                    </SubjectStatus>
                    <SubjectDate>
                        {subject?.completed_date
                            ? Moment(subject?.completed_date).format("DD MMM YYYY")
                            : "Not Started"}
                    </SubjectDate>
                </SubjectRight>
            </SubjectContainer>
            <ActionContainer>
                <ActionButton
                    onClick={handleSubjectClick}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <RequestLoader height={24} />
                    ) : subject?.is_completed ? (
                        "Mark as Not Completed"
                    ) : (
                        "Mark as Completed"
                    )}
                </ActionButton>
                <ViewButton to={`/tech-schooling/subject/${subject?.id}/`}>
                    View Subject
                </ViewButton>
            </ActionContainer>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </MainContainer>
    );
};

export default ProgramSubject;

const MainContainer = styled.div`
    width: 100%;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SubjectContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
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