import axiosInstance from '@/utils/axios';
import { Review, CreateReviewData, UpdateReviewData, PaginationParams, PaginatedResponse } from '@/types';

export const reviewService = {
  // Film için tüm yorumları getir
  getMovieReviews: async (
    movieId: string,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Review>> => {
    const response = await axiosInstance.get<PaginatedResponse<Review>>(
      `/movies/${movieId}/reviews`,
      { params: pagination }
    );
    return response.data;
  },

  // Kullanıcının tüm yorumlarını getir
  getUserReviews: async (
    userId: string,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Review>> => {
    const response = await axiosInstance.get<PaginatedResponse<Review>>(
      `/users/${userId}/reviews`,
      { params: pagination }
    );
    return response.data;
  },

  // Tek bir yorumu getir
  getReviewById: async (id: string): Promise<Review> => {
    const response = await axiosInstance.get<Review>(`/reviews/${id}`);
    return response.data;
  },

  // Yeni yorum oluştur
  createReview: async (data: CreateReviewData): Promise<Review> => {
    const response = await axiosInstance.post<Review>('/reviews', data);
    return response.data;
  },

  // Yorumu güncelle
  updateReview: async (id: string, data: UpdateReviewData): Promise<Review> => {
    const response = await axiosInstance.put<Review>(`/reviews/${id}`, data);
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
