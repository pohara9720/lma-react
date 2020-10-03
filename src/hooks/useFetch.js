import React from 'react'
import { API_URL } from '../config'
import { LMA_AUTH_TOKEN } from '../dictionary';

export const useFetch = (url, options) => {
    const [data, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setIsLoading] = React.useState(false);
    const { method = 'GET', body, ...rest } = options || {}
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(LMA_AUTH_TOKEN)}`
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