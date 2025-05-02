import React from "react";
import styled from "styled-components";

class ChatVoiceRecord extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            recording: false,
            audios: [],
        };
    }
    async componentDidMount() {
        await navigator.mediaDevices
            .getUserMedia({
                audio: true,
            })
            .then((stream) => {
                // init recording
                this.mediaRecorder = new MediaRecorder(stream);
                this.localStream = stream;
                // init data storage for video chunks
                this.chunks = [];
                // listen for data from media recorder
                this.mediaRecorder.ondataavailable = (e) => {
                    if (e.data && e.data.size > 0) {
                        this.chunks.push(e.data);
                    }
                };
                this.startRecordingOnMount();
            })
            .catch((err) => {
                this.props.recordAudio("permission_denied");
            });
    }

    startRecordingOnMount = () => {
        // wipe old data chunks
        this.chunks = [];
        // start recorder with 10ms buffer
        this.mediaRecorder.start(10);
        // say that we're recording
        this.setState({ recording: true });
    };

    stopRecording(e) {
        e.preventDefault();
        if (this.mediaRecorder) {
            // stop the recorder
            this.mediaRecorder.stop();
            // say that we're not recording
            this.setState({ recording: false });
            // save the video to memory
            var track = this.localStream.getTracks()[0];
            track.stop();
            this.saveAudio();
        }
    }

    saveAudio() {
        // convert saved chunks to blob
        const blob = new Blob(this.chunks, { type: "audio/ogg; codecs=opus" });
        // generate video url from blob
        const audioURL = window.URL.createObjectURL(blob);

        this.setState({ audioURL, blob });
    }

    sendAudio = () => {
        // stop the recorder
        this.mediaRecorder.stop();
        // say that we're not recording
        this.setState({ recording: false });
        // convert saved chunks to blob
        const blob = new Blob(this.chunks, { type: "audio/ogg; codecs=opus" });
        // generate video url from blob
        const audioURL = window.URL.createObjectURL(blob);

        this.setState({ audioURL, blob });
        // save the video to memory

        var track = this.localStream.getTracks()[0];
        track.stop();

        this.props.sendAudio(audioURL, blob);
    };

    deleteAudio(e) {
        this.stopRecording(e);
        this.props.recordAudio();
    }

    render() {
        return (
            <AudioBox>
                <div className="actions" style={this.styles.audio_box_action}>
                    <span
                        className="delete"
                        style={this.styles.audio_delete}
                        onClick={(e) => this.deleteAudio(e)}
                    >
                        <i
                            className="las la-trash-alt"
                            style={this.styles.audio_delete_icon}
                        ></i>
                    </span>
                    <span
                        className="audio-send"
                        onClick={(e) => {
                            this.sendAudio(e);
                        }}
                        style={this.styles.audio_send}
                    >
                        <div
                            style={this.styles.audio_send_pulsating_circle}
                            className="pulsating-circle"
                        >
                            <i
                                style={this.styles.audio_send_icon}
                                className="las la-paper-plane"
                            ></i>
                        </div>
                    </span>
                    <span className="right" style={this.styles.recording}>
                        <b style={this.styles.recording_text}> Recording</b>
                    </span>
                </div>
            </AudioBox>
        );
    }

    styles = {
        audio_box_action: {
            width: "50%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
        },
        audio_send_pulsating_circle: {
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            width: "50px",
            height: "50px",
        },
        audio_delete: {
            background: "#F70505",
            borderRadius: "50%",
            color: "#fff",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        audio_delete_icon: {
            fontSize: "17px",
        },
        audio_send_icon: {
            position: "absolute",
            color: "#fff",
            zIndex: 1,
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            margin: "auto",
            textAlign: "center",
            lineHeight: "50px",
            fontSize: "15px",
            borderRadius: "100px",
            backgroundColor: "#1AC207",
        },
        recording: {
            display: "flex",
            alignItems: "center",
            marginLeft: "30px",
        },
        recording_text: {
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            display: "inline-block",
            marginRight: "10px",
        },
    };
}

const AudioBox = styled.div`
    padding: 40px 0;
    @media only screen and (max-width: 640px) {
        padding: 10px 0;
    }
`;

export default ChatVoiceRecord;
