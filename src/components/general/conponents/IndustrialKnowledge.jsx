import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const IndustrialKnowledge = () => {
  const [currentSection, setCurrentSection] = useState("educate");

  const educateRef = useRef(null);
  const experienceRef = useRef(null);
  const entitleRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.6, // trigger when 60% of the section is visible
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setCurrentSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (educateRef.current) observer.observe(educateRef.current);
    if (experienceRef.current) observer.observe(experienceRef.current);
    if (entitleRef.current) observer.observe(entitleRef.current);

    return () => {
      if (educateRef.current) observer.unobserve(educateRef.current);
      if (experienceRef.current) observer.unobserve(experienceRef.current);
      if (entitleRef.current) observer.unobserve(entitleRef.current);
    };
  }, []);

  return (
    <SectionWrapper>
      <Title>
        Uplifting students to industrial <br /> knowledge
      </Title>
      <StickyContainer>
        {/* Render all sections at once */}
        <Section
          id="educate"
          ref={educateRef}
          data-active={currentSection === "educate"}
        >
          <div
            className="text-content"
            style={{ display: "flex", gap: "16px", flexDirection: "column" }}
          >
            <InfoContainer>
              <IconContainer>
                <Icon
                  src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-10-2024/educate.svg"
                  alt="Educate"
                />
              </IconContainer>

              <SubTitle>Educate</SubTitle>
            </InfoContainer>

            <Text>
              Acquire essential tech skills through in-depth courses and ongoing
              learning resources. Choose topics of interest to explore pathways
              toward becoming a Tech scientist and Engineer, sharpening
              knowledge and enhancing expertise.
            </Text>
          </div>

          <div className="image-content">
            <img
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/02-11-2024/educate.png"
              alt="Educate"
            />
          </div>
        </Section>

        <Section
          id="experience"
          ref={experienceRef}
          data-active={currentSection === "experience"}
        >
          <div
            className="text-content"
            style={{ display: "flex", gap: "16px", flexDirection: "column" }}
          >
            <InfoContainer>
              <IconContainer>
                <Icon
                  src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-10-2024/experience.svg"
                  alt="Experience"
                />
              </IconContainer>
              <SubTitle>Experience</SubTitle>
            </InfoContainer>

            <Text>
              Build industry-ready skills through immersive workshops,
              collaborative projects, and engagement in industry events.
              Designed with expert guidance, this hands-on approach transforms
              knowledge into practical expertise, preparing students to excel in
              the tech industry.
            </Text>
          </div>
          <div className="image-content">
            <img
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/Frame+1171278217.svg"
              alt="Experience"
            />
          </div>
        </Section>

        <Section
          id="entitle"
          ref={entitleRef}
          data-active={currentSection === "entitle"}
        >
          <div
            className="text-content"
            style={{ display: "flex", gap: "16px", flexDirection: "column" }}
          >
            <InfoContainer>
              <IconContainer>
                <Icon
                  src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-10-2024/entitle.svg"
                  alt="Entitle"
                />
              </IconContainer>
              <SubTitle>Entitle</SubTitle>
            </InfoContainer>

            <Text>
              Become a recognised professional in the tech industry by earning
              certifications that validate your expertise and growth. Develop
              industry connections, broaden your skill set through exclusive
              programs, and explore career-defining opportunities that equip you
              for success as a skilled tech scientist and engineer.
            </Text>
          </div>
          <div className="image-content">
            <img
              src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/Frame+1171278216.svg"
              alt="Entitle"
            />
          </div>
        </Section>
      </StickyContainer>
    </SectionWrapper>
  );
};

export default IndustrialKnowledge;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  /* padding: ${pxToRem(80)} 0; */
  @media all and (max-width: 1400px) {
    padding: 0;
  }
  @media all and (max-width: 768px) {
    padding: 0;
  }
`;

const StickyContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
  border-bottom: 1px dashed lightgray;
  opacity: ${(props) => (props['data-active'] ? 1 : 0.5)};
  transition: opacity 0.5s ease-in-out;

  @media all and (max-width: 980px) {
    align-items: end;
  }

  @media all and (max-width: 480px) {
    padding: 25px 0;
  }

  &:last-child {
    border-bottom: none;
  }

  img {
    width: 100%;
    display: block;
    border-radius: ${pxToRem(40)};
  }

  .text-content {
    width: 40%;
  }

  .text-content h3 {
    font-size: ${pxToRem(22)};
    font-family: "gordita_regular";
    font-weight: 600;
    text-align: left;
    /* margin: ${pxToRem(40)} 0 ${pxToRem(16)} 0; */
    @media all and (max-width: 580px) {
      font-size: clamp(1.29rem, 2.5vw, 2.29rem);
    }
    @media all and (max-width: 480px) {
      font-size: 1.16rem;
    }
  }

  .image-content {
    width: 40%;
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse;

    .image-content {
      width: 100%;
    }

    .text-content {
      width: 100%;
    }
  }

  @media (max-width: 600px) {
    .image-content {
      display: none;
    }
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  @media all and (max-width: 980px) {
    gap: 16px;
  }
  @media (max-width: 768px) {
    flex-direction: row;
    gap: 14px;
  }
  @media all and (max-width: 580px) {
    gap: 14px;
    align-items: center;
  }
`;

const Title = styled.h3`
  font-size: ${pxToRem(38)};
  color: #121926;
  /* font-size: 3.5rem !important; */
  /* margin-bottom: ${pxToRem(16)}; */
  font-family: "gordita_medium";
  text-align: center;
  /* margin-bottom: ${pxToRem(56)}; */
  font-size: clamp(${pxToRem(22)}, 3vw, ${pxToRem(38)});
  @media all and (max-width: 768px) {
    margin-bottom: 0;
  }
  @media all and (max-width: 480px) {
    font-size: 1.5rem;
  }
  @media all and (max-width: 360px) {
    font-size: 1.25rem;
  }
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #000000;

  @media (max-width: 425px) {
    font-size: ${pxToRem(14)};
  }
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  @media all and (max-width: 580px) {
    width: 34px;
    height: 34px;
  }
  @media all and (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;

const SubTitle = styled.div`
  color: #022c20;
  font-size: 1.57rem;
  font-family: 'gordita_medium';
`;

const Icon = styled.img`
  width: 100%;
  display: block;
  border-radius: 0 !important;
`;
