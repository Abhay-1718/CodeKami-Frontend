// export const VITE_BACKEND_URL = 'http://localhost:5000';
// export const VITE_BACKEND_URL = 'https://www.codekami.online';
// export const VITE_BACKEND_URL = 'https://www.codekami.online/:5000';
// This needs to be modified in your constants.js
export const VITE_BACKEND_URL = location.hostname === "localhost"
    ? "http://localhost:5000"
    : "http://15.206.179.46";