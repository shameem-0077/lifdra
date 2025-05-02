import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { coinsConfig } from "../../../axiosConfig";
import { getDateStr } from "../../helpers/functions";

export default function PromocodeInfo(props) {
    const { token } = useParams();
    const [studentInfo, setStudentInfo] = useState([]);
    const [status, setStatus] = useState(true);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        coinsConfig
            .get(
                "/tokens/get-info/promo-token/1ac9163b-41e2-4424-a40d-9b41daaa2965/",
                {
                    params: { token: token },
                }
            )
            .then((response) => {
                const { StatusCode, data } = response.data;
                if (StatusCode === 6000) {
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
                            Total {studentInfo.length} students used this code
                        </h5>
                        <h6
                            style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                margin: "15px 0 5px",
                            }}
                        >
                            Pending users
                        </h6>
                        <Table>
                            <tr>
                                <Thead>No</Thead>
                                <Thead>Name</Thead>
                                <Thead>User ID</Thead>
                                <Thead>Phone</Thead>
                                <Thead>Current Topic</Thead>
                                <Thead>Plan</Thead>
                                <Thead>End Date</Thead>
                                <Thead>RM</Thead>
                                <Thead>Date Joined</Thead>
                                <Thead>Status</Thead>
                            </tr>
                            {studentInfo.filter(
                                (item) =>
                                    item.profile_data.subscription_status ===
                                    "Pending"
                            ).length > 0
                                ? studentInfo
                                      .filter(
                                          (item) =>
                                              item.profile_data
                                                  .subscription_status ===
                                              "Pending"
                                      )
                                      .map((item, index) => (
                                          <tr>
                                              <Td>{index + 1}</Td>
                                              <Td>{item.profile_data.name}</Td>
                                              <Td>{item.user}</Td>
                                              <Td>{item.profile_data.phone}</Td>
                                              <Td>
                                                  {item.profile_data
                                                      .current_topic
                                                      ? item.profile_data
                                                            .current_topic
                                                      : "-"}
                                              </Td>
                                              <Td>
                                                  {item.profile_data.plan
                                                      ? item.profile_data.plan
                                                      : "-"}
                                              </Td>
                                              <Td>
                                                  {item.profile_data.end_date
                                                      ? getDateStr(
                                                            item.profile_data
                                                                .end_date
                                                        )
                                                      : "-"}
                                              </Td>
                                              <Td>
                                                  {item.profile_data.rm_name
                                                      ? item.profile_data
                                                            .rm_name
                                                      : "-"}
                                              </Td>
                                              <Td>{item.date_applied}</Td>
                                              <Td>
                                                  {
                                                      item.profile_data
                                                          .subscription_status
                                                  }
                                              </Td>
                                          </tr>
                                      ))
                                : "No pending users"}
                        </Table>
                        <h6
                            style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                margin: "15px 0 5px",
                            }}
                        >
                            Paid users
                        </h6>
                        <Table>
                            <tr>
                                <Thead>No</Thead>
                                <Thead>Name</Thead>
                                <Thead>User ID</Thead>
                                <Thead>Phone</Thead>
                                <Thead>Current Topic</Thead>
                                <Thead>Plan</Thead>
                                <Thead>End Date</Thead>
                                <Thead>RM</Thead>
                                <Thead>Date Joined</Thead>
                                <Thead>Status</Thead>
                            </tr>
                            {studentInfo.filter(
                                (item) =>
                                    item.profile_data.subscription_status ===
                                    "Active"
                            ).length > 0
                                ? studentInfo
                                      .filter(
                                          (item) =>
                                              item.profile_data
                                                  .subscription_status ===
                                              "Active"
                                      )
                                      .map((item, index) => (
                                          <tr>
                                              <Td>{index + 1}</Td>
                                              <Td>{item.profile_data.name}</Td>
                                              <Td>{item.user}</Td>
                                              <Td>{item.profile_data.phone}</Td>
                                              <Td>
                                                  {item.profile_data
                                                      .current_topic
                                                      ? item.profile_data
                                                            .current_topic
                                                      : "-"}
                                              </Td>
                                              <Td>
                                                  {item.profile_data.plan
                                                      ? item.profile_data.plan
                                                      : "-"}
                                              </Td>
                                              <Td>
                                                  {item.profile_data.end_date
                                                      ? getDateStr(
                                                            item.profile_data
                                                                .end_date
                                                        )
                                                      : "-"}
                                              </Td>
                                              <Td>
                                                  {item.profile_data.rm_name
                                                      ? item.profile_data
                                                            .rm_name
                                                      : "-"}
                                              </Td>
                                              <Td>{item.date_applied}</Td>
                                              <Td>Paid</Td>
                                          </tr>
                                      ))
                                : "No paid users"}
                        </Table>
                        <h6
                            style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                margin: "15px 0 5px",
                            }}
                        >
                            Trial users
                        </h6>
                        <Table>
                            <tr>
                                <Thead>No</Thead>
                                <Thead>Name</Thead>
                                <Thead>User ID</Thead>
                                <Thead>Phone</Thead>
                                <Thead>Current Topic</Thead>
                                <Thead>Plan</Thead>
                                <Thead>End Date</Thead>
                                <Thead>RM</Thead>
                                <Thead>Date Joined</Thead>
                                <Thead>Status</Thead>
                            </tr>
                            {studentInfo.filter(
                                (item) =>
                                    item.profile_data.subscription_status ===
                                    "Trial"
                            ).length > 0
                                ? studentInfo
                                      .filter(
                                          (item) =>
                                              item.profile_data
                                                  .subscription_status ===
                                              "Trial"
                                      )
                                      .map((item, index) => (
                                          <tr>
                                              <Td>{index + 1}</Td>
                                              <Td>{item.profile_data.name}</Td>
                                              <Td>{item.user}</Td>
                                              <Td>{item.profile_data.phone}</Td>
                                              <Td>
                                                  {item.profile_data
                                                      .current_topic
                                                      ? item.profile_data
                                                            .current_topic
                                                      : "-"}
                                              </Td>
                                              <Td>
                                                  {item.profile_data.plan
                                                      ? item.profile_data.plan
                                                      : "-"}
                                              </Td>
                                              <Td>
                                                  {item.profile_data.end_date
                                                      ? getDateStr(
                                                            item.profile_data
                                                                .end_date
                                                        )
                                                      : "-"}
                                              </Td>
                                              <Td>
                                                  {item.profile_data.rm_name
                                                      ? item.profile_data
                                                            .rm_name
                                                      : "-"}
                                              </Td>
                                              <Td>{item.date_applied}</Td>
                                              <Td>
                                                  {
                                                      item.profile_data
                                                          .subscription_status
                                                  }
                                              </Td>
                                          </tr>
                                      ))
                                : "No trial users"}
                        </Table>

                        <h6
                            style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                margin: "15px 0 5px",
                            }}
                        >
                            Expired users
                        </h6>
                        <Table>
                            <tr>
                                <Thead>No</Thead>
                                <Thead>Name</Thead>
                                <Thead>User ID</Thead>
                                <Thead>Phone</Thead>
                                <Thead>Current Topic</Thead>
                                <Thead>Plan</Thead>
                                <Thead>End Date</Thead>
                                <Thead>RM</Thead>
                                <Thead>Date Joined</Thead>
                                <Thead>Status</Thead>
                            </tr>
                            {studentInfo.filter(
                                (item) =>
                                    item.profile_data.subscription_status ===
                                    "Expired"
                            ).length > 0
                                ? studentInfo
                                      .filter(
                                          (item) =>
                                              item.profile_data
                                                  .subscription_status ===
                                              "Expired"
                                      )
                                      .map((item, index) => (
                                          <tr>
                                              <Td>{index + 1}</Td>
                                              <Td>{item.profile_data.name}</Td>
                                              <Td>{item.user}</Td>
                                              <Td>{item.profile_data.phone}</Td>
                                              <Td>
                                                  {item.profile_data
                                                      .current_topic
                                                      ? item.profile_data
                                                            .current_topic
                                                      : "-"}
                                              </Td>
                                              <Td>
                                                  {item.profile_data.plan
                                                      ? item.profile_data.plan
                                                      : "-"}
                                              </Td>
                                              <Td>
                                                  {item.profile_data.end_date
                                                      ? getDateStr(
                                                            item.profile_data
                                                                .end_date
                                                        )
                                                      : "-"}
                                              </Td>
                                              <Td>
                                                  {item.profile_data.rm_name
                                                      ? item.profile_data
                                                            .rm_name
                                                      : "-"}
                                              </Td>
                                              <Td>{item.date_applied}</Td>
                                              <Td>
                                                  {
                                                      item.profile_data
                                                          .subscription_status
                                                  }
                                              </Td>
                                          </tr>
                                      ))
                                : "No expired users"}
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
