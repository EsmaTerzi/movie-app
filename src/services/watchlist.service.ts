import { WatchlistItem, WatchListMovies } from '@/types';
import axiosInstance from '@/utils/axios';

export const watchlistService = {

    // Kullanıcı izleme listesi oluştur
    createWatchlist: async (name: string): Promise<WatchlistItem> => {
        const response = await axiosInstance.post<WatchlistItem>('/watchlist', {name });
        return response.data;
    },
    getUserWatchlists: async (): Promise<WatchlistItem[]> => {
        const response = await axiosInstance.get<WatchlistItem[]>('/watchlist');   
        return response.data;
    },
    addMovieToWatchlist: async (watchlistId: string, movieId: string): Promise<void> => {
        await axiosInstance.post(`/watchlist/${watchlistId}/movies`, { movieId });
    },
    deleteWatchlist: async (watchlistId: string): Promise<void> => {
        await axiosInstance.delete(`/watchlist/${watchlistId}`);
    },
    getMoviesByWatchlist: async (watchlistId: string): Promise<WatchListMovies> => {
        const response = await axiosInstance.get<WatchListMovies>(`/watchlist/${watchlistId}/movies`);
        return response.data;
    },
    removeMovieFromWatchlist: async (watchlistId: string, movieId: string): Promise<void> => {
        await axiosInstance.delete(`/watchlist/${watchlistId}/movies/${movieId}`);
    }

 

};
