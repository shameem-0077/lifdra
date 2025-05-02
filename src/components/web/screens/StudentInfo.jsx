import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function StudentInfo(props) {
    const navigate = useNavigate();
    const [number, setNumber] = useState("");

    const onSubmit = () => {
        if (number.length === 10) {
            navigate(`/get-info/refferal-token/712ee99b-260f-42e2-807f-b7690458d17e/${number}/`);
        } else {
            alert("Please enter a valid number");
        }
    };
    return (
        <Container>
            <Title>Student Signup Info</Title>
            <Box>
                <EnterField
                    type="number"
                    placeholder="Enter number"
                    onChange={(e) => setNumber(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            onSubmit();
                        }
                    }}
                ></EnterField>
                <Submit onClick={onSubmit}>Submit</Submit>
            </Box>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const Box = styled.div`
    width: 80%;
`;
const Title = styled.h3`
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 15px;
    letter-spacing: 0.1rem;
`;
const EnterField = styled.input`
    border: 1px solid #848484;
    padding: 9px 16px;
    border-radius: 3px;
    font-size: 18px;
    letter-spacing: 0.1rem;
    width: 100%;
`;
const Submit = styled.span`
    display: block;
    background: #57c082;
    color: #fff;
    text-align: center;
    padding: 8px 0;
    font-weight: bold;
    border-radius: 4px;
    margin-top: 5px;
    letter-spacing: 0.1rem;
    cursor: pointer;
`;
