import { useState } from "react"
import { toast } from "sonner";

const useFetch = (cb) => {
    const [data, setData] = useState(undefined);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fn = async (...args) => {
        setIsLoading(true);
        try {
            const response = await cb(...args);
            setData(response);
        } catch (error) {
            setError(error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return { fn, data, setData, error, isLoading };
}

export default useFetch