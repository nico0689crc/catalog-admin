import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      setError(null);
      const httpAbortController = new AbortController();
      let responseData;
      activeHttpRequests.current.push(httpAbortController);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortController.signal,
        });

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortController
        );

        if (response.ok && response.status !== 204) {
          responseData = await response.json();
          setIsLoading(false);
          return responseData;
        }

        if (response.ok && response.status === 204) {
          setIsLoading(false);
          return;
        }

        if (!response.ok) {
          responseData = await response.json();
          setError(responseData);
          setIsLoading(false);
          throw new Error("Error");
        }
      } catch (error) {}
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortController =>
        abortController.abort()
      );
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
