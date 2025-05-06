import React, { useEffect, useState } from "react";
import Moment from "moment";
import styled from "styled-components";
import { serverConfig } from "../../../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import NoData from "../../../includes/general/NoData";
import Loader from "../../../includes/techschooling/general/loaders/Loader";
import LogOutLoader from "../../general/loaders/GreenButtonLoader";

function Devices() {
    const {
        user_data: { access_token },
    } = useSelector((state) => state);

    const [LoginStatus, setLoginStatus] = useState([]);
    const [device, setDevise] = useState("");
    console.log(device, "device");
    const [isLoading, setLoading] = useState(true);
    const [isLogout, setLogout] = useState(false);

    function formatDate(date) {
        if (!date) return "---";

        const parsedDate = parseISO(date);
        // const formattedDate = format(parsedDate, "do MMM yyyy,h:mm a");
        const formattedDate = format(parsedDate, "do MMM yyyy");
        const formattedTime = format(parsedDate, "h:mm a");
        const result = `${formattedDate}${
            formattedTime !== "12:00 AM" ? " at " + formattedTime : ""
        }`;

        return result;
    }

    useEffect(() => {
        setLoading(true);
        serverConfig
            .get("api/v1/users/list-devices/", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((response) => {
                const { status_code, data } = response.data;
                if (status_code === 6000) {
                    setDevise(response.data.active_devices);
                    setLoginStatus(data);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    }, [access_token]);

    const LogOutFromAllDevices = () => {
        setLogout(true);
        serverConfig
            .post(
                "api/v1/users/logout-from-all-devices/",
                {
                    current_device: "exclude",
                },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            )
            .then((response) => {
                const { status_code, data } = response.data;

                if (status_code === 6000) {
                    window.location.reload();
                    setLogout(false);
                } else {
                    setLogout(false);
                }
            })
            .catch((error) => {
                setLogout(false);
            });
    };

    const LogoutSingleDevice = (id) => {
        serverConfig
            .post(
                `api/v1/users/logout-from-device/${id}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            )
            .then((response) => {
                const { status_code, data } = response.data;

                if (status_code === 6000) {
                    window.location.reload();
                } else {
                }
            })
            .catch((error) => {});
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <Container>
                    <TotalContainer>
                        <MainContainer>
                            <HeadingContainer>
                                <Heading>My Active Devices</Heading>
                                <DeviceConection>{device}</DeviceConection>
                            </HeadingContainer>
                            <TopContainer>
                                <LeftContent>
                                    <SmallParagraph>
                                        Manage your devices here.
                                    </SmallParagraph>
                                </LeftContent>
                                <RightContent>
                                    <Login
                                        onClick={() => {
                                            LogOutFromAllDevices();
                                        }}
                                    >
                                        {isLogout ? (
                                            <LogOutLoader
                                                width={100}
                                                height={40}
                                            />
                                        ) : window.innerWidth > 480 ? (
                                            "Log out from all devices"
                                        ) : (
                                            "Log out all"
                                        )}
                                    </Login>
                                </RightContent>
                            </TopContainer>
                        </MainContainer>
                        <BottomContainer>
                            <Items>
                                <DeviceList type="device">Device</DeviceList>
                                <DeviceList type="browser-os">
                                    <span>OS</span>
                                    <span>Browser</span>
                                </DeviceList>
                                <DeviceList type="Timezone">
                                    Timezone
                                </DeviceList>
                                <DeviceList type="status">Status</DeviceList>
                            </Items>
                            <BottomContent>
                                {LoginStatus.length > 0 ? (
                                    LoginStatus.map((item) => (
                                        <Content>
                                            <ContentList
                                                key={item.id}
                                                type="device"
                                            >
                                                <FlexContainer>
                                                    <DeviceContainer>
                                                        {item.device_family &&
                                                        item.device_family
                                                            .toLowerCase()
                                                            .includes("mac") ? (
                                                            <Device
                                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/macbook.svg"
                                                                alt="Mac"
                                                            />
                                                        ) : item.device_family &&
                                                          item.device_family
                                                              .toLowerCase()
                                                              .includes(
                                                                  "ipad"
                                                              ) ? (
                                                            <Device
                                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/ipad.svg"
                                                                alt="DeviceImage"
                                                            />
                                                        ) : item.device_family &&
                                                          item.device_family
                                                              .toLowerCase()
                                                              .includes(
                                                                  "iphone"
                                                              ) ? (
                                                            <Device
                                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/iphone.svg"
                                                                alt="DeviceImage"
                                                            />
                                                        ) : item.device_family &&
                                                          item.device_family
                                                              .toLowerCase()
                                                              .includes("k") ? (
                                                            <Device
                                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/android-mobile.svg"
                                                                alt="DeviceImage"
                                                            />
                                                        ) : (
                                                            <Device
                                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/windows+lap.svg"
                                                                alt="DeviceImage"
                                                            />
                                                        )}
                                                    </DeviceContainer>
                                                    <SubContainer>
                                                        <Subheading>
                                                            {item.os_family}
                                                        </Subheading>
                                                        <Paragraph>
                                                            {item.location}
                                                            <Block>
                                                                {item.date_added &&
                                                                    formatDate(
                                                                        item.date_added
                                                                    )}
                                                            </Block>
                                                        </Paragraph>
                                                    </SubContainer>
                                                </FlexContainer>
                                            </ContentList>
                                            <ContentList type="browser-os">
                                                <div className="browser-os">
                                                    <DeviceIconContainer>
                                                        {(item.os_family &&
                                                            item.os_family
                                                                .toLowerCase()
                                                                .includes(
                                                                    "mac"
                                                                )) ||
                                                        item.os_family
                                                            .toLowerCase()
                                                            .includes("ios") ? (
                                                            <DeviceIcon
                                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/mac-os-logo.svg"
                                                                alt="OS Logo"
                                                            />
                                                        ) : item.os_family &&
                                                          item.os_family
                                                              .toLowerCase()
                                                              .includes(
                                                                  "android"
                                                              ) ? (
                                                            <DeviceIcon
                                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/android.svg"
                                                                alt="OS Logo"
                                                            />
                                                        ) : (
                                                            <DeviceIcon
                                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/linux-icon.svg"
                                                                alt="OS Logo"
                                                            />
                                                        )}
                                                    </DeviceIconContainer>
                                                </div>
                                                <div className="browser-os">
                                                    <BrowserContainer>
                                                        {item.browser_family &&
                                                        item.browser_family
                                                            .toLowerCase()
                                                            .includes(
                                                                "safari"
                                                            ) ? (
                                                            <BrowserIcon
                                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/safari.svg"
                                                                alt="BrowserImage"
                                                            />
                                                        ) : item.browser_family &&
                                                          item.browser_family
                                                              .toLowerCase()
                                                              .includes(
                                                                  "firefox"
                                                              ) ? (
                                                            <BrowserIcon
                                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/firefox-browser-icon.svg"
                                                                alt="BrowserImage"
                                                            />
                                                        ) : item.browser_family &&
                                                          item.browser_family
                                                              .toLowerCase()
                                                              .includes(
                                                                  "brave"
                                                              ) ? (
                                                            <BrowserIcon
                                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/brave-icon.svg"
                                                                alt="BrowserImage"
                                                            />
                                                        ) : (
                                                            <BrowserIcon
                                                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/chrome.svg"
                                                                alt="BrowserImage"
                                                            />
                                                        )}
                                                    </BrowserContainer>
                                                </div>
                                            </ContentList>
                                            <ContentList type="Timezone">
                                                <Time>
                                                    {item.timezone.timezone
                                                        ? item.timezone.timezone
                                                        : "--"}
                                                </Time>
                                                <span>
                                                    {item.timezone.utc_offset}
                                                </span>
                                            </ContentList>
                                            <ContentList type="status">
                                                <StatusUpdate
                                                    onClick={() => {
                                                        {
                                                            item.is_active ===
                                                                false &&
                                                                LogoutSingleDevice(
                                                                    item.token_pk
                                                                );
                                                        }
                                                    }}
                                                    type={
                                                        !item.is_active
                                                            ? "color"
                                                            : ""
                                                    }
                                                >
                                                    {item.is_active
                                                        ? "Current device"
                                                        : "Logout"}
                                                </StatusUpdate>
                                            </ContentList>
                                        </Content>
                                    ))
                                ) : (
                                    <NoData />
                                )}
                            </BottomContent>
                        </BottomContainer>
                    </TotalContainer>
                </Container>
            )}
        </>
    );
}
const Container = styled.div`
    padding: 0px 0px 30px 0px;
`;
const TotalContainer = styled.div`
    border: 1px solid #eaecf0;
    border-radius: 8px;
`;
const MainContainer = styled.div`
    padding: 10px 20px;
`;
const TopContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`;
const LeftContent = styled.div`
    width: 60%;
    @media (max-width: 640px) {
        width: 48%;
    }
    @media (max-width: 480px) {
        width: 65%;
    }
    @media (max-width: 360px) {
        width: 100%;
    }
`;
const HeadingContainer = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 980px) {
        margin-bottom: 10px;
    }
`;
const Heading = styled.h3`
    margin-right: 8px;
    color: #101828;
    font-size: 18px;
    font-family: "gordita_medium";
    @media (max-width: 640px) {
        font-size: 16px;
    }
    @media (max-width: 360px) {
        margin-bottom: 0;
    }
`;
const DeviceConection = styled.span`
    font-size: 12px;
    color: #673ab7;
    background: #f4edff;
    border-radius: 16px;
    padding: 5px 12px;
    font-family: "gordita_regular";
`;
const SmallParagraph = styled.p`
    font-size: 14px;
    color: #475467;
    @media (max-width: 640px) {
        font-size: 12px;
    }
    @media (max-width: 360px) {
        margin-bottom: 10px;
    }
`;
const RightContent = styled.div`
    width: 40%;
    @media (max-width: 640px) {
        width: 48%;
    }
    @media (max-width: 480px) {
        width: 35%;
    }
    @media (max-width: 360px) {
        width: 100%;
    }
`;
const Login = styled.button`
    border: 1px solid #d0d5dd;
    padding: 0px 15px;
    border-radius: 8px;
    cursor: pointer;
    font-family: "gordita_medium";
    font-size: 14px;
    margin-left: auto;
    display: block;
    min-width: 201px;
    height: 42px;
    @media (max-width: 640px) {
        font-size: 12px;
        min-width: 201px;
    }
    @media (max-width: 480px) {
        padding: 0px 8px;
        min-width: 110px;
    }
    @media (max-width: 360px) {
        margin-left: 0;
        padding: 0px 20px;
    }
`;
const BottomContainer = styled.div``;
const Items = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background: linear-gradient(0deg, #eaecf0, #eaecf0),
        linear-gradient(0deg, #f4f4ff, #f4f4ff); */
    background: #f4f4ff;
    padding: 10px 20px;
    border: 1px solid #eaecf0;
    border-radius: 10px 10px 0px 0px;
`;
const DeviceList = styled.div`
    width: ${({ type }) =>
        type === "device"
            ? "30%"
            : type === "browser-os"
            ? "16%"
            : type === "Timezone"
            ? "27%"
            : type === "status"
            ? "19%"
            : "100%"};
    font-family: "gordita_medium";
    font-size: 14px;
    display: ${({ type }) => (type === "browser-os" ? "flex" : "block")};

    & span {
        display: block;
        width: 50%;
        font-family: "gordita_medium";
        @media (max-width: 480px) {
            width: 100%;
            &:first-child {
                display: none;
            }
        }
    }
    @media (max-width: 980px) {
        width: ${({ type }) =>
            type === "device"
                ? "29%"
                : type === "browser-os"
                ? "18%"
                : type === "Timezone"
                ? "25%"
                : type === "status"
                ? "23%"
                : "100%"};
    }
    @media (max-width: 768px) {
        width: ${({ type }) =>
            type === "device"
                ? "27%"
                : type === "browser-os"
                ? "20%"
                : type === "Timezone"
                ? "24%"
                : type === "status"
                ? "23%"
                : "100%"};
    }
    @media (max-width: 640px) {
        font-size: 13px;
        display: ${({ type }) => type === "Timezone" && "none"};
        width: ${({ type }) =>
            type === "device"
                ? "30%"
                : type === "browser-os"
                ? "20%"
                : type === "status"
                ? "32%"
                : "100%"};
    }
    @media (max-width: 480px) {
        display: ${({ type }) => type === "os" && "none"};
        width: ${({ type }) =>
            type === "device"
                ? "40%"
                : type === "browser-os"
                ? "20%"
                : type === "status"
                ? "40%"
                : "100%"};
        text-align: ${({ type }) =>
            type === "device" || type === "status" ? "center" : ""};
    }
`;
const BottomContent = styled.div``;
const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eaecf0;
    padding: 30px 20px;
    &:last-child {
        border-bottom: none;
    }
    @media (max-width: 480px) {
        padding: 18px 8px;
        /* display: ${({ type }) =>
            type === "os" || type === "browser" ? "flex" : "block"}; */
    }
`;
const ContentList = styled.div`
    width: ${({ type }) =>
        type === "device"
            ? "30%"
            : type === "browser-os"
            ? "16%"
            : type === "Timezone"
            ? "27%"
            : type === "status"
            ? "19%"
            : "100%"};
    display: ${({ type }) => type === "browser-os" && "flex"};
    /* &:first-child {
        display: flex;
        align-items: center;
        justify-content: center;
        display: block;
    } */
    & .browser-os {
        width: 50%;
        @media (max-width: 480px) {
            width: 100%;
            display: flex;
            justify-content: center;
        }
    }
    span {
        font-size: 14px;
        @media (max-width: 640px) {
            font-size: 13px;
        }
        @media (max-width: 480px) {
            margin-bottom: 15px;
            font-size: 12px;
        }
        @media (max-width: 360px) {
        }
    }

    @media (max-width: 980px) {
        width: ${({ type }) =>
            type === "device"
                ? "29%"
                : type === "browser-os"
                ? "18%"
                : type === "Timezone"
                ? "25%"
                : type === "status"
                ? "23%"
                : "100%"};
    }
    @media (max-width: 768px) {
        width: ${({ type }) =>
            type === "device"
                ? "27%"
                : type === "browser-os"
                ? "20%"
                : type === "Timezone"
                ? "24%"
                : type === "status"
                ? "23%"
                : "100%"};
    }
    @media (max-width: 640px) {
        display: ${({ type }) => type === "Timezone" && "none"};
        width: ${({ type }) =>
            type === "device"
                ? "30%"
                : type === "browser-os"
                ? "20%"
                : type === "status"
                ? "32%"
                : "100%"};
    }
    @media (max-width: 480px) {
        display: ${({ type }) => type === "browser-os" && "flex"};
        flex-direction: ${({ type }) => type === "browser-os" && "column"};
        width: ${({ type }) =>
            type === "device"
                ? "40%"
                : type === "browser-os"
                ? "20%"
                : type === "status"
                ? "40%"
                : "100%"};
    }
    @media (max-width: 360px) {
        width: ${({ type }) =>
            type === "device"
                ? "40%"
                : type === "browser-os"
                ? "16%"
                : type === "status"
                ? "44%"
                : "100%"};
    }
`;
const FlexContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`;
const DeviceContainer = styled.div`
    min-width: 80px;
    max-width: 80px;
    @media (max-width: 980px) {
        margin-bottom: 10px;
    }
`;
const Device = styled.img`
    width: 100%;
    display: block;
`;
const SubContainer = styled.div`
    min-width: calc(100% - 95px);
    max-width: calc(100% - 95px);
    @media (max-width: 980px) {
        min-width: 100%;
        max-width: 100%;
    }
`;
const Subheading = styled.h3`
    font-family: "gordita_medium";
    font-size: 14px;
    color: #344054;
    @media (max-width: 640px) {
        font-size: 13px;
    }
`;
const Paragraph = styled.p`
    font-family: "gordita_regular";
    font-size: 14px;
    color: #344054;
    @media (max-width: 640px) {
        font-size: 12px;
        width: 100%;
    }
`;
const Block = styled.span`
    font-family: "gordita_regular";
    font-size: 14px;
    color: #344054;
    display: block;
    @media (max-width: 1080px) {
        font-size: 12px !important;
    }
    @media (max-width: 768px) {
        width: 70%;
    }
    @media (max-width: 360px) {
    }
`;
const DeviceIconContainer = styled.span`
    display: block;
    width: 24px;
`;
const DeviceIcon = styled.img`
    width: 100%;
    display: block;
`;
const BrowserContainer = styled.span`
    display: block;
    width: 24px;
`;
const BrowserIcon = styled.img`
    width: 100%;
    display: block;
`;
const Time = styled.h3`
    font-size: 14px;
    font-family: "gordita_regular";
    color: #101828;
    @media (max-width: 640px) {
        font-size: 13px;
    }
`;
const StatusUpdate = styled.span`
    background: #ecfdf3;
    padding: 6px 12px;
    font-family: "gordita_medium";
    font-size: 14px;
    border-radius: 16px;
    color: ${({ type }) => (type === "color" ? "red" : "#027A48")};
    background: ${({ type }) => (type === "color" ? "none" : "")};
    cursor: pointer;
    @media (max-width: 768px) {
        font-size: 12px !important;
    }
    @media (max-width: 640px) {
        display: block;
        text-align: center;
    }
`;

export default Devices;
