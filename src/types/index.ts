import { UserRole } from "./enum";

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserData {
  username?: string;
  email?: string;
}
export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  token: string;
  type: string;
}

// Movie Types
export interface Movie {
  id: string;
  title: string;
  overview: string;
  releaseYear: string;
  genresNames: string[];
  genreIds?: number[];
  director: string;
  duration: number; // dakika cinsinden
  posterUrl: string;
  averageRating?: number;
  totalReviews?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface UpdateMovieData {
  id: string;
  title?: string;
  overview?: string;
  releaseYear?: string;
  genresIds?: number[];
  director?: string;
  duration?: number;
  posterUrl?: string;
}
export interface MovieById extends Partial<Movie> {
  title: string;
  overview: string;
  releaseYear: string;
  genresIds: number[];
  director: string;
  duration: number;
  averageRating?: number;
  genresNames?: string[];
}
export interface CreateMovieData {
  title: string;
  description: string;
  releaseDate: string;
  genre: string;
  director: string;
  duration: number;
  posterUrl: string;
}

export interface UpdateMovieData extends Partial<CreateMovieData> {}

// Review Types
export interface Review {
  userId: string;
  username: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  updatedAt: string;
}
export interface ReviewAdmin {
  id: string;
  movie: {
    title: string;
  };
  rating: number;
  reviewText: string;
}

export interface Genre {
  id: string;
  name: string;
}
export interface CreateReviewData {
  movieId: string;
  rating: number;
  comment: string;
}
export interface WatchlistItem {
  id: string;
  name: string;
  createdAt: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

export interface CreateRatingData {
  movieId: number;
  rating: number;
  reviewText: string;
}

export interface UpdateReviewData {
  rating?: number;
  reviewText?: string;
}

// Filter & Pagination Types
export interface MovieFilters {
  genre?: string;
  director?: string;
  minRating?: number;
  search?: string;
  sortBy?: "releaseDate" | "rating" | "title";
  sortOrder?: "asc" | "desc";
}

export interface WatchListMovies {
  id: string;
  name: string;
  movies: Movie[];
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API Response Types
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ApiError;
}

export interface StatusResponse {
  totalMovies: number;
  totalGenres: number;
  totalReviews: number;
  totalWatchlists: number;
  totalUsers: number;
}
