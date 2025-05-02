import React, { useState, useEffect, useCallback, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
// import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";
import Blocks from "editorjs-blocks-react-renderer";
import { Link, useHistory } from "react-router-dom";
import { learnConfig } from "../../../../axiosConfig";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import RouteLoading from "../../../routing/RouteLoading";
import TalropEdtechHelmet from "../../../helpers/TalropEdtechHelmet";
import Error404 from "../../../error-pages/Error404";
import ImageAnimator from "../../../general/conponents/ImageAnimator";
import { async } from "q";
import ReactPlayer from "react-player";
import VideoPlayer from "../../../applications/video-player/src/VideoPlayer";
import TechUpdatesReferenceItem from "./TechUpdatesReferenceItem";

function TechUpdatesSingle() {
  //---------------- user Datas -----------------------//

  const [playing, setPlaying] = useState(false);

  // const handlePlayPause = useCallback((e) => {
  //   e.preventDefault(); // Prevent any default action that might cause a reload
  //   setPlaying((prev) => !prev); // Toggle play state based on previous state
  //   console.log("Video play/pause toggled!");
  // }, []); // `useCallback` ensures the function is memoized and doesn't cause re-renders

  const user_data = useSelector((state) => state.user_data);
  const { access_token } = user_data;
  const { slug } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();
  // ---------------article show and upadate --------------------//

  const [article, setArticle] = useState({});
  const [articleLoading, setArticleloading] = useState(true);
  const [contents, setContent] = useState(null); // Initialize contents as null
  const dataObject = JSON.parse(contents);

  // --------------- refrence image hover changes --------------------//
  const [hovered, setHovered] = useState(false);

  //Emoji Reaction ----------------------//
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const toggleHover = () => {
    setHovered(!hovered);
  };

  // -------UpdateReadCount--------//
  const updateReadCount = async (data) => {
    const { access_token } = user_data;
    try {
      const response = await learnConfig.post(
        `/tech-updates/update-read-count/${data}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    } catch (error) {}
  };
  //----------------//

  // ----------------- article reaction ------------------ //
  const addReaction = async (pk, reaction) => {
    const formData = new FormData();
    formData.append("reaction", reaction);
    try {
      const response = await learnConfig.post(
        `/tech-updates/add-reaction/${pk}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user_data.access_token}`,
          },
        }
      );
      const { StatusCode, data, message } = response.data;
      if (StatusCode === 6000 && data) {
      } else {
      }
    } catch (error) {}
  };

  // const videoJsOptions = {
  //   autoplay: true,
  //   controls: false,
  //   sources: [
  //     {
  //       src: "https://storage.googleapis.com/coverr-main/mp4%2Fcoverr-an-early-morning-1579770136327.mp4",
  //       type: "video/mp4",
  //     },
  //   ],
  // };

  // -----------------End article reaction ------------------ //

  //------------------ Post SingleList fetch api ------------------ //
  useEffect(() => {
    async function fetchSingleArticle() {
      setArticleloading(true);

      try {
        const response = await learnConfig.get(
          `/tech-updates/article/${slug}/`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        const { StatusCode, data, message } = response.data;

        if (StatusCode === 6000 && data) {
          const articleData = data;
          setArticle(articleData);
          setArticleloading(false);
          updateReadCount(data.id);
          setSelectedEmoji(data.reaction);

          if (articleData.content) {
            try {
              setContent(articleData.content);
            } catch (error) {
              console.error("Error parsing content:", error);
            }
          }
        } else if (StatusCode === 6001) {
          // Handle StatusCode 6001 if needed
          setArticleloading(false);
          setErrorMessage(message.message);
          // Article not found
        } else {
          // Handle other status codes if needed
          setArticleloading(false);
        }
      } catch (error) {
        setArticleloading(false);
        console.error("Error fetching article:", error);
      }
    }

    fetchSingleArticle();
  }, [slug, access_token]);

  // --------------- prism initialization ------------------------ //
  useEffect(() => {
    Prism.highlightAll(); // Initialize Prism after rendering

    if (contents !== null) {
      const dataObject = JSON.parse(contents);
    }
  }, [contents]);

  //------------------ truncate fuction -------------- //
  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    }

    return str.slice(0, maxLength) + "...";
  }
  // ------------Function to add target="_blank" to links -------//
  const CustomParagraph = ({ data }) => {
    const addBlankTarget = (html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const links = doc.querySelectorAll("a");

      links.forEach((link) => {
        link.setAttribute("target", "_blank");
      });

      return doc.body.innerHTML;
    };

    return (
      <ContentParagraph
        dangerouslySetInnerHTML={{ __html: addBlankTarget(data.text) }}
      />
    );
  };
  const CopyIcon = (code) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
      navigator.clipboard.writeText(code.code).then(() => {
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 2000); // Revert back to "Copy" after 2 seconds
      });

      Prism.highlightAll();
    };

    return (
      <CopyButton onClick={handleCopyClick}>
        <CopyIconConatiner>
          {isCopied ? (
            <img
              src={require("../../../../assets/images/tech-update/check.svg")}
              alt="Tick Mark"
            />
          ) : (
            <img
              src={require("../../../../assets/images/tech-update/code-copy.svg")}
              alt="Copy Icon"
            />
          )}
        </CopyIconConatiner>
      </CopyButton>
    );
  };

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    // sources: [
    //   {
    //     src: dataObject.thumbnail,
    //     type: "video/m3u8",
    //   },
    // ],
  };

  useEffect(() => {
    setTimeout(() => {
      const iframeElements = document.querySelectorAll("iframe");

      iframeElements.forEach((iframeElement) => {
        iframeElement.remove();
      });
    }, 1000);
  }, []);
  return (
    <>
      <TalropEdtechHelmet title="Tech Updates" />
      <Container>
        <MainContainer className={articleLoading ? "active" : ""}>
          {articleLoading ? (
            <RouteLoading />
          ) : errorMessage === "Article not found" ? (
            <Error404 />
          ) : (
            <>
              <MainHeading>{article.title}</MainHeading>
              <ProfileDiv>
                <ProfileImg>
                  <img src={article?.author?.image} alt="Profile" />
                </ProfileImg>
                {/* <ProfName>{article?.author?.name}</ProfName> */}
                <NameContainer>
                  <Name>{article?.author?.name}</Name>
                  <AuthorName>{article?.author?.short_description}</AuthorName>
                </NameContainer>
                {/* <Minute>7 min read</Minute> */}
              </ProfileDiv>
              <ContentBox>
                {!articleLoading && dataObject !== null ? (
                  <>
                    {dataObject.blocks.find(
                      (item) => item.type == "videoPlayer"
                    ) ? (
                      <VideoPlayer
                        {...videoJsOptions}
                        source={
                          dataObject.blocks.find(
                            (item) => item.type == "videoPlayer"
                          ).data.url
                        }
                        cover={
                          dataObject.blocks.find(
                            (item) => item.type == "videoPlayer"
                          ).data.thumbnail
                        }
                      />
                    ) : null}

                    <Blocks
                      data={dataObject}
                      config={{
                        code: {
                          className: "language-js",
                        },
                      }}
                      renderers={{
                        code: ({ data }) => (
                          <CodeBlock id="code-block">
                            <Pre className="language-js">
                              <code className="language-js">{data.code}</code>
                            </Pre>
                            <CopyIcon code={data.code} />
                          </CodeBlock>
                        ),
                        image: ({ data }) => (
                          <figure>
                            <ImageAnimator
                              src={data.file.url}
                              alt={data.caption}
                            />
                          </figure>
                        ),

                        embed: ({ data }) => (
                          <figure>
                            <div
                              className="video-player-container"
                              style={{
                                aspectRatio: "16/9",
                                position: "relative",
                                paddingTop: "56.25%",
                              }}
                            >
                              <iframe
                                title="Embedded Video"
                                src={data.embed}
                                frameBorder="0"
                                width="100%"
                                height="100%"
                                allowFullScreen
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                }}
                              ></iframe>
                            </div>
                          </figure>
                        ),
                        paragraph: CustomParagraph,
                        // videoPlayer: ({ data }) => {
                        //   console.log("RERENDER");
                        //   return (
                        //     <VideoPlayer
                        //       {...videoJsOptions}
                        //       source={data.url}
                        //       cover={data.thumbnail}
                        //     />
                        //   );
                        // },
                      }}
                    />
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </ContentBox>

              <Hashtags>
                {article && article.tags && article.tags.length > 0 && (
                  <TopicTags>
                    <List>
                      {article.tags.map((topic) => (
                        <Items key={topic.id}>{topic.name}</Items>
                      ))}
                    </List>
                  </TopicTags>
                )}
                {article &&
                  article.referances &&
                  article.referances.length > 0 && (
                    <Reference>
                      <ReferenceHeading>References</ReferenceHeading>
                      <ReferenceDiv>
                        {article.referances.map((referance) => (
                          <TechUpdatesReferenceItem referance={referance} />
                        ))}
                      </ReferenceDiv>
                    </Reference>
                  )}

                {/* <MainBlogDiv>
        <HashtagHeading>Recommended</HashtagHeading>
        <Hashtagblog>
          <BlogDiv>
            <BlogImg>
              <img src={blog} alt="image" />
            </BlogImg>
            <BlogHeadigDiv>
              <BlogHeading>
                Unlocking the Power of GPT-4 API: A Beginner’s Guide for ...
              </BlogHeading>
              <BlogDay>4 days ago</BlogDay>
              <BlogTime>3 min read</BlogTime>
            </BlogHeadigDiv>
          </BlogDiv>
          <BlogDiv>
            <BlogImg>
              <img src={blog} alt="image" />
            </BlogImg>
            <BlogHeadigDiv>
              <BlogHeading>
                Unlocking the Power of GPT-4 API: A Beginner’s Guide for ...
              </BlogHeading>
              <BlogDay>4 days ago</BlogDay>
              <BlogTime>3 min read</BlogTime>
            </BlogHeadigDiv>
          </BlogDiv>
        </Hashtagblog>
      </MainBlogDiv> */}
              </Hashtags>
              <ArticleReact>
                <ReactionContainer>
                  <Rectiontext>Did you find this article useful?</Rectiontext>
                  <ReactionEmojiContainer>
                    <ReactionEmoji
                      onClick={() => {
                        handleEmojiClick("bad");
                        addReaction(article.id, "bad");
                      }}
                      className={
                        selectedEmoji === null
                          ? ""
                          : selectedEmoji === "bad"
                          ? "hilight"
                          : selectedEmoji !== "bad"
                          ? "fade"
                          : ""
                      }
                    >
                      <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-10-2023/react-one.svg"
                        alt="Reaction_Icon"
                      />
                      <div className="tooltip-element" data-tooltip="Dislike">
                        Dislike
                      </div>
                    </ReactionEmoji>
                    <ReactionEmoji
                      onClick={() => {
                        addReaction(article.id, "neutral");
                        handleEmojiClick("neutral");
                      }}
                      className={
                        selectedEmoji === null
                          ? ""
                          : selectedEmoji === "neutral"
                          ? "hilight"
                          : selectedEmoji !== "neutral"
                          ? "fade"
                          : ""
                      }
                    >
                      <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-10-2023/react-two.svg"
                        alt="Reaction_Icon"
                      />
                      <div className="tooltip-element" data-tooltip="Neutral">
                        Neutral
                      </div>
                    </ReactionEmoji>
                    <ReactionEmoji
                      onClick={() => {
                        handleEmojiClick("good");
                        addReaction(article.id, "good");
                      }}
                      className={
                        selectedEmoji === null
                          ? ""
                          : selectedEmoji === "good"
                          ? "hilight"
                          : selectedEmoji !== "good"
                          ? "fade"
                          : ""
                      }
                    >
                      <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/11-10-2023/react-three.svg"
                        alt="Reaction_Icon"
                      />
                      <div className="tooltip-element" data-tooltip="Like">
                        Like
                      </div>
                    </ReactionEmoji>
                  </ReactionEmojiContainer>
                </ReactionContainer>
              </ArticleReact>
            </>
          )}
        </MainContainer>
      </Container>
    </>
  );
}

export default TechUpdatesSingle;
const Container = styled.section`
  padding-top: 32px;
  border-right: 1px solid #e8e8e8;
  /* max-height: calc(100vh - 180px); */
  /* min-height: calc(100vh - 180px); */
  &.active {
    min-height: calc(100vh - 180px);
  }

  overflow-y: scroll;
  margin-top: 10px;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ebebeb;
    border-radius: 10px;
  }
  @media all and (max-width: 768px) {
    border-right: none;
  }
  @media all and (max-width: 640px) {
    max-height: calc(100vh - 140px);
    margin-left: 1px;
  }
  @media all and (max-width: 320px) {
    width: 100%;
    margin-left: 1px;
  }
`;

const MainContainer = styled.div`
  width: 80%;
  max-width: 840px;
  margin: 0 auto;

  @media all and (max-width: 760px) {
    width: 90%;
  }
  @media all and (max-width: 640px) {
    width: 100%;
  }
`;

const MainHeading = styled.h1`
  font-size: 36px;
  font-family: "gordita_bold";
  margin-top: 20px;
  color: #2d2d2d;
  line-height: 1.4em;
  letter-spacing: -0.011em;
  @media all and (max-width: 1380px) {
    width: 97%;
  }
  @media all and (max-width: 1280px) {
    font-size: 28px;
  }
  @media all and (max-width: 980px) {
    font-size: 26px;
    margin-top: 1px;
  }
  @media all and (max-width: 768px) {
    font-size: 23px;
    width: 95%;
  }
  @media all and (max-width: 640px) {
    font-size: 22px;
  }
  @media all and (max-width: 480px) {
    font-size: 21px;
  }
  @media all and (max-width: 360px) {
    font-size: 20px;
  }
`;

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0px;
  @media all and (max-width: 768px) {
    margin: 20px 0px;
  }
  @media all and (max-width: 480px) {
    margin: 15px 0px;
  }
`;
const NameContainer = styled.div``;
const Name = styled.h5`
  font-size: 16px;
  color: #292929;
  font-family: "gordita_medium";
  margin-right: 10px;
`;
const AuthorName = styled.h6`
  font-size: 12px;
  color: #15bf81;
  font-family: "gordita_regular";
  margin-right: 10px;
  /* text-transform: capitalize; */
`;

const ProfileImg = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 50%;
  }
`;

const ProfName = styled.h3`
  color: #292929;
  font-size: 16px;
  margin-right: 10px;
  @media all and (max-width: 1080px) {
    font-size: 14px;
  }
  @media all and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Minute = styled.span`
  color: #757575;
  font-size: 16px;
  @media all and (max-width: 1080px) {
    font-size: 14px;
  }
  @media all and (max-width: 768px) {
    font-size: 12px;
  }
`;

const ContentBox = styled.div`
  width: 100%;
  overflow-y: scroll;
  margin-top: 50px;
  @media all and (max-width: 1080px) {
    margin-top: 30px;
  }
  @media all and (max-width: 768px) {
    margin-top: 20px;
  }
  & h1 {
    font-size: 32px;
    /* width: 90%; */
    font-family: "gordita_medium";
    color: #2d2d2d;
    margin-bottom: 24px;
    line-height: 32px;
  }
  & h2 {
    font-size: 24px;
    /* width: 90%; */
    font-family: "gordita_medium";
    color: #2d2d2d;
    /* margin-bottom: 24px; */
    line-height: 32px;

    @media all and (max-width: 480px) {
      /* width: 90%; */
      font-size: 22px;
    }
  }
  & h3 {
    font-size: 20px;
    /* width: 90%; */
    font-family: "gordita_medium";
    color: #2d2d2d;
    margin-bottom: 24px;
    line-height: 32px;
  }
  & p {
    color: #707070;
    font-size: 16px;
    font-family: "gordita_regular";
    margin-top: 10px;
    /* width: 90%; */
    line-height: 30px;
    margin-bottom: 30px;

    @media all and (max-width: 640px) {
      margin-bottom: 0px;
    }

    @media all and (max-width: 480px) {
      /* width: 90%; */
      font-size: 15px;
      line-height: 27px;
    }
  }
  & a {
    color: #15bf81;
    text-decoration-line: underline;
    font-style: italic;
    cursor: pointer;
  }
  & table {
    /* width: 90%; */
    border-collapse: collapse;
    border-radius: 8px !important;
    border: 1px solid #e8e8e8;
    background-color: #f2f2f2;
    margin-bottom: 48px;

    @media all and (max-width: 480px) {
      /* width: 70%; */
      min-width: 200px;
    }

    /* overflow: hidden; */
  }
  & thead {
    background-color: #f2f2f2;
    color: #aaaaaa;
    text-align: left;
    @media all and (max-width: 980px) {
      font-size: 14px;
    }
    @media all and (max-width: 480px) {
      font-size: 12px;
      padding: 6px;
    }
  }
  & th {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  & td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    color: #000;
    @media all and (max-width: 980px) {
      font-size: 13px;
    }
    @media all and (max-width: 480px) {
      font-size: 11px;
      padding: 6px;
    }
  }
  & tbody tr:hover {
    background-color: #f5f5f5;
  }

  & ol {
    list-style-type: upper-roman;
    margin-left: 30px;
    margin-top: 10px;
  }
  & ul {
    list-style-type: square;
    margin-left: 30px;
    margin-top: 10px;
  }
  li {
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
  & ol ol,
  ul ul {
    list-style-type: lower-alpha;
    margin-left: 30px;
  }
  & figure {
    margin-bottom: 20px;
    img {
      display: block;
      width: 100%;
    }
    img:hover {
      cursor: zoom-in;
    }
    .ytp-cued-thumbnail-overlay-image {
      height: 0;
      padding-top: 56.25%;
    }
    .embed-block-service-twitter {
      max-width: 560px;
      min-width: 560px;
      min-height: 87vh;
    }
    @media all and (max-width: 980px) {
      margin-bottom: 25px;
    }
  }

  & figure:has(> iframe.embed-block-service-youtube) {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 56.25%;
    & iframe {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
  }

  & pre.language-js {
    border-radius: 8px;
    margin-bottom: 48px;

    @media all and (max-width: 980px) {
      font-size: 12px;
    }
  }
`;
const zoomIn = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0.8;
  }

  100% {
    transform: scale(1);
  }
`;

const zoomOut = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.5);
    opacity: 0;
  }
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 900;

  display: none;

  &.active {
    display: block;
  }
`;

const ZoomedImageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  cursor: pointer;
  transition: 0.28s ease-in-out;
  transform: scale(0);

  &.active {
    transform: scale(1);
  }
`;

const ZoomedImage = styled.img`
  min-width: 90%;
  display: block;
  object-fit: contain;
`;

const ContentHeading = styled.h3`
  margin-bottom: 20px;
  color: #474747;
  font-size: 24px;
  font-family: "gordita_medium";
  @media all and (max-width: 1380px) {
    font-size: 22px;
  }
  @media all and (max-width: 1280px) {
    font-size: 20px;
  }
  @media all and (max-width: 1080px) {
    font-size: 18px;
  }
  @media all and (max-width: 980px) {
    font-size: 16px;
  }
  @media all and (max-width: 480px) {
    font-size: 14px;
  }
`;
const ContentParagraph = styled.p`
  margin-bottom: 10px;
  flex-direction: column;
  color: #474747;
  font-size: 20px;
  /* width: 90%; */
  em {
    font-style: italic;
    text-decoration: underline;
    color: #15bf81;
  }
  @media all and (max-width: 1380px) {
    width: 95%;
  }
  @media all and (max-width: 1080px) {
    font-size: 18px;
  }
  @media all and (max-width: 980px) {
    font-size: 16px;
  }
  @media all and (max-width: 480px) {
    font-size: 14px;
  }
  @media all and (max-width: 360px) {
    font-size: 12px;
  }
`;
const Hashtags = styled.div`
  margin-bottom: 30px;
  @media all and (max-width: 768px) {
    margin-top: 20px;
  }
`;
const TopicTags = styled.div`
  /* width: 90%; */
  padding: 20px 0px;
  border-bottom: 1px solid #e8e8e8;
  border-top: 1px solid #e8e8e8;

  @media all and (max-width: 640px) {
    width: 100%;
    margin: 0;
  }
  @media all and (max-width: 480px) {
    width: 100%;
  }
`;
const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
const Items = styled.li`
  display: inline-block;
  padding: 10px 24px;
  background-color: #f2f2f2;
  border-radius: 6px;
  /* margin-bottom: 10px; */
  color: #707070;
  margin-right: 10px;
  font-size: 17px;
  border: 1px solid transparent;
  &.active {
    background-color: #cff1e4;
    border: 1px solid #4ebf96;
    color: #4ebf96;
  }
  @media all and (max-width: 1380px) {
    padding: 8px 20px;
  }
  @media all and (max-width: 1280px) {
    padding: 6px 18px;
  }
  @media all and (max-width: 1080px) {
    font-size: 16px;
  }
  @media all and (max-width: 980px) {
    font-size: 13px;
  }
`;
const Hashtagblog = styled.div`
  display: flex;
  cursor: pointer;
  @media all and (max-width: 1280px) {
    flex-wrap: wrap;
  }
`;
const MainBlogDiv = styled.div`
  /* width: 90%; */
  padding: 20px;
  border-bottom: 1px solid #e8e8e8;
  @media all and (max-width: 768px) {
    width: 92%;
  }
  @media all and (max-width: 640px) {
    width: 93%;
  }
  @media all and (max-width: 480px) {
    width: 96%;
  }
  @media all and (max-width: 360px) {
    padding: 10px;
    width: 100%;
  }
`;
const HashtagHeading = styled.h1`
  color: #4e4c4c;
  font-size: 18px;
  font-family: "gordita_medium";
  margin-bottom: 10px;
  @media all and (max-width: 480px) {
    font-size: 16px;
  }
  @media all and (max-width: 360px) {
    font-size: 14px;
  }
`;
const BlogDiv = styled.div`
  display: flex;
  width: 50%;
  margin-right: 15px;
  border-right: 1px solid #e8e8e8;
  margin-bottom: 16px;

  &:last-child {
    border: none;
  }
  @media all and (max-width: 1080px) {
    /* margin-top: 20px; */
  }

  @media all and (max-width: 1280px) {
    width: 75%;
    border: none;
  }
  @media all and (max-width: 1080px) {
    width: 80%;
  }
  @media all and (max-width: 980px) {
    width: 86%;
  }
  @media all and (max-width: 768px) {
    width: 100%;
  }
  @media all and (max-width: 480px) {
    /* margin: 0; */
    flex-direction: column;
  }
`;
const BlogImg = styled.div`
  width: 60%;
  @media all and (max-width: 1380px) {
    width: 100%;
    @media all and (max-width: 640px) {
      width: 60%;
    }
    @media all and (max-width: 480px) {
      width: 100%;
      margin-bottom: 10px;
    }
  }
  img {
    width: 100%;
    display: block;
  }
`;
const BlogHeadigDiv = styled.div`
  margin-left: 10px;
  @media all and (max-width: 980px) {
    margin-left: 5px;
  }
  @media all and (max-width: 768px) {
    margin-left: 10px;
  }
  @media all and (max-width: 360px) {
    margin-left: 5;
  }
`;
const BlogHeading = styled.h2`
  font-size: 14px;
  font-family: "gordita_medium";
  @media all and (max-width: 1080px) {
    font-size: 14px;
  }
  @media all and (max-width: 980px) {
    font-size: 12px;
  }
`;
const BlogTime = styled.span`
  color: #757575;
  font-size: 12px;
`;
const BlogDay = styled.span`
  color: #757575;
  font-size: 12px;
  margin-right: 10px;
`;
const Reference = styled.div`
  /* width: 90%; */
  padding: 20px 0px;
`;
const ReferenceHeading = styled.h4`
  color: #4e4c4c;
  font-size: 18px;
  font-family: "gordita_medium";
  margin-bottom: 10px;
`;
const ReferenceDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media all and (max-width: 1380px) {
    flex-wrap: wrap;
  }
  @media all and (max-width: 480px) {
  }
`;
const ReferenceList = styled.a`
  display: flex;
  border-radius: 6px;
  border: 1px solid #e8e8e8;
  align-items: center;
  margin-bottom: 14px;

  width: 48%;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
  @media all and (max-width: 1380px) {
    margin-bottom: 20px;
  }
  @media all and (max-width: 768px) {
    width: 100%;
  }
  /* @media all and (max-width: 480px) {
        margin-bottom: 20px;
        width: 100%;
        flex-direction: column;
    } */
`;
const IconDiv = styled.div`
  margin: 0px 5px;
  width: 7%;
  @media all and (max-width: 1080px) {
    width: 10%;
  }
  @media all and (max-width: 768px) {
    width: 5%;
  }
  @media all and (max-width: 640px) {
    width: 6%;
  }
  @media all and (max-width: 480px) {
    width: 8%;
  }
  @media all and (max-width: 360px) {
    width: 9%;
  }
`;
const IconImg = styled.div`
  /* width: 90%; */
  img {
    display: block;
    width: 100%;
  }
`;
const ReferenceNameDiv = styled.div`
  border-radius: 6px;
  width: 100%;
  background: #f9fdf6;
  padding: 15px;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;

  &:hover {
    background: #f2f2f2;
  }
`;
const ReferenceLinkName = styled.h4`
  color: #01080c;
  font-size: 15px;

  @media all and (max-width: 980px) {
    font-size: 12px;
  }
`;

const Pre = styled.pre`
  position: relative;
`;

const CodeBlock = styled.div`
  position: relative;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
`;

const CopyIconConatiner = styled.span`
  width: 80%;
  display: block;
  img {
    display: block;
    width: 100%;
  }
`;

const ArticleReact = styled.div`
  border-bottom: 1px solid #e8e8e8;
`;

const ReactionContainer = styled.div`
  border-radius: 17px;
  background: #eefcf7;
  padding: 24px 0px;
  text-align: center;
  margin-bottom: 40px;
`;

const Rectiontext = styled.h5`
  font-size: 16px;
  font-family: "gordita_regular";
  margin-bottom: 16px;
  @media all and (max-width: 360px) {
    font-size: 14px;
  }
`;

const ReactionEmojiContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ReactionEmoji = styled.span`
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  width: 30px;
  opacity: 1;

  &:hover {
    width: 50px;
    opacity: 0.9;
  }

  img {
    display: block;
    width: 100%;
  }
  &.hilight {
    width: 50px;
    div.tooltip-element {
      display: none;
    }
  }
  &.fade {
    filter: grayscale(70%);
  }

  .tooltip-element {
    display: none;
    position: absolute;
    border: 1px solid #59605d;
    border-radius: 2px;
    background: #59605d;
    padding: 2px 12px;
    color: #fff;
    font-size: 12px;
    font-family: "gordita_regular";
    top: 100%;
    left: 50%;
    transform: translateX(-50%);

    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 5px 7px 5px;
      border-color: transparent transparent #59605d transparent;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover .tooltip-element {
    display: block;
  }
  @media all and (max-width: 480px) {
    width: 28px;
    &:hover {
      width: 46px;
      opacity: 0.9;
    }
    &.hilight {
      width: 46px;
    }
  }
  @media all and (max-width: 360px) {
    width: 24px;
    &:hover {
      width: 38px;
      opacity: 0.9;
    }
    &.hilight {
      width: 38px;
    }
    .tooltip-element {
      padding: 2px 8px;
      color: #fff;
      font-size: 8px;
      &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 5px 4px 5px;
        border-color: transparent transparent #59605d transparent;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
`;
