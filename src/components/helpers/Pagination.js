import React from "react";
import styled from "styled-components";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage, total_pages }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            {total_pages <= 1 ? (
                <></>
            ) : (
                <Container>
                    {pageNumbers.map((number) => (
                        <Round
                            key={number}
                            onClick={() => {
                                paginate(number);
                            }}
                            style={{
                                background: parseInt(currentPage) === number && "#56c082",
                                color: parseInt(currentPage) === number && "#fff",
                            }}
                        >
                            {number}
                        </Round>
                    ))}
                </Container>
            )}
        </>
    );
};

export default Pagination;

const Container = styled.div`
    display: flex;
    justify-content: center;
`;
const Round = styled.span`
    cursor: pointer;
    margin-right: 8px;
    font-size: 16px;
    font-family: gordita_medium;
    height: 35px;
    width: 35px;
    color: #a5accd;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:last-child {
        margin-right: 0;
    }
`;
