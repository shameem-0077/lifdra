import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import EnterYourDetails from "./EnterYourDetails";

function AddTeamMember({
    setHeadContent,
    HeadContent,
    progamType,
    userName,
    setUserName,
    mobile,
    setMobile,
    campus,
    setCampus,
    isCoumputer,
    setComputer,
    setDivision,
    division,
    setStudentClass,
    studentClass,
    isError,
    setError,
    submitData,
    submitMembers,
    updateData,
    setUpdateData,
    errorMsg,
    setErrorMsg,
}) {
    const { school_scientist_members } = useSelector((state) => state);

    const [members, setMembers] = useState([]);
    useEffect(() => {
        setMembers(school_scientist_members);
    }, [updateData]);
    return (
        <>
            <MembersSection>
                {members?.length > 0 &&
                    members.map((men, index) => (
                        <MemberContainer key={index}>
                            <MemberHeading>Member {index + 1}</MemberHeading>
                            <MemberDetails>
                                <NameSection>
                                    <NameLogoContainer>
                                        {men.name
                                            .split(" ")
                                            .map((word) => word.charAt(0))
                                            .join(" ")
                                            .toUpperCase()}
                                    </NameLogoContainer>
                                    <MemberName>{men.name}</MemberName>
                                </NameSection>
                                <OptionSection>
                                    {/* <EditBtn>
                                        <img
                                            src={require("../../../../../assets/images/school-scientist/Edit.svg")}
                                            alt=""
                                        />
                                    </EditBtn>
                                    <DeleteBtn>
                                        <img
                                            src={require("../../../../../assets/images/school-scientist/Delete.svg")}
                                            alt=""
                                        />
                                    </DeleteBtn> */}
                                </OptionSection>
                            </MemberDetails>
                        </MemberContainer>
                    ))}
            </MembersSection>
            {members?.length < 3 && (
                <EnterYourDetails
                    button={true}
                    HeadContent={HeadContent}
                    progamType={progamType}
                    userName={userName}
                    setUserName={setUserName}
                    mobile={mobile}
                    setMobile={setMobile}
                    campus={campus}
                    setCampus={setCampus}
                    isCoumputer={isCoumputer}
                    setComputer={setComputer}
                    setDivision={setDivision}
                    division={division}
                    setStudentClass={setStudentClass}
                    studentClass={studentClass}
                    isError={isError}
                    setHeadContent={setHeadContent}
                    submitData={submitData}
                    setError={setError}
                    updateData={updateData}
                    setUpdateData={setUpdateData}
                    errorMsg={errorMsg}
                    setErrorMsg={setErrorMsg}
                />
            )}
            <Bottom
                onClick={() => {
                    if (members.length >= 2) {
                        submitMembers();
                    }
                }}
            >
                <ModalButton>Next</ModalButton>
            </Bottom>
        </>
    );
}

export default AddTeamMember;

const MembersSection = styled.div`
    padding-bottom: 30px;
`;
const MemberContainer = styled.div`
    padding-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #d9d9d9;
`;
const NameLogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f6f9;
    border: 1px solid #ebecf0;
    border-radius: 50%;
    width: 65px;
    height: 65px;
    margin-right: 12px;
`;
const MemberHeading = styled.h3`
    margin-bottom: 18px;
`;
const MemberDetails = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const MemberName = styled.h4`
    color: #0a0a0a;
`;
const EditBtn = styled.div`
    cursor: pointer;
    width: 60%;
    margin-right: 16px;
    img {
        width: 100%;
        display: block;
    }
`;
const DeleteBtn = styled.div`
    cursor: pointer;
    width: 60%;
    img {
        width: 100%;
        display: block;
    }
`;
const NameSection = styled.div`
    display: flex;
    align-items: center;
`;
const OptionSection = styled.div`
    display: flex;
    align-items: center;
`;
const AddMember = styled.div`
    display: flex;
    align-items: center;
`;
const AddIcon = styled.div`
    cursor: pointer;
    width: 4%;
    margin-right: 10px;
    img {
        width: 100%;
        display: block;
    }
`;
const AddText = styled.h4`
    color: #2d2d2d;
    font-weight: 600;
    font-size: 18px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: end;
`;
const ModalButton = styled.button`
    background: linear-gradient(127.01deg, #0fa76f -9.18%, #0f9ea7 129.96%);
    padding: 16px 44px;
    color: #fff;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
`;
