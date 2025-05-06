import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { useParams } from "react-router-dom";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";
import SliderCard from "../../includes/community/community-profile/SliderCard";
import SliderNavigation from "../../includes/community/community-profile/SliderNavigation";

const ProfileSlider = ({ cards, userId }) => {
  const { username } = useParams();

  const { user_profile } = useSelector((state) => state);

  const splideRef = useRef(null);
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    if (splideRef.current) {
      const splideInstance = splideRef.current.splide;
      setPerPage(splideInstance.options.perPage);
    }
  }, []);

  const slickSlider = () => {
    return (
      <Splide
        ref={splideRef}
        options={{
          perPage: 3,
          perMove: 1,
          width: 800,
          gap: "1em",
          arrows: false,
          pagination: false,
          rewind: true,
          breakpoints: {
            2561: {
              width: 2000,
            },
            2330: {
              width: 1800,
            },
            2180: {
              width: 1300,
            },
            1920: {
              width: 1000,
            },
            1600: {
              width: 790,
            },
            1536: {
              width: 750,
            },
            1440: {
              width: 810,
            },
            1367: {
              width: 760,
            },
            1296: {
              width: 690,
            },
            1281: {
              width: 700,
            },
            1123: {
              width: 600,
            },
            1080: {
              width: 960,
            },
            1024: {
              width: 920,
            },
            980: {
              width: 880,
            },
            951: {
              width: 850,
            },
            821: {
              perPage: 2,
              width: 700,
            },
            801: {
              perPage: 2,
              width: 700,
            },
            768: {
              width: 660,
            },
            691: {
              width: 600,
            },
            641: {
              width: 550,
            },
            581: {
              width: 500,
            },
            541: {
              width: 480,
            },
            501: {
              width: 440,
            },
            481: {
              width: 400,
            },
            441: {
              width: 380,
            },
            431: {
              width: 370,
            },
            426: {
              perPage: 1,
              width: 350,
            },
            391: {
              width: 300,
            },
            376: {
              width: 300,
            },
            321: {
              width: 250,
            },
          },
        }}
      >
        {cards.map((card, index) => (
          <SplideSlide>
            <SliderCard key={index} card={card} />
          </SplideSlide>
        ))}
      </Splide>
    );
  };

  return (
    <SliderContainer>
      <CardContainer>{slickSlider()}</CardContainer>
      <BottomSection>
        {cards?.length > perPage ? (
          <ViewButton
            to={
              userId == user_profile?.user_id
                ? "/feed/post"
                : `/feed/post/${username}`
            }
          >
            View more post
          </ViewButton>
        ) : null}
        <SliderNavigation
          sliderRef={splideRef}
          perPage={perPage}
          totalSlides={cards?.length}
        />
      </BottomSection>
    </SliderContainer>
  );
};

export default ProfileSlider;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CardContainer = styled.div`
  width: 100%;
  .splide__list {
    display: flex;
  }
`;

const ViewButton = styled(Link)`
  display: inline-block;
  width: 15%;
  color: #3f3f46;
  font-size: 14px;
  font-family: "gordita_medium";
  flex-shrink: 0;

  @media all and (max-width: 1280px) {
    width: 25%;
  }

  @media all and (max-width: 431px) {
    width: 30%;
  }

  @media all and (max-width: 376px) {
    width: 40%;
  }
`;

const BottomSection = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
