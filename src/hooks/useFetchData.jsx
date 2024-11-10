import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';

export const useFetchData = ( key, url ,onSuccessCallback ) =>
{
    const { api } = useAxios();

    return useQuery( {
        queryKey: key,
        queryFn: async () =>
        {
            const response = await api.get( url );
            console.log( 'Fetched Data:', response.data );
            return response.data;
        },
        onSuccess: ( response ) =>
        {
            console.log( 'onSuccess Triggered:', response.data );
            if ( onSuccessCallback )
            {
                onSuccessCallback( response.data );
            }
        },
    } );
}