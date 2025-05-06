import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { serverConfig } from "../../../axiosConfig";
import { getDateStr } from "../../helpers/functions";

export default function ReferralToken(props) {
    const { token } = useParams();
    const [studentInfo, setStudentInfo] = useState([]);
    const [status, setStatus] = useState(true);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        serverConfig
            .get(
                "/tokens/get-info/promo-token/1ac9163b-41e2-4424-a40d-9b41daaa2965/",
                {
                    params: { token: token },
                }
            )
            .then((response) => {
                const { status_code, data } = response.data;
                if (status_code === 6000) {
                    setStudentInfo(data);
                    setLoading(false);
                } else {
                    setStatus(false);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setStatus(false);
                setLoading(false);
            });
    }, []);
    return (
        <div style={{ padding: "20px 0 0 20px", overflowX: "scroll" }}>
            <h3
                style={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                    fontSize: "24px",
                }}
            >
                Token Users Info - {token}
            </h3>
            {loading ? (
                <p>Loading...</p>
            ) : status ? (
                studentInfo.length > 0 ? (
                    <>
                        <h5
                            style={{ fontWeight: "bold", marginBottom: "10px" }}
                        >
                            Total {studentInfo.length} students
                        </h5>

                        <Table>
                            <tr>
                                <Thead>No</Thead>
                                <Thead>Name</Thead>
                                <Thead>User ID</Thead>
                                <Thead>Phone</Thead>
                            </tr>
                            {studentInfo.map((item, index) => (
                                <tr>
                                    <Td>{index + 1}</Td>
                                    <Td>{item.name}</Td>
                                    <Td>{item.user}</Td>
                                    <Td>{item.phone}</Td>
                                </tr>
                            ))}
                        </Table>
                    </>
                ) : (
                    <p>An error occurred, please try again</p>
                )
            ) : (
                <p>No sign ups from this token</p>
            )}
        </div>
    );
}

const Table = styled.table`
    border: 1px solid black;
    width: 1024px;
`;
const Thead = styled.th`
    border: 1px solid black;
    padding: 5px;
`;
const Td = styled.td`
    border: 1px solid black;
    padding: 5px;
`;
