import React from "react";

class AssetDownloadCard extends React.PureComponent {
    state = {
        overlay: "flex",
    };

    renderOverlay() {
        if (this.state.isHover) {
            return (
                <div className="overlay" style={this.styles.asset_item_overlay}>
                    <span>Download</span>
                    <i className="las la-download"></i>
                </div>
            );
        }
    }
    render() {
        return (
            <div className="asset-item" style={this.styles.asset_item}>
                <a
                    href={this.props.item_link}
                    className="thumb"
                    download
                    rel="noopener noreferrer"
                    target="_blank"
                    style={this.styles.asset_item_link}
                    onMouseEnter={() => {
                        this.setState({
                            isHover: true,
                        });
                    }}
                    onMouseLeave={() => {
                        this.setState({
                            isHover: false,
                        });
                    }}
                >
                    <img
                        src={this.props.icon}
                        style={this.styles.asset_item_image}
                        alt=""
                    />
                    <p style={this.styles.asset_item_text}>
                        {this.props.title}
                    </p>
                    <small style={this.styles.asset_item_size}>
                        {this.props.size}
                    </small>
                    {this.renderOverlay()}
                </a>
            </div>
        );
    }

    styles = {
        asset_item: {
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            backgroundColor: "#f8f9fd",
            borderRadius: "0.9375rem",
            position: "relative",
            justifyContent: "center",
            overflow: "hidden",
        },
        asset_item_image: {
            margin: "0 auto 0.9375rem",
            width: " 52%",
        },
        asset_item_link: {
            padding: "1.875rem",
            textAlign: "center",
            width: "100%",
        },
        asset_item_size: {
            color: "#8c8c8c",
            fontFamily: "baloo_paaji_2semibold",
            fontSize: "13px",
        },
        asset_item_overlay: {
            background: "rgba(0,0,0,.6)",
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexDirection: "column",
            display: this.state.overlay,
            transition: "all 0.8s ease-in-out",
        },
        asset_item_text: {
            fontFamily: "baloo_paaji_2semibold",
            fontSize: "0.9rem",
            lineHeight: "16px",
        },
    };
}

export default AssetDownloadCard;
