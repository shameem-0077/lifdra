import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TalropEdtechHelmet from "../../../helpers/TalropEdtechHelmet";
import Loader from "../../includes/techschooling/general/loaders/Loader";
import Tick from "../../../../assets/images/meet/Verified-tick.svg";
import CardImgs from "../../../../assets/images/meet/2.svg";
import MeetButton from "../../includes/meet/MeetButton";
import MeetSuccessModal from "../../includes/meet/MeetSuccessModal";
import { learnConfig } from "../../../../axiosConfig";
import { ZoomMtg } from "@zoom/meetingsdk";
import auth from "../../../routing/auth";
import ReactPaginate from "react-paginate";
import { Link, useLocation, useHistory } from "react-router-dom";
import MeetNoData from "./MeetNoData";
import MeetCard from "./components/MeetCard";
import MeetsSkeleton from "./components/MeetsSkeleton";

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

function MeetsSinglePage() {
  const { divMainClass } = useSelector((state) => state);
  const [isLoading, setLoading] = useState(true);
  const [eventStudents, setEventStudentLists] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isButtonLoader, setButtonLoader] = useState(false);
  const [isReload, setReload] = useState();
  const [loadingStates, setLoadingStates] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [skeletonsToLoad] = useState(Array(8).fill(null));

  // page import

  const [currentPage, setCurrentPage] = useState(null);
  const history = useHistory();
  const [paginationData, setPaginationData] = useState(null);
  const { search, location } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  // let param = searchParams.get("updates");
  const user_data = useSelector((state) => state.user_data);
  const [accessToken, setAccessToken] = useState("");
  const page = searchParams.get("page");
  const [paginationJump, setPaginationJump] = useState("");

  // const getFilterParams = () => {
  //     const filterParams = {};
  //     searchParams.get("page") &&
  //         (filterParams.page = searchParams.get("page"));
  //     searchParams.get("q") && (filterParams.q = searchParams.get("q"));
  //     return filterParams;
  // };

  // Zoom API

  const getMeetsEventList = () => {
    const { access_token } = user_data;
    setLoading(true);
    learnConfig
      .get(`events/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        const { status_code, data, pagination_data } = response.data;
        if (status_code === 6000) {
          setEventStudentLists(data);
          setLoading(false);
          setPaginationData(pagination_data);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getMeetsEventList();
    setReload(false);
  }, [isReload]);

  // pagination

  const handlePageClick = (selectedPage) => {
    const newPageNumber = selectedPage.selected + 1;
    setCurrentPage(newPageNumber);

    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set("page", newPageNumber);
    history.push({ search: updatedSearchParams.toString() });
  };

  const handleJumpToPage = () => {
    let pageNumber = parseInt(paginationJump, 10);
    if (pageNumber <= paginationData?.total_pages) {
      const queryParams = new URLSearchParams(searchParams);
      queryParams.set("page", paginationJump);
      history.push({ search: queryParams.toString() });
    } else {
      setPaginationJump(paginationData?.total_pages);
    }
  };

  const PrevoiusImage = () => {
    return (
      <PrevoiusImageContainer>
        <img
          src={require("../../../../assets/images/tech-update/arrow-left.svg")}
          alt="Icon"
        />
      </PrevoiusImageContainer>
    );
  };

  const NextImage = () => {
    return (
      <NextImageContainer>
        <img
          src={require("../../../../assets/images/tech-update/arrow-right.svg")}
          alt="Icon"
        />
      </NextImageContainer>
    );
  };

  useEffect(() => {
    const zoomRootDiv = document.getElementById("zmmtg-root");
    const arianotifyareaDiv = document.getElementById("aria-notify-area");

    // if (zoomRootDiv||arianotifyareaDiv) {
    //   zoomRootDiv.add();
    //   arianotifyareaDiv.add();
    // }

    return () => {
      if (zoomRootDiv || arianotifyareaDiv) {
        zoomRootDiv.remove();
        arianotifyareaDiv.remove();
      }
    };
  }, []);

  return (
    <>
      {showSuccessModal && (
        <MeetSuccessModal
          setShowSuccessModal={setShowSuccessModal}
          setLoading={setLoading}
          isReload={isReload}
          setReload={setReload}
          setButtonLoader={setButtonLoader}
        />
      )}

      <div>
        <TalropEdtechHelmet title="Meet" />
        {/* {isLoading ? (
          // <LoaderContainer>
          //   <Loader />
          // </LoaderContainer>

        ) : ( */}
        <MainContainer id="main" className={divMainClass}>
          <Heading>Upcoming Meets</Heading>

          {/* ----------- card section start----------- */}

          {isLoading ? (
            <Cards>
              {skeletonsToLoad.map((_, i) => {
                return <MeetsSkeleton key={`skeleton-${i}`} />;
              })}
            </Cards>
          ) : eventStudents && !isLoading && eventStudents?.length > 0 ? (
            <Cards>
              {eventStudents?.map((item) => (
                <>
                  <MeetCard
                    key={item?.id}
                    datas={item}
                    setShowSuccessModal={setShowSuccessModal}
                  />
                </>
              ))}
            </Cards>
          ) : (
            <>{eventStudents.length <= 0 && <MeetNoData />}</>
          )}
          {/* ----------- card section end------------- */}
        </MainContainer>
        {/* )} */}
      </div>
      {paginationData && paginationData?.total_pages > 1 && (
        <PaginationContainer>
          <ReactPaginateContainer>
            <ReactPaginate
              previousLabel={<PrevoiusImage />}
              nextLabel={<NextImage />}
              pageCount={paginationData?.total_pages}
              onPageChange={handlePageClick}
              forcePage={page ? page - 1 : 0}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          </ReactPaginateContainer>
          <PaginationTextpageDiv>
            <PaginationTextpage>
              Total {paginationData?.total_pages || 0} pages
            </PaginationTextpage>
          </PaginationTextpageDiv>
          <PaginationText>
            <Gotopag>Go to page</Gotopag>
            <Inputcount
              type="number"
              placeholder="0"
              value={paginationJump}
              onKeyDown={(e) => {
                if (e.key === "e" || e.key === "E") {
                  e.preventDefault();
                }
              }}
              onChange={(e) => setPaginationJump(e.target.value)}
            />
            <JumbButton onClick={handleJumpToPage}>Jump</JumbButton>
          </PaginationText>
        </PaginationContainer>
      )}
    </>
  );
}

export default MeetsSinglePage;

// const Container = styled.section`
//   padding: 0px 30px 0 0;
//   border-right: 1px solid #e8e8e8;
//   overflow-y: scroll;
//   max-height: ${({ isPagination }) =>
//     isPagination ? "calc(93vh - 180px)" : "100vh"};
//   min-height: calc(93vh - 180px);
//   &::-webkit-scrollbar {
//     width: 2px;
//   }
//   &::-webkit-scrollbar-thumb {
//     background: #ebebeb;
//     border-radius: 10px;
//   }
//   @media all and (max-width: 1380px) {
//     padding: 0px 10px 0px 0px;
//   }
//   @media all and (max-width: 1080px) {
//     padding: 0px 16px 5px 0px;
//   }
//   @media all and (max-width: 768px) {
//     padding-right: 0px;
//     border-right: none;
//     ::-webkit-scrollbar {
//       display: none;
//     }
//   }
//   @media all and (max-width: 680px) {
//   }
//   @media all and (max-width: 360px) {
//     padding: 5px 0 5px 0;
//   }
// `;

// const MainContainer = styled.div`
//   padding: 20px 0px;
// `;

const pxToRem = (px) => `${(px / 14).toFixed(2)}rem`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  /* @media (max-width: 1023px) {
    padding: 0 16px;
  } */
`;

const Heading = styled.h2`
  font-family: "gordita_medium";
  font-size: ${pxToRem(24)};
  color: #202939;
  margin: 0 !important;
  margin-top: 25px !important;

  @media (max-width: 1023px) {
    font-size: ${pxToRem(20)};
  }
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
  justify-items: center;

  @media (max-width: 1248px) {
    gap: 16px;
  }
  @media (max-width: 1206px) {
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
  }

  @media (max-width: 649px) {
    gap: 18px;
    grid-template-columns: repeat(1, 1fr);
    justify-content: center;
  }
`;

const LoaderContainer = styled.div`
  height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MainHead = styled.h4`
  color: #013333;
  font-size: 22px;
  font-family: "gordita_medium";
  margin-bottom: 20px;
  @media all and (max-width: 580px) {
    font-size: 20px;
  }
`;
const HeadDiv = styled.section`
  margin-bottom: 20px;
`;
const SubHead = styled.h5`
  color: #474747;
  font-size: 16px;
  @media all and (max-width: 768px) {
    font-size: 14px;
    line-height: 1.3rem !important;
  }
`;
const CardContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 2%;
  margin-bottom: -2%;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #f8fafc;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: 32%;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 2%;
  border: 1px solid #eef2f6;

  @media all and (max-width: 590px) {
    width: 100% !important;
    margin-right: 0 !important;
  }
  @media all and (max-width: 1180px) {
    width: 49%;
  }
`;
const ImageContainer = styled.div`
  border-radius: 10px;
  position: relative;
  margin-bottom: 28px;
`;
const Image = styled.img`
  width: 100%;
  display: block;
  aspect-ratio: 16/9;
  border-radius: 6px;
  object-fit: cover;
`;
const LiveConatiner = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  position: absolute;
  left: 14px;
  top: 11px;
  padding: 0 4px;
  border-radius: 20px;
  border: 1px solid #eaecf0;
  background: #fff;
  font-size: 14px;
  font-family: "gordita_medium";
  span {
    width: 7px;
    height: 7px;
    background: #f04438;
    border-radius: 50%;
  }
`;
const DetatilDiv = styled.div`
  /* position: relative; */
  margin-bottom: 20px;
`;
const TimeDiv = styled.div`
  margin-bottom: 20px;
`;
const Time = styled.span`
  color: #047853;
  font-size: 14px;
  text-transform: uppercase;
  font-family: "gordita_medium";
`;
const DateBox = styled.div`
  width: 58px;
  padding: 5px;
  border-radius: 10px;
  border: 1px;
  gap: 2px;
  background: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: absolute;
  right: 23px;
  bottom: -8%;
  text-transform: uppercase;
  text-align: center;
  border: 1px solid #eef2f6;
  /* @media all and (max-width: 420px) {
    width: 50px;
  }
  @media all and (max-width: 360px) {
    width: 48px;
    top: 148px;
  } */
  & span {
    display: block;
    font-size: 16px;
    color: #0d121c;
    @media all and (max-width: 1200px) {
      font-size: 14px;
    }
    @media all and (max-width: 740px) {
      font-size: 13px;
    }
  }
  & small {
    display: block;
    font-weight: 600;
    font-size: 20px;
    color: #0d121c;
    @media all and (max-width: 1200px) {
      font-size: 18px;
    }
    @media all and (max-width: 740px) {
      font-size: 16px;
    }
    @media all and (max-width: 360px) {
      font-size: 14px;
    }
  }
`;
const Title = styled.h1`
  font-size: 18px;
  font-family: "gordita_medium" !important;
  color: #000000;
  margin: 0 !important;
  line-height: 1.5rem;

  @media all and (max-width: 1440px) {
    font-size: 20px;
  }
  @media all and (max-width: 1280px) {
    font-size: 18px;
  }
  @media all and (max-width: 768px) {
    font-size: 16px;
  }
`;
const InfoDiv = styled.div`
  /* border-bottom: 1px solid #e3e8ef;
  padding-bottom: 24px; */
  margin-bottom: 20px;
`;
const TitleInfo = styled.span`
  font-size: 14px;
  color: #4b5565;
`;
const DetailContainer = styled.div`
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  width: 100%;

  /* flex-wrap: wrap;
  @media all and (max-width: 1080px) {
    flex-wrap: nowrap;
  }
  @media all and (max-width: 880px) {
    flex-wrap: wrap;
  }
  @media all and (max-width: 580px) {
    flex-wrap: wrap;
  }
  @media all and (max-width: 420px) {
    flex-wrap: wrap;
  } */
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
const RightInfoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  justify-content: space-between;
  /* @media all and (max-width: 1440px) {
    width: 100% !important;
  } */
`;

const ProfileDiv = styled.div``;
const AvatarDiv = styled.div``;
const Avatar = styled.img`
  width: 41px;
  height: 41px;
  border-radius: 50%;
`;
const TotalSeat = styled.div`
  & h6 {
    color: #364152;
    font-weight: 700;
    font-size: 14px;
  }
  & h5 {
    color: #475467;
    font-size: 16px;
  }
`;
const RegSeat = styled.div`
  & h6 {
    color: #047853;
    font-weight: 700;
    font-size: 14px;
  }
  & h5 {
    color: #475467;
    font-size: 16px;
  }
`;
const InfoCard = styled.div`
  background: #fff4ed;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
  position: relative;
`;
const InfoIcon = styled.div`
  width: 20px;
  margin-right: 8px;
  cursor: pointer;
  @media all and (max-width: 768px) {
    display: none;
  }
`;
const IconImg = styled.img`
  width: 20px;
  height: 20px;
  display: block;
`;
const InfoText = styled.p`
  color: #475467;
  font-size: 14px;
  margin: 0;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HoverCard = styled.div`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  background: #fff4ed;
  position: absolute;
  bottom: 50px;
  font-size: 14px;
  left: 0;
  padding: 12px 10px;
  border: 1px solid #ffa56e;
  border-radius: 6px;
  text-align: justify;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;

const RegistrationConatiner = styled.div`
  padding: 2px 7px;
  width: 200px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #abefc6;
  background: #ecfdf3;
  border-radius: 16px;
  margin-bottom: 20px;

  span {
    color: #047853;
    font-size: 14px;
    font-family: "gordita_medium" !important;
  }
`;
const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  margin: 10px;
  position: absolute;
  background-color: #fff;
  width: 96%;

  @media all and (max-width: 1080px) {
    margin: 6px;
    padding: 6px;
    flex-wrap: wrap;
  }
  @media all and (max-width: 980px) {
  }
  @media all and (max-width: 640px) {
    margin: 5px 0px;
  }
`;
const PaginationTextpageDiv = styled.div`
  margin-right: 10px;
  width: 40%;
  @media all and (max-width: 1080px) {
    width: 30%;
  }
`;
const PaginationTextpage = styled.p`
  color: #2d2d2d;
  font-size: 16px;
  height: 20px;
  @media all and (max-width: 1080px) {
    font-size: 14px;
  }
  @media all and (max-width: 768px) {
    font-size: 12px;
  }
`;
const PaginationText = styled.div`
  display: flex;
  align-items: center;
  /* @media all and (max-width: 1080px) {
    margin: 0 auto;
  } */
`;

const Gotopag = styled.p`
  margin-right: 20px;
  color: #000;
  font-size: 16px;
  height: 20px;
  @media all and (max-width: 1080px) {
    font-size: 14px;
    margin-right: 8px;
  }
  @media all and (max-width: 768px) {
    font-size: 12px;
  }
`;
const Inputcount = styled.input`
  width: 41px;
  height: 28px;
  padding: 4px 6px 1px 15px;
  border-radius: 4px;
  margin-right: 20px;
  cursor: pointer;
  background: #f1f1f1;
  justify-content: center;
  align-items: center;
  color: #000;
  @media all and (max-width: 1080px) {
    font-size: 14px;
    margin-right: 8px;
  }
  @media all and (max-width: 768px) {
    font-size: 12px;
  }
`;
const JumbButton = styled.button`
  border-radius: 4px;
  background: #15bf81;
  height: 32px;
  cursor: pointer;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 16px;
  @media all and (max-width: 1080px) {
    font-size: 14px;
    height: 24px;
  }
  @media all and (max-width: 768px) {
    font-size: 12px;
  }
`;
const NoDataContienr = styled.div`
  width: 100%;
  min-height: calc(93vh - 220px);
  max-height: calc(93vh - 220px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrevoiusImageContainer = styled.span`
  display: inline-block;
  min-width: 24px;
  height: 32px;
  img {
    width: 100%;
    display: block;
  }
`;

const NextImageContainer = styled.span`
  display: inline-block;
  min-width: 24px;
  height: 32px;

  img {
    width: 100%;
    display: block;
  }
`;

const ReactPaginateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media all and (max-width: 1080px) {
    width: 100%;
  }
`;
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const HostName = styled.h5`
  color: #047853;
  font-size: 16px;
  font-weight: 700;
`;
const HostDest = styled.h6`
  color: #475467;
  font-size: 14px;
  line-height: 1.1rem;
`;
const HrLine = styled.div`
  border-bottom: 1px solid #e3e8ef;
  margin-bottom: 20px;
`;

//                     <Card key={item?.id}>
// <ImageContainer>
// <Image src={item?.cover_image} alt="Card Image" />
// {item?.status === "started" ? (
//   <LiveConatiner>
//     <span></span>
//     Live
//   </LiveConatiner>
// ) : null}
// <DateBox>
//   <span>{item?.month}</span>
//   <small>{item?.day}</small>
// </DateBox>
// </ImageContainer>

// {item?.is_registered && (
// <RegistrationConatiner>
//   <img src={Tick} alt="tick-icon" />
//   <span>Registration Successful</span>
// </RegistrationConatiner>
// )}
// <div>
// <TimeDiv>
//   <Time>{item?.time}</Time>
// </TimeDiv>
// <DetatilDiv>
//   <Title>{item?.title}</Title>
// </DetatilDiv>
// <InfoDiv>
//   {/* <TitleInfo>Led by</TitleInfo> */}
//   <DetailContainer>
//     {/* <LeftContainer>
//     <ProfileDiv>
//       {item?.host.display_pic ? (
//         <Avatar
//           src={item?.host.display_pic}
//           alt={item.host.name}
//         />
//       ) : null}
//     </ProfileDiv>
//     <AvatarDiv>
//       <HostName>{item?.host.name}</HostName>
//       <HostDest>{item?.host.designation}</HostDest>
//     </AvatarDiv>
//   </LeftContainer> */}
//     <RightInfoDiv>
//       <TotalSeat>
//         <h5>Total Seats</h5>
//         <h6>{item?.total_seats}</h6>
//       </TotalSeat>
//       <RegSeat>
//         <h5>Registrations</h5>
//         <h6>{item?.total_registrations}</h6>
//       </RegSeat>
//     </RightInfoDiv>
//   </DetailContainer>
// </InfoDiv>
// <HrLine />
// {item?.description && (
//   <InfoCard>
//     <InfoIcon
//       key={item?.id}
//       onMouseEnter={() => setHoveredItem(item?.id)}
//       onMouseLeave={() => setHoveredItem(null)}
//     >
//       <IconImg
//         src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/05-02-2024/Icon.svg"
//         alt="Icon"
//       />
//     </InfoIcon>
//     <InfoText>{item?.description}</InfoText>
//     <HoverCard isVisible={hoveredItem === item?.id}>
//       {item?.description}
//     </HoverCard>
//   </InfoCard>
// )}
// </div>
// {item?.is_participable && item?.status === "started" ? (
// <MeetButton
//   onClick={() => handleForJoin(item?.id, item?.status)}
//   setButtonLoader={setButtonLoader}
//   isButtonLoader={loadingStates[item?.id]}
//   condition={item?.status}
// />
// ) : item?.is_registered ? (
// <MeetButton condition={"registrated"} />
// ) : item?.total_seats === item?.total_registrations ? (
// <MeetButton condition={"closed"} />
// ) : (item?.is_registered === false &&
//   item?.status === "started") ||
// "upcoming" ? (
// <MeetButton
//   onClick={() => handleClick(item?.id, item?.status)}
//   setButtonLoader={setButtonLoader}
//   isButtonLoader={loadingStates[item?.id]}
//   condition={"upcoming"}
// />
// ) : (
// <MeetButton
//   onClick={() => handleClick(item?.id, item?.status)}
//   setButtonLoader={setButtonLoader}
//   isButtonLoader={loadingStates[item?.id]}
//   condition={item?.status}
// />
// )}
// </Card>
