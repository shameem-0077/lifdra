import React from "react";
import ProgressContainer from "../../../general/ProgressContainer";

const styles = {
    conatiner: {
        width: "30%",
        padding: "25px 20px",
        background: "#f8f9fd",
    },
    top: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
    },
    title: {
        fontWeight: 600,
    },
    number: {},
};

const PopupBar = ({ result, total, barColor }) => {
    return (
        <React.Fragment>
            <ProgressContainer
                percentage={(result / total) * 100}
                barColor={barColor}
            />
            <small className="status" style={styles.status}>
                Question {result} of {total}
            </small>
        </React.Fragment>
    );
};

export default PopupBar;
