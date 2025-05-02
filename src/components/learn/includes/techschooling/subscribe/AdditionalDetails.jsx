import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { accountsConfig } from "../../../../../axiosConfig";
import { useSelector } from "react-redux";

function AdditionalDetails({
    setModal,
    closeModal,
    setCountry,
    setState,
    pincode,
    setPincode,
    address,
    setAddress,
}) {
    const user_data = useSelector((state) => state.user_data);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [select, setSelect] = useState(false);
    const [selectState, setSelectState] = useState(false);
    const [data, setData] = useState([]);
    const [statesData, setStatesData] = useState([]);
    const [isFormValid, setIsFormValid] = useState(true);

    const validateForm = () => {
        let stateRequired =
            selectedCountry?.name === "India"
                ? selectedState
                    ? true
                    : false
                : true;
        if (selectedCountry && stateRequired && address) {
            setIsFormValid(true);
            setModal("subscribe-modal");
        } else {
            setIsFormValid(false);
        }
        if (isFormValid) {
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        } else if (e.keyCode === 69) {
            e.preventDefault();
        }
    };

    const handleClear = () => {
        setSelectedCountry("");
        setState("");
        setCountry("");
        setSelectedState("");
        setPincode("");
        setAddress("");
    };

    //countries fetch api call
    useEffect(() => {
        const fetchCountries = () => {
            accountsConfig
                .get("/api/v1/users/settings/countries/")
                .then((response) => {
                    let { StatusCode, data } = response.data;
                    if (StatusCode === 6000) {
                        setData(data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        fetchCountries();
    }, []);

    //states fetch api call
    useEffect(() => {
        const fetchStates = () => {
            const { access_token } = user_data;
            accountsConfig
                .get("/general/list-states", {
                    headers: { Authorization: `Bearer ${access_token}` },
                })
                .then((response) => {
                    let { StatusCode, data } = response.data;
                    if (StatusCode === 6000) {
                        setStatesData(data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        fetchStates();
    }, []);

    return (
        <Container>
            <ContentBox>
                <CloseIcon
                    title="Close"
                    className="las la-times-circle"
                    onClick={() => {
                        closeModal(false);
                        handleClear();
                    }}
                ></CloseIcon>
                <ItemContainer>
                    {/* <MainContainer> */}
                    <Content>
                        <Image
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-11-2023/paymentlogo.png"
                            alt=""
                        />
                        <Title>Enter your Details</Title>
                        <Description>Enter your information below</Description>
                    </Content>
                    <Main>
                        <Div>
                            <Heading>Country*</Heading>
                            <CountrySelectDiv
                                style={{
                                    cursor: "pointer",
                                }}
                                onClick={() => setSelect(!select)}
                            >
                                <Text selectedState={selectedCountry && true}>
                                    {selectedCountry ? (
                                        <>
                                            <ContryIcon
                                                style={{
                                                    backgroundImage: `url(${selectedCountry.flag})`,
                                                }}
                                            ></ContryIcon>
                                            {selectedCountry.name}
                                        </>
                                    ) : (
                                        "Select your Country"
                                    )}
                                </Text>
                                <Icon rotateImage={select}>
                                    <img
                                        src={require("../../../../../assets/images/myprofile/down.svg")}
                                        alt=""
                                    />
                                </Icon>
                            </CountrySelectDiv>
                        </Div>
                        {select && (
                            <CountryDiv>
                                <List>
                                    {data?.map((data, index) => (
                                        <Item
                                            className={
                                                selectedCountry?.country_code ===
                                                data?.country_code
                                                    ? "active"
                                                    : ""
                                            }
                                            key={index}
                                            onClick={() => {
                                                setSelectedCountry(data);
                                                setSelect(false);
                                                setCountry(data.name);
                                                setIsFormValid(true);
                                            }}
                                        >
                                            <ContryIcon
                                                style={{
                                                    backgroundImage: `url(${data.flag})`,
                                                }}
                                            ></ContryIcon>
                                            <CountryText>
                                                {data.name}
                                            </CountryText>
                                        </Item>
                                    ))}
                                </List>
                            </CountryDiv>
                        )}
                    </Main>
                    {selectedCountry?.name === "India" && (
                        <Main>
                            <Div>
                                <Heading>State*</Heading>
                                <CountrySelectDiv
                                    style={{
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setSelectState(!selectState)}
                                >
                                    <Text selectedState={selectedState && true}>
                                        {selectedState ? (
                                            <>{selectedState.name}</>
                                        ) : (
                                            "Select your Country"
                                        )}
                                    </Text>
                                    <Icon rotateImage={select}>
                                        <img
                                            src={require("../../../../../assets/images/myprofile/down.svg")}
                                            alt=""
                                        />
                                    </Icon>
                                </CountrySelectDiv>
                            </Div>
                            {selectState && (
                                <CountryDiv>
                                    <List>
                                        {statesData?.map((data) => (
                                            <Item
                                                className={
                                                    selectedState?.id ===
                                                    data?.id
                                                        ? "active"
                                                        : ""
                                                }
                                                key={data.id}
                                                onClick={() => {
                                                    setSelectedState(data);
                                                    setSelectState(false);
                                                    setState(data.name);
                                                    setIsFormValid(true);
                                                }}
                                            >
                                                <CountryText>
                                                    {data.name}
                                                </CountryText>
                                            </Item>
                                        ))}
                                    </List>
                                </CountryDiv>
                            )}
                        </Main>
                    )}
                    <FormDiv>
                        <Heading>Address*</Heading>
                        <SelectDiv>
                            <AddressBox
                                type="text"
                                placeholder="Enter your address"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                    setIsFormValid(true);
                                }}
                            />
                        </SelectDiv>
                    </FormDiv>
                    {selectedCountry?.name === "India" && (
                        <FormDiv>
                            <Heading>Pincode*</Heading>
                            <SelectDiv>
                                <PincodeBox
                                    type="text"
                                    pattern="[0-9]*"
                                    maxLength="6"
                                    placeholder="Enter your pincode"
                                    onKeyDown={handleKeyDown}
                                    value={pincode}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        const numericInput = input.replace(
                                            /[^0-9]/g,
                                            ""
                                        );
                                        setPincode(numericInput);
                                        // setIsFormValid(true);
                                    }}
                                />
                            </SelectDiv>
                        </FormDiv>
                    )}
                    <SubmitButton
                        onClick={() => {
                            validateForm();
                        }}
                        disabled={!isFormValid}
                    >
                        Continue
                    </SubmitButton>
                    {isFormValid ? null : (
                        <ErrorMessage>Please enter all fields</ErrorMessage>
                    )}
                    {/* </MainContainer> */}
                </ItemContainer>
            </ContentBox>
        </Container>
    );
}

export default AdditionalDetails;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 10px;
    /* text-align: right; */
`;

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 5000;
`;
const ItemContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    padding: 40px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    @media (max-width: 640px) {
        padding: 0 29px;
    }
    @media (max-width: 400px) {
        padding: 0 16px;
    }
`;
const MainContainer = styled.div`
    height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const Content = styled.div`
    display: flex;
    padding: 0 0 20px 0;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: stretch;
`;
const Image = styled.img`
    width: 40%;
    display: block;
    margin: 0 auto 10px;
`;
const Title = styled.h4`
    font-size: 22px;
    margin-top: 10px;
    line-height: 1.4em;
    color: #2d2d2d;
    /* margin-top: 50px; */
    font-family: "gordita_medium";
    @media (max-width: 640px) {
        font-size: 23px;
        /* margin-top: 38px; */
    }
    @media (max-width: 480px) {
        /* margin-top: 25px; */
        font-size: 20px;
    }
`;
const Description = styled.p`
    margin: 8px auto 12px;
    width: 94%;
    font-size: 16px;
    font-family: "gordita_regular";
    color: #747474;
    @media (max-width: 640px) {
        margin: 7px auto 11px;
    }
    @media (max-width: 480px) {
        width: 100%;
        font-size: 14px;
    }
`;
const CloseIcon = styled.span`
    font-size: 34px;
    color: #ff9800;
    position: absolute;
    left: -42px;
    top: 11px;
    cursor: pointer;
    @media (max-width: 480px) {
        z-index: 1000;
        font-size: 28px;
        left: 13px;
        top: 13px;
    }
`;
const ContentBox = styled.div`
    z-index: 500;
    background: #fff;
    width: 600px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    animation: slide-box 0.4s ease;
    @keyframes slide-box {
        0% {
            right: -600px;
        }
        100% {
            right: 0;
        }
    }
    @media (max-width: 640px) {
        width: 432px;
    }
    @media (max-width: 480px) {
        width: 100%;
    }
`;

const FormDiv = styled.div`
    margin-bottom: 24px;
    &:last-child {
        margin-bottom: 0;
    }
`;

const Div = styled.div``;

const Heading = styled.h4`
    color: #344054;
    font-family: "gordita_medium";
    font-size: 16px;
`;

const SelectDiv = styled.div`
    border-radius: 6.121px;
    border: 0.765px solid #d9d9d9;
    background: #fff;
    box-shadow: 0px 0px 15.3022px 0px rgba(0, 0, 0, 0.08);
    padding: 15.302px 18.363px;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`;
const CountrySelectDiv = styled(SelectDiv)`
    padding: 0 18px;
    min-height: 50px;
`;

const Text = styled.small`
    color: ${({ selectedState }) => (selectedState ? "#000;" : "#afafaf")};
    font-size: 14px;
    font-family: "gordita_regular";
    display: flex;
    align-items: center;
`;

const Icon = styled.span`
    display: inline-block;
    width: 20px;
    transition: 160ms ease-in-out all;
    transform: ${(props) =>
        props.rotateImage ? "rotate(180deg)" : "rotate(0deg)"};
    img {
        width: 100%;
        display: block;
    }
`;

const AddressBox = styled.textarea`
    width: 100%;
    resize: none;
    min-height: 45px;
    &::-webkit-scrollbar {
        display: none;
    }
    &::placeholder {
        font-family: "gordita_regular";
        font-size: 14px;
        color: #afafaf;
    }
`;

const PincodeBox = styled.input`
    width: 100%;
`;

const SubmitButton = styled.div`
    border-radius: 8px;
    background: #5cc66a;
    display: flex;
    height: 54px;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: #fff;
    font-family: "gordita_regular";
    cursor: pointer;
    font-size: 14px;
`;

const CountryDiv = styled.div`
    border-radius: 8px;
    background: #fff;
    box-shadow: -4px 4px 30px 0px rgba(0, 0, 0, 0.2);
    position: absolute;
    z-index: 500;
    width: 100%;
    top: 88px;
`;

const List = styled.ul`
    max-height: 320px;
    overflow-y: scroll;
`;
const Item = styled.li`
    display: flex;
    align-items: center;
    margin: 8px;
    padding: 12px;
    cursor: pointer;
    &:hover {
        border-radius: 8px;
        background: #e4f8ed;
        color: #5cc66a;
    }
    &.active {
        border-radius: 8px;
        background: #e4f8ed;
        color: #5cc66a;
    }
`;
const ContryIcon = styled.span`
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    background-size: cover; // or contain, depending on your requirements
    background-position: center;
`;
const CountryText = styled.h5``;

const Main = styled.div`
    position: relative;
    margin-bottom: 24px;
`;
