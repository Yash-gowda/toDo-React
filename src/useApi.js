import { useState } from 'react';

export const useApi = (initialData) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = (thunkFunction) => {
        setLoading(true);
        setError(null);
        return thunkFunction()
            .then((response) => setData(response))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    };

    return { data, loading, error, request };
};
