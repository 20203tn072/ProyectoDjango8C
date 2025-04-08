import axios from "axios";

//URL de inicio de sesión (JWT)
const API_URL = "http://127.0.0.1:8000/users/token/"
const API_REFRESH_URL = "http://127.0.0.1:8000/users/token/refresh/";



export const login = async (email, password) => {
    const response = await axios.post(API_URL, { email, password });
    if (response.data.access) {
        //Guardar el token en React
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("userEmail", email);

    }
    return response.data;



}

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userEmail');
    window.location.reload(); // Recargar para actualizar estado
}

const getAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    try {
        const response = await axios.post(API_REFRESH_URL, { refresh: refreshToken });
        const newAccessToken = response.data.access;
        localStorage.setItem("accessToken", newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error("Error refreshing token:", error);
        logout(); 
        throw error;
    }
};

const authRequest = async (method, url, data = null) => {
    let accessToken = localStorage.getItem("accessToken");

    try {
        const response = await axios({
            method,
            url,
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Token expirado, intentar renovarlo
            accessToken = await getAccessToken();
            try {
                const retryResponse = await axios({
                    method,
                    url,
                    data,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                return retryResponse;
            } catch (retryError) {
                console.error("Error after refreshing token:", retryError);
                throw retryError;
            }
        } else {
            console.error("Request error:", error);
            throw error;
        }
    }
};


export const putRequest = (url, data) => authRequest("PUT", url, data);
export const deleteRequest = (url) => authRequest("DELETE", url);
