enum ContentType {
    TEXT = 'text/plain',
    HTML = 'text/html; charset=UTF-8',
    JSON = 'application/json; charset=utf-8',
    STREAM = 'application/octet-stream',
    SVG = 'image/svg+xml',
}

enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
}

enum Status {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export { ContentType, Method, Status };
