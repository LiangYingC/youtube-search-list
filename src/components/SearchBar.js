import React from 'react';
import styled from 'styled-components';

const SearchArea = styled.div`
    min-height: 90px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #fc8888;
`
const SearchBarWrap = styled.div`
    width: 60%;
    height: 50px;
    min-width: 300px;
    max-width: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    border: none;
    border-radius: 12px;
    overflow: hidden;
`

const SearchInput = styled.input`
    height: 100%;
    font-size: 22px;
    color: #555555;
    letter-spacing: 1px;
    width: 100%;
    padding: 5px 10px;

    ::placeholder {
        font-size: 22px;
        opacity: 0.8;
        color: #555555;
    }
`
const SearchIcon = styled.div`
    height: 100%;
    padding: 12px 25px; 
    cursor: pointer; 
    background-color: #ff3f3f;
    opacity: 0.85;
    transition: 0.2s;
    border: 1px solid #ff3838;

    :hover {
        opacity: 1;
    }

    .fa-search {
        font-size: 22.5px;
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
            <SearchBarWrap>
                <SearchInput
                    value={searchValue}
                    onChange={changeValue}
                    placeholder="請輸入搜尋內容"
                />
                <SearchIcon onClick={handleSearch}>
                    <i className="fas fa-search" ></i>
                </SearchIcon>
            </SearchBarWrap>
        </SearchArea>
    )
}

export default SearchBar;