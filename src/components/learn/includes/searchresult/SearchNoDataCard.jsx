import React from "react";
import styled from "styled-components";

class SearchNoDataCard extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                <Container>
                    <ImageContainer>
                        <Image
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/nodataboard.png"
                            alt=""
                        />
                    </ImageContainer>
                    <Heading>There are no matching results</Heading>
                    <Para>Please try a different query</Para>
                </Container>
            </React.Fragment>
        );
    }
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Heading = styled.h3`
    font-size: 26px;
    color: #333333;
    margin: 10px 0;
    font-family: gordita_medium;
    @media only screen and (max-width: 480px) {
        font-size: 20px;
    }
`;
const ImageContainer = styled.div`
    width: 30%;
    display: flex;
    justify-content: center;
    @media only screen and (max-width: 640px) {
        width: 50%;
    }
`;
const Image = styled.img`
    width: 100%;
    display: block;
`;
const Para = styled.p`
    font-size: 18px;
    color: #6f6f6f;
    font-family: gordita_regular;
    @media only screen and (max-width: 480px) {
        font-size: 14px;
    }
`;
export default SearchNoDataCard;
