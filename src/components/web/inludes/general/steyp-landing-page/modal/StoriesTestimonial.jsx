import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import $ from "jquery";
import Slider from "react-slick";

const StoriesTestimonial = ({ isModal, setModal, personId, storieData }) => {
  let slider = useRef();
  const mainSliderRef = useRef();
  const modalSliderRef = useRef();

  const next = () => {
    slider.slickNext();
  };

  const previous = () => {
    slider.slickPrev();
  };

  // slider settings
  const settings = {
    fade: true,
    autoplay: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sortBySpecificIdFirst = (data, specificId) => {
    if (data.length > 0) {
      const specificItem = data.find((item) => item.id === specificId);
      const filteredData = data.filter((item) => item.id !== specificId);
      return [specificItem, ...filteredData];
    }
  };

  const sortedArray = sortBySpecificIdFirst(storieData, personId);

  return (
    <BackContainer style={{ transform: isModal && "scale(1,1)" }}>
      <Overlay onClick={() => setModal(false)}></Overlay>

      <Modal>
        <Slider
          ref={(c) => {
            slider = c;
          }}
          {...settings}
        >
          {sortedArray &&
            sortedArray.map((data) => (
              <Container key={data.id}>
                <CloseButton onClick={() => setModal(false)}>
                  <img
                    src={
                      "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/27-09-2024/cross-icon.svg"
                    }
                    alt="close"
                  />
                </CloseButton>
                <Content>
                  <TopContainer>
                    <PrevArrow onClick={previous}>
                      <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/left-arrow.png"
                        alt="Arrow"
                      />
                    </PrevArrow>
                    <ProfileContainer>
                      <ProfileImage>
                        <img
                          src={data?.student_image ? data.student_image : "--"}
                          alt={data?.student_name ? data.student_name : "--"}
                        />
                      </ProfileImage>
                      <Name>
                        {data?.student_name ? data.student_name : "--"}
                      </Name>
                      <Designation
                        margin={data?.linkedin_url ? data.linkedin_url : "--"}
                        className="single"
                      >
                        {data?.student_school ? data.student_school : "--"}
                      </Designation>

                      {data?.linkedin_url && (
                        <Linkedin href={data.linkedin_url} target="_blank">
                          <LinkedinIcon>
                            <img
                              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/29-09-2021/linkedin-white.svg"
                              alt="LinkedIn"
                            />
                          </LinkedinIcon>
                          <p>Linkedin Profile</p>
                        </Linkedin>
                      )}
                    </ProfileContainer>
                    <NextArrow onClick={next}>
                      <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/right-arrow.png"
                        alt="Arrow"
                      />
                    </NextArrow>
                  </TopContainer>
                  <BottomContainer>
                    <Quotes>
                      <img
                        src={
                          "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-07-2023/test.svg"
                        }
                        alt="quotes"
                      />
                    </Quotes>
                    <Review>
                      {data?.description ? data.description : "--"}
                    </Review>
                  </BottomContainer>
                </Content>
              </Container>
            ))}
        </Slider>
      </Modal>
    </BackContainer>
  );
};

export default StoriesTestimonial;

const BackContainer = styled.div`
  position: fixed;
  transition: 0.3s;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  left: 0;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
`;

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0px;
  width: 100%;
  height: 100vh;
`;

const Modal = styled.div`
  width: 60%;
  max-height: 75vh;
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 20px;
  background: #fff;
  position: fixed;
  border-radius: 10px;
  transition: 0.5s;
  z-index: 101;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  ::-webkit-scrollbar {
    display: none;
  }
  @media all and (max-width: 1280px) {
    width: 80%;
  }
  @media all and (max-width: 980px) {
  }
  @media all and (max-width: 768px) {
  }
  @media all and (max-width: 640px) {
    max-height: 65vh;
  }
  @media all and (max-width: 480px) {
    max-height: 75vh;
  }
  @media all and (max-width: 480px) {
    width: 85%;
    max-height: 75vh;
  }
`;

const Container = styled.div`
  padding: 40px 20px 0px 20px;
  @media all and (max-width: 1280px) {
    padding: 20px 10px 0px 10px;
  }
  @media all and (max-width: 980px) {
    padding: 30px 0px;
  }
  @media all and (max-width: 480px) {
    padding: 20px 0px;
  }
  @media all and (max-width: 360px) {
    padding: 14px 0px;
  }
`;

const CloseButton = styled.div`
  height: 20px;
  width: 20px;
  cursor: pointer;
  position: absolute;
  right: 21px;
  img {
    display: block;
    width: 100%;
  }
  @media all and (max-width: 980px) {
    width: 15px;
    height: 15px;
  }
  @media all and (max-width: 480px) {
    width: 12px;
    height: 12px;
  }
  @media all and (max-width: 360px) {
    width: 10px;
    height: 10px;
  }
`;

const Content = styled.div`
  padding: 20px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BottomContainer = styled.div`
  padding: 0px 30px;
  @media all and (max-width: 480px) {
    padding: 0px 17px;
  }
`;

const Quotes = styled.div`
  height: 15px;
  width: 15px;
  position: relative;
  left: -19px;
  bottom: -11px;

  img {
    display: block;
    width: 100%;
  }
  @media all and (max-width: 980px) {
    height: 13px;
    width: 13px;
  }
  @media all and (max-width: 480px) {
    height: 12px;
    width: 12px;
  }
`;

const Review = styled.p`
  font-size: 15px;
  text-align: justify;
  @media all and (max-width: 980px) {
    font-size: 14px;
  }
  @media all and (max-width: 480px) {
    font-size: 13px;
  }
  @media all and (max-width: 360px) {
    font-size: 12px;
  }
`;

const NextArrow = styled.div`
  height: 42px;
  width: 42px;
  cursor: pointer;
  position: relative;
  top: 60px;
  img {
    display: block;
    width: 100%;
  }
  @media all and (max-width: 980px) {
    width: 35px;
    height: 35px;
  }
  @media all and (max-width: 480px) {
    width: 28px;
    height: 28px;
  }
  @media all and (max-width: 360px) {
    width: 20px;
    height: 20px;
  }
`;

const PrevArrow = styled.div`
  cursor: pointer;
  position: relative;
  top: 60px;
  height: 42px;
  width: 42px;
  img {
    display: block;
    width: 100%;
  }
  @media all and (max-width: 980px) {
    width: 35px;
    height: 35px;
  }
  @media all and (max-width: 480px) {
    width: 28px;
    height: 28px;
  }
  @media all and (max-width: 360px) {
    width: 20px;
    height: 20px;
  }
`;

const Linkedin = styled.a`
  margin-top: 5px;
  z-index: 500;
  position: relative;
  display: flex;
  padding: 10px 20px;
  background-color: #2b7ebc;

  border-radius: 3px;
  p {
    font-size: 14px;
    font-family: gordita_medium;
    color: #fff;
    margin-left: 10px;
    @media all and (max-width: 480px) {
      font-size: 13px;
      margin-left: 7px;
    }
    @media all and (max-width: 360px) {
      font-size: 9px;
      margin-left: 6px;
    }
  }
  @media all and (max-width: 980px) {
    padding: 5px 10px;
  }
  @media all and (max-width: 480px) {
    padding: 4px 8px;
  }

  @media all and (max-width: 360px) {
    padding: 3px 7px;
  }
`;

const LinkedinIcon = styled.div`
  cursor: pointer;
  width: 30px;
  border-right: 1px solid white;
  img {
    width: 61%;
    height: auto;
    display: block;
  }
  @media all and (max-width: 480px) {
    width: 25px;
  }
  @media all and (max-width: 360px) {
    width: 18px;
  }
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

const ProfileImage = styled.div`
  height: 120px;
  width: 120px;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    display: block;
  }
  @media all and (max-width: 980px) {
    width: 100px;
    height: 100px;
  }
  @media all and (max-width: 480px) {
    width: 85px;
    height: 85px;
  }
  @media all and (max-width: 360px) {
    width: 75px;
    height: 75px;
  }
`;

const Name = styled.h3`
  font-size: 20px;
  margin-top: 20px;
  text-align: center;
  font-family: gordita_medium;
  @media all and (max-width: 980px) {
    font-size: 18px;
    margin-top: 10px;
  }
  @media all and (max-width: 360px) {
    font-size: 16px;
    margin-top: 5px;
  }
`;

const Designation = styled.p`
  color: #777575;
  text-align: center;
  font-family: gordita_medium;
  font-size: 14px;
  @media all and (max-width: 980px) {
    font-size: 12px;
  }
  @media all and (max-width: 360px) {
    font-size: 10px;
  }
`;
