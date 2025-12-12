import axiosInstance from '@/utils/axios';

export const watchlistService = {

    // Kullanıcı izleme listesi oluştur
    createWatchlist: async (name: string): Promise<any> => {
        const response = await axiosInstance.post('/watchlists', {name });
        return response.data;
    },
    getUserWatchlists: async (userId: string): Promise<any[]> => {
        const response = await axiosInstance.get<any[]>(`/users/${userId}/watchlists`);
        return response.data;
    }
 

};
