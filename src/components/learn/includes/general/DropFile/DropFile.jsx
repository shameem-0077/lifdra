import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";

const DropFile = ({ setDropActive, setUploadFile }) => {
    const onDrop = useCallback((acceptedFiles) => {
        setUploadFile(acceptedFiles[0]);
        setDropActive(false);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    return (
        <React.Fragment>
            <section
                className="container"
                style={{
                    background: "#f0f0f0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "10% 0",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1000,
                }}
            >
                <div
                    {...getRootProps({ className: "dropzone" })}
                    style={{
                        background: "#fff",
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        position: "relative",
                        border: "2px dashed #aeaeae",
                        padding: "70px 0",
                    }}
                >
                    <i
                        className="las la-cloud-upload-alt"
                        style={{
                            fontSize: "230px",
                            color: "#d7d7d7",
                        }}
                    ></i>
                    <input {...getInputProps()} />
                    <p
                        style={{
                            fontSize: "20px",
                            fontFamily: "product_sansbold",
                            color: "#707070",
                        }}
                    >
                        Drag and drop to upload{" "}
                    </p>
                    <span>
                        or <span style={{ color: "#2cabf8" }}>browse</span> to
                        choose a file
                    </span>

                    <aside>
                        <h3>{File}</h3>
                    </aside>
                </div>
            </section>
            <span
                className="close"
                style={{
                    position: "absolute",
                    top: "204px",
                    right: "477px",
                    zIndex: "1000",
                }}
                onClick={() => setDropActive(false)}
            >
                <i
                    style={{ fontSize: "28px" }}
                    className="lar la-times-circle"
                ></i>
            </span>
        </React.Fragment>
    );
};
export default DropFile;
