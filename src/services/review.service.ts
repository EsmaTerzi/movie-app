import axiosInstance from '@/utils/axios';
import { Review, CreateRatingData } from '@/types';

export const reviewService = {
  // Film için tüm yorumları getir
  getMovieReviews: async (movieId: string): Promise<Review[]> => {
    const response = await axiosInstance.get<Review[]>(`/ratings/public/movie/${movieId}`);
    return response.data;
  },

  // Kullanıcının tüm yorumlarını getir
  getUserReviews: async (userId: string): Promise<Review[]> => {
    const response = await axiosInstance.get<Review[]>(`/users/${userId}/reviews`);
    return response.data;
  },

  // Tek bir yorumu getir
  getReviewById: async (id: string): Promise<Review> => {
    const response = await axiosInstance.get<Review>(`/reviews/${id}`);
    return response.data;
  },

  // Yorum oluştur veya güncelle (yeni API)
  createOrUpdateRating: async (data: CreateRatingData): Promise<Review> => {
    const response = await axiosInstance.post<Review>('/ratings', data);
    return response.data;
  },

};
