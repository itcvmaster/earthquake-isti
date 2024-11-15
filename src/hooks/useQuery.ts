import { useEffect, useState } from "react";

// Define the type for the async API function (it returns a promise of any type)
type AsyncApiFunction<T> = (...params: any[]) => Promise<T>;

interface UseQueryReturn<T> {
    data: T | undefined;
    setData: React.Dispatch<React.SetStateAction<T | undefined>>;
    isPending: boolean;
    error: any;
}

/**
 * A custom hook that wraps an async API call
 * @param asyncApi - The async API function to call
 * @param initValue - Initial value for the data state
 * @param params - Any additional parameters to pass to the asyncApi
 * @returns - The query result, loading state, and error
 */
const useQuery = <T>(asyncApi: AsyncApiFunction<any>, initValue?: T, ...params: any[]): UseQueryReturn<T> => {

    const [isPending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<T | undefined>(initValue);

    useEffect(() => {
        const callApi = async () => {
            try {
                setPending(true);
                const response = await asyncApi(...params);
                setData(response);
                setPending(false);
            } catch (err) {
                setError(err);
                setPending(false);
            }
        };

        callApi();
    }, []);

    return { data, setData, isPending, error };
};

export default useQuery;