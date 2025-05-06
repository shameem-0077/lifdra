// import React, { useEffect, useRef, useState } from "react";
// import styled from "styled-components";
// import Jdenticon from "react-jdenticon";
// import FollowBT from "../FollowBT";
// import { truncateString } from "../../../../helpers/functions";
// import { useSelector } from "react-redux";
// import { serverConfig } from "../../../../../axiosConfig";
// import PeopleYouMayKnowSkeleton from "../PeopleYouMayKnowSkeleton";

// function PeopleYouMayKnowModal({
//   isModal,
//   handleCloseModal,
//   peopleMayYouKnow,
//   item,
//   setFollowCount,
// }) {
//   const [isFollow, setIsFollow] = useState(item?.is_following || false);
//   const [isModalLoading, setModaltLoading] = useState(true);
//   const [isVisible, setIsVisible] = useState(false);
//   const [suggestion, setSuggestion] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [skeletonsToLoad] = useState(Array(8).fill(null));
//   const scrollRef = useRef(null);
//   const {
//     user_data: { access_token },
//   } = useSelector((state) => state);

  // const fetchPeopleMayYouKnow = async () => {
  //   try {
  //     const response = await accountsConfig.get(
  //       "/api/v1/users/community-profiles/",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //         },
  //         params: { type: "people_may_you_know", count: 16 },
  //       }
  //     );

//       console.log(response);

//       const { status_code, data } = response.data;

//       if (status_code === 6000) {
//         setSuggestion((prev) => [...prev, ...data]);
//         setHasMore(data.length > 0);
//         setModaltLoading(false);
//         setTimeout(() => setIsVisible(true), 50);
//       } else {
//         setModaltLoading(false);
//       }
//     } catch (error) {
//       console.error("Error fetching people you may know:", error);
//       setModaltLoading(false);
//     }
//   };

//   useEffect(() => {
//     setIsFollow(item?.is_following || false);
//   }, [item]);

//   const updateFollow = async (id) => {
//     try {
//       const response = await accountsConfig.post(
//         `/api/v1/users/follow-user/${id}/`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//           },
//         }
//       );
//       const { status_code, data, message } = response.data;
//       if (status_code === 6000) {
//         if (message?.message === "Followed") {
//           setFollowCount((prevCount) => ({
//             ...prevCount,
//             follow: prevCount.follow + 1,
//           }));
//         } else if (message?.message === "Unfollowed") {
//           setFollowCount((prevCount) => ({
//             ...prevCount,
//             follow: prevCount.follow - 1,
//           }));
//           peopleMayYouKnow = peopleMayYouKnow.filter((item) => item?.id !== id);
//         }
//       }
//     } catch (error) {
//       console.error("Error updating like:", error);
//       setIsFollow(!isFollow);
//     }
//   };

//   useEffect(() => {
//     let isMounted = true;
//     setModaltLoading(true);
//     async function fetchPeopleMayYouKnow() {
//       try {
//         const response = await accountsConfig.get(
//           "/api/v1/users/community-profiles/",
//           {
//             headers: {
//               Authorization: `Bearer ${access_token}`,
//             },
//             params: { type: "people_may_you_know", count: 16 },
//           }
//         );
//         const { status_code, data } = response.data;

//         console.log(data);

//         if (status_code === 6000 && isMounted) {
//           setSuggestion((prev) => [...prev, ...data]); // Append new data
//           setHasMore(data.length > 0);
//           setSuggestion(data);
//           setModaltLoading(false);
//           setTimeout(() => setIsVisible(true), 50);
//         } else if (isMounted) {
//           setHasMore(false);
//           setSuggestion([]);
//           setModaltLoading(false);
//           isVisible && setIsVisible(false);
//         }
//       } catch (error) {
//         console.error("Error fetching people may you know:", error);
//         setModaltLoading(false);
//       }
//     }
//     fetchPeopleMayYouKnow();
//     return () => {
//       isMounted = false;
//     };
//   }, [isModal]);

//   useEffect(() => {
//     if (isModal) {
//       fetchPeopleMayYouKnow(page);
//     }
//   }, [isModal, page]);

//   // Handle scrolling
//   const handleScroll = () => {
//     const bottom =
//       scrollRef.current.scrollHeight - scrollRef.current.scrollTop ===
//       scrollRef.current.clientHeight;
//     if (bottom && hasMore) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   return (
//     <>
//       <Backdrop isVisible={isModal} />
//       <Container isVisible={isModal}>
//         <Overlay>
//           <InnerContainer>
//             <CloseButton onClick={handleCloseModal}>
//               <img
//                 src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/17-10-2024/close.svg"
//                 alt="close"
//               />
//             </CloseButton>

//             <ContentSection>
//               <Heading>People you may know</Heading>
//               <>
//                 <SuggestionList
//                   onScroll={handleScroll}
//                   ref={scrollRef}
//                   style={{ scrollBehavior: "smooth" }}
//                 >
//                   {isModalLoading
//                     ? skeletonsToLoad.map((_, index) => (
//                         <PeopleYouMayKnowSkeleton key={index} />
//                       ))
//                     : suggestion?.map((item, intex) => (
//                         <SubContainer key={intex}>
//                           <PictureBox>
//                             {item?.photo ? (
//                               <img src={item?.photo} alt="profile" />
//                             ) : (
//                               <Jdenticon
//                                 size="45px"
//                                 radius="50%"
//                                 value={item?.name ? item?.name : "Name"}
//                               />
//                             )}
//                           </PictureBox>
//                           <NameBox>
//                             <UserName>{item?.name}</UserName>
//                             <SubText>
//                               {item?.program?.name}
//                               {truncateString(item?.program?.name, 20)}
//                             </SubText>
//                           </NameBox>
//                           <FollowBT
//                             setFollow={setIsFollow}
//                             isFollow={isFollow}
//                             updateFollow={updateFollow}
//                             autherId={item?.id}
//                           />
//                         </SubContainer>
//                       ))}
//                   {hasMore &&
//                     skeletonsToLoad.map((_, index) => (
//                       <PeopleYouMayKnowSkeleton key={index} />
//                     ))}
//                 </SuggestionList>
//               </>
//             </ContentSection>
//           </InnerContainer>
//         </Overlay>
//       </Container>
//     </>
//   );
// }

// export default PeopleYouMayKnowModal;

// const Backdrop = styled.div`
//   position: fixed;
//   width: 100%;
//   height: 100vh;
//   left: 0;
//   top: 0;
//   backdrop-filter: blur(4px);
//   z-index: 999;
//   opacity: ${(props) => (props.isVisible ? 1 : 0)};
//   visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
//   transition: opacity 0.3s, visibility 0.3s;
//   background: rgba(13, 18, 28, 0.6);
// `;

// const Container = styled.div`
//   position: fixed;
//   width: 100%;
//   height: 100vh;
//   z-index: 1000;
//   left: 0;
//   top: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   opacity: ${(props) => (props.isVisible ? 1 : 0)};
//   visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
//   transition: opacity 0.3s, visibility 0.3s;
//   box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
// `;

// const Overlay = styled.div`
//   position: fixed;
//   left: 0;
//   top: 0px;
//   width: 100%;
//   height: 100vh;
//   z-index: 1000;
// `;

// const InnerContainer = styled.div`
//   width: 50vw;
//   height: 75vh;
//   margin: 0 auto;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   position: absolute;
//   border-radius: 10px;
//   transition: 0.5s;
//   z-index: 1000;
//   box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
//   display: flex;
//   flex-direction: column;
//   @media all and (max-width: 1440px) {
//     width: 54vw;
//   }
//   @media (max-width: 980px) {
//     width: 700px;
//   }
//   @media (max-width: 768px) {
//     width: 560px;
//   }
//   @media (max-width: 640px) {
//     width: 440px;
//   }
//   @media (max-width: 480px) {
//     width: 350px;
//   }
//   @media (max-width: 360px) {
//     width: 305px;
//   }
// `;

// const CloseButton = styled.div`
//   cursor: pointer;
//   height: 24px;
//   width: 24px;
//   position: absolute;
//   right: 33px;
//   top: 22px;
//   z-index: 1000;
//   transition: transform 0.3s ease;

//   img {
//     display: block;
//     width: 100%;
//   }
//   &:hover {
//     transform: scale(1.1);
//   }
// `;

// const ContentSection = styled.div`
//   width: 100%;
//   height: 100%;
//   background: #fff;
//   border-radius: 10px;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
// `;

// const Heading = styled.h3`
//   border-bottom: 1px solid #e3e8ef;
//   text-align: center;
//   font-size: 24px;
//   color: #101828;
//   font-family: "gordita_medium";
//   padding: 14px 0;
// `;

// const SuggestionList = styled.div`
//   /* width: 100%; */
//   max-width: 800px;
//   height: 810px;
//   flex-grow: 1;
//   overflow-y: auto;
//   border-radius: 10px;
//   overflow: scroll;
//   display: flex;
//   flex-direction: column;
//   padding: 32px;
//   flex-wrap: wrap;
//   flex-direction: initial;
//   overflow-y: scroll;
//   scroll-behavior: smooth;
//   gap: 16px;
//   justify-content: space-between;

//   ::-webkit-scrollbar {
//     width: 10px !important;
//   }
//   ::-webkit-scrollbar-track {
//     background-color: red !important;
//   }
//   ::-webkit-scrollbar-thumb {
//     background-color: black !important;
//   }

//   @media all and (max-width: 1440px) {
//     justify-content: space-between;
//   }
// `;

// const SubContainer = styled.div`
//   max-width: 164px;
//   height: 208px;
//   min-width: 23%;
//   border: 1px solid #e3e8ef;
//   border-radius: 16px;
//   flex-direction: column;
//   display: flex;
//   align-items: center;
//   padding: 16px;
//   cursor: pointer;
// `;

// const PictureBox = styled.div`
//   img {
//     display: block;
//     width: 100%;
//     border-radius: 50%;
//     object-fit: cover;
//   }
//   width: 56px;
//   height: 56px;
// `;

// const NameBox = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   margin-bottom: 16px;
// `;

// const UserName = styled.h4`
//   text-align: center;
//   font-size: 14px;
//   color: #0c1024;
//   font-family: "gordita_medium";
// `;

// const SubText = styled.p`
//   text-align: center;
//   font-size: 14px;
//   color: #737376;
//   font-family: "gordita_medium";
// `;
