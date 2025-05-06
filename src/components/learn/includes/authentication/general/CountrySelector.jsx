import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { serverConfig } from "../../../../../axiosConfig";
import { useAuthStore } from "../../../../../store/authStore";

export default function CountrySelector({
    handleClick,
    show,
    onSelectHandler,
    selectedCountry,
    selectedwebCode,
}) {
    const { user_data } = useAuthStore();

    //outside click
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    handleClick();
                    setSearchTerm("");
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref, handleClick]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    //search functions
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [countryDetails, setCountryDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = useCallback((event) => {
        setSearchTerm(event.target.value);
    }, []);

    useEffect(() => {
        const results = countryDetails?.filter(
            (item) =>
                item.name.includes(searchTerm) ||
                item.name.toLowerCase().includes(searchTerm) ||
                item.name.toUpperCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm, countryDetails]);

    const fetchCountries = useCallback(async () => {
        if (isLoading) return;
        
        setIsLoading(true);
        try {
            const response = await serverConfig.get("/api/v1/users/settings/countries/");
            const { status_code, data } = response.data;
            
            if (status_code === 6000) {
                setCountryDetails(data);
                const selected_country_code = selectedwebCode
                    ? selectedwebCode
                    : user_data?.selectedCountry?.web_code || "IN";

                const selected_country = data?.find(
                    (item) => item.web_code === selected_country_code
                );
                
                if (selected_country && onSelectHandler) {
                    onSelectHandler(selected_country);
                }
            }
        } catch (error) {
            console.error("Error fetching countries:", error);
        } finally {
            setIsLoading(false);
        }
    }, [selectedwebCode, user_data, onSelectHandler]);

    useEffect(() => {
        if (show && countryDetails.length === 0) {
            fetchCountries();
        }
    }, [show, countryDetails.length, fetchCountries]);

    //maping countries
    const renderCountries = searchResults?.map((item, index) => (
        <CountryItem
            key={index}
            style={{
                display:
                    selectedCountry.country_code === item.country_code &&
                    "none",
            }}
            onClick={() => {
                handleClick();
                if (onSelectHandler) {
                    onSelectHandler(item);
                }
                setSearchTerm("");
            }}
        >
            <Left>
                <Flag src={item.flag} alt="" />
                <Text
                    className="b-medium"
                    style={{
                        color:
                            selectedCountry.country_code === item.country_code
                                ? "#42c870"
                                : null,
                    }}
                >
                    {`${item.name} (${item.phone_code})`}
                </Text>
            </Left>
            {selectedCountry.country_code === item.country_code ? (
                <Checked src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/icon-checked.svg" />
            ) : null}
        </CountryItem>
    ));

    return show ? (
        <Container>
            <ItemContainer ref={wrapperRef}>
                <SearchContainer>
                    <SearchIcon src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/search.svg" />
                    <SearchInput
                        autoFocus
                        className="b-medium"
                        placeholder="Select your Country"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </SearchContainer>
                <CountryList>
                    {selectedCountry.id !== null && (
                        <CountryItem
                            onClick={() => {
                                handleClick();
                                setSearchTerm("");
                            }}
                        >
                            <Left>
                                <Flag src={selectedCountry.flag} />
                                <Text
                                    className="b-medium"
                                    style={{
                                        color: "#42c870",
                                    }}
                                >
                                    {`${selectedCountry.name} (${selectedCountry.phone_code} )`}
                                </Text>
                            </Left>
                            <Checked src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/auth/icon-checked.svg" />
                        </CountryItem>
                    )}

                    {renderCountries.length !== 0 ? (
                        renderCountries
                    ) : (
                        <NoResults className="b-medium">
                            No results found
                        </NoResults>
                    )}
                </CountryList>
            </ItemContainer>
        </Container>
    ) : null;
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;
const ItemContainer = styled.div`
    background: #fff;
    border-radius: 7px;
    width: 327px;
    padding: 28px 21px 10px;
`;
const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 7px 15px;
    border: 1px solid #dae3ed;
    border-radius: 6px;
    overflow: hidden;
`;
const SearchIcon = styled.img`
    display: block;
    width: 18px;
    margin-right: 13px;
`;
const SearchInput = styled.input`
    font-size: 17px;
    caret-color: #43c883;
`;
const CountryList = styled.div`
    padding: 11px 0;
    overflow-y: scroll;
    max-height: 450px;
    min-height: 450px;
    &::-webkit-scrollbar {
        width: 0;
    }
`;
const NoResults = styled.span`
    display: flex;
    justify-content: center;
    font-size: 16px;
    color: #9e9e9e;
`;
const CountryItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 12px;
    cursor: pointer;
`;
const Left = styled.div`
    display: flex;
    align-items: center;
`;
const Flag = styled.img`
    display: block;
    width: 37px;
    margin-right: 18px;
`;
const Text = styled.span`
    display: block;
    font-size: 17px;
    /* color: #42c870; */
`;
const Checked = styled.img`
    width: 17px;
`;
