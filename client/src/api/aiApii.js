import API from "./axiosInstance";

export const getAIRecommendations = async (preference) => {
  const response = await API.post("/ai/recommend", {
    preference,
  });

  return response.data;
};