import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PrimeProgramsCard from "./PrimeProgramsCard";
import { serverConfig } from "../../../../axiosConfig";
import useUserStore from "../../../../store/authStore";
import Loader from "../../includes/techschooling/general/loaders/Loader";
import Pagination from "../../../helpers/Pagination";
import queryString from "query-string";
import Footer from "../terms&condition/SteypFooter";
import auth from "../../../routing/auth";
import StartNowModal from "./StartNowModal";
import { useLocation } from "react-router-dom";

const PrimeProgramsHome = () => {
    const location = useLocation();
    const { user_data } = useAuthStore();
    const [isModal, setModal] = useState(false);
    const [selectedCourse, setSeletedCourse] = useState("");
    const [courses, setCourses] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [itemsPerPage] = useState(12);
    const [pagination, setPagination] = useState([]);
    const [currentPage, setCurrentPage] = useState("");

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
        let { search } = location;
        const values = queryString.parse(search);
        let page = values.page;
        setCurrentPage(page ? page : 1);
    };

    useEffect(() => {
        const fetchData = (access_token = null) => {
            serverConfig
                .get("learning/courses/", {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((response) => {
                    const {
                        status_code,
                        data,
                        pagination_data,
                        has_active_subscription,
                    } = response.data;
                    if (status_code === 6000) {
                        setCourses(data);
                        setPagination(pagination_data);
                        setLoading(false);
                    } else {
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
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
                            location={location}
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
const SectionBtm = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 20px;
    @media (max-width: 1500px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;
const FooterContainer = styled.div`
    margin-top: 20px;
`;
