import axiosInstance from '@/utils/axios';
import { Movie, CreateMovieData, UpdateMovieData, MovieFilters, PaginationParams, PaginatedResponse, Genre } from '@/types';

export const movieService = {
  // Tüm filmleri getir
  getAllMovies: async (): Promise<Movie[]> => {
    const response = await axiosInstance.get<Movie[]>('/movies/public');
    return response.data;
  },

  // Tek bir filmi getir
  getMovieById: async (id: string): Promise<Movie> => {
    const response = await axiosInstance.get<Movie>(`/movies/public/${id}`);
    console.log('Fetched movie:', response.data);
    return response.data;
  },

  getMoviesWithFilters: async (filters: MovieFilters): Promise<Movie[]> => {
    const params: any = { ...filters };
    const response = await axiosInstance.get<PaginatedResponse<Movie>>('/movies/public', { params });
    return response.data.data;
  },

  // Gelişmiş arama
  searchMoviesAdvanced: async (
    keyword?: string,
    year?: number,
    genreId?: number,
    minRating?: number
  ): Promise<Movie[]> => {
    const params: any = {};
    if (keyword) params.keyword = keyword;
    if (year) params.year = year;
    if (genreId) params.genreId = genreId;
    if (minRating) params.minRating = minRating;

    const response = await axiosInstance.get<Movie[]>('/movies/public/search/advanced', { params });
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
  getGenres: async (): Promise<Genre[]> => {
    const response = await axiosInstance.get<Genre[]>('/genres/public');
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
