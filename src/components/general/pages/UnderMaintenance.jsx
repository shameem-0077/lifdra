import React from "react";
import styled from "styled-components";

class UnderMaintenance extends React.PureComponent {
    render() {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f0f5f9",
                    width: "100%",
                    height: "100vh",
                }}
            >
                <Image
                    alt=""
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/images/error-pages/under_maintenance.png"
                />
            </div>
        );
    }
}

const Image = styled.img`
    display: block;
    width: 50%;
    @media (max-width: 768px) {
        width: 75%;
    }
    @media (max-width: 480px) {
        width: 90%;
    }
`;

export default UnderMaintenance;
