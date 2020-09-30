import React from 'react'
import { API_URL } from '../config'

export const useFetch = (url, options) => {
    const [data, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setIsLoading] = React.useState(false);
    const { method = 'GET', body, ...rest } = options || {}
    const headers = {
        'Content-Type': 'application/json'
    }

    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${API_URL}${url}`, {
                    method,
                    body,
                    headers,
                    ...rest
                });
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