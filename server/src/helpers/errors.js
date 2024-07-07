//errors.js
const ERRORS = [
    {
        code: "400",
        status: 400,
        message: "Bad Request",
    },
    {
        code: "401",
        status: 401,
        message: "Unauthorized",
    },
    {
        code: "403",
        status: 403,
        message: "Forbidden",
    },
    {
        code: "404",
        status: 404,
        message: "Not Found",
    },
    {
        code: "500",
        status: 500,
        message: "Internal Server Error",
    },
    {
        code: "502",
        status: 502,
        message: "Bad Gateway",
    },
    {
        code: "503",
        status: 503,
        message: "Service Unavailable",
    },
    {
        code: "504",
        status: 504,
        message: "Gateway Timeout",
    },
    {
        code: "23505",
        status: 409,
        message: "Unique Violation",
    },
    {
        code: "23503",
        status: 409,
        message: "Foreign Key Violation",
    },
    {
        code: "23502",
        status: 500,
        message: "Not Null Violation",
    },
    {
        code: "22001",
        status: 400,
        message: "String Data Right Truncation",
    },
    {
        code: "23514",
        status: 400,
        message: "Check Violation",
    },
    {
        code: "22P02",
        status: 400,
        message: "Invalid Text Representation",
    },
    {
        code: "auth_1",
        status: 400,
        message: "Usuario no Existe",
    },
    {
        code: "auth_2",
        status: 400,
        message: "Password Incorrecta",
    }
];

export default ERRORS;