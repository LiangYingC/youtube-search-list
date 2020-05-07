import { useState, useEffect } from 'react'

const useInfiniteScroll = (callback) => {
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll) // 啟動監聽器（like componentDidMount）
        return () => window.removeEventListener('scroll', handleScroll) // 關閉監聽器 （like componentWillUnmount）
    }, [])

    useEffect(() => { // isFetching === false => 沒有抓資料 ; isFetching === true => 抓資料（呼叫抓資料的 callback function）
        if (!isFetching) return
        callback()
    }, [isFetching])

    function handleScroll() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 && !isFetching) {
            setIsFetching(true)
        }
    }

    return [isFetching, setIsFetching]
}

export default useInfiniteScroll
