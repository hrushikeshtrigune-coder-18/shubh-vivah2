
export const getUserProfile = async (userId) => {
    // return api.get(`/users/${userId}`);
    return Promise.resolve({ data: { name: 'User', id: userId } });
};

export const updateUserProfile = async (userId, data) => {
    // return api.put(`/users/${userId}`, data);
    return Promise.resolve({ data });
};
