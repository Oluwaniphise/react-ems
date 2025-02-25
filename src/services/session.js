export const getAccessToken = () => {
    return JSON.parse(localStorage.getItem("accessToken")) ? JSON.parse(localStorage.getItem("accessToken")) : null;
    
}


export const isAuthenticated = () => !!getAccessToken();