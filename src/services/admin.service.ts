import {
  Genre,
  Movie,
  ReviewAdmin,
  StatusResponse,
  UpdateMovieData,
  User,
} from "@/types";
import axiosInstance from "@/utils/axios";

export const adminService = {
  getStatistics: async (): Promise<StatusResponse> => {
    const response = await axiosInstance.get<StatusResponse>(
      "/statistics/overview"
    );
    return response.data;
  },
  createMovie: async (requestData: Partial<Movie>): Promise<Movie> => {
    const response = await axiosInstance.post<Movie>("/movies", requestData);
    return response.data;
  },

  updateMovie: async (
    id: string,
    requestData: Partial<UpdateMovieData>
  ): Promise<UpdateMovieData> => {
    const response = await axiosInstance.put<UpdateMovieData>(
      `/movies/${id}`,
      requestData
    );
    return response.data;
  },
  deleteMovie: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/movies/${id}`);
  },
  getAllUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get<User[]>("/users");
    return response.data;
  },
  getAllGenres: async (): Promise<Genre[]> => {
    const response = await axiosInstance.get<Genre[]>("/genres/public");
    return response.data;
  },
  createGenre: async (requestData: { name: string }): Promise<Genre> => {
    const response = await axiosInstance.post<Genre>("/genres", requestData);
    return response.data;
  },
  getAllReviews: async (): Promise<ReviewAdmin[]> => {
    const response = await axiosInstance.get<ReviewAdmin[]>("/ratings");
    return response.data;
  },
};
