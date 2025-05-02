import React from "react";
import {
  Player,
  BigPlayButton,
  ControlBar,
  Shortcut,
  ProgressControl,
} from "video-react";
import HLSSource from "./HLSSource.jsx";
import styled from "styled-components";
import "video-react/dist/video-react.css";
import "../assets/css/styles.css";
import ReactPlayer from "react-player";

var playing = true;

document.addEventListener("fullscreenchange", () => {
  if (document.body.classList.contains("community")) {
    const body = document.body;

    if (document.fullscreenElement) {
      body.classList.add("community-fullscreen");
    } else {
      body.classList.remove("community-fullscreen");
    }
  }
});

function isYouTubeUrl(url) {
  const pattern =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/|live_stream\?channel=))((\w|-){11})(?:\S+)?$/;
  return pattern.test(url);
}

function getYouTubeEmbedUrl(url) {
  // Extract video ID from various YouTube URL formats
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|live\/|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;

  if (!videoId) return url;

  // Return embed URL
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
}

class VideoPlayer extends React.PureComponent {
  nplayerSettings = localStorage.getItem("playerSettings");
  nplayerSettings = JSON.parse(this.nplayerSettings);

  constructor(props, context) {
    super(props, context);

    this.state = {
      clickingInside: false,
      clickingInsideControls: false,
      hideControlBar: true,
      src: this.props.source,
      autoPlay:
        this.props.autoPlay !== "undefined" ? this.props.autoPlay : true,
      quality: [],
      subtitleSrc: [],
      qualityLevel: this.nplayerSettings?.qualityLevel
        ? this.nplayerSettings.qualityLevel
        : "0",
      currentQuality: this.nplayerSettings?.quality.height
        ? this.nplayerSettings.quality.height
        : "",
      selectedQulaity: "",
      isQualities: false,
      isQuality: false,

      playing: true,
      muted: false,
      isFull: false,
      duration: 0,
      currentTime: "",
      formattedCurrentTime: "",
      isSettings: false,
      isItems: true,

      icon_title: "",
      height: 300,
      isSpeed: false,
      currentSpeed: 1,
      volumeValues: [1],

      subtitleExists: false,
      subtitleText: "",
      showSubtitle: true,
      showSubtitleAtFirst: false,
    };

    this.containerRef = React.createRef();
    this.topBarRef = React.createRef();
    this.midBarRef = React.createRef();
    this.bottomBarRef = React.createRef();
  }

  toggleSubtitleExists = () => {
    this.setState({ subtitleExists: true });
  };

  qualitySwitchSelect = (q) => {
    this.setState({
      currentQuality: q.height,
    });
  };

  changeTrack = (q) => {
    this.setState({
      qualityLevel: q,
      isQualities: !this.state.isQualities,
      isItems: !this.state.isItems,
      isSettings: !this.state.isSettings,
    });
  };

  autoClick = () => {
    localStorage.setItem(
      "playerSettings",
      JSON.stringify({
        ...this.playerSettings,
        quality: { height: "Auto" },
      })
    );
    this.setState({
      selectedQulaity: "",
      isQualities: !this.state.isQualities,
      isItems: !this.state.isItems,
      isSettings: !this.state.isSettings,
      qualityLevel: -1,
      currentQuality: "Auto",
    });
  };

  changeCurrentQuality = (e, q) => {
    this.qualitySwitchSelect(q);
  };

  goFull = () => {
    this.setState({ isFull: !this.state.isFull });
    this.toggleFullscreen();
    if (window.innerHeight > window.innerWidth) {
      window.screen.orientation.lock("landscape");
    }
  };

  seek = (seconds) => {
    return () => {
      this.player.seek(seconds);
    };
  };

  toggleFullscreen = () => {
    this.player.toggleFullscreen();
  };

  play = () => {
    this.player.play();
    playing = true;
    this.setState({ playing: true });
  };

  pause = () => {
    this.player.pause();
    this.setState({ playing: false });
  };

  updateQuality = (quality) => {
    this.setState({ quality });
  };

  setupSubtitles = (video, subtitleTracks) => {
    subtitleTracks.forEach((track, index) => {
      const trackElement = document.createElement("track");
      trackElement.kind = "subtitles";
      trackElement.label = track.name;
      trackElement.srclang = track.lang;
      trackElement.src = track.url;
      trackElement.default = index === 0;
      video.appendChild(trackElement);
    });
  };

  updateTextTrackVisibility = (textTracks, selectedIndex) => {
    for (let i = 0; i < textTracks.length; i++) {
      textTracks[i].mode = i === selectedIndex ? "showing" : "disabled";
    }
  };

  toggleSubtitle = () => {
    this.setState({ showSubtitle: !this.state.showSubtitle });
    localStorage.setItem(
      "playerSettings",
      JSON.stringify({
        qualityLevel: this.state.qualityLevel,
        quality: { height: this.state.currentQuality },
        currentSpeed: this.state.currentSpeed,
        showSubtitle: !this.state.showSubtitle,
      })
    );
  };

  hideQulaityBoxes = () => {
    this.setState({
      isQualities: !this.state.isQualities,
      isItems: !this.state.isItems,
      isSettings: !this.state.isSettings,
    });
  };

  changeCurrentTime(seconds) {
    return () => {
      const { player } = this.player.getState();
      this.player.seek(player.currentTime + seconds);
    };
  }

  setMuted = (muted) => {
    return () => {
      this.setState({ muted: muted });
      this.player.muted = muted;
    };
  };

  changeVolume = (steps) => {
    return () => {
      const { player } = this.player.getState();
      this.player.volume = player.volume + steps;
    };
  };

  selectedQulaityWidth = (q, index) => {
    localStorage.setItem(
      "playerSettings",
      JSON.stringify({
        ...this.playerSettings,
        quality: { height: q.height },
        qualityLevel: index,
      })
    );
    this.setState({ selectedQulaity: index });
  };

  load() {
    this.player.load();
    this.setState({ loading: true });
  }

  changePlaybackRate = (q) => {
    return () => {
      this.player.playbackRate = q;

      this.setState({ currentSpeed: q });
      localStorage.setItem(
        "playerSettings",
        JSON.stringify({
          qualityLevel: this.state.qualityLevel,
          quality: { height: this.state.currentQuality },
          currentSpeed: q,
        })
      );
    };
  };

  visualizeQuality = () => {
    return this.state.quality.map((q, index) => (
      <div
        className={`parent ${
          this.state.currentQuality === q.height ? "selected" : ""
        }`}
        key={index}
        onClick={(e) => {
          this.changeCurrentQuality(e, q);
          this.selectedQulaityWidth(q, index);
          this.changeTrack(index);
        }}
      >
        <div>
          <div className="line" />
        </div>
        <div>
          {index + 1 === this.state.quality.length ? null : (
            <div className="line two" />
          )}
          <span />
          <p>{q.height}p</p>
        </div>
      </div>
    ));
  };

  handleStateChange(state, prevState) {
    let formattedCurrentTime = this.formatTime(state.currentTime);
    let duration = this.formatTime(state.duration);

    this.setState({
      playing: !state.paused,
      currentTime: state.currentTime,
      formattedCurrentTime: formattedCurrentTime,
      duration: duration,
      videoDuration: state.duration,
    });
  }

  toggleSettings = () => {
    this.setState({
      isSettings: !this.state.isSettings,
      icon_title: "",
    });
  };

  showQualities = () => {
    if (this.state.isSettings) {
      this.setState({
        isItems: !this.state.isItems,
        isQualities: !this.state.isQualities,
      });
    }
  };

  setHeight = () => {
    const width = this.containerRef.current.offsetWidth;
    const height = (width * 9) / 16;
    this.setState({ height });
  };

  keyPress = (e) => {
    if (e.keyCode === 27) {
      this.setState({ isFull: false });
    }
  };

  playerSettings = {
    currentSpeed: 1,
    qualityLevel: -1,
    quality: {
      height: "Auto",
    },
  };

  handleSubtitleChange(textTracks) {
    for (let i = 0; i < textTracks.length; i++) {
      const track = textTracks[i];
      if (track.mode === "showing") {
        const activeCues = track.activeCues;
        if (activeCues?.length > 0) {
          this.setState({ subtitleText: activeCues[0].text });
        } else {
          this.setState({ subtitleText: "" });
        }
      }
    }
  }

  componentDidMount() {
    let hplayerSettings = localStorage.getItem("playerSettings");
    hplayerSettings = JSON.parse(hplayerSettings);

    if (!hplayerSettings) {
      localStorage.setItem(
        "playerSettings",
        JSON.stringify(this.playerSettings)
      );
    } else {
      this.setState({
        currentSpeed: hplayerSettings.currentSpeed,
        showSubtitle: hplayerSettings?.showSubtitle,
      });
    }

    // Only subscribe to state changes if we're using the video-react player
    if (this.player && this.player.subscribeToStateChange) {
      this.player.subscribeToStateChange(this.handleStateChange.bind(this));
      const { player } = this.player.getState();
      if (player.readyState) {
        this.setState({ duration: player.duration });
      }
    }

    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("touchend", this.handleClickOutside);
    document.addEventListener("mouseover", this.handleClickOutside, false);
    document.addEventListener("mouseout", this.handleClickOutside, false);
    this.setHeight();

    // Only setup text tracks if we're using the video-react player
    if (
      this.player &&
      this.player.video &&
      this.player.video.video &&
      this.player.video.video.textTracks
    ) {
      const textTracks = this.player.video.video.textTracks;
      for (let i = 0; i < textTracks.length; i++) {
        textTracks[i].addEventListener(
          "cuechange",
          this.handleSubtitleChange(textTracks)
        );
      }
    }
  }

  componentDidUpdate(prevProps) {
    // Only handle playback rate changes if we're using the video-react player
    if (this.player && this.state.currentSpeed !== prevProps.currentSpeed) {
      this.player.playbackRate = this.state.currentSpeed;
    }

    const { source } = this.props;

    if (source !== prevProps.source) {
      this.setState({ src: source });
    }
    if (
      this.props.isPrime &&
      !isNaN(this.state.videoDuration) &&
      this.state.currentTime > this.state.videoDuration - 10
    ) {
      this.props.handleMarkViewed();
    }

    // Only setup text tracks if we're using the video-react player
    if (
      this.player &&
      this.player.video &&
      this.player.video.video &&
      this.player.video.video.textTracks
    ) {
      const textTracks = this.player.video.video.textTracks;
      for (let i = 0; i < textTracks.length; i++) {
        textTracks[i].addEventListener(
          "cuechange",
          this.handleSubtitleChange(textTracks)
        );
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("touchend", this.handleClickOutside);
    document.removeEventListener("mouseover", this.handleClickOutside, false);
    document.removeEventListener("mouseout", this.handleClickOutside, false);

    // Only try to remove subtitle event listeners if we're using the video-react player
    if (
      this.player &&
      this.player.video &&
      this.player.video.video &&
      this.player.video.video.textTracks
    ) {
      const textTracks = this.player.video.video.textTracks;
      for (let i = 0; i < textTracks.length; i++) {
        textTracks[i].removeEventListener(
          "cuechange",
          this.handleSubtitleChange(textTracks)
        );
      }
    }
  }

  handleClickOutside = (event) => {
    if (
      this.containerRef &&
      !this.containerRef.current.contains(event.target)
    ) {
      this.setState({
        hideControlBar: true,
        clickingInsideControls: true,
      });
    } else {
      this.setState({
        hideControlBar: false,
      });
    }
  };

  handleClickInsidePlayer = (event) => {
    if (
      this.topBarRef &&
      !this.topBarRef.current.contains(event.target) &&
      this.midBarRef &&
      !this.midBarRef.current.contains(event.target)
    ) {
      this.setState({
        hideControlBar: !this.state.hideControlBar,
      });
    }
  };

  formatTime = (seconds) => {
    var guide = seconds;
    var s = Math.floor(seconds % 60);
    var m = Math.floor((seconds / 60) % 60);
    var h = Math.floor(seconds / 3600);
    var gm = Math.floor((guide / 60) % 60);
    var gh = Math.floor(guide / 3600); // handle invalid times

    if (isNaN(seconds) || seconds === Infinity) {
      h = "-";
      m = "-";
      s = "-";
    }

    h = h > 0 || gh > 0 ? "".concat(h, ":") : "";

    m = "".concat((h || gm >= 10) && m < 10 ? "0".concat(m) : m, ":");

    s = s < 10 ? "0".concat(s) : s;
    return h + m + s;
  };

  render() {
    let { cover, isPrime, handlePlayNextCard } = this.props;
    const soundData = [
      {
        id: 1,
        speed: 0.75,
      },
      {
        id: 2,
        speed: 1,
      },
      {
        id: 3,
        speed: 1.25,
      },
      {
        id: 4,
        speed: 1.5,
      },
    ];

    const isYouTube = isYouTubeUrl(this.props.source);

    return (
      <div
        className={`${
          this?.state?.hideControlBar || this?.state?.clickingInside
            ? "hidden"
            : ""
        }`}
        id="video-player"
        ref={this.containerRef}
        style={this.styles.mainContainer}
      >
        <div className="playerContainer" style={this?.styles?.playerContainer}>
          {isYouTube ? (
            <div
              style={{
                position: "relative",
                paddingTop: "56.25%",
                width: "100%",
              }}
            >
              <ReactPlayer
                url={getYouTubeEmbedUrl(this.props.source)}
                playing={this.state.autoPlay}
                controls={true}
                width="100%"
                height="100%"
                style={{ position: "absolute", top: 0, left: 0 }}
                onEnded={isPrime && handlePlayNextCard}
                onPlay={() => {
                  this.setState({ showSubtitleAtFirst: true });
                }}
                onError={(e) => {
                  console.error("YouTube player error:", e);
                  if (e.target?.error?.code === 150) {
                    alert(
                      "This live stream cannot be embedded. Please watch directly on YouTube."
                    );
                  }
                }}
                config={{
                  youtube: {
                    playerVars: {
                      modestbranding: 1,
                      rel: 0,
                      showinfo: 0,
                      controls: 1,
                      fs: 1,
                      playsinline: 1,
                      enablejsapi: 1,
                      origin: window.location.origin,
                      autoplay: this.state.autoPlay ? 1 : 0,
                      mute: this.state.muted ? 1 : 0,
                      iv_load_policy: 3,
                      widget_referrer: window.location.href,
                    },
                  },
                }}
              />
            </div>
          ) : (
            <Player
              ref={(player) => {
                this.player = player;
              }}
              poster={cover && cover}
              autoPlay={this.state.autoPlay}
              fluid={true}
              onEnded={isPrime && handlePlayNextCard}
              playsInline={true}
              onPlay={() => {
                this.setState({ showSubtitleAtFirst: true });
              }}
            >
              <Shortcut clickable={false} />
              <BigPlayButton position="center" />
              <ControlBar autoHide={true} disableDefaultControls={true}>
                <div
                  className={`player-overlay${
                    this.state.clickingInsideControls ? "upper" : ""
                  }`}
                  onClick={() =>
                    this.setState({
                      clickingInside: !this.state.clickingInside,
                      clickingInsideControls: false,
                    })
                  }
                />
                <div
                  ref={this.topBarRef}
                  className={`top-controlls ${
                    this.state.isSpeed || this.state.isQuality
                      ? "hide-player"
                      : ""
                  } ${
                    this.state.hideControlBar || this.state.clickingInside
                      ? "hide"
                      : ""
                  }`}
                  onClick={() =>
                    this.setState({
                      clickingInsideControls: false,
                    })
                  }
                >
                  <div
                    className="control-item"
                    onClick={this.setMuted(!this.state.muted)}
                  >
                    <div className="top-title">Sound</div>

                    {!this.state.muted ? (
                      <TopBox
                        className="icon-selected sound-icon"
                        onClick={this.setMuted(true)}
                      >
                        <img
                          alt=""
                          src={require("../assets/images/speaker.svg")}
                        />
                      </TopBox>
                    ) : (
                      <TopBox
                        className="icon-selected sound-icon"
                        onClick={this.setMuted(false)}
                      >
                        <img
                          alt=""
                          src={require("../assets/images/mute.svg")}
                        />
                      </TopBox>
                    )}
                  </div>
                  <div className="top-right-controls">
                    {this.state.subtitleExists ? (
                      <div
                        className="control-item"
                        onClick={() => this.toggleSubtitle()}
                      >
                        <div className="top-title">Subtitle</div>
                        <TopBox isOn={!this.state.showSubtitle}>CC</TopBox>
                      </div>
                    ) : null}

                    <div
                      className="control-item"
                      onClick={() =>
                        this.setState({
                          isSpeed: true,
                        })
                      }
                    >
                      <div className="top-title">Speed</div>
                      <TopBox className="icon-selected">
                        {this.state.currentSpeed}x
                      </TopBox>
                    </div>
                    {this.state.quality.length > 0 && (
                      <div
                        className="control-item"
                        onClick={() =>
                          this.setState({
                            isQuality: true,
                          })
                        }
                      >
                        {" "}
                        <div className="top-title">Quality </div>
                        <TopBox className="icon-selected">
                          {!this.state.currentQuality
                            ? this.state.quality[0].height
                            : this.state.currentQuality}
                          {this.state.currentQuality !== "Auto" && "p"}
                        </TopBox>
                      </div>
                    )}
                    <div className="control-item" onClick={() => this.goFull()}>
                      <div className="top-title">
                        {!this.state.isFull ? "Full Screen" : "Exit"}
                      </div>
                      <TopBox className="full icon-selected">
                        {!this.state.isFull ? (
                          <img
                            alt=""
                            src={require("../assets/images/max.svg")}
                          />
                        ) : (
                          <img
                            alt=""
                            src={require("../assets/images/mini.svg")}
                          />
                        )}
                      </TopBox>
                    </div>
                  </div>
                </div>

                <SoundContainer
                  className={this.state.isSpeed ? "speed-active" : ""}
                  onClick={() => this.setState({ isSpeed: false })}
                >
                  <SoundHeaderContainer
                    className={this.state.isSpeed ? "active" : ""}
                  >
                    <h3>Speed</h3>
                  </SoundHeaderContainer>
                  <SoundControlsContainer
                    className={this.state.isSpeed ? "active" : ""}
                  >
                    <SpeedBar>
                      <SpeedBarLine>
                        {soundData.map((data, index) => (
                          <div
                            key={data.id}
                            className={`parent ${
                              this.state.currentSpeed === data.speed
                                ? "selected"
                                : ""
                            }`}
                            onClick={this.changePlaybackRate(data.speed)}
                          >
                            <div className={index === 0 ? "first" : ""}>
                              <div className="line" />
                            </div>
                            <div>
                              {index + 1 === soundData.length ? null : (
                                <div className="line two" />
                              )}
                              <span />
                              <p>{data.speed}x</p>
                            </div>
                          </div>
                        ))}
                      </SpeedBarLine>
                    </SpeedBar>
                    <CloseButton
                      onClick={() =>
                        this.setState({
                          isSpeed: false,
                        })
                      }
                    >
                      <img alt="" src={require("../assets/images/close.svg")} />
                    </CloseButton>
                  </SoundControlsContainer>
                </SoundContainer>
                {this.state.quality.length > 0 && (
                  <SoundContainer
                    className={this.state.isQuality ? "quality-active" : ""}
                    onClick={() =>
                      this.setState({
                        isQuality: false,
                      })
                    }
                  >
                    <SoundHeaderContainer
                      className={this.state.isQuality ? "active" : ""}
                    >
                      <h3>Quality</h3>
                    </SoundHeaderContainer>
                    <SoundControlsContainer
                      className={this.state.isQuality ? "active" : ""}
                    >
                      <SpeedBar>
                        <SpeedBarLine>
                          <div
                            className={`parent ${
                              this.state.currentQuality === "Auto"
                                ? "selected"
                                : ""
                            }`}
                            onClick={this.autoClick}
                          >
                            <div className="first">
                              <div className="line" />
                            </div>
                            <div>
                              <div className="line two" />

                              <span />
                              <p>Auto</p>
                            </div>
                          </div>
                          {this.visualizeQuality()}
                        </SpeedBarLine>
                      </SpeedBar>
                      <CloseButton
                        onClick={() =>
                          this.setState({
                            isQuality: false,
                          })
                        }
                      >
                        <img
                          alt=""
                          src={require("../assets/images/close.svg")}
                        />
                      </CloseButton>
                    </SoundControlsContainer>
                  </SoundContainer>
                )}

                <MidControls
                  ref={this.midBarRef}
                  className={`hello-player ${
                    this.state.isSpeed || this.state.isQuality
                      ? "hide-player"
                      : ""
                  } ${
                    this.state.hideControlBar || this.state.clickingInside
                      ? "hide"
                      : ""
                  }`}
                >
                  <ControlIcon onClick={this.changeCurrentTime(-10)}>
                    <img
                      alt="Icon"
                      src={require("../assets/images/backward.svg")}
                    />
                  </ControlIcon>

                  <ControlIcon
                    style={{
                      display: this.state.playing ? "block" : "none",
                    }}
                    onClick={this.pause}
                    className="pause"
                  >
                    <img
                      alt="Icon"
                      src={require("../assets/images/pause.svg")}
                    />
                  </ControlIcon>
                  <ControlIcon
                    style={{
                      display: this.state.playing ? "none" : "block",
                    }}
                    onClick={this.play}
                    className="play"
                  >
                    <img
                      alt="Icon"
                      src={require("../assets/images/play.svg")}
                    />
                  </ControlIcon>
                  <ControlIcon onClick={this.changeCurrentTime(+10)}>
                    <img
                      alt="Icon"
                      src={require("../assets/images/forward.svg")}
                    />
                  </ControlIcon>
                </MidControls>

                <ProgressControl
                  className={`progress-control ${
                    this.state.isSpeed || this.state.isQuality
                      ? "hide-player"
                      : ""
                  } ${
                    this.state.hideControlBar || this.state.clickingInside
                      ? "hide"
                      : ""
                  }`}
                />
                <div
                  className={`button-container ${
                    this.state.isSpeed || this.state.isQuality
                      ? "hide-player"
                      : ""
                  } ${
                    this.state.hideControlBar || this.state.clickingInside
                      ? "hide"
                      : ""
                  }`}
                >
                  <div className="left">
                    <span className="time">
                      {this.state.formattedCurrentTime}{" "}
                    </span>
                  </div>
                  <div className="right" style={this.styles.rightContainer}>
                    <span className="time">{this.state.duration}</span>
                  </div>
                </div>
              </ControlBar>
              {this.state.showSubtitle &&
              this.state.showSubtitleAtFirst &&
              this.state.subtitleExists &&
              this.state.subtitleText != "" ? (
                <SubtitleText
                  controllState={this.state.hideControlBar}
                  clickingInside={this.state.clickingInside}
                  isFull={this.state.isFull}
                >
                  {this.state.subtitleText}
                </SubtitleText>
              ) : null}

              {this.props.source && (
                <HLSSource
                  isVideoChild
                  qualityLevel={this.state.qualityLevel}
                  updateQuality={this.updateQuality}
                  setupSubtitles={this.setupSubtitles}
                  toggleSubtitleExists={this.toggleSubtitleExists}
                  updateTextTrackVisibility={this.updateTextTrackVisibility}
                  alt=""
                  src={this.props.source}
                />
              )}
            </Player>
          )}
        </div>
      </div>
    );
  }

  styles = {
    mainContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: `url(${this.props.thumbnail})`,
      backgroundSize: "cover",
      width: "100%",
      position: "relative",
    },
    playerContainer: {
      position: "relative",
      width: "100%",
      // paddingTop: "56.25%", // 16:9 aspect ratio
    },
    buttonsAlign: {
      display: "flex",
      alignItems: "center",
    },
    button: {
      height: "17px",
      width: "17px",
    },
    forwindbutton: {
      height: "22px",
      width: "22px",
    },
    buttonImage: {
      height: "100%",
      maxWidth: "17px",
    },
    controls: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: "60px",
      backgroundColor: "rgba(0,0,0,.4)",
      zIndex: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 30px",
    },
    controls_left_container: {
      display: "flex",
      alignItems: "center",
    },
    play_button: {
      display: playing === true ? "block" : "none",
    },
    rightContainer: {
      display: "flex",
      alignItems: "flex-start",
      position: "relative",
    },
  };
}

export default VideoPlayer;

const SubtitleText = styled.p`
  z-index: 1;
  position: absolute;
  transition: 0.4s ease-in-out;
  bottom: ${(props) =>
    props.controllState || props.clickingInside ? "10%" : "20%"};
  background: rgba(0, 0, 0, 0.75);
  padding: 10px 10px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 80%;
  width: max-content;
  border-radius: 10px;
  color: #fff;
  font-family: "gordita_medium" !important;
  font-size: ${(props) => (props.isFull ? "20px" : "14px")};
  text-align: center;
  @media all and (max-width: 480px) {
    font-size: 12px;
  }
`;
const TopBox = styled.div`
  font-size: 13px;
  font-family: "gordita_medium";
  border: 2px solid #fff;
  border-radius: 3px;
  padding: 5px 5px 3px 5px;
  transform: scale(1);
  transition: ease 0.4s;

  &::after {
    content: "";
    position: absolute;
    top: -9px;
    left: 15px;
    width: 3px;
    height: 40px;
    background-color: #fff;
    -webkit-transform: rotate(59deg);
    -ms-transform: rotate(59deg);
    transform: rotate(59deg);
    -webkit-transform-origin: center;
    -ms-transform-origin: center;
    transform-origin: center;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    display: ${(props) => (props.isOn ? "block" : "none")};
    @media all and (max-width: 480px) {
      top: -9px;
      left: 12px;
      width: 3px;
      height: 32px;
    }
  }

  &.sound-icon {
    width: 22px;
    height: 22px;
    border: unset;
    border-radius: unset;
    padding: unset;
    vertical-align: middle;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &.full {
    border: unset;
    border-radius: unset;
    padding: unset;
    width: 22px;
    vertical-align: middle;
    transform: scale(1);
    transition: ease 0.4s;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &:hover {
    transform: scale(1.1);
    transition: ease 0.4s;
  }
  @media all and (max-width: 640px) {
    margin-right: 10px;
  }
  @media all and (max-width: 480px) {
    font-size: 10px;
    font-family: "gordita_medium";

    padding: 2px 5px 0 5px;
    line-height: 1.3em;
    &.full {
      width: 18px;
    }
    &.sound-icon {
      width: 18px;
      height: 18px;
    }
  }
`;
const TopRightControls = styled.div`
  display: flex;
  align-items: center;
`;
const MidControls = styled.div`
  display: block;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  min-width: 47%;
  align-items: center;
  justify-content: space-between;
  z-index: 51;
  transition: all 0.5s ease;
  opacity: 1;

  &.hide {
    display: none;
    opacity: 0;
    transition: all 0.5s ease;
  }
  @media all and (max-width: 640px) {
    width: 72%;
  }
`;
const ControlIcon = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  transform: scale(1);
  transition: ease 0.4s;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &:hover {
    transform: scale(1.1);
    transition: ease 0.4s;
  }
  @media all and (max-width: 980px) {
    width: 45px;
    height: 45px;
  }
  @media all and (max-width: 640px) {
    width: 35px;
    height: 35px;
  }
  @media all and (max-width: 480px) {
    width: 23px;
    height: 23px;
  }
`;

// Speed Section
const SoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: ease 0.4s;
  z-index: 9;

  &.speed-active {
    z-index: 51;
  }
  &.quality-active {
    z-index: 51;
  }
`;
const SoundHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
  background-color: rgba(36, 36, 36, 0.7);
  opacity: 0;
  transform: translateY(-50px);
  transition: all 0.4s ease;
  &.active {
    opacity: 1;
    transform: unset;
  }
  h3 {
    color: #fff;
    text-align: center;
    font-size: 18px;
    font-family: "gordita_medium";
  }
  @media all and (max-width: 640px) {
    height: 60px;
    h3 {
      color: #fff;
      text-align: center;
      font-size: 14px;
      font-family: "gordita_medium";
    }
  }
  @media all and (max-width: 480px) {
    /* height: 60px; */
    h3 {
      color: #fff;
      text-align: center;
      font-size: 13px;
      font-family: "gordita_medium";
    }
  }
`;
const SoundControlsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100px;
  width: 100%;
  padding-top: 25px;
  background-color: rgba(36, 36, 36, 0.7);
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.4s ease;
  &.active {
    opacity: 1;
    transform: unset;
  }
  @media all and (max-width: 640px) {
    height: 60px;
    padding-top: 15px;
  }
  @media all and (max-width: 480px) {
    /* height: 60px; */
    padding-top: 15px;
  }
`;
const SpeedBar = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 480px) {
    width: 93%;
  }
`;
const CloseButton = styled.div`
  width: 20px;
  position: absolute;
  top: 15%;
  right: 5%;
  cursor: pointer;
  transform: scale(1);
  transition: ease 0.4s;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &:hover {
    transform: scale(1.1);
    transition: ease 0.4s;
  }
  @media all and (max-width: 480px) {
    width: 17px;
  }
`;
const SpeedBarLine = styled.div`
  display: flex;

  align-items: flex-start;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  div.parent {
    width: 100%;
    display: flex;
    align-items: flex-start;
    div {
      width: 100%;
      display: flex;
      flex-direction: column;
      div.line {
        width: 100%;
        height: 3px;
        background-color: #b1b1b1;
        &:last-child {
          width: auto;
        }
      }
      span {
        margin-top: -9px;
        margin-left: -8px;
        width: 15px;
        height: 15px;
        border-radius: 100px;
        background-color: #b1b1b1;
        transition: ease 0.4s;
        transform: scale(1);
      }
      p {
        font-size: 14px;
        font-family: "gordita_medium";
        color: #b1b1b1;
        margin-left: -100%;
        margin-top: 5px;
        text-align: center;
        transform: scale(1);
        transition: ease 0.4s;
      }
    }
    div.first {
      div.line {
        display: none;
      }
    }
    &:last-child {
      span {
        margin-top: -6px;
        transform: scale(1);
        transition: ease 0.4s;
      }
    }
    &:hover {
      span {
        transform: scale(1.1);
        transition: ease 0.4s;
        background-color: #15bf81;
        margin-bottom: 6px;
      }
      p {
        transform: scale(1.1);
        transition: ease 0.4s;
        color: #fff;
      }
    }
    &.selected {
      span {
        background-color: #15bf81;
      }
      p {
        color: #fff;
      }
    }
  }
  @media all and (max-width: 640px) {
    div.parent {
      &:last-child {
        span {
          margin-top: -4px;
        }
      }
      div {
        div.line {
          height: 2px;
        }

        span {
          margin-top: -6px;
          margin-left: -8px;
          width: 10px;
          height: 10px;
        }
        p {
          font-size: 12px;
          font-family: "gordita_medium";
          margin-top: 4px;
        }
      }
    }
  }
  @media all and (max-width: 480px) {
    div.parent {
      &:last-child {
        span {
          margin-top: -4px;
        }
      }
      div {
        div.line {
          height: 2px;
        }

        span {
          margin-top: -6px;
          margin-left: -8px;
          width: 10px;
          height: 10px;
        }
        p {
          font-size: 11px;
          font-family: "gordita_medium";
          margin-top: 4px;
        }
      }
    }
  }
`;
const VolumeBarContainer = styled.div`
  margin-left: 10px;
  width: 100px;
`;
