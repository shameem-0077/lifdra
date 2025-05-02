import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import colors from "../../../../Colors";
import styled from "styled-components";
import DropFile from "../general/DropFile/DropFile";
import AOS from "aos";
import "aos/dist/aos.css";
import RequestLoader from "../authentication/general/RequestLoader";

function mapStatetoProps(state) {
    return {
        isDropFileModalVisible: state.isDropFileModalVisible,
        divMainClass: state.divMainClass,
    };
}

class Practice extends React.PureComponent {
    state = {
        showDropFile: false,
        fileName: "",
        selectedFile: null,
    };

    componentDidMount() {
        document.addEventListener("dragenter", this.handleDragIn);
        AOS.init({
            duration: 400,
        });
    }

    handleDragIn = (e) => {
        let { isDropActive } = this.state;
        if (!isDropActive) {
            this.setState({
                isDropActive: true,
            });
        }
    };

    setUploadFile = (file) => {
        this.setState({ selectedFile: file, isDropActive: false });
    };

    onChange = (e) => {
        if (e.target.value.substring(3, 11) === "fakepath") {
            this.setState({ fileName: e.target.value.substring(12) });
        }
    };

    onChangeHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        });
    };

    truncate = (str) => {
        const extension = str.split(".").pop();
        return str.length > 29 ? str.substring(0, 19) + "..." + extension : str;
    };

    render() {
        const { fileName } = this.state;
        let { isDropActive } = this.state;

        if (this.props.show_modal) {
            return (
                <div
                    className="modalContainer"
                    style={this.styles.modalContainer}
                >
                    {isDropActive ? (
                        <DropFile setUploadFile={this.setUploadFile} />
                    ) : null}
                    {/* <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            width: "100%",
                            height: "100%",
                            background: "rgba(177, 177, 177, 0.3)",
                            zIndex: 200,
                        }}
                        //   onClick={this.props.toggleEmailModal}
                        onClick={this.props.onModalClose}
                        className="overlay"
                    ></div> */}
                    <ModalContentContainer data-aos="fade-up">
                        {/* <div className="left" style={this.styles.left}> */}
                        <ContentContainer>
                            <div className="top" style={this.styles.top}>
                                <Head>Practice</Head>
                                <Heading>
                                    {`${
                                        this.props.id
                                            ? `#${this.props.id} -`
                                            : ""
                                    } ${this.props.title}`}
                                </Heading>
                            </div>
                            <Middle>
                                {fileName.length === 0 ? (
                                    <File>
                                        <h4
                                            style={
                                                this.styles.content_box_title
                                            }
                                        >
                                            Browse your file
                                        </h4>
                                        <small
                                            style={
                                                this.styles.content_box_small
                                            }
                                        >
                                            Or drag and drop to upload
                                        </small>
                                    </File>
                                ) : (
                                    <FileName>
                                        {this.truncate(fileName)}
                                    </FileName>
                                )}
                                <Label
                                    htmlFor="file-upload"
                                    style={this.styles.label}
                                >
                                    <UploadButton className="button" to="">
                                        <i
                                            className="las la-paperclip"
                                            style={this.styles.button_icon}
                                        ></i>
                                        {fileName.length === 0
                                            ? "Choose file"
                                            : "Change file"}
                                    </UploadButton>
                                    <input
                                        accept=".zip,.rar"
                                        style={this.styles.inputfile}
                                        type="file"
                                        name="file"
                                        id="file-upload"
                                        onChange={(event) => {
                                            this.onChange(event);
                                            this.onChangeHandler(event);
                                        }}
                                    ></input>
                                </Label>
                            </Middle>
                            {this.props.isUploadError ? (
                                <small
                                    style={{
                                        color: "red",
                                        marginBottom: "5px",
                                        display: "inline-block",
                                    }}
                                >
                                    {this.props.uploadErrorMessage}
                                </small>
                            ) : null}
                            <RemarkCont className="remarks">
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <h3 style={this.styles.remarks}>Remarks</h3>
                                    <h4 style={{ fontFamily: "inherit" }}>
                                        (Optional)
                                    </h4>
                                    {/* <small
                                        style={this.styles.content_box_small}
                                    >
                                       ( Optional)
                                    </small> */}
                                </div>

                                <Input
                                    type="text"
                                    placeholder="Type a message or instruction or regarding your practice"
                                    onChange={(e) => {
                                        let message = e.target.value;
                                        this.props.takeMessage(message);
                                    }}
                                ></Input>
                            </RemarkCont>
                            <div className="button">
                                {this.props.uploadLoading ? (
                                    <div style={this.styles.button}>
                                        <RequestLoader />
                                    </div>
                                ) : (
                                    <Link
                                        style={this.styles.button}
                                        to="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            !this.props.uploadLoading &&
                                                this.props.onClickHandler(
                                                    this.state.selectedFile
                                                );
                                        }}
                                    >
                                        Submit
                                    </Link>
                                )}
                            </div>
                        </ContentContainer>
                        <RightImage className="right" style={this.styles.right}>
                            <Image
                                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/upload-popup.png"
                                alt=""
                            />
                        </RightImage>
                        <span
                            className="close"
                            style={this.styles.close}
                            onClick={this.props.onModalClose}
                        >
                            <i
                                className="las la-times"
                                style={this.styles.close_icon}
                            ></i>
                        </span>
                    </ModalContentContainer>
                </div>
            );
        } else {
            return null;
        }
    }

    styles = {
        inputfile: {
            visibility: "hidden",
            position: "absolute",
        },
        label: {},
        modalContainer: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: "100%",
            height: "100%",
            //   background: "#fff",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        top: {
            fontSize: "14px",
            fontFamily: "gordita_medium",
        },
        image: {
            display: "block",
            width: "100%",
        },
        contentBox: {
            margin: "50px 0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
        },
        // top_title: {
        //   marginTop: "20px",
        //   fontSize: "25px",
        //   fontFamily: "gordita_medium"
        // },
        content_box_title: {
            fontFamily: "gordita_medium",
        },
        content_box_small: {
            color: "#a0a0a0",
            fontFamily: "gordita_regular",
        },
        content_box_span: {
            fontWeight: "bold",
        },
        upload_button: {
            backgroundColor: "#2f51c7",
            color: "#fff",
            fontFamily: "gordita_medium",
            display: "flex",
            padding: "0.6rem 1.25rem",
            borderRadius: "0.625rem",
            fontSize: "18px",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
        },
        // left: {
        //   width: "45%"
        // },
        right: {
            alignItems: "center",
            display: "flex",
        },
        remarks_container: {
            marginBottom: "40px",
        },
        remarks: {
            marginRight: "10px",
            fontFamily: "gordita_regular",
        },
        input_box: {
            width: "100%",
            fontSize: "18px",
            color: "#747474",
            letterSpacing: ".02em",
            border: "1px solid #d2d2d2",
            padding: "19px",
            borderRadius: "0.250em",
            height: "25vh",
            resize: "none",
        },
        button: {
            height: "54px",
            width: "100%",
            color: "#fff",
            textAlign: "center",
            fontSize: "15px",
            fontFamily: "gordita_medium",
            backgroundColor: "#489e58",
            borderRadius: "5px",
            display: "inline-block",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        button_icon: {
            fontSize: "22px",
            marginRight: "10px",
            cursor: "pointer",
        },
        close: {
            position: "absolute",
            cursor: "pointer",
            top: "27px",
            right: "27px",
            zIndex: "1000",
            background: "#fff",
            boxShadow:
                "0 4px 4px 0 rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "50%",
        },
        close_icon: {
            fontSize: "15px",
            padding: "10px",
        },
    };
}

const UploadButton = styled.a`
    background-color: rgb(47, 81, 199);
    cursor: pointer;
    color: rgb(255, 255, 255);
    min-width: 155px;
    padding: 9px 21px;
    display: flex;
    border-radius: 21px;
    font-size: 16px;
    align-items: center;
    font-family: "gordita_medium";
    justify-content: center;
    width: fit-content;
    transition: all 0.4s ease;
    @media only screen and (max-width: 1100px) {
        min-width: 138px;
        padding: 7px 11px;
    }
    /* @media only screen and (max-width: 1350px) {
        width: 90% !important;
    }
    @media only screen and (max-width: 1288px) {
        width: 100% !important;
    }
    @media only screen and (max-width: 380px) {
        padding: 9px 49px;
    } */
`;

const FileName = styled.span`
    font-family: gordita_medium;
    font-size: 14px;
    @media only screen and (max-width: 1800px) {
        font-size: 16px;
    }
`;
const Middle = styled.div`
    margin: 30px 0px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media only screen and (max-width: 1800px) {
        width: 100%;
    }
    @media only screen and (max-width: 786px) {
        margin: 20px 0px 10px;
    }
    @media only screen and (max-width: 420px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;
const Input = styled.textarea`
    width: 100%;
    font-size: 18px;
    color: rgb(116, 116, 116);
    letter-spacing: 0.02em;
    border: 1px solid rgb(210, 210, 210);
    padding: 19px;
    border-radius: 0.25em;
    height: 25vh;
    resize: none;
    font-family: gordita_regular;
    @media only screen and (max-width: 1800px) {
        font-size: 16px;
    }
    @media only screen and (max-width: 1400px) {
        font-size: 14px;
    }
    @media only screen and (max-width: 786px) {
        width: 96%;
    }
`;
const ContentContainer = styled.div`
    width: 45%;
    @media only screen and (max-width: 1288px) {
        width: 98% !important;
        margin-right: 3%;
    }
    /* @media only screen and (max-width: 1024px) {
        width: 65% !important;
    }
    @media only screen and (max-width: 980px) {
        width: 70% !important;
    }
    @media only screen and (max-width: 650px) {
        width: 100% !important;
    } */
`;
const RightImage = styled.div`
    @media only screen and (max-width: 980px) {
        display: none !important;
    }
`;
const Heading = styled.h3`
    margin-top: 15px;
    font-size: 22px;
    font-family: gordita_medium;
    @media only screen and (max-width: 1288px) {
        font-size: 20px;
    }
    @media only screen and (max-width: 1024px) {
        font-size: 16px;
    }
    /* @media only screen and (max-width: 980px) {
        font-size: 18px;
    } */
    @media only screen and (max-width: 848px) {
        font-size: 16px;
        margin-top: 7px;
    }
`;
const Head = styled.h2`
    margin-top: 20px;
    font-size: 22px;
    font-family: gordita_regular;
    @media only screen and (max-width: 848px) {
        font-size: 20px;
    }
    @media only screen and (max-width: 500px) {
        font-size: 26px;
    }
`;
const RemarkCont = styled.div`
    margin-bottom: 40px;
    @media only screen and (max-width: 848px) {
        margin-bottom: 20px;
    }
`;
const File = styled.div`
    margin-right: 20px;
    @media only screen and (max-width: 420px) {
        margin-bottom: 13px;
        margin-right: 30px;
    }
`;
const Image = styled.img`
    display: block;
    width: 100%;
    @media only screen and (max-width: 670px) {
        display: none;
    }
`;
const Label = styled.label``;
const ModalContentContainer = styled.div`
    background: #fff;
    width: 80%;
    padding: 50px;
    border-radius: 10px;
    border: 1px solid;
    border-color: ${colors.white};
    display: flex;
    justify-content: space-around;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 100;
    @media only screen and (max-width: 480px) {
        width: 95%;
        padding: 20px;
    }
`;
export default connect(mapStatetoProps)(Practice);
