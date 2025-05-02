import React, { useEffect, useState } from "react";
import VideoPlayer from "../../../../applications/video-player/src/VideoPlayer";
import { connect, useDispatch } from "react-redux";
import styled from "styled-components";
import TopicSmallCard from "../../../includes/techschooling/lesson-topics/TopicSmallCard";
import TopicAssetCard from "../../../includes/techschooling/lesson-topics/TopicAssetCard";
import { Link, useHistory, useParams } from "react-router-dom";
import { learnConfig } from "../../../../../axiosConfig";
import Loader from "../../../includes/techschooling/general/loaders/Loader";
import ModalScreen from "../../../includes/general/ModalScreen";
import { formatBytes } from "../../../../helpers/functions";
import TalropTechSchoolingHelmet from "../../../../helpers/TalropTechSchoolingHelmet";

function mapStateToProps(state) {
  return {
    user_data: state.user_data,
  };
}

function NewContentSinglePage(props) {
  const [topRightSwitchType, setTopRightSwitchType] = useState("classes");

  const { id } = useParams();
  useEffect(() => {
    fetchTopic(id);
  }, [id]);
  const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState("");
  const [topic, setTopic] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isTopicLoading, setTopicLoading] = useState(true);
  const history = useHistory();

  const fetchTopic = (id) => {
    let { user_data } = props;
    let { access_token } = user_data;
    setLoading(true);

    learnConfig
      .get("/learn/new-content/view/topic/" + id + "/", {
        headers: { Authorization: "Bearer " + access_token },
      })
      .then((response) => {
        const { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          let { playlists } = data;
          setPlaylist(playlists.auto.playlist);
          setTopic(data);
          fetchTopics(data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);

        dispatch({
          type: "UPDATE_ERROR",
          error: error,
          errorMessage: "Server error, please try again",
        });
      });
  };

  const [topics, setTopics] = useState([]);
  const fetchTopics = (topic) => {
    let { user_data } = props;
    let { access_token } = user_data;
    learnConfig
      .get("/learn/new-content/topics/" + topic.lesson_pk + "/", {
        headers: { Authorization: "Bearer " + access_token },
        params: { response: "play_list" },
      })
      .then((response) => {
        let topics = response.data.data;
        setTopics(topics);
        setTopicLoading(false);
      })
      .catch((error) => {
        setTopicLoading(false);

        dispatch({
          type: "UPDATE_ERROR",
          error: error,
          errorMessage: "Server error, please try again",
        });
      });
  };

  const renderTopicCard = topics.map((topic, index) => (
    <TopicSmallCard
      key={index}
      topic={topic}
      topic_id={id}
      is_new_content={true}
      subject_slug={props.subject_slug}
    />
  ));

  const getName = (name) => {
    const names = name.split("/");
    return names[names.length - 1];
  };

  const AssetsCard = () => {
    return (
      topic.attachment && (
        <TopicAssetCard
          title={getName(topic.attachment_name["0"])}
          size={formatBytes(topic.attachment_size)}
          icon={
            topic.file_type === "doc"
              ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/doc.svg"
              : topic.file_type === "pdf"
              ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/pdf.svg"
              : topic.file_type === "zip"
              ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/zip.svg"
              : topic.file_type === "xlsx"
              ? "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/sheets.svg"
              : "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/zip.svg"
          }
          item_link={topic.attachment}
        />
      )
    );
  };

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: "https://storage.googleapis.com/coverr-main/mp4%2Fcoverr-an-early-morning-1579770136327.mp4",
        type: "video/mp4",
      },
    ],
  };

  const renderTopicVideo = playlist && (
    <VideoPlayer {...videoJsOptions} cover={topic.image} source={playlist} />
  );

  //modal functionalities
  const [showModal, setShowModal] = useState(false);
  const [successButtonText, setSuccessButtonText] = useState("Yes");
  const [message, setMessage] = useState("");
  const [successButtonLink, setSuccessButtonLink] = useState("");
  const [successModalVisible, setSuccessModal] = useState(false);
  const [markasLoading, setMarkasLoading] = useState(false);

  const handleModal = (status) => {
    setShowModal((prevValve) => !prevValve);
    setSuccessButtonText("Yes");
    if (status === "show_success_modal") {
      markasComplete();
    }
  };
  const [dayByDayData, setDayByDayData] = useState(null);
  const [currentDayObject, setCurrentDayObject] = useState(null);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("day_by_day");
      if (storedData) {
        setDayByDayData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error(
        "Error retrieving day_by_day data from localStorage:",
        error
      );
    }
  }, []);

  useEffect(() => {
    if (dayByDayData) {
      try {
        const foundDayObject = Object.values(dayByDayData).find(
          (day) => day.is_current_day
        );
        setCurrentDayObject(foundDayObject);
      } catch (error) {
        console.error("Error finding current day object:", error);
      }
    }
  }, [dayByDayData]);

  const markasComplete = () => {
    setMarkasLoading(true);
    let { user_data } = props;
    let { access_token } = user_data;
    learnConfig
      .post(
        `/learn/new-content/topic/mark-as-complete/${id}/`,
        {},
        {
          headers: { Authorization: "Bearer " + access_token },
        }
      )
      .then((response) => {
        const { StatusCode, data } = response.data;
        if (StatusCode === 6000) {
          setMessage(
            "Completed the topic successfully, You can view this topic again from Tech Schooling syllabus"
          );
          if (data.next_topic) {
            setSuccessButtonText("Go to next topic");
            setSuccessButtonLink(
              `/nanodegree/${props.subject_slug}/new-content/skills/topics/view/${data.next_topic}/`
            );
          } else {
            setSuccessButtonText("Go to new content skills");
            setSuccessButtonLink(`/new-content/skills/`);
          }
          setSuccessModal(true);
          setMarkasLoading(false);
        } else if (StatusCode === 6001) {
          setMarkasLoading(false);
        }
      })
      .catch((error) => {
        setMarkasLoading(false);
      });
  };

  return (
    <>
      <TalropTechSchoolingHelmet title={topic.name} />
      <ModalScreen
        butttonLoading={markasLoading}
        markasComplete={markasComplete}
        show_modal={showModal}
        redirect={false}
        title="Are you sure that you have completed this topic?"
        message="This topic will be moved to Tech Schooling syllabus"
        successButtonText={successButtonText}
        successButtonLink="show_success_modal"
        cancelButtonText="No"
        onModalClose={handleModal}
        image={
          "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/top-banner.png"
        }
      />
      <ModalScreen
        butttonLoading={false}
        show_modal={successModalVisible}
        title="Congratulations!"
        message={message}
        redirect={false}
        successButtonText={successButtonText}
        successButtonLink={successButtonLink}
        onModalClose={() => setSuccessModal(false)}
        image={
          "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/top-banner.png"
        }
      />
      <VideoCardContainer>
        <VideoWrapper>
          {isLoading || markasLoading ? (
            <LoaderConatiner>
              <Loader />
            </LoaderConatiner>
          ) : (
            <>
              {renderTopicVideo}
              <TitleWrapper>
                <Left>
                  <LookBack>
                    <PrevLink
                      to={`/nanodegree/${props.subject_slug}/professions/${topic.designation_pk}/`}
                    >
                      {topic.designation_name}
                    </PrevLink>{" "}
                    /{" "}
                    <PrevLink
                      to={`/nanodegree/${props.subject_slug}/lessons/${topic.skill_pk}/`}
                    >
                      {topic.skill_name}
                    </PrevLink>{" "}
                    / <PrevLinkInactive>{topic.lesson_name}</PrevLinkInactive>
                  </LookBack>
                  <Title>{topic.name}</Title>
                </Left>
                {topic.status === "started" && (
                  <Button onClick={handleModal}>Mark as complete</Button>
                )}
              </TitleWrapper>
              <MasterCard>
                <MasterImageWrapper>
                  <MasterImage
                    src={
                      "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/profile/person.jpg"
                    }
                    alt="Image"
                  />
                </MasterImageWrapper>
                <MasterCardRight>
                  <MasterName>Sobir N</MasterName>
                  <MasterDesignation>Founder & CEO of Steyp</MasterDesignation>
                </MasterCardRight>
              </MasterCard>
              <DescriptionContainer>{topic.description}</DescriptionContainer>
            </>
          )}
        </VideoWrapper>
        <TopRight>
          {isTopicLoading ? (
            <LoaderConatiner>
              <Loader />
            </LoaderConatiner>
          ) : (
            <>
              <TopBar>
                <TopBarSwitch
                  style={{
                    width: !topic.attachment && "100%",
                  }}
                  className={topRightSwitchType === "classes" && "active"}
                  onClick={() => setTopRightSwitchType("classes")}
                >
                  Topics ({topics.length})
                </TopBarSwitch>
                {topic.attachment && (
                  <TopBarSwitch
                    className={topRightSwitchType === "assets" && "active"}
                    onClick={() => setTopRightSwitchType("assets")}
                  >
                    Assets
                  </TopBarSwitch>
                )}
              </TopBar>
              <TopBottom>
                {topRightSwitchType === "classes" ? (
                  <TopicCards>{renderTopicCard}</TopicCards>
                ) : topRightSwitchType === "assets" ? (
                  <TopicCards style={{ paddingTop: 0 }}>
                    <AssetsCard />
                  </TopicCards>
                ) : null}
              </TopBottom>
            </>
          )}
        </TopRight>
      </VideoCardContainer>
    </>
  );
}
const VideoCardContainer = styled.div`
  display: flex;
  margin-top: 30px;
  position: relative;
  max-height: 1100px;
  overflow: hidden;
  margin-bottom: -70px;
  @media (max-width: 1024px) {
    flex-wrap: wrap;
    max-height: unset;
  }
`;
const VideoWrapper = styled.div`
  overflow: hidden;
  width: 80%;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
const LoaderConatiner = styled.div`
  min-height: 500px;
  display: flex;
  align-items: center;
`;
const TopRight = styled.div`
  margin-left: 18px;
  min-width: 411px;
  overflow-y: scroll;
  margin-right: -28px;
  padding-right: 28px;
  @media (max-width: 1024px) {
    margin-left: 0;
    min-width: 100%;
    padding-right: 0;
  }
`;
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TopBarSwitch = styled.span`
  cursor: pointer;
  color: #646464;
  padding: 6px 0 7px;
  border-bottom: 2px solid #c6c6c6;
  width: 50%;
  font-family: "baloo_paaji_2medium";
  font-size: 17px;
  &.active {
    border-bottom-color: #707070;
    color: #000;
  }
  &:last-child {
    padding-left: 15px;
  }
`;
const TopBottom = styled.div``;
const TopicCards = styled.div`
  padding: 22px 0;
  overflow-y: scroll;
  &::-webkit-scrollbar-thumb {
    display: none;
  }
  @media (max-width: 1024px) {
    display: flex;
    overflow-x: scroll;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 23px 0 15px;
  @media (max-width: 640px) {
    margin: 14px 0 16px;
  }
  @media (max-width: 540px) {
    flex-direction: column;
    margin: 11px 0 25px;
  }
  // @media (max-width: 640px) {
  //     flex-direction: column;
  //     margin: 11px 0 25px;
  // }
  @media (max-width: 480px) {
    flex-direction: column;
    margin: 11px 0 25px;
  }
`;
const Left = styled.div``;
const LookBack = styled.span`
  font-size: 14px;
  color: #a9a9a9;
`;
const PrevLink = styled(Link)`
  color: #2196f3;
`;
const PrevLinkInactive = styled.span`
  color: #333;
`;
const Title = styled.h3`
  font-size: 24px;
  font-family: "baloo_paaji_2medium";
  @media (max-width: 640px) {
    font-size: 22px;
  }
  @media (max-width: 480px) {
    font-size: 19px;
  }
  @media (max-width: 360px) {
    font-size: 18px;
  }
`;
const Button = styled.span`
  min-width: 200px;
  cursor: pointer;
  background: #3a9689;
  font-family: gordita_regular;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  border-radius: 5px;
  color: #fff;
  height: fit-content;
  @media (max-width: 540px) {
    width: fit-content;
  }
  @media (max-width: 480px) {
    font-size: 14px;
    margin-top: 8px;
    padding: 7px 15px;
    width: fit-content;
    min-width: 150px;
  }
`;
const MasterCard = styled.div`
  display: flex;
`;
const DescriptionContainer = styled.p`
  padding: 20px 0;
  @media (max-width: 480px) {
    padding-top: 16px;
  }
`;
const MasterImageWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 55px;
  width: 55px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 19px;
  @media (max-width: 480px) {
    height: 43px;
    width: 43px;
    margin-right: 13px;
  }
`;
const MasterImage = styled.img`
  display: block;
  width: 100%;
`;
const MasterCardRight = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
`;
const MasterName = styled.span`
  display: block;
  font-family: "baloo_paaji_2medium";
  font-size: 19px;
  margin-bottom: -5px;
  color: #505050;
  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: -2px;
  }
`;
const MasterDesignation = styled.span`
  display: block;
  color: #686769;
  font-size: 15px;
`;

export default connect(mapStateToProps, null)(NewContentSinglePage);
