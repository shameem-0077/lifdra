import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import PrimeProgramsPurchaseCard from "./PrimeProgramsPurchaseCard";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../store/authStore";
import { serverConfig } from "../../../../axiosConfig";
import Loader from "../../includes/techschooling/general/loaders/Loader";
import Pagination from "../../../helpers/Pagination";
import queryString from "query-string";
import { useLocation } from "react-router";
import SignupLoader from "../../includes/techschooling/general/loaders/SignupLoader";
import StartNowModal from "./StartNowModal";

const PrimeProgramsPurchasedList = () => {
    const { user_data } = useAuthStore();
    const [purchased, setPurchased] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const location = useLocation();
    const [itemsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState("");
    const [isButtonLoading, setButtonLoading] = useState(false);
    const [pagination, setPagination] = useState([]);
    const [isStartNowModal, setStartNowModal] = useState(false);
    const [topicId, setTopicId] = useState("");
    const navigate = useNavigate();

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
    const currentItems = purchased.slice(indexOfFirstItem, indexOfLastItem);

    const setInitialSearch = () => {
        let { search } = location;
        const values = queryString.parse(search);
        let page = values.page;
        setCurrentPage(page ? page : 1);
    };

    useEffect(() => {
        const fetchData = async () => {
            setButtonLoading(true);
            const { access_token } = user_data;
            await primeprogramsConfig
                .get("learning/purchased-courses/", {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((response) => {
                    const { StatusCode, data, pagination_data } = response.data;
                    if (StatusCode === 6000) {
                        setPurchased(data);
                        setPagination(pagination_data);
                        setLoading(false);
                        setButtonLoading(false);
                    } else {
                        setLoading(false);
                        setButtonLoading(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
            setInitialSearch();
        };
        fetchData();
    }, []);

    const prime = useRef(null);
    const executeScroll = () => prime.current.scrollIntoView();
    const gotoSection = (event) => {
        //.current is verification that your element has rendered
        if (prime.current) {
            executeScroll();
        }
    };

    return (
        <>
            <StartNowModal
                topicId={topicId}
                setTopicId={setTopicId}
                isStartNowModal={isStartNowModal}
                setStartNowModal={setStartNowModal}
            />
            {isLoading ? (
                <LoaderContainer>
                    <SignupLoader />
                </LoaderContainer>
            ) : (
                <>
                    {purchased.length > 0 ? (
                        <Main>
                            <PurchasedCard>
                                {currentItems.map((items) => (
                                    <PrimeProgramsPurchaseCard
                                        item={items}
                                        isButtonLoading={isButtonLoading}
                                    />
                                ))}
                            </PurchasedCard>
                            {itemsPerPage && (
                                <Pagination
                                    currentPage={currentPage}
                                    paginate={paginate}
                                    itemsPerPage={itemsPerPage}
                                    totalItems={purchased.length}
                                    total_pages={pagination.total_pages}
                                    pagination={pagination}
                                />
                            )}
                        </Main>
                    ) : (
                        <EmptyContanier>
                            <ImageContainer>
                                <Image
                                    src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/prime-programs/empty.svg"
                                    alt=""
                                />
                            </ImageContainer>
                            <ContentContainer>
                                <ContentTitle>
                                    You've not purchased any courses yet!
                                </ContentTitle>
                            </ContentContainer>
                        </EmptyContanier>
                    )}
                </>
            )}
        </>
    );
};

export default PrimeProgramsPurchasedList;

const Main = styled.section`
    margin-left: 15px;
    @media (max-width: 1500px) {
        margin-left: 0px;
    }
`;
const PurchasedCard = styled.div`
    margin: 20px 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
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
const LoaderContainer = styled.div`
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;
const EmptyContanier = styled.div`
    text-align: center;
    @media screen and (max-width: 480px) {
        margin: 15px 0;
        box-shadow: 0 16px 24px rgba(0, 0, 0, 0.1);
        padding: 25px;
        padding-bottom: 35px;
    }
    @media screen and (max-width: 360px) {
        padding: 18px;
        padding-bottom: 35px;
    }
`;

const ImageContainer = styled.div`
    margin: 20px 0;
`;
const Image = styled.img`
    width: 100%;
    max-width: 300px;
`;
const ContentContainer = styled.div``;
const ContentTitle = styled.h3`
    font-size: 22px;
    font-family: "gordita_medium";
    margin-bottom: 8px;
`;
