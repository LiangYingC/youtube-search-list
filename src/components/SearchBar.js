import React from 'react';
import styled from 'styled-components';

const SearchArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
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
    changeValue
}) => {
    return (
        <SearchArea>
            <SearchInput
                value={searchValue}
                onChange={changeValue}
                placeholder="請輸入搜尋內容"
            />
            <SearchIcon>
                <i class="fas fa-search"></i>
            </SearchIcon>
        </SearchArea>
    )
}

export default SearchBar;