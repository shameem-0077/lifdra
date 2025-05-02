import React from "react";
import styled from "styled-components";
import Chart from "chart.js/auto";

class RoundGraph extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			position_offset: "",
		};
		this.node = [];
	}
	componentDidMount() {
		this.renderGraph();
	}
	renderGraph = () => {
		let { count, total, color, colorLight } = this.props;

		new Chart(this.node, {
			type: "doughnut",
			data: {
				labels: ["Count", "Remaining"],
				datasets: [
					{
						data: [count, total - count],
						backgroundColor: [color, colorLight],
						borderWidth: 0,
						cutout: "80%",
					},
				],
			},
			options: {
				plugins: {
					tooltip: {
						enabled: false,
					},
					legend: {
						display: false,
					},
					cutoutPercentage: this.props.strokewidthPercent
						? this.props.strokewidthPercent
						: 90,
				},
			},
		});
	};
	render() {
		return (
			<Graph
				className="count-item"
				title={this.props.title}
				style={this.styles.graph}
			>
				<div className="chart" style={this.styles.chart}>
					<canvas
						className="redChart"
						style={{
							width: this.props.dimension
								? this.props.dimension
								: 50,
							height: this.props.dimension
								? this.props.dimension
								: 50,
						}}
						ref={(node) => this.node.push(node)}
					/>
					{this.props.is_background ? (
						<span
							className="round"
							style={{
								display: "flex",
								height: "80%",
								position: "absolute",
								top: this.props.dimension
									? this.props.dimension / 10
									: 5,
								left: this.props.dimension
									? this.props.dimension / 10
									: 5,
								width: "80%",
								zIndex: 1,
								borderRadius: "50%",
								alignItems: "center",
								justifyContent: "center",
								fontFamily: "product_sansbold",
								fontSize: "1rem",
								backgroundColor: this.props.colorLight,
								color: this.props.contentColor
									? this.props.contentColor
									: this.props.color,
							}}
						>
							{this.props.content}
						</span>
					) : (
						<span
							className="round"
							style={{
								display: "flex",
								height: "80%",
								position: "absolute",
								top: this.props.dimension
									? this.props.dimension / 10
									: 5,
								left: this.props.dimension
									? this.props.dimension / 10
									: 5,
								width: "80%",
								zIndex: 1,
								borderRadius: "50%",
								alignItems: "center",
								justifyContent: "center",
								fontFamily: "product_sansbold",
								fontSize: "1rem",
								color: this.props.contentColor
									? this.props.contentColor
									: this.props.color,
							}}
						>
							{this.props.content}
						</span>
					)}
				</div>
				<Small {...this.props}>{this.props.title}</Small>
				{/* <small style={this.styles.small}></small> */}
			</Graph>
		);
	}

	styles = {
		chart: {
			position: "relative",
		},
		small: {
			color: this.props.color,
			fontFamily: "baloo_paaji_2semibold",
			marginTop: "0.9375rem",
		},
	};
}

const Graph = styled.div`
	display: flex;
	flex-direction: ${(props) => (props.title ? "column" : "row")};
	align-items: center;
	justify-content: center;
	padding: 6px;
	background: #fff;
	border-radius: 50%;
	width: fit-content;
	@media only screen and (max-width: 980px) {
	}

	@media all and (max-width: 480px) {
		.chart {
			position: "relative";
			width: 70px;
		}
	}
	@media all and (max-width: 360px) {
		.chart .round {
			top: 7px;
			left: 7px;
		}
	}
`;

export const Small = styled.small`
	font-size: 17px;
	color: ${(props) => props.color};
	font-family: "product_sansbold";
	margin-top: 0.9375rem;
	@media only screen and (max-width: 1680px) {
		font-size: 14px;
	}
`;

export default RoundGraph;
