import { ImagePlus } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Button } from '../ui/button';

type FileUploderProps = {
    fieldChange: (files: File[]) => void;
    mediaUrl: string;
};

const FileUploder = ({ fieldChange, mediaUrl }: FileUploderProps) => {
    const [file, setFile] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState('');

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            setFile(acceptedFiles);
            fieldChange(acceptedFiles);
            setFileUrl(URL.createObjectURL(acceptedFiles[0]));
        },
        [file]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg'],
        },
    });

    return (
        <div
            {...getRootProps()}
            className='flex flex-col gap-3 py-10 justify-center items-center rounded-xl cursor-pointer border'
        >
            <input className='cursor-pointer' {...getInputProps()} />

            {fileUrl ? (
                <div className='flex flex-1 justify-center w-full'>
                    <img src={fileUrl} alt='image' className='h-[480px] w-full rounded-[24px] object-contain' />
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center'>
                    <ImagePlus width={96} height={77} />
                    <h3 className=''>Drag photo here</h3>
                    <p className='text-sm mb-6'>SVG, JPG, JPEG</p>

                    <Button variant={'secondary'}>Select from computer</Button>
                </div>
            )}
        </div>
    );
};

export default FileUploder;
