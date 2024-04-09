import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CopyIcon, Send } from 'lucide-react';
import React from 'react';

const Share = ({ id }: { id: string }) => {
    return (
        <Button variant={'ghost'}>
            <Dialog>
                <DialogTrigger asChild>
                    <span onClick={(e) => e.stopPropagation()}>
                        <Send />
                    </span>
                </DialogTrigger>
                <DialogContent className='sm:max-w-md'>
                    <AlertDialogHeader>
                        <DialogTitle>Share link</DialogTitle>
                        <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
                    </AlertDialogHeader>
                    <div onClick={(e) => e.stopPropagation()} className='flex items-center space-x-2'>
                        <div className='grid flex-1 gap-2'>
                            <Label htmlFor='link' className='sr-only'>
                                Link
                            </Label>
                            <Input id='link' defaultValue={`https://www.scportfolio.online/post/view/${id}`} readOnly />
                        </div>
                        <Button type='submit' size='sm' className='px-3'>
                            <span onClick={(e) => e.stopPropagation()} className='sr-only'>
                                Copy
                            </span>
                            <CopyIcon className='h-4 w-4' />
                        </Button>
                    </div>
                    <DialogFooter className='sm:justify-start'>
                        <DialogClose asChild>
                            <Button type='button' variant='secondary'>
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Button>
    );
};

export default Share;
