import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PrimeProgramsCard from "./PrimeProgramsCard";
import { primeprogramsConfig } from "../../../../axiosConfig";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../includes/techschooling/general/loaders/Loader";
import Pagination from "../../../helpers/Pagination";
import queryString from "query-string";
import Footer from "../terms&condition/SteypFooter";
import auth from "../../../routing/auth";
import StartNowModal from "./StartNowModal";

const PrimeProgramsHome = (props) => {
    const { user_data } = useSelector((state) => state);
    const [isModal, setModal] = useState(false);
    const [selectedCourse, setSeletedCourse] = useState("");
    const [courses, setCourses] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [itemsPerPage] = useState(12);
    const [pagination, setPagination] = useState([]);
    const [currentPage, setCurrentPage] = useState("");

    const dispatch = useDispatch();

    // get page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        gotoSection();
    }, [currentPage]);

    // Get page items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);

    const setInitialSearch = () => {
        let { search } = props.location;
        const values = queryString.parse(search);
        let page = values.page;
        setCurrentPage(page ? page : 1);
    };

    useEffect(() => {
        const fetchData = (access_token = null) => {
            primeprogramsConfig
                .get("learning/courses/", {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((response) => {
                    const {
                        StatusCode,
                        data,
                        pagination_data,
                        has_active_subscription,
                    } = response.data;
                    if (StatusCode === 6000) {
                        setCourses(data);
                        setPagination(pagination_data);
                        setLoading(false);
                        // dispatch({
                        //     type: "UPDATE_PRIME_SUBSCRIPTION",
                        //     hasPrimeSubscription: has_active_subscription,
                        // });
                    } else {
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    dispatch({
                        type: "UPDATE_ERROR",
                        error: error,
                        errorMessage: "Server error please try again",
                    });
                    // console.log(error);
                    setLoading(false);
                });
            setInitialSearch();
        };

        if (auth.isAuthenticated()) {
            fetchData(user_data?.access_token);
        } else {
            fetchData();
        }
    }, [user_data?.access_token]);

    const prime = useRef(null);
    const executeScroll = () => prime.current.scrollIntoView();
    const gotoSection = (event) => {
        if (prime.current) {
            executeScroll();
        }
    };

    return (
        <>
            <StartNowModal
                isModal={isModal}
                setModal={setModal}
                course={selectedCourse}
            />
            {isLoading ? (
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            ) : (
                <Main>
                    <SectionBtm>
                        {currentItems.map((item) => (
                            <PrimeProgramsCard
                                id={item.id}
                                course={item}
                                key={item.id}
                                setModal={setModal}
                                setSeletedCourse={setSeletedCourse}
                            />
                        ))}
                    </SectionBtm>
                    {itemsPerPage && (
                        <Pagination
                            location={props.location}
                            currentPage={currentPage}
                            paginate={paginate}
                            itemsPerPage={itemsPerPage}
                            totalItems={courses.length}
                            total_pages={pagination.total_pages}
                            pagination={pagination}
                        />
                    )}
                    {!auth.isAuthenticated() && (
                        <FooterContainer>
                            <Footer />
                        </FooterContainer>
                    )}
                </Main>
            )}
        </>
    );
};

export default PrimeProgramsHome;

const LoaderContainer = styled.div`
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;
const Main = styled.section`
    margin-left: 15px;
    @media (max-width: 1500px) {
        margin-left: 0px;
    }
`;

const SectionBtm = styled.section`
    padding-bottom: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 18px;
    @media (max-width: 1325px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 666px) {
        grid-template-columns: 1fr;
    }
`;

const FooterContainer = styled.div`
    margin-bottom: 35px;
`;
