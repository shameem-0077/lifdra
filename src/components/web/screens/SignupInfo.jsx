import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverConfig } from "../../../axiosConfig";

export default function SignupInfo(props) {
    const { phone } = useParams();
    const [studentInfo, setStudentInfo] = useState({});
    const [status, setStatus] = useState(true);
    useEffect(() => {
        serverConfig
            .get(
                "/api/v1/users/get-info/referral-token/1ac9163b-41e2-4424-a40d-9b41daaa2965/",
                { params: { phone: phone } }
            )
            .then((response) => {
                const { status_code, data } = response.data;
                if (status_code === 6000) {
                    setStudentInfo(data);
                } else {
                    setStatus(false);
                }
            })
            .catch((error) => {
            });
    }, []);
    return (
        <div style={{ padding: "20px 0 0 20px" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                Student Signup Info
            </h3>
            {status ? (
                <ul>
                    <li>Name: {studentInfo.name}</li>
                    <li>Profile ID: {studentInfo["Profile ID"]}</li>
                    <li>username: {studentInfo.username}</li>
                    <li>User ID: {studentInfo["User ID"]}</li>
                    <li>Phone: {phone}</li>
                    <li>Referral Code: {studentInfo["Referral Code"]}</li>
                    <li>
                        Campus Code used : {studentInfo["Promo Code used"]}
                    </li>
                </ul>
            ) : (
                <p>No signups for this phone number</p>
            )}
        </div>
    );
}
