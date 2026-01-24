
export const loginUser = async (credentials) => {
    // return api.post('/auth/login', credentials);
    console.log('Logging in with', credentials);
    return Promise.resolve({ data: { user: { name: 'User' } } });
};

export const registerUser = async (userData) => {
    // return api.post('/auth/register', userData);
    console.log('Registering', userData);
    return Promise.resolve({ data: { user: userData } });
};
