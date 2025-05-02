import React, { useRef, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import MagicSliderDots from "react-magic-slider-dots";

function Features() {
  let slider = useRef();
  const [color] = useState([
    "linear-gradient(#3fbd7f,#37a970)",
    "linear-gradient(#6597e2,#7c82e5)",
    "linear-gradient(#b64adc,#9e60eb)",
    "linear-gradient(#f10ced,#c609c9)",
    "linear-gradient(#6597e2,#7c82e5)",
    "linear-gradient(#b64adc,#9e60eb)",
    "linear-gradient(#f10ced,#c609c9)",
  ]);
  const [textColor] = useState([
    "#3fbd7f",
    "#6597e2",
    "#b64adc",
    "#f10ced",
    "#6597e2",
    "#b64adc",
    "#f10ced",
  ]);
  const [features] = useState([
    {
      img: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/businessman.png",
      color: "#fff",
      text: "Experienced Support Engineers 24x7",
    },
    {
      img: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/meeting.png",
      color: "#fff",
      text: "Dedicated Relationship Managers ",
    },
    {
      img: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/coordinating-people.png",
      color: "#fff",
      text: "Friendly Student Coordinators",
    },
    {
      img: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/community.png",
      color: "#fff",
      text: "Students community for doubts",
    },
    {
      img: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/open-book.png",
      color: "#fff",
      text: "QA spot with predefined questions & answers",
    },
    {
      img: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/certification.png",
      color: "#fff",
      text: "3 step verified Certifications",
    },
    {
      img: "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/job-search.png",
      color: "#fff",
      text: "Professional Placement Support",
    },
  ]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    appendDots: (dots) => {
      return <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />;
    },
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <FeaturesContainer id="features_slider">
        <Slider {...settings}>
          {features.map((data, index) => {
            return (
              <FeaturesCard>
                <IconCard background={color[index]}>
                  <Icon src={data.img} alt="" />
                </IconCard>
                <FeatureText color={textColor[index]}>{data.text}</FeatureText>
                <Tick className="las la-check" color={textColor[index]}></Tick>
              </FeaturesCard>
            );
          })}
        </Slider>
      </FeaturesContainer>
      <Description>
        All Tech Schooling features will be available in all of the above
        packages
      </Description>
    </Container>
  );
}

export default Features;

const Container = styled.section``;
const FeaturesContainer = styled.div`
  padding-bottom: 10px;
  margin-top: 24px;
  @media (max-width: 480px) {
    margin-top: 17px;
    padding-bottom: 0px;
    .magic-dots.slick-dots {
      bottom: 9px !important;
    }
    .magic-dots.slick-dots {
      margin-top: 15px !important;
    }
  }
  @media (max-width: 400px) {
    .magic-dots.slick-dots {
      bottom: -5px !important;
    }
  }
  .magic-dots.slick-dots {
    width: 131px !important;
  }
  .slick-dots li {
    display: flex;
    align-items: center;
    width: 31px;
  }
  .slick-dots li button:before {
    font-size: 12px !important;
  }
  .slick-dots li.slick-active button:before {
    display: none !important;
  }
  .slick-dots li.slick-active button {
    width: 30px;
    height: 6px;
    background-color: #3fbd7f;
    border-radius: 8px;
    transition: ease 0.25s;
  }
`;
const FeaturesCard = styled.span`
  display: flex !important;
  align-items: center;
  justify-content: center;
`;
const IconCard = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 30px;
  background: ${(data) => data.background};
  @media all and (max-width: 768px) {
    width: 35px;
    height: 35px;
    margin-right: 15px;
  }
  @media all and (max-width: 460px) {
    width: 25px;
    height: 25px;
    margin-right: 8px;
  }
  @media all and (max-width: 420px) {
    display: none;
  }
`;
const Icon = styled.img`
  display: block;
  width: 20px;
  @media all and (max-width: 768px) {
    width: 20px;
  }
  @media all and (max-width: 460px) {
    width: 15px;
  }
`;
const FeatureText = styled.h3`
  color: ${(data) => data.color};
  font-size: 16px;
  margin-right: 30px;
  text-align: center;
  font-family: "gordita_medium";
  @media all and (max-width: 786px) {
    margin-right: 15px;
    font-size: 14px;
  }
  /* @media all and (max-width: 710px) {
		margin-right: 30px;
		font-size: 18px;
	} */
  @media all and (max-width: 460px) {
    margin-right: 0px;
    font-size: 13px;
  }
  @media all and (max-width: 360px) {
    /* margin-right: 8px; */
    /* font-size: 1px; */
  }
`;
const Tick = styled.span`
  font-size: 20px;
  color: ${(data) => data.color};
  @media all and (max-width: 550px) {
    display: none;
  }
`;

const Description = styled.p`
  text-align: center;
  margin-top: 70px;
  font-size: 18px;
  font-family: "gordita_medium";
  /* margin-bottom: 50px; */
  @media all and (max-width: 980px) {
    font-size: 16px;
    padding: 0 20px;
    margin-bottom: 50px;
  }
  @media all and (max-width: 640px) {
    font-size: 14px;
    padding: 0 20px;
  }
  @media all and (max-width: 480px) {
    margin-top: 13px;
    font-size: 14px;
    /* margin-bottom: 36px; */
  }
`;
