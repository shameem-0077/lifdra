import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../../../../assets/css/web/style.css";
import Loader from "../../../learn/includes/techschooling/general/loaders/Loader";
import { serverConfig } from "../../../../axiosConfig";
import { Link, useHistory, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import queryString from "query-string";
import ResponseModal from "../../../learn/includes/profile/modals/ResponseModal";
import SubscribeModal from "../../../learn/includes/techschooling/subscribe/SubscribeModal";
import AdditionalDetails from "../../../learn/includes/techschooling/subscribe/AdditionalDetails";
import { useAuthStore } from "../../../../store/authStore";

function ProgramPlans({ title, program }) {
    const id = 90;
    const [isLoading, setLoading] = useState(true);
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState({});
    const [selectedProgramId, setSelectedProgramId] = useState(null);
    const history = useHistory();
    const { user_data, programsState } = useSelector((state) => state);
    const { user_profile, divMainClass, campus_data } = useSelector(
        (state) => state
    );
    const { user_id } = useAuthStore();
    const navigate = useNavigate();

    const location = useLocation();
    const [isModal, setModal] = useState("");
    const [isResponseModal, setResponseModal] = useState(false);

    useEffect(() => {
        let prograam =
            user_profile.program?.name === "Tech Schooling"
                ? "tech-schooling"
                : user_profile.program?.name === "Tech Degreee"
                ? "tech-degree"
                : "tech-grad";
        let programPlan = programsState.programs.find(
            (item) => item.slug === prograam
        );
        setSelectedProgramId(programPlan?.id);
    }, [programsState.programs.length]);

    const apiUrl =
        user_profile.is_old_student ||
        (!user_profile.is_old_student &&
            user_profile.program?.name === "Tech Grad")
            ? `subscriptions/plans/`
            : `subscriptions/vacation-plan/`;

    useEffect(() => {
        const fetchData = () => {
            let { access_token } = user_data;
            learnConfig
                .get(apiUrl, {
                    headers: { Authorization: `Bearer ${access_token}` },
                })
                .then((response) => {
                    let { StatusCode, data } = response.data;
                    if (StatusCode === 6000) {
                        user_profile.is_old_student ||
                        (!user_profile.is_old_student &&
                            user_profile.program?.name === "Tech Grad")
                            ? setPlans(data)
                            : setPlans(data.reverse());
                        setLoading(false);
                    } else {
                        setLoading(false);
                    }
                });
        };
        if (selectedProgramId) fetchData();
    }, [selectedProgramId]);

    const [action, setAction] = useState("");
    const [status, setStatus] = useState("");
    const [responseType, setResponseType] = useState("");
    const [errorTitle, setErrorTitle] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [pincode, setPincode] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        let { search } = location;

        const values = queryString.parse(search);
        const action = values.action;
        const status = values.status;

        setAction(action);
        setStatus(status);
    }, [location.search]);

    const closeModal = () => {
        setModal("");
        setAction("");
        history.push({
            pathname: location.pathname,
        });
    };

    useEffect(() => {
        if (status === "success" || status === "failed") {
            setResponseModal(true);
        }
        if (status === "success") {
            setResponseType("success");
        } else if (status === "failed") {
            setResponseType("failed");
        }
    }, [status]);

    useEffect(() => {
        window.addEventListener("popstate", handleBack);
        return () => {
            window.removeEventListener("popstate", handleBack);
        };
    }, []);

    const handleBack = () => {
        history.push({
            pathname: "/feed/",
            search: "",
        });
    };

    const handleModal = () => {
        if (user_id) {
            navigate("/dashboard");
        } else {
            navigate({
                pathname: location.pathname,
                search: `action=login`,
            });
        }
    };

    return (
        <Containers id="main" className={divMainClass}>
            {isModal === "subscribe-modal" && (
                <SubscribeModal
                    closeModal={closeModal}
                    setModal={setModal}
                    selectedCountry={selectedCountry}
                    selectedState={selectedState}
                    pincode={pincode}
                    address={address}
                />
            )}
            {isModal === "additional-details" && (
                <AdditionalDetails
                    closeModal={closeModal}
                    setModal={setModal}
                    Country={selectedCountry}
                    setCountry={setSelectedCountry}
                    State={selectedState}
                    setState={setSelectedState}
                    pincode={pincode}
                    setPincode={setPincode}
                    address={address}
                    setAddress={setAddress}
                />
            )}
            <ResponseModal
                setModal={setModal}
                responseType={responseType}
                setResponseModal={setResponseModal}
                isResponseModal={isResponseModal}
                selectedPlan={selectedPlan}
                program={program}
                successTitle="You've successfully completed your payment."
                errorTitle="Your payment has been cancelled. Please try again."
                type="payment"
            />

            <MainContainer>
                <TopContainer>
                    <LeftContainer>
                        <Container>
                            <Name>
                                Upgrade your learning experience with our new
                                pricing plans
                            </Name>
                        </Container>
                    </LeftContainer>
                    <RightContainer>
                        <TopImageContainer>
                            <TopImage
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/phone.svg"
                                alt="Top"
                            />
                        </TopImageContainer>
                    </RightContainer>
                </TopContainer>
                {isLoading ? (
                    <LoaderContainer>
                        <Loader />
                    </LoaderContainer>
                ) : (
                    <>
                        <CardSection>
                            {user_profile.is_old_student ||
                            !user_profile.is_old_student
                                ? plans.map((plan) => (
                                      <Card
                                          key={plan.id}
                                          onClick={() => setSelectedPlan(plan)}
                                          id={plan.id}
                                          selectedPlan={selectedPlan}
                                      >
                                          <TopSection>
                                              <Icon>
                                                  <img
                                                      src={
                                                          plan.days === 30
                                                              ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/07-10-2021/1-month.svg"
                                                              : plan.days === 90
                                                              ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/3-months.svg"
                                                              : plan.days ===
                                                                180
                                                              ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/6-months.svg"
                                                              : plan.days ===
                                                                365
                                                              ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/1-year.svg"
                                                              : null
                                                      }
                                                      alt="icon"
                                                  />
                                              </Icon>
                                              <Period>
                                                  {plan.days === 30
                                                      ? "1 Month"
                                                      : plan.days === 90
                                                      ? "3 Months"
                                                      : plan.days === 180
                                                      ? "6 Months"
                                                      : plan.days === 365
                                                      ? "1 Year"
                                                      : null}
                                              </Period>
                                          </TopSection>
                                          <PriceSection>
                                              {plan.days !== 30 && (
                                                  <Label>offer price</Label>
                                              )}

                                              <DiscountPrice>
                                                  ₹{" "}
                                                  {(
                                                      plan.coins *
                                                      plan.coin_value
                                                  ).toLocaleString()}
                                              </DiscountPrice>
                                              <Terms>18% GST inculded</Terms>
                                              {plan.days !== 30 && (
                                                  <Price>
                                                      ₹{" "}
                                                      {(
                                                          plan.actual_coins *
                                                          plan.coin_value
                                                      ).toLocaleString()}
                                                  </Price>
                                              )}
                                          </PriceSection>
                                          {plan.id !== selectedPlan.id && (
                                              <Select
                                                  id={plan.id}
                                                  selectedPlan={selectedPlan}
                                              >
                                                  Select Plan
                                              </Select>
                                          )}

                                          {plan.id === selectedPlan.id && (
                                              <Select
                                                  className="selection"
                                                  id={plan.id}
                                                  selectedPlan={selectedPlan}
                                              >
                                                  <small>Selected </small>
                                                  <span>
                                                      <img
                                                          src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/check.svg"
                                                          alt="Icon"
                                                      />{" "}
                                                  </span>
                                              </Select>
                                          )}
                                      </Card>
                                  ))
                                : plans &&
                                  plans
                                      .filter((item) => item.days === 365)
                                      .map((plan) => (
                                          <Card
                                              key={plan.id}
                                              onClick={() =>
                                                  setSelectedPlan(plan)
                                              }
                                              id={plan.id}
                                              selectedPlan={selectedPlan}
                                          >
                                              <TopSection>
                                                  <Icon>
                                                      <img
                                                          src={
                                                              plan.days === 30
                                                                  ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/07-10-2021/1-month.svg"
                                                                  : plan.days ===
                                                                    90
                                                                  ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/3-months.svg"
                                                                  : plan.days ===
                                                                    180
                                                                  ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/6-months.svg"
                                                                  : plan.days ===
                                                                    365
                                                                  ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/1-year.svg"
                                                                  : null
                                                          }
                                                          alt="icon"
                                                      />
                                                  </Icon>
                                                  <Period>
                                                      {plan.days === 30
                                                          ? "1 Month"
                                                          : plan.days === 90
                                                          ? "3 Months"
                                                          : plan.days === 180
                                                          ? "6 Months"
                                                          : plan.days === 365
                                                          ? "1 Year"
                                                          : null}
                                                  </Period>
                                              </TopSection>
                                              <PriceSection>
                                                  <Label>offer price</Label>
                                                  <DiscountPrice>
                                                      ₹{" "}
                                                      {(
                                                          plan.coins *
                                                          plan.coin_value
                                                      ).toLocaleString()}
                                                  </DiscountPrice>
                                                  <Price>
                                                      ₹{" "}
                                                      {(
                                                          plan.actual_coins *
                                                          plan.coin_value
                                                      ).toLocaleString()}
                                                  </Price>
                                                  {/* <Terms to={"/terms-of-service/"}>
                            18% GST inculded
                          </Terms> */}
                                              </PriceSection>
                                              {plan.id !== selectedPlan.id && (
                                                  <Select
                                                      id={plan.id}
                                                      selectedPlan={
                                                          selectedPlan
                                                      }
                                                  >
                                                      Select Plan
                                                  </Select>
                                              )}

                                              {plan.id === selectedPlan.id && (
                                                  <Select
                                                      className="selection"
                                                      id={plan.id}
                                                      selectedPlan={
                                                          selectedPlan
                                                      }
                                                  >
                                                      <small>Selected </small>
                                                      <span>
                                                          <img
                                                              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-11-2021/check.svg"
                                                              alt="Icon"
                                                          />{" "}
                                                      </span>
                                                  </Select>
                                              )}
                                          </Card>
                                      ))}
                        </CardSection>
                        <Top className="bottom">
                            <ButtonsBack onClick={handleBack}>Back</ButtonsBack>
                            {Object.keys(selectedPlan).length > 0 && (
                                <Buttons
                                    to={handleModal}
                                    className="continue"
                                >
                                    {user_id ? "Go to Dashboard" : "Join Now"}
                                </Buttons>
                            )}
                        </Top>
                    </>
                )}
            </MainContainer>
        </Containers>
    );
}

export default ProgramPlans;
const Containers = styled.div`
    padding: 86px 12px 0px 79px;
    @media all and (max-width: 1100px) {
        padding: 86px 10px 0px 10px;
    }
    @media all and (max-width: 640px) {
        padding: 86px 20px 0px 20px;
    }
`;
const LoaderContainer = styled.div`
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;
const MainContainer = styled.div`
    min-height: calc(100vh - 115px);
    padding-top: 20px;
    @media all and (max-width: 480px) {
        padding-top: 0px;
    }
`;
const Top = styled.div`
    font-size: 23px;
    text-align: left;
    background: #f9f9fb;
    padding: 20px 20px 15px 25px;
    border-radius: 7px;
    margin-bottom: 25px;
    font-family: "gordita_medium";
    &.bottom {
        text-align: unset;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background: #fff;
        margin-top: 60px;
        padding: 0px;
        @media all and (max-width: 768px) {
            margin-top: 52px;
        }
        @media all and (max-width: 640px) {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            position: fixed;
            z-index: 222;
            bottom: -15px;
            left: 0;
            background-color: #fff !important;
            width: 100%;
            justify-content: space-around;
            padding: 10px;
        }
        @media all and (max-width: 480px) {
            padding: 10px 20px;
        }
        @media all and (max-width: 380px) {
            flex-direction: row;
            align-items: center;
        }
        @media all and (max-width: 360px) {
            padding: 10px 10px;
        }
    }

    @media all and (max-width: 640px) {
        font-size: 23px;
        padding: 14px 20px 10px 18px;
        margin-bottom: 15px;
    }
    @media all and (max-width: 480px) {
        padding: 13px 20px 8px 12px;
        font-size: 19px;
    }
`;
const ButtonsBack = styled.div`
    text-align: center;
    min-width: 191px;
    border: 1px solid #10a38b;
    border-radius: 5px;
    /* background: #bdffd7; */
    padding: 12px 20px 10px;
    margin-right: 10px;
    font-size: 15px;
    color: #10a38b;
    cursor: pointer;
    font-family: "gordita_medium";
    @media all and (max-width: 640px) {
        margin-right: 0px;
    }
    @media all and (max-width: 420px) {
        min-width: unset;
        font-size: 11px;
        padding: 12px 12px 10px;
        width: 48%;
    }
`;
const Buttons = styled(Link)`
    text-align: center;
    min-width: 191px;
    border: 1px solid #f3f3f3;
    border-radius: 5px;
    background: #bdffd7;
    padding: 12px 20px 10px;
    margin-right: 10px;
    font-size: 15px;
    color: #5a5959;
    cursor: pointer;
    font-family: "gordita_medium";
    &.continue {
        border: 1px solid #4ba870;
        margin-right: 0px;
        background: #4ba870;
        color: #fff;
        @media all and (max-width: 420px) {
            min-width: unset;
            font-size: 13px;
            padding: 12px 12px 10px;
            width: 48%;
        }
        @media all and (max-width: 380px) {
            font-size: 11px;
            padding: 12px 9px 10px;
        }
    }
    @media all and (max-width: 640px) {
        margin-right: 0px;
    }
    @media all and (max-width: 420px) {
        min-width: unset;
        font-size: 11px;
        padding: 10px 12px 10px;
        width: 48%;
    }
    @media all and (max-width: 380px) {
        font-size: 13px;
        padding: 12px 12px 10px;
        width: 50%;
    }
`;
const TopContainer = styled.div`
    position: relative;
    background-color: #dcf6ec;
    padding: 28px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 7px;
    @media all and (max-width: 640px) {
        padding: 17px 18px;
    }
    @media all and (max-width: 480px) {
        padding: 18px 12px;
    }
`;
const LeftContainer = styled.div``;
const RightContainer = styled.div``;
const TopImageContainer = styled.div`
    position: absolute;
    right: 25px;
    top: 16px;
    width: 92px;
    transition: all 0.6s ease-in-out;
    @media all and (max-width: 640px) {
        right: 14px;
        top: 14px;
        width: 67px;
    }
    @media all and (max-width: 480px) {
        right: 14px;
        top: 6px;
        width: 60px;
    }
    @media all and (max-width: 360px) {
        width: 54px;
        right: 9px;
        top: 13px;
    }
`;
const TopImage = styled.img`
    width: 100%;
    display: block;
`;
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const Name = styled.h2`
    line-height: 1.5;
    margin-bottom: 7px;
    font-size: 25px;
    font-family: "gordita_medium";
    div {
        display: inline;
    }
    @media all and (max-width: 980px) {
        width: 78%;
        font-size: 21px;
    }
    @media all and (max-width: 640px) {
        font-size: 18px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
`;

const CardSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: stretch;
    grid-gap: 15px;
    margin-top: 25px;
    @media all and (max-width: 1150px) {
        flex-wrap: wrap;
        justify-content: space-around;
    }

    @media all and (max-width: 768px) {
        justify-content: space-between;
        margin-top: 20px;
    }
    @media all and (max-width: 640px) {
        margin-bottom: 60px;
    }
    @media all and (max-width: 480px) {
        grid-gap: 0px;
    }
`;
const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 7px;
    padding: 30px 30px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: #fff;
    width: 24%;
    margin-bottom: 10px;
    border: ${(props) =>
        props.id === props.selectedPlan.id
            ? "2px solid #56c082 "
            : "2px solid #fff "};

    transition: all 0.3s ease-in-out;
    &:hover {
        border: 2px solid #56c082;
    }
    @media all and (max-width: 1150px) {
        width: 31%;
    }
    @media all and (max-width: 980px) {
        padding: 25px 18px;
        width: 32%;
    }
    @media all and (max-width: 768px) {
        padding: 24px 18px;
        width: 48%;
    }
    @media all and (max-width: 480px) {
        width: 100%;
        flex-direction: row;
        height: unset;
        align-items: center;
        padding: 15px 10px;
    }
`;
const TopSection = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px dashed #00000014;
    @media all and (max-width: 480px) {
        border-bottom: none;
        padding-bottom: 0;
    }
`;
const Icon = styled.span`
    width: 50px;
    display: block;
    margin-right: 20px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 540px) {
        width: 40px;
        margin-right: 15px;
    }
    @media all and (max-width: 480px) {
        width: 25px;
        margin-right: 9px;
    }
    @media all and (max-width: 360px) {
        width: 24px;
    }
`;
const Period = styled.p`
    font-size: 24px;
    font-family: gordita_medium;
    color: #383f50d9;
    transform: translateY(4px);
    @media all and (max-width: 1100px) {
        font-size: 22px;
    }
    @media all and (max-width: 768px) {
        font-size: 21px;
    }
    @media all and (max-width: 480px) {
        font-size: 11px;
    }
    @media all and (max-width: 360px) {
        font-size: 11px;
    }
`;
const PriceSection = styled.div`
    padding: 30px 0 20px;
    text-align: center;
    @media all and (max-width: 1100px) {
        padding: 25px 0 10px;
    }
    @media all and (max-width: 480px) {
        padding: unset;
    }
`;
const Label = styled.p`
    text-transform: capitalize;
    color: #0fa76f;
    font-family: gordita_medium;
    font-size: 14px;
    @media all and (max-width: 480px) {
        font-size: 9px;
        font-weight: 600;
    }
    @media all and (max-width: 360px) {
        font-weight: 600;
    }
`;
const DiscountPrice = styled.h4`
    font-size: 34px;
    font-family: gordita_bold;
    color: #0fa76f;
    margin-bottom: 10px;
    @media all and (max-width: 1100px) {
        font-size: 32px;
    }
    @media all and (max-width: 480px) {
        font-size: 16px;
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
    }
`;
const Price = styled.p`
    font-size: 22px;
    font-weight: 600;
    font-family: gordita_medium;
    color: #383f50;
    padding-bottom: 0px;
    position: relative;
    &::before {
        content: "";
        position: absolute;
        top: 5px;
        left: 0;
        width: 100%;
        height: 20px;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/green-line.svg")
            no-repeat;
        background-size: 110px;
        background-position: center;
        display: block;
        z-index: 0;
        @media all and (max-width: 480px) {
            top: 0px;
            left: 8px;
            width: 85%;
        }
    }
    @media all and (max-width: 480px) {
        font-size: 12px;
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
    }
`;
const Terms = styled.div`
    display: block;
    color: #707070;
    font-size: 10px;
    font-family: gordita_regular;
    margin-bottom: 5px;
    @media all and (max-width: 480px) {
        font-size: 8px;
    }
`;
const Select = styled.div`
    text-align: center;
    border: 2px solid #0fa76f;
    border-radius: 5px;
    padding: 12px 10px;
    margin-top: 21px;
    font-size: 15px;
    color: #2e8852;
    font-family: "gordita_medium";
    transition: all 0.6s ease-in-out;
    &.selection {
        font-family: "gordita_medium";
        transition: all 0.6s ease-in-out;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #0fa76f;
        border: 2px solid #0fa76f;
        @media all and (max-width: 480px) {
            padding: 5px 10px;
            align-items: end;
        }
        small {
            font-size: 15px;
            @media all and (max-width: 480px) {
                font-size: 10px;
            }
        }
        span {
            width: 14px;
            margin-left: 6px;
            transition: all 0.6s ease-in-out;
            transform: translateY(-3px);
            img {
                width: 100%;
                display: block;
                transition: all 0.6s ease-in-out;
            }
            @media all and (max-width: 480px) {
                width: 12px;
            }
        }
    }
    @media all and (max-width: 480px) {
        padding: 5px 14px;
        font-size: 10px;
        margin-top: 0px;
        border: 1px solid #0fa76f;
    }
`;
