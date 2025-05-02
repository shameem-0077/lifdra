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
            padding: 10,
            flexDirection: "row",
            marginBottom: 20,
            alignItems: "center",
        }}
    >
        <RectShape
            color="#eaeaea"
            style={{
                width: 101.61,
                height: 67.65,
                marginRight: 10,
            }}
            showLoadingAnimation
        />
        <div>
            <TextBlock
                rows={1}
                color="#eaeaea"
                style={{ width: "210px", marginBottom: 6 }}
                showLoadingAnimation
            />
            <TextBlock
                rows={1}
                color="#eaeaea"
                style={{ width: "60px" }}
                showLoadingAnimation
            />
        </div>
    </div>
);

class TopicSideCardPlaceholder extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                <ReactPlaceholder
                    customPlaceholder={cardPlaceHolder(this.props)}
                    ready={!this.props.status}
                    showLoadingAnimation
                >
                    <React.Fragment />
                </ReactPlaceholder>
            </React.Fragment>
        );
    }
}

export default TopicSideCardPlaceholder;
