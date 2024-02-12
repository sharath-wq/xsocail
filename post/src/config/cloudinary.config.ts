import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

export interface CloudinaryFile extends Express.Multer.File {
    buffer: Buffer;
}

cloudinary.config({
    cloud_name: 'djnljzyhb',
    api_key: '283675542447934',
    api_secret: '7RUYAvWzSaZ953yScA-BSqw4dnw',
});

export { cloudinary };
