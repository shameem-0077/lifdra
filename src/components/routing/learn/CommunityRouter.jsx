import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

// Import your community-related components here
import MainErrorPage from "../../learn/includes/general/MainErrorPage";

function CommunityRouter() {
    const navigate = useNavigate();
    const { user_data } = useAuthStore();
    const access_token = user_data?.access_token;

    useEffect(() => {
        if (!access_token) {
            navigate("/login");
        }
    }, [access_token, navigate]);

    return (
        <Routes>
            {/* Add your community routes here */}
            <Route path="*" element={<MainErrorPage />} />
        </Routes>
    );
}

export default CommunityRouter; 