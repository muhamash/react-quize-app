import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from './useAxios';

export const useDelete = ( { queryKey, onSuccess, onError } ) =>
{
    const { api } = useAxios();
    const queryClient = useQueryClient();
    
    return useMutation( {
        mutationFn: async ({url}) =>
        {
            const response = await api.delete( url );
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