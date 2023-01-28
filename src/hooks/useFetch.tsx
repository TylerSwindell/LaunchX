import { useEffect, useState } from "react"

const useFetch = (url: string) : string => {
    const [data, setData] = useState('')


    useEffect(() => {
        (async () => {
            console.log("useFetch, useEffect")
            const response = await fetch(url)
            const json = await response.json()
            setData(JSON.stringify(json))

        })()
    }, [])

    return data
    

}

export default useFetch
