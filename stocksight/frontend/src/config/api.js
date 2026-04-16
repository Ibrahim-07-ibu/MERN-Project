

const BASE_URL = "http://localhost:5000/api";

export const API_ENDPOINTS = {
    STOCKS: `${BASE_URL}/stocks`,
    AUTH: {
        LOGIN: `${BASE_URL}/users/login`,
        REGISTER: `${BASE_URL}/users/register`,
        PROFILE: `${BASE_URL}/users/profile`,
    }
};

export default API_ENDPOINTS;
