import React, { useRef } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function About() {
  const about = [
    {
      id: 1,
      content: "Learn From Anywhere, Anytime",
      color: "#53b051",
      image:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/play.svg",
    },
    {
      id: 2,
      content: "No Age Difference",
      color: "#41619f",
      image:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/age.svg",
    },
    {
      id: 3,
      content: "No Educational Qualification",
      color: "#41bdb1",
      image:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/edu.svg",
    },
    {
      id: 4,
      content: "No Long Term Commitment",
      color: "#53b051",
      image:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/time.svg",
    },
    {
      id: 5,
      content: "Pay As You Go",
      color: "#53b051",
      image:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/pay.svg",
    },
    {
      id: 6,
      content: "Expert Teaching Faculty",
      color: "#41619f",
      image:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/teacher.svg",
    },
    {
      id: 7,
      content: "Cross Platform Support",
      color: "#41bdb1",
      image:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/cross.svg",
    },
    {
      id: 8,
      content: "100% Secure & Affordable",
      color: "#53b051",
      image:
        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/secure.svg",
    },
  ];

  let slider = useRef();

  const next = () => {
    slider.slickNext();
  };
  const previous = () => {
    slider.slickPrev();
  };

  const settings = {
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // centerPadding: "60px",
    // cssEase: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Container>
      <CardsContainer className="techschooling-about-slider">
        <PrevArrow onClick={previous}>
          <img
            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/left-arrow.png"
            alt="Arrow"
            width="100%"
          />
        </PrevArrow>
        <NextArrow onClick={next}>
          <img
            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/techschooling/general/right-arrow.png"
            alt="Arrow"
            width="100%"
          />
        </NextArrow>
        <Slider
          {...settings}
          ref={(c) => {
            slider = c;
          }}
        >
          {about.map((inst, index) => (
            <Box>
              <Card key={index}>
                <ImageContainer color={inst.color}>
                  <Image src={inst.image} alt="Arrow" />
                </ImageContainer>
                <Content>{inst.content}</Content>
              </Card>
            </Box>
          ))}
        </Slider>
      </CardsContainer>
    </Container>
  );
}

const Container = styled.div`
  /* width: 90%; */
  margin: 0 auto;
  /* max-width: 1386px; */
  text-align: center;
  @media (max-width: 480px) {
    display: none;
  }
`;
const CardsContainer = styled.div`
  position: relative;
  padding: 0 50px;
  /* margin-bottom: 50px;*/
  @media (max-width: 1400px) {
    padding: 0 35px;
  }
  @media (max-width: 480px) {
    padding: 0 25px;
  }
`;
const PrevArrow = styled.div`
  width: 42;
  height: 42px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  cursor: pointer;
  @media (max-width: 980px) {
    width: 35px;
    height: 35px;
  }
  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;
const NextArrow = styled.div`
  width: 42;
  height: 42px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
  cursor: pointer;
  @media (max-width: 980px) {
    width: 35px;
    height: 35px;
  }
  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
`;
const Card = styled.div`
  display: flex;
  background: #f5f5f5;
  border-radius: 6px;
  overflow: hidden;
  padding: 12px 10px;
  align-items: center;
`;
const ImageContainer = styled.div`
  background-color: ${(props) => props.color};
  padding: 7px;
  border-radius: 6px;
  margin-right: 15px;
  max-width: 49px;
  max-height: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1156px) {
    margin-right: 14px;
  }
  // @media (max-width: 1050px) {
  //   margin-right: 13px;
  // }
  @media (max-width: 360px) {
    margin-right: 12px;
  }
`;
const Image = styled.img`
  display: block;
  object-fit: cover;
  width: 64%;
`;
const Content = styled.h3`
  font-family: "gordita_medium";
  font-size: 16px;
  @media (max-width: 1300px) {
    font-size: 14px;
  }
  /* @media (max-width: 1200px) {
    font-size: 16px;
  } */
  @media (max-width: 1100px) {
    font-size: 13px;
  }
  // @media (max-width: 1153px) {
  //   font-size: 15px;
  // }
  // @media (max-width: 360px) {
  //   font-size: 15px;
  // }
`;
