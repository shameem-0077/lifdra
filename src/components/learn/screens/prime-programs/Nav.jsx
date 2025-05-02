import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import auth from "../../../routing/auth";
import SubscriptionBanner from "./SubscriptionBanner";
import { useSelector } from "react-redux";

function Nav() {
    const user_profile = useSelector((state) => state.user_profile);

    return (
        <Main>
            <SectionTop>
                <DivLeft>
                    <Head>Prime Programs</Head>
                    {/* <Para className="g-regular">
                        Get an opportunity for learning advanced programming
                        technologies in Malayalam. We combine visualization and
                        logic to help our students learn and understand
                        programming languages
                    </Para> */}
                </DivLeft>
                {/* {user_profile.prime_program_subscription?.is_expired ||
                !user_profile.prime_program_subscription?.is_subscription ? (
                    <div>
                        <SubscriptionBanner />
                    </div>
                ) : null} */}
            </SectionTop>

            {/* {auth.isAuthenticated() &&
				(user_profile.prime_program_subscription?.is_expired ? (
					<NavMenu>
						<NavigBar>
							<MenuItem
                                exact
                                activeClassName="active"
                                to="/prime-programs/courses/"
                                className="g-regular"
                            >
                                Courses
                            </MenuItem>
							{auth.isAuthenticated() && (
								<MenuItem
									exact
									// activeClassName="active"
									to="/prime-programs/courses/purchased/"
									className="g-regular"
								>
									Purchased
								</MenuItem>
							)}
						</NavigBar>
					</NavMenu>
				) : !user_profile.prime_program_subscription
						?.is_subscription ? (
					<NavMenu>
						<NavigBar>
							<MenuItem
                                exact
                                activeClassName="active"
                                to="/prime-programs/courses/"
                                className="g-regular"
                            >
                                Courses
                            </MenuItem>
							{auth.isAuthenticated() && (
								<MenuItem
									exact
									// activeClassName="active"
									to="/prime-programs/courses/purchased/"
									className="g-regular"
								>
									Purchased
								</MenuItem>
							)}
						</NavigBar>
					</NavMenu>
				) : null)} */}
        </Main>
    );
}

export default Nav;

const Main = styled.section`
    margin-left: 15px;
    @media (max-width: 1500px) {
        margin-left: 0px;
    }
`;
const NavMenu = styled.div`
    margin: 0 20px 0 20px;
    padding-bottom: 30px;
`;
const MenuItem = styled(NavLink)`
    position: relative;
    width: 100px;
    font-size: 17px;
    margin-right: 25px;
    cursor: pointer;
    padding-bottom: 3px;
    transition: all 0.4s ease-in-out 0s;
    &:last-child {
        margin-right: 0;
    }
    &::after {
        content: "";
        position: absolute;
        height: 4px;
        background: transparent;
        bottom: -10px;
        width: 0px;
        left: 0;
        border-radius: 3px;
        transition: width 0.5s ease, background-color 0.5s ease;
    }
    /* &.active::after {
        background: #15bf81;
        width: 100%;
    } */
    @media (max-width: 640px) {
        font-size: 16px;
    }
`;
const NavigBar = styled.div`
    padding-bottom: 6px;
    border-bottom: 1px solid #bebebe;
`;
const SectionTop = styled.div`
    /* padding: 20px 0px 20px; */
    padding-top: 20px;
    /* display: flex;
    justify-content: space-between; */
    @media (max-width: 640px) {
        /* padding-bottom: 22px; */
        /* padding: 20px 0px; */
    }
`;
const DivLeft = styled.div``;
const Head = styled.h2`
    font-size: 22px;
    font-family: "gordita_medium";
    /* margin-bottom: 10px; */
    @media (max-width: 640px) {
        font-size: 21px;
    }
`;
const Para = styled.p`
    font-size: 15px;
    @media (max-width: 640px) {
        font-size: 13px;
    }
`;
