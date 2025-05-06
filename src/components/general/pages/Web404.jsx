import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TalropEdtechHelmet from "../helpers/TalropEdtechHelmet";
import { connect } from "react-redux";

function mapStatetoProps(state) {
    return {
        user_data: state.user_data,
    };
}

const Web404 = (props) => {
    let { user_data } = props;
    return (
        <React.Fragment>
            <TalropEdtechHelmet title="Page not found" />
            <Container>
                <Image
                    alt=""
                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/error-pages/web-404.png"
                />
                <Title>Page Not Found</Title>
                <Text>
                    You seems to have clicked on a broken link or entered a URL
                    that doesn't exist on this site.
                </Text>
                <Button
                    to={user_data && user_data.is_verified ? "/explore/" : "/"}
                >
                    Go Home
                </Button>
            </Container>
        </React.Fragment>
    );
};

export default connect(mapStatetoProps)(Web404);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: -webkit-fill-available;
    min-height: 100vh;
`;
const Image = styled.img`
    display: block;
    width: 40%;
    @media only screen and (max-width: 980px) {
        width: 60%;
    }
`;
const Title = styled.h3`
    font-size: 36px;
    color: #744fa6;
    font-family: product_sansbold;
    margin: 30px 0 17px;
    @media only screen and (max-width: 980px) {
        font-size: 32px;
        margin: 26px 0 17px;
    }
    @media only screen and (max-width: 640px) {
        font-size: 28px;
    }
    @media only screen and (max-width: 480px) {
        font-size: 26px;
        margin: 20px 0 14px;
    }
`;
const Text = styled.p`
    font-size: 21px;
    color: #937dae;
    width: 30%;
    text-align: center;
    margin-bottom: 45px;
    line-height: 1.4em;
    @media only screen and (max-width: 980px) {
        width: 54%;
        font-size: 20px;
        margin-bottom: 31px;
    }
    @media only screen and (max-width: 640px) {
        width: 77%;
        font-size: 19px;
    }
    @media only screen and (max-width: 480px) {
        font-size: 16px;
        width: 76%;
    }
`;
const Button = styled(Link)`
    display: flex;
    font-size: 22px;
    background-color: #a069eb;
    color: #fff;
    border-radius: 34px;
    padding: 19px 55px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    @media only screen and (max-width: 980px) {
        font-size: 20px;
        border-radius: 34px;
        padding: 18px 46px;
    }
    @media only screen and (max-width: 640px) {
        font-size: 20px;
    }
    @media only screen and (max-width: 480px) {
        font-size: 16px;
        padding: 14px 28px;
    }
`;
