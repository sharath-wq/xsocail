import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

export function ButtonLoading() {
    return (
        <Button disabled>
            <RefreshCcw className='animate-spin' />
            Please wait
        </Button>
    );
}
