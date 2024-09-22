import formData from './formData';
import image from './image';
import stream from './stream';
import urlEncoded from './urlEncoded';

type Args = {
    req: Req;
    headers: Headers;
};

const closure = ({ req, headers }: Args): Promise<Stream> => {
    const contentType = headers.get('Content-Type');

    switch (true) {
        // case /text\/html/.test(contentType):
        // return stream({req});
        case /application\/x-www-form-urlencoded/.test(contentType):
            return urlEncoded({ req, contentType });
        case /multipart\/form-data/.test(contentType):
            return formData({ req, contentType });
        case /image\/(.*?)/.test(contentType):
            return image({ req, contentType });
        default:
            return stream({ req });
    }
};

export default closure;
