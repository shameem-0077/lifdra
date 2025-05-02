import React from "react";
import ReactPlaceholder from "react-placeholder";
import { TextBlock, RectShape } from "react-placeholder/lib/placeholders";
import "react-placeholder/lib/reactPlaceholder.css";

const cardPlaceHolder = (props) => (
    <div
        className="my-awesome-placeholder"
        style={{
            display: "flex",
            height: props.height,
            padding: "25px",
            borderRadius: "10px",
            background: props.background,
        }}
    >
        <RectShape
            style={{
                width: "25%",
                marginRight: "4%",
                borderRadius: "10px",
                background: props.content_color,
            }}
            showLoadingAnimation
        />
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "46%",
                justifyContent: "center",
            }}
        >
            <TextBlock
                rows={1}
                color={props.color}
                style={{
                    width: "35%",
                    marginBottom: "25px",
                    background: props.content_color,
                }}
                showLoadingAnimation
            />
            <TextBlock
                rows={1}
                color={props.color}
                style={{
                    width: "60%",
                    marginBottom: "18px",
                    background: props.content_color,
                }}
                showLoadingAnimation
            />
            <TextBlock
                rows={1}
                color={props.color}
                style={{ width: "16% ", background: props.content_color }}
                showLoadingAnimation
            />
        </div>
    </div>
);

class SearchPlaceholder extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                <ReactPlaceholder
                    customPlaceholder={cardPlaceHolder(this.props)}
                    showLoadingAnimation
                    ready={!this.props.status}
                >
                    <React.Fragment />
                </ReactPlaceholder>
            </React.Fragment>
        );
    }
}

export default SearchPlaceholder;
