import useSWR from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.', response.status);
  }
  return response.json();
};

const useFetch = (path) => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { data, error } = useSWR(`${serverUrl}${path}`, fetcher);

  const isLoading = !data && !error;

  return { data, error, isLoading };
};

export default useFetch;
