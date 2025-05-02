import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function UnAutharisedPage() {
    return (
        <MainContienr>
            <ImageContienr>
                <img
                    src={
                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/unauthorised-image.png"
                    }
                    alt="Unauthorised"
                />
            </ImageContienr>
            <BottomContent>
                <h6>Subscribe to join the Steyp community!</h6>
                <p>
                    Steyp's premium community platform members can <br /> only
                    access these exclusive content!
                </p>
                <Link to="/plans">Subscribe</Link>
            </BottomContent>
        </MainContienr>
    );
}

export default UnAutharisedPage;
const MainContienr = styled.div`
    padding: 10%;
`;
const ImageContienr = styled.div`
    width: 20%;
    margin: 0 auto;
    @media all and (max-width: 980px) {
    }
    @media all and (max-width: 480px) {
        width: 30%;
    }
    img {
        display: block;
        width: 100%;
    }
`;
const BottomContent = styled.div`
    p {
        color: #949494;
        font-size: 18px;
        font-family: "gordita_regular";
        text-align: center;
        margin-bottom: 16px;
        @media all and (max-width: 980px) {
            font-size: 16px;
        }
        @media all and (max-width: 480px) {
            font-size: 14px;
        }
    }
    h6 {
        color: #4d4d4d;
        font-size: 16px;
        font-family: "gordita_medium";
        text-align: center;

        margin-bottom: 8px;
        @media all and (max-width: 768px) {
            font-size: 21px;
        }
        @media all and (max-width: 480px) {
            font-size: 18px;
        }
    }
    a {
        border-radius: 8px;
        background: var(
            --steyp-landingpage-button,
            linear-gradient(127deg, #0fa76f 0%, #0f9ea7 100%)
        );
        display: flex;
        width: 200px;
        padding: 10px 24px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        margin: 0 auto;
        @media all and (max-width: 640px) {
            font-size: 14px;
            padding: 10px 13px;
            height: 30px;
        }
    }
`;
