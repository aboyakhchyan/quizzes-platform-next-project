import { useEffect, useState } from "react"

export const useDebounce = <T>(searchText: T, ms = 500) => {
    const [debounceValue, setDebounceValue] = useState<T>(searchText)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(searchText)
        }, ms)

        return () => clearTimeout(timeout)
    }, [searchText, ms])

    return debounceValue
}