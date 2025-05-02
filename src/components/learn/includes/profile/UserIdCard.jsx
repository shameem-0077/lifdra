import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IdCard from "../../screens/profile/IdCard";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import Lottie from "react-lottie";
import animationData from "../../../../assets/lotties/tech-schooling/plans_placeholder.json";
import { getDateStr } from "../../../helpers/functions";

function UserIdCard() {
    const [iscardUrl, setIdcardUrl] = useState("");
    const { user_profile, user_data } = useSelector((state) => state);

    const [isImageLoading, setImageLoading] = useState(true);
    useEffect(() => {
        generateIdCard();
        handleLoading();
    }, [user_profile]);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {},
    };

    const generateIdCard = () => {
        const download = document.getElementById(`download-btn`);
        setTimeout(() => {
            html2canvas(document.querySelector(`#idcard`), {
                scale: 4,
                useCORS: true,

                ignoreElements: (element) => {
                    if (element.tagName === "svg") {
                        return true;
                    }
                    if (
                        element.tagName === "IMG" &&
                        !element.className.includes(`id-download-##`)
                    ) {
                        return true;
                    } else {
                        if (element.className.includes(`id-download-##`))
                            return false;
                    }
                },
            })
                .then((canvas) => {
                    let image = canvas
                        .toDataURL("image/png")
                        .replace("image/png", "image/octet-stream");
                    download.setAttribute("href", image);
                    setIdcardUrl(image);
                })
                .catch((error) => {
                    // console.log(error);
                });
            window.scrollTo(
                0,
                document.body.scrollHeight ||
                    document.documentElement.scrollHeight
            );
        }, 2000);
    };

    const handleLoading = () => {
        setTimeout(() => {
            setImageLoading(false);
        }, 3000);
    };

    return user_profile.subscription_data.is_paid_subscription ? (
        <Container>
            <LeftSection>
                <Top>
                    <h3>{user_profile.program.name} Subscription</h3>
                    <p>{`Your subscription started on ${getDateStr(
                        user_profile.date_added
                    )} and will end on ${getDateStr(
                        user_profile.subscription_data.end_timestamp
                    )}.`}</p>
                </Top>

                <Download
                    href=""
                    onClick={generateIdCard}
                    id="download-btn"
                    download="idcard.png"
                >
                    Download ID Card
                </Download>
            </LeftSection>
            <RightSection>
                <IdTop>
                    <h3>{user_profile.program.name} Subscription</h3>
                    <p>{`Your subscription started on ${getDateStr(
                        user_profile.date_added
                    )} and will end on ${getDateStr(
                        user_profile.subscription_data.end_timestamp
                    )}.`}</p>
                </IdTop>
                ``{" "}
                <Cover>
                    <IdCard id="idcard" className="id-download-##" />
                </Cover>
                <StudentID>
                    {isImageLoading ? (
                        <Lottie
                            options={defaultOptions}
                            height={250}
                            width={"100%"}
                        />
                    ) : (
                        <img src={iscardUrl} alt="" width="100%" />
                    )}
                </StudentID>
            </RightSection>
        </Container>
    ) : null;
}

export default UserIdCard;

const Container = styled.div`
    margin-top: 10px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/04-08-2021/idCardbg.svg");

    background-position: 0 0;
    background-size: cover;
    grid-gap: 20px;
    padding: 20px;
    border: 1px solid #edf0ef;
    border-radius: 5px;
    @media all and (max-width: 1280px) {
        grid-template-columns: 1fr;
    }
    @media all and (max-width: 1120px) {
        grid-template-columns: 2fr 1fr;
    }
    @media all and (max-width: 980px) {
        grid-template-columns: 1fr;
    }
    @media all and (max-width: 768px) {
        grid-template-columns: 2fr 1fr;
    }
    @media all and (max-width: 580px) {
        grid-template-columns: 1fr;
    }
`;
const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media all and (max-width: 1280px) {
        order: 2;
    }
    @media all and (max-width: 1120px) {
        order: 1;
    }
    @media all and (max-width: 980px) {
        order: 2;
    }
    @media all and (max-width: 768px) {
        order: 1;
    }
    @media all and (max-width: 580px) {
        order: 2;
    }
`;
const RightSection = styled.div`
    @media all and (max-width: 1280px) {
        order: 1;
    }
    @media all and (max-width: 1120px) {
        order: 2;
    }
    @media all and (max-width: 980px) {
        order: 1;
    }
    @media all and (max-width: 768px) {
        order: 2;
    }
    @media all and (max-width: 580px) {
        order: 1;
    }
`;

const Cover = styled.div`
    position: absolute;
    z-index: 0;
    top: -300px;
    right: -600px;
`;
const StudentID = styled.div`
    max-width: 300px;
    margin: 0 auto;
`;
const Download = styled.a`
    width: 200px;
    height: 40px;
    max-width: 300px;
    border-radius: 5px;
    color: #fff;
    background-color: #15bf81;
    font-size: 14px;
    font-family: "gordita_medium";
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-10px);
    @media all and (max-width: 1280px) {
        margin: 0 auto;
        width: 100%;
        transform: translateY(0px);
    }
    @media all and (max-width: 1120px) {
        margin-left: 0;
        width: 200px;
        transform: translateY(-10px);
    }
    @media all and (max-width: 980px) {
        margin: 0 auto;
        width: 100%;
        transform: translateY(0px);
    }
    @media all and (max-width: 768px) {
        margin-left: 0;
        width: 200px;
        transform: translateY(-10px);
    }
    @media all and (max-width: 580px) {
        margin: 0 auto;
        width: 100%;
    }
`;
const Top = styled.div`
    margin-bottom: 30px;
    h3 {
        font-size: 22px;
        font-family: "gordita_medium";
        margin-bottom: 15px;
        @media all and (max-width: 1280px) {
            font-size: 20px;
            margin-bottom: 8px;
            text-align: center;
        }
        @media all and (max-width: 1120px) {
            font-size: 24px;
            margin-bottom: 15px;
            text-align: left;
        }
        @media all and (max-width: 980px) {
            font-size: 20px;
            margin-bottom: 8px;
            text-align: center;
        }
        @media all and (max-width: 768px) {
            font-size: 24px;
            margin-bottom: 8px;
            text-align: left;
        }
        @media all and (max-width: 580px) {
            margin-bottom: 8px;
            text-align: center;
        }
    }
    p {
        color: #131212;
        max-width: 400px;
        font-family: "gordita_regular";
        font-size: 14px;
        @media all and (max-width: 1280px) {
            text-align: center;
        }
        @media all and (max-width: 1120px) {
            text-align: left;
        }
        @media all and (max-width: 980px) {
            text-align: center;
        }
        @media all and (max-width: 768px) {
            text-align: left;
        }
        @media all and (max-width: 580px) {
            text-align: center;
        }
    }
    @media all and (max-width: 1280px) {
        display: none;
    }
    @media all and (max-width: 1120px) {
        display: block;
    }
    @media all and (max-width: 980px) {
        display: none;
    }
    @media all and (max-width: 768px) {
        display: block;
    }
    @media all and (max-width: 580px) {
        display: none;
    }
`;
const IdTop = styled.div`
    margin-bottom: 30px;
    display: none;
    h3 {
        font-size: 24px;
        font-family: "gordita_medium";
        margin-bottom: 15px;
        @media all and (max-width: 1280px) {
            font-size: 20px;
            margin-bottom: 8px;
            text-align: center;
        }
        @media all and (max-width: 1120px) {
            font-size: 24px;
            margin-bottom: 15px;
            text-align: left;
        }
        @media all and (max-width: 980px) {
            font-size: 20px;
            margin-bottom: 8px;
            text-align: center;
        }
        @media all and (max-width: 768px) {
            font-size: 24px;
            margin-bottom: 8px;
            text-align: left;
        }
        @media all and (max-width: 580px) {
            margin-bottom: 8px;
            text-align: center;
        }
    }
    p {
        color: #131212;
        max-width: 400px;
        font-family: "gordita_medium" !important;
        @media all and (max-width: 1280px) {
            text-align: center;
        }
        @media all and (max-width: 1120px) {
            text-align: left;
        }
        @media all and (max-width: 980px) {
            text-align: center;
        }
        @media all and (max-width: 768px) {
            text-align: left;
        }
        @media all and (max-width: 580px) {
            text-align: center;
        }
    }
    @media all and (max-width: 1280px) {
        display: block;
    }
    @media all and (max-width: 1120px) {
        display: none;
    }
    @media all and (max-width: 980px) {
        display: block;
    }
    @media all and (max-width: 768px) {
        display: none;
    }
    @media all and (max-width: 580px) {
        display: block;
    }
`;
