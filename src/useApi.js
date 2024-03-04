import { useState } from 'react';

//custom hook to initialize and manage API requests
export const useApi = (initialData) => {
    
    //state hook for storing data returned by API
    const [data, setData] = useState(initialData);
    // State hook for tracking the loading status of the API request.
    const [loading, setLoading] = useState(false);

    // State hook for storing any errors that occur during the API request. Set to 'null' in the beginning
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
