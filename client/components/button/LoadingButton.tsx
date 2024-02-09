import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function ButtonLoading() {
    return (
        <Button className='m-4 px-4 py-2 rounded-md' disabled>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Please wait
        </Button>
    );
}
