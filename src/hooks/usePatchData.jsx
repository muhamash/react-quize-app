import { useMutation } from '@tanstack/react-query';
import useAxios from './useAxios';

export const usePatchData = ( { url, onSuccess, onError } ) =>
{
    const { api } = useAxios();
    
    return useMutation( {
        mutationFn: async ( payload ) =>
        {
            const response = await api.patch( url, payload );
            return response.data;
        },
        onSuccess: ( data ) =>
        {
            if ( onSuccess ) onSuccess( data );
        },
        onError: ( error ) =>
        {
            if ( onError ) onError( error );
        },
    } );
};