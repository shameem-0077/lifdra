import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SelectProgram from "./SelectProgram";
import EnterYourDetails from "./EnterYourDetails";
import AddTeamMember from "./AddTeamMember";
import SuccessfullRegistered from "./SuccessfullRegistered";
import { scholarshipAccountsConfig } from "../../../../../axiosConfig";
import { useDispatch, useSelector } from "react-redux";

export default function RegistarationModal({ program, setProgarm }) {
    const [HeadContent, setHeadContent] = useState("Select programme");
    const dispatch = useDispatch();
    const { school_scientist_members } = useSelector((state) => state);
    const [progamType, setProgramType] = useState("quiz");

    // ======
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoading, setLoading] = useState(false);

    // api data state =========
    const [userName, setUserName] = useState("");
    const [mobile, setMobile] = useState("");
    const [country, setCountry] = useState("IN");
    const [campus, setCampus] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [programName, setProgramName] = useState("green_innovation");
    const [isCoumputer, setComputer] = useState(true);
    const [division, setDivision] = useState("");
    const [isError, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [updateData, setUpdateData] = useState(false);

    const validateValues = () => {
        let no_error = true;
        if (userName === "") {
            setError(true);
            no_error = false;
        } else if (mobile === "") {
            setError(true);
            no_error = false;
        } else if (studentClass === "") {
            setError(true);
            no_error = false;
        } else if (campus === "") {
            setError(true);
            no_error = false;
        } else {
            setError(false);
            no_error = true;
        }
        return no_error;
    };
    const clearStore = () => {
        dispatch({
            type: "CLEAR_SS_MEMBERS",
        });
    };

    // form submission===================================
    const submitData = async () => {
        // setCampusErrorMessage("");
        setLoading(true);

        const formData = new FormData();
        formData.append("name", userName);
        formData.append("phone", mobile);
        formData.append("country", country);
        formData.append("campus", campus);
        formData.append("student_class", studentClass);
        formData.append("program", programName);
        formData.append("has_computer", isCoumputer);
        formData.append("student_division", division);
        formData.append("program_category", progamType);
        const errorContains = validateValues();

        if (errorContains) {
            scholarshipAccountsConfig
                .post(`school-scientist/apply-form/`, formData)
                .then((response) => {
                    const { StatusCode, data } = response.data;
                    if (StatusCode === 6000) {
                        setUserName("");
                        setMobile("");
                        setCampus("");
                        setComputer(false);
                        setError(false);
                        setErrorMsg("");
                        if (progamType === "quiz") {
                            setHeadContent("Successfully Registered");
                        } else {
                            setHeadContent("Add team members");
                        }
                    } else if (6001) {
                        setError(true);
                        clearStore();
                        setErrorMsg(data.message);
                    }
                });
        }
    };

    const submitMembers = async () => {
        const stu_members = school_scientist_members.slice(1);
        const student = school_scientist_members[0];

        const formData = new FormData();
        formData.append("leader_phone", student.phone);
        formData.append("program", programName);
        formData.append("members_data", JSON.stringify(stu_members));

        scholarshipAccountsConfig
            .post(`school-scientist/add-group-member/`, formData)
            .then((response) => {
                const { data, StatusCode } = response.data;
                if (StatusCode === 6000) {
                    setHeadContent("Successfully Registered");
                    setError(false);
                } else {
                    setError(true);
                    clearStore();
                }
            })
            .catch((err) => {
                console.log(err);
                setError(true);
            });
    };

    return (
        <BackContainer style={{ transform: program && "scale(1,1)" }}>
            <Overlay onClick={() => {setProgarm(false); setHeadContent('Select programme')}}></Overlay>
            <Modal success={HeadContent === "Successfully Registered" ? true : false}>
                <HeadSection
                    className={
                        HeadContent === "Successfully Registered"
                            ? "active"
                            : ""
                    }
                >
                    <Heading>
                        {HeadContent === "Select programme"
                            ? "Select programme"
                            : HeadContent === "Enter your details"
                            ? "Enter your details"
                            : HeadContent === "Add team members"
                            ? "Add team members"
                            : HeadContent === "Successfully Registered"
                            ? "Successfully Registered"
                            : ""}
                    </Heading>
                </HeadSection>
                {HeadContent === "Select programme" ? (
                    <SelectProgram
                        progamType={progamType}
                        setProgramType={setProgramType}
                        setHeadContent={setHeadContent}
                    />
                ) : HeadContent === "Enter your details" ? (
                    <EnterYourDetails
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
                ) : HeadContent === "Add team members" ? (
                    <AddTeamMember
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
                        submitMembers={submitMembers}
                        updateData={updateData}
                        setUpdateData={setUpdateData}
                        errorMsg={errorMsg}
                        setErrorMsg={setErrorMsg}
                    />
                ) : HeadContent === "Successfully Registered" ? (
                    <SuccessfullRegistered 
                        setProgarm={setProgarm}
                        setHeadContent={setHeadContent}
                    />
                ) : null}
            </Modal>
        </BackContainer>
    );
}

const BackContainer = styled.div`
    position: fixed;
    transform: scale(0, 0);
    transition: 0.3s;
    width: 100%;
    height: 100vh;
    z-index: 100;
    left: 0;
    top: 0px;
`;
const Overlay = styled.div`
    position: fixed;
    background: rgba(24, 72, 76, 0.3);
    left: 0;
    top: 0px;
    width: 100%;
    height: 100vh;
`;
const Modal = styled.div`
    overflow-y: scroll;
    width: 700px;
    margin: 0 auto;
    background: white;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 40px 50px;
    border-radius: 15px;
    z-index: 101;
    background-image: url(${(props) => props.modal_type === "coin" && props.B});
    background-size: cover;
    background-repeat: no-repeat;
    max-height: 95vh;
	&::-webkit-scrollbar {
  		width: 0;
	}
    @media (max-width: 980px) {
        padding: 30px 40px;
    }
    @media (max-width: 640px) {
        width: 400px;
        padding: 20px 30px;
    }
    @media (max-width: 480px) {
        width: 330px;
        padding: 20px 20px;
        min-height: ${({success}) => success ? "50vh" : "70vh"};
    }
    @media (max-width: 360px) {
        width: 300px;
    }
    @media (max-width: 320px) {
        height: unset;
    }
`;
const HeadSection = styled.div`
    border-bottom: 1px solid #e7e7e7;
    padding-bottom: 15px;
    &.active {
        display: none;
    }
`;
const Heading = styled.h2`
    color: #003c3c;
    font-size: 24px;
    font-weight: 600;
`;
