// User Types
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
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
  role: string;
  token: string;
  type: string;
}

// Movie Types
export interface Movie {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  genre: string;
  director: string;
  duration: number; // dakika cinsinden
  posterUrl: string;
  averageRating?: number;
  totalReviews?: number;
  createdAt: string;
  updatedAt?: string;
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
  id: string;
  movieId: string;
  userId: string;
  rating: number; // 1-5 arası
  comment: string;
  createdAt: string;
  updatedAt?: string;
  user?: User;
  movie?: Movie;
}

export interface CreateReviewData {
  movieId: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewData {
  rating?: number;
  comment?: string;
}

// Filter & Pagination Types
export interface MovieFilters {
  genre?: string;
  director?: string;
  minRating?: number;
  search?: string;
  sortBy?: 'releaseDate' | 'rating' | 'title';
  sortOrder?: 'asc' | 'desc';
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
