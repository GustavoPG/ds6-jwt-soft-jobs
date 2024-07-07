// utils.js
import ERRORS from "../helpers/errors.js";

const searchError = (code) => {
    const error = ERRORS.find(err => err.code === code);
    return error || { status: 500, message: 'Internal Server Error' };
}

export { searchError };