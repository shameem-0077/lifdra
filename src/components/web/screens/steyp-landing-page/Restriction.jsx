import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Restriction = ({ setFormModal }) => {
    return (
        <Container>
            <Contains className="wrapper">
                <Title>
                    <span>Steyp</span> is exclusively available for <br />{" "}
                    students from <small>Kerala</small>
                </Title>
                <Button
                    to="/tech-schooling/apply/"
                    //  onClick={() => setFormModal(true)}
                >
                    Apply for SAT
                    <span>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/22-09-2021/right-side.svg"
                            alt=""
                        />
                    </span>
                </Button>
            </Contains>
        </Container>
    );
};

export default Restriction;
const Button = styled(Link)`
    margin: 35px auto 0;
    cursor: pointer;
    width: 200px;
    padding: 15px 14px;
    background: transparent linear-gradient(100deg, #0fa76f 0%, #0f9ea7 100%) 0%
        0% no-repeat padding-box;
    font-size: 15px;
    color: #ffffff;
    font-family: gordita_medium;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    transition: all 0.4s ease;
    span {
        width: 0;
        display: block;
        transition: all 0.4s ease;
        img {
            display: block;
            width: 100%;
            transition: all 0.4s ease;
        }
    }
    &:hover {
        width: 220px;
        span {
            width: 18px;
            margin-left: 10px;
        }
    }

    @media all and (max-width: 980px) {
        height: 50px;
        width: 250px;
    }
    @media all and (max-width: 768px) {
    }
    @media all and (max-width: 640px) {
        height: 40px;
        width: 200px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        position: relative;
        z-index: 5;
    }
    @media all and (max-width: 480px) {
        margin: 15px auto 0;
    }
`;
const Contains = styled.div`
    text-align: center;
    position: relative;
    padding: 90px 0;
    @media all and (max-width: 640px) {
        padding: 58px 0px 105px;
        width: 92% !important;
    }
    @media all and (max-width: 480px) {
        padding: 10% 0 10%;
    }
    @media all and (max-width: 360px) {
        /* padding: 10% 0 10%; */
    }
`;
const Container = styled.div`
    background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/restricted-background.png")
        no-repeat;
    background-position: 125% 0%;
    background-size: 36%;
    background-color: #212121;
    @media all and (max-width: 640px) {
        padding: 35px 0 0;
    }
    @media all and (max-width: 480px) {
        padding: 0px 0 0;
    }
`;
const Title = styled.h1`
    font-family: gordita_medium;
    font-size: 35px;
    color: #ffffff;
    @media all and (max-width: 640px) {
        font-size: 24px;
    }

    small {
        position: relative;
        font-size: 35px;

        &::after {
            content: "";
            position: absolute;
            width: 106px;
            height: 12px;
            bottom: -6px;
            left: 0;
            background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/line.svg")
                no-repeat;
            background-size: contain;
            display: block;

            @media all and (max-width: 480px) {
                width: 91px;
                height: 12px;
                bottom: -9px;
                left: -5px;
            }
            @media all and (max-width: 420px) {
                width: 87px;
                height: 12px;
                bottom: -9px;
                left: -5px;
            }
        }
        @media all and (max-width: 480px) {
            font-size: 24px;
        }
        @media all and (max-width: 420px) {
            font-size: 22px;
        }
    }
    span {
        display: inline;
        font-family: gordita_medium;
        font-size: 35px;
        color: #4eaf7c;
        @media all and (max-width: 980px) {
            font-size: 32px;
        }
        @media all and (max-width: 768px) {
            font-size: 30px;
        }
        @media all and (max-width: 640px) {
            font-size: 28px;
        }
        @media all and (max-width: 480px) {
            font-size: 24px;
        }
        @media all and (max-width: 420px) {
            font-size: 22px;
        }
    }
    @media all and (max-width: 1100px) {
        font-size: 26px;
    }
    @media all and (max-width: 480px) {
        font-size: 22px;
    }
    @media all and (max-width: 420px) {
        font-size: 19px;
    }
`;
// const Bottom = styled.h1`
// 	font-family: gordita_medium;
// 	font-size: 51px;
// 	color: #fff;
// 	margin-top: -12px;
// 	position: relative;
// 	z-index: 1;
// 	@media all and (max-width: 640px) {
// 		text-align: left;
// 	}
// 	@media all and (max-width: 980px) {
// 		font-size: 48px;
// 	}
// 	@media all and (max-width: 768px) {
// 		font-size: 40px;
// 	}
// 	@media all and (max-width: 640px) {
// 		font-size: 29px;
// 	}
// 	@media all and (max-width: 480px) {
// 		font-size: 24px;
// 		margin-top: 1px;
// 	}
// 	@media all and (max-width: 420px) {
// 		font-size: 21px;
// 	}
// 	span {
// 		font-family: gordita_regular;
// 		font-size: 35px;
// 		color: #fff;
// 		margin-right: 9px;
// 		@media all and (max-width: 980px) {
// 			font-size: 32px;
// 		}
// 		@media all and (max-width: 768px) {
// 			font-size: 26px;
// 		}
// 		@media all and (max-width: 640px) {
// 			font-size: 24px;
// 		}
// 		@media all and (max-width: 480px) {
// 			font-size: 20px;
// 		}
// 		@media all and (max-width: 420px) {
// 			font-size: 18px;
// 		}
// 	}
// 	&:after {
// 		content: "";
// 		position: absolute;
// 		width: 304px;
// 		height: 9px;
// 		bottom: 11px;
// 		left: 179px;
// 		z-index: -1;
// 		background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/20-04-2022/line.svg")
// 			no-repeat;
// 		background-size: contain;
// 		display: block;
// 		@media all and (max-width: 980px) {
// 			width: 280px;
// 			bottom: 5px;
// 			left: 158px;
// 		}
// 		@media all and (max-width: 768px) {
// 			width: 235px;
// 			left: 133px;
// 		}
// 		@media all and (max-width: 640px) {
// 			width: 170px;
// 			left: 125px;
// 		}
// 		@media all and (max-width: 480px) {
// 			width: 156px;
// 			left: 100px;
// 			bottom: 0px;
// 		}
// 		@media all and (max-width: 420px) {
// 			width: 133px;
// 			left: 93px;
// 			bottom: 0px;
// 		}
// 	}
// `;
