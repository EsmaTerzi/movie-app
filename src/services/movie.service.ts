import axiosInstance from '@/utils/axios';
import { Movie, CreateMovieData, MovieFilters, PaginatedResponse, Genre } from '@/types';

export const movieService = {
  // Tüm filmleri getir
  getAllMovies: async (): Promise<Movie[]> => {
    const response = await axiosInstance.get<Movie[]>('/movies/public');
    return response.data;
  },

  // Tek bir filmi getir
  getMovieById: async (id: string): Promise<Movie> => {
    const response = await axiosInstance.get<Movie>(`/movies/public/${id}`);
    console.log(response.data);
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


  // Film türlerini getir
  getGenres: async (): Promise<Genre[]> => {
    const response = await axiosInstance.get<Genre[]>('/genres/public');
    return response.data;
  },

};
