import React, { Component } from "react";
import Hls from "hls.js";

export default class HLSSource extends Component {
  constructor(props, context) {
    super(props, context);
    this.hls = new Hls();
  }

  checkIfSafari = () => {
    const ua = navigator.userAgent.toLowerCase();
    let safariAgent = ua.indexOf("safari") > -1;
    let chromeAgent = ua.indexOf("chrome") > -1;

    if (chromeAgent && safariAgent) {
      return false;
    } else if (safariAgent) {
      return true;
    } else {
      return false;
    }
  };

  componentDidMount() {
    const { src, video } = this.props;
    if (Hls.isSupported()) {
      this.hls.loadSource(src);
      this.hls.attachMedia(video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // video.play();
        this.hls.nextLevel = this.props.qualityLevel;
        this.props.updateQuality(this.hls.levels);
        if (this.hls.allSubtitleTracks.length > 0) {
          if (!this.checkIfSafari()) {
            this.props.toggleSubtitleExists();
          }
        }
        this.props.setupSubtitles(video, this.hls.allSubtitleTracks);
        this.props.updateTextTrackVisibility(
          video.textTracks,
          this.hls.allSubtitleTracks[0].id,
          true
        );
        this.hls.subtitleTrack = this.hls.allSubtitleTracks[0].id;
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { src, video } = this.props;
    if (prevProps.qualityLevel !== this.props.qualityLevel) {
      this.hls.nextLevel = this.props.qualityLevel;
    }

    if (src !== prevProps.src) {
      if (Hls.isSupported()) {
        this.hls.loadSource(src);
        this.hls.attachMedia(video);

        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
          this.hls.nextLevel = this.props.qualityLevel;
          this.props.updateQuality(this.hls.levels);
        });
      }
    }
  }

  componentWillUnmount() {
    // destroy hls video source
    if (this.hls) {
      this.hls.destroy();
    }
  }

  render() {
    return (
      <source
        src={this.props.src}
        type={this.props.type || "application/x-mpegURL"}
      />
    );
  }
}
