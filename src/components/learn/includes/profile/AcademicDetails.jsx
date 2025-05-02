import React from "react";
import styled from "styled-components";
import SubscriptionStatus from "../../screens/profile/SubscriptionStatus";
import CountCardComponent from "./CountCardComponent";
import UserIdCard from "./UserIdCard";

function AcademicDetails() {
    return (
        <Container>
            <SubscriptionStatus />
            {/* <CountCardComponent /> */}
            <UserIdCard />
        </Container>
    );
}

export default AcademicDetails;

const Container = styled.div``;
