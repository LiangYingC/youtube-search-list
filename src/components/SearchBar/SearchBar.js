import React from 'react';
import {
    SearchArea,
    SearchBarWrap,
    SearchIcon,
    SearchInput,
} from './SearchBarStyle';

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