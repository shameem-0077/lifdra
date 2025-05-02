import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

function DropDownModal({isModal,setInvoice,downloadInvoice}) {
	return (
		<>
			<BackContainer className={isModal ? "active" : ""}>		
				<Modal className={isModal ? "active" : ""}>
					<Container>
						<Items>
							<ListItems>
								<EyeContainer>
									<img 
                                    	src={require("../../../../../../assets/images/profile-screen/eye.svg")}
                                	/>
								</EyeContainer>
									Preview
							</ListItems>
							<ListItems onClick={downloadInvoice}>
								<DownLoadContainer>
									<img 
                                    	src={require("../../../../../../assets/images/profile-screen/frame.svg")}
                                	/>
								</DownLoadContainer>
								Download
							</ListItems>
						</Items>
					</Container>
				</Modal>
			</BackContainer>
		</>
	);
}

export default DropDownModal;

const BackContainer = styled.div`
	/* position: fixed; */
	transition: 0.3s;
	transform: scale(0);
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
	bottom: 0;
	right: 0;
	&.active{
		transform: scale(1);
	}
`;
const Modal = styled.div`
	width: 167px;
	max-height: 90vh;
	overflow: hidden;
	background: #fff;
	transition-delay: 0.8s;
	transition: all 0.4s ease;
	border-radius: 5px;
	transition: 0.5s;
	transform: scale(0);
	border: 1px solid #EEEEEE;
	&.active{
		transform: scale(1);
	}
`;
const Container = styled.div`

`;
const Items = styled.ul`
	
`;
const ListItems = styled.li`
	display: flex;
	align-items: center;
	font-size: 12px;
	font-family: "gordita_medium";
	padding: 12px 34px;
	border-bottom: 1px solid #EEEEEE;
	cursor: pointer;
	&:last-child{
		color: #15BF81;
		margin-bottom: 0;
	}
`;
const EyeContainer = styled.div`
	width: 15px;
	margin-right: 5px;
	img{
		/* display: block; */
		width: 100%;
	}
`;
const DownLoadContainer = styled.div`
	width: 18px;
	margin-right: 5px;
	img{
		/* display: block; */
		width: 100%;
	}
`;



