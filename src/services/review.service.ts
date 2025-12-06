import axiosInstance from '@/utils/axios';
import { Review, CreateReviewData, UpdateReviewData, CreateRatingData } from '@/types';

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

  // Yorumu sil
  deleteReview: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/reviews/${id}`);
  },

  // Kullanıcının belirli bir film için yorumunu kontrol et
  checkUserReview: async (movieId: string): Promise<Review | null> => {
    try {
      const response = await axiosInstance.get<Review>(`/movies/${movieId}/my-review`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },
};
