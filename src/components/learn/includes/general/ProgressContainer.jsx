import React, { Component } from "react";

const ProgressBar = props => {
  const progress_bar = {
    positon: "relative",
    width: "100%",
    height: "10px",
    borderRadius: "50px",
    background: "#d9d9d9"
  };
  return (
    <div className="progress-bar" style={progress_bar}>
      <Filter percentage={props.percentage} barColor={props.barColor} />
    </div>
  );
};

const Filter = props => {
  const filter = {
    width: `${props.percentage}%`,
    backgroundColor: props.barColor,
    height: "100%",
    borderRadius: "inherit",
    transition: "width .2s ease-in"
  };
  return <div className="filter" style={filter}></div>;
};

class ProgressContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <ProgressBar
          percentage={this.props.percentage}
          barColor={this.props.barColor}
        />
      </React.Fragment>
    );
  }
}

export default ProgressContainer;
