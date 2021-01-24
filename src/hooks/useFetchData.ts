import { useEffect, useState } from 'react';

const useFetchData = <T>(url: string, initialState: T) => {
  const [response, setResponse] = useState(initialState);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setResponse(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { response, loading, error };
};

export default useFetchData;
