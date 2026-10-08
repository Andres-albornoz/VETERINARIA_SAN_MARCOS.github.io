import { useEffect, useState } from 'react'

export function useFetch(url) {
    const [data, setData] = useState(null)

    useEffect(() => {
        let activo = true

        fetch(url)
            .then((res) => res.json())
            .then((json) => {
                if (activo) setData(json)
            })
            .catch(() => {
                if (activo) setData(null)
            })

        return () => {
            activo = false
        }
    }, [url])

    return data
}
