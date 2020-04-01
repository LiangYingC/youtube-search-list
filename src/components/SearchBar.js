import React from 'react';
import styled from 'styled-components';

const SearchArea = styled.div`
    min-height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    color: #ffffff;
    background-color: #ff5556;
`
const SearchInput = styled.input`
    font-size: 24px;
    color: #ffffff;
    background-color: #ff5556;
    letter-spacing: 1px;

    ::placeholder {
        font-size: 24px;
        opacity: 0.85;
        color: #ffffff;
    }
`
const SearchIcon = styled.div`
    padding: 10px; 
    cursor: pointer; 

    .fa-search {
        font-size: 23.5px;
        color: #ffffff;
    }
`

const SearchBar = ({
    searchValue,
    changeValue,
    handleSearch
}) => {
    return (
        <SearchArea>
            <SearchInput
                value={searchValue}
                onChange={changeValue}
                placeholder="請輸入搜尋內容"
            />
            <SearchIcon onClick={handleSearch}>
                <i className="fas fa-search" ></i>
            </SearchIcon>
        </SearchArea>
    )
}

export default SearchBar;