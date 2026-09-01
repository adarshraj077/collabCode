const rawUrl = import.meta.env.VITE_BACKEND_URL;
export const BACKEND_URL = rawUrl 
    ? (rawUrl.endsWith('/api') ? rawUrl : `${rawUrl}/api`)
    : "http://localhost:3000/api";
