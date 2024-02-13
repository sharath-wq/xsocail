import { ImagePlus } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Button } from '../ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Card, CardContent } from '../ui/card';

type FileUploderProps = {
    fieldChange: (files: File[]) => void;
    mediaUrl: string;
};

const FileUploder = ({ fieldChange, mediaUrl }: FileUploderProps) => {
    const [file, setFile] = useState<File[]>([]);
    const [fileUrls, setFileUrls] = useState<string[]>([]);

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles);
        fieldChange(acceptedFiles);

        const newFileUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
        setFileUrls(newFileUrls);
    }, []);

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

            {fileUrls.length ? (
                <Carousel className='w-1/2'>
                    <CarouselContent>
                        {fileUrls.map((url, index) => (
                            <CarouselItem key={index}>
                                <div className='p-1'>
                                    <Card>
                                        <CardContent className='flex aspect-square items-center justify-center p-6'>
                                            <img
                                                src={url}
                                                alt={`image-${index}`}
                                                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            ) : (
                <div className='flex flex-col items-center justify-center'>
                    <ImagePlus width={96} height={77} />
                    <h3>Drag photo here</h3>
                    <p className='text-sm mb-6'>SVG, JPG, JPEG</p>
                    <Button type='button' variant={'secondary'}>
                        Select from computer
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FileUploder;
