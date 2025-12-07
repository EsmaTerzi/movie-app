import { Movie, StatusResponse } from "@/types";
import axiosInstance from "@/utils/axios";

export const adminService = {
  getStatistics: async (): Promise<StatusResponse> => {
    const response = await axiosInstance.get<StatusResponse>(
      "/statistics/overview"
    );
    return response.data;
  },
  createMovie: async (requestData: Partial<Movie>): Promise<Movie> => {
    const response = await axiosInstance.post<Movie>(
      "/movies",
      requestData
    );
    return response.data;
  },

  updateMovie: async (id: string, requestData: Partial<Movie>): Promise<Movie> => {
    const response = await axiosInstance.put<Movie>(
      `/movies/${id}`,
      requestData
    );
    return response.data;
  },
  deleteMovie: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/movies/${id}`);
  },
  
};
