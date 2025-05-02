import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { communityConfig } from "../../../../axiosConfig";

const AssociatedCampus = ({ type }) => {
  const [campus, setCampus] = useState([]);
  const [firstSlideData, setFirstSlideData] = useState([]);
  const [secondSlideData, setSecondSlideData] = useState([]);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
    ],
  };
  const second_settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: -1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
    ],
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = () => {
    communityConfig
      .get(`/campuses/`, {
        params: {
          program: type,
        },
      })
      .then((response) => {
        let { StatusCode, data } = response.data;
        setCampus(data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    divideCampus();
  }, [campus]);

  const divideCampus = () => {
    if (campus) {
      const campusHalf = campus && campus.length / 2;
      setFirstSlideData(campus.slice(0, campusHalf));
      setSecondSlideData(campus.slice(campusHalf, campus.length));
    }
  };

  // function shuffle(array) {
  //     var currentIndex = array.length,
  //         randomIndex;

  //     // While there remain elements to shuffle...
  //     while (currentIndex != 0) {
  //         // Pick a remaining element...
  //         randomIndex = Math.floor(Math.random() * currentIndex);
  //         currentIndex--;

  //         // And swap it with the current element.
  //         [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  //     }

  //     return array;
  // }

  return (
    <Container className="wrapper" data-aos="fade-up" data-aos-once="true">
      <Title>Associated Campus</Title>
      <Description>
        More than 100 schools across Kerala has collaborated with us for their
        students in the technology and programming domain.
      </Description>
      <SlidersContainer>
        <CollageLogoSlider>
          <Slider {...settings}>
            {firstSlideData.map((data, index) => (
              <CampusCard key={data.id}>
                <Logo>
                  <img src={data.logo} alt="" />
                </Logo>
                <Campusname>{data.name}</Campusname>
                <CampusLocation>{data.district}</CampusLocation>
              </CampusCard>
            ))}
          </Slider>
        </CollageLogoSlider>
        <CollageLogoSlider>
          <Slider {...second_settings}>
            {secondSlideData.map((data, index) => (
              <CampusCard key={data.id}>
                <Logo>
                  <img src={data.logo} alt="" />
                </Logo>
                <Campusname>{data.name}</Campusname>
                <CampusLocation>{data.district}</CampusLocation>
              </CampusCard>
            ))}
          </Slider>
        </CollageLogoSlider>

        <FadeGradient></FadeGradient>
        <FadeGradientRight></FadeGradientRight>
      </SlidersContainer>
    </Container>
  );
};

export default AssociatedCampus;
const Container = styled.div`
  background-color: #fff;
  text-align: center;
  padding: 60px 0px;
  /* @media all and (max-width: 980px) {
        padding: 100px 0 0;
    }
    @media all and (max-width: 640px) {
        padding: 80px 0 0;
    }
    @media all and (max-width: 480px) {
        padding: 60px 0 0;
    }
    @media all and (max-width: 360px) {
        padding: 40px 0 0;
    } */
`;
const Title = styled.h3`
  font-family: gordita_medium;
  position: relative;
  font-size: 34px;
  margin-bottom: 30px;
  color: #2d2d2d;
  margin-bottom: 30px;
  @media all and (max-width: 1280px) {
    font-size: 28px;
    margin-bottom: 20px;
  }
  @media all and (max-width: 640px) {
    font-size: 26px;
  }
  @media all and (max-width: 360px) {
    font-size: 22px;
  }
`;
const Description = styled.p`
  margin: 0 auto;
  max-width: 500px;
  font-size: 16px;
  @media all and (max-width: 1280px) {
    font-size: 15px;
  }
  @media all and (max-width: 360px) {
    font-size: 13px;
  }
`;

const CollageLogoSlider = styled.div`
  margin-bottom: 30px;
  @media all and (max-width: 1280px) {
    margin-bottom: 20px;
  }
`;
const CampusLogo = styled.span`
  display: block;
  width: 100%;
  border-radius: 50%;
  overflow: hidden;
  padding-left: 60px;
  img {
    display: block;
    width: 100%;
  }
  @media all and (max-width: 400px) {
    padding: 0 10px;
  }
`;

const SlidersContainer = styled.div`
  margin-top: 50px;
  position: relative;
  @media all and (max-width: 1280px) {
    margin-top: 40px;
  }
  @media all and (max-width: 400px) {
    padding-top: 30px;
  }
`;
const CampusCard = styled.span`
  display: block;
  padding-right: 30px;
  @media all and (max-width: 400px) {
    padding: 0 15px;
  }
`;
const Logo = styled.span`
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  img {
    display: block;
    width: 100%;
    object-fit: contain;
  }
`;
const Campusname = styled.h4`
  font-size: 12px;
  font-family: gordita_medium;
  margin-top: 15px;
`;
const FadeGradient = styled.div`
  width: 20px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  background: linear-gradient(90deg, #ffffff 0%, rgba(245, 248, 248, 0.2) 100%);
`;
const FadeGradientRight = styled.div`
  width: 20px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(90deg, rgba(245, 248, 248, 0.2) 0%, #ffffff 100%);
`;

const CampusLocation = styled.p`
  font-size: 14px;
  font-family: gordita_medium;
  color: #0fa76f;
`;
