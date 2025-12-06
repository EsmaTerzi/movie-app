import axiosInstance from '@/utils/axios';
import { Movie, CreateMovieData, UpdateMovieData, MovieFilters, PaginationParams, PaginatedResponse } from '@/types';

export const movieService = {
  // Tüm filmleri getir (filtreleme ve pagination ile)
  getAllMovies: async (
    filters?: MovieFilters,
    pagination?: PaginationParams
  ): Promise<PaginatedResponse<Movie>> => {
    const params = {
      ...filters,
      ...pagination,
    };
    
    const response = await axiosInstance.get<PaginatedResponse<Movie>>('/movies', { params });
    return response.data;
  },

  // Tek bir filmi getir
  getMovieById: async (id: string): Promise<Movie> => {
    const response = await axiosInstance.get<Movie>(`/movies/${id}`);
    return response.data;
  },

  // Yeni film oluştur
  createMovie: async (data: CreateMovieData): Promise<Movie> => {
    const response = await axiosInstance.post<Movie>('/movies', data);
    return response.data;
  },

  // Filmi güncelle
  updateMovie: async (id: string, data: UpdateMovieData): Promise<Movie> => {
    const response = await axiosInstance.put<Movie>(`/movies/${id}`, data);
    return response.data;
  },

  // Filmi sil
  deleteMovie: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/movies/${id}`);
  },

  // Popüler filmleri getir
  getPopularMovies: async (limit: number = 10): Promise<Movie[]> => {
    const response = await axiosInstance.get<Movie[]>('/movies/popular', {
      params: { limit },
    });
    return response.data;
  },

  // Film türlerini getir
  getGenres: async (): Promise<string[]> => {
    const response = await axiosInstance.get<string[]>('/movies/genres');
    return response.data;
  },

  // Film ara
  searchMovies: async (query: string): Promise<Movie[]> => {
    const response = await axiosInstance.get<Movie[]>('/movies/search', {
      params: { q: query },
    });
    return response.data;
  },
};
