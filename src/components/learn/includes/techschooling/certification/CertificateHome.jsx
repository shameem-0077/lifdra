import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { learnConfig } from "../../../../../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import CertificateCard from "./CertificateCard";
import PlaceHolder from "../../../../general/PlaceHolder";

function CertificateHome({ subject_slug }) {

    
    
    const dispatch = useDispatch();

    useEffect(() => {
        handleLearnModal();
    }, []);

    const handleLearnModal = () => {
        dispatch({
            type: "TOGGLE_LEARN_MODAL",
            isLearnDiv: true,
        });
    };

    return (
        <>
            <CertificateContainer>
                <CertificateCard subject_slug={subject_slug} />
            </CertificateContainer>
        </>
    );
}

export default CertificateHome;
const CertificateContainer = styled.div`
    height: 100%;
    background-color: #f9f9fb;
    padding: 25px;
    @media (max-width: 640px) {
        padding: 20px;
    }
    @media (max-width: 360px) {
        padding: unset;
        margin-top: 30px;
    }
`;
