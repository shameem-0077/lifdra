import React from "react";
import styled from "styled-components";

const StartChat = (props) => {
    return (
        <Container>
            <Image
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/support.png"
                alt=""
            />
            <Title>Have a Doubt?</Title>
            <Description>
                A Support Engineer will be available for you to
                <br />
                clear your queries.
            </Description>
            <Button
                onClick={props.toggleChatComponent}
                isStartButton={true}
                color="#4d7af6"
            >
                <ButtonIcon className="las la-comment-alt" />
                <ButtonText>Ask your Question</ButtonText>
            </Button>
            {props.startChatStatus.status_code &&
                props.startChatStatus.status_code !== 6000 && (
                    <RedText>{props.startChatStatus.title}</RedText>
                )}
            <Text>*1 coin needed to solve your doubt.</Text>
        </Container>
    );
};
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10em 0;
    background-color: #f8f9fd;
    text-align: center;
    @media only screen and (max-width: 1280px) {
        padding: 7em 0;
    }
    @media only screen and (max-width: 980px) {
        padding: 6em 0;
    }
    @media only screen and (max-width: 768px) {
        padding: 4em 0;
    }
`;
const Image = styled.img``;
const Title = styled.h3`
    color: #333;
    margin: 20px 0 8px;
`;
const Description = styled.p`
    color: #999;
    font-size: 14px;
    line-height: inherit;
`;
const Text = styled.span`
    color: #999;
    font-size: 14px;
`;
const RedText = styled.span`
    color: red;
    font-size: 14px;
`;
const Button = styled.span`
    padding: 15px 25px;
    border-radius: 5px;
    background-color: ${(props) => props.color};
    color: #fff;
    display: flex;
    align-items: center;
    margin: 20px 0 10px;
    cursor: pointer;
`;
const ButtonIcon = styled.i`
    display: inline-block;
    margin-right: 10px;
`;
const ButtonText = styled.b``;

export default StartChat;
