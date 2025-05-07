import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PreviewModal from "./PreviewModal";
import { serverConfig } from "../../../../axiosConfig";
import useUserStore from "../../../../store/authStore";
import { numberWithCommas, secondsTohm } from "../../../general/helpers/functions";
import Loader from "../../includes/techschooling/general/loaders/Loader";
import BuynowModal from "./BuynowModal";
import NewBuyNowModal from "./NewBuyNowModal";
import queryString from "query-string";
import PaymentStatusModal from "./PaymentStatusModal";
import CurriculamTabBars from "./CurriculamTabBars";
import auth from "../../../routing/auth";
import TalropEdtechHelmet from "../../../general/helpers/TalropEdtechHelmet";
import StartNowModal from "./StartNowModal";
import SignupLoader from "../../includes/techschooling/general/loaders/SignupLoader";
import { useMediaQuery } from "react-responsive";

const PrimeProgramsTopic = () => {
  const [isModal, setModal] = useState(false);
  const { course_id } = useParams();
  const [topics, setTopics] = useState([]);
  const [action, setAction] = useState("");
  const [promoVideo, setPromoVideo] = useState({});
  const [previewVideos, setPreviewVideos] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [courseRequirements, setCourseRequirements] = useState([]);
  const [courseHighlights, setCourseHighlights] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selected, setSelected] = useState({});
  const { user_data } = useAuthStore();
  const [status, setStatus] = useState("");
  const [coupon, setCoupon] = useState("");
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("");
  const [topicId, setTopicId] = useState("");
  const [purchaseType, setPurchaseType] = useState("");
  const [isStartModal, setStartModal] = useState(false);
  const [isUsedPurchasedCoins, setIsUsedPurchasedCoins] = useState(false);
  const [isBuyNowModal, setBuyNowModal] = useState(false);
  const [isStartNowModal, setStartNowModal] = useState(false);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
  });

  const location = useLocation();
  const { is_expired, is_subscription } = user_data;
  const navigate = useNavigate();

  useEffect(() => {
    const setInitialSearch = () => {
      let { search } = location;
      const values = queryString.parse(search);
      let status = values.status;
      let c = values.coupon;
      let topicId = values.topic;
      let purchase_type = values.type;
      setStatus(status);
      setCoupon(c);
      setTopicId(topicId);
      setPurchaseType(
        purchase_type === "p"
          ? "subscription"
          : purchase_type === "c"
          ? "purchase"
          : null
      );
    };
    setInitialSearch();
  }, []);

  useEffect(() => {
    if (status === "success" && topicId) {
      setShow(true);
      setModalType("success");
      setStatus("success");
    } else if (status === "failed") {
      setShow(true);
      setModalType("failed");
      setStatus("failed");
    }
  }, [status]);

  useEffect(() => {
    let { search } = location;
    const values = queryString.parse(search);
    const action = values.action;
    setAction(action);
  }, [location.search]);

  useEffect(() => {
    const fetch = async () => {
      const fetchSyllabus = serverConfig.get(
        `learning/syllabus/${course_id}/`,
        {
          headers: {
            Authorization: `Bearer ${user_data?.access_token}`,
          },
        }
      );

      const fetchData = serverConfig.get(
        `learning/course/${course_id}/`,
        {
          headers: {
            Authorization: `Bearer ${user_data?.access_token}`,
          },
        }
      );

      Promise.all([fetchSyllabus, fetchData])
        .then(([syllabusRes, dataRes]) => {
          const { status_code: syllabusstatus_code, data: syllabusData } = syllabusRes.data;
          const { status_code: datastatus_code, data: courseData } = dataRes.data;

          if (syllabusstatus_code === 6000 && datastatus_code === 6000) {
            setTopics(courseData);
            setSyllabus(syllabusData);
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

    if (auth.isAuthenticated()) {
      fetch();
    }
  }, [course_id, user_data?.access_token]);

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);
  });

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const closeModal = () => {
    setAction("");
  };

  let description = topics?.description?.replace(/\n/g, "<br />");

  const markupText = () => {
    return {
      __html: description,
    };
  };

  return (
    <>
      <TalropEdtechHelmet title={topics.name} />
      {isLoading ? (
        <LoaderContainer>
          <SignupLoader />
        </LoaderContainer>
      ) : (
        <>
          <StartNowModal
            isModal={isStartModal}
            setModal={setStartModal}
            course={topics}
          />
          <PaymentStatusModal
            status={status}
            setStatus={setStatus}
            setShow={setShow}
            show={show}
            modalType={modalType}
            setModalType={setModalType}
            topicId={topicId}
            course_id={course_id}
            setTopicId={setTopicId}
            couponId={coupon}
            purchase_type={purchaseType}
          />
          <MainContainer>
            <NewBuyNowModal
              location={location}
              action={action}
              closeModal={closeModal}
              setTopicId={setTopicId}
              isLoading={isLoading}
              setLoading={setLoading}
              setSelected={setSelected}
              selected={selected}
              data={topics}
            />
            <PreviewModal
              promoVideo={promoVideo}
              isPromo={true}
              isModal={isModal}
              setModal={setModal}
              previewVideos={previewVideos}
            />
            <Heading>Prime Programs</Heading>
            {!is_subscription || (is_subscription && is_expired) ? (
              <SubscribeBadge>
                <LeftSection>
                  <BannerTitle>
                    Enjoy the benefits of our &#160;
                    <span> Subscription&#160;offer</span>
                  </BannerTitle>
                  <MobilePrice>₹500/month</MobilePrice>
                </LeftSection>
                <RightSection>
                  <Price>₹500/month</Price>
                  <SubscribeButton
                    onClick={(e) => {
                      e.preventDefault();
                      if (auth.isAuthenticated()) {
                        navigate({
                          pathname: `/prime-programs/courses/`,
                          search: `?action=subscribe-prime-programs`,
                        });
                      } else {
                        navigate({
                          pathname: location.pathname,
                          search: `?action=login&next=${location.pathname}`,
                        });
                      }
                    }}
                  >
                    Subscribe Now
                  </SubscribeButton>
                </RightSection>
              </SubscribeBadge>
            ) : null}
            <Conatiner>
              <Title>{topics.name}</Title>
              <Para>{topics.short_description}</Para>
              <DivInfo>
                <LessonCont>
                  <LessonIcon className="las la-layer-group"></LessonIcon>
                  <LessonText>{topics.lessons_count} Lessons</LessonText>
                </LessonCont>
                <TimeCont>
                  <TimeIcon className="las la-clock"></TimeIcon>
                  <TimeText>{secondsTohm(topics.duration)}</TimeText>
                </TimeCont>
              </DivInfo>
            </Conatiner>
            <CurriculamTabBars
              topics={topics}
              syllabus={syllabus}
              setModal={setModal}
              setPromoVideo={setPromoVideo}
              setPreviewVideos={setPreviewVideos}
            />
          </MainContainer>
        </>
      )}
    </>
  );
};

export default PrimeProgramsTopic;

const SubscribeBadge = styled.div`
  background-color: #003c3c;
  padding: 10px 20px;
  margin-bottom: 20px;
  margin-top: -10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media all and (max-width: 980px) {
    padding: 20px 30px;
  }
  @media all and (max-width: 680px) {
    padding: 20px;
  }
  @media all and (max-width: 480px) {
    flex-wrap: wrap;
  }
`;
const LeftSection = styled.div`
  @media all and (max-width: 680px) {
    width: 100%;
  }
`;
const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* @media all and (max-width: 680px) {
        width: 100%;
        justify-content: flex-start;
    } */
`;
const BannerTitle = styled.h3`
  position: relative;
  font-size: 20px;
  font-family: gordita_medium;
  display: inline-block;
  color: #fff;
  span {
    color: #4ca473;
    position: relative;
    display: inline-block;
    &::after {
      content: "";
      display: block;
      width: 15px;
      height: 15px;
      background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/right_quote.svg")
        no-repeat;
      background-size: contain;
      position: absolute;
      bottom: 6px;
      right: -20px;
    }
  }
  &::before {
    content: "";
    display: block;
    width: 15px;
    height: 15px;
    background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/16-03-2022/left_quote.svg")
      no-repeat;
    background-size: contain;
    position: absolute;
    top: -10px;
    left: -10px;
  }

  @media all and (max-width: 980px) {
    font-size: 18px;
    &::before,
    ::after {
      width: 10px;
    }
    &::before {
      top: -8px;
      left: -10px;
    }
    span {
      ::after {
        bottom: 6px;
        right: -15px;
        width: 10px;
      }
    }
  }
  @media all and (max-width: 680px) {
    font-size: 18px;
  }
  @media all and (max-width: 360px) {
    font-size: 18px;
  }
`;
const Price = styled.p`
  color: #fff;
  font-size: 22px;
  font-family: "gordita_medium";

  @media all and (max-width: 980px) {
    font-size: 20px;
  }
  @media all and (max-width: 680px) {
    display: none;
  }
`;
const MobilePrice = styled.p`
  display: none;
  color: #fff;
  font-size: 22px;
  font-family: "gordita_medium";
  @media all and (max-width: 680px) {
    display: block;
    margin-top: 10px;
    font-size: 18px;
  }
  @media all and (max-width: 480px) {
    margin-bottom: 10px;
  }
`;
const SubscribeButton = styled.span`
  display: block;
  width: 180px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4ca473;
  border: 2px solid transparent;
  color: #fff;
  font-family: gordita_medium;
  border-radius: 8px;
  margin-left: 20px;
  cursor: pointer;

  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 0.7;
  }
  @media all and (max-width: 980px) {
    font-size: 14px;
    width: 150px;
    height: 40px;
    border-radius: 5px;
  }
  @media all and (max-width: 480px) {
    margin-left: 0;
  }
`;

const MainContainer = styled.section``;
const LoaderContainer = styled.div`
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Conatiner = styled.section`
  background-color: #2f2d4f;
  padding: 20px 28px;
  border-radius: 5px;
  @media (max-width: 640px) {
    padding: 15px 25px;
  }
  @media (max-width: 380px) {
    margin-bottom: 15px;
  }
`;
const Title = styled.h4`
  color: #ffff;
  font-size: 22px;
  font-family: "gordita_medium";
  width: 70%;
  @media (max-width: 740px) {
    width: 100%;
    line-height: 1.3;
  }
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;
const Heading = styled.h1`
  font-family: "gordita_medium";
  margin: 30px 0;
  font-size: 24px;
  @media (max-width: 480px) {
    margin: 35px 0 30px;
  }
`;
const Para = styled.p`
  font-size: 14px;
  font-family: gordita_regular;
  width: 50%;
  margin: 15px 0;
  color: #ffff;
  @media (max-width: 740px) {
    width: 100%;
  }
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;
const DivInfo = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 340px) {
    flex-direction: column;
  }
`;
const LessonCont = styled.div`
  display: flex;
  margin-right: 15px;
  @media (max-width: 340px) {
    margin-right: 0;
    width: 100%;
  }
`;
const LessonIcon = styled.span`
  color: #ffff;
  font-size: 19px;
`;
const LessonText = styled.p`
  font-size: 13px;
  margin-left: 8px;
  font-family: gordita_regular;
  color: #ffff;
  @media (max-width: 380px) {
    font-size: 12px;
  }
`;
const TimeCont = styled.div`
  display: flex;
  @media (max-width: 340px) {
    margin-left: 0;
    width: 100%;
  }
`;
const TimeIcon = styled.span`
  color: #ffff;
  font-size: 19px;
`;
const TimeText = styled.p`
  font-size: 13px;
  margin-left: 8px;
  font-family: gordita_regular;
  color: #ffff;
  @media (max-width: 380px) {
    font-size: 12px;
  }
`;
const Section = styled.div`
  padding: 25px;
  position: relative;
  @media (max-width: 980px) {
    padding: 15px;
  }
  @media (max-width: 740px) {
    padding: 0;
  }
`;
const MiddleSection = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Description = styled.div`
  margin: 15px 0 40px;
  min-height: 290px;
  width: 65%;
  @media (max-width: 1080px) {
    width: 60%;
    height: auto;
  }
  @media (max-width: 900px) {
    width: 55%;
  }
  @media (max-width: 740px) {
    width: 100%;
    min-height: 0;
    margin-bottom: 35px;
  }
`;
const About = styled.h6`
  margin-bottom: 15px;
  font-size: 22px;
  font-family: "gordita_medium";
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
  @media (max-width: 380px) {
    font-size: 20px;
  }
`;
const AboutPara = styled.p`
  font-size: 14px;
  color: #57656b;
  font-family: "gordita_regular";
  @media (max-width: 740px) {
    width: 100%;
  }
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
const Card = styled.div`
  top: -115px;
  right: 35px;
  width: 330px;
  position: absolute;
  box-shadow: 0px 3px 83px #0000001a;
  @media (max-width: 1280px) {
    width: 300px;
  }
  @media (max-width: 980px) {
    width: 295px;
    right: 20px;
  }
  @media (max-width: 840px) {
    width: 270px;
    right: 20px;
  }
  @media (max-width: 740px) {
    display: none;
  }
`;
const OfferCard = styled.div`
  display: none;
  @media (max-width: 740px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 35px 0 15px;
    background-color: #f9f9fb;
    padding: 20px;
    border-radius: 5px;
  }
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const TopSection = styled.div``;
const OfferTopSection = styled.div`
  width: 35%;
  @media (max-width: 740px) {
    position: relative;
  }
  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 15px;
  }
`;
const Badge = styled.img`
  position: absolute;
  left: -23px;
  top: 0;
  z-index: 1;
  @media (max-width: 1100px) {
    width: 120px;
    left: -20px;
  }
  @media (max-width: 740px) {
    left: -24px;
    top: -1px;
    width: 130px;
  }
`;
const Offer = styled.div`
  position: absolute;
  left: 15px;
  top: 6px;
  color: #51a471;
  z-index: 1;
  font-size: 14px;
  font-family: "gordita_medium";
  @media (max-width: 1100px) {
    left: 10px;
    top: 4px;
  }
  @media (max-width: 740px) {
    left: 9px;
    top: 4px;
  }
`;
const ImageContainer = styled.div`
  position: relative;
  cursor: ${(props) => props.length > 0 && "pointer"};
`;
const VideoImage = styled.img`
  width: 100%;
  display: block;
  @media (max-width: 740px) {
    border-radius: 5px;
  }
`;
const Play = styled.img`
  border-radius: 50%;
  display: block;
  box-shadow: 5px 0px 27px #00000075;
  @media (max-width: 980px) {
    width: 45px;
  }
  @media (max-width: 740px) {
    width: 40px;
  }
  @media (max-width: 620px) {
    width: 35px;
  }
  @media (max-width: 600px) {
    width: 45px;
  }
  @media (max-width: 420px) {
    width: 35px;
  }
`;
const PlayContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const CardBottomSection = styled.div`
  padding: 20px;
  background-color: #f9f9fb;
  @media (max-width: 740px) {
    width: 600px;
  }
  @media (max-width: 740px) {
    width: 700px;
  }
`;
const OfferCardBottomSection = styled.div`
  width: 60%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
const CardMiddle = styled.div``;
const CardBottom = styled.div`
  display: flex;
  align-items: center;
  border-top: 2px dashed #64c5a2;
  background-color: #f9f9fb;
  justify-content: space-between;
  padding-top: 25px;
  margin-top: 20px;
  @media (max-width: 740px) {
    display: none;
  }
`;
const PriceContainer = styled.div``;
const LowPrice = styled.span`
  font-size: 26px;
  font-family: "gordita_medium";
`;
const HighPrice = styled.p`
  text-decoration: line-through;
  font-family: "gordita_medium";
  font-size: 16px;
  margin-top: -5px;
`;
const BuyButton = styled(Link)`
  background-color: #15bf81;
  color: #fff;
  padding: 6px 44px;
  font-size: 18px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: "gordita_medium";
  @media (max-width: 980px) {
    padding: 5px 25px;
  }
  @media (max-width: 640px) {
    padding: 5px 40px;
  }
  @media (max-width: 480px) {
    padding: 5px 35px;
  }
`;
const BuyButtonSpan = styled.span`
  background-color: #15bf81;
  color: #fff;
  padding: 6px 44px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  font-family: "gordita_medium";
  @media (max-width: 980px) {
    padding: 5px 25px;
  }
  @media (max-width: 640px) {
    padding: 5px 40px;
  }
  @media (max-width: 480px) {
    padding: 5px 35px;
  }
`;
const Top = styled.div`
  max-height: 100px;
  overflow-y: scroll;
`;
const CourseContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  background-color: #f8fcfb;
  border: 2px dashed #51a471;
  padding: 30px;
  width: 100%;
  @media (max-width: 768px) {
    padding: 20px;
    display: block;
  }
`;
const DivLeft = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 30px;
  }
  @media (max-width: 550px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;
const CourseTitle = styled.h6`
  margin-bottom: 15px;
  font-size: 22px;
  font-family: "gordita_medium";
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
  @media (max-width: 380px) {
    font-size: 20px;
  }
`;
const List = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  :last-child {
    margin-bottom: 0;
  }
`;
const Text = styled.p`
  color: #57656b;
  font-family: "gordita_regular";
  font-size: 14px;
  width: 455px;
  @media (max-width: 1300px) {
    width: 400px;
  }
  @media (max-width: 1200px) {
    width: 350px;
  }
  @media (max-width: 1070px) {
    width: 300px;
  }
  @media (max-width: 940px) {
    width: 250px;
  }
  @media (max-width: 830px) {
    width: 230px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
    width: 100%;
  }
  @media (max-width: 400px) {
    font-size: 13px;
  }
`;

const CardText = styled.p`
  color: #57656b;
  font-size: 14px;
  word-wrap: break-word;
  font-family: "gordita_regular";
  width: 265px;
  @media (max-width: 740px) {
    font-size: 16px;
    width: 100%;
  }
  @media (max-width: 400px) {
    font-size: 13px;
  }
`;
const DivRight = styled.div`
  width: 45%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Curriculum = styled.h6`
  margin: 40px 0 15px;
  font-size: 22px;
  font-family: "gordita_medium";
  @media (max-width: 768px) {
    margin: 35px 0 10px;
  }
  @media (max-width: 480px) {
    margin: 20px 0;
  }
  @media (max-width: 380px) {
    font-size: 20px;
  }
  @media (max-width: 340px) {
    margin: 20px 0 15px;
  }
`;
const ImgContainer = styled.div`
  margin-right: 10px;
  width: 16px;
`;
const CardImgContainer = styled.div`
  width: 14px;
  margin-right: 10px;
`;
const Image = styled.img`
  width: 100%;
  display: block;
  @media (max-width: 480px) {
    width: 13px;
  }
`;
const CurriculumLessons = styled.div`
  margin-bottom: 20px;
`;
const FooterContainer = styled.div`
  background: #f5f5f5;
  @media (max-width: 740px) {
    margin-top: 60px;
  }
`;
const Footer = styled.div`
  display: none;
  @media (max-width: 740px) {
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 19;
    background: #f9f9fb;
    justify-content: space-between;
    padding: 10px 50px;
    @media (max-width: 560px) {
      padding: 10px 30px;
    }
    @media (max-width: 410px) {
      padding: 10px 20px;
    }
  }
`;
const BuyButtonFooter = styled.span`
  background-color: #15bf81;
  color: #fff;
  padding: 6px 150px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  font-family: "gordita_medium";
  @media (max-width: 670px) {
    padding: 6px 120px;
  }
  @media (max-width: 560px) {
    padding: 6px 80px;
  }
  @media (max-width: 480px) {
    padding: 8px 47px;
  }
  @media (max-width: 390px) {
    font-size: 15px;
    padding: 9px 37px;
  }
  @media (max-width: 360px) {
    padding: 7px 30px;
  }
`;
const PriceContainerFooter = styled.div`
  width: 200px;
  justify-content: center;
  display: flex;
  align-items: center;
  @media (max-width: 670px) {
    width: 150px;
  }
  @media (max-width: 480px) {
    width: 162px;
    display: flex;
    justify-content: flex-start;
  }
  @media (max-width: 360px) {
    width: 150px;
  }
`;
const LowPriceFooter = styled.span`
  font-size: 28px;
  font-family: "gordita_medium";
  @media (max-width: 480px) {
    font-size: 22px;
  }
  @media (max-width: 340px) {
    font-size: 24px;
  }
`;
const HighPriceFooter = styled.span`
  text-decoration: line-through;
  font-size: 20px;
  margin-right: 5px;
  @media (max-width: 480px) {
    font-size: 16px;
  }
  @media (max-width: 340px) {
    font-size: 15px;
  }
`;

const StartButton = styled.span`
  background-color: #15bf81;
  color: #fff;
  padding: 6px 44px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  font-family: "gordita_medium";
  @media (max-width: 980px) {
    padding: 5px 25px;
  }
  @media (max-width: 640px) {
    padding: 5px 40px;
  }
  @media (max-width: 480px) {
    padding: 5px 35px;
  }
`;
