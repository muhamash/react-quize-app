import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';

export const useFetchData = (key, url, params = {}) => {
    const { api } = useAxios();

    return useQuery({
        queryKey: [key, params],
        queryFn: async () => {
            const response = await api.get( url, { params } );
            // console.log(response.data)
            return response.data;
        },
        // keepPreviousData: true,
        staleTime: 10000,
        onError: (error, variables) => {
            console.error('Error fetching data:', error, variables);
        },
    });
};
