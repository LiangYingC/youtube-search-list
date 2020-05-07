import { useState, useEffect } from 'react';

const useYoutubeSearch = (callback) => {
    const [searchData, setSearchData] = useState({
        inputValue: '熱門音樂',
        keyWord: '熱門音樂'
    })
    function changeValue(e) {
        e.persist()
        return setSearchData(preSearchData => {
            return {
                ...preSearchData,
                inputValue: e.target.value
            }
        })
    }
    function startSearch() {
        return setSearchData(preSearchData => {
            return {
                ...preSearchData,
                keyWord: preSearchData.inputValue
            }
        })
    }
    useEffect(() => {
        callback()
    }, [searchData.keyWord])

    return [searchData, changeValue, startSearch]
}

export default useYoutubeSearch;