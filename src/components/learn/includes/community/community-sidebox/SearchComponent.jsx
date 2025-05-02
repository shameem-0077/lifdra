import React, { useState } from "react";
import styled from "styled-components";

function SearchComponent({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </SearchWrapper>
  );
}

export default SearchComponent;

const SearchWrapper = styled.div`
  border: 1.5px solid #e2e8f0;
  border-radius: 6px;
  padding: 9px 24px 9px 24px;
  display: flex;
  align-items: center;
  background: #f8fafc;
`;

const SearchContainer = styled.div``;
const SearchIcon = styled.img`
  display: block;
  width: 18px;
  margin-right: 13px;
`;
const SearchInput = styled.input`
  font-size: 16px;
  width: 100%;
  caret-color: #43c883;
  cursor: text;
`;
