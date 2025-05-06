import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { serverConfig } from "../../../../axiosConfig";
import LessonBars from "./LessonBars";
import { useAuthStore } from "../../../../store/authStore";
import Loader from "../../includes/techschooling/general/loaders/Loader";
import VideoPlayer from "../../../applications/video-player/src/VideoPlayer";
import CertificateModal from "../techschooling/learning/CertificateModal";
import { formatBytes } from "../../../general/helpers/functions";
import TalropEdtechHelmet from "../../../general/helpers/TalropEdtechHelmet";
import Lottie from "react-lottie";
import NextLoader from "../../../../assets/lotties/tech-schooling/play-next-button.json";
import SignupLoader from "../../includes/techschooling/general/loaders/SignupLoader";

function PurchasedTopic() {
    const history = useHistory();
    const [nextTopic, setNextTopic] = useState({});

    const [currentItem, setCurrentItem] = useState({
        id: 1,
        title: "Lectures",
    });

    const { user_data } = useAuthStore();
    const [isModal, setModal] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState({});
    const [topic, setTopic] = useState({});

    const [allTopics, setAllTopics] = useState([]);

    const [selectedTopic, setSelectedTopic] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [isWatched, setWatched] = useState(false);
    const [isMarkAsLoading, setMarkasLoading] = useState(false);
    const [certificationId, setCertificationId] = useState(null);
    const [showNextCard, setShowNextCard] = useState(false);
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: NextLoader,
        rendererSettings: {},
    };

    let timer = null;

    let { topic_pk } = useParams();

    const sections = [
        {
            id: 1,
            title: "Lectures",
        },
        // {
        //     id: 2,
        //     title: "Description",
        // },
        {
            id: 3,
            title: "Resources",
        },
    ];

    useEffect(() => {
        // array to an array of inner objects
        let allTopics = lessons.reduce(
            (prev, next) => prev.concat(next.topics),
            []
        );

        setAllTopics(allTopics);
        let currentTopic = allTopics.find((item) => item.id === topic_pk);
        let currentTopicIndex = allTopics.indexOf(currentTopic);
        let nextTopic = allTopics[currentTopicIndex + 1];
        if (nextTopic) setNextTopic(nextTopic);
    }, [lessons]);

    const playNextTopic = () => {
        if (Object.keys(nextTopic).length > 0 && showNextCard && !isModal) {
            setSelectedTopic(nextTopic);
            history.push(
                `/prime-programs/${nextTopic.course_slug}/${nextTopic.id}/`
            );
        }
    };

    useEffect(() => {
        if (showNextCard)
            timer = setTimeout(() => {
                playNextTopic();
            }, [5000]);
    }, [showNextCard]);

    const handlePlayNextCard = () => {
        if (showNextCard) {
            clearTimeout(timer);
        }
        setShowNextCard((prev) => !prev);
    };

    useEffect(() => {
        if (selectedTopic) {
            let currentLesson = lessons.find((item) =>
                item.topics.find((t) => t.id === topic_pk)
            );
            if (currentLesson) setSelectedLesson(currentLesson);
        }
    }, [lessons, selectedTopic]);

    const videoCard = () => (
        <div>
            {!isModal && showNextCard && (
                <UpNextCard className="anim-fade">
                    <NextTop>Up next</NextTop>
                    <NextTitle>{nextTopic.title}</NextTitle>
                    <LottieContainer onClick={playNextTopic}>
                        <span></span>
                        <Lottie options={defaultOptions} width="48%" />
                    </LottieContainer>
                    <NextCancel onClick={handlePlayNextCard}>Cancel</NextCancel>
                </UpNextCard>
            )}
            <VideoPlayer
                isPrime={true}
                handlePlayNextCard={handlePlayNextCard}
                cover={selectedTopic.thumbnail}
                source={selectedTopic.playlist_url}
                handleMarkViewed={handleMarkViewed}
            />
        </div>
    );

    const getCourse = () => {
        serverConfig
            .get(`learning/get-course/${topic_pk}/`, {
                headers: {
                    Authorization: `Bearer ${user_data.access_token}`,
                },
            })
            .then((response) => {
                const { status_code, data } = response.data;
                if (status_code === 6000) {
                    history.push(`/prime-programs/${data.course}/info/`);
                } else {
                    history.push(`/prime-programs/`);
                }
            })
            .catch(() => history.push(`/prime-programs/`));
    };

    useEffect(() => {
        const { access_token } = user_data;
        const fetchData = async () => {
            await serverConfig
                .get(`learning/topic/${topic_pk}/`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((response) => {
                    const { data } = response.data;
                    setLoading(false);
                    setTopic(data);
                    setWatched(data.is_watched);
                    setCertificationId(data.certificate_id);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        };

        setShowNextCard(false);
        if (topic_pk) {
            fetchData();
        }
    }, [topic_pk]);

    const markCurrentTopic = (pk) => {
        setLoading(true);
        const { access_token } = user_data;
        serverConfig
            .get(`learning/topic/set/current-topic/${pk}/`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((response) => {
                const { status_code } = response.data;
                if (status_code === 6000) {
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const handleMarkViewed = () => {
        const { access_token } = user_data;
        if (!isWatched && !isMarkAsLoading) {
            setMarkasLoading(true);
            serverConfig
                .get(`learning/topic/mark/viewed/${topic_pk}/`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((response) => {
                    const { status_code, data } = response.data;
                    if (status_code === 6000) {
                        setWatched(true);
                        setMarkasLoading(false);
                        if (data.is_course_completed) {
                            setTimeout(() => {
                                setModal(true);
                                setCertificationId(data.certificate_id);
                            }, 5000);
                        }
                    } else {
                        setMarkasLoading(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setMarkasLoading(false);
                });
        }
    };

    useEffect(() => {
        const fetchData = () => {
            let access_token = user_data.access_token;
            serverConfig
                .get(`learning/lessons/${topic.course}/`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((response) => {
                    const { status_code, data } = response.data;
                    if (status_code === 6000) {
                        setLessons(data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        if (Object.keys(topic).length > 0) {
            fetchData();
        }
        setSelectedTopic(topic);
        if (topic.id) {
            markCurrentTopic(topic.id);
        }
    }, [topic]);

    const handleBack = () => {
        history.push({
            pathname: "/prime-programs/",
            search: "",
        });
    };

    useEffect(() => {
        window.addEventListener("popstate", handleBack);
        return () => {
            window.removeEventListener("popstate", handleBack);
        };
    }, []);

    return (
        <>
            <TalropEdtechHelmet title={selectedTopic.title} />
            <Container>
                {isLoading ? (
                    <LoaderContainer>
                        <SignupLoader />
                    </LoaderContainer>
                ) : (
                    <>
                        <CertificateModal
                            certificationId={certificationId}
                            isModal={isModal}
                            setModal={setModal}
                            setTopic={setTopic}
                            isWatched={isWatched}
                        />
                        <PrimeContainer>
                            <PrimeTop>
                                <VideoContainer>{videoCard()}</VideoContainer>
                                <Topic>{selectedTopic.course_name}</Topic>
                                <Lesson>{selectedTopic.title}</Lesson>
                                {topic.description && (
                                    <Description>
                                        {selectedTopic.description}
                                    </Description>
                                )}
                            </PrimeTop>
                            <PrimeBottom>
                                {Object.keys(selectedLesson).length === 0 ? (
                                    <LoaderContainer>
                                        <Loader />
                                    </LoaderContainer>
                                ) : (
                                    <NavMenu>
                                        {topic.asset ? (
                                            <>
                                                {sections.map((item) => (
                                                    <MenuItem
                                                        onClick={() => setCurrentItem(item)}
                                                        className={
                                                            item.id === currentItem.id
                                                                ? "active"
                                                                : null
                                                        }
                                                    >
                                                        {item.title}
                                                    </MenuItem>
                                                ))}
                                            </>
                                        ) : (
                                            <>
                                                <MenuItem
                                                    onClick={() =>
                                                        setCurrentItem(currentItem)
                                                    }
                                                    className="active"
                                                >
                                                    Lectures
                                                </MenuItem>
                                            </>
                                        )}
                                    </NavMenu>
                                )}

                                {currentItem.title === "Lectures" && (
                                    <>
                                        <LessonBars
                                            allTopics={allTopics}
                                            selectedLesson={selectedLesson}
                                            setSelectedLesson={setSelectedLesson}
                                            lessons={lessons}
                                            selectedTopic={selectedTopic}
                                            setSelectedTopic={setSelectedTopic}
                                            topic={topic}
                                        />
                                    </>
                                )}
                                {currentItem.title === "Resources" && (
                                    <>
                                        <ResourceMainContainer>
                                            <ResourceContainer>
                                                <ResourceImg
                                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/zip.svg"
                                                    className="sc-gwZsXD fPEIEu"
                                                    alt="Image"
                                                />
                                                <ResourceDetails>
                                                    <Details>
                                                        <Name>{topic.asset_name}</Name>
                                                        <Size>
                                                            {isNaN(topic.asset_size)
                                                                ? topic.asset_size
                                                                : formatBytes(
                                                                      topic.asset_size
                                                                  )}
                                                        </Size>
                                                    </Details>
                                                    <DownloadLink
                                                        href={topic.asset}
                                                        download
                                                        target="_blank"
                                                    >
                                                        <DownloadImg
                                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/cloud-download.svg"
                                                            className="sc-cBOTKl gDRdBV"
                                                        />
                                                    </DownloadLink>
                                                </ResourceDetails>
                                            </ResourceContainer>
                                        </ResourceMainContainer>
                                    </>
                                )}
                            </PrimeBottom>
                        </PrimeContainer>
                    </>
                )}
            </Container>
        </>
    );
}

export default PurchasedTopic;

const UpNextCard = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(6px);
    display: grid;
    place-content: center;
    place-items: center;
`;
const LottieContainer = styled.div`
    cursor: pointer;
    @media (max-width: 480px) {
        margin: -14px 0;
    }
`;
const NextTop = styled.span`
    color: #fff;
    font-size: 19px;
    @media (max-width: 480px) {
        font-size: 17px;
    }
`;
const NextCancel = styled.span`
    color: #fff;
    font-size: 19px;
    cursor: pointer;
    @media (max-width: 480px) {
        font-size: 17px;
    }
`;
const NextTitle = styled.h4`
    font-size: 26px;
    font-family: "gordita_medium";
    color: #fff;
    @media (max-width: 480px) {
        font-size: 22px;
    }
`;
const IconWrap = styled.div`
    position: relative;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background: #fff;
    display: grid;
    place-items: center;
`;
const BorderLine = styled.div`
    height: 64px;
    width: 64px;
    border-radius: 50%;
    border: 3px solid#fff;
    display: grid;
    place-items: center;
    margin: 23px 0;
`;
const PlayNext = styled.img`
    display: block;
    position: absolute;
`;
const LoaderContainer = styled.div`
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;
const PrimeContainer = styled.div`
    display: grid;
    grid-template-columns: 2.3fr 1fr;
    padding: 30px 0;
    @media (max-width: 1080px) {
        display: block;
    }
`;
const PrimeTop = styled.div`
    -ms-overflow-style: none;
    scrollbar-width: none;
    height: calc(100vh - 70px);
    overflow-y: scroll;
    margin-top: 0px;
    @media (max-width: 980px) {
        height: unset;
    }
    &::-webkit-scrollbar {
        display: none;
    }
`;
const VideoContainer = styled.div`
    position: relative;
    margin-bottom: 26px;
`;
const Topic = styled.span`
    font-size: 16px;
    color: #15232e;
    font-family: "gordita_regular";
`;
const Lesson = styled.h2`
    font-size: 23px;
    font-family: "gordita_medium";
    margin-top: 1px;
    @media all and (max-width: 480px) {
        font-size: 20px;
    }
`;
const Description = styled.p`
    line-height: 1.3;
    font-size: 14px;
    font-family: "gordita_regular";
    @media (max-width: 380px) {
        font-size: 14px;
    }
`;
const NavMenu = styled.div`
    margin-bottom: 20px;
    @media all and (max-width: 480px) {
        margin-bottom: 15px;
    }
`;
const MenuItem = styled.span`
    font-size: 19px;
    font-family: "gordita_regular";
    margin-right: 25px;
    cursor: pointer;
    border-bottom: 3px solid #fff;
    &.active {
        border-bottom: 3px solid #15bf81;
        color: #15bf81;
    }
    @media all and (max-width: 480px) {
        font-size: 16px;
    }
`;
const PrimeBottom = styled.div`
    margin-left: 21px;
    padding-top: 12px;
    @media (max-width: 980px) {
        margin-left: 0px;
        @media (max-width: 980px) {
            height: unset;
        }
    }
`;

const ResourceMainContainer = styled.div``;
const ResourceContainer = styled.div`
    display: flex;
    align-items: center;
`;
const ResourceImg = styled.img`
    display: block;
    width: 39px;
    margin-right: 20px;
    @media (max-width: 640px) {
        width: 30px;
        margin-right: 15px;
    }
`;
const ResourceDetails = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;
const Details = styled.div``;
const Name = styled.span`
    display: block;
    font-family: gordita_medium;
    font-size: 17px;
    margin-bottom: -4px;
    @media (max-width: 640px) {
        font-size: 16px;
        margin-bottom: -1px;
    }
`;
const Size = styled.span`
    display: block;
    font-size: 16px;
    color: rgb(158, 158, 158);
    @media (max-width: 640px) {
        font-size: 14px;
    }
`;
const DownloadLink = styled.a`
    cursor: pointer;
    @media (max-width: 640px) {
        width: 28px;
    }
`;
const DownloadImg = styled.img`
    width: 29px;
`;
