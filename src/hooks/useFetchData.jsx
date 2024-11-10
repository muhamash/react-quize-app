import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';

export const useFetchData = ( key, url ,onSuccessCallback ) =>
{
    const { api } = useAxios();

    return useQuery( {
        queryKey: key,
        queryFn: async (context) =>
        {
            const response = await api.get( url );
            console.log( 'Fetched Data:', response.data.data, context.queryKey );
            return response.data.data;
        },
        onSuccess: ( response ) =>
        {
            const { data } = response.data;
            console.log( 'onSuccess Triggered:', response );
            if ( onSuccessCallback )
            {
               onSuccessCallback( data );
            }
        },
        onError: ( error, variable ) =>
        {
            console.log(error, variable)
        }
    } );
}