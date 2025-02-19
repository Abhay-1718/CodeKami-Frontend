// export const VITE_BACKEND_URL = 'https://www.codekami.online';
// export const VITE_BACKEND_URL = 'https://www.codekami.online/:5000';
export const VITE_BACKEND_URL = location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://www.codekami.online";  

