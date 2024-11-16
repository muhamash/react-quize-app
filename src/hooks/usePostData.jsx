import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from './useAxios';

export const usePostData = ( { queryKey, url, onSuccess, onError } ) =>
{
    const { api } = useAxios();
    const queryClient = useQueryClient();
    
    return useMutation( {
        mutationFn: async ( payload ) =>
        {
            const response = await api.post( url, payload );
            return response.data;
        },
        onSuccess: ( data ) =>
        {
            if ( onSuccess ) onSuccess( data );
            queryClient.invalidateQueries( queryKey );
        },
        onError: ( error ) =>
        {
            if ( onError ) onError( error );
        },
    } );
};