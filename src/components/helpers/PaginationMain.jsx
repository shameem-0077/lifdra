import React, { useEffect, useState } from "react";
import styled from "styled-components";

const PaginationControls = ({
  paginationdata,
  currentPage,
  setCurrentPage,
  handlePageClick,
}) => {
  const {
    current_page,
    has_next_page,
    next_page_number,
    has_previous_page,
    previous_page_number,
    total_pages,
  } = paginationdata;

  const [windowWidth, setWindowWidth] = useState(0);

  const getPageNumbers = () => {
    const pages = [];

    //   // Always add the first two pages
    if (total_pages > 3) {
      if (
        (window.innerWidth <= 780 && currentPage > 3) ||
        window.innerWidth <= 480
      ) {
        pages.push(1);
      } else {
        pages.push(1, 2);
      }
    } else {
      pages.push(1, 2);
    }

    //   // Rules for displaying ellipses and pages
    if (window.innerWidth <= 480) {
      pages.push(currentPage);
    } else {
      if (total_pages > 2) {
        if (currentPage <= 1) {
          // Pages 1 to 3
          pages.push(currentPage + 2);
        } else if (currentPage >= total_pages) {
          pages.push(currentPage - 2);
        } else if (currentPage >= total_pages - 1) {
          pages.push(currentPage - 1);
        } else if (currentPage >= total_pages - 2) {
          // Last three pages
          pages.push(total_pages - 3);
        } else {
          // Middle pages
          pages.push(currentPage - 1, currentPage, currentPage + 1);
        }
      }
    }

    //   // Always add the last three pages
    if (
      (window.innerWidth <= 780 && currentPage < total_pages - 2) ||
      window.innerWidth <= 480
    ) {
      pages.push(total_pages);
    } else {
      if (total_pages > 2) {
        pages.push(total_pages - 2, total_pages - 1, total_pages);
      }
    }

    //   // Remove duplicates and sort
    const uniquePages = Array.from(new Set(pages)).sort((a, b) => a - b);

    //   // Insert ellipses where needed
    const pageList = [];
    for (let i = 0; i < uniquePages.length; i++) {
      // Push the page number or ellipsis into the list
      pageList.push(uniquePages[i]);
      // Insert ellipsis if the next number isn't the subsequent one
      if (
        i < uniquePages.length - 1 &&
        uniquePages[i + 1] !== uniquePages[i] + 1
      ) {
        pageList.push("...");
      }
    }

    return pageList;
  };

  const goToPage = (pageNumber) => {
    handlePageClick(Number(pageNumber));
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  //   useEffect(() => {
  //     if (pathname.includes("/moments")) {
  //       router.push(/moments?page=${currentPage});
  //     } else if (pathname.includes("/careers")) {
  //       router.push(
  //         `/careers?page=${currentPage}&q=${
  //           searchParams.get("q") ? searchParams.get("q") : ""
  //         }`
  //       );
  //     }
  //   }, [currentPage]);
  const pageNumbers = getPageNumbers();

  return (
    <PaginationContainer className="flex items-center justify-center">
      <Button
        disabled={has_previous_page && currentPage >= 1 ? false : true}
        onClick={() => {
          if (currentPage > 1 && has_previous_page) {
            goToPage(currentPage - 1);
          } else {
            goToPage(1);
          }
        }}
        className={
          has_previous_page && currentPage >= 1
            ? "page-button"
            : "page-button-not"
        }
      >
        <ButtonImageContainer>
          <ButtonImage
            src={
              "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/14-12-2023/talrop-svg/arrow-left.svg"
            }
            alt="Thumbnail"
            width={500}
            height={500}
          />
        </ButtonImageContainer>
        <ButtonLabel className="text-sm gordita_medium max-ml:hidden">
          Previous
        </ButtonLabel>
      </Button>
      {pageNumbers.map((number, index) => (
        <RoundButtonContainer key={index}>
          {/* {total_pages >= number && number > 0 && ( */}
          <RoundButton
            key={number.toString() + index}
            onClick={() => number !== "..." && goToPage(number)}
            className={
              currentPage === number
                ? "active"
                : number === "..."
                ? "bg-transparent rounded-lg"
                : "inactive"
            }
            disabled={number === "..."}
          >
            {number}
          </RoundButton>
          {/* )} */}
        </RoundButtonContainer>
      ))}

      <Button
        disabled={has_next_page && currentPage <= total_pages ? false : true}
        onClick={() => {
          if (currentPage < total_pages && has_next_page) {
            goToPage(currentPage + 1);
          } else {
            goToPage(total_pages);
          }
        }}
        className={
          has_next_page && currentPage <= total_pages
            ? "page-button right"
            : "page-button-not right"
        }
      >
        <ButtonLabel>Next</ButtonLabel>
        <ButtonImageContainer className="rotate-180">
          <ButtonImage
            src={
              "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/14-12-2023/talrop-svg/arrow-left.svg"
            }
            alt="Thumbnail"
            width={500}
            height={500}
          />
        </ButtonImageContainer>
      </Button>
    </PaginationContainer>
  );
};

export default PaginationControls;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-bottom: 30px; */
  .page-button {
    background: linear-gradient(0deg, #fff, #fff),
      linear-gradient(0deg, #d0d5dd, #d0d5dd);
    border: 1.33px solid #d0d5dd;
    box-shadow: 0 1px 2px 0 #1018280d;
    border-radius: 6px;
  }
  .page-button-not {
    /* background: #d5d5d5; */
    border: 1.33px solid #d5d5d5;
    color: #636262;
    box-shadow: 0 1.3290084600448608px 2.6580169200897217px 0 #1018280d;
    border-radius: 6px;
    cursor: not-allowed;
  }
  .right {
    margin-right: 0 !important;
  }
`;

const Button = styled.button`
  color: #344054;
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  position: relative;
  z-index: 0;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-bottom: 0.4rem;
  margin-right: 0.75rem;
  justify-content: space-between;
  align-items: center;
  outline-style: none;
  width: max-content;
  min-width: 0;
  height: max-content;
  -webkit-font-smoothing: auto;
  -moz-osx-font-smoothing: auto;
  font-weight: 400;
  white-space: nowrap;
  appearance: none;
  cursor: pointer;
  user-select: none;
  padding-top: 10px;
  transition-property: transform, color, background, background-color,
    border-color, text-decoration-color, fill, stroke, opacity;
  transition-timing-function: ease;
  transition-duration: 0.25;
  .rotate-180 {
    transform: rotate(180deg);
  }
  :hover {
    opacity: 0.8;
  }
`;

const ButtonImageContainer = styled.div`
  margin-right: 0.5rem;
  width: 20px;
  height: 20px;
  @media all and (max-width: 980px) {
    margin-right: 0;
  }
`;

const ButtonImage = styled.img`
  border-radius: 0.5rem;
  display: block;
  width: 100%;
  height: 100%;
`;

const ButtonLabel = styled.span`
  font-size: 0.875rem;
  line-height: 1.1rem;
  margin-right: 10px;
  color: #344054;
  /* margin-top: auto; */
  font-family: gordita_medium !important;
  @media all and (max-width: 1025px) {
    display: none;
  }
`;

const RoundButtonContainer = styled.div`
  .active {
    border-radius: 9999px;
    background: #e1feef;
    color: #475467;
  }
  .inactive {
    background-color: transparent;
    :hover {
      border-radius: 50%;
      background: #f9fafb;
    }
  }
`;

const RoundButton = styled.button`
  display: flex;
  margin-right: 0.5rem;
  justify-content: center;
  align-items: center;
  min-width: 0;
  padding-top: 4px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  color: #475467;
`;
