import React, { useCallback, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';

type FileUploaderProps = {
    setImageUrls: React.Dispatch<string[]>;
    imageUrls: string[];
};

const FileUploader = ({ setImageUrls, imageUrls }: FileUploaderProps) => {
    const [fileUrls, setFileUrls] = useState<string[]>([]);

    const onUploadSuccessHandler = useCallback(
        (response: any, { widget }: any) => {
            const croppedImageUrl = response?.info?.secure_url;
            setFileUrls([...fileUrls, croppedImageUrl]);
            setImageUrls([...imageUrls, croppedImageUrl]);
            widget.close();
        },
        [fileUrls]
    );

    const onUploadErrorHandler = useCallback((error: any) => {
        toast({
            title: 'Error uploading Image',
            description: 'try again later',
        });
    }, []);

    return (
        <div className='flex flex-col gap-3 py-10 justify-center items-center rounded-xl cursor-pointer border'>
            {fileUrls.length > 0 && (
                <CldUploadWidget
                    uploadPreset='imaginify'
                    options={{
                        multiple: true,
                        resourceType: 'image',
                        cropping: true,
                        croppingCoordinatesMode: 'custom',
                        croppingAspectRatio: 1,
                        croppingDefaultSelectionRatio: 100 / 100,
                        showSkipCropButton: false,
                        maxFiles: 5,
                    }}
                    onSuccess={onUploadSuccessHandler}
                    onError={onUploadErrorHandler}
                >
                    {({ open }) => (
                        <div className='flex flex-col items-center justify-center'>
                            <Button type='button' variant={'ghost'} onClick={(event) => open()}>
                                Add more
                            </Button>
                        </div>
                    )}
                </CldUploadWidget>
            )}

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
                                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
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
                <CldUploadWidget
                    uploadPreset='imaginify'
                    options={{
                        multiple: true,
                        resourceType: 'image',
                        cropping: true,
                        croppingCoordinatesMode: 'custom',
                        croppingAspectRatio: 1,
                        croppingDefaultSelectionRatio: 100 / 100,
                        showSkipCropButton: false,
                        maxFiles: 5,
                    }}
                    onSuccess={onUploadSuccessHandler}
                    onError={onUploadErrorHandler}
                >
                    {({ open }) => (
                        <div className='flex flex-col items-center justify-center'>
                            <Button type='button' variant={'secondary'} onClick={(event) => open()}>
                                Upload an Image
                            </Button>
                        </div>
                    )}
                </CldUploadWidget>
            )}
        </div>
    );
};

export default FileUploader;
