import axios, { AxiosResponse, AxiosError, Method } from 'axios';
import { useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface UseRequestProps {
    url: string;
    method: Method;
    body: object;
    onSuccess?: (data: any) => void;
    onError?: () => void;
    contentType?: string;
}

interface UseRequestResult {
    doRequest: (props?: object) => Promise<any>;
    errors: JSX.Element | null;
}

const useRequest = ({ url, method, body, onSuccess, contentType, onError }: UseRequestProps): UseRequestResult => {
    const [errors, setErrors] = useState<JSX.Element | null>(null);

    const doRequest = async (props: object = {}, headers: object = {}): Promise<any> => {
        try {
            setErrors(null);
            // @ts-ignore
            const response: AxiosResponse = await axios[method](
                url,
                { ...body, ...props },
                {
                    headers: {
                        'Content-Type': contentType,
                    },
                }
            );

            if (onSuccess) {
                onSuccess(response.data);
            }

            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;

            // @ts-ignore
            // const details = axiosError?.response?.data?.errors[0]?.message || [];
            // const errorMessage = details.length > 0 ? details[0].message : 'Unknown error';

            const errorMessage = axiosError?.response?.data.errors[0].message || 'Unknown Error';

            if (onError) {
                onError();
            }

            // Build the JSX element for displaying the error
            const errorComponent = (
                <Alert variant='destructive'>
                    <AlertCircle className='h-4 w-4' />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
            );

            setErrors(errorComponent);

            throw error;
        }
    };

    return { doRequest, errors };
};

export default useRequest;
