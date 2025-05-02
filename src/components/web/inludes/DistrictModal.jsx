import React from "react";
import styled from "styled-components";

export default function DistrictModal({
	selectedDistrict,
	setSelectedDistrict,
	districtSelector,
	setDistrictSelector,
}) {
	const districts = [
		{
			id: 1,
			name: "Thiruvananthapuram",
		},
		{
			id: 2,
			name: "Kollam",
		},
		{
			id: 3,
			name: "Pathanamthitta",
		},
		{
			id: 4,
			name: "Alappuzha",
		},
		{
			id: 5,
			name: "Kottayam",
		},
		{
			id: 6,
			name: "Idukki",
		},
		{
			id: 7,
			name: "Ernakulam",
		},
		{
			id: 8,
			name: "Thrissur",
		},
		{
			id: 9,
			name: "Palakkad",
		},
		{
			id: 10,
			name: "Malappuram",
		},
		{
			id: 11,
			name: "Kozhikode",
		},
		{
			id: 12,
			name: "Wayanad",
		},
		{
			id: 13,
			name: "Kannur",
		},
		{
			id: 14,
			name: "Kasargod",
		},
	];

	return (
		<Container className={districtSelector ? "active" : ""}>
			<SubContainer className={districtSelector ? "active" : ""}>
				<List>
					{districts.map((district) => (
						<DisctrictContainer
							key={district.id}
							onClick={() => {
								setSelectedDistrict(district.name);
								setDistrictSelector(false);
							}}
							className={
								selectedDistrict === district.name
									? "active"
									: ""
							}
						>
							{district.name}
							{/* {district.id}) */}
							{selectedDistrict === district.name ? (
								<Checked src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/icon-checked.svg" />
							) : (
								""
							)}
						</DisctrictContainer>
					))}
				</List>
			</SubContainer>
		</Container>
	);
}
const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	inset: 0px;
	background: rgba(0, 0, 0, 0.5);
	z-index: 1111;
	/* display: none; */
	&.active {
		display: flex;
	}
`;
const SubContainer = styled.div`
	background: rgb(255, 255, 255);
	border-radius: 7px;
	width: 327px;
	padding: 28px 21px 10px;
	overflow-y: scroll;
	border-radius: 8px;
	height: 500px;
	/* display: none; */
	display: block;
	&::-webkit-scrollbar {
		display: none;
	}
	&.active {
		/* display: block; */
	}
`;
const List = styled.div``;
const DisctrictContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 12px;
	cursor: pointer;
	font-family: gordita_regular;
	&.active {
		color: rgb(66, 200, 112);
	}
	@media all and (max-width: 480px) {
		font-size: 15px;
	}
`;
const Checked = styled.img`
	width: 17px;
`;
