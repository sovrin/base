import { Extension } from './extension';

enum Type {
    IMAGE = 'image',
    VIDEO = 'video',
    LINK = 'link',
    UNKNOWN = 'unknown',
}

const VideoExtensions = [];

const ImageExtensions = [
    Extension.JPG,
    Extension.JPEG,
    Extension.PNG,
    Extension.WEBP,
    Extension.BMP,
];

export { Type, VideoExtensions, ImageExtensions };
