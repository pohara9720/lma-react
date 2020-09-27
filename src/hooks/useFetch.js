import React from 'react'
import { API_URL } from '../config'

export const useFetch = (url, options) => {
    const [data, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${API_URL}${url}`, options);
                const json = await res.json();
                setResponse(json);
                setIsLoading(false);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();

    }, []);
    return { data, error, loading };
};